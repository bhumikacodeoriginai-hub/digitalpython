/* ============================================================
   Lightweight, self-contained Python syntax highlighter.
   No external dependencies. Tokenizes safely (HTML-escaped).
   Exposes: window.DPHighlight(code) -> HTML string
   ============================================================ */
(function () {
  "use strict";

  var KEYWORDS = [
    "False","None","True","and","as","assert","async","await","break","class",
    "continue","def","del","elif","else","except","finally","for","from","global",
    "if","import","in","is","lambda","nonlocal","not","or","pass","raise","return",
    "try","while","with","yield","match","case"
  ];

  var BUILTINS = [
    "print","input","len","range","type","int","float","str","bool","list","tuple",
    "dict","set","frozenset","complex","bytes","bytearray","abs","all","any","ascii",
    "bin","callable","chr","classmethod","compile","delattr","dir","divmod","enumerate",
    "eval","exec","filter","format","getattr","globals","hasattr","hash","help","hex",
    "id","isinstance","issubclass","iter","locals","map","max","min","next","object",
    "oct","open","ord","pow","property","repr","reversed","round","setattr","slice",
    "sorted","staticmethod","sum","super","vars","zip","__import__"
  ];

  var kwSet = new Set(KEYWORDS);
  var biSet = new Set(BUILTINS);

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function span(cls, text) { return '<span class="' + cls + '">' + esc(text) + "</span>"; }

  window.DPHighlight = function (code) {
    var out = "";
    var i = 0;
    var n = code.length;

    while (i < n) {
      var c = code[i];

      // Comments
      if (c === "#") {
        var j = code.indexOf("\n", i);
        if (j === -1) j = n;
        out += span("tok-com", code.slice(i, j));
        i = j;
        continue;
      }

      // Triple-quoted strings
      if ((c === '"' || c === "'") && code[i + 1] === c && code[i + 2] === c) {
        var q3 = c + c + c;
        var end = code.indexOf(q3, i + 3);
        if (end === -1) end = n; else end += 3;
        out += span("tok-str", code.slice(i, end));
        i = end;
        continue;
      }

      // Single/double quoted strings (with prefixes like f, r, b)
      if (c === '"' || c === "'") {
        var k = i + 1;
        while (k < n) {
          if (code[k] === "\\") { k += 2; continue; }
          if (code[k] === c) { k++; break; }
          if (code[k] === "\n") break;
          k++;
        }
        out += span("tok-str", code.slice(i, k));
        i = k;
        continue;
      }

      // Numbers
      if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(code[i + 1] || ""))) {
        var m = code.slice(i).match(/^(0[xXoObB][0-9a-fA-F_]+|\d[\d_]*\.?\d*(?:[eE][+-]?\d+)?j?)/);
        if (m) { out += span("tok-num", m[0]); i += m[0].length; continue; }
      }

      // Decorators
      if (c === "@" && (i === 0 || /\s/.test(code[i - 1]))) {
        var dm = code.slice(i).match(/^@[\w.]+/);
        if (dm) { out += span("tok-dec", dm[0]); i += dm[0].length; continue; }
      }

      // Identifiers / keywords / builtins
      if (/[A-Za-z_]/.test(c)) {
        var wm = code.slice(i).match(/^[A-Za-z_]\w*/);
        var word = wm[0];
        var after = code.slice(i + word.length).match(/^\s*\(/);
        if (word === "self" || word === "cls") {
          out += span("tok-self", word);
        } else if (kwSet.has(word)) {
          out += span("tok-kw", word);
        } else if (biSet.has(word)) {
          out += span("tok-bi", word);
        } else if (after) {
          out += span("tok-fn", word);
        } else {
          out += esc(word);
        }
        i += word.length;
        continue;
      }

      // Operators
      if (/[+\-*/%=<>!&|^~]/.test(c)) {
        out += span("tok-op", c);
        i++;
        continue;
      }

      // Everything else (escape it)
      out += esc(c);
      i++;
    }

    return out;
  };
})();

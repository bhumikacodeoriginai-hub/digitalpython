/* ============================================================
   Digital Python Notes — application engine (v2)
   by Code Origin.AI Private Limited
   SPA: hash routing, i18n, live Python runner, workspace.
   ============================================================ */
(function () {
  "use strict";

  var MODULES = [];
  var MODULE_BY_ID = {};
  var pendingWorkspaceCode = null;

  var DP = {
    registerModule: function (mod) { MODULES.push(mod); MODULE_BY_ID[mod.id] = mod; },
    boot: boot
  };
  window.DP = DP;

  function T(key) { return window.DPI18N ? window.DPI18N.t(key) : key; }
  function modTitle(mod) { return window.DPI18N ? window.DPI18N.moduleTitle(mod.id, mod.title) : mod.title; }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
  function escapeHtml(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function highlight(code) { return window.DPHighlight ? window.DPHighlight(code) : escapeHtml(code); }

  function renderNotes(notes) {
    if (!notes) return "";
    if (Array.isArray(notes)) notes = notes.join("\n");
    var lines = notes.split("\n"), html = "", listType = null;
    function closeList() { if (listType) { html += "</" + listType + ">"; listType = null; } }
    function inline(t) { t = escapeHtml(t); t = t.replace(/`([^`]+)`/g, "<code>$1</code>"); t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"); return t; }
    lines.forEach(function (raw) {
      var line = raw.trim();
      if (line === "") { closeList(); return; }
      if (line.charAt(0) === ">") { closeList(); html += '<div class="callout">' + inline(line.slice(1).trim()) + "</div>"; return; }
      var um = line.match(/^[-*]\s+(.*)/), om = line.match(/^\d+\.\s+(.*)/);
      if (um) { if (listType !== "ul") { closeList(); html += "<ul>"; listType = "ul"; } html += "<li>" + inline(um[1]) + "</li>"; return; }
      if (om) { if (listType !== "ol") { closeList(); html += "<ol>"; listType = "ol"; } html += "<li>" + inline(om[1]) + "</li>"; return; }
      closeList(); html += "<p>" + inline(line) + "</p>";
    });
    closeList(); return html;
  }

  /* ---------- Sidebar ---------- */
  function buildSidebar() {
    var nav = $("#moduleNav");
    nav.innerHTML = "";
    $("#moduleCount").textContent = MODULES.length + " " + T("modulesLabel");
    $("#sidebarLabel").textContent = T("syllabus");
    var wsl = $("#wsLink");
    wsl.href = "#/workspace";
    wsl.innerHTML = '<span class="ws-ico">▶</span>' + T("workspace");

    MODULES.forEach(function (mod) {
      var group = el("div", "nav-group"); group.dataset.mod = mod.id;
      var btn = el("button", "nav-mod");
      btn.innerHTML = '<span class="nav-num">' + mod.id + "</span>" +
        '<span class="nav-title">' + escapeHtml(modTitle(mod)) + "</span>" +
        (mod.concepts && mod.concepts.length ? '<span class="nav-caret">▶</span>' : "");
      btn.addEventListener("click", function () {
        location.hash = "#/module/" + mod.id;
        if (mod.concepts && mod.concepts.length) { group.classList.toggle("open"); btn.classList.toggle("open"); }
      });
      group.appendChild(btn);
      if (mod.concepts && mod.concepts.length) {
        var sub = el("div", "nav-concepts");
        mod.concepts.forEach(function (con) {
          var a = el("a", "nav-concept");
          a.href = "#/module/" + mod.id + "/" + slug(con.title);
          a.textContent = con.title; a.dataset.concept = slug(con.title);
          sub.appendChild(a);
        });
        group.appendChild(sub);
      }
      nav.appendChild(group);
    });
  }

  function highlightSidebar(modId, conceptSlug) {
    document.querySelectorAll(".nav-mod").forEach(function (b) { b.classList.remove("active"); });
    document.querySelectorAll(".nav-concept").forEach(function (c) { c.classList.remove("active"); });
    if (!modId) return;
    var group = document.querySelector('.nav-group[data-mod="' + modId + '"]');
    if (!group) return;
    var btn = group.querySelector(".nav-mod");
    if (btn) btn.classList.add("active");
    document.querySelectorAll(".nav-group").forEach(function (g) { if (g !== group) { g.classList.remove("open"); var b = g.querySelector(".nav-mod"); if (b) b.classList.remove("open"); } });
    group.classList.add("open"); if (btn) btn.classList.add("open");
    if (conceptSlug) { var c = group.querySelector('.nav-concept[data-concept="' + conceptSlug + '"]'); if (c) c.classList.add("active"); }
    if (btn && btn.scrollIntoView) btn.scrollIntoView({ block: "nearest" });
  }

  /* ---------- Home ---------- */
  function renderHome() {
    var totalExamples = MODULES.reduce(function (s, m) { return s + (m.concepts || []).reduce(function (a, c) { return a + ((c.examples && c.examples.length) || 0); }, 0); }, 0);
    var totalConcepts = MODULES.reduce(function (s, m) { return s + ((m.concepts && m.concepts.length) || 0); }, 0);
    var content = $("#content"); content.innerHTML = "";

    var hero = el("section", "hero");
    hero.innerHTML =
      '<div class="hero-eyebrow">Code Origin.AI</div>' +
      "<h1>" + escapeHtml(T("heroTitle")) + "</h1>" +
      "<p>" + escapeHtml(T("heroDesc")) + "</p>" +
      '<div class="hero-badges">' +
        '<span class="hero-badge">📚 ' + MODULES.length + " " + T("badgeModules") + "</span>" +
        '<span class="hero-badge">🧩 ' + totalConcepts + " " + T("badgeConcepts") + "</span>" +
        '<span class="hero-badge">💡 ' + totalExamples + "+ " + T("badgeExamples") + "</span>" +
        '<span class="hero-badge">🏢 ' + escapeHtml(T("badgeLevel")) + "</span>" +
      "</div>" +
      '<div class="hero-cta">' +
        '<a class="btn btn-primary" href="#/module/1">🚀 ' + escapeHtml(T("getStarted")) + "</a>" +
        '<a class="btn btn-ghost" href="#/workspace">▶ ' + escapeHtml(T("openWorkspaceCta")) + "</a>" +
      "</div>" +
      '<div class="hero-progress"><div class="bar" style="--progress:' + getProgressPercent() + '%"></div></div>';
    content.appendChild(hero);

    content.appendChild(el("div", "home-section-title", T("allModules")));
    var grid = el("div", "home-grid");
    MODULES.forEach(function (mod, i) {
      var exCount = (mod.concepts || []).reduce(function (s, c) { return s + ((c.examples && c.examples.length) || 0); }, 0);
      var card = el("a", "mod-card"); card.href = "#/module/" + mod.id;
      card.style.animationDelay = Math.min(i * 22, 500) + "ms";
      card.innerHTML =
        '<div class="mc-top"><span class="mc-num">M' + mod.id + '</span><span class="mc-icon">' + (mod.icon || "🐍") + "</span></div>" +
        "<h3>" + escapeHtml(modTitle(mod)) + "</h3>" +
        "<p>" + escapeHtml(mod.summary || "") + "</p>" +
        '<div class="mc-meta">' + ((mod.concepts && mod.concepts.length) || 0) + " " + T("conceptsWord") +
        (exCount ? '<span class="dot"></span>' + exCount + " " + T("examplesWord") : "") + "</div>";
      grid.appendChild(card);
    });
    content.appendChild(grid);
    content.appendChild(el("footer", "app-footer",
      "<strong>" + escapeHtml(T("heroTitle")) + "</strong> — " + escapeHtml(T("footer")) + "<br>" + escapeHtml(T("footerTag"))));

    highlightSidebar(null, null);
    document.title = T("heroTitle") + " | Code Origin.AI";
    content.focus(); window.scrollTo(0, 0);
  }

  /* ---------- Module ---------- */
  function renderModule(modId, conceptSlug) {
    var mod = MODULE_BY_ID[modId], content = $("#content");
    if (!mod) { renderHome(); return; }
    content.innerHTML = "";
    var page = el("div", "module-page");
    page.appendChild(el("nav", "breadcrumb",
      '<a href="#/">' + T("home") + '</a><span class="sep">/</span><span>' + T("modulesLabel") + " " + mod.id + "</span>"));
    var header = el("header", "module-header");
    header.innerHTML =
      '<div class="mh-eyebrow">' + T("modulesLabel") + " " + mod.id + "</div>" +
      '<h1><span class="mh-icon">' + (mod.icon || "🐍") + "</span>" + escapeHtml(modTitle(mod)) + "</h1>" +
      (mod.summary ? "<p>" + escapeHtml(mod.summary) + "</p>" : "");
    page.appendChild(header);

    if (mod.concepts && mod.concepts.length) {
      mod.concepts.forEach(function (con, i) { var c = renderConcept(con); c.style.animationDelay = Math.min(i * 40, 300) + "ms"; page.appendChild(c); });
    } else {
      var stub = el("div", "stub");
      stub.innerHTML = "<h3>" + (mod.icon || "🚧") + " " + escapeHtml(mod.title) + "</h3><p>" + escapeHtml(mod.summary || "") + "</p>" +
        (mod.topics && mod.topics.length ? "<ul>" + mod.topics.map(function (t) { return "<li>" + escapeHtml(t) + "</li>"; }).join("") + "</ul>" : "");
      page.appendChild(stub);
    }
    page.appendChild(buildPageNav(mod));
    page.appendChild(el("footer", "app-footer", T("modulesLabel") + " " + mod.id + " · <strong>" + escapeHtml(T("heroTitle")) + "</strong>"));
    content.appendChild(page);

    highlightSidebar(mod.id, conceptSlug);
    document.title = "M" + mod.id + " · " + modTitle(mod) + " | " + T("heroTitle");
    if (conceptSlug) { var target = document.getElementById("c-" + conceptSlug); if (target) { target.scrollIntoView(); return; } }
    content.focus(); window.scrollTo(0, 0);
    markModuleVisited(mod.id);
  }

  function renderConcept(con) {
    var s = slug(con.title);
    var wrap = el("section", "concept"); wrap.id = "c-" + s;
    var title = el("h2", "concept-title");
    title.innerHTML = escapeHtml(con.title) +
      (con.badge ? ' <span class="concept-badge">' + escapeHtml(con.badge) + "</span>" : "") +
      ' <a class="anchor" href="#/module/' + con._modId + "/" + s + '" title="Link">#</a>';
    wrap.appendChild(title);

    /* --- STEP 1: Introduction (What / Why / Where) --- */
    if (con.introduction) {
      var intro = el("div", "teach-section teach-intro");
      intro.innerHTML = '<div class="teach-label"><span class="teach-icon">📖</span> Step 1: Introduction</div>' +
        '<div class="teach-content">' + renderNotes(con.introduction) + '</div>';
      wrap.appendChild(intro);
    }

    /* --- STEP 2: Real-Life Analogy --- */
    if (con.analogy) {
      var anl = el("div", "teach-section teach-analogy");
      anl.innerHTML = '<div class="teach-label"><span class="teach-icon">🏠</span> Step 2: Real-Life Analogy</div>' +
        '<div class="teach-content">' + renderNotes(con.analogy) + '</div>';
      wrap.appendChild(anl);
    }

    /* --- STEP 3: Visual / Diagram --- */
    if (con.diagram) {
      var diag = el("div", "teach-section teach-diagram");
      diag.innerHTML = '<div class="teach-label"><span class="teach-icon">📊</span> Step 3: Visual Explanation</div>' +
        '<div class="teach-content"><pre class="diagram-box">' + escapeHtml(typeof con.diagram === 'string' ? con.diagram : con.diagram.join('\n')) + '</pre></div>';
      wrap.appendChild(diag);
    }

    /* --- STEP 4: Syntax --- */
    if (con.syntax) {
      var syn = el("div", "teach-section teach-syntax");
      syn.innerHTML = '<div class="teach-label"><span class="teach-icon">⌨️</span> Step 4: Syntax</div>' +
        '<div class="teach-content">' + renderNotes(con.syntax) + '</div>';
      wrap.appendChild(syn);
    }

    /* --- Original notes (concept explanation) --- */
    if (con.notes) wrap.appendChild(el("div", "concept-notes", renderNotes(con.notes)));

    /* --- STEPS 5-7: Examples with execution trace --- */
    if (con.examples && con.examples.length) {
      var head = el("div", "examples-head");
      head.innerHTML = '<span class="teach-icon">💡</span> Steps 5-7: ' + T("examplesHead") + ' & Execution Trace <span class="ex-count">' + con.examples.length + "</span>";
      wrap.appendChild(head);
      con.examples.forEach(function (ex, idx) { wrap.appendChild(renderExample(ex, idx + 1)); });
    }

    /* --- STEP 8: Common Mistakes --- */
    if (con.mistakes && con.mistakes.length) {
      var mist = el("div", "teach-section teach-mistakes");
      var mistHtml = '<div class="teach-label"><span class="teach-icon">⚠️</span> Step 8: Common Mistakes</div><div class="teach-content">';
      con.mistakes.forEach(function (m) {
        mistHtml += '<div class="mistake-card">' +
          '<div class="mistake-wrong"><div class="mistake-tag">❌ Wrong</div><pre class="mistake-code">' + highlight(m.wrong) + '</pre>' +
          (m.error ? '<div class="mistake-error">' + escapeHtml(m.error) + '</div>' : '') + '</div>' +
          '<div class="mistake-right"><div class="mistake-tag">✅ Correct</div><pre class="mistake-code">' + highlight(m.right) + '</pre></div>' +
          '<div class="mistake-why">' + renderNotes(m.explanation) + '</div></div>';
      });
      mistHtml += '</div>';
      mist.innerHTML = mistHtml;
      wrap.appendChild(mist);
    }

    /* --- STEP 9: Interview Questions --- */
    if (con.interview && con.interview.length) {
      var intv = el("div", "teach-section teach-interview");
      var intvHtml = '<div class="teach-label"><span class="teach-icon">🎯</span> Step 9: Interview Questions</div><div class="teach-content">';
      con.interview.forEach(function (qa, i) {
        intvHtml += '<div class="qa-card"><div class="qa-q"><span class="qa-num">Q' + (i+1) + '</span>' + escapeHtml(qa.q) + '</div>' +
          '<div class="qa-a"><strong>Answer:</strong> ' + renderNotes(qa.a) + '</div></div>';
      });
      intvHtml += '</div>';
      intv.innerHTML = intvHtml;
      wrap.appendChild(intv);
    }

    /* --- STEPS 10-11: Practice Problems --- */
    if (con.practice && con.practice.length) {
      var prac = el("div", "teach-section teach-practice");
      var pracHtml = '<div class="teach-label"><span class="teach-icon">🏋️</span> Steps 10-11: Practice Problems</div><div class="teach-content">';
      con.practice.forEach(function (p, i) {
        var diff = p.difficulty || "Easy";
        pracHtml += '<div class="practice-card practice-' + diff.toLowerCase() + '">' +
          '<div class="practice-head"><span class="practice-num">#' + (i+1) + '</span><span class="practice-diff">' + diff + '</span></div>' +
          '<div class="practice-desc">' + escapeHtml(p.problem) + '</div>' +
          (p.hint ? '<div class="practice-hint">💡 Hint: ' + escapeHtml(p.hint) + '</div>' : '') +
          '</div>';
      });
      pracHtml += '</div>';
      prac.innerHTML = pracHtml;
      wrap.appendChild(prac);
    }

    /* --- STEP 12: Revision Summary --- */
    if (con.revision) {
      var rev = el("div", "teach-section teach-revision");
      rev.innerHTML = '<div class="teach-label"><span class="teach-icon">📋</span> Step 12: Quick Revision</div>' +
        '<div class="teach-content">' + renderNotes(con.revision) + '</div>';
      wrap.appendChild(rev);
    }

    return wrap;
  }

  function renderExample(ex, index) {
    var code = ex.code || "";
    var wrap = el("div", "example");

    var head = el("div", "example-head");
    head.innerHTML = '<span class="dots"><span class="r"></span><span class="y"></span><span class="g"></span></span>' +
      '<span class="ex-index">#' + index + "</span>" +
      '<span class="ex-title">' + escapeHtml(ex.title || "Example") + "</span>";
    wrap.appendChild(head);

    var codeBlock = el("div", "code-block");
    var pre = el("pre"); var codeEl = el("code"); codeEl.innerHTML = highlight(code);
    pre.appendChild(codeEl); codeBlock.appendChild(pre);

    var editor = el("textarea", "code-editor"); editor.value = code; editor.spellcheck = false; editor.style.display = "none";
    editor.setAttribute("aria-label", "Editable code");
    codeBlock.appendChild(editor);

    function currentCode() { return editor.style.display === "none" ? code : editor.value; }

    var actions = el("div", "code-actions");
    var runBtn = el("button", "code-btn run", "▶ " + T("run"));
    var editBtn = el("button", "code-btn", "✎ " + T("edit"));
    var copyBtn = el("button", "code-btn", T("copy"));
    var wsBtn = el("button", "code-btn", "⇱");
    wsBtn.title = T("openWorkspace");
    actions.appendChild(runBtn); actions.appendChild(editBtn); actions.appendChild(copyBtn); actions.appendChild(wsBtn);
    codeBlock.appendChild(actions);
    wrap.appendChild(codeBlock);

    // output area (starts with expected output if any)
    var out = el("div", "example-output");
    if (ex.output != null && ex.output !== "") {
      out.innerHTML = '<span class="out-label">' + T("expected") + "</span>" + escapeHtml(ex.output);
    } else { out.style.display = "none"; }
    wrap.appendChild(out);

    // Explanation block — step-by-step for non-programmers
    var explContent = ex.explanation || (window.DPExplainer ? window.DPExplainer.explain(code, ex.title) : null);
    if (explContent) {
      var explWrap = el("div", "explanation");
      var explToggle = el("button", "expl-toggle", "💡 " + T("explanation"));
      var explBody = el("div", "expl-body");
      explBody.innerHTML = renderNotes(explContent);
      explBody.style.display = "none";
      explToggle.addEventListener("click", function () {
        var show = explBody.style.display === "none";
        explBody.style.display = show ? "block" : "none";
        explToggle.classList.toggle("open", show);
        explToggle.innerHTML = (show ? "🔽 " : "💡 ") + T("explanation");
      });
      explWrap.appendChild(explToggle);
      explWrap.appendChild(explBody);
      wrap.appendChild(explWrap);
    }

    editBtn.addEventListener("click", function () {
      if (editor.style.display === "none") {
        editor.style.display = "block"; pre.style.display = "none";
        editor.style.height = Math.max(editor.scrollHeight, 120) + "px";
        editBtn.innerHTML = "✓ " + T("edit"); editor.focus();
      } else {
        editor.style.display = "none"; pre.style.display = "block";
        codeEl.innerHTML = highlight(editor.value); editBtn.innerHTML = "✎ " + T("edit");
      }
    });

    copyBtn.addEventListener("click", function () {
      copyText(currentCode()); copyBtn.classList.add("copied"); copyBtn.textContent = T("copied");
      setTimeout(function () { copyBtn.classList.remove("copied"); copyBtn.textContent = T("copy"); }, 1400);
    });

    wsBtn.addEventListener("click", function () { pendingWorkspaceCode = currentCode(); location.hash = "#/workspace"; });

    runBtn.addEventListener("click", function () {
      if (runBtn.disabled) return;
      runBtn.disabled = true;
      var original = runBtn.innerHTML;
      runBtn.innerHTML = '<span class="spin"></span> ' + T("running");
      out.style.display = "block";
      window.DPRunner.run(currentCode()).then(function (res) {
        out.classList.add("appear");
        setTimeout(function () { out.classList.remove("appear"); }, 320);
        if (res.ok) {
          out.classList.remove("err");
          out.innerHTML = '<span class="out-label live"><span class="live-dot"></span>' + T("liveOutput") + "</span>" +
            escapeHtml(res.output && res.output.length ? res.output : "(no output)");
        } else {
          out.innerHTML = '<span class="out-label">' + T("expected") + "</span>" +
            (ex.output ? escapeHtml(ex.output) : "") +
            '<div style="margin-top:8px;color:var(--text-faint);font-size:12px">⚠ ' + escapeHtml(T("offlineNote")) + "</div>";
        }
      }).finally(function () { runBtn.disabled = false; runBtn.innerHTML = original; });
    });

    return wrap;
  }

  function buildPageNav(mod) {
    var idx = MODULES.indexOf(mod), prev = MODULES[idx - 1], next = MODULES[idx + 1];
    var nav = el("div", "page-nav");
    if (prev) { var p = el("a", "prev"); p.href = "#/module/" + prev.id; p.innerHTML = '<div class="pn-dir">← ' + T("prev") + '</div><div class="pn-title">M' + prev.id + " · " + escapeHtml(modTitle(prev)) + "</div>"; nav.appendChild(p); }
    else { var pd = el("a", "prev disabled"); pd.innerHTML = '<div class="pn-dir">← ' + T("prev") + '</div><div class="pn-title">' + T("start") + "</div>"; nav.appendChild(pd); }
    if (next) { var nx = el("a", "next"); nx.href = "#/module/" + next.id; nx.innerHTML = '<div class="pn-dir">' + T("next") + ' →</div><div class="pn-title">M' + next.id + " · " + escapeHtml(modTitle(next)) + "</div>"; nav.appendChild(nx); }
    else { var nd = el("a", "next disabled"); nd.innerHTML = '<div class="pn-dir">' + T("next") + ' →</div><div class="pn-title">' + T("end") + "</div>"; nav.appendChild(nd); }
    return nav;
  }

  /* ---------- Workspace ---------- */
  var WS_SAMPLES = [
    { name: "Hello World", code: 'print("Hello from Code Origin.AI!")\nprint("Welcome to Digital Python Notes")' },
    { name: "Variables", code: '# Variables demo\nname = "Arjun"\nage = 25\nsalary = 45000.50\n\nprint(f"Name: {name}")\nprint(f"Age: {age}")\nprint(f"Salary: {salary}")' },
    { name: "Loop", code: '# For loop with range\nfor i in range(1, 11):\n    print(f"Line {i}: {\"*\" * i}")' },
    { name: "Sum 1..100", code: '# Sum of numbers 1 to 100\ntotal = sum(range(1, 101))\nprint(f"Sum of 1 to 100 = {total}")' },
    { name: "FizzBuzz", code: '# Classic FizzBuzz\nfor n in range(1, 21):\n    if n % 15 == 0:\n        print("FizzBuzz")\n    elif n % 3 == 0:\n        print("Fizz")\n    elif n % 5 == 0:\n        print("Buzz")\n    else:\n        print(n)' },
    { name: "Factorial", code: '# Recursive factorial\ndef factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nfor i in range(1, 11):\n    print(f"{i}! = {factorial(i)}")' },
    { name: "List & Dict", code: '# List operations\nnums = [5, 2, 8, 1, 9, 3]\nnums.sort()\nprint("Sorted:", nums)\nprint("Max:", max(nums))\nprint("Sum:", sum(nums))\n\n# Dictionary\nstudent = {"name": "Sara", "score": 95}\nfor k, v in student.items():\n    print(f"  {k}: {v}")' },
    { name: "OOP Class", code: '# Object-Oriented Programming\nclass BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n    \n    def deposit(self, amount):\n        self.balance += amount\n        print(f"Deposited {amount}. Balance: {self.balance}")\n    \n    def withdraw(self, amount):\n        if amount > self.balance:\n            print("Insufficient funds!")\n        else:\n            self.balance -= amount\n            print(f"Withdrew {amount}. Balance: {self.balance}")\n\nacc = BankAccount("Ravi", 1000)\nacc.deposit(500)\nacc.withdraw(200)\nacc.withdraw(2000)' },
    { name: "Pattern", code: '# Diamond pattern\nn = 5\nfor i in range(1, n+1):\n    print(" " * (n-i) + "*" * (2*i-1))\nfor i in range(n-1, 0, -1):\n    print(" " * (n-i) + "*" * (2*i-1))' },
    { name: "File & JSON", code: 'import json\n\n# Create data\nstudents = [\n    {"name": "Arjun", "marks": 85},\n    {"name": "Meera", "marks": 92},\n    {"name": "Ravi", "marks": 78}\n]\n\n# Convert to JSON\njson_str = json.dumps(students, indent=2)\nprint(json_str)\nprint(f"\\nTotal students: {len(students)}")\nprint(f"Average: {sum(s[\"marks\"] for s in students)/len(students):.1f}")' }
  ];

  /* ---------- Progress Tracking ---------- */
  var PROGRESS = { completed: {} };
  try { var saved = localStorage.getItem("dp-progress"); if (saved) PROGRESS = JSON.parse(saved); } catch (e) {}
  function saveProgress() { try { localStorage.setItem("dp-progress", JSON.stringify(PROGRESS)); } catch (e) {} }
  function markModuleVisited(modId) {
    if (!PROGRESS.completed[modId]) { PROGRESS.completed[modId] = Date.now(); saveProgress(); }
  }
  function getProgressPercent() {
    var total = MODULES.length;
    var done = Object.keys(PROGRESS.completed).length;
    return Math.round((done / total) * 100);
  }

  function renderWorkspace() {
    var content = $("#content"); content.innerHTML = "";
    var ws = el("div", "workspace");
    ws.innerHTML =
      '<div class="ws-header"><h1><span class="ws-emoji">▶️</span> ' + escapeHtml(T("workspaceTitle")) + "</h1><p>" + escapeHtml(T("workspaceDesc")) + "</p></div>";

    var panel = el("div", "ws-panel");
    var toolbar = el("div", "ws-toolbar");
    toolbar.innerHTML =
      '<span class="dots"><span class="r"></span><span class="y"></span><span class="g"></span></span>' +
      '<span class="ws-file">main.py</span><span class="spacer"></span>' +
      '<span class="ws-status" id="wsStatus"></span>' +
      '<button class="ws-btn" id="wsClear">🧹 ' + T("clear") + "</button>" +
      '<button class="ws-btn run" id="wsRun">▶ ' + T("run") + "</button>";
    panel.appendChild(toolbar);

    var editorWrap = el("div", "ws-editor-wrap");
    var lineNums = el("div", "ws-lines"); lineNums.id = "wsLines";
    var editor = el("textarea", "ws-editor"); editor.id = "wsEditor"; editor.spellcheck = false;
    editor.value = pendingWorkspaceCode != null ? pendingWorkspaceCode : WS_SAMPLES[4].code;
    pendingWorkspaceCode = null;
    editorWrap.appendChild(lineNums);
    editorWrap.appendChild(editor);
    panel.appendChild(editorWrap);

    function updateLineNums() {
      var lines = editor.value.split("\n").length;
      var html = "";
      for (var i = 1; i <= Math.max(lines, 12); i++) html += i + "\n";
      lineNums.textContent = html;
    }
    updateLineNums();
    editor.addEventListener("input", updateLineNums);
    editor.addEventListener("scroll", function () { lineNums.scrollTop = editor.scrollTop; });

    var console = el("div", "ws-console"); console.id = "wsConsole";
    console.innerHTML = '<span class="ph"># ' + escapeHtml(T("runHint")) + "</span>";
    panel.appendChild(console);
    ws.appendChild(panel);

    var samples = el("div", "ws-samples");
    WS_SAMPLES.forEach(function (s) {
      var chip = el("button", "ws-sample", "📄 " + s.name);
      chip.addEventListener("click", function () { editor.value = s.code; editor.focus(); });
      samples.appendChild(chip);
    });
    ws.appendChild(samples);
    ws.appendChild(el("footer", "app-footer", "<strong>" + escapeHtml(T("heroTitle")) + "</strong> — " + escapeHtml(T("footer"))));
    content.appendChild(ws);

    // Tab key inserts spaces
    editor.addEventListener("keydown", function (e) {
      if (e.key === "Tab") { e.preventDefault(); var s = this.selectionStart, en = this.selectionEnd; this.value = this.value.slice(0, s) + "    " + this.value.slice(en); this.selectionStart = this.selectionEnd = s + 4; }
    });

    var statusEl = $("#wsStatus");
    function setStatus(kind) {
      if (kind === "loading") statusEl.innerHTML = '<span class="spin"></span>' + T("loadingPython");
      else if (kind === "ready") statusEl.innerHTML = '<span class="ok-dot"></span>' + T("pythonReady");
      else statusEl.innerHTML = "";
    }
    if (window.DPRunner.isReady()) setStatus("ready");
    window.DPRunner.onStatus(function (s) { if ($("#wsStatus")) setStatus(s === "ready" ? "ready" : (s === "loading" ? "loading" : "")); });
    window.DPRunner.preload().catch(function () { if ($("#wsStatus")) statusEl.innerHTML = ""; });

    $("#wsClear").addEventListener("click", function () { editor.value = ""; editor.focus(); });
    $("#wsRun").addEventListener("click", function () {
      var btn = this; if (btn.disabled) return; btn.disabled = true;
      var orig = btn.innerHTML; btn.innerHTML = '<span class="spin"></span> ' + T("running");
      console.innerHTML = '<span class="ph"># ' + escapeHtml(T("running")) + "</span>";
      window.DPRunner.run(editor.value).then(function (res) {
        if (res.ok) { console.classList.remove("err"); console.textContent = res.output && res.output.length ? res.output : "(no output)"; }
        else { console.innerHTML = '<span class="err">⚠ ' + escapeHtml(T("offlineNote")) + "</span>"; }
      }).finally(function () { btn.disabled = false; btn.innerHTML = orig; });
    });

    highlightSidebar(null, null);
    document.title = T("workspaceTitle") + " | " + T("heroTitle");
    content.focus(); window.scrollTo(0, 0);
  }

  /* ---------- AI Explain Page ---------- */
  function renderAIExplain() {
    var content = $("#content"); content.innerHTML = "";
    var page = el("div", "ai-explain-page");

    // Header
    page.innerHTML = '<div class="ai-header">' +
      '<h1><span class="ai-icon">🤖</span> AI Python Teacher</h1>' +
      '<p class="ai-subtitle">Select a topic and language — get detailed corporate-level explanation instantly</p>' +
      '</div>';

    // Controls
    var controls = el("div", "ai-controls");

    // Topic selector
    var topicSelect = el("select", "ai-select"); topicSelect.id = "aiTopic";
    topicSelect.innerHTML = '<option value="">— Select a Topic —</option>';
    MODULES.forEach(function (mod) {
      var group = el("optgroup");
      group.label = "M" + mod.id + ": " + modTitle(mod);
      (mod.concepts || []).forEach(function (con) {
        var opt = el("option");
        opt.value = mod.id + "|" + con.title;
        opt.textContent = con.title;
        group.appendChild(opt);
      });
      topicSelect.appendChild(group);
    });
    controls.appendChild(topicSelect);

    // Language selector
    var langSelect = el("select", "ai-select"); langSelect.id = "aiLang";
    window.DPI18N.languages.forEach(function (l) {
      var opt = el("option");
      opt.value = l.code;
      opt.textContent = l.flag + " " + l.label;
      if (l.code === window.DPI18N.get()) opt.selected = true;
      langSelect.appendChild(opt);
    });
    controls.appendChild(langSelect);

    // Explain button
    var explainBtn = el("button", "ai-btn", "🧠 Explain This Topic");
    explainBtn.id = "aiExplainBtn";
    controls.appendChild(explainBtn);

    // Voice teach button
    var voiceBtn = el("button", "ai-btn ai-voice-btn", "🔊 Voice Teach");
    voiceBtn.id = "aiVoiceBtn";
    controls.appendChild(voiceBtn);

    page.appendChild(controls);

    // Voice controls (hidden until speaking)
    var voiceControls = el("div", "voice-controls"); voiceControls.id = "voiceControls"; voiceControls.style.display = "none";
    voiceControls.innerHTML = '<div class="voice-status"><span class="voice-indicator"></span><span class="voice-text" id="voiceStatusText">Teaching...</span></div>' +
      '<div class="voice-btns">' +
      '<button class="voice-ctrl-btn" id="voicePause">⏸ Pause</button>' +
      '<button class="voice-ctrl-btn" id="voiceStop">⏹ Stop</button>' +
      '<div class="voice-speed"><label>Speed:</label><input type="range" id="voiceSpeed" min="50" max="150" value="88" step="5"></div>' +
      '</div>';
    page.appendChild(voiceControls);

    // Result area
    var resultArea = el("div", "ai-result"); resultArea.id = "aiResult";
    resultArea.innerHTML = '<div class="ai-placeholder"><div class="ai-placeholder-icon">📚</div><p>Select a topic above and click "Explain" to get a detailed, step-by-step explanation in your chosen language.</p><p class="ai-placeholder-sub">The explanation includes: Introduction, Real-life analogy, Visual diagram, Syntax breakdown, Examples with execution trace, Common mistakes, and Interview questions.</p></div>';
    page.appendChild(resultArea);

    content.appendChild(page);

    // Event handler - Explain
    explainBtn.addEventListener("click", function () {
      var topicVal = topicSelect.value;
      var langCode = langSelect.value;
      if (!topicVal) { resultArea.innerHTML = '<div class="ai-error">⚠️ Please select a topic first!</div>'; return; }

      var parts = topicVal.split("|");
      var modId = parseInt(parts[0]);
      var conTitle = parts[1];
      var mod = MODULE_BY_ID[modId];
      if (!mod) return;

      var concept = null;
      (mod.concepts || []).forEach(function (c) { if (c.title === conTitle) concept = c; });
      if (!concept) return;

      // Generate the full explanation
      resultArea.innerHTML = '<div class="ai-loading"><div class="ai-loading-spinner"></div><p>Generating detailed explanation...</p></div>';

      setTimeout(function () {
        var html = generateAIExplanation(concept, mod, langCode);
        resultArea.innerHTML = html;
        resultArea.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 600);
    });

    // Event handler - Voice Teach
    voiceBtn.addEventListener("click", function () {
      var topicVal = topicSelect.value;
      var langCode = langSelect.value;
      if (!topicVal) { resultArea.innerHTML = '<div class="ai-error">⚠️ Please select a topic first!</div>'; return; }
      if (!window.DPVoice || !window.DPVoice.isSupported) {
        resultArea.innerHTML = '<div class="ai-error">⚠️ Voice is not supported in this browser. Please use Chrome, Safari, or Edge.</div>';
        return;
      }

      var parts = topicVal.split("|");
      var modId = parseInt(parts[0]);
      var conTitle = parts[1];
      var mod = MODULE_BY_ID[modId];
      if (!mod) return;

      var concept = null;
      (mod.concepts || []).forEach(function (c) { if (c.title === conTitle) concept = c; });
      if (!concept) return;

      // Start voice teaching
      voiceControls.style.display = "flex";
      document.querySelector("#voiceStatusText").textContent = "🎓 Teaching: " + concept.title + "...";
      window.DPVoice.teach(concept, langCode);
    });

    // Voice control buttons
    if (window.DPVoice) {
      window.DPVoice.onEvent(function (event, data) {
        var vc = document.querySelector("#voiceControls");
        var st = document.querySelector("#voiceStatusText");
        if (!vc || !st) return;
        if (event === "start") { vc.style.display = "flex"; st.textContent = "🎓 Teaching..."; }
        else if (event === "progress") { st.textContent = "🗣️ " + (data.text || "").slice(0, 60) + (data.text && data.text.length > 60 ? "..." : ""); }
        else if (event === "end") { st.textContent = "✅ Explanation complete!"; setTimeout(function(){ vc.style.display = "none"; }, 3000); }
        else if (event === "stop") { vc.style.display = "none"; }
        else if (event === "pause") { st.textContent = "⏸ Paused"; }
        else if (event === "resume") { st.textContent = "🗣️ Resuming..."; }
      });
    }

    // Pause/Stop/Speed controls
    setTimeout(function () {
      var pauseBtn = document.querySelector("#voicePause");
      var stopBtn = document.querySelector("#voiceStop");
      var speedSlider = document.querySelector("#voiceSpeed");
      if (pauseBtn) pauseBtn.addEventListener("click", function () {
        if (window.DPVoice.isPaused()) { window.DPVoice.resume(); pauseBtn.textContent = "⏸ Pause"; }
        else { window.DPVoice.pause(); pauseBtn.textContent = "▶ Resume"; }
      });
      if (stopBtn) stopBtn.addEventListener("click", function () { window.DPVoice.stop(); });
      if (speedSlider) speedSlider.addEventListener("input", function () { window.DPVoice.setRate(parseInt(this.value) / 100); });
    }, 100);

    highlightSidebar(null, null);
    document.title = "AI Python Teacher | " + T("heroTitle");
    content.focus(); window.scrollTo(0, 0);
  }

  function generateAIExplanation(concept, mod, langCode) {
    var html = '<div class="ai-explanation">';

    // Title
    html += '<div class="ai-exp-header"><h2>' + escapeHtml(concept.title) + '</h2>' +
      '<span class="ai-exp-module">Module ' + mod.id + ': ' + escapeHtml(modTitle(mod)) + '</span></div>';

    // Step 1: Introduction
    html += '<div class="ai-step"><div class="ai-step-head"><span class="ai-step-num">1</span><span class="ai-step-title">📖 Introduction — What is it & Why?</span></div><div class="ai-step-body">';
    if (concept.introduction) {
      html += renderNotes(concept.introduction);
    } else {
      html += '<p><strong>What is ' + escapeHtml(concept.title) + '?</strong></p>';
      html += renderNotes(concept.notes || ["This is a fundamental Python concept that every developer must understand."]);
      html += '<p><strong>Why is it important?</strong> This concept is used in real-world applications including web development, data science, automation, and enterprise software.</p>';
      html += '<p><strong>Where companies use it:</strong> Google, Amazon, Microsoft, Flipkart, and thousands of startups use this daily.</p>';
    }
    html += '</div></div>';

    // Step 2: Analogy
    html += '<div class="ai-step"><div class="ai-step-head"><span class="ai-step-num">2</span><span class="ai-step-title">🏠 Real-Life Analogy</span></div><div class="ai-step-body">';
    if (concept.analogy) {
      html += renderNotes(concept.analogy);
    } else {
      html += '<p><strong>Think of it like this:</strong></p>';
      html += '<p>Imagine you are in a <strong>school classroom</strong>. The teacher gives instructions step by step, and students follow them one by one. That is exactly how Python works — it reads your code line by line from top to bottom and follows each instruction.</p>';
      html += '<p>Just like a <strong>recipe book</strong> has step 1, step 2, step 3... your Python program has line 1, line 2, line 3... and Python follows them in order.</p>';
    }
    html += '</div></div>';

    // Step 3: Visual
    html += '<div class="ai-step"><div class="ai-step-head"><span class="ai-step-num">3</span><span class="ai-step-title">📊 Visual Explanation</span></div><div class="ai-step-body">';
    if (concept.diagram) {
      html += '<pre class="diagram-box">' + escapeHtml(typeof concept.diagram === 'string' ? concept.diagram : concept.diagram.join('\n')) + '</pre>';
    } else {
      html += '<pre class="diagram-box">┌────────────────────────────────────┐\n│  ' + escapeHtml(concept.title).slice(0,30) + '            │\n├────────────────────────────────────┤\n│                                    │\n│   Input → Process → Output         │\n│                                    │\n│   Your Code → Python Engine →      │\n│              → Result on Screen     │\n│                                    │\n└────────────────────────────────────┘</pre>';
    }
    html += '</div></div>';

    // Step 4: Syntax
    html += '<div class="ai-step"><div class="ai-step-head"><span class="ai-step-num">4</span><span class="ai-step-title">⌨️ Syntax Breakdown</span></div><div class="ai-step-body">';
    if (concept.syntax) {
      html += renderNotes(concept.syntax);
    } else if (concept.examples && concept.examples.length) {
      html += '<p><strong>Basic syntax:</strong></p>';
      html += '<pre class="diagram-box">' + escapeHtml(concept.examples[0].code) + '</pre>';
      html += '<p>Every symbol matters in Python — indentation (spaces at the beginning), colons, brackets, and quotes all have specific meaning.</p>';
    }
    html += '</div></div>';

    // Step 5-7: Examples with traces
    if (concept.examples && concept.examples.length) {
      html += '<div class="ai-step"><div class="ai-step-head"><span class="ai-step-num">5-7</span><span class="ai-step-title">💡 Examples with Execution Trace</span></div><div class="ai-step-body">';
      var shown = Math.min(concept.examples.length, 5);
      for (var i = 0; i < shown; i++) {
        var ex = concept.examples[i];
        html += '<div class="ai-example"><div class="ai-example-title">' + escapeHtml(ex.title || 'Example ' + (i+1)) + '</div>';
        html += '<pre class="diagram-box">' + escapeHtml(ex.code) + '</pre>';
        if (ex.output) html += '<div class="ai-example-output">Output: ' + escapeHtml(ex.output) + '</div>';
        // Auto explanation
        var expl = ex.explanation || (window.DPExplainer ? window.DPExplainer.explain(ex.code, ex.title) : null);
        if (expl) {
          html += '<div class="ai-example-trace">' + renderNotes(expl) + '</div>';
        }
        html += '</div>';
      }
      html += '</div></div>';
    }

    // Step 8: Mistakes
    html += '<div class="ai-step"><div class="ai-step-head"><span class="ai-step-num">8</span><span class="ai-step-title">⚠️ Common Mistakes</span></div><div class="ai-step-body">';
    if (concept.mistakes && concept.mistakes.length) {
      concept.mistakes.forEach(function (m) {
        html += '<div class="ai-mistake"><div class="ai-mistake-wrong">❌ Wrong: <code>' + escapeHtml(m.wrong) + '</code></div>';
        html += '<div class="ai-mistake-right">✅ Correct: <code>' + escapeHtml(m.right) + '</code></div>';
        html += '<div class="ai-mistake-why">' + escapeHtml(m.explanation) + '</div></div>';
      });
    } else {
      html += '<p><strong>Most common beginner mistakes:</strong></p><ul><li>Forgetting the colon <code>:</code> at the end of statements</li><li>Wrong indentation (Python uses spaces to define code blocks)</li><li>Mixing up <code>=</code> (assignment) and <code>==</code> (comparison)</li><li>Forgetting to close quotes or brackets</li></ul>';
    }
    html += '</div></div>';

    // Step 9: Interview Questions
    html += '<div class="ai-step"><div class="ai-step-head"><span class="ai-step-num">9</span><span class="ai-step-title">🎯 Interview Questions</span></div><div class="ai-step-body">';
    if (concept.interview && concept.interview.length) {
      concept.interview.forEach(function (qa, i) {
        html += '<div class="ai-qa"><strong>Q' + (i+1) + ': ' + escapeHtml(qa.q) + '</strong><p>' + renderNotes(qa.a) + '</p></div>';
      });
    } else {
      html += '<div class="ai-qa"><strong>Q1: Explain ' + escapeHtml(concept.title) + ' in simple words.</strong><p>This is a fundamental concept in Python that deals with ' + escapeHtml(concept.title.toLowerCase()) + '. It is commonly asked in interviews at all levels.</p></div>';
      html += '<div class="ai-qa"><strong>Q2: Give a real-world use case.</strong><p>Companies use this in production applications for data processing, automation, and building scalable systems.</p></div>';
    }
    html += '</div></div>';

    // Step 10: Practice
    html += '<div class="ai-step"><div class="ai-step-head"><span class="ai-step-num">10-11</span><span class="ai-step-title">🏋️ Practice Problems</span></div><div class="ai-step-body">';
    if (concept.practice && concept.practice.length) {
      concept.practice.forEach(function (p, i) {
        html += '<div class="ai-practice"><strong>#' + (i+1) + ' [' + (p.difficulty || 'Medium') + ']:</strong> ' + escapeHtml(p.problem) + (p.hint ? '<br><em>Hint: ' + escapeHtml(p.hint) + '</em>' : '') + '</div>';
      });
    } else {
      html += '<div class="ai-practice"><strong>#1 [Easy]:</strong> Write a simple program using ' + escapeHtml(concept.title) + '.</div>';
      html += '<div class="ai-practice"><strong>#2 [Medium]:</strong> Solve a real-world problem using this concept.</div>';
      html += '<div class="ai-practice"><strong>#3 [Hard]:</strong> Combine this with other concepts to build something useful.</div>';
    }
    html += '</div></div>';

    // Step 12: Revision
    html += '<div class="ai-step"><div class="ai-step-head"><span class="ai-step-num">12</span><span class="ai-step-title">📋 Quick Revision</span></div><div class="ai-step-body">';
    if (concept.revision) {
      html += renderNotes(concept.revision);
    } else {
      html += '<p><strong>Remember these key points:</strong></p><ul><li>Understand the basic syntax and structure</li><li>Practice with multiple examples</li><li>Try modifying the examples to see what happens</li><li>Use the Workspace to experiment</li></ul>';
    }
    html += '</div></div>';

    html += '</div>';
    return html;
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).catch(function () { fallbackCopy(text); });
    else fallbackCopy(text);
  }
  function fallbackCopy(text) { var ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} document.body.removeChild(ta); }

  /* ---------- Search ---------- */
  var SEARCH_INDEX = [];
  function buildSearchIndex() {
    SEARCH_INDEX = [];
    MODULES.forEach(function (mod) {
      SEARCH_INDEX.push({ type: "module", title: modTitle(mod) + " " + mod.title, display: modTitle(mod), path: T("modulesLabel") + " " + mod.id, hash: "#/module/" + mod.id, text: (mod.title + " " + modTitle(mod) + " " + (mod.summary || "")).toLowerCase() });
      (mod.concepts || []).forEach(function (con) {
        var exText = (con.examples || []).map(function (e) { return (e.title || "") + " " + (e.code || ""); }).join(" ");
        SEARCH_INDEX.push({ type: "concept", title: con.title, display: con.title, path: T("modulesLabel") + " " + mod.id + " · " + modTitle(mod), hash: "#/module/" + mod.id + "/" + slug(con.title), text: (con.title + " " + (typeof con.notes === "string" ? con.notes : (con.notes || []).join(" ")) + " " + exText).toLowerCase() });
      });
    });
  }
  function runSearch(q) {
    var box = $("#searchResults"); q = q.trim().toLowerCase();
    if (!q) { box.hidden = true; box.innerHTML = ""; return; }
    var results = [];
    for (var i = 0; i < SEARCH_INDEX.length && results.length < 40; i++) {
      var item = SEARCH_INDEX[i], ti = item.title.toLowerCase().indexOf(q), bi = item.text.indexOf(q);
      if (ti !== -1 || bi !== -1) results.push({ item: item, score: (ti !== -1 ? 0 : 1) + (item.type === "module" ? 0 : 0.1) });
    }
    results.sort(function (a, b) { return a.score - b.score; });
    if (!results.length) { box.innerHTML = '<div class="sr-empty">No results for “' + escapeHtml(q) + '”</div>'; box.hidden = false; return; }
    box.innerHTML = "";
    results.forEach(function (r, i) {
      var a = el("a", "sr-item" + (i === 0 ? " active" : "")); a.href = r.item.hash;
      var t = escapeHtml(r.item.display).replace(new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig"), "<mark>$1</mark>");
      a.innerHTML = '<div class="sr-title">' + t + '</div><div class="sr-path">' + (r.item.type === "module" ? "📘 " : "🧩 ") + escapeHtml(r.item.path) + "</div>";
      a.addEventListener("click", closeSearch); box.appendChild(a);
    });
    box.hidden = false;
  }
  function closeSearch() { var box = $("#searchResults"); box.hidden = true; box.innerHTML = ""; $("#searchInput").value = ""; }

  /* ---------- Router ---------- */
  function currentRoute() { return location.hash || "#/"; }
  function route() {
    var hash = currentRoute();
    if (/^#\/workspace/.test(hash)) { renderWorkspace(); }
    else if (/^#\/ai-explain/.test(hash)) { renderAIExplain(); }
    else {
      var m = hash.match(/^#\/module\/(\d+)(?:\/([^/]+))?/);
      if (m) renderModule(parseInt(m[1], 10), m[2] || null);
      else renderHome();
    }
    document.body.classList.remove("nav-open");
  }

  /* ---------- Theme ---------- */
  function initTheme() {
    var saved = null; try { saved = localStorage.getItem("dp-theme"); } catch (e) {}
    if (saved) document.documentElement.setAttribute("data-theme", saved);
    $("#themeToggle").addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme"), next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("dp-theme", next); } catch (e) {}
    });
    $("#themeToggle").title = T("themeTitle");
  }

  /* ---------- Language menu ---------- */
  function initLangMenu() {
    var wrap = $("#langWrap"), btn = $("#langBtn"), menu = $("#langMenu");
    function curLabel() {
      var code = window.DPI18N.get();
      var found = window.DPI18N.languages.filter(function (l) { return l.code === code; })[0];
      return found ? found.label : "English";
    }
    function refreshBtn() { $("#langCur").textContent = curLabel(); }
    function buildMenu() {
      menu.innerHTML = "";
      window.DPI18N.languages.forEach(function (l) {
        var b = el("button", l.code === window.DPI18N.get() ? "active" : "");
        b.innerHTML = "<span>" + l.flag + "</span><span>" + l.label + "</span>" + (l.code === window.DPI18N.get() ? '<span class="tick">✓</span>' : "");
        b.addEventListener("click", function () {
          window.DPI18N.set(l.code); menu.hidden = true; wrap.classList.remove("open");
          refreshLanguage();
        });
        menu.appendChild(b);
      });
    }
    refreshBtn(); buildMenu(); menu.hidden = true;
    btn.addEventListener("click", function (e) { e.stopPropagation(); menu.hidden = !menu.hidden; wrap.classList.toggle("open"); if (!menu.hidden) buildMenu(); });
    document.addEventListener("click", function (e) { if (!e.target.closest("#langWrap")) { menu.hidden = true; wrap.classList.remove("open"); } });
    window._dpRefreshLangBtn = refreshBtn;
  }

  function refreshLanguage() {
    // rebuild everything that shows text
    $("#searchInput").placeholder = T("searchPlaceholder");
    $("#brandSub").textContent = T("brandSub");
    $("#themeToggle").title = T("themeTitle");
    if (window._dpRefreshLangBtn) window._dpRefreshLangBtn();
    buildSidebar();
    buildSearchIndex();
    route(); // re-render current view in the new language
  }

  /* ---------- Boot ---------- */
  function boot() {
    MODULES.forEach(function (mod) { (mod.concepts || []).forEach(function (con) { con._modId = mod.id; }); });
    MODULES.sort(function (a, b) { return a.id - b.id; });

    // static UI text
    $("#searchInput").placeholder = T("searchPlaceholder");
    $("#brandSub").textContent = T("brandSub");

    buildSidebar(); buildSearchIndex(); initTheme(); initLangMenu();

    var input = $("#searchInput");
    input.addEventListener("input", function () { runSearch(input.value); });
    input.addEventListener("keydown", function (e) {
      var box = $("#searchResults"), active = box.querySelector(".sr-item.active");
      if (e.key === "Escape") { closeSearch(); input.blur(); }
      else if (e.key === "Enter" && active) { e.preventDefault(); location.hash = active.getAttribute("href"); closeSearch(); input.blur(); }
      else if ((e.key === "ArrowDown" || e.key === "ArrowUp") && active) {
        e.preventDefault(); var items = Array.prototype.slice.call(box.querySelectorAll(".sr-item")), idx = items.indexOf(active);
        var nidx = e.key === "ArrowDown" ? Math.min(items.length - 1, idx + 1) : Math.max(0, idx - 1);
        active.classList.remove("active"); items[nidx].classList.add("active"); items[nidx].scrollIntoView({ block: "nearest" });
      }
    });
    document.addEventListener("click", function (e) { if (!e.target.closest(".search-wrap")) $("#searchResults").hidden = true; });
    document.addEventListener("keydown", function (e) { if (e.key === "/" && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) { e.preventDefault(); input.focus(); } });

    $("#menuToggle").addEventListener("click", function () { document.body.classList.toggle("nav-open"); });
    $("#scrim").addEventListener("click", function () { document.body.classList.remove("nav-open"); });

    window.addEventListener("hashchange", route);
    route();

    // Scroll-reveal animation (IntersectionObserver)
    if (window.IntersectionObserver) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
      // Observe new elements after each route change
      var oldRoute = route;
      route = function () {
        oldRoute();
        setTimeout(function () {
          document.querySelectorAll(".example, .concept, .mod-card").forEach(function (el) {
            el.classList.add("reveal");
            revealObserver.observe(el);
          });
        }, 50);
      };
      route(); // Initial
    }
  }
})();

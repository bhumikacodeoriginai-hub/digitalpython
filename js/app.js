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
    // Test-your-knowledge shortcut → jumps into the interview page filtered to the closest topic
    var iv = window.DP_INTERVIEW;
    if (iv && iv.questions && iv.levels) {
      var moduleTitleLc = String(mod.title || "").toLowerCase();
      var matchTopic = null;
      iv.levels.forEach(function (lvl) {
        var ll = lvl.toLowerCase();
        if (matchTopic) return;
        if (moduleTitleLc.indexOf(ll) !== -1 || ll.indexOf(moduleTitleLc.split(" ")[0]) !== -1) matchTopic = lvl;
      });
      var testCard = el("div", "module-testcard");
      testCard.innerHTML =
        '<div class="module-testcard-head">🎯 Test your interview knowledge</div>' +
        '<div class="module-testcard-body">Ready to see if you\'d answer this in an interview? Practise ' + escapeHtml(matchTopic || "any topic") + ' questions with self-assessment.</div>' +
        '<div class="module-testcard-actions">' +
          '<a class="module-testcard-btn module-testcard-btn-primary" href="#/interview" data-filter="' + (matchTopic || "") + '">🔍 Browse Questions</a>' +
          '<a class="module-testcard-btn" href="#/interview/output">🔮 Predict Output</a>' +
          '<a class="module-testcard-btn" href="#/interview/mock">🎤 Start Mock</a>' +
        '</div>';
      page.appendChild(testCard);
      // Wire the filter link
      testCard.querySelector('[data-filter]').addEventListener("click", function () {
        var t = this.dataset.filter;
        if (t) interviewFilters = { level: t, difficulty: "", company: "", search: "", frequency: "", round: "", questionType: "", showBookmarked: false, showStudied: null };
      });
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

  /* ---------- Interview Prep Page ---------- */
  var interviewFilters = { level: "", difficulty: "", company: "", search: "", frequency: "", round: "", questionType: "", showBookmarked: false, showStudied: null };

  function renderInterviewTabs(activeTab) {
    var tabs = el("div", "iv-tabs");
    var due = (window.DPProgress && window.DPProgress.dueReviewCount) ? window.DPProgress.dueReviewCount() : 0;
    var items = [
      { id: "browse",  label: "🔍 Browse",       hash: "#/interview" },
      { id: "rapid",   label: "⚡ Rapid Fire",   hash: "#/interview/rapid-fire" },
      { id: "output",  label: "🔮 Predict Output", hash: "#/interview/output" },
      { id: "debug",   label: "🐞 Find the Bug", hash: "#/interview/debug" },
      { id: "mock",    label: "🎤 Mock",         hash: "#/interview/mock" },
      { id: "adaptive",label: "🧠 Adaptive",     hash: "#/interview/adaptive" },
      { id: "review",  label: "🔁 Review" + (due ? ' <span class="iv-tab-badge">' + due + '</span>' : ""), hash: "#/interview/review" },
      { id: "roles",   label: "🎭 By Role",      hash: "#/interview/roles" },
      { id: "tomorrow",label: "🌅 Tomorrow",     hash: "#/interview/tomorrow" },
      { id: "scenarios",label: "🚨 Scenarios",   hash: "#/interview/scenarios" },
      { id: "sysdes",  label: "🏛️ System Design", hash: "#/interview/system-design" },
      { id: "jd",      label: "📋 JD Analyzer",  hash: "#/interview/jd" },
      { id: "rounds",  label: "🎯 By Round",     hash: "#/interview/rounds" },
      { id: "dash",    label: "📊 Dashboard",    hash: "#/interview/dashboard" },
      { id: "plans",   label: "📅 Study Plans",  hash: "#/interview/plans" }
    ];
    items.forEach(function (it) {
      var a = el("a", "iv-tab" + (it.id === activeTab ? " active" : ""));
      a.href = it.hash;
      a.innerHTML = it.label;
      tabs.appendChild(a);
    });
    return tabs;
  }

  function renderInterview() {
    var content = $("#content"); content.innerHTML = "";
    var data = window.DP_INTERVIEW;
    if (!data) { content.innerHTML = '<div class="ai-error">Interview data not loaded.</div>'; return; }

    var page = el("div", "interview-page");
    var totalQ = data.questions.length;

    // Header
    page.innerHTML = '<div class="iv-header">' +
      '<h1><span class="iv-icon">🎯</span> Interview Preparation</h1>' +
      '<p class="iv-subtitle">Master Python interviews from fresher to senior (0-10+ years). Structured answers with analogies, code, complexity & tips.</p>' +
      '<div class="iv-stats">' +
        '<span class="iv-stat"><b>' + totalQ + '</b> Questions</span>' +
        '<span class="iv-stat"><b>' + data.levels.length + '</b> Topics</span>' +
        '<span class="iv-stat"><b>' + ((data.companyGuideExtended || data.companyGuide) || []).length + '</b> Company Guides</span>' +
        '<span class="iv-stat"><b>' + (data.rounds ? data.rounds.length : 0) + '</b> Rounds</span>' +
      '</div></div>';
    page.appendChild(renderInterviewTabs("browse"));

    // Filter bar
    var filterBar = el("div", "iv-filters");
    // Search
    var searchInp = el("input", "iv-search"); searchInp.type = "search"; searchInp.placeholder = "🔍 Search questions...";
    searchInp.value = interviewFilters.search;
    filterBar.appendChild(searchInp);
    // Level filter
    var levelSel = el("select", "iv-select");
    levelSel.innerHTML = '<option value="">All Topics</option>' + data.levels.map(function (l) { return '<option value="' + l + '"' + (interviewFilters.level === l ? ' selected' : '') + '>' + l + '</option>'; }).join("");
    filterBar.appendChild(levelSel);
    // Difficulty filter
    var diffSel = el("select", "iv-select");
    var diffs = ["Beginner", "Easy", "Intermediate", "Advanced", "Expert"];
    diffSel.innerHTML = '<option value="">All Levels</option>' + diffs.map(function (d) { return '<option value="' + d + '"' + (interviewFilters.difficulty === d ? ' selected' : '') + '>' + d + '</option>'; }).join("");
    filterBar.appendChild(diffSel);
    // Company filter
    var companies = data.companiesExtended || data.companies;
    var compSel = el("select", "iv-select");
    compSel.innerHTML = '<option value="">All Companies</option>' + companies.map(function (c) { return '<option value="' + c + '"' + (interviewFilters.company === c ? ' selected' : '') + '>' + c + '</option>'; }).join("");
    filterBar.appendChild(compSel);
    // Frequency filter (new)
    if (data.frequencies) {
      var freqSel = el("select", "iv-select");
      freqSel.innerHTML = '<option value="">All Frequencies</option>' + data.frequencies.map(function (f) { return '<option value="' + f.id + '"' + (interviewFilters.frequency === f.id ? ' selected' : '') + '>' + f.emoji + " " + f.label + '</option>'; }).join("");
      filterBar.appendChild(freqSel);
      freqSel.addEventListener("change", function () { interviewFilters.frequency = this.value; applyFilters(); });
    }
    // Round filter (new)
    if (data.rounds) {
      var roundSel = el("select", "iv-select");
      roundSel.innerHTML = '<option value="">All Rounds</option>' + data.rounds.map(function (r) { return '<option value="' + r.id + '"' + (interviewFilters.round === r.id ? ' selected' : '') + '>' + r.icon + " " + r.name + '</option>'; }).join("");
      filterBar.appendChild(roundSel);
      roundSel.addEventListener("change", function () { interviewFilters.round = this.value; applyFilters(); });
    }
    // Question type filter (new)
    if (data.questionTypes) {
      var typeSel = el("select", "iv-select");
      typeSel.innerHTML = '<option value="">All Types</option>' + data.questionTypes.map(function (t) { return '<option value="' + t.id + '"' + (interviewFilters.questionType === t.id ? ' selected' : '') + '>' + t.icon + " " + t.label + '</option>'; }).join("");
      filterBar.appendChild(typeSel);
      typeSel.addEventListener("change", function () { interviewFilters.questionType = this.value; applyFilters(); });
    }
    // Bookmark-only toggle
    var bmToggle = el("button", "iv-toggle-btn" + (interviewFilters.showBookmarked ? " active" : ""));
    bmToggle.innerHTML = "🔖 Bookmarked";
    bmToggle.addEventListener("click", function () {
      interviewFilters.showBookmarked = !interviewFilters.showBookmarked;
      this.classList.toggle("active", interviewFilters.showBookmarked);
      applyFilters();
    });
    filterBar.appendChild(bmToggle);
    // Studied filter
    var studiedSel = el("select", "iv-select");
    studiedSel.innerHTML =
      '<option value="">Studied? (all)</option>' +
      '<option value="yes"' + (interviewFilters.showStudied === true ? ' selected' : '') + '>✓ Only studied</option>' +
      '<option value="no"'  + (interviewFilters.showStudied === false ? ' selected' : '') + '>Not yet studied</option>';
    filterBar.appendChild(studiedSel);
    studiedSel.addEventListener("change", function () {
      interviewFilters.showStudied = this.value === "yes" ? true : (this.value === "no" ? false : null);
      applyFilters();
    });
    // Clear filters
    var clearBtn = el("button", "iv-toggle-btn");
    clearBtn.innerHTML = "✖ Clear";
    clearBtn.addEventListener("click", function () {
      interviewFilters = { level: "", difficulty: "", company: "", search: "", frequency: "", round: "", questionType: "", showBookmarked: false, showStudied: null };
      renderInterview();
    });
    filterBar.appendChild(clearBtn);
    page.appendChild(filterBar);

    // Results container
    var results = el("div", "iv-results"); results.id = "ivResults";
    page.appendChild(results);

    // Company guide section
    var guideList = data.companyGuideExtended || data.companyGuide || [];
    var guideSection = el("div", "iv-guide-section");
    guideSection.innerHTML = '<h2 class="iv-section-title">🏢 Company-wise Interview Guide <span class="iv-section-count">' + guideList.length + '</span></h2>';
    var guideGrid = el("div", "iv-guide-grid");
    guideList.forEach(function (g) {
      var card = el("div", "iv-guide-card");
      card.innerHTML = '<div class="iv-guide-head"><span class="iv-guide-name">' + escapeHtml(g.name) + '</span><span class="iv-guide-tier">' + escapeHtml(g.tier) + '</span></div>' +
        '<div class="iv-guide-row"><b>Rounds:</b> ' + escapeHtml(g.rounds) + '</div>' +
        '<div class="iv-guide-row"><b>Focus:</b> ' + escapeHtml(g.focus) + '</div>' +
        '<div class="iv-guide-row"><b>Patterns:</b> ' + escapeHtml(g.patterns) + '</div>' +
        '<div class="iv-guide-tip">💡 ' + escapeHtml(g.tips) + '</div>';
      guideGrid.appendChild(card);
    });
    guideSection.appendChild(guideGrid);
    page.appendChild(guideSection);

    content.appendChild(page);

    var PAGE_SIZE = 40;
    var currentPage = 1;

    function applyFilters() {
      interviewFilters.search = searchInp.value.toLowerCase().trim();
      interviewFilters.level = levelSel.value;
      interviewFilters.difficulty = diffSel.value;
      interviewFilters.company = compSel.value;
      currentPage = 1;
      renderQuestions();
    }

    function filteredList() {
      return data.questions.map(function (q, i) { return { q: q, index: i }; }).filter(function (item) {
        var q = item.q;
        if (interviewFilters.level && q.level !== interviewFilters.level) return false;
        if (interviewFilters.difficulty && q.difficulty !== interviewFilters.difficulty) return false;
        if (interviewFilters.company && (!q.company || q.company.indexOf(interviewFilters.company) === -1)) return false;
        if (interviewFilters.frequency && q.frequency !== interviewFilters.frequency) return false;
        if (interviewFilters.round && q.round !== interviewFilters.round) return false;
        if (interviewFilters.questionType && q.questionType !== interviewFilters.questionType) return false;
        if (interviewFilters.showBookmarked && !window.DPProgress.isBookmarked(item.index)) return false;
        if (interviewFilters.showStudied === true  && !window.DPProgress.isStudied(item.index)) return false;
        if (interviewFilters.showStudied === false &&  window.DPProgress.isStudied(item.index)) return false;
        if (interviewFilters.search) {
          var hay = (q.q + " " + (q.answer||"") + " " + (q.level||"")).toLowerCase();
          if (hay.indexOf(interviewFilters.search) === -1) return false;
        }
        return true;
      });
    }

    function renderQuestions() {
      var filtered = filteredList();
      var total = filtered.length;
      var totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
      if (currentPage > totalPages) currentPage = totalPages;
      var start = (currentPage - 1) * PAGE_SIZE;
      var slice = filtered.slice(start, start + PAGE_SIZE);
      results.innerHTML = '<div class="iv-count">Showing ' + (total ? (start + 1) : 0) + '-' + (start + slice.length) + ' of ' + total + ' questions <span class="iv-count-sub">(from ' + data.questions.length + ' total)</span></div>';
      if (!total) { results.innerHTML += '<div class="iv-empty">No questions match your filters. Try clearing them.</div>'; return; }
      slice.forEach(function (item) { results.appendChild(renderQuestionCard(item.q, item.index)); });
      if (totalPages > 1) results.appendChild(renderPagination(currentPage, totalPages, function (p) { currentPage = p; renderQuestions(); window.scrollTo({ top: results.offsetTop - 80, behavior: "smooth" }); }));
    }

    searchInp.addEventListener("input", applyFilters);
    levelSel.addEventListener("change", applyFilters);
    diffSel.addEventListener("change", applyFilters);
    compSel.addEventListener("change", applyFilters);

    renderQuestions();
    highlightSidebar(null, null);
    document.title = "Interview Prep | " + T("heroTitle");
    content.focus(); window.scrollTo(0, 0);
  }

  function freqBadge(freqId) {
    if (!window.DP_INTERVIEW || !window.DP_INTERVIEW.getFrequency) return "";
    var f = window.DP_INTERVIEW.getFrequency(freqId);
    if (!f) return "";
    return '<span class="iv-freq iv-freq-' + f.id + '" title="' + escapeHtml(f.label) + '">' + f.emoji + '</span>';
  }
  function roundBadge(roundId) {
    if (!window.DP_INTERVIEW || !window.DP_INTERVIEW.getRound) return "";
    var r = window.DP_INTERVIEW.getRound(roundId);
    if (!r) return "";
    return '<span class="iv-round-badge">' + r.icon + " " + escapeHtml(r.id) + '</span>';
  }
  function typeBadge(typeId) {
    if (!window.DP_INTERVIEW || !window.DP_INTERVIEW.getQuestionType) return "";
    var t = window.DP_INTERVIEW.getQuestionType(typeId);
    if (!t) return "";
    return '<span class="iv-type-badge" title="' + escapeHtml(t.label) + '">' + t.icon + '</span>';
  }

  function renderQuestionCard(q, index) {
    // `index` is now the stable index into DP_INTERVIEW.questions
    var displayNum = index + 1;
    var card = el("div", "iv-card");
    var diffClass = "diff-" + (q.difficulty || "beginner").toLowerCase();
    var isBm = window.DPProgress && window.DPProgress.isBookmarked(index);
    var isStudied = window.DPProgress && window.DPProgress.isStudied(index);
    var isCorrect = window.DPProgress && window.DPProgress.isCorrect(index);
    var isIncorrect = window.DPProgress && window.DPProgress.isIncorrect(index);
    if (isStudied) card.classList.add("studied");

    var header = el("button", "iv-card-head");
    header.innerHTML = '<span class="iv-q-num">Q' + displayNum + '</span>' +
      '<span class="iv-q-text">' + escapeHtml(q.q) + '</span>' +
      '<span class="iv-badges">' +
        freqBadge(q.frequency) +
        roundBadge(q.round) +
        typeBadge(q.questionType) +
        '<span class="iv-diff ' + diffClass + '">' + escapeHtml(q.difficulty) + '</span>' +
      '</span>' +
      '<span class="iv-toggle-arrow">▼</span>';

    var body = el("div", "iv-card-body"); body.style.display = "none";

    var html = '<div class="iv-meta-row">' +
      '<span class="iv-meta"><b>Experience:</b> ' + escapeHtml(q.experience || "All") + '</span>' +
      (q.company ? '<span class="iv-meta"><b>Asked at:</b> ' + q.company.map(escapeHtml).join(", ") + '</span>' : '') +
      (q.frequency && window.DP_INTERVIEW.getFrequency ? '<span class="iv-meta"><b>Frequency:</b> ' + window.DP_INTERVIEW.getFrequency(q.frequency).emoji + " " + window.DP_INTERVIEW.getFrequency(q.frequency).label + '</span>' : '') +
      '</div>';

    if (q.why) html += '<div class="iv-block iv-why"><div class="iv-block-title">🤔 Why interviewers ask this</div>' + escapeHtml(q.why) + '</div>';
    if (q.answer) html += '<div class="iv-block"><div class="iv-block-title">✅ Answer</div>' + renderNotes(q.answer) + '</div>';
    if (q.simpleAnswer)       html += '<div class="iv-block iv-ans-beginner"><div class="iv-block-title">👶 Beginner Answer (Simple)</div>' + renderNotes(q.simpleAnswer) + '</div>';
    if (q.professionalAnswer) html += '<div class="iv-block iv-ans-pro"><div class="iv-block-title">🎯 Professional Interview Answer</div>' + renderNotes(q.professionalAnswer) + '</div>';
    if (q.seniorAnswer)       html += '<div class="iv-block iv-ans-senior"><div class="iv-block-title">🏆 Senior-Level Answer</div>' + renderNotes(q.seniorAnswer) + '</div>';
    if (q.analogy) html += '<div class="iv-block iv-analogy"><div class="iv-block-title">🏠 Real-Life Analogy</div>' + renderNotes(q.analogy) + '</div>';
    if (q.code) html += '<div class="iv-block"><div class="iv-block-title">💻 Code Example</div><pre class="diagram-box">' + highlight(q.code) + '</pre>' + (q.output ? '<div class="iv-output">Output: ' + escapeHtml(q.output) + '</div>' : '') + '</div>';

    if (q.timeComplexity || q.spaceComplexity) {
      html += '<div class="iv-complexity">';
      if (q.timeComplexity) html += '<span class="iv-cx">⏱️ Time: <b>' + escapeHtml(q.timeComplexity) + '</b></span>';
      if (q.spaceComplexity) html += '<span class="iv-cx">💾 Space: <b>' + escapeHtml(q.spaceComplexity) + '</b></span>';
      html += '</div>';
    }

    if (q.mistakes) html += '<div class="iv-block iv-mistake"><div class="iv-block-title">⚠️ Common Mistakes</div>' + escapeHtml(q.mistakes) + '</div>';
    if (q.bestPractices) html += '<div class="iv-block iv-best"><div class="iv-block-title">⭐ Best Practices</div>' + escapeHtml(q.bestPractices) + '</div>';
    if (q.followUps && q.followUps.length) html += '<div class="iv-block"><div class="iv-block-title">🔗 Follow-up Questions</div><ul>' + q.followUps.map(function (f) { return '<li>' + escapeHtml(f) + '</li>'; }).join("") + '</ul></div>';
    if (q.expectedKeywords && q.expectedKeywords.length) html += '<div class="iv-block iv-keywords"><div class="iv-block-title">🎯 Interviewer expects keywords</div>' + q.expectedKeywords.map(function(k){return '<span class="iv-kw">'+escapeHtml(k)+'</span>';}).join(" ") + '</div>';
    if (q.tips) html += '<div class="iv-block iv-tip"><div class="iv-block-title">💡 Tip to Answer Confidently</div>' + escapeHtml(q.tips) + '</div>';

    // Progress action bar
    html += '<div class="iv-card-actions">' +
      '<button class="iv-act-btn iv-act-bm' + (isBm ? " active" : "") + '" data-act="bm">' + (isBm ? "🔖 Bookmarked" : "🔖 Bookmark") + '</button>' +
      '<button class="iv-act-btn iv-act-studied' + (isStudied ? " active" : "") + '" data-act="studied">' + (isStudied ? "✓ Studied" : "○ Mark studied") + '</button>' +
      '<button class="iv-act-btn iv-act-correct' + (isCorrect ? " active" : "") + '" data-act="correct">✅ Got it right</button>' +
      '<button class="iv-act-btn iv-act-incorrect' + (isIncorrect ? " active" : "") + '" data-act="incorrect">❌ Need to review</button>' +
      '</div>';

    body.innerHTML = html;

    header.addEventListener("click", function () {
      var show = body.style.display === "none";
      body.style.display = show ? "block" : "none";
      header.classList.toggle("open", show);
    });

    // Action buttons
    body.querySelectorAll(".iv-act-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var act = this.dataset.act;
        if (!window.DPProgress) return;
        if (act === "bm")        { window.DPProgress.toggleBookmark(index); this.classList.toggle("active"); this.textContent = window.DPProgress.isBookmarked(index) ? "🔖 Bookmarked" : "🔖 Bookmark"; }
        else if (act === "studied")   { window.DPProgress.toggleStudied(index); var s = window.DPProgress.isStudied(index); this.classList.toggle("active", s); this.textContent = s ? "✓ Studied" : "○ Mark studied"; card.classList.toggle("studied", s); }
        else if (act === "correct")   { window.DPProgress.markCorrect(index); body.querySelector('[data-act="correct"]').classList.add("active"); body.querySelector('[data-act="incorrect"]').classList.remove("active"); }
        else if (act === "incorrect") { window.DPProgress.markIncorrect(index); body.querySelector('[data-act="incorrect"]').classList.add("active"); body.querySelector('[data-act="correct"]').classList.remove("active"); }
      });
    });

    card.appendChild(header);
    card.appendChild(body);
    return card;
  }

  function renderPagination(current, total, onGo) {
    var pag = el("div", "iv-pagination");
    function b(label, page, disabled, active) {
      var btn = el("button", "iv-pg-btn" + (active ? " active" : "") + (disabled ? " disabled" : ""));
      btn.textContent = label;
      if (!disabled && !active) btn.addEventListener("click", function () { onGo(page); });
      if (disabled) btn.disabled = true;
      return btn;
    }
    pag.appendChild(b("« First", 1, current === 1));
    pag.appendChild(b("‹ Prev", current - 1, current === 1));
    // window of 5
    var start = Math.max(1, current - 2), end = Math.min(total, current + 2);
    if (start > 1) pag.appendChild(el("span", "iv-pg-dot", "…"));
    for (var i = start; i <= end; i++) pag.appendChild(b(String(i), i, false, i === current));
    if (end < total) pag.appendChild(el("span", "iv-pg-dot", "…"));
    pag.appendChild(b("Next ›", current + 1, current === total));
    pag.appendChild(b("Last »", total, current === total));
    return pag;
  }

  /* ---------- Rapid Fire Page ---------- */
  function renderInterviewRapidFire() {
    var content = $("#content"); content.innerHTML = "";
    var data = window.DP_INTERVIEW;
    if (!data || !data.rapidFire) { content.innerHTML = '<div class="ai-error">Rapid-fire data not loaded.</div>'; return; }
    var page = el("div", "interview-page");
    page.innerHTML = '<div class="iv-header">' +
      '<h1><span class="iv-icon">⚡</span> Rapid Fire</h1>' +
      '<p class="iv-subtitle">One question at a time. Read the question, think for 5 seconds, then reveal the answer. Practice until they\'re automatic.</p>' +
      '</div>';
    page.appendChild(renderInterviewTabs("rapid"));

    var wrap = el("div", "rf-wrap");
    var state = { idx: 0, revealed: false, order: data.rapidFire.map(function(_,i){return i;}) };
    // shuffle
    for (var i = state.order.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = state.order[i]; state.order[i] = state.order[j]; state.order[j] = t;
    }

    var card = el("div", "rf-card");
    var progress = el("div", "rf-progress");
    var qBlock = el("div", "rf-question");
    var aBlock = el("div", "rf-answer"); aBlock.style.display = "none";
    var controls = el("div", "rf-controls");
    var revealBtn = el("button", "rf-btn rf-reveal", "👁 Reveal Answer");
    var nextBtn = el("button", "rf-btn rf-next", "Next Question →");
    var prevBtn = el("button", "rf-btn rf-prev", "← Previous");
    var shuffleBtn = el("button", "rf-btn rf-shuffle", "🔀 Shuffle");
    controls.appendChild(prevBtn); controls.appendChild(revealBtn); controls.appendChild(nextBtn); controls.appendChild(shuffleBtn);
    card.appendChild(progress); card.appendChild(qBlock); card.appendChild(aBlock); card.appendChild(controls);
    wrap.appendChild(card);

    function paint() {
      var qa = data.rapidFire[state.order[state.idx]];
      progress.textContent = "Question " + (state.idx + 1) + " of " + state.order.length;
      qBlock.innerHTML = '<span class="rf-q-label">Q.</span>' + escapeHtml(qa.q);
      aBlock.innerHTML = '<span class="rf-a-label">A.</span>' + escapeHtml(qa.a);
      aBlock.style.display = state.revealed ? "block" : "none";
      revealBtn.textContent = state.revealed ? "🙈 Hide Answer" : "👁 Reveal Answer";
    }
    paint();

    revealBtn.addEventListener("click", function () { state.revealed = !state.revealed; paint(); });
    nextBtn.addEventListener("click", function () { state.idx = (state.idx + 1) % state.order.length; state.revealed = false; paint(); });
    prevBtn.addEventListener("click", function () { state.idx = (state.idx - 1 + state.order.length) % state.order.length; state.revealed = false; paint(); });
    shuffleBtn.addEventListener("click", function () {
      for (var i = state.order.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = state.order[i]; state.order[i] = state.order[j]; state.order[j] = t;
      }
      state.idx = 0; state.revealed = false; paint();
    });
    document.addEventListener("keydown", function (e) {
      if (!$("#content").querySelector(".rf-card")) return; // only when this page is up
      if (e.key === "ArrowRight") { nextBtn.click(); }
      else if (e.key === "ArrowLeft") { prevBtn.click(); }
      else if (e.key === " " || e.key === "Enter") { e.preventDefault(); revealBtn.click(); }
    });

    page.appendChild(wrap);
    content.appendChild(page);
    highlightSidebar(null, null);
    document.title = "Rapid Fire | Interview Prep";
    content.focus(); window.scrollTo(0, 0);
  }

  /* ---------- By-Round Page ---------- */
  function renderInterviewRounds() {
    var content = $("#content"); content.innerHTML = "";
    var data = window.DP_INTERVIEW;
    var page = el("div", "interview-page");
    page.innerHTML = '<div class="iv-header">' +
      '<h1><span class="iv-icon">🎯</span> Interview Rounds</h1>' +
      '<p class="iv-subtitle">Prepare round-by-round. Click any round to focus your practice on that stage.</p>' +
      '</div>';
    page.appendChild(renderInterviewTabs("rounds"));

    var grid = el("div", "iv-rounds-grid");
    (data.rounds || []).forEach(function (r) {
      var count = data.questions.filter(function (q) { return q.round === r.id; }).length;
      var card = el("a", "iv-round-card");
      card.href = "#/interview";
      card.innerHTML = '<div class="iv-round-icon">' + r.icon + '</div>' +
        '<div class="iv-round-name">' + escapeHtml(r.name) + '</div>' +
        '<div class="iv-round-topics">' + r.topics.map(function (t) { return '<span class="iv-round-topic">' + escapeHtml(t) + '</span>'; }).join("") + '</div>' +
        '<div class="iv-round-count">' + count + ' tagged questions</div>';
      card.addEventListener("click", function (e) {
        e.preventDefault();
        interviewFilters = { level:"", difficulty:"", company:"", search:"", frequency:"", round:r.id, questionType:"", showBookmarked:false, showStudied:null };
        location.hash = "#/interview";
      });
      grid.appendChild(card);
    });
    page.appendChild(grid);
    content.appendChild(page);
    highlightSidebar(null, null);
    document.title = "Rounds | Interview Prep";
    content.focus(); window.scrollTo(0, 0);
  }

  /* ---------- Dashboard Page ---------- */
  function renderInterviewDashboard() {
    var content = $("#content"); content.innerHTML = "";
    var data = window.DP_INTERVIEW;
    var page = el("div", "interview-page");
    page.innerHTML = '<div class="iv-header">' +
      '<h1><span class="iv-icon">📊</span> Interview Readiness Dashboard</h1>' +
      '<p class="iv-subtitle">Track your progress. Everything is stored locally in your browser — no signup, no server.</p>' +
      '</div>';
    page.appendChild(renderInterviewTabs("dash"));

    var m = window.DPProgress.computeMetrics(data.questions);

    var summary = el("div", "dash-summary");
    function stat(label, value, sub) {
      return '<div class="dash-stat"><div class="dash-stat-value">' + value + '</div><div class="dash-stat-label">' + label + '</div>' + (sub ? '<div class="dash-stat-sub">' + sub + '</div>' : '') + '</div>';
    }
    summary.innerHTML =
      stat("Questions Studied",  m.studied + "<span class='dash-of'>/" + m.total + "</span>", m.coverage + "% covered") +
      stat("Correct",             m.correct,   "self-marked") +
      stat("Need to Review",      m.incorrect, "self-marked") +
      stat("Accuracy",             m.accuracy + "%", (m.correct + m.incorrect) + " attempts") +
      stat("Bookmarked",           m.bookmarked, "saved") +
      stat("Current Streak",       (m.streak.days || 0) + "d", "consecutive days");
    page.appendChild(summary);

    // Readiness bars
    var readiness = el("div", "dash-readiness");
    readiness.innerHTML = '<h2 class="dash-h2">🎯 Readiness Score</h2>';
    var bands = [
      { key: "beginner", label: "Beginner Readiness (Level 0-1)" },
      { key: "junior",   label: "Junior Readiness (Level 2-3)" },
      { key: "mid",      label: "Mid-Level Readiness (Level 4)" },
      { key: "senior",   label: "Senior Readiness (Level 5-6)" },
      { key: "expert",   label: "Expert / Architect (Level 7)" }
    ];
    bands.forEach(function (b) {
      var pct = m.readiness[b.key];
      readiness.innerHTML += '<div class="dash-band"><div class="dash-band-label">' + b.label + '<span class="dash-band-pct">' + pct + '%</span></div>' +
        '<div class="dash-band-bar"><div class="dash-band-fill" style="width:' + pct + '%"></div></div></div>';
    });
    readiness.innerHTML += '<div class="dash-overall">Overall readiness: <b>' + m.overall + '%</b></div>';
    page.appendChild(readiness);

    // Per-topic breakdown (studied/total)
    var perTopic = el("div", "dash-topics");
    perTopic.innerHTML = '<h2 class="dash-h2">📚 Coverage by Topic</h2>';
    var topicKeys = Object.keys(m.perTopic).sort();
    var topicGrid = el("div", "dash-topic-grid");
    topicKeys.forEach(function (k) {
      var t = m.perTopic[k];
      var pct = t.total > 0 ? Math.round((t.studied / t.total) * 100) : 0;
      topicGrid.innerHTML += '<div class="dash-topic"><div class="dash-topic-name">' + escapeHtml(k) + '</div>' +
        '<div class="dash-topic-nums">' + t.studied + '/' + t.total + '</div>' +
        '<div class="dash-band-bar"><div class="dash-band-fill" style="width:' + pct + '%"></div></div></div>';
    });
    perTopic.appendChild(topicGrid);
    page.appendChild(perTopic);

    // Weak / strong
    if (m.weak.length || m.strong.length) {
      var ws = el("div", "dash-ws");
      ws.innerHTML = '<h2 class="dash-h2">⚖️ Strengths & Weaknesses</h2>';
      var col1 = '<div class="dash-ws-col"><h3>⚠️ Weak Topics</h3>' + (m.weak.length ? m.weak.map(function (w) {
        return '<div class="dash-ws-row">' + escapeHtml(w.topic) + ' <span>' + Math.round(w.accuracy * 100) + '% (' + w.attempted + ' tries)</span></div>';
      }).join("") : '<div class="dash-empty">Attempt a few questions first!</div>') + '</div>';
      var col2 = '<div class="dash-ws-col"><h3>💪 Strong Topics</h3>' + (m.strong.length ? m.strong.map(function (s) {
        return '<div class="dash-ws-row">' + escapeHtml(s.topic) + ' <span>' + Math.round(s.accuracy * 100) + '% (' + s.attempted + ' tries)</span></div>';
      }).join("") : '<div class="dash-empty">Attempt a few questions first!</div>') + '</div>';
      ws.innerHTML += col1 + col2;
      page.appendChild(ws);
    }

    // Reset
    var resetWrap = el("div", "dash-reset-wrap");
    var resetBtn = el("button", "dash-reset-btn", "🗑️ Reset all interview progress");
    resetBtn.addEventListener("click", function () {
      if (confirm("Reset all your bookmarks, studied marks, correct/incorrect marks and streak? This cannot be undone.")) {
        window.DPProgress.reset();
        renderInterviewDashboard();
      }
    });
    resetWrap.appendChild(resetBtn);
    page.appendChild(resetWrap);

    content.appendChild(page);
    highlightSidebar(null, null);
    document.title = "Dashboard | Interview Prep";
    content.focus(); window.scrollTo(0, 0);
  }

  /* ---------- Study Plans Page ---------- */
  function renderInterviewPlans() {
    var content = $("#content"); content.innerHTML = "";
    var data = window.DP_INTERVIEW;
    var page = el("div", "interview-page");
    page.innerHTML = '<div class="iv-header">' +
      '<h1><span class="iv-icon">📅</span> Interview Study Plans</h1>' +
      '<p class="iv-subtitle">Structured prep from 1 day to 90 days. Pick the plan that matches your timeline.</p>' +
      '</div>';
    page.appendChild(renderInterviewTabs("plans"));

    var grid = el("div", "iv-plans-grid");
    (data.studyPlans || []).forEach(function (p) {
      var card = el("div", "iv-plan-card");
      card.innerHTML = '<div class="iv-plan-head">' +
        '<span class="iv-plan-dur">' + escapeHtml(p.duration) + '</span>' +
        '<span class="iv-plan-audience">' + escapeHtml(p.audience) + '</span></div>' +
        '<ol class="iv-plan-steps">' + p.steps.map(function (s) { return '<li>' + escapeHtml(s) + '</li>'; }).join("") + '</ol>';
      grid.appendChild(card);
    });
    page.appendChild(grid);
    content.appendChild(page);
    highlightSidebar(null, null);
    document.title = "Study Plans | Interview Prep";
    content.focus(); window.scrollTo(0, 0);
  }

  /* ============================================================
     PHASE 4 — Predict the Output & Find the Bug engines
     ============================================================ */

  /* --- Normalise strings for output comparison --- */
  function normalizeOutput(s) {
    return String(s || "").replace(/\r\n/g, "\n").replace(/[ \t]+/g, " ").replace(/[ \t]*\n/g, "\n").trim();
  }
  function similarity(a, b) {
    a = normalizeOutput(a); b = normalizeOutput(b);
    if (a === b) return 100;
    if (!a || !b) return 0;
    // Token overlap: simple Jaccard on lines
    var aLines = a.split("\n"), bLines = b.split("\n");
    var aSet = new Set(aLines), bSet = new Set(bLines);
    var inter = 0; aSet.forEach(function (l) { if (bSet.has(l)) inter++; });
    var uni = new Set([].concat(aLines).concat(bLines)).size;
    if (!uni) return 0;
    return Math.round((inter / uni) * 100);
  }

  var POState = { idx: 0, order: [], correct: 0, attempted: 0 };
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  function renderPredictOutput() {
    var content = $("#content"); content.innerHTML = "";
    var data = window.DP_INTERVIEW;
    if (!data || !data.predictOutput) { content.innerHTML = '<div class="ai-error">Challenge data not loaded.</div>'; return; }
    var page = el("div", "interview-page");
    page.innerHTML = '<div class="iv-header">' +
      '<h1><span class="iv-icon">🔮</span> Predict the Output</h1>' +
      '<p class="iv-subtitle">Read the code, type what you think Python will print, then compare. This is the #1 way to spot tricky Python behaviour.</p>' +
      '</div>';
    page.appendChild(renderInterviewTabs("output"));

    if (!POState.order.length) { POState.order = shuffle(data.predictOutput.map(function (_, i) { return i; })); }
    var ch = data.predictOutput[POState.order[POState.idx]];

    var progressPct = Math.round((POState.attempted / data.predictOutput.length) * 100);
    var stats = el("div", "engine-stats");
    stats.innerHTML =
      '<div class="engine-stat"><b>Q ' + (POState.idx + 1) + ' / ' + data.predictOutput.length + '</b></div>' +
      '<div class="engine-stat"><span class="iv-diff diff-' + ch.difficulty.toLowerCase() + '">' + escapeHtml(ch.difficulty) + '</span></div>' +
      '<div class="engine-stat">Topic: <b>' + escapeHtml(ch.topic) + '</b></div>' +
      '<div class="engine-stat">Score: <b>' + POState.correct + '/' + POState.attempted + '</b> ' + (POState.attempted ? '(' + Math.round((POState.correct/POState.attempted)*100) + '%)' : '') + '</div>';
    page.appendChild(stats);
    page.appendChild(el("div", "engine-progress", '<div class="engine-progress-fill" style="width:' + progressPct + '%"></div>'));

    // Code card
    var codeCard = el("div", "engine-code-card");
    codeCard.innerHTML = '<div class="engine-code-label">🐍 What does this print?</div>' +
      '<pre class="engine-code-block"><code>' + highlight(ch.code) + '</code></pre>';
    page.appendChild(codeCard);

    // Answer input
    var answerBlock = el("div", "engine-answer-block");
    answerBlock.innerHTML = '<label class="engine-label">Your predicted output:</label>' +
      '<textarea class="engine-input" id="poInput" rows="4" placeholder="Type exactly what you think will print, line by line..." spellcheck="false"></textarea>' +
      '<div class="engine-buttons">' +
      '<button class="engine-btn engine-check" id="poCheck">✅ Check my answer</button>' +
      '<button class="engine-btn" id="poSkip">👁 Give up — reveal</button>' +
      '</div>';
    page.appendChild(answerBlock);

    // Result area (populated on check/reveal)
    var resultBlock = el("div", "engine-result"); resultBlock.style.display = "none";
    page.appendChild(resultBlock);

    // Nav
    var nav = el("div", "engine-nav");
    var prevBtn = el("button", "engine-nav-btn", "← Previous");
    var nextBtn = el("button", "engine-nav-btn engine-next", "Next Question →");
    var shuffleBtn = el("button", "engine-nav-btn", "🔀 Shuffle");
    var resetBtn = el("button", "engine-nav-btn", "↻ Reset Score");
    nav.appendChild(prevBtn); nav.appendChild(nextBtn); nav.appendChild(shuffleBtn); nav.appendChild(resetBtn);
    page.appendChild(nav);

    content.appendChild(page);

    function showResult(userAnswer, revealedOnly) {
      var expected = ch.output;
      var norm = normalizeOutput(userAnswer);
      var expNorm = normalizeOutput(expected);
      var sim = similarity(userAnswer, expected);
      var isCorrect = sim === 100;
      resultBlock.style.display = "block";
      resultBlock.classList.remove("engine-r-good", "engine-r-partial", "engine-r-wrong", "engine-r-reveal");
      var head = "";
      if (revealedOnly) {
        resultBlock.classList.add("engine-r-reveal");
        head = '<div class="engine-r-head">👁 Revealed answer</div>';
      } else if (isCorrect) {
        resultBlock.classList.add("engine-r-good");
        head = '<div class="engine-r-head">🎉 Nailed it! 100% match</div>';
      } else if (sim >= 60) {
        resultBlock.classList.add("engine-r-partial");
        head = '<div class="engine-r-head">🤏 Close! ' + sim + '% match — review the diff below</div>';
      } else {
        resultBlock.classList.add("engine-r-wrong");
        head = '<div class="engine-r-head">❌ Not quite (' + sim + '% match) — check the expected output</div>';
      }
      var yourBlock = revealedOnly ? '' :
        '<div class="engine-r-col"><div class="engine-r-sub">Your prediction</div><pre class="engine-r-pre">' + (userAnswer.trim() ? escapeHtml(userAnswer) : '<em>(empty)</em>') + '</pre></div>';
      resultBlock.innerHTML = head +
        '<div class="engine-r-grid">' +
        yourBlock +
        '<div class="engine-r-col"><div class="engine-r-sub">Expected output</div><pre class="engine-r-pre">' + escapeHtml(expected) + '</pre></div>' +
        '</div>' +
        '<div class="engine-r-expl"><b>💡 Why:</b> ' + escapeHtml(ch.explanation) + '</div>';
      if (!revealedOnly) {
        POState.attempted++;
        if (isCorrect) POState.correct++;
      }
    }

    document.getElementById("poCheck").addEventListener("click", function () {
      var ans = document.getElementById("poInput").value;
      showResult(ans, false);
    });
    document.getElementById("poSkip").addEventListener("click", function () { showResult("", true); });
    prevBtn.addEventListener("click", function () { POState.idx = (POState.idx - 1 + POState.order.length) % POState.order.length; renderPredictOutput(); });
    nextBtn.addEventListener("click", function () { POState.idx = (POState.idx + 1) % POState.order.length; renderPredictOutput(); });
    shuffleBtn.addEventListener("click", function () { POState.order = shuffle(data.predictOutput.map(function (_, i) { return i; })); POState.idx = 0; renderPredictOutput(); });
    resetBtn.addEventListener("click", function () { POState.correct = 0; POState.attempted = 0; renderPredictOutput(); });

    highlightSidebar(null, null);
    document.title = "Predict the Output | Interview";
    content.focus(); window.scrollTo(0, 0);
  }

  var BUGState = { idx: 0, order: [], correct: 0, attempted: 0, hintsShown: 0 };

  function renderFindBug() {
    var content = $("#content"); content.innerHTML = "";
    var data = window.DP_INTERVIEW;
    if (!data || !data.findBug) { content.innerHTML = '<div class="ai-error">Debug data not loaded.</div>'; return; }
    var page = el("div", "interview-page");
    page.innerHTML = '<div class="iv-header">' +
      '<h1><span class="iv-icon">🐞</span> Find the Bug</h1>' +
      '<p class="iv-subtitle">Read the buggy code, describe what\'s wrong, then reveal the fix and full explanation.</p>' +
      '</div>';
    page.appendChild(renderInterviewTabs("debug"));

    if (!BUGState.order.length) { BUGState.order = shuffle(data.findBug.map(function (_, i) { return i; })); }
    var ch = data.findBug[BUGState.order[BUGState.idx]];
    BUGState.hintsShown = 0;

    var progressPct = Math.round((BUGState.attempted / data.findBug.length) * 100);
    var stats = el("div", "engine-stats");
    stats.innerHTML =
      '<div class="engine-stat"><b>Q ' + (BUGState.idx + 1) + ' / ' + data.findBug.length + '</b></div>' +
      '<div class="engine-stat"><span class="iv-diff diff-' + ch.difficulty.toLowerCase() + '">' + escapeHtml(ch.difficulty) + '</span></div>' +
      '<div class="engine-stat">Topic: <b>' + escapeHtml(ch.topic) + '</b></div>' +
      '<div class="engine-stat">Score: <b>' + BUGState.correct + '/' + BUGState.attempted + '</b> ' + (BUGState.attempted ? '(' + Math.round((BUGState.correct/BUGState.attempted)*100) + '%)' : '') + '</div>';
    page.appendChild(stats);
    page.appendChild(el("div", "engine-progress", '<div class="engine-progress-fill" style="width:' + progressPct + '%"></div>'));

    // Buggy code card
    var codeCard = el("div", "engine-code-card engine-buggy");
    codeCard.innerHTML = '<div class="engine-code-label">🐞 What\'s wrong with this code?</div>' +
      '<pre class="engine-code-block"><code>' + highlight(ch.buggyCode) + '</code></pre>';
    page.appendChild(codeCard);

    // Your diagnosis
    var diag = el("div", "engine-answer-block");
    diag.innerHTML = '<label class="engine-label">Your diagnosis (describe the bug):</label>' +
      '<textarea class="engine-input" id="bugInput" rows="3" placeholder="Type what you think is wrong..." spellcheck="false"></textarea>' +
      '<div class="engine-buttons">' +
      '<button class="engine-btn engine-check" id="bugCheck">✅ I\'m done — show me the answer</button>' +
      '<button class="engine-btn" id="bugHint">💡 Hint</button>' +
      '<button class="engine-btn" id="bugSkip">🏳️ Skip / Give up</button>' +
      '</div>' +
      '<div class="engine-hint" id="bugHintBox" style="display:none"></div>';
    page.appendChild(diag);

    var resultBlock = el("div", "engine-result"); resultBlock.style.display = "none";
    page.appendChild(resultBlock);

    // Nav
    var nav = el("div", "engine-nav");
    var prevBtn = el("button", "engine-nav-btn", "← Previous");
    var nextBtn = el("button", "engine-nav-btn engine-next", "Next Bug →");
    var shuffleBtn = el("button", "engine-nav-btn", "🔀 Shuffle");
    var resetBtn = el("button", "engine-nav-btn", "↻ Reset Score");
    nav.appendChild(prevBtn); nav.appendChild(nextBtn); nav.appendChild(shuffleBtn); nav.appendChild(resetBtn);
    page.appendChild(nav);

    content.appendChild(page);

    function reveal(selfCorrect) {
      BUGState.attempted++;
      if (selfCorrect) BUGState.correct++;
      resultBlock.style.display = "block";
      resultBlock.classList.remove("engine-r-good", "engine-r-wrong", "engine-r-reveal");
      resultBlock.classList.add(selfCorrect === true ? "engine-r-good" : (selfCorrect === false ? "engine-r-wrong" : "engine-r-reveal"));
      resultBlock.innerHTML =
        '<div class="engine-r-head">🐛 <b>The bug:</b> ' + escapeHtml(ch.bug) + '</div>' +
        '<div class="engine-r-grid">' +
          '<div class="engine-r-col"><div class="engine-r-sub">❌ Buggy code</div><pre class="engine-r-pre">' + highlight(ch.buggyCode) + '</pre></div>' +
          '<div class="engine-r-col"><div class="engine-r-sub">✅ Fixed code</div><pre class="engine-r-pre">' + highlight(ch.fixedCode) + '</pre></div>' +
        '</div>' +
        '<div class="engine-r-expl"><b>💡 Explanation:</b> ' + escapeHtml(ch.explanation) + '</div>' +
        '<div class="engine-selfmark">' +
          '<div class="engine-sm-label">Did you correctly identify the bug?</div>' +
          '<button class="engine-sm-btn engine-sm-good" id="bugMarkGood">✅ Yes I got it</button>' +
          '<button class="engine-sm-btn engine-sm-bad" id="bugMarkBad">❌ No, I missed it</button>' +
        '</div>';

      document.getElementById("bugMarkGood").addEventListener("click", function () {
        if (selfCorrect === true) return;
        BUGState.correct++;
        this.classList.add("done");
        document.getElementById("bugMarkBad").classList.remove("done");
      });
      document.getElementById("bugMarkBad").addEventListener("click", function () {
        if (selfCorrect === true) { BUGState.correct = Math.max(0, BUGState.correct - 1); }
        this.classList.add("done");
        document.getElementById("bugMarkGood").classList.remove("done");
      });
    }

    document.getElementById("bugCheck").addEventListener("click", function () { reveal(null); });
    document.getElementById("bugSkip").addEventListener("click", function () { reveal(false); });
    document.getElementById("bugHint").addEventListener("click", function () {
      var hintBox = document.getElementById("bugHintBox");
      if (BUGState.hintsShown >= (ch.hints || []).length) return;
      hintBox.style.display = "block";
      hintBox.innerHTML += '<div class="engine-hint-item">💡 ' + escapeHtml(ch.hints[BUGState.hintsShown]) + '</div>';
      BUGState.hintsShown++;
    });

    prevBtn.addEventListener("click", function () { BUGState.idx = (BUGState.idx - 1 + BUGState.order.length) % BUGState.order.length; renderFindBug(); });
    nextBtn.addEventListener("click", function () { BUGState.idx = (BUGState.idx + 1) % BUGState.order.length; renderFindBug(); });
    shuffleBtn.addEventListener("click", function () { BUGState.order = shuffle(data.findBug.map(function (_, i) { return i; })); BUGState.idx = 0; renderFindBug(); });
    resetBtn.addEventListener("click", function () { BUGState.correct = 0; BUGState.attempted = 0; renderFindBug(); });

    highlightSidebar(null, null);
    document.title = "Find the Bug | Interview";
    content.focus(); window.scrollTo(0, 0);
  }

  /* ============================================================
     PHASE 6 — Adaptive Practice
     Uses DPProgress metrics to pick weak-topic questions.
     ============================================================ */
  function renderAdaptive() {
    var content = $("#content"); content.innerHTML = "";
    var data = window.DP_INTERVIEW;
    var page = el("div", "interview-page");
    page.innerHTML = '<div class="iv-header">' +
      '<h1><span class="iv-icon">🧠</span> Adaptive Practice</h1>' +
      '<p class="iv-subtitle">The system watches which topics you struggle with, then serves questions to close those gaps. Practice a little every day — it will re-target automatically.</p>' +
      '</div>';
    page.appendChild(renderInterviewTabs("adaptive"));

    var metrics = window.DPProgress.computeMetrics(data.questions);
    var attempted = metrics.correct + metrics.incorrect;

    // Explanation card
    var infoCard = el("div", "adaptive-info");
    if (attempted === 0) {
      infoCard.innerHTML = '<h3>🌱 New here?</h3>' +
        '<p>You haven\'t self-marked any questions yet. Do a few in the <a href="#/interview">Browse</a> tab or a <a href="#/interview/mock">Mock Interview</a> first, then come back. Adaptive practice needs your history to target your weak spots.</p>' +
        '<p>Meanwhile, here\'s a balanced beginner set to start with:</p>';
    } else {
      var weakList = metrics.weak.length ?
        metrics.weak.map(function (w) { return '<span class="adaptive-weak-tag">' + escapeHtml(w.topic) + ' (' + Math.round(w.accuracy * 100) + '%)</span>'; }).join(" ")
        : '<em>None yet — keep practising and we\'ll spot patterns.</em>';
      var strongList = metrics.strong.length ?
        metrics.strong.map(function (s) { return '<span class="adaptive-strong-tag">' + escapeHtml(s.topic) + ' (' + Math.round(s.accuracy * 100) + '%)</span>'; }).join(" ")
        : '<em>None yet — attempt more questions in each topic.</em>';
      infoCard.innerHTML = '<h3>🎯 Personalised for you</h3>' +
        '<div class="adaptive-row"><b>Weak topics (focus here):</b><br>' + weakList + '</div>' +
        '<div class="adaptive-row"><b>Strong topics (harder challenges):</b><br>' + strongList + '</div>' +
        '<div class="adaptive-row"><b>Overall accuracy:</b> <b>' + metrics.accuracy + '%</b> across ' + attempted + ' attempts · <b>Coverage:</b> ' + metrics.coverage + '%</div>';
    }
    page.appendChild(infoCard);

    // Actions
    var actions = el("div", "adaptive-actions");
    [
      { count: 5,  label: "🎯 Quick 5-question drill" },
      { count: 10, label: "🧠 10-question adaptive session" },
      { count: 20, label: "🔥 20-question focused set" }
    ].forEach(function (opt) {
      var btn = el("button", "adaptive-btn", opt.label);
      btn.addEventListener("click", function () {
        var picks = data.pickAdaptive(opt.count);
        if (!picks.length) { alert("Not enough data yet."); return; }
        // Kick off a mock session using the adaptive picks
        MOCK_STATE = {
          config: { adaptive: true, count: opt.count },
          questions: picks,
          idx: 0,
          answers: picks.map(function () { return { selfMark: null, timeSec: 0, revealed: false }; }),
          startedAt: Date.now(),
          qStart: Date.now()
        };
        location.hash = "#/interview/mock/session";
      });
      actions.appendChild(btn);
    });
    page.appendChild(actions);

    // Preview of what would come next
    var preview = data.pickAdaptive(5);
    if (preview.length) {
      var previewWrap = el("div", "adaptive-preview");
      previewWrap.innerHTML = '<h3 class="dash-h2">👀 Preview: your next 5 adaptive questions</h3>';
      preview.forEach(function (p, i) {
        var q = p.q;
        previewWrap.innerHTML += '<div class="adaptive-preview-row">' +
          '<span class="adaptive-preview-num">Q' + (i+1) + '</span>' +
          '<span class="adaptive-preview-topic">' + escapeHtml(q.level || "General") + '</span>' +
          '<span class="adaptive-preview-diff"><span class="iv-diff diff-' + (q.difficulty || "beginner").toLowerCase() + '">' + escapeHtml(q.difficulty || "Beginner") + '</span></span>' +
          '<span class="adaptive-preview-q">' + escapeHtml(q.q) + '</span>' +
          '</div>';
      });
      page.appendChild(previewWrap);
    }

    content.appendChild(page);
    highlightSidebar(null, null);
    document.title = "Adaptive Practice | Interview";
    content.focus(); window.scrollTo(0, 0);
  }

  /* ============================================================
     ROLE-BASED TRACKS (Spec #12)
     ============================================================ */
  function renderRoles() {
    var content = $("#content"); content.innerHTML = "";
    var data = window.DP_INTERVIEW;
    if (!data || !data.roles) { content.innerHTML = '<div class="ai-error">Role data not loaded.</div>'; return; }
    var page = el("div", "interview-page");
    page.innerHTML = '<div class="iv-header">' +
      '<h1><span class="iv-icon">🎭</span> Role-Based Interview Tracks</h1>' +
      '<p class="iv-subtitle">Pick the exact role you\'re interviewing for. The system samples questions from the right topics with the right weights.</p>' +
      '</div>';
    page.appendChild(renderInterviewTabs("roles"));

    var grid = el("div", "roles-grid");
    data.roles.forEach(function (r) {
      var card = el("div", "role-card");
      var topTopics = Object.keys(r.topicWeights).sort(function (a, b) { return r.topicWeights[b] - r.topicWeights[a]; }).slice(0, 4);
      var weightBar = topTopics.map(function (t) {
        return '<div class="role-weight-row"><span class="role-weight-topic">' + escapeHtml(t) + '</span>' +
          '<div class="role-weight-bar"><div class="role-weight-fill" style="width:' + Math.min(100, r.topicWeights[t] * 2) + '%"></div></div>' +
          '<span class="role-weight-pct">' + r.topicWeights[t] + '%</span></div>';
      }).join("");
      card.innerHTML =
        '<div class="role-head"><span class="role-icon">' + r.icon + '</span>' +
        '<span class="role-name">' + escapeHtml(r.name) + '</span>' +
        '<span class="role-target">L' + r.targetExp + '</span></div>' +
        '<div class="role-summary">' + escapeHtml(r.summary) + '</div>' +
        '<div class="role-weights">' + weightBar + '</div>' +
        '<div class="role-actions">' +
          '<button class="role-btn role-btn-primary" data-role="' + r.id + '" data-count="20">🎤 20-Q Mock</button>' +
          '<button class="role-btn" data-role="' + r.id + '" data-count="10">Quick 10</button>' +
          '<button class="role-btn" data-role="' + r.id + '" data-count="40">Deep 40</button>' +
        '</div>';
      grid.appendChild(card);
    });
    page.appendChild(grid);
    content.appendChild(page);

    grid.querySelectorAll(".role-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var roleId = this.dataset.role;
        var count = parseInt(this.dataset.count, 10) || 20;
        var picks = data.pickByRole(roleId, count);
        if (!picks.length) { alert("No questions found for this role. Try a different one."); return; }
        MOCK_STATE = {
          config: { role: roleId, count: count },
          questions: picks,
          idx: 0,
          answers: picks.map(function () { return { selfMark: null, timeSec: 0, revealed: false }; }),
          startedAt: Date.now(),
          qStart: Date.now()
        };
        location.hash = "#/interview/mock/session";
      });
    });

    highlightSidebar(null, null);
    document.title = "Role-Based Tracks | Interview";
    content.focus(); window.scrollTo(0, 0);
  }

  /* ============================================================
     INTERVIEW TOMORROW (Spec #21)
     ============================================================ */
  function renderTomorrow() {
    var content = $("#content"); content.innerHTML = "";
    var data = window.DP_INTERVIEW;
    var page = el("div", "interview-page");
    page.innerHTML = '<div class="iv-header">' +
      '<h1><span class="iv-icon">🌅</span> Interview Tomorrow</h1>' +
      '<p class="iv-subtitle">Focused, time-boxed prep. Pick how long you have and what you\'re interviewing for.</p>' +
      '</div>';
    page.appendChild(renderInterviewTabs("tomorrow"));

    var wrap = el("div", "tomorrow-wrap");
    wrap.innerHTML =
      '<div class="tomorrow-step"><div class="tomorrow-step-label">Step 1 — Role</div>' +
      '<div class="tomorrow-roles" id="tmRoles">' +
        data.roles.map(function (r, i) { return '<button class="tomorrow-role' + (i === 1 ? ' active' : '') + '" data-role="' + r.id + '">' + r.icon + ' ' + escapeHtml(r.name) + '</button>'; }).join("") +
      '</div></div>' +
      '<div class="tomorrow-step"><div class="tomorrow-step-label">Step 2 — Time available</div>' +
      '<div class="tomorrow-times" id="tmTimes">' +
        data.timePlans.map(function (t, i) {
          return '<button class="tomorrow-time' + (i === 1 ? ' active' : '') + '" data-min="' + t.minutes + '"><span class="tomorrow-min">' + t.minutes + ' min</span><span class="tomorrow-note">' + escapeHtml(t.note) + '</span><span class="tomorrow-qcount">' + t.questions + ' Qs</span></button>';
        }).join("") +
      '</div></div>' +
      '<div class="tomorrow-step tomorrow-action">' +
        '<button class="tomorrow-start-btn" id="tmStart">🚀 Start My Prep Session</button>' +
        '<div class="tomorrow-hint">Focus mode: no distractions, questions weighted for your role and time budget.</div>' +
      '</div>';
    page.appendChild(wrap);

    content.appendChild(page);

    var selRole = "developer", selTime = 60;
    var roleBtns = wrap.querySelectorAll(".tomorrow-role");
    var timeBtns = wrap.querySelectorAll(".tomorrow-time");
    // Sync default active state
    roleBtns.forEach(function (b) { if (b.dataset.role === "developer") { roleBtns.forEach(function (o) { o.classList.remove("active"); }); b.classList.add("active"); } });
    timeBtns.forEach(function (b) { if (parseInt(b.dataset.min, 10) === 60) { timeBtns.forEach(function (o) { o.classList.remove("active"); }); b.classList.add("active"); } });

    roleBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        roleBtns.forEach(function (o) { o.classList.remove("active"); });
        this.classList.add("active");
        selRole = this.dataset.role;
      });
    });
    timeBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        timeBtns.forEach(function (o) { o.classList.remove("active"); });
        this.classList.add("active");
        selTime = parseInt(this.dataset.min, 10);
      });
    });

    $("#tmStart").addEventListener("click", function () {
      var picks = data.pickForTime(selTime, selRole);
      if (!picks.length) { alert("No questions match. Try a different role."); return; }
      MOCK_STATE = {
        config: { role: selRole, minutes: selTime, count: picks.length },
        questions: picks,
        idx: 0,
        answers: picks.map(function () { return { selfMark: null, timeSec: 0, revealed: false }; }),
        startedAt: Date.now(),
        qStart: Date.now()
      };
      location.hash = "#/interview/mock/session";
    });

    highlightSidebar(null, null);
    document.title = "Interview Tomorrow | Prep";
    content.focus(); window.scrollTo(0, 0);
  }

  /* ============================================================
     PRODUCTION SCENARIOS (Spec #18)
     ============================================================ */
  function renderScenarios() {
    var content = $("#content"); content.innerHTML = "";
    var data = window.DP_INTERVIEW;
    if (!data || !data.scenarios) { content.innerHTML = '<div class="ai-error">Scenario data not loaded.</div>'; return; }
    var page = el("div", "interview-page");
    page.innerHTML = '<div class="iv-header">' +
      '<h1><span class="iv-icon">🚨</span> Production Scenarios</h1>' +
      '<p class="iv-subtitle">Senior-level: real outages, real trade-offs. For each scenario see Detect → Investigate → Mitigate → Fix → Prevent → Monitor → Postmortem.</p>' +
      '</div>';
    page.appendChild(renderInterviewTabs("scenarios"));

    var grid = el("div", "scenarios-grid");
    data.scenarios.forEach(function (s) {
      var card = el("a", "scenario-card");
      card.href = "#/interview/scenarios/" + s.id;
      card.innerHTML =
        '<div class="scenario-head">' +
          '<span class="scenario-title">' + escapeHtml(s.title) + '</span>' +
          '<span class="iv-diff diff-' + s.difficulty.toLowerCase() + '">' + escapeHtml(s.difficulty) + '</span>' +
        '</div>' +
        '<div class="scenario-topic">' + escapeHtml(s.topic) + ' · L' + s.expLevel + '</div>' +
        '<div class="scenario-symptom">📉 <em>' + escapeHtml(s.symptom) + '</em></div>' +
        '<div class="scenario-cta">→ Walk through the incident</div>';
      grid.appendChild(card);
    });
    page.appendChild(grid);
    content.appendChild(page);
    highlightSidebar(null, null);
    document.title = "Production Scenarios | Interview";
    content.focus(); window.scrollTo(0, 0);
  }

  function renderScenarioDetail(id) {
    var content = $("#content"); content.innerHTML = "";
    var data = window.DP_INTERVIEW;
    var scenario = null;
    (data.scenarios || []).some(function (s) { if (s.id === id) { scenario = s; return true; } return false; });
    if (!scenario) { location.hash = "#/interview/scenarios"; return; }

    var page = el("div", "interview-page");
    page.innerHTML = '<div class="iv-header">' +
      '<h1><span class="iv-icon">🚨</span> ' + escapeHtml(scenario.title) + '</h1>' +
      '<p class="iv-subtitle">' + escapeHtml(scenario.topic) + ' · Level ' + scenario.expLevel + ' · ' + escapeHtml(scenario.difficulty) + '</p>' +
      '</div>';
    page.appendChild(renderInterviewTabs("scenarios"));

    // Back link
    var back = el("a", "scenario-back");
    back.href = "#/interview/scenarios"; back.textContent = "← All scenarios";
    page.appendChild(back);

    // Context + symptom
    var contextCard = el("div", "scenario-context-card");
    contextCard.innerHTML =
      '<div class="scenario-ctx-label">🎬 Context</div><p>' + escapeHtml(scenario.context) + '</p>' +
      '<div class="scenario-ctx-label">📉 Symptom</div><p>' + escapeHtml(scenario.symptom) + '</p>';
    page.appendChild(contextCard);

    // Interviewer prompt
    var prompt = el("div", "scenario-prompt");
    prompt.innerHTML = '<div class="scenario-prompt-label">🎤 Interviewer asks:</div>' +
      '<div class="scenario-prompt-text">"You get paged for this. Walk me through your response step by step — what would you do first, and why?"</div>' +
      '<div class="scenario-prompt-actions">' +
      '<button class="mock-reveal-btn" id="scReveal">👁 Reveal Expert Response</button>' +
      '</div>';
    page.appendChild(prompt);

    // Steps (hidden until reveal)
    var stepsWrap = el("div", "scenario-steps"); stepsWrap.style.display = "none";
    scenario.steps.forEach(function (s, i) {
      stepsWrap.innerHTML += '<div class="scenario-step">' +
        '<div class="scenario-step-num">' + (i + 1) + '</div>' +
        '<div class="scenario-step-body">' +
          '<div class="scenario-step-phase">' + escapeHtml(s.phase) + '</div>' +
          '<div class="scenario-step-action">' + escapeHtml(s.action) + '</div>' +
        '</div></div>';
    });
    // Keywords panel
    if (scenario.keywords && scenario.keywords.length) {
      stepsWrap.innerHTML += '<div class="scenario-kw">' +
        '<div class="scenario-kw-label">🎯 Keywords the interviewer wants to hear:</div>' +
        scenario.keywords.map(function (k) { return '<span class="iv-kw">' + escapeHtml(k) + '</span>'; }).join(" ") +
        '</div>';
    }
    page.appendChild(stepsWrap);

    content.appendChild(page);

    $("#scReveal").addEventListener("click", function () {
      stepsWrap.style.display = "block";
      this.style.display = "none";
    });

    highlightSidebar(null, null);
    document.title = scenario.title + " | Scenarios";
    content.focus(); window.scrollTo(0, 0);
  }

  /* ============================================================
     SYSTEM DESIGN by experience band (Spec #19)
     ============================================================ */
  function renderSystemDesign() {
    var content = $("#content"); content.innerHTML = "";
    var data = window.DP_INTERVIEW;
    if (!data || !data.systemDesignTracks) { content.innerHTML = '<div class="ai-error">SD data not loaded.</div>'; return; }
    var page = el("div", "interview-page");
    page.innerHTML = '<div class="iv-header">' +
      '<h1><span class="iv-icon">🏛️</span> System Design — by Experience</h1>' +
      '<p class="iv-subtitle">Five tracks from beginner architecture to principal-level trade-offs. Each question has structured hints and expected keywords.</p>' +
      '</div>';
    page.appendChild(renderInterviewTabs("sysdes"));

    data.systemDesignTracks.forEach(function (track) {
      var section = el("section", "sd-track");
      section.innerHTML =
        '<div class="sd-track-head">' +
          '<span class="sd-track-icon">' + track.icon + '</span>' +
          '<div class="sd-track-title-wrap">' +
            '<div class="sd-track-title">' + escapeHtml(track.title) + '</div>' +
            '<div class="sd-track-audience">' + escapeHtml(track.audience) + '</div>' +
          '</div>' +
          '<div class="sd-track-band">L' + track.expLevel + ' · ' + escapeHtml(track.band) + '</div>' +
        '</div>' +
        '<div class="sd-track-focus"><b>Focus:</b> ' + escapeHtml(track.focus) + '</div>';
      var qlist = el("div", "sd-track-questions");
      track.questions.forEach(function (q, qi) {
        var qId = track.id + "-q" + qi;
        qlist.innerHTML += '<details class="sd-question">' +
          '<summary class="sd-q-summary"><span class="sd-q-num">Q' + (qi + 1) + '</span>' + escapeHtml(q.q) + '</summary>' +
          '<div class="sd-q-body">' +
            '<div class="sd-q-hints"><b>💡 Hints — talk through these:</b><ul>' +
              q.hints.map(function (h) { return '<li>' + escapeHtml(h) + '</li>'; }).join("") +
            '</ul></div>' +
            (q.keywords && q.keywords.length ? '<div class="sd-q-kw"><b>🎯 Keywords the interviewer wants:</b> ' + q.keywords.map(function (k) { return '<span class="iv-kw">' + escapeHtml(k) + '</span>'; }).join(" ") + '</div>' : '') +
          '</div>' +
          '</details>';
      });
      section.appendChild(qlist);
      page.appendChild(section);
    });

    content.appendChild(page);
    highlightSidebar(null, null);
    document.title = "System Design | Interview";
    content.focus(); window.scrollTo(0, 0);
  }

  /* ============================================================
     JOB DESCRIPTION ANALYZER (Spec #20)
     ============================================================ */
  function renderJDAnalyzer() {
    var content = $("#content"); content.innerHTML = "";
    var data = window.DP_INTERVIEW;
    var page = el("div", "interview-page");
    page.innerHTML = '<div class="iv-header">' +
      '<h1><span class="iv-icon">📋</span> Job Description Analyzer</h1>' +
      '<p class="iv-subtitle">Paste a JD. We scan for known tech keywords, recommend a role, and pull relevant questions from the bank. Static keyword scanner — not an LLM.</p>' +
      '</div>';
    page.appendChild(renderInterviewTabs("jd"));

    var wrap = el("div", "jd-wrap");
    wrap.innerHTML =
      '<label class="engine-label" for="jdInput">Paste the job description below:</label>' +
      '<textarea id="jdInput" class="engine-input jd-input" rows="10" placeholder="Paste the full JD here — the more text, the better the analysis." spellcheck="false"></textarea>' +
      '<div class="jd-actions">' +
      '<button class="mock-reveal-btn" id="jdAnalyze">🔍 Analyze JD</button>' +
      '<button class="engine-nav-btn" id="jdClear">Clear</button>' +
      '</div>' +
      '<div class="jd-result" id="jdResult"></div>';
    page.appendChild(wrap);
    content.appendChild(page);

    function analyze() {
      var text = $("#jdInput").value;
      if (!text.trim()) { $("#jdResult").innerHTML = '<div class="ai-error">Paste some text first.</div>'; return; }
      var r = data.analyzeJD(text);
      if (!r || !r.totalKeywords) {
        $("#jdResult").innerHTML = '<div class="jd-empty">Didn\'t find any known tech keywords. Try a longer JD or a Python role.</div>';
        return;
      }
      // Recommended role card
      var role = null;
      if (r.recommendedRole) { (data.roles || []).some(function (rr) { if (rr.id === r.recommendedRole) { role = rr; return true; } return false; }); }
      var roleCard = "";
      if (role) {
        roleCard = '<div class="jd-role-card">' +
          '<div class="jd-role-head">🎯 Best-fit role</div>' +
          '<div class="jd-role-name">' + role.icon + ' ' + escapeHtml(role.name) + '</div>' +
          '<div class="jd-role-summary">' + escapeHtml(role.summary) + '</div>' +
          '<div class="jd-role-cta">' +
            '<button class="tomorrow-start-btn" id="jdRoleMock">🚀 Start 20-question mock for this role</button>' +
          '</div>' +
        '</div>';
      }
      // Keywords by category
      var catHtml = "";
      Object.keys(r.categorized).forEach(function (cat) {
        var items = r.categorized[cat];
        catHtml += '<div class="jd-cat"><div class="jd-cat-name">' + escapeHtml(cat.replace(/_/g, " ")) + '</div><div class="jd-cat-items">' +
          items.map(function (it) { return '<span class="iv-kw">' + escapeHtml(it.keyword) + (it.count > 1 ? " ×" + it.count : "") + '</span>'; }).join(" ") +
          '</div></div>';
      });
      // Top topics
      var topicsHtml = r.topTopics.map(function (t) { return '<span class="adaptive-strong-tag">' + escapeHtml(t) + '</span>'; }).join(" ");
      // Recommended questions (first 12)
      var recHtml = "";
      r.recommendedQuestions.slice(0, 12).forEach(function (item, i) {
        recHtml += '<div class="jd-rec-q">' +
          '<span class="mock-missed-mark">Q' + (i + 1) + '</span>' +
          '<span class="mock-missed-q">' + escapeHtml(item.q.q) + '</span>' +
          '<span class="mock-missed-tag">' + escapeHtml(item.q.level || "") + '</span>' +
          '</div>';
      });

      $("#jdResult").innerHTML =
        '<div class="jd-summary">Found <b>' + r.totalKeywords + '</b> known tech keywords · matched <b>' + r.topTopics.length + '</b> topics</div>' +
        roleCard +
        '<div class="jd-block"><h3 class="dash-h2">🎯 Top topics for this JD</h3>' + topicsHtml + '</div>' +
        '<div class="jd-block"><h3 class="dash-h2">🔍 What we detected</h3>' + catHtml + '</div>' +
        '<div class="jd-block"><h3 class="dash-h2">📝 Recommended questions to practise</h3>' + (recHtml || '<em>None found</em>') + '</div>' +
        '<div class="mock-eval-disc">' + escapeHtml(r.disclaimer) + '</div>';

      var goBtn = $("#jdRoleMock");
      if (goBtn && role) {
        goBtn.addEventListener("click", function () {
          var picks = data.pickByRole(role.id, 20);
          if (!picks.length) return;
          MOCK_STATE = {
            config: { role: role.id, count: 20, source: "jd" },
            questions: picks,
            idx: 0,
            answers: picks.map(function () { return { selfMark: null, timeSec: 0, revealed: false }; }),
            startedAt: Date.now(),
            qStart: Date.now()
          };
          location.hash = "#/interview/mock/session";
        });
      }
    }

    $("#jdAnalyze").addEventListener("click", analyze);
    $("#jdClear").addEventListener("click", function () { $("#jdInput").value = ""; $("#jdResult").innerHTML = ""; });

    highlightSidebar(null, null);
    document.title = "JD Analyzer | Interview";
    content.focus(); window.scrollTo(0, 0);
  }

  /* ============================================================
     SPACED REVISION — Review Due (Spec #24)
     ============================================================ */
  function renderReviewDue() {
    var content = $("#content"); content.innerHTML = "";
    var data = window.DP_INTERVIEW;
    var page = el("div", "interview-page");
    page.innerHTML = '<div class="iv-header">' +
      '<h1><span class="iv-icon">🔁</span> Review Due — Spaced Revision</h1>' +
      '<p class="iv-subtitle">Questions you got wrong are scheduled for review at 1 → 3 → 7 → 14 days. Answer correctly to graduate them.</p>' +
      '</div>';
    page.appendChild(renderInterviewTabs("review"));

    if (!window.DPProgress) { content.appendChild(page); return; }
    var due = window.DPProgress.getDueReviews(data.questions);

    if (!due.length) {
      var empty = el("div", "review-empty");
      empty.innerHTML = '<div class="review-empty-icon">🎉</div>' +
        '<h3>You\'re all caught up!</h3>' +
        '<p>No questions due for review right now. Come back tomorrow, or attempt more questions to build a review pipeline.</p>' +
        '<div><a class="tomorrow-start-btn" href="#/interview/adaptive">🧠 Try Adaptive Practice</a></div>';
      page.appendChild(empty);
      content.appendChild(page);
      return;
    }

    var info = el("div", "review-info");
    info.innerHTML = '<b>' + due.length + '</b> question' + (due.length === 1 ? "" : "s") + ' due for review. Review each — if you get it right, it moves to the next interval.';
    page.appendChild(info);

    var list = el("div", "review-list");
    due.forEach(function (item) {
      var qId = item.index;
      var card = renderQuestionCard(item.q, qId);
      // Add review actions at the top of body
      var reviewBar = el("div", "review-actions");
      var lvl = item.review.level;
      reviewBar.innerHTML = '<div class="review-schedule">Currently at: <b>' + lvl + '</b></div>' +
        '<button class="review-btn review-btn-good" data-idx="' + qId + '">✅ Got it — advance</button>' +
        '<button class="review-btn review-btn-again" data-idx="' + qId + '">🔁 Missed — repeat tomorrow</button>' +
        '<button class="review-btn" data-idx="' + qId + '" data-act="graduate">🎓 Mastered — remove</button>';
      // Insert reviewBar just after the header inside the card
      var body = card.querySelector(".iv-card-body");
      if (body) body.insertBefore(reviewBar, body.firstChild);
      list.appendChild(card);
    });
    page.appendChild(list);
    content.appendChild(page);

    list.querySelectorAll(".review-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var idx = parseInt(this.dataset.idx, 10);
        var act = this.dataset.act;
        if (this.classList.contains("review-btn-good")) {
          window.DPProgress.advanceReview(idx);
          window.DPProgress.markCorrect(idx);
        } else if (this.classList.contains("review-btn-again")) {
          window.DPProgress.scheduleReview(idx, "1d");
          window.DPProgress.markIncorrect(idx);
        } else if (act === "graduate") {
          window.DPProgress.resetReview(idx);
        }
        // Re-render page
        renderReviewDue();
      });
    });

    highlightSidebar(null, null);
    document.title = "Review Due | Interview";
    content.focus(); window.scrollTo(0, 0);
  }

  /* ============================================================
     MOCK INTERVIEW FLOW  (Phase 5)
     Config screen -> Session screen -> Result screen
     State stored in-memory + last result in localStorage
     ============================================================ */
  var MOCK_STATE = null; // { config, questions:[{q,index}], idx, answers:[{selfMark, timeSec}], startedAt }
  var MOCK_LAST_RESULT_KEY = "dp-mock-last";
  var MOCK_HISTORY_KEY = "dp-mock-history";

  function saveMockResult(result) {
    try {
      localStorage.setItem(MOCK_LAST_RESULT_KEY, JSON.stringify(result));
      var histRaw = localStorage.getItem(MOCK_HISTORY_KEY);
      var hist = [];
      if (histRaw) { try { hist = JSON.parse(histRaw) || []; } catch (e) {} }
      hist.unshift({
        startedAt: result.startedAt, endedAt: result.endedAt,
        config: result.config, score: result.score, total: result.total, accuracy: result.accuracy
      });
      hist = hist.slice(0, 25);
      localStorage.setItem(MOCK_HISTORY_KEY, JSON.stringify(hist));
    } catch (e) {}
  }
  function loadMockHistory() {
    try {
      var raw = localStorage.getItem(MOCK_HISTORY_KEY);
      return raw ? (JSON.parse(raw) || []) : [];
    } catch (e) { return []; }
  }

  function renderMockConfig() {
    var content = $("#content"); content.innerHTML = "";
    var data = window.DP_INTERVIEW;
    var page = el("div", "interview-page");

    page.innerHTML = '<div class="iv-header">' +
      '<h1><span class="iv-icon">🎤</span> Mock Interview</h1>' +
      '<p class="iv-subtitle">Configure your mock, get questions one by one, self-mark, and receive a full scorecard at the end.</p>' +
      '</div>';
    page.appendChild(renderInterviewTabs("mock"));

    var form = el("div", "mock-config");

    function selectGroup(label, options, id, defaultVal) {
      var wrap = el("div", "mock-field");
      wrap.innerHTML = '<label class="mock-label">' + escapeHtml(label) + '</label>';
      var sel = el("select", "mock-select"); sel.id = id;
      sel.innerHTML = options.map(function (o) {
        return '<option value="' + escapeHtml(o.value) + '"' + (o.value === defaultVal ? ' selected' : '') + '>' + escapeHtml(o.label) + '</option>';
      }).join("");
      wrap.appendChild(sel);
      return wrap;
    }

    // Experience level
    var expOpts = [{ value: "", label: "Any" }].concat((data.experienceLevels || []).map(function (l) { return { value: String(l.id), label: l.label + " · " + l.range }; }));
    form.appendChild(selectGroup("Experience Level", expOpts, "mockExp", ""));

    // Difficulty
    var diffOpts = [{ value: "", label: "Any" }, { value: "Beginner", label: "Beginner" }, { value: "Easy", label: "Easy" }, { value: "Intermediate", label: "Intermediate" }, { value: "Advanced", label: "Advanced" }, { value: "Expert", label: "Expert" }];
    form.appendChild(selectGroup("Difficulty", diffOpts, "mockDiff", ""));

    // Round
    var roundOpts = [{ value: "", label: "Any round" }].concat((data.rounds || []).map(function (r) { return { value: r.id, label: r.icon + " " + r.name }; }));
    form.appendChild(selectGroup("Interview Round", roundOpts, "mockRound", ""));

    // Question Type
    var typeOpts = [{ value: "", label: "Any type" }].concat((data.questionTypes || []).map(function (t) { return { value: t.id, label: t.icon + " " + t.label }; }));
    form.appendChild(selectGroup("Question Type", typeOpts, "mockType", ""));

    // Topic
    var topicOpts = [{ value: "", label: "All topics" }].concat((data.levels || []).map(function (l) { return { value: l, label: l }; }));
    form.appendChild(selectGroup("Topic", topicOpts, "mockTopic", ""));

    // Company style
    var companies = data.companiesExtended || data.companies || [];
    var compOpts = [{ value: "", label: "Any company" }].concat(companies.map(function (c) { return { value: c, label: c }; }));
    form.appendChild(selectGroup("Company Style", compOpts, "mockCompany", ""));

    // Number of questions
    var countOpts = [{ value: "5", label: "5 questions (quick)" }, { value: "10", label: "10 questions" }, { value: "15", label: "15 questions" }, { value: "20", label: "20 questions (real interview)" }, { value: "30", label: "30 questions (long)" }];
    form.appendChild(selectGroup("How many questions?", countOpts, "mockCount", "10"));

    // Start button
    var actions = el("div", "mock-actions");
    var startBtn = el("button", "mock-start-btn", "▶ Start Mock Interview");
    actions.appendChild(startBtn);
    form.appendChild(actions);

    page.appendChild(form);

    // Recent history
    var hist = loadMockHistory();
    if (hist.length) {
      var histWrap = el("div", "mock-history");
      histWrap.innerHTML = '<h2 class="dash-h2">🕓 Recent Mock Interviews</h2>';
      hist.slice(0, 5).forEach(function (h) {
        var when = new Date(h.startedAt);
        var pct = h.accuracy;
        histWrap.innerHTML += '<div class="mock-history-row">' +
          '<div class="mock-hist-when">' + when.toLocaleDateString() + ' ' + when.toLocaleTimeString().slice(0,5) + '</div>' +
          '<div class="mock-hist-config">' + (h.config.round || 'Any round') + ' · ' + (h.config.difficulty || 'Any') + ' · ' + h.total + ' Qs</div>' +
          '<div class="mock-hist-score mock-hist-' + (pct >= 75 ? 'good' : pct >= 50 ? 'okay' : 'weak') + '">' + h.score + '/' + h.total + ' · ' + pct + '%</div>' +
          '</div>';
      });
      page.appendChild(histWrap);
    }

    content.appendChild(page);

    startBtn.addEventListener("click", function () {
      var config = {
        expLevel:   $("#mockExp").value === "" ? null : parseInt($("#mockExp").value, 10),
        difficulty: $("#mockDiff").value || null,
        round:      $("#mockRound").value || null,
        type:       $("#mockType").value || null,
        level:      $("#mockTopic").value || null,
        company:    $("#mockCompany").value || null,
        count:      parseInt($("#mockCount").value, 10) || 10
      };
      // Filter empty values for pickMockQuestions
      var pickOpts = { count: config.count };
      if (config.difficulty) pickOpts.difficulty = config.difficulty;
      if (config.round)      pickOpts.round = config.round;
      if (config.level)      pickOpts.level = config.level;
      if (config.type)       pickOpts.type = config.type;
      if (config.company)    pickOpts.company = config.company;
      if (config.expLevel != null) pickOpts.expLevel = config.expLevel;
      var picks = data.pickMockQuestions(pickOpts);
      if (!picks.length) {
        alert("No questions match this configuration. Try loosening the filters.");
        return;
      }
      MOCK_STATE = {
        config: config,
        questions: picks,
        idx: 0,
        answers: picks.map(function () { return { selfMark: null, timeSec: 0, revealed: false }; }),
        startedAt: Date.now(),
        qStart: Date.now()
      };
      location.hash = "#/interview/mock/session";
    });

    highlightSidebar(null, null);
    document.title = "Mock Interview | Interview Prep";
    content.focus(); window.scrollTo(0, 0);
  }

  function renderMockSession() {
    var content = $("#content"); content.innerHTML = "";
    if (!MOCK_STATE) { location.hash = "#/interview/mock"; return; }
    var s = MOCK_STATE;
    var total = s.questions.length;
    var page = el("div", "interview-page mock-session");

    var cur = s.questions[s.idx];
    var q = cur.q;
    var progressPct = Math.round(((s.idx) / total) * 100);

    // Header
    var head = el("div", "mock-session-head");
    head.innerHTML =
      '<div class="mock-progress-info">Question <b>' + (s.idx + 1) + '</b> of <b>' + total + '</b>' +
        (q.round && window.DP_INTERVIEW.getRound(q.round) ? ' · <span class="iv-round-badge">' + window.DP_INTERVIEW.getRound(q.round).icon + ' ' + q.round + '</span>' : '') +
        (q.difficulty ? ' · <span class="iv-diff diff-' + q.difficulty.toLowerCase() + '">' + escapeHtml(q.difficulty) + '</span>' : '') +
        (q.questionType && window.DP_INTERVIEW.getQuestionType(q.questionType) ? ' · <span class="iv-type-badge" title="' + window.DP_INTERVIEW.getQuestionType(q.questionType).label + '">' + window.DP_INTERVIEW.getQuestionType(q.questionType).icon + '</span>' : '') +
      '</div>' +
      '<div class="mock-progress-bar"><div class="mock-progress-fill" style="width:' + progressPct + '%"></div></div>' +
      '<div class="mock-timer" id="mockTimer">⏱ 00:00</div>';
    page.appendChild(head);

    // Question card
    var qCard = el("div", "mock-q-card");
    qCard.innerHTML =
      '<div class="mock-q-label">Interviewer asks:</div>' +
      '<div class="mock-q-text">' + escapeHtml(q.q) + '</div>' +
      (q.company ? '<div class="mock-q-meta">Commonly asked at: ' + q.company.map(escapeHtml).join(", ") + '</div>' : '');
    page.appendChild(qCard);

    // Type your answer (optional — enables auto-evaluation)
    var typeBox = el("div", "mock-typebox");
    var hasKeywords = (q.expectedKeywords && q.expectedKeywords.length) ? true : false;
    typeBox.innerHTML = '<label class="engine-label">Type your answer (optional — enables automatic scoring):</label>' +
      '<textarea class="engine-input" id="mockUserAnswer" rows="3" placeholder="' + (hasKeywords ? "Type your answer here — we'll match it against the concepts the interviewer expects." : "Type your answer here — self-assess after revealing.") + '" spellcheck="false"></textarea>';
    page.appendChild(typeBox);

    // Reveal / answer area
    var revealBox = el("div", "mock-reveal");
    var answerBox = el("div", "mock-answer"); answerBox.style.display = "none";
    revealBox.innerHTML = '<button class="mock-reveal-btn" id="mockReveal">👁 Reveal Answer' + (hasKeywords ? ' & Auto-Evaluate' : ' & Self-Assess') + '</button>' +
      '<div class="mock-hint">' + (hasKeywords ? "Your typed answer will be scored against the concepts the interviewer expects." : "Think about your answer, then reveal. Be honest when self-marking.") + '</div>';
    page.appendChild(revealBox);
    page.appendChild(answerBox);

    // Nav
    var nav = el("div", "mock-nav");
    var quitBtn = el("button", "mock-nav-btn", "✖ Quit");
    var prevBtn = el("button", "mock-nav-btn", "← Previous");
    var skipBtn = el("button", "mock-nav-btn", "⏭ Skip");
    var nextBtn = el("button", "mock-nav-btn mock-next", (s.idx === total - 1 ? "🏁 Finish" : "Next →"));
    nav.appendChild(quitBtn); nav.appendChild(prevBtn); nav.appendChild(skipBtn); nav.appendChild(nextBtn);
    page.appendChild(nav);

    content.appendChild(page);

    // Timer for this question
    s.qStart = Date.now();
    var timerEl = $("#mockTimer");
    var timerInterval = setInterval(function () {
      if (!$("#mockTimer")) { clearInterval(timerInterval); return; }
      var sec = Math.floor((Date.now() - s.qStart) / 1000);
      var m = String(Math.floor(sec / 60)).padStart(2, "0");
      var ss = String(sec % 60).padStart(2, "0");
      timerEl.textContent = "⏱ " + m + ":" + ss;
    }, 500);
    function stopTimer() { clearInterval(timerInterval); return Math.floor((Date.now() - s.qStart) / 1000); }

    function reveal() {
      s.answers[s.idx].revealed = true;
      answerBox.style.display = "block";
      revealBox.style.display = "none";
      typeBox.style.display = "none";
      var html = "";

      // Auto-evaluation block if keywords + user typed something
      var userAns = ($("#mockUserAnswer") && $("#mockUserAnswer").value) || "";
      if (hasKeywords && userAns.trim() && window.DP_INTERVIEW.evaluateAnswer) {
        var ev = window.DP_INTERVIEW.evaluateAnswer(userAns, q.expectedKeywords);
        if (ev.supported) {
          s.answers[s.idx].autoScore = ev.score;
          var bandColor = ev.band === "excellent" ? "good" : ev.band === "strong" ? "good" : ev.band === "partial" ? "partial" : "wrong";
          html += '<div class="mock-eval mock-eval-' + bandColor + '">' +
            '<div class="mock-eval-head">🤖 Auto-Evaluation — <b>' + ev.score + '%</b> (' + ev.band + ')</div>' +
            '<div class="mock-eval-feedback">' + escapeHtml(ev.feedback) + '</div>' +
            (ev.matched.length ? '<div class="mock-eval-row"><b>✅ You mentioned:</b> ' + ev.matched.map(function(k){return '<span class="iv-kw iv-kw-good">'+escapeHtml(k)+'</span>';}).join(" ") + '</div>' : '') +
            (ev.missing.length ? '<div class="mock-eval-row"><b>⚠️ Missing concepts:</b> ' + ev.missing.map(function(k){return '<span class="iv-kw iv-kw-miss">'+escapeHtml(k)+'</span>';}).join(" ") + '</div>' : '') +
            '<div class="mock-eval-disc">' + escapeHtml(ev.disclaimer) + '</div>' +
            '</div>';
        }
      }

      html += '<div class="mock-a-label">✅ Expected Answer</div>' +
        '<div class="mock-a-text">' + renderNotes(q.answer || "(no answer stored)") + '</div>';
      if (q.code) html += '<div class="mock-a-code"><pre class="diagram-box">' + highlight(q.code) + '</pre>' + (q.output ? '<div class="iv-output">Output: ' + escapeHtml(q.output) + '</div>' : '') + '</div>';
      if (q.expectedKeywords && q.expectedKeywords.length) html += '<div class="mock-a-kw"><b>Interviewer expects these keywords:</b> ' + q.expectedKeywords.map(function(k){return '<span class="iv-kw">'+escapeHtml(k)+'</span>';}).join(" ") + '</div>';
      if (q.tips) html += '<div class="mock-a-tip">💡 <b>Tip:</b> ' + escapeHtml(q.tips) + '</div>';

      // Self-assessment
      html += '<div class="mock-selfmark"><div class="mock-selfmark-label">How did you do?</div>' +
        '<button class="mock-mark mock-mark-good" data-mark="correct">✅ Nailed it</button>' +
        '<button class="mock-mark mock-mark-mid" data-mark="partial">⚠️ Partial — got the idea</button>' +
        '<button class="mock-mark mock-mark-bad" data-mark="incorrect">❌ Missed it</button>' +
        '</div>';
      answerBox.innerHTML = html;

      answerBox.querySelectorAll(".mock-mark").forEach(function (btn) {
        btn.addEventListener("click", function () {
          answerBox.querySelectorAll(".mock-mark").forEach(function (b) { b.classList.remove("active"); });
          this.classList.add("active");
          s.answers[s.idx].selfMark = this.dataset.mark;
          // also save to global DPProgress if correct/incorrect
          if (window.DPProgress) {
            if (this.dataset.mark === "correct")   window.DPProgress.markCorrect(cur.index);
            if (this.dataset.mark === "incorrect") window.DPProgress.markIncorrect(cur.index);
            if (this.dataset.mark === "partial")   window.DPProgress.markIncorrect(cur.index);
            if (!window.DPProgress.isStudied(cur.index)) window.DPProgress.toggleStudied(cur.index);
          }
        });
      });
    }

    $("#mockReveal").addEventListener("click", reveal);
    quitBtn.addEventListener("click", function () {
      if (confirm("Quit this mock? Progress will not be saved.")) { stopTimer(); MOCK_STATE = null; location.hash = "#/interview/mock"; }
    });
    prevBtn.addEventListener("click", function () {
      if (s.idx === 0) return;
      s.answers[s.idx].timeSec = stopTimer();
      s.idx--;
      renderMockSession();
    });
    skipBtn.addEventListener("click", function () {
      s.answers[s.idx].timeSec = stopTimer();
      s.answers[s.idx].selfMark = "skip";
      goNext();
    });
    nextBtn.addEventListener("click", function () {
      s.answers[s.idx].timeSec = stopTimer();
      goNext();
    });
    function goNext() {
      if (s.idx === total - 1) {
        location.hash = "#/interview/mock/result";
      } else {
        s.idx++;
        renderMockSession();
      }
    }

    highlightSidebar(null, null);
    document.title = "Mock Q" + (s.idx + 1) + " | Interview";
    window.scrollTo(0, 0);
  }

  function renderMockResult() {
    var content = $("#content"); content.innerHTML = "";
    if (!MOCK_STATE) { location.hash = "#/interview/mock"; return; }
    var s = MOCK_STATE;
    var total = s.questions.length;

    var correct = 0, partial = 0, incorrect = 0, skipped = 0, unanswered = 0;
    var totalTime = 0;
    var perTopic = {};
    s.answers.forEach(function (a, i) {
      var topic = s.questions[i].q.level || "Uncategorised";
      if (!perTopic[topic]) perTopic[topic] = { total:0, correct:0, partial:0, wrong:0 };
      perTopic[topic].total++;
      if (a.selfMark === "correct")        { correct++;   perTopic[topic].correct++; }
      else if (a.selfMark === "partial")    { partial++;  perTopic[topic].partial++; }
      else if (a.selfMark === "incorrect")  { incorrect++; perTopic[topic].wrong++; }
      else if (a.selfMark === "skip")       { skipped++;  perTopic[topic].wrong++; }
      else                                  { unanswered++; }
      totalTime += a.timeSec || 0;
    });
    var attempted = correct + partial + incorrect;
    var score = correct + (partial * 0.5);
    var accuracy = attempted > 0 ? Math.round((score / attempted) * 100) : 0;
    var overall = total > 0 ? Math.round((score / total) * 100) : 0;

    var endedAt = Date.now();
    saveMockResult({
      startedAt: s.startedAt, endedAt: endedAt, config: s.config,
      score: score, total: total, accuracy: accuracy,
      correct: correct, partial: partial, incorrect: incorrect, skipped: skipped, unanswered: unanswered,
      totalTime: totalTime, perTopic: perTopic
    });

    var page = el("div", "interview-page mock-result");
    page.innerHTML = '<div class="iv-header">' +
      '<h1><span class="iv-icon">🏆</span> Mock Interview — Scorecard</h1>' +
      '<p class="iv-subtitle">Here\'s how you did. Weak topics are highlighted — go review them next.</p>' +
      '</div>';
    page.appendChild(renderInterviewTabs("mock"));

    // Big score
    var scoreBand = accuracy >= 85 ? "excellent" : accuracy >= 70 ? "good" : accuracy >= 50 ? "okay" : "weak";
    var scoreLabel = accuracy >= 85 ? "🌟 Excellent — interview-ready" :
                     accuracy >= 70 ? "💪 Strong — a little polish left" :
                     accuracy >= 50 ? "📚 Good progress — keep going" :
                                       "🎯 Room to grow — focus on weak topics";

    var big = el("div", "mock-big-score mock-band-" + scoreBand);
    big.innerHTML =
      '<div class="mock-big-num">' + overall + '%</div>' +
      '<div class="mock-big-frac">' + (Math.round(score * 10) / 10) + ' / ' + total + '</div>' +
      '<div class="mock-big-label">' + scoreLabel + '</div>';
    page.appendChild(big);

    // Stat row
    var stats = el("div", "dash-summary");
    function stat(label, value, cls) {
      return '<div class="dash-stat ' + (cls || "") + '"><div class="dash-stat-value">' + value + '</div><div class="dash-stat-label">' + label + '</div></div>';
    }
    stats.innerHTML =
      stat("✅ Correct",   correct) +
      stat("⚠️ Partial",   partial) +
      stat("❌ Missed",    incorrect) +
      stat("⏭ Skipped",   skipped) +
      stat("Total Time",   Math.floor(totalTime / 60) + "m " + (totalTime % 60) + "s") +
      stat("Avg / Q",      Math.round(totalTime / Math.max(1, total)) + "s");
    page.appendChild(stats);

    // Per topic
    var topicsKeys = Object.keys(perTopic);
    if (topicsKeys.length) {
      var topicWrap = el("div", "mock-topics");
      topicWrap.innerHTML = '<h2 class="dash-h2">📚 Performance by Topic</h2>';
      var grid = el("div", "dash-topic-grid");
      topicsKeys.forEach(function (k) {
        var t = perTopic[k];
        var att = t.correct + t.partial + t.wrong;
        var pct = att > 0 ? Math.round(((t.correct + t.partial * 0.5) / att) * 100) : 0;
        var cls = pct >= 70 ? "good" : pct >= 50 ? "okay" : "weak";
        grid.innerHTML += '<div class="dash-topic mock-topic-' + cls + '">' +
          '<div class="dash-topic-name">' + escapeHtml(k) + '</div>' +
          '<div class="dash-topic-nums">' + t.correct + ' ✅ · ' + t.partial + ' ⚠️ · ' + t.wrong + ' ❌</div>' +
          '<div class="dash-band-bar"><div class="dash-band-fill" style="width:' + pct + '%"></div></div>' +
          '</div>';
      });
      topicWrap.appendChild(grid);
      page.appendChild(topicWrap);
    }

    // Missed questions list (jump to them)
    var missed = [];
    s.answers.forEach(function (a, i) {
      if (a.selfMark === "incorrect" || a.selfMark === "partial" || a.selfMark === "skip") missed.push({ q: s.questions[i].q, index: s.questions[i].index, mark: a.selfMark });
    });
    if (missed.length) {
      var mWrap = el("div", "mock-missed");
      mWrap.innerHTML = '<h2 class="dash-h2">📝 Review these questions</h2>';
      missed.forEach(function (m, i) {
        var icon = m.mark === "incorrect" ? "❌" : m.mark === "partial" ? "⚠️" : "⏭";
        mWrap.innerHTML += '<div class="mock-missed-row">' +
          '<span class="mock-missed-mark">' + icon + '</span>' +
          '<span class="mock-missed-q">' + escapeHtml(m.q.q) + '</span>' +
          '<span class="mock-missed-tag">' + escapeHtml(m.q.level || "") + '</span>' +
          '</div>';
      });
      page.appendChild(mWrap);
    }

    // Actions
    var actions = el("div", "mock-result-actions");
    var againBtn = el("button", "mock-start-btn", "🔁 Start Another Mock");
    var reviewBtn = el("button", "mock-nav-btn", "🔍 Browse missed topics");
    againBtn.addEventListener("click", function () { MOCK_STATE = null; location.hash = "#/interview/mock"; });
    reviewBtn.addEventListener("click", function () {
      if (missed.length && missed[0].q.level) {
        interviewFilters = { level: missed[0].q.level, difficulty: "", company: "", search: "", frequency: "", round: "", questionType: "", showBookmarked: false, showStudied: null };
      }
      location.hash = "#/interview";
    });
    actions.appendChild(againBtn); actions.appendChild(reviewBtn);
    page.appendChild(actions);

    content.appendChild(page);
    highlightSidebar(null, null);
    document.title = "Mock Result | " + overall + "%";
    content.focus(); window.scrollTo(0, 0);
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
    else if (/^#\/interview\/rapid-fire/.test(hash)) { renderInterviewRapidFire(); }
    else if (/^#\/interview\/rounds/.test(hash)) { renderInterviewRounds(); }
    else if (/^#\/interview\/dashboard/.test(hash)) { renderInterviewDashboard(); }
    else if (/^#\/interview\/plans/.test(hash)) { renderInterviewPlans(); }
    else if (/^#\/interview\/mock\/session/.test(hash)) { renderMockSession(); }
    else if (/^#\/interview\/mock\/result/.test(hash))  { renderMockResult(); }
    else if (/^#\/interview\/mock/.test(hash))          { renderMockConfig(); }
    else if (/^#\/interview\/output/.test(hash))        { renderPredictOutput(); }
    else if (/^#\/interview\/debug/.test(hash))         { renderFindBug(); }
    else if (/^#\/interview\/adaptive/.test(hash))      { renderAdaptive(); }
    else if (/^#\/interview\/roles/.test(hash))         { renderRoles(); }
    else if (/^#\/interview\/tomorrow/.test(hash))      { renderTomorrow(); }
    else if (/^#\/interview\/scenarios\/([^/]+)/.test(hash)) {
      var sm = hash.match(/^#\/interview\/scenarios\/([^/]+)/);
      renderScenarioDetail(sm[1]);
    }
    else if (/^#\/interview\/scenarios/.test(hash))     { renderScenarios(); }
    else if (/^#\/interview\/system-design/.test(hash)) { renderSystemDesign(); }
    else if (/^#\/interview\/jd/.test(hash))            { renderJDAnalyzer(); }
    else if (/^#\/interview\/review/.test(hash))        { renderReviewDue(); }
    else if (/^#\/interview/.test(hash)) { renderInterview(); }
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

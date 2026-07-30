/* ============================================================
   Digital Python Notes — application engine
   by Code Origin.AI Private Limited
   Self-contained SPA: hash routing, rendering, search, theme.
   ============================================================ */
(function () {
  "use strict";

  var MODULES = [];
  var MODULE_BY_ID = {};

  /* ---------- Public content API used by data files ---------- */
  var DP = {
    registerModule: function (mod) {
      MODULES.push(mod);
      MODULE_BY_ID[mod.id] = mod;
    },
    boot: boot
  };
  window.DP = DP;

  /* ---------- Small helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function highlight(code) {
    return window.DPHighlight ? window.DPHighlight(code) : escapeHtml(code);
  }

  /* Render lightweight markdown-ish notes -> HTML.
     Supports: **bold**, `code`, paragraphs, - bullet lists, 1. ordered lists,
     and > callouts. Content authored by us, so this is safe. */
  function renderNotes(notes) {
    if (!notes) return "";
    if (Array.isArray(notes)) notes = notes.join("\n");
    var lines = notes.split("\n");
    var html = "";
    var listType = null; // 'ul' | 'ol'

    function closeList() { if (listType) { html += "</" + listType + ">"; listType = null; } }

    function inline(t) {
      t = escapeHtml(t);
      t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
      t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      return t;
    }

    lines.forEach(function (raw) {
      var line = raw.trim();
      if (line === "") { closeList(); return; }
      if (line.charAt(0) === ">") { closeList(); html += '<div class="callout">' + inline(line.slice(1).trim()) + "</div>"; return; }
      var um = line.match(/^[-*]\s+(.*)/);
      var om = line.match(/^\d+\.\s+(.*)/);
      if (um) { if (listType !== "ul") { closeList(); html += "<ul>"; listType = "ul"; } html += "<li>" + inline(um[1]) + "</li>"; return; }
      if (om) { if (listType !== "ol") { closeList(); html += "<ol>"; listType = "ol"; } html += "<li>" + inline(om[1]) + "</li>"; return; }
      closeList();
      html += "<p>" + inline(line) + "</p>";
    });
    closeList();
    return html;
  }

  /* ---------- Sidebar ---------- */
  function buildSidebar() {
    var nav = $("#moduleNav");
    nav.innerHTML = "";
    $("#moduleCount").textContent = MODULES.length + " Modules";

    MODULES.forEach(function (mod) {
      var group = el("div", "nav-group");
      group.dataset.mod = mod.id;

      var btn = el("button", "nav-mod");
      btn.innerHTML =
        '<span class="nav-num">' + mod.id + "</span>" +
        '<span class="nav-title">' + escapeHtml(mod.title) + "</span>" +
        (mod.concepts && mod.concepts.length ? '<span class="nav-caret">▶</span>' : "");
      btn.addEventListener("click", function (e) {
        // If it has concepts, toggle; also navigate to the module.
        location.hash = "#/module/" + mod.id;
        if (mod.concepts && mod.concepts.length) {
          group.classList.toggle("open");
          btn.classList.toggle("open");
        }
      });
      group.appendChild(btn);

      if (mod.concepts && mod.concepts.length) {
        var sub = el("div", "nav-concepts");
        mod.concepts.forEach(function (con) {
          var a = el("a", "nav-concept");
          a.href = "#/module/" + mod.id + "/" + slug(con.title);
          a.textContent = con.title;
          a.dataset.concept = slug(con.title);
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
    var group = document.querySelector('.nav-group[data-mod="' + modId + '"]');
    if (!group) return;
    var btn = group.querySelector(".nav-mod");
    if (btn) btn.classList.add("active");
    // open the active group, collapse others
    document.querySelectorAll(".nav-group").forEach(function (g) {
      if (g !== group) { g.classList.remove("open"); var b = g.querySelector(".nav-mod"); if (b) b.classList.remove("open"); }
    });
    group.classList.add("open");
    if (btn) btn.classList.add("open");
    if (conceptSlug) {
      var c = group.querySelector('.nav-concept[data-concept="' + conceptSlug + '"]');
      if (c) c.classList.add("active");
    }
    // Ensure active item visible
    if (btn && btn.scrollIntoView) btn.scrollIntoView({ block: "nearest" });
  }

  /* ---------- Rendering: Home ---------- */
  function renderHome() {
    var totalExamples = MODULES.reduce(function (sum, m) {
      return sum + (m.concepts || []).reduce(function (s, c) { return s + ((c.examples && c.examples.length) || 0); }, 0);
    }, 0);
    var totalConcepts = MODULES.reduce(function (s, m) { return s + ((m.concepts && m.concepts.length) || 0); }, 0);

    var content = $("#content");
    content.innerHTML = "";

    var hero = el("section", "hero");
    hero.innerHTML =
      "<h1>Digital Python Notes</h1>" +
      "<p>The complete, example-driven Python course — from your very first <code>print()</code> to industry-grade projects. Learn by reading, then learn by doing.</p>" +
      '<div class="hero-badges">' +
      '<span class="hero-badge">📚 ' + MODULES.length + " Modules</span>" +
      '<span class="hero-badge">🧩 ' + totalConcepts + " Concepts</span>" +
      '<span class="hero-badge">💡 ' + totalExamples + "+ Examples</span>" +
      '<span class="hero-badge">🏢 Basic → Industry Professional</span>' +
      "</div>";
    content.appendChild(hero);

    content.appendChild(el("div", "home-section-title", "All Modules"));

    var grid = el("div", "home-grid");
    MODULES.forEach(function (mod) {
      var exCount = (mod.concepts || []).reduce(function (s, c) { return s + ((c.examples && c.examples.length) || 0); }, 0);
      var card = el("a", "mod-card");
      card.href = "#/module/" + mod.id;
      card.innerHTML =
        '<div class="mc-top"><span class="mc-num">M' + mod.id + '</span><span class="mc-icon">' + (mod.icon || "🐍") + "</span></div>" +
        "<h3>" + escapeHtml(mod.title) + "</h3>" +
        "<p>" + escapeHtml(mod.summary || "") + "</p>" +
        '<div class="mc-meta">' + ((mod.concepts && mod.concepts.length) || 0) + " concepts" +
        (exCount ? " · " + exCount + " examples" : "") + "</div>";
      grid.appendChild(card);
    });
    content.appendChild(grid);

    content.appendChild(el("footer", "app-footer",
      "<strong>Digital Python Notes</strong> — developed by <strong>Code Origin.AI Private Limited</strong>.<br>Crafted as a complete learning companion for aspiring and professional Python developers."));

    highlightSidebar(null, null);
    document.title = "Digital Python Notes | Code Origin.AI";
    content.focus();
    window.scrollTo(0, 0);
  }

  /* ---------- Rendering: Module ---------- */
  function renderModule(modId, conceptSlug) {
    var mod = MODULE_BY_ID[modId];
    var content = $("#content");
    if (!mod) { renderHome(); return; }

    content.innerHTML = "";
    var page = el("div", "module-page");

    // breadcrumb
    page.appendChild(el("nav", "breadcrumb",
      '<a href="#/">Home</a><span class="sep">/</span><span>Module ' + mod.id + "</span>"));

    // header
    var header = el("header", "module-header");
    header.innerHTML =
      '<div class="mh-eyebrow">Module ' + mod.id + "</div>" +
      "<h1><span class=\"mh-icon\">" + (mod.icon || "🐍") + "</span>" + escapeHtml(mod.title) + "</h1>" +
      (mod.summary ? "<p>" + escapeHtml(mod.summary) + "</p>" : "");
    page.appendChild(header);

    if (mod.concepts && mod.concepts.length) {
      mod.concepts.forEach(function (con) {
        page.appendChild(renderConcept(con));
      });
    } else {
      var stub = el("div", "stub");
      stub.innerHTML =
        "<h3>" + (mod.icon || "🚧") + " Content in preparation</h3>" +
        "<p>" + escapeHtml(mod.summary || "This module is part of the syllabus.") + "</p>" +
        (mod.topics && mod.topics.length
          ? "<p style=\"margin-top:12px\"><strong>Topics covered in this module:</strong></p><ul>" +
            mod.topics.map(function (t) { return "<li>" + escapeHtml(t) + "</li>"; }).join("") + "</ul>"
          : "");
      page.appendChild(stub);
    }

    // prev / next
    page.appendChild(buildPageNav(mod));

    // footer
    page.appendChild(el("footer", "app-footer",
      "Module " + mod.id + " · <strong>Digital Python Notes</strong> by Code Origin.AI"));

    content.appendChild(page);

    highlightSidebar(mod.id, conceptSlug);
    document.title = "M" + mod.id + " · " + mod.title + " | Digital Python Notes";

    // scroll to concept or top
    if (conceptSlug) {
      var target = document.getElementById("c-" + conceptSlug);
      if (target) { target.scrollIntoView(); return; }
    }
    content.focus();
    window.scrollTo(0, 0);
  }

  function renderConcept(con) {
    var s = slug(con.title);
    var wrap = el("section", "concept");
    wrap.id = "c-" + s;

    var title = el("h2", "concept-title");
    title.innerHTML =
      escapeHtml(con.title) +
      (con.badge ? ' <span class="concept-badge">' + escapeHtml(con.badge) + "</span>" : "") +
      ' <a class="anchor" href="#/module/' + con._modId + "/" + s + '" title="Link to this concept">#</a>';
    wrap.appendChild(title);

    if (con.notes) {
      wrap.appendChild(el("div", "concept-notes", renderNotes(con.notes)));
    }

    if (con.examples && con.examples.length) {
      var head = el("div", "examples-head");
      head.innerHTML = 'Examples <span class="ex-count">' + con.examples.length + "</span>";
      wrap.appendChild(head);

      con.examples.forEach(function (ex, idx) {
        wrap.appendChild(renderExample(ex, idx + 1));
      });
    }
    return wrap;
  }

  function renderExample(ex, index) {
    var wrap = el("div", "example");

    var head = el("div", "example-head");
    head.innerHTML =
      '<span class="dots"><span class="r"></span><span class="y"></span><span class="g"></span></span>' +
      '<span class="ex-index">#' + index + "</span>" +
      '<span class="ex-title">' + escapeHtml(ex.title || "Example") + "</span>";
    wrap.appendChild(head);

    var codeBlock = el("div", "code-block");
    var pre = el("pre");
    var codeEl = el("code");
    codeEl.innerHTML = highlight(ex.code || "");
    pre.appendChild(codeEl);
    codeBlock.appendChild(pre);

    var copyBtn = el("button", "copy-btn");
    copyBtn.innerHTML = "Copy";
    copyBtn.addEventListener("click", function () {
      copyText(ex.code || "");
      copyBtn.classList.add("copied");
      copyBtn.textContent = "Copied!";
      setTimeout(function () { copyBtn.classList.remove("copied"); copyBtn.textContent = "Copy"; }, 1400);
    });
    codeBlock.appendChild(copyBtn);
    wrap.appendChild(codeBlock);

    if (ex.output != null && ex.output !== "") {
      var out = el("div", "example-output");
      out.innerHTML = '<span class="out-label">Output</span>' + escapeHtml(ex.output);
      wrap.appendChild(out);
    }
    return wrap;
  }

  function buildPageNav(mod) {
    var idx = MODULES.indexOf(mod);
    var prev = MODULES[idx - 1];
    var next = MODULES[idx + 1];
    var nav = el("div", "page-nav");
    if (prev) {
      var p = el("a", "prev");
      p.href = "#/module/" + prev.id;
      p.innerHTML = '<div class="pn-dir">← Previous</div><div class="pn-title">M' + prev.id + " · " + escapeHtml(prev.title) + "</div>";
      nav.appendChild(p);
    } else {
      var pd = el("a", "prev disabled"); pd.innerHTML = '<div class="pn-dir">← Previous</div><div class="pn-title">Start</div>'; nav.appendChild(pd);
    }
    if (next) {
      var nx = el("a", "next");
      nx.href = "#/module/" + next.id;
      nx.innerHTML = '<div class="pn-dir">Next →</div><div class="pn-title">M' + next.id + " · " + escapeHtml(next.title) + "</div>";
      nav.appendChild(nx);
    } else {
      var nd = el("a", "next disabled"); nd.innerHTML = '<div class="pn-dir">Next →</div><div class="pn-title">End</div>'; nav.appendChild(nd);
    }
    return nav;
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(fallbackCopy.bind(null, text));
    } else {
      fallbackCopy(text);
    }
  }
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
  }

  /* ---------- Search ---------- */
  var SEARCH_INDEX = [];
  function buildSearchIndex() {
    SEARCH_INDEX = [];
    MODULES.forEach(function (mod) {
      SEARCH_INDEX.push({
        type: "module", modId: mod.id, title: mod.title,
        path: "Module " + mod.id, hash: "#/module/" + mod.id,
        text: (mod.title + " " + (mod.summary || "")).toLowerCase()
      });
      (mod.concepts || []).forEach(function (con) {
        var exText = (con.examples || []).map(function (e) { return (e.title || "") + " " + (e.code || ""); }).join(" ");
        SEARCH_INDEX.push({
          type: "concept", modId: mod.id, title: con.title,
          path: "Module " + mod.id + " · " + mod.title,
          hash: "#/module/" + mod.id + "/" + slug(con.title),
          text: (con.title + " " + (typeof con.notes === "string" ? con.notes : (con.notes || []).join(" ")) + " " + exText).toLowerCase()
        });
      });
    });
  }

  function runSearch(q) {
    var box = $("#searchResults");
    q = q.trim().toLowerCase();
    if (!q) { box.hidden = true; box.innerHTML = ""; return; }

    var results = [];
    for (var i = 0; i < SEARCH_INDEX.length && results.length < 40; i++) {
      var item = SEARCH_INDEX[i];
      var ti = item.title.toLowerCase().indexOf(q);
      var bi = item.text.indexOf(q);
      if (ti !== -1 || bi !== -1) {
        results.push({ item: item, score: (ti !== -1 ? 0 : 1) + (item.type === "module" ? 0 : 0.1) });
      }
    }
    results.sort(function (a, b) { return a.score - b.score; });

    if (!results.length) {
      box.innerHTML = '<div class="sr-empty">No results for “' + escapeHtml(q) + '”</div>';
      box.hidden = false; return;
    }

    box.innerHTML = "";
    results.forEach(function (r, i) {
      var a = el("a", "sr-item" + (i === 0 ? " active" : ""));
      a.href = r.item.hash;
      var t = r.item.title.replace(new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig"), "<mark>$1</mark>");
      a.innerHTML = '<div class="sr-title">' + t + "</div><div class=\"sr-path\">" +
        (r.item.type === "module" ? "📘 " : "🧩 ") + escapeHtml(r.item.path) + "</div>";
      a.addEventListener("click", function () { closeSearch(); });
      box.appendChild(a);
    });
    box.hidden = false;
  }
  function closeSearch() {
    var box = $("#searchResults");
    box.hidden = true; box.innerHTML = "";
    $("#searchInput").value = "";
  }

  /* ---------- Router ---------- */
  function route() {
    var hash = location.hash || "#/";
    var m = hash.match(/^#\/module\/(\d+)(?:\/([^/]+))?/);
    if (m) {
      renderModule(parseInt(m[1], 10), m[2] || null);
    } else {
      renderHome();
    }
    // close mobile nav on navigation
    document.body.classList.remove("nav-open");
  }

  /* ---------- Theme ---------- */
  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("dp-theme"); } catch (e) {}
    if (saved) document.documentElement.setAttribute("data-theme", saved);
    $("#themeToggle").addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      var next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("dp-theme", next); } catch (e) {}
    });
  }

  /* ---------- Boot ---------- */
  function boot() {
    // stamp each concept with its module id (used for anchor links)
    MODULES.forEach(function (mod) {
      (mod.concepts || []).forEach(function (con) { con._modId = mod.id; });
    });
    // keep modules ordered by id
    MODULES.sort(function (a, b) { return a.id - b.id; });

    buildSidebar();
    buildSearchIndex();
    initTheme();

    // search events
    var input = $("#searchInput");
    input.addEventListener("input", function () { runSearch(input.value); });
    input.addEventListener("keydown", function (e) {
      var box = $("#searchResults");
      var active = box.querySelector(".sr-item.active");
      if (e.key === "Escape") { closeSearch(); input.blur(); }
      else if (e.key === "Enter" && active) { e.preventDefault(); location.hash = active.getAttribute("href"); closeSearch(); input.blur(); }
      else if ((e.key === "ArrowDown" || e.key === "ArrowUp") && active) {
        e.preventDefault();
        var items = Array.prototype.slice.call(box.querySelectorAll(".sr-item"));
        var idx = items.indexOf(active);
        var nidx = e.key === "ArrowDown" ? Math.min(items.length - 1, idx + 1) : Math.max(0, idx - 1);
        active.classList.remove("active"); items[nidx].classList.add("active");
        items[nidx].scrollIntoView({ block: "nearest" });
      }
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".search-wrap")) { $("#searchResults").hidden = true; }
    });
    // "/" focuses search
    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && document.activeElement !== input && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
        e.preventDefault(); input.focus();
      }
    });

    // mobile menu
    $("#menuToggle").addEventListener("click", function () { document.body.classList.toggle("nav-open"); });
    $("#scrim").addEventListener("click", function () { document.body.classList.remove("nav-open"); });

    window.addEventListener("hashchange", route);
    route();
  }
})();

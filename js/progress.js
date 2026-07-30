/* ============================================================
   Digital Python Notes — Progress & Bookmarks
   localStorage-backed; exposed as window.DPProgress
   ============================================================ */
(function () {
  "use strict";

  var STORE_KEY = "dp-iv-progress";
  var state = { bookmarks: {}, studied: {}, correct: {}, incorrect: {}, notes: {}, streak: { last: null, days: 0 } };

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        state.bookmarks  = parsed.bookmarks  || {};
        state.studied    = parsed.studied    || {};
        state.correct    = parsed.correct    || {};
        state.incorrect  = parsed.incorrect  || {};
        state.notes      = parsed.notes      || {};
        state.streak     = parsed.streak     || { last: null, days: 0 };
      }
    } catch (e) {}
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
  }
  load();

  function today() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function bumpStreak() {
    var t = today();
    if (state.streak.last === t) return;
    var yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    var y = yesterday.getFullYear() + "-" + String(yesterday.getMonth() + 1).padStart(2, "0") + "-" + String(yesterday.getDate()).padStart(2, "0");
    state.streak.days = state.streak.last === y ? state.streak.days + 1 : 1;
    state.streak.last = t;
    save();
  }

  /* Key by index — stable if questions array order is preserved */
  function keyFor(id) { return String(id); }

  var API = {
    /* ---- Bookmarks ---- */
    isBookmarked: function (id) { return !!state.bookmarks[keyFor(id)]; },
    toggleBookmark: function (id) {
      var k = keyFor(id);
      if (state.bookmarks[k]) delete state.bookmarks[k];
      else state.bookmarks[k] = Date.now();
      save();
      return !!state.bookmarks[k];
    },
    bookmarkedIds: function () { return Object.keys(state.bookmarks); },

    /* ---- Studied ---- */
    isStudied: function (id) { return !!state.studied[keyFor(id)]; },
    toggleStudied: function (id) {
      var k = keyFor(id);
      if (state.studied[k]) delete state.studied[k];
      else { state.studied[k] = Date.now(); bumpStreak(); }
      save();
      return !!state.studied[k];
    },
    studiedIds: function () { return Object.keys(state.studied); },
    studiedCount: function () { return Object.keys(state.studied).length; },

    /* ---- Correct / Incorrect self-marks ---- */
    markCorrect: function (id) {
      var k = keyFor(id);
      state.correct[k] = Date.now();
      delete state.incorrect[k];
      bumpStreak();
      save();
    },
    markIncorrect: function (id) {
      var k = keyFor(id);
      state.incorrect[k] = Date.now();
      delete state.correct[k];
      // Schedule spaced review: 1 day from now on first miss
      API.scheduleReview(id, "1d");
      save();
    },

    /* ---- Spaced Revision (Spec #24) ---- */
    scheduleReview: function (id, spacing) {
      var k = keyFor(id);
      state.review = state.review || {};
      var days = { "today": 0, "1d": 1, "3d": 3, "7d": 7, "14d": 14 }[spacing] || 1;
      var due = Date.now() + days * 24 * 60 * 60 * 1000;
      state.review[k] = { due: due, level: spacing, scheduledAt: Date.now() };
      save();
    },
    advanceReview: function (id) {
      var k = keyFor(id);
      if (!state.review || !state.review[k]) return;
      var order = ["1d", "3d", "7d", "14d"];
      var cur = state.review[k].level;
      var idx = order.indexOf(cur);
      if (idx === -1 || idx === order.length - 1) { delete state.review[k]; save(); return; }
      API.scheduleReview(id, order[idx + 1]);
    },
    resetReview: function (id) {
      var k = keyFor(id);
      if (state.review && state.review[k]) { delete state.review[k]; save(); }
    },
    reviewInfo: function (id) {
      var k = keyFor(id);
      return (state.review && state.review[k]) || null;
    },
    getDueReviews: function (questions) {
      state.review = state.review || {};
      var now = Date.now();
      var out = [];
      Object.keys(state.review).forEach(function (k) {
        if (state.review[k].due <= now) {
          var idx = parseInt(k, 10);
          if (!isNaN(idx) && questions[idx]) {
            out.push({ q: questions[idx], index: idx, review: state.review[k] });
          }
        }
      });
      return out.sort(function (a, b) { return a.review.due - b.review.due; });
    },
    dueReviewCount: function () {
      state.review = state.review || {};
      var now = Date.now(), n = 0;
      Object.keys(state.review).forEach(function (k) { if (state.review[k].due <= now) n++; });
      return n;
    },
    isCorrect: function (id) { return !!state.correct[keyFor(id)]; },
    isIncorrect: function (id) { return !!state.incorrect[keyFor(id)]; },

    /* ---- Notes ---- */
    getNote: function (id) { return state.notes[keyFor(id)] || ""; },
    setNote: function (id, text) {
      var k = keyFor(id);
      if (text && text.trim()) state.notes[k] = text;
      else delete state.notes[k];
      save();
    },

    /* ---- Streak ---- */
    streak: function () { return state.streak; },

    /* ---- Dashboard metrics ---- */
    computeMetrics: function (questions) {
      var total = questions.length;
      var studied = 0, correct = 0, incorrect = 0, bookmarked = 0;
      var perTopic = {};   // topic -> { total, studied, correct, incorrect }
      var perLevel = {};   // difficulty -> { total, studied }
      var perFreq  = {};   // frequency -> total
      questions.forEach(function (q, i) {
        var k = keyFor(i);
        var t = q.level || "Uncategorised";
        var d = q.difficulty || "Beginner";
        var f = q.frequency || "common";
        if (!perTopic[t]) perTopic[t] = { total:0, studied:0, correct:0, incorrect:0 };
        if (!perLevel[d]) perLevel[d] = { total:0, studied:0 };
        if (!perFreq[f])  perFreq[f]  = 0;
        perTopic[t].total++;
        perLevel[d].total++;
        perFreq[f]++;
        if (state.studied[k])   { studied++;   perTopic[t].studied++;  perLevel[d].studied++; }
        if (state.correct[k])   { correct++;   perTopic[t].correct++; }
        if (state.incorrect[k]) { incorrect++; perTopic[t].incorrect++; }
        if (state.bookmarks[k]) { bookmarked++; }
      });

      var attempted = correct + incorrect;
      var accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
      var coverage = total > 0 ? Math.round((studied / total) * 100) : 0;

      /* Readiness bands */
      function bandScore(fromPct) {
        return Math.max(0, Math.min(100, Math.round(fromPct)));
      }
      var readiness = {
        beginner: bandScore((accuracy * 0.4) + (coverage * 0.6)),
        junior:   bandScore((accuracy * 0.5) + (coverage * 0.5)),
        mid:      bandScore((accuracy * 0.6) + (coverage * 0.4) - 5),
        senior:   bandScore((accuracy * 0.7) + (coverage * 0.3) - 12),
        expert:   bandScore((accuracy * 0.8) + (coverage * 0.2) - 20)
      };

      /* Weak topics: bottom 5 by (correct / max(1, correct+incorrect)) with at least 3 attempts */
      var topicScores = Object.keys(perTopic).map(function (k) {
        var t = perTopic[k];
        var att = t.correct + t.incorrect;
        var acc = att > 0 ? (t.correct / att) : null;
        return { topic: k, attempted: att, accuracy: acc, studied: t.studied, total: t.total };
      });
      var weak    = topicScores.filter(function (t) { return t.attempted >= 3 && t.accuracy !== null; })
                               .sort(function (a, b) { return a.accuracy - b.accuracy; }).slice(0, 5);
      var strong  = topicScores.filter(function (t) { return t.attempted >= 3 && t.accuracy !== null; })
                               .sort(function (a, b) { return b.accuracy - a.accuracy; }).slice(0, 5);

      return {
        total: total,
        studied: studied,
        bookmarked: bookmarked,
        correct: correct,
        incorrect: incorrect,
        accuracy: accuracy,
        coverage: coverage,
        readiness: readiness,
        overall: Math.round((readiness.junior + readiness.mid) / 2),
        perTopic: perTopic,
        perLevel: perLevel,
        perFreq: perFreq,
        weak: weak,
        strong: strong,
        streak: state.streak
      };
    },

    /* ---- Reset ---- */
    reset: function () {
      state = { bookmarks: {}, studied: {}, correct: {}, incorrect: {}, notes: {}, streak: { last: null, days: 0 } };
      save();
    }
  };

  window.DPProgress = API;
})();

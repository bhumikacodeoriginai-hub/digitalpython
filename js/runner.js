/* ============================================================
   Digital Python Notes — In-browser Python runner
   Lazily loads Pyodide (WebAssembly) from CDN and runs code.
   Falls back gracefully to the pre-computed output when the
   engine cannot be loaded (e.g. offline / first visit no net).
   ============================================================ */
(function () {
  "use strict";

  var PYODIDE_VERSION = "0.26.4";
  var CDN = "https://cdn.jsdelivr.net/pyodide/v" + PYODIDE_VERSION + "/full/";

  var enginePromise = null;   // Promise<pyodide> once loading begins
  var engine = null;          // resolved pyodide instance
  var statusListeners = [];

  function notify(status, detail) {
    statusListeners.forEach(function (fn) { try { fn(status, detail); } catch (e) {} });
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = function () { reject(new Error("script-load-failed")); };
      document.head.appendChild(s);
    });
  }

  function loadEngine() {
    if (enginePromise) return enginePromise;
    notify("loading");
    enginePromise = loadScript(CDN + "pyodide.js")
      .then(function () {
        // window.loadPyodide is provided by the script above
        return window.loadPyodide({ indexURL: CDN });
      })
      .then(function (py) {
        engine = py;
        notify("ready");
        return py;
      })
      .catch(function (err) {
        enginePromise = null; // allow retry later
        notify("error", err);
        throw err;
      });
    return enginePromise;
  }

  var WRAPPER = [
    "import sys, io, traceback",
    "_dp_buf = io.StringIO()",
    "_dp_old_out, _dp_old_err = sys.stdout, sys.stderr",
    "sys.stdout = _dp_buf",
    "sys.stderr = _dp_buf",
    "try:",
    "    exec(compile(_dp_code, '<workspace>', 'exec'), {'__name__': '__main__'})",
    "except SystemExit:",
    "    pass",
    "except BaseException:",
    "    traceback.print_exc()",
    "finally:",
    "    sys.stdout = _dp_old_out",
    "    sys.stderr = _dp_old_err",
    "_dp_result = _dp_buf.getvalue()"
  ].join("\n");

  var DPRunner = {
    isReady: function () { return !!engine; },
    isLoading: function () { return !!enginePromise && !engine; },
    onStatus: function (fn) { statusListeners.push(fn); },

    /* Warm up the engine (optional) */
    preload: function () { return loadEngine(); },

    /* Run python source, resolving to { ok, output, offline } */
    run: function (code) {
      return loadEngine().then(function (py) {
        try {
          py.globals.set("_dp_code", code);
          py.runPython(WRAPPER);
          var out = py.globals.get("_dp_result");
          var text = (out == null) ? "" : String(out);
          return { ok: true, output: text };
        } catch (e) {
          return { ok: true, output: String(e && e.message ? e.message : e) };
        }
      }).catch(function () {
        return { ok: false, offline: true, output: "" };
      });
    }
  };

  window.DPRunner = DPRunner;
})();

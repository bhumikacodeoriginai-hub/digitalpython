/* ============================================================
   Digital Python Notes — Auto Explanation Engine
   Generates step-by-step explanations for any Python code.
   Used when no manual explanation is provided.
   Developed by Code Origin.AI Private Limited
   ============================================================ */
(function () {
  "use strict";

  /* Pattern recognizers for common Python constructs */
  var PATTERNS = [
    { re: /^(\w+)\s*=\s*"([^"]*)"/, fn: function(m) { return '`' + m[1] + ' = "' + m[2] + '"` — Creates a variable called **' + m[1] + '** and stores the text "' + m[2] + '" in it. Text values (strings) are always written inside quotes.'; } },
    { re: /^(\w+)\s*=\s*'([^']*)'/, fn: function(m) { return '`' + m[1] + " = '" + m[2] + "'` — Creates a variable called **" + m[1] + '** and stores the text "' + m[2] + '" in it.'; } },
    { re: /^(\w+)\s*=\s*(\d+\.\d+)/, fn: function(m) { return '`' + m[1] + ' = ' + m[2] + '` — Stores the decimal number **' + m[2] + '** in variable `' + m[1] + '`. Decimal numbers are called "floats" in Python.'; } },
    { re: /^(\w+)\s*=\s*(\d+)/, fn: function(m) { return '`' + m[1] + ' = ' + m[2] + '` — Stores the whole number **' + m[2] + '** in variable `' + m[1] + '`. Whole numbers are called "integers".'; } },
    { re: /^(\w+)\s*=\s*(True|False)/, fn: function(m) { return '`' + m[1] + ' = ' + m[2] + '` — Stores a boolean (True/False) value. **' + m[2] + '** means ' + (m[2] === 'True' ? 'yes/on' : 'no/off') + '.'; } },
    { re: /^(\w+)\s*=\s*None/, fn: function(m) { return '`' + m[1] + ' = None` — Sets `' + m[1] + '` to **None** (meaning "no value" or "empty"). Used as a placeholder.'; } },
    { re: /^(\w+)\s*=\s*\[(.+)\]/, fn: function(m) { return '`' + m[1] + ' = [...]` — Creates a **list** (an ordered collection of items). Lists can hold multiple values and can be changed later.'; } },
    { re: /^(\w+)\s*=\s*\{(.+:.+)\}/, fn: function(m) { return '`' + m[1] + ' = {...}` — Creates a **dictionary** (stores key-value pairs). Think of it like a real dictionary: each word (key) has a definition (value).'; } },
    { re: /^(\w+)\s*=\s*\((.+)\)/, fn: function(m) { return '`' + m[1] + ' = (...)` — Creates a **tuple** (like a list, but cannot be changed after creation). Used for fixed data.'; } },
    { re: /^(\w+)\s*=\s*\{(.+)\}/, fn: function(m) { return '`' + m[1] + ' = {...}` — Creates a **set** (a collection of unique values with no duplicates).'; } },
    { re: /^(\w+)\s*=\s*(.+)\s*\+\s*(.+)/, fn: function(m) { return '`' + m[1] + ' = ' + m[2].trim() + ' + ' + m[3].trim() + '` — Adds the values and stores the result in `' + m[1] + '`.'; } },
    { re: /^(\w+)\s*=\s*(.+)\s*\*\s*(.+)/, fn: function(m) { return '`' + m[1] + ' = ' + m[2].trim() + ' * ' + m[3].trim() + '` — Multiplies the values and stores the result in `' + m[1] + '`.'; } },
    { re: /^(\w+)\s*=\s*(.+)\s*\/\s*(.+)/, fn: function(m) { return '`' + m[1] + ' = ' + m[2].trim() + ' / ' + m[3].trim() + '` — Divides and stores the result in `' + m[1] + '`.'; } },
    { re: /^(\w+)\s*=\s*(.+)\s*-\s*(.+)/, fn: function(m) { return '`' + m[1] + ' = ' + m[2].trim() + ' - ' + m[3].trim() + '` — Subtracts and stores the result in `' + m[1] + '`.'; } },
    { re: /^(\w+)\s*=\s*(.+)\s*\*\*\s*(.+)/, fn: function(m) { return '`' + m[1] + ' = ' + m[2].trim() + ' ** ' + m[3].trim() + '` — Calculates the power (exponent) and stores the result.'; } },
    { re: /^(\w+)\s*=\s*(.+)\s*%\s*(.+)/, fn: function(m) { return '`' + m[1] + ' = ' + m[2].trim() + ' % ' + m[3].trim() + '` — Gets the remainder after division (modulus operator).'; } },
    { re: /^(\w+)\s*=\s*(.+)\s*\/\/\s*(.+)/, fn: function(m) { return '`' + m[1] + ' = ' + m[2].trim() + ' // ' + m[3].trim() + '` — Floor division (divides and rounds down to the nearest whole number).'; } },
    { re: /^(\w+)\s*\+=\s*(.+)/, fn: function(m) { return '`' + m[1] + ' += ' + m[2].trim() + '` — Adds ' + m[2].trim() + ' to the current value of `' + m[1] + '` (shortcut for `' + m[1] + ' = ' + m[1] + ' + ' + m[2].trim() + '`).'; } },
    { re: /^(\w+)\s*-=\s*(.+)/, fn: function(m) { return '`' + m[1] + ' -= ' + m[2].trim() + '` — Subtracts ' + m[2].trim() + ' from `' + m[1] + '`.'; } },
    { re: /^(\w+)\s*\*=\s*(.+)/, fn: function(m) { return '`' + m[1] + ' *= ' + m[2].trim() + '` — Multiplies `' + m[1] + '` by ' + m[2].trim() + '.'; } },
    { re: /^print\((.+)\)/, fn: function(m) { return '`print(' + m[1] + ')` — Displays the value on the screen. `print()` is how Python shows output to the user.'; } },
    { re: /^for\s+(\w+)\s+in\s+range\((.+)\)/, fn: function(m) { return '`for ' + m[1] + ' in range(' + m[2] + ')` — A **loop** that repeats code. The variable `' + m[1] + '` takes each number in the range, one at a time.'; } },
    { re: /^for\s+(\w+)\s+in\s+(.+):/, fn: function(m) { return '`for ' + m[1] + ' in ' + m[2] + '` — A **loop** that goes through each item in ' + m[2] + ', one by one. Each time, the item is stored in `' + m[1] + '`.'; } },
    { re: /^while\s+(.+):/, fn: function(m) { return '`while ' + m[1] + '` — A **loop** that keeps repeating as long as the condition `' + m[1] + '` is True. Be careful — if the condition never becomes False, it runs forever!'; } },
    { re: /^if\s+(.+):/, fn: function(m) { return '`if ' + m[1] + '` — Checks if the condition is True. If yes, runs the indented code below. If no, skips it.'; } },
    { re: /^elif\s+(.+):/, fn: function(m) { return '`elif ' + m[1] + '` — "Else if" — checks another condition if the previous `if` was False.'; } },
    { re: /^else:/, fn: function() { return '`else` — Runs this code if ALL previous conditions were False. It\'s the "catch everything else" block.'; } },
    { re: /^def\s+(\w+)\(([^)]*)\):/, fn: function(m) { return '`def ' + m[1] + '(' + m[2] + ')` — Defines a **function** (a reusable block of code). You can call it later by writing `' + m[1] + '(...)`.'; } },
    { re: /^class\s+(\w+)/, fn: function(m) { return '`class ' + m[1] + '` — Defines a **class** (a blueprint for creating objects). Classes bundle data and behavior together.'; } },
    { re: /^return\s+(.+)/, fn: function(m) { return '`return ' + m[1] + '` — Sends a value back from a function to whoever called it. The function stops here.'; } },
    { re: /^import\s+(\w+)/, fn: function(m) { return '`import ' + m[1] + '` — Loads a module (a library of pre-written code). Now you can use `' + m[1] + '.something()`.'; } },
    { re: /^from\s+(\w+)\s+import\s+(.+)/, fn: function(m) { return '`from ' + m[1] + ' import ' + m[2] + '` — Loads specific items from a module so you can use them directly.'; } },
    { re: /^try:/, fn: function() { return '`try` — Starts a block of code that might cause an error. If an error happens, Python jumps to `except` instead of crashing.'; } },
    { re: /^except\s*(.*)/, fn: function(m) { return '`except' + (m[1] ? ' ' + m[1] : '') + '` — Catches the error and runs this code instead of crashing the program.'; } },
    { re: /^finally:/, fn: function() { return '`finally` — This code ALWAYS runs, whether there was an error or not. Used for cleanup.'; } },
    { re: /^with\s+(.+)\s+as\s+(\w+):/, fn: function(m) { return '`with ' + m[1] + ' as ' + m[2] + '` — Opens a resource (like a file) safely. Python automatically closes it when done.'; } },
    { re: /^#\s*(.+)/, fn: function(m) { return '`# ' + m[1] + '` — This is a **comment**. Python ignores it completely. It\'s a note for humans reading the code.'; } },
    { re: /^(\w+)\.append\((.+)\)/, fn: function(m) { return '`' + m[1] + '.append(' + m[2] + ')` — Adds `' + m[2] + '` to the **end** of the list `' + m[1] + '`.'; } },
    { re: /^(\w+)\.sort\(\)/, fn: function(m) { return '`' + m[1] + '.sort()` — Sorts the list `' + m[1] + '` in ascending order (smallest to largest).'; } },
    { re: /^(\w+)\.reverse\(\)/, fn: function(m) { return '`' + m[1] + '.reverse()` — Reverses the order of items in list `' + m[1] + '`.'; } },
    { re: /^del\s+(\w+)/, fn: function(m) { return '`del ' + m[1] + '` — Deletes the variable `' + m[1] + '` from memory. It no longer exists after this line.'; } },
    { re: /^(\w+),\s*(\w+)\s*=\s*(\w+),\s*(\w+)/, fn: function(m) { return '`' + m[1] + ', ' + m[2] + ' = ' + m[3] + ', ' + m[4] + '` — **Swaps** the values of `' + m[1] + '` and `' + m[2] + '` in one line (a Python special trick!).'; } },
    { re: /^break/, fn: function() { return '`break` — Immediately exits the current loop. No more iterations will happen.'; } },
    { re: /^continue/, fn: function() { return '`continue` — Skips the rest of this iteration and jumps to the next one.'; } },
    { re: /^pass/, fn: function() { return '`pass` — Does nothing. Used as a placeholder when Python requires code but you don\'t want to write any yet.'; } },
    { re: /^raise\s+(.+)/, fn: function(m) { return '`raise ' + m[1] + '` — Intentionally causes an error. Used to signal that something went wrong.'; } },
    { re: /^lambda\s+(.+):(.+)/, fn: function(m) { return '`lambda ' + m[1] + ':' + m[2] + '` — Creates a small anonymous (unnamed) function. It takes `' + m[1].trim() + '` as input and returns `' + m[2].trim() + '`.'; } },
    { re: /^global\s+(\w+)/, fn: function(m) { return '`global ' + m[1] + '` — Tells Python that `' + m[1] + '` refers to the variable defined outside this function (at the top level).'; } }
  ];

  function explainLine(line) {
    var trimmed = line.trim();
    if (!trimmed || trimmed === "") return null;
    for (var i = 0; i < PATTERNS.length; i++) {
      var match = trimmed.match(PATTERNS[i].re);
      if (match) return PATTERNS[i].fn(match);
    }
    // Generic fallback for unrecognized lines
    if (trimmed.length > 2 && !trimmed.startsWith("    ") && !trimmed.startsWith("\t")) {
      return '`' + trimmed.slice(0, 50) + (trimmed.length > 50 ? '...' : '') + '` — This line executes an operation in Python.';
    }
    return null;
  }

  /* Generate a full explanation for a code block */
  function autoExplain(code, title) {
    if (!code) return null;
    var lines = code.split("\n");
    var explanations = [];
    var stepNum = 0;

    // Title-based intro
    if (title) {
      explanations.push("**What this program does:** " + title + ".");
      explanations.push("");
    }

    explanations.push("**Step-by-step breakdown:**");

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var trimmed = line.trim();

      // Skip empty lines and deeply indented lines (they're part of blocks)
      if (!trimmed) continue;
      if (line.match(/^    /) && !trimmed.match(/^(print|return|break|continue|pass|raise|global)/)) continue;

      var explanation = explainLine(trimmed);
      if (explanation) {
        stepNum++;
        explanations.push(stepNum + ". " + explanation);
      }
    }

    if (stepNum === 0) return null;

    // Add a helpful tip
    explanations.push("");
    explanations.push("> **Tip:** Click ▶ Run to execute this code live in your browser and see the output!");

    return explanations;
  }

  window.DPExplainer = {
    explain: autoExplain,
    explainLine: explainLine
  };
})();

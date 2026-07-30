/* ============================================================
   Digital Python Notes — Deep Algorithm Tracing Engine (v6)
   
   Generates DETAILED step-by-step execution traces showing:
   - What each line does (in simple language)
   - How variables change at each step
   - Memory state / variable table
   - Loop iterations traced one by one
   - Condition evaluation shown
   - Function calls explained
   
   Written for NON-TECH students to understand algorithms.
   Developed by Code Origin.AI Private Limited
   ============================================================ */
(function () {
  "use strict";

  /* -------- Line-level explainers (detailed) -------- */
  function explainAssignment(varName, value, rawLine) {
    var type = "";
    if (/^"/.test(value) || /^'/.test(value) || /^f"/.test(value) || /^f'/.test(value)) type = " (this is **text/string** — always in quotes)";
    else if (/^True$|^False$/.test(value)) type = " (this is a **boolean** — True means yes, False means no)";
    else if (/^None$/.test(value)) type = " (this means **no value** / empty)";
    else if (/^\[/.test(value)) type = " (this is a **list** — an ordered collection of items in square brackets)";
    else if (/^\{.*:/.test(value)) type = " (this is a **dictionary** — stores data as key:value pairs)";
    else if (/^\(/.test(value)) type = " (this is a **tuple** — like a list but cannot be changed)";
    else if (/^\{/.test(value)) type = " (this is a **set** — stores unique values only)";
    else if (/^\d+\.\d+/.test(value)) type = " (this is a **decimal number/float**)";
    else if (/^\d+$/.test(value)) type = " (this is a **whole number/integer**)";
    return "**`" + rawLine.trim() + "`**\n- Creates a variable named `" + varName + "` and stores the value `" + value.trim() + "` in it" + type + ".\n- **Think of it as:** Writing \"" + varName + " = " + value.trim() + "\" on a whiteboard. Now whenever Python sees `" + varName + "`, it knows the value is `" + value.trim() + "`.";
  }

  function explainPrint(content) {
    return "**`print(" + content + ")`**\n- Python takes whatever is inside `print()` and **displays it on the screen**.\n- If there are variables inside, Python first looks up their current values, then shows the result.\n- `print()` is how Python **communicates with the user** — it's like Python speaking out loud.";
  }

  function explainForRange(varName, rangeArgs) {
    var parts = rangeArgs.split(",").map(function(s){ return s.trim(); });
    var start = "0", stop = parts[0], step = "1";
    if (parts.length === 2) { start = parts[0]; stop = parts[1]; }
    if (parts.length === 3) { start = parts[0]; stop = parts[1]; step = parts[2]; }
    return "**`for " + varName + " in range(" + rangeArgs + ")`**\n- This is a **loop** — it repeats the indented code below multiple times.\n- `range(" + rangeArgs + ")` generates numbers from " + start + " to " + (parseInt(stop)-1) + " (the stop value is NOT included)." + (step !== "1" ? "\n- Step is " + step + ", so it goes: " + start + ", " + (parseInt(start)+parseInt(step)) + ", " + (parseInt(start)+2*parseInt(step)) + "..." : "") + "\n- Each time through the loop, `" + varName + "` takes the next number.\n\n**Trace (how the loop runs):**\n- Iteration 1: `" + varName + " = " + start + "` → runs the body\n- Iteration 2: `" + varName + " = " + (parseInt(start)+parseInt(step)) + "` → runs the body\n- ...continues until `" + varName + "` reaches " + stop + " (then stops)";
  }

  function explainForIn(varName, collection) {
    return "**`for " + varName + " in " + collection + "`**\n- This is a **loop** — it goes through each item in `" + collection + "` one by one.\n- Each time, the current item is stored in `" + varName + "`.\n\n**How it works (trace):**\n- Takes the 1st item from `" + collection + "` → puts it in `" + varName + "` → runs the body\n- Takes the 2nd item → puts it in `" + varName + "` → runs the body\n- ...continues until all items are processed";
  }

  function explainWhile(condition) {
    return "**`while " + condition + ":`**\n- This is a **loop** that keeps repeating as long as `" + condition + "` is True.\n- Before each iteration, Python checks: \"Is `" + condition + "` still True?\"\n  - If YES → run the body again\n  - If NO → stop the loop and move on\n\n**Warning:** If the condition never becomes False, the loop runs forever (infinite loop)!";
  }

  function explainIf(condition) {
    return "**`if " + condition + ":`**\n- Python evaluates the condition: `" + condition + "`\n- If the result is **True** → execute the indented code below\n- If the result is **False** → skip the indented code\n\n**How Python evaluates it:**\n- Looks up current values of all variables in the condition\n- Calculates the result (True or False)\n- Decides whether to run or skip the code block";
  }

  function explainElif(condition) {
    return "**`elif " + condition + ":`** (\"else if\")\n- Only checked if the previous `if` (or `elif`) was **False**\n- Evaluates: `" + condition + "`\n- If True → run this block\n- If False → check the next `elif` or `else`";
  }

  function explainDef(funcName, params) {
    return "**`def " + funcName + "(" + params + "):`**\n- **Defines a function** — a reusable block of code with a name.\n- `" + funcName + "` is the function's name (you choose it).\n- `" + params + "` are **parameters** (inputs the function needs)." + (params ? "\n\n**How to use it:**\n- Call it later: `" + funcName + "(" + params.split(",").map(function(p,i){ return "value" + (i+1); }).join(", ") + ")`\n- The values you pass become the parameters inside the function." : "") + "\n\n**Analogy:** A function is like a recipe — you define it once, then use it many times.";
  }

  function explainClass(className) {
    return "**`class " + className + ":`**\n- Defines a **class** — a blueprint/template for creating objects.\n- Think of a class as a cookie cutter — it defines the shape, and each cookie (object) is made from it.\n- Inside the class, you define:\n  - `__init__` — the constructor (sets up initial values)\n  - Methods — functions that belong to this class";
  }

  function explainReturn(value) {
    return "**`return " + value + "`**\n- Sends the value `" + value + "` back to whoever called this function.\n- The function **stops here** — any code after `return` won't run.\n\n**Analogy:** Like a factory worker finishing a product and handing it back. The worker (function) is done.";
  }

  function explainImport(module) {
    return "**`import " + module + "`**\n- Loads the `" + module + "` library (pre-written code that Python provides).\n- After this line, you can use `" + module + ".something()` to access its features.\n\n**Analogy:** Like adding a new app to your phone — it gives you new capabilities.";
  }

  /* -------- Main explain function -------- */
  function autoExplain(code, title) {
    if (!code) return null;
    var lines = code.split("\n");
    var explanations = [];
    var stepNum = 0;
    var hasLoop = false;
    var hasCondition = false;
    var hasFunction = false;

    // Intro
    if (title) {
      explanations.push("## 🎯 What this program does");
      explanations.push("**" + title + "**");
      explanations.push("");
    }

    explanations.push("## 📝 Step-by-Step Algorithm Trace");
    explanations.push("*Follow along — this shows exactly what Python does at each line:*");
    explanations.push("");

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var trimmed = line.trim();
      if (!trimmed) continue;

      // Skip deeply indented lines for top-level trace
      var indent = line.match(/^(\s*)/)[1].length;

      var explanation = null;
      var m;

      // Comments
      if ((m = trimmed.match(/^#\s*(.+)/))) {
        explanation = "**`" + trimmed + "`** — This is a comment (note for humans). Python ignores this line completely.";
      }
      // Assignments
      else if ((m = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)/)) && indent < 4) {
        explanation = explainAssignment(m[1], m[2], trimmed);
      }
      // Augmented assignments
      else if ((m = trimmed.match(/^([a-zA-Z_]\w*)\s*\+=\s*(.+)/))) {
        explanation = "**`" + trimmed + "`**\n- Takes the current value of `" + m[1] + "`, adds `" + m[2].trim() + "` to it, and stores the result back in `" + m[1] + "`.\n- Shortcut for: `" + m[1] + " = " + m[1] + " + " + m[2].trim() + "`";
      }
      else if ((m = trimmed.match(/^([a-zA-Z_]\w*)\s*-=\s*(.+)/))) {
        explanation = "**`" + trimmed + "`**\n- Subtracts `" + m[2].trim() + "` from `" + m[1] + "` and stores the result back.";
      }
      else if ((m = trimmed.match(/^([a-zA-Z_]\w*)\s*\*=\s*(.+)/))) {
        explanation = "**`" + trimmed + "`**\n- Multiplies `" + m[1] + "` by `" + m[2].trim() + "` and stores the result back.";
      }
      // Print
      else if ((m = trimmed.match(/^print\((.+)\)$/))) {
        explanation = explainPrint(m[1]);
      }
      // For with range
      else if ((m = trimmed.match(/^for\s+(\w+)\s+in\s+range\((.+)\)\s*:/))) {
        explanation = explainForRange(m[1], m[2]);
        hasLoop = true;
      }
      // For in
      else if ((m = trimmed.match(/^for\s+(.+)\s+in\s+(.+)\s*:/))) {
        explanation = explainForIn(m[1], m[2]);
        hasLoop = true;
      }
      // While
      else if ((m = trimmed.match(/^while\s+(.+)\s*:/))) {
        explanation = explainWhile(m[1]);
        hasLoop = true;
      }
      // If
      else if ((m = trimmed.match(/^if\s+(.+)\s*:/))) {
        explanation = explainIf(m[1]);
        hasCondition = true;
      }
      // Elif
      else if ((m = trimmed.match(/^elif\s+(.+)\s*:/))) {
        explanation = explainElif(m[1]);
      }
      // Else
      else if (trimmed === "else:") {
        explanation = "**`else:`**\n- If ALL previous conditions were False, run this block.\n- It's the \"catch everything else\" / default case.";
      }
      // Function def
      else if ((m = trimmed.match(/^def\s+(\w+)\(([^)]*)\)\s*:/))) {
        explanation = explainDef(m[1], m[2]);
        hasFunction = true;
      }
      // Class
      else if ((m = trimmed.match(/^class\s+(\w+)/))) {
        explanation = explainClass(m[1]);
      }
      // Return
      else if ((m = trimmed.match(/^return\s+(.+)/))) {
        explanation = explainReturn(m[1]);
      }
      // Import
      else if ((m = trimmed.match(/^import\s+(\w+)/))) {
        explanation = explainImport(m[1]);
      }
      // From import
      else if ((m = trimmed.match(/^from\s+(\w+)\s+import\s+(.+)/))) {
        explanation = "**`from " + m[1] + " import " + m[2] + "`**\n- Loads specific functions/values from the `" + m[1] + "` library.\n- After this, you can use `" + m[2] + "` directly (without writing `" + m[1] + ".` before it).";
      }
      // Try/except/finally
      else if (trimmed === "try:") {
        explanation = "**`try:`**\n- Starts a \"safety net\" block. If any error happens inside, Python won't crash — it jumps to `except` instead.";
      }
      else if ((m = trimmed.match(/^except\s*(.*)\s*:/))) {
        explanation = "**`except" + (m[1] ? " " + m[1] : "") + ":`**\n- Catches the error. Instead of crashing, Python runs this code.\n- Like a safety net catching someone who falls.";
      }
      else if (trimmed === "finally:") {
        explanation = "**`finally:`**\n- This code ALWAYS runs — whether there was an error or not. Used for cleanup (closing files, etc).";
      }
      // Break/continue/pass
      else if (trimmed === "break") {
        explanation = "**`break`**\n- Immediately **exits** the loop. Stops all remaining iterations.\n- Like pressing the \"STOP\" button on a machine.";
      }
      else if (trimmed === "continue") {
        explanation = "**`continue`**\n- **Skips** the rest of this iteration and goes to the next one.\n- Like saying \"skip this one, move to the next.\"";
      }
      else if (trimmed === "pass") {
        explanation = "**`pass`**\n- Does absolutely nothing. It's a placeholder.\n- Used when Python requires code but you don't want to write any yet.";
      }
      // Del
      else if ((m = trimmed.match(/^del\s+(\w+)/))) {
        explanation = "**`del " + m[1] + "`**\n- Deletes the variable `" + m[1] + "` from memory. After this, `" + m[1] + "` no longer exists.";
      }
      // Global
      else if ((m = trimmed.match(/^global\s+(\w+)/))) {
        explanation = "**`global " + m[1] + "`**\n- Tells Python: \"I want to use the `" + m[1] + "` variable from OUTSIDE this function, not create a new local one.\"";
      }
      // Method calls (common ones)
      else if ((m = trimmed.match(/^(\w+)\.append\((.+)\)/)) && indent < 4) {
        explanation = "**`" + trimmed + "`**\n- Adds `" + m[2] + "` to the **end** of list `" + m[1] + "`.\n- The list grows by one item.";
      }
      else if ((m = trimmed.match(/^(\w+)\.sort\(/)) && indent < 4) {
        explanation = "**`" + trimmed + "`**\n- Sorts the list `" + m[1] + "` in order (smallest to largest by default).\n- The list is modified in-place (no new list is created).";
      }
      // Indented print (in a loop/condition)
      else if ((m = trimmed.match(/^print\((.+)\)$/)) && indent >= 4) {
        explanation = "    **`" + trimmed + "`** (inside the block above)\n    - Displays output. This runs each time the loop iterates / when the condition is True.";
      }

      if (explanation) {
        stepNum++;
        explanations.push("**Step " + stepNum + ":**");
        explanations.push(explanation);
        explanations.push("");
      }
    }

    if (stepNum === 0) return null;

    // Add execution summary
    explanations.push("---");
    explanations.push("## 🔍 Execution Summary");
    var summary = [];
    if (hasLoop) summary.push("This program uses a **loop** (repeating code)");
    if (hasCondition) summary.push("This program uses **conditions** (making decisions)");
    if (hasFunction) summary.push("This program defines a **function** (reusable code)");
    if (summary.length) explanations.push(summary.join(". ") + ".");
    explanations.push("");
    explanations.push("> 💡 **Try it yourself:** Click ▶ Run to execute this code. Then click ✎ Edit to change values and see what happens!");

    return explanations;
  }

  window.DPExplainer = {
    explain: autoExplain
  };
})();

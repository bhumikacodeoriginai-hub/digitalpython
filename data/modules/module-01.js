/* Module 1 — Introduction to Python (v7 — Full 12-Step Teaching Framework) */
window.DP.registerModule({
  id: 1,
  title: "Introduction to Python",
  icon: "🐍",
  summary: "Complete beginner-friendly introduction with the 12-step classroom teaching method: analogies, diagrams, step-by-step execution traces, common mistakes, interview questions and practice problems.",
  concepts: [
    {
      title: "What is Python?",
      badge: "Concept",

      introduction: [
        "**What is it?** Python is a programming language — a way to give instructions to a computer.",
        "**Why do we need it?** Computers don't understand Hindi, English or Kannada. They need a special language. Python is that language — and it's the easiest one to learn.",
        "**Where is it used?**",
        "- Google, YouTube, Instagram — all use Python",
        "- Banks use it for calculations",
        "- Hospitals use it for patient data",
        "- Scientists use it for research",
        "- Companies use it for automation (doing boring work automatically)",
        "**Why do companies hire Python developers?** Because Python is fast to write, easy to maintain, and can do almost anything."
      ],

      analogy: [
        "**Think of it like a TV Remote:**",
        "- You press buttons (write code) → TV does what you want (computer follows instructions)",
        "- The remote has specific buttons (Python has specific commands)",
        "- Press Volume Up → TV increases volume",
        "- Write `print(\"Hello\")` → Computer shows 'Hello' on screen",
        "",
        "**Another analogy — a Recipe:**",
        "- A recipe has step-by-step instructions (Line 1, Line 2, Line 3...)",
        "- Python code is the same — instructions executed one by one, top to bottom",
        "- If you skip a step in a recipe, the dish goes wrong",
        "- If you skip a line in Python, the program goes wrong"
      ],

      diagram: [
        "┌─────────────────────────────────────────────────┐",
        "│            HOW PYTHON WORKS                      │",
        "├─────────────────────────────────────────────────┤",
        "│                                                 │",
        "│   YOU write code ──→ Python reads it            │",
        "│        │                    │                    │",
        "│        │                    ▼                    │",
        "│        │            Executes line by line        │",
        "│        │                    │                    │",
        "│        │                    ▼                    │",
        "│        │            Shows output on screen       │",
        "│        ▼                                        │",
        "│   print(\"Hello\")  ──→  Hello                    │",
        "│   print(2 + 3)    ──→  5                        │",
        "│   print(\"Hi\" * 3) ──→  HiHiHi                  │",
        "│                                                 │",
        "└─────────────────────────────────────────────────┘"
      ],

      syntax: [
        "**The `print()` command:**",
        "```",
        "print(\"your message here\")",
        "```",
        "- `print` — the command name (always lowercase)",
        "- `(` and `)` — parentheses (required — put your message inside)",
        "- `\"` and `\"` — quotes (wrap text in double quotes)",
        "- The text between quotes is what appears on screen",
        "",
        "> **Rule:** Python is case-sensitive. `Print` or `PRINT` will NOT work. Only `print` works."
      ],

      notes: [
        "**Python** is a high-level, interpreted programming language. It runs your code line by line from top to bottom.",
        "- Created by **Guido van Rossum** in 1991",
        "- Named after Monty Python (a comedy group), not the snake",
        "- Used by Google, NASA, Netflix, Instagram, and millions of developers"
      ],

      examples: [
        {
          title: "Your very first program — Hello World",
          code: `print("Hello, World!")`,
          output: `Hello, World!`,
          explanation: [
            "## 🎯 What this program does",
            "Displays the message 'Hello, World!' on the screen.",
            "",
            "## 📝 Line-by-Line Execution Trace",
            "",
            "**Line 1: `print(\"Hello, World!\")`**",
            "- Python sees the command `print()`",
            "- It looks inside the parentheses: `\"Hello, World!\"`",
            "- It takes that text and displays it on screen",
            "- Result: `Hello, World!` appears",
            "",
            "## 🧠 Memory State",
            "- No variables created",
            "- Python just prints and moves on",
            "",
            "> **Analogy:** Like telling a speaker 'Say Hello World' — it just says it out loud."
          ]
        },
        {
          title: "Print multiple lines",
          code: `print("My name is Arjun")\nprint("I am learning Python")\nprint("Python is easy!")`,
          output: `My name is Arjun\nI am learning Python\nPython is easy!`,
          explanation: [
            "## 🎯 What this program does",
            "Prints 3 separate messages, each on a new line.",
            "",
            "## 📝 Execution Trace (top to bottom)",
            "",
            "**Step 1: `print(\"My name is Arjun\")`**",
            "- Python reads Line 1 → displays 'My name is Arjun'",
            "- Moves to next line ↓",
            "",
            "**Step 2: `print(\"I am learning Python\")`**",
            "- Python reads Line 2 → displays 'I am learning Python'",
            "- Moves to next line ↓",
            "",
            "**Step 3: `print(\"Python is easy!\")`**",
            "- Python reads Line 3 → displays 'Python is easy!'",
            "- No more lines → Program ends ✓",
            "",
            "## 🔑 Key Rule",
            "Python ALWAYS runs code from **top to bottom**, one line at a time. Never jumps around (unless you tell it to with loops/conditions)."
          ]
        },
        {
          title: "Python as a calculator",
          code: `print(10 + 5)\nprint(20 - 8)\nprint(6 * 7)\nprint(15 / 4)`,
          output: `15\n12\n42\n3.75`,
          explanation: [
            "## 🎯 What this program does",
            "Uses Python as a calculator to do math.",
            "",
            "## 📝 Execution Trace",
            "",
            "**Line 1: `print(10 + 5)`**",
            "- Python calculates 10 + 5 = 15",
            "- Displays: `15`",
            "",
            "**Line 2: `print(20 - 8)`**",
            "- Python calculates 20 - 8 = 12",
            "- Displays: `12`",
            "",
            "**Line 3: `print(6 * 7)`**",
            "- `*` means multiplication",
            "- Python calculates 6 × 7 = 42",
            "- Displays: `42`",
            "",
            "**Line 4: `print(15 / 4)`**",
            "- `/` means division",
            "- Python calculates 15 ÷ 4 = 3.75",
            "- Displays: `3.75`",
            "",
            "## 🔑 Math Symbols in Python",
            "- `+` → Addition",
            "- `-` → Subtraction",
            "- `*` → Multiplication (not ×)",
            "- `/` → Division (not ÷)"
          ]
        },
        {
          title: "Store data in a variable",
          code: `name = "Arjun"\nage = 25\nprint(name)\nprint(age)`,
          output: `Arjun\n25`,
          explanation: [
            "## 🎯 What this program does",
            "Stores data (name and age) in variables, then displays them.",
            "",
            "## 📝 Execution Trace",
            "",
            "**Line 1: `name = \"Arjun\"`**",
            "- Creates a box labeled 'name'",
            "- Puts 'Arjun' inside that box",
            "- Memory: `name → \"Arjun\"`",
            "",
            "**Line 2: `age = 25`**",
            "- Creates a box labeled 'age'",
            "- Puts 25 inside that box",
            "- Memory: `name → \"Arjun\"`, `age → 25`",
            "",
            "**Line 3: `print(name)`**",
            "- Python opens the box labeled 'name'",
            "- Finds 'Arjun' inside",
            "- Displays: `Arjun`",
            "",
            "**Line 4: `print(age)`**",
            "- Python opens the box labeled 'age'",
            "- Finds 25 inside",
            "- Displays: `25`",
            "",
            "## 🧠 Memory State After Execution",
            "```",
            "┌──────────┬───────────┐",
            "│ Variable │ Value     │",
            "├──────────┼───────────┤",
            "│ name     │ \"Arjun\"   │",
            "│ age      │ 25        │",
            "└──────────┴───────────┘",
            "```"
          ]
        },
        {
          title: "Calculate total bill",
          code: `price = 250\nquantity = 4\ntotal = price * quantity\nprint("Total:", total)`,
          output: `Total: 1000`,
          explanation: [
            "## 🎯 What this program does",
            "Calculates a shopping bill (price × quantity).",
            "",
            "## 📝 Execution Trace",
            "",
            "**Line 1: `price = 250`**",
            "- Memory: `price → 250`",
            "",
            "**Line 2: `quantity = 4`**",
            "- Memory: `price → 250`, `quantity → 4`",
            "",
            "**Line 3: `total = price * quantity`**",
            "- Python looks up `price` → finds 250",
            "- Python looks up `quantity` → finds 4",
            "- Calculates: 250 × 4 = 1000",
            "- Stores result: `total → 1000`",
            "- Memory: `price → 250`, `quantity → 4`, `total → 1000`",
            "",
            "**Line 4: `print(\"Total:\", total)`**",
            "- Prints the text 'Total:' followed by the value of `total` (1000)",
            "- Output: `Total: 1000`",
            "",
            "## 🏠 Real-World Connection",
            "This is exactly how a shop billing system works — multiply price by quantity to get the total!"
          ]
        },
        {
          title: "Swap two values",
          code: `a = 5\nb = 10\nprint("Before:", a, b)\na, b = b, a\nprint("After:", a, b)`,
          output: `Before: 5 10\nAfter: 10 5`,
          explanation: [
            "## 🎯 What this program does",
            "Exchanges (swaps) the values of two variables.",
            "",
            "## 📝 Execution Trace",
            "",
            "**Line 1: `a = 5`** → Memory: `a → 5`",
            "**Line 2: `b = 10`** → Memory: `a → 5`, `b → 10`",
            "**Line 3: `print(...)`** → Output: `Before: 5 10`",
            "",
            "**Line 4: `a, b = b, a`** ← THE SWAP!",
            "- Python reads BOTH right-side values first: `b` is 10, `a` is 5",
            "- Then assigns: `a` gets 10, `b` gets 5",
            "- Memory AFTER: `a → 10`, `b → 5`",
            "",
            "**Line 5: `print(...)`** → Output: `After: 10 5`",
            "",
            "## 🏠 Analogy",
            "Imagine two cups — Cup A has tea, Cup B has coffee. You pick up BOTH cups at the same time, then put them in each other's place. That's what Python does!"
          ]
        }
      ],

      mistakes: [
        {
          wrong: `Print("Hello")`,
          right: `print("Hello")`,
          error: `NameError: name 'Print' is not defined`,
          explanation: "Python is **case-sensitive**. `Print` (capital P) is NOT the same as `print` (lowercase p). Always use lowercase `print`."
        },
        {
          wrong: `print("Hello)`,
          right: `print("Hello")`,
          error: `SyntaxError: unterminated string literal`,
          explanation: "Every opening quote `\"` MUST have a closing quote `\"`. If you forget the closing quote, Python gets confused — it doesn't know where the text ends."
        },
        {
          wrong: `print "Hello"`,
          right: `print("Hello")`,
          error: `SyntaxError: Missing parentheses in call to 'print'`,
          explanation: "In Python 3, `print` is a **function** and requires parentheses `()`. The old Python 2 style `print \"Hello\"` doesn't work anymore."
        }
      ],

      interview: [
        { q: "What is Python?", a: "Python is a high-level, interpreted, general-purpose programming language created by Guido van Rossum. It's known for its simple, readable syntax." },
        { q: "Is Python compiled or interpreted?", a: "Python is **interpreted** — it executes code line by line without a separate compilation step. This makes development faster but execution slightly slower than compiled languages like C." },
        { q: "Why is Python popular?", a: "Python is popular because: (1) Easy to learn, (2) Large standard library, (3) Used in AI/ML, web, automation, (4) Huge community support, (5) Free and open source." },
        { q: "Name 5 applications of Python", a: "1. Web development (Django, Flask)\n2. Data Science (Pandas, NumPy)\n3. Machine Learning (TensorFlow, PyTorch)\n4. Automation/Scripting\n5. Game development" }
      ],

      practice: [
        { problem: "Write a program to print your name, age, and city.", difficulty: "Easy", hint: "Use three print() statements" },
        { problem: "Write a program to calculate the area of a rectangle (length=10, width=5).", difficulty: "Easy", hint: "Area = length × width" },
        { problem: "Write a program that prints the sum of 45 and 67.", difficulty: "Easy", hint: "Use print(45 + 67)" },
        { problem: "Store your marks in 3 subjects in variables, calculate total and average, print all.", difficulty: "Medium", hint: "average = total / 3" },
        { problem: "Write a program to convert 100 degrees Celsius to Fahrenheit.", difficulty: "Medium", hint: "F = C × 9/5 + 32" },
        { problem: "Write a program to calculate simple interest (P=5000, R=7, T=3).", difficulty: "Medium", hint: "SI = (P × R × T) / 100" },
        { problem: "Create a mini billing program: 3 items with prices, calculate subtotal, 18% GST, and total.", difficulty: "Hard", hint: "tax = subtotal * 0.18; total = subtotal + tax" },
        { problem: "Swap two variables WITHOUT using a temporary variable.", difficulty: "Company", hint: "Python allows: a, b = b, a" }
      ],

      revision: [
        "**Key Points to Remember:**",
        "1. Python runs code **top to bottom**, one line at a time.",
        "2. `print()` displays output on screen — always use parentheses and quotes for text.",
        "3. Variables store data — create them with `name = value`.",
        "4. Python is **case-sensitive** — `print` works, `Print` does NOT.",
        "5. Math operators: `+` add, `-` subtract, `*` multiply, `/` divide.",
        "6. Every opening quote/bracket MUST have a matching closing one.",
        "",
        "**Best Practices:**",
        "- Use meaningful variable names (`student_name` not `x`)",
        "- Add comments (`#`) to explain complex code",
        "- Test your code frequently — run it after every few lines"
      ]
    }
  ]
});

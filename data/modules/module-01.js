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
    },
    {
      title: "Python Variables (Deep Dive)",
      badge: "Core · 55+ examples",
      notes: [
        "A variable is a name attached to a value. Create it with `name = value`.",
        "Variables can be reassigned, hold any type, and change type at any time (dynamic typing).",
        "> Analogy: A variable is a sticky note with a label — you can move it to any object."
      ],
      examples: [
        { title: "Basic string variable", code: `name = "Arjun"\nprint(name)`, output: `Arjun` },
        { title: "Basic int variable", code: `age = 25\nprint(age)`, output: `25` },
        { title: "Float variable", code: `pi = 3.14\nprint(pi)`, output: `3.14` },
        { title: "Boolean variable", code: `active = True\nprint(active)`, output: `True` },
        { title: "None variable", code: `result = None\nprint(result)`, output: `None` },
        { title: "Reassignment", code: `x = 10; print(x)\nx = 20; print(x)`, output: `10\n20` },
        { title: "Type change on reassign", code: `data = 100\nprint(type(data))\ndata = "hundred"\nprint(type(data))`, output: `<class 'int'>\n<class 'str'>` },
        { title: "Multiple assignment on one line", code: `a, b, c = 1, 2, 3\nprint(a, b, c)`, output: `1 2 3` },
        { title: "Same value to many names", code: `x = y = z = 100\nprint(x, y, z)`, output: `100 100 100` },
        { title: "Swap two variables", code: `a, b = 5, 10\na, b = b, a\nprint(a, b)`, output: `10 5` },
        { title: "Swap three variables", code: `a, b, c = 1, 2, 3\na, b, c = c, a, b\nprint(a, b, c)`, output: `3 1 2` },
        { title: "Arithmetic with variables", code: `price = 250\nqty = 4\ntotal = price * qty\nprint(total)`, output: `1000` },
        { title: "Combine text variables", code: `first = "John"\nlast = "Doe"\nprint(first + " " + last)`, output: `John Doe` },
        { title: "Constant by convention", code: `PI = 3.14159\nradius = 5\nprint(PI * radius ** 2)`, output: `78.53975` },
        { title: "Delete a variable", code: `temp = 99\nprint(temp)\ndel temp\nprint("deleted")`, output: `99\ndeleted` },
        { title: "id() shows memory address", code: `x = 100\nprint(type(id(x)).__name__)`, output: `int` },
        { title: "Small ints are cached", code: `a = 100; b = 100\nprint(a is b)`, output: `True` },
        { title: "Value equal, identity different", code: `a = [1, 2]; b = [1, 2]\nprint(a == b, a is b)`, output: `True False` },
        { title: "Aliasing (same object)", code: `a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)`, output: `[1, 2, 3, 4]` },
        { title: "Copy (independent)", code: `a = [1, 2, 3]\nb = a.copy()\nb.append(4)\nprint(a, b)`, output: `[1, 2, 3] [1, 2, 3, 4]` },
        { title: "Walrus operator :=", code: `if (n := 15) > 10:\n    print("n is", n)`, output: `n is 15` },
        { title: "Type-annotated variable", code: `age: int = 25\nname: str = "Sara"\nprint(age, name)`, output: `25 Sara` },
        { title: "Underscore in large numbers", code: `pop = 1_400_000_000\nprint(pop)`, output: `1400000000` },
        { title: "Global variable via function", code: `count = 0\ndef bump():\n    global count\n    count += 1\nbump(); bump()\nprint(count)`, output: `2` },
        { title: "+= increment", code: `x = 10\nx += 5\nprint(x)`, output: `15` },
        { title: "-= decrement", code: `x = 10\nx -= 3\nprint(x)`, output: `7` },
        { title: "*= multiply-assign", code: `x = 4\nx *= 3\nprint(x)`, output: `12` },
        { title: "/= divide-assign", code: `x = 20\nx /= 4\nprint(x)`, output: `5.0` },
        { title: "//= floor-divide", code: `x = 17\nx //= 5\nprint(x)`, output: `3` },
        { title: "%= remainder-assign", code: `x = 17\nx %= 5\nprint(x)`, output: `2` },
        { title: "**= power-assign", code: `x = 2\nx **= 5\nprint(x)`, output: `32` },
        { title: "Unpack from a list", code: `r, g, b = [255, 128, 0]\nprint(r, g, b)`, output: `255 128 0` },
        { title: "Extended unpack with *", code: `first, *rest = [1, 2, 3, 4, 5]\nprint(first, rest)`, output: `1 [2, 3, 4, 5]` },
        { title: "Middle unpack with *", code: `first, *mid, last = [1, 2, 3, 4, 5]\nprint(first, mid, last)`, output: `1 [2, 3, 4] 5` },
        { title: "Variable in f-string", code: `name = "Ravi"; score = 90\nprint(f"{name} scored {score}")`, output: `Ravi scored 90` },
        { title: "Number to string", code: `age = 25\nprint("Age: " + str(age))`, output: `Age: 25` },
        { title: "Loop counter", code: `count = 0\nfor _ in range(5):\n    count += 1\nprint(count)`, output: `5` },
        { title: "Accumulate sum", code: `total = 0\nfor n in [10, 20, 30]:\n    total += n\nprint(total)`, output: `60` },
        { title: "Build string in loop", code: `s = ""\nfor ch in "abc":\n    s += ch + "-"\nprint(s)`, output: `a-b-c-` },
        { title: "Temperature converter", code: `c = 37\nf = c * 9/5 + 32\nprint(f)`, output: `98.6` },
        { title: "Simple interest", code: `p, r, t = 1000, 5, 2\nsi = p * r * t / 100\nprint(si)`, output: `100.0` },
        { title: "Rectangle area & perimeter", code: `l, w = 8, 5\narea = l * w\nperi = 2*(l+w)\nprint(area, peri)`, output: `40 26` },
        { title: "Average of 3 numbers", code: `a, b, c = 70, 80, 90\nprint((a+b+c)/3)`, output: `80.0` },
        { title: "Boolean from comparison", code: `age = 20\nadult = age >= 18\nprint(adult)`, output: `True` },
        { title: "Reassign to computed value", code: `score = 40\nscore = score * 2 + 5\nprint(score)`, output: `85` },
        { title: "Chained comparison stored", code: `x = 5\nin_range = 1 < x < 10\nprint(in_range)`, output: `True` },
        { title: "Nested calculation (billing)", code: `price = 200; qty = 3; tax = 0.18\nsub = price * qty\ntotal = sub + sub * tax\nprint(total)`, output: `708.0` },
        { title: "Repeated string", code: `line = "=" * 15\nprint(line)`, output: `===============` },
        { title: "Complex number", code: `z = 2 + 3j\nprint(z, z.real, z.imag)`, output: `(2+3j) 2.0 3.0` },
        { title: "List variable", code: `nums = [10, 20, 30]\nprint(nums, len(nums))`, output: `[10, 20, 30] 3` },
        { title: "Tuple variable", code: `point = (3, 4)\nprint(point[0], point[1])`, output: `3 4` },
        { title: "Dict variable", code: `user = {"name": "Sara", "age": 30}\nprint(user["name"])`, output: `Sara` },
        { title: "Set variable", code: `unique = {1, 2, 2, 3}\nprint(unique)`, output: `{1, 2, 3}` },
        { title: "Multiple types in one line", code: `n, s, f, b = 10, "hi", 3.14, True\nprint(n, s, f, b)`, output: `10 hi 3.14 True` },
        { title: "Variable naming — snake_case", code: `first_name = "Meera"\nlast_name = "Iyer"\nprint(first_name, last_name)`, output: `Meera Iyer` },
        { title: "Underscore _ as throwaway", code: `for _ in range(3):\n    print("hi", end=" ")`, output: `hi hi hi ` },
        { title: "Multiple returns unpack", code: `def stats(a, b):\n    return a+b, a*b, a-b\ns, p, d = stats(5, 3)\nprint(s, p, d)`, output: `8 15 2` },
        { title: "Storing function in a variable", code: `f = len\nprint(f("python"))`, output: `6` },
        { title: "Reassign function reference", code: `greet = lambda: "hi"\nprint(greet())`, output: `hi` },
        { title: "Constant with all-caps", code: `MAX_SPEED = 120\nspeed = 90\nprint("safe" if speed <= MAX_SPEED else "over")`, output: `safe` }
      ]
    },
    {
      title: "Python Comments",
      badge: "Syntax",
      notes: [
        "Comments are notes that Python ignores. Start with `#`.",
        "Use them to explain WHY code does something (not just what)."
      ],
      examples: [
        { title: "Single-line comment", code: `# This is a comment\nprint("hi")`, output: `hi` },
        { title: "Inline comment", code: `price = 100  # rupees\nprint(price)`, output: `100` },
        { title: "Docstring as block comment", code: `"""\nProgram: greet user\nAuthor: Code Origin.AI\n"""\nprint("started")`, output: `started` },
        { title: "Commenting out disabled code", code: `print("this runs")\n# print("this is skipped")`, output: `this runs` },
        { title: "Explaining a formula", code: `# Convert C to F: F = C * 9/5 + 32\nc = 100\nf = c * 9/5 + 32\nprint(f)`, output: `212.0` },
        { title: "Section headers with comments", code: `# --- Setup ---\nx = 10\n# --- Compute ---\ny = x * 2\nprint(y)`, output: `20` },
        { title: "TODO markers", code: `def process():\n    # TODO: implement\n    pass\nprocess()\nprint("done")`, output: `done` },
        { title: "Multi-line note", code: `# Step 1: load data\n# Step 2: transform\n# Step 3: save\nprint("plan ready")`, output: `plan ready` }
      ]
    },
    {
      title: "Python Keywords",
      badge: "Syntax",
      notes: [
        "Keywords are reserved words with special meaning. Cannot be used as variable names.",
        "Modern Python has 35 keywords."
      ],
      examples: [
        { title: "List all keywords", code: `import keyword\nprint(keyword.kwlist[:5])`, output: `['False', 'None', 'True', 'and', 'as']` },
        { title: "Count of keywords", code: `import keyword\nprint(len(keyword.kwlist))`, output: `35` },
        { title: "Check if word is keyword", code: `import keyword\nprint(keyword.iskeyword("for"))\nprint(keyword.iskeyword("data"))`, output: `True\nFalse` },
        { title: "Common keywords in action", code: `for i in range(3):\n    if i == 1: continue\n    print(i)`, output: `0\n2` },
        { title: "match-case keyword", code: `x = 2\nmatch x:\n    case 1: print("one")\n    case 2: print("two")\n    case _: print("other")`, output: `two` },
        { title: "async keyword", code: `import asyncio\nasync def hi():\n    return "hello"\nprint(asyncio.run(hi()))`, output: `hello` },
        { title: "with keyword (context manager)", code: `# Illustrative:\nwith open("/dev/null", "w") as f:\n    f.write("data")\nprint("saved")`, output: `saved` }
      ]
    },
    {
      title: "Python Identifiers",
      badge: "Syntax",
      notes: [
        "Identifiers are names for variables, functions, classes.",
        "Rules: letters/digits/underscore; can't start with digit; can't be a keyword; case-sensitive."
      ],
      examples: [
        { title: "Valid identifiers", code: `student_name = "Ravi"\nage2 = 20\n_total = 500\nprint(student_name, age2, _total)`, output: `Ravi 20 500` },
        { title: "Case sensitivity matters", code: `age = 25; Age = 30\nprint(age, Age)`, output: `25 30` },
        { title: "isidentifier() check", code: `print("data".isidentifier())\nprint("2data".isidentifier())\nprint("my var".isidentifier())`, output: `True\nFalse\nFalse` },
        { title: "Constants convention", code: `MAX_SPEED = 120\nMIN_AGE = 18\nprint(MAX_SPEED, MIN_AGE)`, output: `120 18` },
        { title: "Naming a class", code: `class BankAccount:\n    pass\nprint(BankAccount.__name__)`, output: `BankAccount` },
        { title: "Underscore prefix — 'private'", code: `class C:\n    def __init__(self):\n        self._internal = 42\n    def get(self): return self._internal\nprint(C().get())`, output: `42` }
      ]
    }
  ]
});

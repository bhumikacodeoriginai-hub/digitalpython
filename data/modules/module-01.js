/* Module 1 — Introduction to Python (v4 Production — with explanations) */
window.DP.registerModule({
  id: 1,
  title: "Introduction to Python",
  icon: "🐍",
  summary: "What Python is, how to install and run it, and your first programs with detailed step-by-step explanations for beginners. Every example includes a 'How it works' section.",
  concepts: [
    {
      title: "What is Python?",
      badge: "Concept",
      notes: [
        "**Python** is a programming language — it lets you give instructions to a computer. Created by **Guido van Rossum** in 1991.",
        "- **Easy to read** — looks almost like English.",
        "- **Interpreted** — runs your code line by line (no compile step).",
        "- **Free** — download and use for free on any computer.",
        "> Think of Python as a universal language that lets you talk to any computer."
      ],
      examples: [
        {
          title: "Your very first Python program",
          code: `print("Hello, World!")`,
          output: `Hello, World!`,
          explanation: [
            "**What this does:** Displays the text 'Hello, World!' on the screen.",
            "",
            "- `print()` is a built-in **function** — it shows whatever you put inside the parentheses `()` on the screen.",
            "- `\"Hello, World!\"` is a **string** — text data wrapped in quotes.",
            "- When Python sees `print(...)`, it takes whatever is inside and displays it.",
            "",
            "> **Analogy:** Think of `print()` like a speaker — you give it a message, and it announces it to everyone."
          ]
        },
        {
          title: "Print multiple messages",
          code: `print("My name is Arjun")\nprint("I am learning Python")\nprint("This is fun!")`,
          output: `My name is Arjun\nI am learning Python\nThis is fun!`,
          explanation: [
            "**What this does:** Prints three separate lines of text.",
            "",
            "- Python runs your code **top to bottom**, one line at a time.",
            "- Each `print()` statement creates a **new line** of output.",
            "- Line 1 runs first → prints 'My name is Arjun'",
            "- Line 2 runs next → prints 'I am learning Python'",
            "- Line 3 runs last → prints 'This is fun!'",
            "",
            "> **Key idea:** Python executes instructions in order, like reading a book from top to bottom."
          ]
        },
        {
          title: "Print numbers",
          code: `print(42)\nprint(3.14)\nprint(100 + 200)`,
          output: `42\n3.14\n300`,
          explanation: [
            "**What this does:** Prints numbers and the result of a calculation.",
            "",
            "- `print(42)` — prints the whole number 42 (no quotes needed for numbers).",
            "- `print(3.14)` — prints a decimal number.",
            "- `print(100 + 200)` — Python **calculates** 100+200 first, then prints the result 300.",
            "",
            "> **Key idea:** Python can be used like a calculator. It solves math before printing."
          ]
        },
        {
          title: "Combine text and numbers",
          code: `print("I have", 5, "apples")`,
          output: `I have 5 apples`,
          explanation: [
            "**What this does:** Prints text and a number together in one line.",
            "",
            "- When you put **commas** between items in `print()`, Python prints them all separated by spaces.",
            "- `\"I have\"` is text, `5` is a number, `\"apples\"` is text.",
            "- Python automatically adds a space between each item.",
            "",
            "> **Key idea:** Use commas in `print()` to show multiple things on one line."
          ]
        }
      ]
    },


    {
      title: "Python Variables",
      badge: "Core · 55+ examples with explanations",
      notes: [
        "A **variable** is like a **labeled box** where you store information. You create one by writing: `name = value`",
        "- The **name** is the label (you choose it).",
        "- The `=` sign means 'store this value'.",
        "- The **value** is what goes inside the box.",
        "",
        "> **Non-programmer analogy:** Imagine sticky notes. You write 'age' on a sticky note and stick it on the number 25. Now whenever you say 'age', Python knows you mean 25."
      ],
      examples: [
        {
          title: "Store and display a name",
          code: `name = "Arjun"\nprint(name)`,
          output: `Arjun`,
          explanation: [
            "**Step by step:**",
            "1. `name = \"Arjun\"` — Creates a variable called `name` and stores the text 'Arjun' in it.",
            "2. `print(name)` — Looks up what's stored in `name` and displays it.",
            "",
            "- The quotes `\"\"` tell Python this is text (a string).",
            "- After line 1, whenever Python sees `name`, it remembers it means 'Arjun'.",
            "",
            "> **Analogy:** Like saving a contact in your phone. You save 'Arjun' under the name 'name'. Later you just say 'show me name' and it shows 'Arjun'."
          ]
        },
        {
          title: "Store different types of data",
          code: `name = "Arjun"\nage = 25\nsalary = 45000.50\n\nprint(name)\nprint(age)\nprint(salary)`,
          output: `Arjun\n25\n45000.5`,
          explanation: [
            "**Step by step:**",
            "1. `name = \"Arjun\"` — Stores text (string) in variable `name`.",
            "2. `age = 25` — Stores a whole number (integer) in variable `age`.",
            "3. `salary = 45000.50` — Stores a decimal number (float) in variable `salary`.",
            "4-6. `print(...)` — Displays each variable's value.",
            "",
            "**Three data types shown:**",
            "- **String** (text) — always in quotes: `\"Arjun\"`",
            "- **Integer** (whole number) — no quotes: `25`",
            "- **Float** (decimal number) — has a dot: `45000.50`",
            "",
            "> Python automatically knows the type based on what you store — you don't need to tell it!"
          ]
        },
        {
          title: "Change a variable's value",
          code: `score = 10\nprint("Before:", score)\nscore = 20\nprint("After:", score)`,
          output: `Before: 10\nAfter: 20`,
          explanation: [
            "**Step by step:**",
            "1. `score = 10` — Creates `score` with value 10.",
            "2. `print(...)` — Shows 'Before: 10'.",
            "3. `score = 20` — **Replaces** the old value (10) with 20.",
            "4. `print(...)` — Shows 'After: 20'.",
            "",
            "> **Key idea:** Variables can be changed! The old value is forgotten when you assign a new one. It's like erasing a whiteboard and writing something new."
          ]
        },
        {
          title: "Do math with variables",
          code: `price = 250\nquantity = 4\ntotal = price * quantity\nprint("Total bill:", total)`,
          output: `Total bill: 1000`,
          explanation: [
            "**Step by step:**",
            "1. `price = 250` — One item costs 250.",
            "2. `quantity = 4` — Buying 4 items.",
            "3. `total = price * quantity` — Python calculates 250 × 4 = 1000 and stores it in `total`.",
            "4. `print(...)` — Shows the result.",
            "",
            "**The `*` symbol means multiplication.** Python replaces `price` with 250 and `quantity` with 4, then calculates.",
            "",
            "> **Real-world:** This is exactly how a billing system works — store prices in variables, calculate the total."
          ]
        },
        {
          title: "Swap two variables",
          code: `a = 5\nb = 10\nprint("Before:", a, b)\n\na, b = b, a\nprint("After:", a, b)`,
          output: `Before: 5 10\nAfter: 10 5`,
          explanation: [
            "**What this does:** Exchanges the values of two variables.",
            "",
            "1. `a = 5, b = 10` — a holds 5, b holds 10.",
            "2. `a, b = b, a` — This is Python's magic swap! It takes both values at the same time and switches them.",
            "",
            "**Why is this special?** In most languages you need a temporary variable. In Python, you can swap in one line!",
            "",
            "> **Analogy:** Imagine two cups — one has tea, one has coffee. Python lifts both at the same time and puts them in each other's place."
          ]
        },
        {
          title: "Temperature converter",
          code: `celsius = 37\nfahrenheit = celsius * 9 / 5 + 32\nprint(f"{celsius}°C = {fahrenheit}°F")`,
          output: `37°C = 98.6°F`,
          explanation: [
            "**Step by step:**",
            "1. `celsius = 37` — Store the temperature (human body temperature).",
            "2. `fahrenheit = celsius * 9 / 5 + 32` — Apply the formula: F = C × 9/5 + 32.",
            "   - Python calculates: 37 × 9 = 333, then 333 / 5 = 66.6, then 66.6 + 32 = 98.6",
            "3. `print(f\"...\")` — The `f` before quotes is an **f-string** — it lets you put variables inside `{}` curly braces.",
            "",
            "> **Real-world:** This is how weather apps convert temperatures!"
          ]
        },
        {
          title: "Simple interest calculator",
          code: `principal = 10000\nrate = 8\ntime = 2\n\ninterest = (principal * rate * time) / 100\ntotal = principal + interest\n\nprint(f"Interest: {interest}")\nprint(f"Total amount: {total}")`,
          output: `Interest: 1600.0\nTotal amount: 11600.0`,
          explanation: [
            "**Step by step:**",
            "1. `principal = 10000` — Amount deposited (₹10,000).",
            "2. `rate = 8` — Interest rate (8% per year).",
            "3. `time = 2` — Time period (2 years).",
            "4. `interest = (principal * rate * time) / 100` — Formula: SI = P×R×T/100.",
            "   - Calculates: (10000 × 8 × 2) / 100 = 1600",
            "5. `total = principal + interest` — Original + interest = 11600.",
            "",
            "> **Real-world:** Banks use this formula to calculate interest on fixed deposits!"
          ]
        },
        {
          title: "Rectangle area and perimeter",
          code: `length = 10\nwidth = 5\n\narea = length * width\nperimeter = 2 * (length + width)\n\nprint(f"Area: {area}")\nprint(f"Perimeter: {perimeter}")`,
          output: `Area: 50\nPerimeter: 30`,
          explanation: [
            "**Step by step:**",
            "1. Store dimensions: length = 10, width = 5.",
            "2. `area = length * width` — Area formula: 10 × 5 = 50.",
            "3. `perimeter = 2 * (length + width)` — Perimeter formula: 2 × (10 + 5) = 30.",
            "   - The parentheses `()` make Python add first, then multiply.",
            "",
            "> **Real-world:** This is how interior designers calculate room sizes and wall lengths!"
          ]
        },
        {
          title: "Student report card",
          code: `name = "Meera"\nmath = 85\nscience = 92\nenglish = 78\n\ntotal = math + science + english\naverage = total / 3\n\nprint(f"Student: {name}")\nprint(f"Total: {total}/300")\nprint(f"Average: {average:.1f}%")`,
          output: `Student: Meera\nTotal: 255/300\nAverage: 85.0%`,
          explanation: [
            "**Step by step:**",
            "1. Store the student name and three subject marks.",
            "2. `total = math + science + english` — Adds all three: 85 + 92 + 78 = 255.",
            "3. `average = total / 3` — Divides total by number of subjects: 255 / 3 = 85.0.",
            "4. `{average:.1f}` — The `.1f` means show only 1 decimal place.",
            "",
            "> **Real-world:** This is how school management systems calculate student grades!"
          ]
        },
        {
          title: "Shopping cart total with tax",
          code: `item1 = 499\nitem2 = 299\nitem3 = 799\n\nsubtotal = item1 + item2 + item3\ntax = subtotal * 0.18\ntotal = subtotal + tax\n\nprint(f"Subtotal: {subtotal}")\nprint(f"Tax (18%): {tax:.2f}")\nprint(f"Total: {total:.2f}")`,
          output: `Subtotal: 1597\nTax (18%): 287.46\nTotal: 1884.46`,
          explanation: [
            "**Step by step:**",
            "1. Three items: ₹499, ₹299, ₹799.",
            "2. `subtotal = item1 + item2 + item3` — Total before tax: 1597.",
            "3. `tax = subtotal * 0.18` — 18% GST: 1597 × 0.18 = 287.46.",
            "4. `total = subtotal + tax` — Final bill: 1597 + 287.46 = 1884.46.",
            "5. `:.2f` — Shows exactly 2 decimal places (like money).",
            "",
            "> **Real-world:** This is exactly how e-commerce apps (Amazon, Flipkart) calculate your cart total!"
          ]
        }
      ]
    },

    {
      title: "Python Comments",
      badge: "Syntax",
      notes: [
        "**Comments** are notes you write for yourself (or other programmers). Python **ignores** them completely.",
        "- Single-line comment: starts with `#`",
        "- Multi-line: use `#` on each line",
        "> **Why use comments?** To explain WHY your code does something. Future-you (or your teammate) will thank you!"
      ],
      examples: [
        {
          title: "Single-line comment",
          code: `# This calculates the area of a circle\nradius = 7\narea = 3.14 * radius * radius\nprint(area)`,
          output: `153.86`,
          explanation: [
            "**Step by step:**",
            "1. `# This calculates...` — This line is a **comment**. Python skips it entirely.",
            "2. `radius = 7` — Stores the radius.",
            "3. `area = 3.14 * radius * radius` — Calculates π × r² = 3.14 × 7 × 7 = 153.86.",
            "",
            "> The `#` symbol tells Python: 'Ignore everything after me on this line.' Use it to explain your code!"
          ]
        },
        {
          title: "Inline comment",
          code: `price = 100  # price in rupees\ntax = 18     # GST percentage\nfinal = price + (price * tax / 100)\nprint(final)`,
          output: `118.0`,
          explanation: [
            "**Step by step:**",
            "- Comments after code on the same line are called **inline comments**.",
            "- `price = 100  # price in rupees` — The code `price = 100` runs; the comment explains what it means.",
            "- This helps anyone reading your code understand what each value represents.",
            "",
            "> **Best practice:** Use inline comments to explain what a value means, not what the code does (the code should be self-explanatory)."
          ]
        }
      ]
    },

    {
      title: "Running Python & the REPL",
      badge: "Setup",
      notes: [
        "Two ways to run Python:",
        "- **Script mode** — Write code in a file (like `hello.py`) and run it.",
        "- **Interactive mode (REPL)** — Type code and see results instantly.",
        "",
        "> **Best for beginners:** Use the **Workspace** in this app! It's like having Python installed on your phone/laptop without actually installing anything."
      ],
      examples: [
        {
          title: "Run a Python file",
          code: `# Save this as hello.py\n# Then run: python hello.py\n\nprint("Hello from my first file!")\nprint("I am running Python!")`,
          output: `Hello from my first file!\nI am running Python!`,
          explanation: [
            "**How to run a Python file:**",
            "1. Open a text editor (Notepad, VS Code, etc.).",
            "2. Type your Python code.",
            "3. Save it with a `.py` extension (like `hello.py`).",
            "4. Open a terminal/command prompt.",
            "5. Type `python hello.py` and press Enter.",
            "",
            "> **Or just use the Workspace in this app!** Click ▶ Run on any example to execute it instantly."
          ]
        }
      ]
    },

    {
      title: "Keywords & Identifiers",
      badge: "Syntax",
      notes: [
        "**Keywords** = words Python has already reserved (you can't use them as variable names). Example: `if`, `for`, `while`, `True`, `False`.",
        "**Identifiers** = names YOU choose for variables, functions, etc.",
        "",
        "**Rules for naming:**",
        "- Can use letters, numbers, underscores (`_`)",
        "- Cannot start with a number",
        "- Cannot use keywords",
        "- Case-sensitive (`age` and `Age` are different)"
      ],
      examples: [
        {
          title: "Valid variable names",
          code: `student_name = "Ravi"\nage2 = 20\n_total = 500\nMAX_SPEED = 120\n\nprint(student_name, age2, _total, MAX_SPEED)`,
          output: `Ravi 20 500 120`,
          explanation: [
            "**Why these are valid:**",
            "- `student_name` — letters and underscore ✓",
            "- `age2` — letters and numbers (doesn't START with a number) ✓",
            "- `_total` — can start with underscore ✓",
            "- `MAX_SPEED` — ALL CAPS is convention for constants (values that won't change) ✓",
            "",
            "**Invalid examples:** `2name` (starts with number), `for` (keyword), `my-name` (hyphen not allowed)."
          ]
        },
        {
          title: "Case sensitivity matters",
          code: `name = "Arjun"\nName = "Sara"\nNAME = "Code Origin.AI"\n\nprint(name)\nprint(Name)\nprint(NAME)`,
          output: `Arjun\nSara\nCode Origin.AI`,
          explanation: [
            "**Key point:** Python treats `name`, `Name`, and `NAME` as THREE DIFFERENT variables!",
            "",
            "- `name` (all lowercase) — standard for regular variables.",
            "- `Name` (PascalCase) — typically used for class names.",
            "- `NAME` (ALL CAPS) — convention for constants.",
            "",
            "> **Be careful!** If you write `Name` but meant `name`, Python won't give an error — it'll just use the wrong variable!"
          ]
        }
      ]
    }
  ]
});

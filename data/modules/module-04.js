/* Module 4 — Input and Output */
window.DP.registerModule({
  id: 4,
  title: "Input and Output",
  icon: "⌨️",
  summary: "Reading user input with input(), displaying results with print(), inspecting types with type(), and formatting output using f-strings, format() and % placeholders.",
  concepts: [
    {
      title: "input()",
      badge: "I/O",
      notes: [
        "`input()` reads a line of text from the user and always returns a **string**. Convert it with `int()` / `float()` when you need a number."
      ],
      examples: [
        { title: "Read a name", code: `name = input("Enter your name: ")\nprint("Hello", name)`, output: `Enter your name: Arjun\nHello Arjun` },
        { title: "input() returns a string", code: `age = input("Age: ")\nprint(type(age))`, output: `Age: 25\n<class 'str'>` },
        { title: "Convert to int", code: `age = int(input("Age: "))\nprint(age + 1)`, output: `Age: 25\n26` },
        { title: "Read two numbers and add", code: `a = int(input("a: "))\nb = int(input("b: "))\nprint("Sum:", a + b)`, output: `a: 4\nb: 6\nSum: 10` },
        { title: "Read multiple values on one line", code: `x, y = input("x y: ").split()\nprint(x, y)`, output: `x y: 3 5\n3 5` },
        { title: "Read a float", code: `weight = float(input("Weight in kg: "))\nprint(weight + 0.5)`, output: `Weight in kg: 65\n65.5` },
        { title: "Read a list of numbers", code: `nums = list(map(int, input("Nums: ").split()))\nprint("Sum:", sum(nums))`, output: `Nums: 1 2 3 4\nSum: 10` },
        { title: "Read comma-separated values", code: `parts = input("csv: ").split(",")\nprint(parts)`, output: `csv: a,b,c\n['a', 'b', 'c']` },
        { title: "Strip whitespace after input", code: `name = input("Name: ").strip()\nprint(f"[{name}]")`, output: `Name:   Ravi  \n[Ravi]` },
        { title: "Convert case on input", code: `country = input("Country: ").upper()\nprint(country)`, output: `Country: india\nINDIA` },
        { title: "Validate age input", code: `try:\n    age = int(input("Age: "))\n    print("Adult" if age >= 18 else "Minor")\nexcept ValueError:\n    print("Please enter a number")`, output: `Age: 20\nAdult` },
        { title: "Read yes/no", code: `ans = input("Continue? (y/n): ").lower()\nif ans == "y": print("Continuing...")\nelse: print("Stopped")`, output: `Continue? (y/n): y\nContinuing...` },
        { title: "Read password with getpass", code: `from getpass import getpass\npwd = getpass("Password: ")\nprint("Password length:", len(pwd))`, output: `Password: ****\nPassword length: 4` },
        { title: "Input with default value", code: `name = input("Name (default=Guest): ") or "Guest"\nprint("Hi", name)`, output: `Name (default=Guest): \nHi Guest` },
        { title: "Loop until valid input", code: `while True:\n    val = input("Enter positive: ")\n    if val.isdigit() and int(val) > 0:\n        print("OK:", val); break\n    print("Try again")`, output: `Enter positive: -5\nTry again\nEnter positive: 7\nOK: 7` },
        { title: "Read integer with validation", code: `s = input("Number: ")\nif s.lstrip("-").isdigit():\n    print(int(s) * 2)\nelse:\n    print("Not a number")`, output: `Number: -5\n-10` },
        { title: "Menu selection", code: `print("1) Add 2) Sub"); choice = input("> ")\na, b = 10, 3\nprint(a + b if choice == "1" else a - b)`, output: `> 1\n13` }
      ]
    },
    {
      title: "print()",
      badge: "I/O",
      notes: ["`print()` writes to the screen. Useful arguments: `sep` (separator) and `end` (line ending)."],
      examples: [
        { title: "Print multiple items", code: `print("a", "b", "c")`, output: `a b c` },
        { title: "Custom separator", code: `print("2024", "01", "15", sep="-")`, output: `2024-01-15` },
        { title: "Custom end", code: `print("Loading", end="...")\nprint("done")`, output: `Loading...done` },
        { title: "Print without newline in a loop", code: `for i in range(5):\n    print(i, end=" ")`, output: `0 1 2 3 4` },
        { title: "Print a blank line", code: `print("top")\nprint()\nprint("bottom")`, output: `top\n\nbottom` },
        { title: "Print to stderr", code: `import sys\nprint("error!", file=sys.stderr)\nprint("normal output")`, output: `normal output\n# error goes to stderr` },
        { title: "Print with flush (real-time)", code: `import time\nfor i in range(3):\n    print(i, end=" ", flush=True)\n    time.sleep(0.1)`, output: `0 1 2 ` },
        { title: "Print list without brackets", code: `nums = [1, 2, 3, 4]\nprint(*nums)`, output: `1 2 3 4` },
        { title: "Print dict cleanly", code: `d = {"a": 1, "b": 2}\nfor k, v in d.items():\n    print(f"{k}: {v}")`, output: `a: 1\nb: 2` },
        { title: "Print star pattern", code: `for i in range(1, 5):\n    print("*" * i)`, output: `*\n**\n***\n****` },
        { title: "Print a table row", code: `print(f"{'Name':<10}{'Score':>5}")\nprint(f"{'Ravi':<10}{95:>5}")`, output: `Name       Score\nRavi          95` },
        { title: "Print with escape characters", code: `print("Tab:\\there")\nprint("New\\nline")`, output: `Tab:	here\nNew\nline` },
        { title: "Print unicode/emoji", code: `print("Python \\U0001F40D")\nprint("Rating: \\u2605\\u2605\\u2605")`, output: `Python 🐍\nRating: ★★★` },
        { title: "Print JSON-like output", code: `import json\ndata = {"name": "Sara", "age": 30}\nprint(json.dumps(data, indent=2))`, output: `{\n  "name": "Sara",\n  "age": 30\n}` },
        { title: "Print progress bar (simple)", code: `for i in range(11):\n    bar = "#" * i + "-" * (10-i)\n    print(f"\\r[{bar}] {i*10}%", end="")\nprint()`, output: `[##########] 100%` },
        { title: "Print with color (ANSI)", code: `print("\\033[31mRed text\\033[0m normal")`, output: `Red text normal` },
        { title: "Print centered text", code: `print("HELLO".center(20, "-"))`, output: `-------HELLO--------` },
        { title: "Right-align numbers in column", code: `for n in [1, 12, 123, 1234]:\n    print(f"{n:>6}")`, output: `     1\n    12\n   123\n  1234` }
      ]
    },
    {
      title: "type()",
      badge: "I/O",
      notes: ["`type()` returns the class of a value — handy for debugging and learning."],
      examples: [
        { title: "Check common types", code: `print(type(10))\nprint(type(3.14))\nprint(type("hi"))\nprint(type([1]))`, output: `<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'list'>` },
        { title: "type() with a variable", code: `x = {"a": 1}\nprint(type(x))`, output: `<class 'dict'>` },
        { title: "Use in a condition", code: `x = 5\nif type(x) is int:\n    print("integer")`, output: `integer` },
        { title: "isinstance vs type", code: `x = True\nprint(type(x) is int)     # False\nprint(isinstance(x, int)) # True (bool inherits int)`, output: `False\nTrue` },
        { title: "Check multiple types", code: `def show(x):\n    if isinstance(x, (int, float)): print("Number")\n    elif isinstance(x, str): print("Text")\n\nshow(3.14); show("hi")`, output: `Number\nText` },
        { title: "Class name from type", code: `x = [1, 2, 3]\nprint(type(x).__name__)`, output: `list` },
        { title: "Detect None", code: `x = None\nprint(x is None)`, output: `True` },
        { title: "Distinguish int from bool", code: `for v in [True, 1, "1"]:\n    if isinstance(v, bool): print(v, "bool")\n    elif isinstance(v, int): print(v, "int")\n    else: print(v, "other")`, output: `True bool\n1 int\n1 other` },
        { title: "Type-dispatch printing", code: `def show(x):\n    if isinstance(x, list): print("List of", len(x))\n    elif isinstance(x, dict): print("Dict of", len(x), "keys")\n    else: print(x)\n\nshow([1,2]); show({"a":1})`, output: `List of 2\nDict of 1 keys` },
        { title: "Create from type dynamically", code: `for T in (int, float, str):\n    print(T("42"))`, output: `42\n42.0\n42` }
      ]
    },
    {
      title: "Formatting: f-string, format(), %s, %d",
      badge: "Formatting",
      notes: [
        "Three ways to format output:",
        "- **f-strings** (recommended): `f\"{value}\"`",
        "- **str.format()**: `\"{}\".format(value)`",
        "- **% operator**: `%s` for strings, `%d` for integers, `%f` for floats."
      ],
      examples: [
        { title: "f-string basics", code: `name, age = "Sara", 30\nprint(f"{name} is {age}")`, output: `Sara is 30` },
        { title: "f-string with expressions", code: `a, b = 4, 5\nprint(f"{a} + {b} = {a + b}")`, output: `4 + 5 = 9` },
        { title: "f-string number formatting", code: `pi = 3.14159\nprint(f"{pi:.2f}")`, output: `3.14` },
        { title: "f-string padding & alignment", code: `print(f"{'left':<8}|")\nprint(f"{'right':>8}|")`, output: `left    |\n   right|` },
        { title: "format() method", code: `print("{} scored {}".format("Ravi", 90))`, output: `Ravi scored 90` },
        { title: "format() with index", code: `print("{0} {1} {0}".format("a", "b"))`, output: `a b a` },
        { title: "%s and %d", code: `print("%s is %d years old" % ("Meera", 24))`, output: `Meera is 24 years old` },
        { title: "%f with precision", code: `print("Total: %.2f" % 99.5)`, output: `Total: 99.50` },
        { title: "Thousands separator", code: `print(f"{1000000:,}")`, output: `1,000,000` },
        { title: "Underscore separator", code: `print(f"{1000000:_}")`, output: `1_000_000` },
        { title: "Percentage format", code: `p = 0.875\nprint(f"{p:.1%}")`, output: `87.5%` },
        { title: "Scientific notation", code: `print(f"{1234567.89:.2e}")`, output: `1.23e+06` },
        { title: "Hex, octal, binary", code: `n = 255\nprint(f"{n:x} {n:o} {n:b}")`, output: `ff 377 11111111` },
        { title: "Zero-padding numbers", code: `print(f"{5:03d}")\nprint(f"{5:05d}")`, output: `005\n00005` },
        { title: "Signed numbers", code: `for n in [5, -5, 0]:\n    print(f"{n:+d}")`, output: `+5\n-5\n+0` },
        { title: "Left / center / right align", code: `for a in ('<', '^', '>'):\n    print(f"|{'hi':{a}10}|")`, output: `|hi        |\n|    hi    |\n|        hi|` },
        { title: "Truncate long string", code: `s = "Hello World"\nprint(f"{s:.5}")`, output: `Hello` },
        { title: "Nested f-string variables", code: `w = 10\nprint(f"{'PY':^{w}}")`, output: `    PY    `},
        { title: "Format datetime", code: `from datetime import datetime\nnow = datetime(2024, 1, 15, 10, 30)\nprint(f"{now:%d-%b-%Y %H:%M}")`, output: `15-Jan-2024 10:30` },
        { title: "Debug expression (Python 3.8+)", code: `x, y = 5, 12\nprint(f"{x=}, {y=}")`, output: `x=5, y=12` },
        { title: "Comma-separated float", code: `n = 1234567.891\nprint(f"{n:,.2f}")`, output: `1,234,567.89` },
        { title: "Format with variable width", code: `for w in [5, 10, 15]:\n    print(f"{'PY':>{w}}")`, output: `   PY\n        PY\n             PY` },
        { title: "Table with fixed columns", code: `data = [("Ravi", 90), ("Meera", 85), ("Arjun", 78)]\nprint(f"{'Name':<10}{'Score':>5}")\nfor n, s in data:\n    print(f"{n:<10}{s:>5}")`, output: `Name       Score\nRavi          90\nMeera         85\nArjun         78` },
        { title: "Currency format", code: `amt = 12345.6\nprint(f"₹ {amt:>10,.2f}")`, output: `₹  12,345.60` },
        { title: "Format vs join for list", code: `nums = [1, 2, 3]\nprint(f"Items: {', '.join(map(str, nums))}")`, output: `Items: 1, 2, 3` },
        { title: "Bill receipt", code: `items = [("Coffee",150),("Bread",80),("Milk",60)]\nprint(f"{'ITEM':<10}{'PRICE':>8}")\nprint('-'*18)\nfor it, p in items: print(f"{it:<10}{p:>8}")\nprint('-'*18)\nprint(f"{'TOTAL':<10}{sum(p for _,p in items):>8}")`, output: `ITEM         PRICE\n------------------\nCoffee         150\nBread           80\nMilk            60\n------------------\nTOTAL          290` }
      ]
    }
  ]
});

/* Module 1 — Introduction to Python */
window.DP.registerModule({
  id: 1,
  title: "Introduction to Python",
  icon: "🐍",
  summary: "What Python is, its history and features, where it is used, how to install and run it, and your very first programs — comments, keywords, identifiers and variables.",
  concepts: [
    {
      title: "What is Python?",
      badge: "Concept",
      notes: [
        "**Python** is a high-level, general-purpose programming language created by **Guido van Rossum**. It is famous for clean, English-like syntax that makes code easy to read and write.",
        "- **Interpreted** — code runs line by line, no separate compile step.",
        "- **Dynamically typed** — you do not declare variable types.",
        "- **Multi-paradigm** — supports procedural, object-oriented and functional styles.",
        "- **Batteries included** — a huge standard library ships with it.",
        "> The name comes from the comedy group *Monty Python*, not the snake."
      ],
      examples: [
        { title: "Your first line of Python", code: `print("Hello, Python!")`, output: `Hello, Python!` },
        { title: "Python is readable", code: `for name in ["Arjun", "Meera", "Ravi"]:\n    print("Hi", name)`, output: `Hi Arjun\nHi Meera\nHi Ravi` },
        { title: "No type declarations needed", code: `x = 10        # int\ny = 3.14      # float\nz = "text"    # str\nprint(x, y, z)`, output: `10 3.14 text` },
        { title: "Check the Python version", code: `import sys\nprint(sys.version_info.major, sys.version_info.minor)`, output: `3 12` },
        { title: "The Zen of Python", code: `import this  # prints Python's guiding principles`, output: `The Zen of Python, by Tim Peters\nBeautiful is better than ugly...` }
      ]
    },

    {
      title: "History of Python",
      badge: "Concept",
      notes: [
        "Python's timeline in a nutshell:",
        "- **1989** — Guido van Rossum began work during his Christmas holidays.",
        "- **1991** — Python 0.9.0 released publicly.",
        "- **2000** — Python 2.0 added list comprehensions and garbage collection.",
        "- **2008** — Python 3.0 released (not backward compatible with 2.x).",
        "- **2020** — Python 2 officially retired; Python 3 is the standard today.",
        "> Always use Python 3. Python 2 no longer receives updates."
      ],
      examples: [
        { title: "Python 3 print is a function", code: `print("Python 3 uses print() with parentheses")`, output: `Python 3 uses print() with parentheses` },
        { title: "Python 3 division returns float", code: `print(7 / 2)   # true division`, output: `3.5` },
        { title: "Unicode strings by default", code: `text = "नमस्ते"   # Python 3 strings are Unicode\nprint(text)`, output: `नमस्ते` },
        { title: "f-strings (added in Python 3.6)", code: `year = 1991\nprint(f"Python was released in {year}")`, output: `Python was released in 1991` }
      ]
    },

    {
      title: "Features of Python",
      badge: "Concept",
      notes: [
        "Key features that make Python popular:",
        "- **Simple & readable** syntax",
        "- **Free and open source**",
        "- **Portable** — runs on Windows, macOS, Linux",
        "- **Extensible & embeddable** with C/C++",
        "- **Large standard library** and a massive ecosystem (PyPI)",
        "- **Automatic memory management** (garbage collection)"
      ],
      examples: [
        { title: "Simple syntax — swap two values", code: `a, b = 5, 9\na, b = b, a\nprint(a, b)`, output: `9 5` },
        { title: "Dynamic typing in action", code: `value = 10\nprint(type(value))\nvalue = "now a string"\nprint(type(value))`, output: `<class 'int'>\n<class 'str'>` },
        { title: "Rich standard library", code: `import math\nprint(math.factorial(5))\nprint(math.gcd(24, 36))`, output: `120\n12` },
        { title: "Everything is an object", code: `print(isinstance(5, object))\nprint(isinstance("hi", object))`, output: `True\nTrue` },
        { title: "Multiple assignment", code: `x = y = z = 0\nprint(x, y, z)`, output: `0 0 0` }
      ]
    },

    {
      title: "Applications of Python",
      badge: "Concept",
      notes: [
        "Python is used across almost every domain:",
        "- **Web development** — Django, Flask, FastAPI",
        "- **Data science & AI/ML** — NumPy, Pandas, TensorFlow, PyTorch",
        "- **Automation & scripting** — Selenium, BeautifulSoup",
        "- **DevOps & Cloud** — boto3, Docker, Kubernetes tooling",
        "- **Desktop apps, games, IoT, cybersecurity** and much more"
      ],
      examples: [
        { title: "Automation — rename idea", code: `files = ["a.txt", "b.txt", "c.txt"]\nfor i, f in enumerate(files, start=1):\n    print(f"report_{i}.txt <- {f}")`, output: `report_1.txt <- a.txt\nreport_2.txt <- b.txt\nreport_3.txt <- c.txt` },
        { title: "Data — quick average", code: `marks = [78, 92, 85, 66]\nprint("Average:", sum(marks) / len(marks))`, output: `Average: 80.25` },
        { title: "Web — a tiny route table", code: `routes = {"/": "home", "/about": "about page"}\nprint(routes["/about"])`, output: `about page` },
        { title: "Scripting — count words", code: `text = "python is fun and python is easy"\nprint(text.count("python"))`, output: `2` }
      ]
    },

    {
      title: "Installation: Python, VS Code & PyCharm",
      badge: "Setup",
      notes: [
        "**Install Python**",
        "1. Go to python.org → Downloads and get the latest 3.x installer.",
        "2. On Windows, tick **\"Add Python to PATH\"** before clicking Install.",
        "3. Verify from a terminal with `python --version`.",
        "",
        "**Install VS Code** (lightweight editor)",
        "- Download from code.visualstudio.com and install the **Python extension** by Microsoft.",
        "",
        "**Install PyCharm** (full IDE)",
        "- Download the free **Community Edition** from jetbrains.com/pycharm.",
        "> Use `pip` (comes with Python) to install extra libraries."
      ],
      examples: [
        { title: "Verify Python is installed", code: `# Run in your terminal / command prompt:\npython --version`, output: `Python 3.12.4` },
        { title: "Check pip (package manager)", code: `pip --version`, output: `pip 24.0 from ... (python 3.12)` },
        { title: "Where is Python installed?", code: `import sys\nprint(sys.executable)`, output: `/usr/local/bin/python3` },
        { title: "Install a package with pip", code: `pip install requests`, output: `Successfully installed requests-2.32.3` },
        { title: "List installed packages", code: `pip list`, output: `Package    Version\n---------- -------\npip        24.0\nrequests   2.32.3` }
      ]
    },

    {
      title: "Running a Python Program & the REPL",
      badge: "Setup",
      notes: [
        "There are two main ways to run Python:",
        "- **Script mode** — save code in a `.py` file and run `python file.py`.",
        "- **Interactive mode (REPL)** — type `python` in a terminal to open the Read-Eval-Print-Loop and run code line by line.",
        "> The REPL is perfect for quickly testing small snippets. Type `exit()` to leave it."
      ],
      examples: [
        { title: "Run a script file", code: `# save as hello.py, then run:  python hello.py\nprint("Running from a file!")`, output: `Running from a file!` },
        { title: "REPL: instant evaluation", code: `>>> 2 + 3\n5\n>>> "ab" * 3\n'ababab'`, output: `5\n'ababab'` },
        { title: "REPL: last result is _", code: `>>> 10 * 5\n50\n>>> _ + 1\n51`, output: `50\n51` },
        { title: "Run a one-liner from terminal", code: `python -c "print(sum(range(1, 101)))"`, output: `5050` }
      ]
    },

    {
      title: "First Python Program",
      badge: "Hands-on",
      notes: [
        "The traditional first program prints a greeting. `print()` sends text to the screen (standard output).",
        "Notice: no semicolons, no `main()` function required, and indentation matters."
      ],
      examples: [
        { title: "Hello World", code: `print("Hello, World!")`, output: `Hello, World!` },
        { title: "Greeting with a name", code: `name = "Arjun"\nprint("Hello,", name)`, output: `Hello, Arjun` },
        { title: "Multi-line output", code: `print("Line 1")\nprint("Line 2")\nprint("Line 3")`, output: `Line 1\nLine 2\nLine 3` },
        { title: "Print numbers and text together", code: `print("You have", 3, "new messages")`, output: `You have 3 new messages` },
        { title: "A tiny profile", code: `print("Name : Meera")\nprint("Age  : 24")\nprint("City : Pune")`, output: `Name : Meera\nAge  : 24\nCity : Pune` }
      ]
    },

    {
      title: "Python Comments",
      badge: "Syntax",
      notes: [
        "Comments explain code and are ignored by Python.",
        "- **Single-line** comments start with `#`.",
        "- **Multi-line** notes are usually written with several `#` lines or a triple-quoted string used as a docstring.",
        "> Good comments explain *why*, not just *what*."
      ],
      examples: [
        { title: "Single-line comment", code: `# This line is ignored by Python\nprint("Comments are helpful")`, output: `Comments are helpful` },
        { title: "Inline comment", code: `price = 100  # price in rupees\nprint(price)`, output: `100` },
        { title: "Multi-line with # on each line", code: `# This program\n# prints a message\n# to the screen\nprint("Documented!")`, output: `Documented!` },
        { title: "Docstring as a block comment", code: `"""\nThis is a module-level docstring.\nIt describes what the file does.\n"""\nprint("ok")`, output: `ok` },
        { title: "Commenting out code to disable it", code: `print("this runs")\n# print("this is skipped")`, output: `this runs` }
      ]
    },

    {
      title: "Python Keywords",
      badge: "Syntax",
      notes: [
        "**Keywords** are reserved words with special meaning — you cannot use them as variable names.",
        "Examples: `if`, `else`, `for`, `while`, `def`, `class`, `import`, `return`, `True`, `False`, `None`, `and`, `or`, `not`, `in`, `is`, `lambda`, `with`, `try`, `except`.",
        "> There are 35 keywords in modern Python. You can list them at runtime."
      ],
      examples: [
        { title: "List all keywords", code: `import keyword\nprint(keyword.kwlist)`, output: `['False', 'None', 'True', 'and', 'as', ...]` },
        { title: "Count the keywords", code: `import keyword\nprint(len(keyword.kwlist))`, output: `35` },
        { title: "Check if a word is a keyword", code: `import keyword\nprint(keyword.iskeyword("for"))\nprint(keyword.iskeyword("data"))`, output: `True\nFalse` },
        { title: "Keywords are case-sensitive", code: `True = 5  # error: 'True' is a keyword\n# But 'true' (lowercase) would be a valid name`, output: `SyntaxError: cannot assign to True` },
        { title: "Soft keywords: match / case", code: `command = "start"\nmatch command:\n    case "start":\n        print("Starting...")\n    case _:\n        print("Unknown")`, output: `Starting...` }
      ]
    },

    {
      title: "Python Identifiers",
      badge: "Syntax",
      notes: [
        "An **identifier** is the name you give to variables, functions, classes, etc.",
        "**Rules:**",
        "- May contain letters, digits and underscores (`_`).",
        "- Cannot start with a digit.",
        "- Cannot be a keyword.",
        "- Are **case-sensitive** (`age` and `Age` are different).",
        "> Convention: `snake_case` for variables/functions, `PascalCase` for classes, `UPPER_CASE` for constants."
      ],
      examples: [
        { title: "Valid identifiers", code: `student_name = "Ravi"\nage2 = 20\n_total = 500\nprint(student_name, age2, _total)`, output: `Ravi 20 500` },
        { title: "Case sensitivity", code: `age = 25\nAge = 30\nprint(age, Age)`, output: `25 30` },
        { title: "Invalid: starts with a digit", code: `2name = "x"  # SyntaxError`, output: `SyntaxError: invalid syntax` },
        { title: "Check a name is valid with isidentifier()", code: `print("data".isidentifier())\nprint("2data".isidentifier())`, output: `True\nFalse` },
        { title: "Naming conventions", code: `MAX_SPEED = 120      # constant\nfirst_name = "Sara"  # variable\nclass BankAccount:   # class\n    pass\nprint(MAX_SPEED, first_name)`, output: `120 Sara` }
      ]
    },

    {
      title: "Python Variables",
      badge: "Core",
      notes: [
        "A **variable** is a name that refers to a value stored in memory. In Python you create one just by assigning with `=` — no type declaration needed.",
        "Variables can be **reassigned** to a value of any type, and multiple variables can be assigned at once.",
        "> Think of a variable as a label attached to a value, not a fixed box."
      ],
      examples: [
        { title: "Basic assignment (from the syllabus)", code: `name = "Arjun"\nage = 25\nsalary = 45000.50\n\nprint(name)\nprint(age)\nprint(salary)`, output: `Arjun\n25\n45000.5` },
        { title: "Reassigning a variable", code: `x = 10\nprint(x)\nx = 20\nprint(x)`, output: `10\n20` },
        { title: "A variable can change type", code: `data = 100\nprint(type(data))\ndata = "hundred"\nprint(type(data))`, output: `<class 'int'>\n<class 'str'>` },
        { title: "Multiple assignment on one line", code: `a, b, c = 1, 2, 3\nprint(a, b, c)`, output: `1 2 3` },
        { title: "Assign the same value to many", code: `x = y = z = 100\nprint(x, y, z)`, output: `100 100 100` },
        { title: "Swap two variables", code: `a, b = 5, 10\na, b = b, a\nprint(a, b)`, output: `10 5` },
        { title: "Using variables in arithmetic", code: `price = 250\nquantity = 4\ntotal = price * quantity\nprint("Total:", total)`, output: `Total: 1000` },
        { title: "Combine text variables", code: `first = "John"\nlast = "Doe"\nfull = first + " " + last\nprint(full)`, output: `John Doe` },
        { title: "Constants (by convention)", code: `PI = 3.14159\nradius = 5\narea = PI * radius ** 2\nprint("Area:", area)`, output: `Area: 78.53975` },
        { title: "Deleting a variable", code: `temp = 99\nprint(temp)\ndel temp\n# print(temp) would now raise NameError`, output: `99` },
        { title: "Check identity vs equality", code: `a = 256\nb = 256\nprint(a == b)   # same value\nprint(a is b)   # small ints are cached`, output: `True\nTrue` },
        { title: "Underscore in large numbers", code: `population = 1_400_000_000\nprint(population)`, output: `1400000000` }
      ]
    }
  ]
});

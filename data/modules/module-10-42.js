/* Modules 10–42 — Advanced Python through Industry Projects */

/* Module 10 — Modules and Packages */
window.DP.registerModule({
  id: 10,
  title: "Modules and Packages",
  icon: "📦",
  summary: "Reusing code with import, from-import and aliases, and touring the most useful built-in modules: math, random, datetime, os, sys, collections, itertools and more.",
  concepts: [
    {
      title: "import, from-import, alias",
      badge: "Imports",
      notes: ["A **module** is a `.py` file of reusable code; a **package** is a folder of modules. Import them to use their functions."],
      examples: [
        { title: "import a whole module", code: `import math\nprint(math.sqrt(16))`, output: `4.0` },
        { title: "from ... import", code: `from math import pi, sqrt\nprint(pi, sqrt(25))`, output: `3.141592653589793 5.0` },
        { title: "import with alias", code: `import statistics as st\nprint(st.mean([1, 2, 3, 4]))`, output: `2.5` },
        { title: "import everything (avoid in production)", code: `from math import *\nprint(floor(4.7), ceil(4.2))`, output: `4 5` }
      ]
    },
    {
      title: "Built-in Modules Tour",
      badge: "Standard Library",
      notes: ["A quick tour of `math`, `random`, `datetime`, `calendar`, `time`, `os`, `sys`, `statistics`, `platform`, `collections`, `itertools`, `functools`."],
      examples: [
        { title: "math", code: `import math\nprint(math.factorial(5), math.gcd(12, 18))`, output: `120 6` },
        { title: "random", code: `import random\nrandom.seed(1)\nprint(random.randint(1, 6))`, output: `2` },
        { title: "datetime", code: `from datetime import date\nprint(date(2024, 1, 15).strftime("%d %b %Y"))`, output: `15 Jan 2024` },
        { title: "os & sys", code: `import os, sys\nprint(os.name)\nprint(sys.platform)`, output: `posix\nlinux` },
        { title: "statistics", code: `import statistics as s\nprint(s.mean([2, 4, 6]), s.median([1, 5, 2]))`, output: `4 2` },
        { title: "itertools", code: `import itertools\nprint(list(itertools.combinations("ABC", 2)))`, output: `[('A', 'B'), ('A', 'C'), ('B', 'C')]` },
        { title: "functools.reduce", code: `from functools import reduce\nprint(reduce(lambda a, b: a * b, [1, 2, 3, 4]))`, output: `24` }
      ]
    }
  ]
});

/* Module 11 — Exception Handling */
window.DP.registerModule({
  id: 11,
  title: "Exception Handling",
  icon: "🛡️",
  summary: "Handling runtime errors gracefully with try, except, else and finally, raising exceptions, and building custom exception classes.",
  concepts: [
    {
      title: "try / except / else / finally",
      badge: "Errors · 16 examples",
      introduction: [
        "**What is it?** Exception handling is how Python deals with ERRORS without crashing your program.",
        "**Why do we need it?** Without it, ONE error stops your whole program. With it, you catch the error and keep running.",
        "**Where is it used?** Everywhere in real apps — reading files that might not exist, network requests that might fail, user input that might be wrong, database connections, etc."
      ],
      analogy: [
        "**Think of it like a safety net under a trapeze artist:**",
        "- The artist performs risky tricks (your `try` code)",
        "- If they fall (an error happens), the net catches them (`except`)",
        "- The show continues instead of a disaster!",
        "",
        "**Another analogy — a car airbag:**",
        "- You drive normally (try block)",
        "- If there's a crash (error), the airbag deploys (except block)",
        "- You survive and can continue"
      ],
      diagram: [
        "┌──────────────────────────────────────────┐",
        "│      HOW try / except WORKS               │",
        "├──────────────────────────────────────────┤",
        "│                                          │",
        "│   try:                                   │",
        "│       risky_code()  ──┐                  │",
        "│                       │                  │",
        "│              Error?   │                  │",
        "│          ┌────No───────┴──Yes───┐        │",
        "│          ▼                      ▼        │",
        "│     continue              except block   │",
        "│     normally              (handle error) │",
        "│          │                      │        │",
        "│          └──────┬───────────────┘        │",
        "│                 ▼                        │",
        "│            finally (always runs)          │",
        "└──────────────────────────────────────────┘"
      ],
      syntax: [
        "**Basic structure:**",
        "```",
        "try:",
        "    # code that might fail",
        "except ErrorType:",
        "    # what to do if it fails",
        "else:",
        "    # runs if NO error happened",
        "finally:",
        "    # ALWAYS runs (cleanup)",
        "```",
        "- `try` — required, contains risky code",
        "- `except` — catches errors",
        "- `else` — optional, runs on success",
        "- `finally` — optional, always runs"
      ],
      notes: ["Wrap risky code in `try`. `except` catches errors, `else` runs on success, `finally` always runs (cleanup)."],
      examples: [
        { title: "Catch a divide-by-zero error", code: `try:\n    x = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")`, output: `Cannot divide by zero` },
        { title: "Catch invalid conversion", code: `try:\n    int("abc")\nexcept ValueError as e:\n    print("Bad value:", e)`, output: `Bad value: invalid literal for int() with base 10: 'abc'` },
        { title: "else and finally", code: `try:\n    n = int("5")\nexcept ValueError:\n    print("failed")\nelse:\n    print("parsed", n)\nfinally:\n    print("done")`, output: `parsed 5\ndone` },
        { title: "Catch multiple exception types", code: `try:\n    data = [1]\n    print(data[5])\nexcept (IndexError, KeyError):\n    print("Lookup failed")`, output: `Lookup failed` },
        { title: "Catch any exception", code: `try:\n    result = 1 / 0\nexcept Exception as e:\n    print(f"Error occurred: {type(e).__name__}")`, output: `Error occurred: ZeroDivisionError` },
        { title: "Safe user input conversion", code: `def safe_int(text):\n    try:\n        return int(text)\n    except ValueError:\n        return 0\n\nprint(safe_int("42"))\nprint(safe_int("hello"))`, output: `42\n0` },
        { title: "Handle KeyError in dict", code: `data = {"name": "Ravi"}\ntry:\n    print(data["age"])\nexcept KeyError:\n    print("Key not found")`, output: `Key not found` },
        { title: "Handle file not found", code: `try:\n    with open("missing.txt") as f:\n        print(f.read())\nexcept FileNotFoundError:\n    print("File does not exist")`, output: `File does not exist` },
        { title: "Retry logic with exceptions", code: `attempts = ["abc", "12x", "50"]\nfor a in attempts:\n    try:\n        print("Success:", int(a))\n        break\n    except ValueError:\n        print(f"'{a}' failed, retrying...")`, output: `'abc' failed, retrying...\n'12x' failed, retrying...\nSuccess: 50` },
        { title: "TypeError handling", code: `try:\n    result = "5" + 5\nexcept TypeError as e:\n    print("Type mismatch!")`, output: `Type mismatch!` },
        { title: "Access exception details", code: `try:\n    x = [1, 2, 3][10]\nexcept IndexError as e:\n    print(f"Error type: {type(e).__name__}")\n    print(f"Message: {e}")`, output: `Error type: IndexError\nMessage: list index out of range` },
        { title: "Nested try-except", code: `try:\n    try:\n        x = 1 / 0\n    except ZeroDivisionError:\n        print("Inner caught it")\n        raise ValueError("New error")\nexcept ValueError as e:\n    print("Outer caught:", e)`, output: `Inner caught it\nOuter caught: New error` },
        { title: "finally for cleanup", code: `def process():\n    try:\n        print("Processing...")\n        return "done"\n    finally:\n        print("Cleanup always runs")\n\nprint(process())`, output: `Processing...\nCleanup always runs\ndone` },
        { title: "Division calculator (safe)", code: `def divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "Cannot divide by zero"\n\nprint(divide(10, 2))\nprint(divide(10, 0))`, output: `5.0\nCannot divide by zero` },
        { title: "Validate age input", code: `def validate_age(text):\n    try:\n        age = int(text)\n        if age < 0:\n            return "Age cannot be negative"\n        return f"Age: {age}"\n    except ValueError:\n        return "Please enter a number"\n\nprint(validate_age("25"))\nprint(validate_age("-5"))\nprint(validate_age("abc"))`, output: `Age: 25\nAge cannot be negative\nPlease enter a number` },
        { title: "Bank withdrawal with checks", code: `def withdraw(balance, amount):\n    try:\n        if amount > balance:\n            raise ValueError("Insufficient funds")\n        return balance - amount\n    except ValueError as e:\n        return f"Error: {e}"\n\nprint(withdraw(1000, 300))\nprint(withdraw(1000, 2000))`, output: `700\nError: Insufficient funds` }
      ],
      mistakes: [
        { wrong: `try:\n    x = 1/0\nexcept:\n    pass`, right: `try:\n    x = 1/0\nexcept ZeroDivisionError as e:\n    print(e)`, error: `Bad practice: silently swallows ALL errors`, explanation: "Never use bare `except:` with `pass` — it hides bugs! Always catch SPECIFIC exceptions and at least log them." },
        { wrong: `try:\n    risky()\nexcept Exception:\n    handle()\nexcept ValueError:\n    handle_value()`, right: `try:\n    risky()\nexcept ValueError:\n    handle_value()\nexcept Exception:\n    handle()`, error: `ValueError block is unreachable`, explanation: "Put SPECIFIC exceptions FIRST, general ones LAST. `Exception` catches everything, so anything after it never runs." }
      ],
      interview: [
        { q: "What is the difference between except Exception and bare except?", a: "`except Exception` catches all standard exceptions but lets system-exit signals (like KeyboardInterrupt) through. Bare `except:` catches literally EVERYTHING including Ctrl+C — this is dangerous and not recommended." },
        { q: "When does the finally block run?", a: "`finally` ALWAYS runs — whether an exception occurred or not, even if there's a `return` statement. It's used for cleanup like closing files or database connections." },
        { q: "What is the difference between else and finally?", a: "`else` runs ONLY if no exception occurred in the try block. `finally` runs ALWAYS, regardless of exceptions." }
      ],
      practice: [
        { problem: "Write a function that safely converts a string to a float, returning 0.0 on failure.", difficulty: "Easy", hint: "try: float(x) except ValueError: return 0.0" },
        { problem: "Create a calculator that handles division by zero gracefully.", difficulty: "Easy", hint: "Catch ZeroDivisionError" },
        { problem: "Write a program that keeps asking for a number until the user enters a valid one.", difficulty: "Medium", hint: "Use a while loop with try-except" },
        { problem: "Build a function that reads a file and handles the case when it doesn't exist.", difficulty: "Medium", hint: "Catch FileNotFoundError" },
        { problem: "Create a custom exception for an e-commerce 'OutOfStock' error and use it.", difficulty: "Hard", hint: "class OutOfStock(Exception): pass" }
      ],
      revision: [
        "**Key Points:**",
        "1. `try` holds risky code that might fail",
        "2. `except` catches and handles errors",
        "3. `else` runs only when NO error occurs",
        "4. `finally` ALWAYS runs (used for cleanup)",
        "5. Catch SPECIFIC exceptions, not bare `except:`",
        "6. Put specific exceptions before general ones",
        "7. Common exceptions: ValueError, TypeError, KeyError, IndexError, ZeroDivisionError, FileNotFoundError"
      ]
    },
    {
      title: "raise & Custom Exceptions",
      badge: "Errors",
      notes: ["`raise` throws an exception. Create your own by subclassing `Exception`."],
      examples: [
        { title: "raise an exception", code: `def withdraw(amount):\n    if amount < 0:\n        raise ValueError("Amount must be positive")\n    return amount\n\ntry:\n    withdraw(-5)\nexcept ValueError as e:\n    print(e)`, output: `Amount must be positive` },
        { title: "Custom exception class", code: `class InsufficientFundsError(Exception):\n    pass\n\ntry:\n    raise InsufficientFundsError("Balance too low")\nexcept InsufficientFundsError as e:\n    print(e)`, output: `Balance too low` }
      ]
    }
  ]
});

/* Module 12 — File Handling */
window.DP.registerModule({
  id: 12,
  title: "File Handling",
  icon: "📄",
  summary: "Reading and writing text, CSV and JSON files, appending data, working with binary files, and using the with statement for safe file access.",
  concepts: [
    {
      title: "Read, Write, Append with 'with'",
      badge: "Files",
      notes: ["The `with` statement opens a file and automatically closes it. Modes: `r` read, `w` write, `a` append, `b` binary."],
      examples: [
        { title: "Write a text file", code: `with open("notes.txt", "w") as f:\n    f.write("Hello\\nWorld")`, output: `# creates notes.txt with two lines` },
        { title: "Read a file", code: `with open("notes.txt") as f:\n    content = f.read()\nprint(content)`, output: `Hello\nWorld` },
        { title: "Read line by line", code: `with open("notes.txt") as f:\n    for line in f:\n        print(line.strip())`, output: `Hello\nWorld` },
        { title: "Append to a file", code: `with open("notes.txt", "a") as f:\n    f.write("\\nNew line")`, output: `# adds a line at the end` }
      ]
    },
    {
      title: "CSV & JSON",
      badge: "Files",
      notes: ["Use the `csv` and `json` modules for structured data."],
      examples: [
        { title: "Write JSON", code: `import json\ndata = {"name": "Ravi", "age": 25}\nwith open("data.json", "w") as f:\n    json.dump(data, f)`, output: `# writes {"name": "Ravi", "age": 25}` },
        { title: "Read JSON", code: `import json\nwith open("data.json") as f:\n    data = json.load(f)\nprint(data["name"])`, output: `Ravi` },
        { title: "Write CSV", code: `import csv\nrows = [["name", "score"], ["Sara", 90]]\nwith open("scores.csv", "w", newline="") as f:\n    csv.writer(f).writerows(rows)`, output: `# writes a CSV file` },
        { title: "JSON string <-> dict", code: `import json\ns = json.dumps({"a": 1})\nprint(s)\nprint(json.loads(s))`, output: `{"a": 1}\n{'a': 1}` }
      ]
    },
    {
      title: "File Handling — Practical",
      badge: "Files · 45+ examples",
      notes: ["Real-world file operations you'll use daily in production code."],
      examples: [
        { title: "Read entire file", code: `with open("notes.txt") as f:\n    text = f.read()\nprint(text)`, output: `# whole file content` },
        { title: "Read one line", code: `with open("notes.txt") as f:\n    print(f.readline().strip())`, output: `# first line` },
        { title: "Read all lines to list", code: `with open("notes.txt") as f:\n    lines = f.readlines()\nprint(len(lines))`, output: `# line count` },
        { title: "Iterate file (memory-safe)", code: `with open("big.log") as f:\n    for line in f:\n        print(line.rstrip())`, output: `# each line trimmed` },
        { title: "Write with overwrite ('w')", code: `with open("out.txt", "w") as f:\n    f.write("First line\\n")`, output: `# file overwritten` },
        { title: "Append with 'a'", code: `with open("log.txt", "a") as f:\n    f.write("New entry\\n")`, output: `# appended` },
        { title: "Write multiple lines", code: `lines = ["one\\n", "two\\n", "three\\n"]\nwith open("out.txt", "w") as f:\n    f.writelines(lines)`, output: `# 3 lines written` },
        { title: "Write with print()", code: `with open("out.txt", "w") as f:\n    print("Hello", "World", sep=", ", file=f)`, output: `# 'Hello, World' saved` },
        { title: "Count lines in a file", code: `with open("data.txt") as f:\n    print(sum(1 for _ in f))`, output: `# line count` },
        { title: "Count words", code: `with open("essay.txt") as f:\n    words = sum(len(l.split()) for l in f)\nprint(words)`, output: `# word total` },
        { title: "Search text in file", code: `keyword = "ERROR"\nwith open("app.log") as f:\n    for i, line in enumerate(f, 1):\n        if keyword in line:\n            print(i, line.strip())`, output: `# matching lines` },
        { title: "Replace text in file", code: `with open("f.txt") as f:\n    content = f.read()\ncontent = content.replace("old", "new")\nwith open("f.txt", "w") as f:\n    f.write(content)`, output: `# replaced` },
        { title: "Check if file exists", code: `import os\nprint(os.path.exists("data.txt"))`, output: `True or False` },
        { title: "Modern path check", code: `from pathlib import Path\nprint(Path("data.txt").exists())`, output: `True or False` },
        { title: "File size in bytes", code: `import os\nprint(os.path.getsize("data.txt"))`, output: `# size in bytes` },
        { title: "Delete a file", code: `import os\nif os.path.exists("temp.txt"):\n    os.remove("temp.txt")\nprint("deleted")`, output: `deleted` },
        { title: "Rename a file", code: `import os\nos.rename("old.txt", "new.txt")\nprint("renamed")`, output: `renamed` },
        { title: "List files in a directory", code: `import os\nfor f in os.listdir("."):\n    print(f)`, output: `# each filename` },
        { title: "Filter by extension", code: `import os\npy = [f for f in os.listdir(".") if f.endswith(".py")]\nprint(py)`, output: `['app.py', 'test.py']` },
        { title: "Walk directory tree", code: `import os\nfor root, dirs, files in os.walk("project"):\n    for f in files:\n        print(os.path.join(root, f))`, output: `# every file under project/` },
        { title: "Read CSV with csv module", code: `import csv\nwith open("data.csv") as f:\n    for row in csv.reader(f):\n        print(row)`, output: `# each row as list` },
        { title: "Read CSV as dicts", code: `import csv\nwith open("users.csv") as f:\n    for row in csv.DictReader(f):\n        print(row["name"], row["email"])`, output: `# name and email each row` },
        { title: "Write CSV", code: `import csv\nwith open("out.csv", "w", newline="") as f:\n    w = csv.writer(f)\n    w.writerow(["Name","Age"])\n    w.writerow(["Ravi", 25])`, output: `# CSV file created` },
        { title: "Write CSV as dicts", code: `import csv\nwith open("out.csv","w",newline="") as f:\n    w = csv.DictWriter(f, fieldnames=["name","age"])\n    w.writeheader()\n    w.writerow({"name":"Sara","age":30})`, output: `# CSV with header` },
        { title: "Read JSON file", code: `import json\nwith open("data.json") as f:\n    data = json.load(f)\nprint(data)`, output: `# dict from JSON` },
        { title: "Write JSON file", code: `import json\ndata = {"name": "Ravi", "score": 90}\nwith open("out.json","w") as f:\n    json.dump(data, f, indent=2)`, output: `# pretty JSON saved` },
        { title: "JSON with sort_keys", code: `import json\nprint(json.dumps({"b":2,"a":1}, sort_keys=True, indent=2))`, output: `{\n  "a": 1,\n  "b": 2\n}` },
        { title: "Handle non-JSON types", code: `import json, datetime\ndata = {"now": datetime.datetime.now()}\nprint(json.dumps(data, default=str))`, output: `{"now": "2024-01-15 10:30:00"}` },
        { title: "Binary file — read image bytes", code: `with open("logo.png", "rb") as f:\n    data = f.read()\nprint(len(data), "bytes")`, output: `# byte count` },
        { title: "Binary file — write", code: `data = b"\\x89PNG\\r\\n"\nwith open("out.bin", "wb") as f:\n    f.write(data)`, output: `# binary written` },
        { title: "Copy file", code: `import shutil\nshutil.copy("src.txt", "dst.txt")\nprint("copied")`, output: `copied` },
        { title: "Move/rename file", code: `import shutil\nshutil.move("old.txt", "archive/old.txt")\nprint("moved")`, output: `moved` },
        { title: "Create directory", code: `import os\nos.makedirs("logs/2024", exist_ok=True)\nprint("dir created")`, output: `dir created` },
        { title: "Delete directory", code: `import shutil\nshutil.rmtree("temp")\nprint("removed")`, output: `removed` },
        { title: "Read text with encoding", code: `with open("data.txt", encoding="utf-8") as f:\n    print(f.read())`, output: `# UTF-8 text` },
        { title: "Read file line count safely", code: `from pathlib import Path\nprint(len(Path("data.txt").read_text().splitlines()))`, output: `# line count` },
        { title: "Read + strip each line", code: `with open("names.txt") as f:\n    names = [line.strip() for line in f if line.strip()]\nprint(names)`, output: `# clean list of names` },
        { title: "Write JSON list of dicts", code: `import json\nusers = [{"name":"A"}, {"name":"B"}]\nwith open("users.json","w") as f:\n    json.dump(users, f, indent=2)`, output: `# saved list of dicts` },
        { title: "Read CSV, calculate total", code: `import csv\nwith open("sales.csv") as f:\n    total = sum(int(row["amount"]) for row in csv.DictReader(f))\nprint(total)`, output: `# sales total` },
        { title: "Log to file with timestamp", code: `import datetime\nwith open("app.log", "a") as f:\n    f.write(f"{datetime.datetime.now()} INFO: started\\n")`, output: `# log appended` },
        { title: "Read file in chunks", code: `with open("big.bin", "rb") as f:\n    while chunk := f.read(4096):\n        print(len(chunk), "bytes")\n        break`, output: `4096 bytes` },
        { title: "Get file modification time", code: `import os, datetime\nts = os.path.getmtime("data.txt")\nprint(datetime.datetime.fromtimestamp(ts))`, output: `2024-01-15 10:30:00` },
        { title: "Split lines and process", code: `with open("data.txt") as f:\n    numbers = [int(x) for x in f.read().split()]\nprint(sum(numbers))`, output: `# total` },
        { title: "Write dict to CSV pivoted", code: `import csv\ndata = {"a": 1, "b": 2, "c": 3}\nwith open("out.csv","w",newline="") as f:\n    w = csv.writer(f)\n    w.writerow(data.keys())\n    w.writerow(data.values())`, output: `# CSV with 2 rows` },
        { title: "Read specific line by number", code: `with open("data.txt") as f:\n    for i, line in enumerate(f, 1):\n        if i == 3:\n            print(line.strip())\n            break`, output: `# 3rd line` },
        { title: "Merge multiple files", code: `import shutil\nwith open("merged.txt","w") as out:\n    for name in ["a.txt","b.txt","c.txt"]:\n        with open(name) as f:\n            shutil.copyfileobj(f, out)`, output: `# 3 files combined` }
      ]
    }
  ]
});

/* Module 13 — Object-Oriented Programming */
window.DP.registerModule({
  id: 13,
  title: "Object-Oriented Programming",
  icon: "🏛️",
  summary: "Classes and objects, constructors and destructors, the four pillars (inheritance, encapsulation, abstraction, polymorphism), method overriding and magic methods.",
  concepts: [
    {
      title: "Class, Object & Constructor",
      badge: "OOP",
      notes: ["A **class** is a blueprint; an **object** is an instance. `__init__` is the constructor that sets up attributes; `__del__` is the destructor."],
      examples: [
        { title: "Define a class and object", code: `class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        print(self.name, "says woof")\n\nd = Dog("Rex")\nd.bark()`, output: `Rex says woof` },
        { title: "Attributes & methods", code: `class Circle:\n    def __init__(self, r):\n        self.r = r\n    def area(self):\n        return 3.14 * self.r ** 2\n\nprint(Circle(5).area())`, output: `78.5` },
        { title: "Class vs instance attribute", code: `class Counter:\n    total = 0            # class attribute\n    def __init__(self):\n        Counter.total += 1\n\nCounter(); Counter()\nprint(Counter.total)`, output: `2` }
      ]
    },
    {
      title: "Inheritance & Polymorphism",
      badge: "OOP",
      notes: ["**Inheritance** reuses a parent class. **Polymorphism** lets different classes share a method name. **Method overriding** replaces a parent's method."],
      examples: [
        { title: "Single inheritance", code: `class Animal:\n    def speak(self):\n        print("some sound")\n\nclass Cat(Animal):\n    def speak(self):\n        print("meow")\n\nCat().speak()`, output: `meow` },
        { title: "super() call", code: `class Base:\n    def __init__(self):\n        self.kind = "base"\n\nclass Child(Base):\n    def __init__(self):\n        super().__init__()\n        self.name = "child"\n\nc = Child()\nprint(c.kind, c.name)`, output: `base child` },
        { title: "Polymorphism", code: `class Dog:\n    def sound(self): return "woof"\nclass Cow:\n    def sound(self): return "moo"\n\nfor a in [Dog(), Cow()]:\n    print(a.sound())`, output: `woof\nmoo` }
      ]
    },
    {
      title: "Encapsulation, Abstraction & Magic Methods",
      badge: "OOP",
      notes: ["**Encapsulation** hides data (prefix `_`/`__`). **Abstraction** exposes only essentials. **Magic methods** (`__str__`, `__len__`, `__add__`) customise behaviour."],
      examples: [
        { title: "Private attribute (encapsulation)", code: `class Account:\n    def __init__(self):\n        self.__balance = 0\n    def deposit(self, x):\n        self.__balance += x\n    def get(self):\n        return self.__balance\n\na = Account()\na.deposit(100)\nprint(a.get())`, output: `100` },
        { title: "__str__ magic method", code: `class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __str__(self):\n        return f"Point({self.x}, {self.y})"\n\nprint(Point(2, 3))`, output: `Point(2, 3)` },
        { title: "__add__ operator overloading", code: `class Vec:\n    def __init__(self, x):\n        self.x = x\n    def __add__(self, other):\n        return Vec(self.x + other.x)\n\nprint((Vec(2) + Vec(5)).x)`, output: `7` }
      ]
    },
    {
      title: "OOP — Practical & Advanced",
      badge: "OOP · 50+ examples",
      notes: ["Practical OOP patterns you'll actually use in real code."],
      examples: [
        { title: "Simple class", code: `class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return f"{self.name} says woof!"\n\nprint(Dog("Rex").bark())`, output: `Rex says woof!` },
        { title: "Multiple attributes", code: `class Person:\n    def __init__(self, name, age, city):\n        self.name, self.age, self.city = name, age, city\n\np = Person("Sara", 30, "Pune")\nprint(p.name, p.city)`, output: `Sara Pune` },
        { title: "Method with logic", code: `class Circle:\n    def __init__(self, r): self.r = r\n    def area(self): return 3.14 * self.r ** 2\n    def perimeter(self): return 2 * 3.14 * self.r\n\nc = Circle(5)\nprint(c.area(), c.perimeter())`, output: `78.5 31.400000000000002` },
        { title: "Class variable vs instance", code: `class Counter:\n    total = 0  # shared\n    def __init__(self):\n        Counter.total += 1\n\nCounter(); Counter(); Counter()\nprint(Counter.total)`, output: `3` },
        { title: "Default parameters in __init__", code: `class Book:\n    def __init__(self, title, price=100):\n        self.title, self.price = title, price\n\nprint(Book("Python").price)\nprint(Book("Django", 500).price)`, output: `100\n500` },
        { title: "__str__ for readable output", code: `class Point:\n    def __init__(self, x, y): self.x, self.y = x, y\n    def __str__(self): return f"({self.x}, {self.y})"\n\nprint(Point(3, 4))`, output: `(3, 4)` },
        { title: "__repr__ for developers", code: `class Point:\n    def __init__(self, x, y): self.x, self.y = x, y\n    def __repr__(self): return f"Point(x={self.x}, y={self.y})"\n\nprint([Point(1,2), Point(3,4)])`, output: `[Point(x=1, y=2), Point(x=3, y=4)]` },
        { title: "__eq__ for value equality", code: `class Card:\n    def __init__(self, suit, rank): self.suit, self.rank = suit, rank\n    def __eq__(self, o): return self.suit == o.suit and self.rank == o.rank\n\nprint(Card("H", "A") == Card("H", "A"))`, output: `True` },
        { title: "__len__ makes len() work", code: `class Deck:\n    def __init__(self, cards): self.cards = cards\n    def __len__(self): return len(self.cards)\n\nprint(len(Deck([1,2,3,4,5])))`, output: `5` },
        { title: "__getitem__ for indexing", code: `class Team:\n    def __init__(self, players): self.players = players\n    def __getitem__(self, i): return self.players[i]\n\nt = Team(["A", "B", "C"])\nprint(t[1])`, output: `B` },
        { title: "Single inheritance", code: `class Animal:\n    def speak(self): return "sound"\n\nclass Cat(Animal):\n    def speak(self): return "meow"\n\nprint(Cat().speak())`, output: `meow` },
        { title: "Call parent with super()", code: `class Person:\n    def __init__(self, name): self.name = name\n\nclass Employee(Person):\n    def __init__(self, name, salary):\n        super().__init__(name)\n        self.salary = salary\n\ne = Employee("Ravi", 50000)\nprint(e.name, e.salary)`, output: `Ravi 50000` },
        { title: "Multi-level inheritance", code: `class A:\n    def hello(self): return "A"\nclass B(A):\n    def hello(self): return "B->" + super().hello()\nclass C(B):\n    def hello(self): return "C->" + super().hello()\n\nprint(C().hello())`, output: `C->B->A` },
        { title: "Multiple inheritance", code: `class Flyer:\n    def fly(self): return "flying"\nclass Swimmer:\n    def swim(self): return "swimming"\nclass Duck(Flyer, Swimmer):\n    pass\n\nd = Duck()\nprint(d.fly(), d.swim())`, output: `flying swimming` },
        { title: "MRO — method resolution", code: `class A: pass\nclass B(A): pass\nclass C(A): pass\nclass D(B, C): pass\n\nprint([c.__name__ for c in D.__mro__])`, output: `['D', 'B', 'C', 'A', 'object']` },
        { title: "isinstance / issubclass", code: `class Animal: pass\nclass Dog(Animal): pass\nd = Dog()\nprint(isinstance(d, Dog), isinstance(d, Animal))\nprint(issubclass(Dog, Animal))`, output: `True True\nTrue` },
        { title: "Polymorphism", code: `class Dog:\n    def sound(self): return "woof"\nclass Cat:\n    def sound(self): return "meow"\nfor a in [Dog(), Cat()]:\n    print(a.sound())`, output: `woof\nmeow` },
        { title: "Duck typing", code: `class Duck:\n    def quack(self): return "quack"\nclass Person:\n    def quack(self): return "I'm quacking"\n\ndef make_it_quack(thing):\n    return thing.quack()\n\nprint(make_it_quack(Duck()))\nprint(make_it_quack(Person()))`, output: `quack\nI'm quacking` },
        { title: "Encapsulation — 'private' with _", code: `class Account:\n    def __init__(self):\n        self._balance = 0\n    def deposit(self, x):\n        self._balance += x\n    def balance(self):\n        return self._balance\n\na = Account()\na.deposit(500)\nprint(a.balance())`, output: `500` },
        { title: "Name mangling with __", code: `class C:\n    def __init__(self):\n        self.__secret = 42\n    def get(self):\n        return self.__secret\n\nc = C()\nprint(c.get())\nprint(c._C__secret)`, output: `42\n42` },
        { title: "@property (getter)", code: `class Circle:\n    def __init__(self, r): self._r = r\n    @property\n    def area(self): return 3.14 * self._r ** 2\n\nprint(Circle(5).area)`, output: `78.5` },
        { title: "@property with setter validation", code: `class Age:\n    def __init__(self, v): self.v = v\n    @property\n    def v(self): return self._v\n    @v.setter\n    def v(self, val):\n        if val < 0: raise ValueError\n        self._v = val\n\nprint(Age(25).v)`, output: `25` },
        { title: "@classmethod — alternate constructor", code: `class Date:\n    def __init__(self, d, m, y):\n        self.d, self.m, self.y = d, m, y\n    @classmethod\n    def from_string(cls, s):\n        d, m, y = map(int, s.split("-"))\n        return cls(d, m, y)\n\nx = Date.from_string("15-01-2024")\nprint(x.d, x.m, x.y)`, output: `15 1 2024` },
        { title: "@staticmethod utility", code: `class Math:\n    @staticmethod\n    def add(a, b): return a + b\n\nprint(Math.add(3, 4))`, output: `7` },
        { title: "Abstract base class", code: `from abc import ABC, abstractmethod\nclass Shape(ABC):\n    @abstractmethod\n    def area(self): pass\n\nclass Square(Shape):\n    def __init__(self, s): self.s = s\n    def area(self): return self.s * self.s\n\nprint(Square(5).area())`, output: `25` },
        { title: "Method chaining", code: `class Query:\n    def __init__(self): self.parts = []\n    def where(self, x): self.parts.append(f"WHERE {x}"); return self\n    def order(self, x): self.parts.append(f"ORDER BY {x}"); return self\n\nq = Query().where("age > 18").order("name")\nprint(q.parts)`, output: `['WHERE age > 18', 'ORDER BY name']` },
        { title: "Composition over inheritance", code: `class Engine:\n    def start(self): return "vroom"\n\nclass Car:\n    def __init__(self):\n        self.engine = Engine()\n    def start(self): return self.engine.start()\n\nprint(Car().start())`, output: `vroom` },
        { title: "Data class (auto-init/repr)", code: `from dataclasses import dataclass\n@dataclass\nclass User:\n    name: str\n    age: int = 0\n\nu = User("Sara", 30)\nprint(u)`, output: `User(name='Sara', age=30)` },
        { title: "Frozen dataclass (immutable)", code: `from dataclasses import dataclass\n@dataclass(frozen=True)\nclass Point:\n    x: int; y: int\n\np = Point(3, 4)\nprint(p)  # p.x = 5 would raise FrozenInstanceError`, output: `Point(x=3, y=4)` },
        { title: "Named tuple", code: `from collections import namedtuple\nPoint = namedtuple("Point", ["x", "y"])\np = Point(3, 4)\nprint(p.x, p.y, p[0])`, output: `3 4 3` },
        { title: "Enum for constants", code: `from enum import Enum\nclass Color(Enum):\n    RED = 1\n    GREEN = 2\n    BLUE = 3\n\nprint(Color.RED, Color.RED.value)`, output: `Color.RED 1` },
        { title: "Callable object with __call__", code: `class Multiplier:\n    def __init__(self, n): self.n = n\n    def __call__(self, x): return x * self.n\n\ntriple = Multiplier(3)\nprint(triple(10))`, output: `30` },
        { title: "Iterator via __iter__/__next__", code: `class Counter:\n    def __init__(self, limit):\n        self.i, self.limit = 0, limit\n    def __iter__(self): return self\n    def __next__(self):\n        if self.i >= self.limit: raise StopIteration\n        self.i += 1\n        return self.i\n\nprint(list(Counter(4)))`, output: `[1, 2, 3, 4]` },
        { title: "Context manager", code: `class Timer:\n    def __enter__(self):\n        print("start"); return self\n    def __exit__(self, *a):\n        print("end")\n\nwith Timer():\n    print("work")`, output: `start\nwork\nend` },
        { title: "Bank account (encapsulation)", code: `class Bank:\n    def __init__(self, balance=0):\n        self._balance = balance\n    def deposit(self, amt):\n        self._balance += amt\n    def withdraw(self, amt):\n        if amt > self._balance: return "Insufficient"\n        self._balance -= amt\n        return "OK"\n    @property\n    def balance(self): return self._balance\n\na = Bank(1000)\na.deposit(500); print(a.balance)\nprint(a.withdraw(2000))`, output: `1500\nInsufficient` },
        { title: "Student record", code: `class Student:\n    def __init__(self, name, marks):\n        self.name, self.marks = name, marks\n    def grade(self):\n        m = sum(self.marks)/len(self.marks)\n        if m >= 90: return "A"\n        if m >= 75: return "B"\n        return "C"\n\ns = Student("Ravi", [85, 92, 78])\nprint(s.grade())`, output: `B` },
        { title: "Employee inheritance chain", code: `class Employee:\n    def __init__(self, name, salary):\n        self.name, self.salary = name, salary\n\nclass Manager(Employee):\n    def __init__(self, name, salary, team):\n        super().__init__(name, salary)\n        self.team = team\n\nm = Manager("Sara", 80000, 5)\nprint(m.name, m.team)`, output: `Sara 5` },
        { title: "Rectangle (with method overriding)", code: `class Shape:\n    def area(self): return 0\nclass Rectangle(Shape):\n    def __init__(self, w, h): self.w, self.h = w, h\n    def area(self): return self.w * self.h\n\nprint(Rectangle(3, 4).area())`, output: `12` },
        { title: "Comparable objects", code: `from functools import total_ordering\n@total_ordering\nclass Weight:\n    def __init__(self, v): self.v = v\n    def __eq__(self, o): return self.v == o.v\n    def __lt__(self, o): return self.v < o.v\n\nprint(Weight(5) < Weight(10), Weight(5) <= Weight(5))`, output: `True True` },
        { title: "Iterator range replacement", code: `class MyRange:\n    def __init__(self, n): self.n = n\n    def __iter__(self):\n        i = 0\n        while i < self.n:\n            yield i\n            i += 1\n\nprint(list(MyRange(5)))`, output: `[0, 1, 2, 3, 4]` },
        { title: "Singleton pattern", code: `class Config:\n    _inst = None\n    def __new__(cls):\n        if cls._inst is None:\n            cls._inst = super().__new__(cls)\n        return cls._inst\n\nprint(Config() is Config())`, output: `True` },
        { title: "Factory pattern", code: `class Cat:\n    def sound(self): return "meow"\nclass Dog:\n    def sound(self): return "woof"\n\ndef make(kind):\n    return {"cat": Cat, "dog": Dog}[kind]()\n\nprint(make("cat").sound())`, output: `meow` },
        { title: "Observer pattern", code: `class Event:\n    def __init__(self): self.subs = []\n    def on(self, fn): self.subs.append(fn)\n    def fire(self, msg):\n        for s in self.subs: s(msg)\n\ne = Event()\ne.on(lambda m: print("A:", m))\ne.on(lambda m: print("B:", m))\ne.fire("start")`, output: `A: start\nB: start` },
        { title: "Chained comparison via __lt__", code: `class Length:\n    def __init__(self, cm): self.cm = cm\n    def __lt__(self, o): return self.cm < o.cm\n\nls = [Length(50), Length(20), Length(90)]\nls.sort()\nprint([x.cm for x in ls])`, output: `[20, 50, 90]` },
        { title: "Class as data (via __dict__)", code: `class Config:\n    debug = True\n    level = "INFO"\n\nprint({k:v for k,v in Config.__dict__.items() if not k.startswith("__")})`, output: `{'debug': True, 'level': 'INFO'}` },
        { title: "Deep copy an object", code: `import copy\nclass Bag:\n    def __init__(self, items): self.items = items\n\na = Bag([1, 2, 3])\nb = copy.deepcopy(a)\nb.items.append(4)\nprint(a.items, b.items)`, output: `[1, 2, 3] [1, 2, 3, 4]` },
        { title: "hash and equality for sets", code: `class Product:\n    def __init__(self, sku): self.sku = sku\n    def __hash__(self): return hash(self.sku)\n    def __eq__(self, o): return self.sku == o.sku\n\nprint(len({Product("A"), Product("A"), Product("B")}))`, output: `2` },
        { title: "Class with slot memory optimization", code: `class Point:\n    __slots__ = ("x", "y")\n    def __init__(self, x, y): self.x, self.y = x, y\n\np = Point(3, 4)\nprint(p.x)`, output: `3` },
        { title: "Custom exception class", code: `class InsufficientFundsError(Exception):\n    pass\n\ntry:\n    raise InsufficientFundsError("Balance too low")\nexcept InsufficientFundsError as e:\n    print(e)`, output: `Balance too low` },
        { title: "Cart with methods", code: `class Cart:\n    def __init__(self): self.items = {}\n    def add(self, item, price): self.items[item] = price\n    def total(self): return sum(self.items.values())\n\nc = Cart()\nc.add("Coffee", 150); c.add("Cake", 300)\nprint(c.total())`, output: `450` },
        { title: "Convert to dict for JSON", code: `import json\nclass User:\n    def __init__(self, name, age): self.name, self.age = name, age\n    def to_dict(self): return {"name": self.name, "age": self.age}\n\nprint(json.dumps(User("Sara", 30).to_dict()))`, output: `{"name": "Sara", "age": 30}` }
      ]
    }
  ]
});

/* Module 14 — Regular Expressions */
window.DP.registerModule({
  id: 14,
  title: "Regular Expressions",
  icon: "🔍",
  summary: "Pattern matching with the re module — searching, matching and validating emails, phone numbers and passwords.",
  concepts: [
    {
      title: "re Module & Pattern Matching",
      badge: "Regex",
      notes: ["The `re` module matches text patterns. Common functions: `search`, `match`, `findall`, `sub`."],
      examples: [
        { title: "search for a pattern", code: `import re\nm = re.search(r"\\d+", "order 42 ready")\nprint(m.group())`, output: `42` },
        { title: "findall", code: `import re\nprint(re.findall(r"\\d+", "a1 b22 c333"))`, output: `['1', '22', '333']` },
        { title: "sub (replace)", code: `import re\nprint(re.sub(r"\\s+", "_", "a  b   c"))`, output: `a_b_c` }
      ]
    },
    {
      title: "Email, Phone & Password Validation",
      badge: "Regex",
      notes: ["Validation is the classic real-world use of regex."],
      examples: [
        { title: "Email validation", code: `import re\npattern = r"^[\\w.]+@[\\w]+\\.[a-z]{2,}$"\nprint(bool(re.match(pattern, "user@mail.com")))`, output: `True` },
        { title: "Phone validation (10 digits)", code: `import re\nprint(bool(re.match(r"^[6-9]\\d{9}$", "9876543210")))`, output: `True` },
        { title: "Password strength", code: `import re\npwd = "Pass@123"\nok = bool(re.match(r"^(?=.*[A-Z])(?=.*\\d)(?=.*[@#$]).{8,}$", pwd))\nprint(ok)`, output: `True` }
      ]
    }
  ]
});

/* Module 15 — Collections Module */
window.DP.registerModule({
  id: 15,
  title: "Collections Module",
  icon: "🗃️",
  summary: "Specialised container datatypes: Counter, defaultdict, deque, namedtuple and OrderedDict.",
  concepts: [
    {
      title: "Counter, defaultdict, deque, namedtuple",
      badge: "Collections",
      notes: ["The `collections` module adds high-performance container types beyond the built-ins."],
      examples: [
        { title: "Counter", code: `from collections import Counter\nprint(Counter("banana"))`, output: `Counter({'a': 3, 'n': 2, 'b': 1})` },
        { title: "Counter most_common", code: `from collections import Counter\nc = Counter([1, 1, 2, 3, 3, 3])\nprint(c.most_common(1))`, output: `[(3, 3)]` },
        { title: "defaultdict", code: `from collections import defaultdict\nd = defaultdict(int)\nfor c in "aabbc":\n    d[c] += 1\nprint(dict(d))`, output: `{'a': 2, 'b': 2, 'c': 1}` },
        { title: "deque (fast ends)", code: `from collections import deque\nq = deque([1, 2, 3])\nq.appendleft(0)\nq.append(4)\nprint(q)`, output: `deque([0, 1, 2, 3, 4])` },
        { title: "namedtuple", code: `from collections import namedtuple\nPoint = namedtuple("Point", "x y")\np = Point(2, 3)\nprint(p.x, p.y)`, output: `2 3` }
      ]
    }
  ]
});

/* Module 16 — Iterators and Generators */
window.DP.registerModule({
  id: 16,
  title: "Iterators and Generators",
  icon: "♻️",
  summary: "The iterator protocol (__iter__/__next__), generator functions with yield, and memory-efficient generator expressions.",
  concepts: [
    {
      title: "Iterators & Generators (yield)",
      badge: "Advanced",
      notes: ["An **iterator** produces items one at a time via `__next__`. A **generator** is an easy iterator built with `yield` — it pauses and resumes, saving memory."],
      examples: [
        { title: "Manual iterator", code: `it = iter([10, 20, 30])\nprint(next(it))\nprint(next(it))`, output: `10\n20` },
        { title: "Generator with yield", code: `def count_up(n):\n    for i in range(1, n + 1):\n        yield i\n\nprint(list(count_up(4)))`, output: `[1, 2, 3, 4]` },
        { title: "Infinite generator", code: `def naturals():\n    n = 1\n    while True:\n        yield n\n        n += 1\n\ng = naturals()\nprint(next(g), next(g), next(g))`, output: `1 2 3` },
        { title: "Generator expression", code: `squares = (x * x for x in range(5))\nprint(list(squares))`, output: `[0, 1, 4, 9, 16]` }
      ]
    }
  ]
});

/* Module 17 — Decorators */
window.DP.registerModule({
  id: 17,
  title: "Decorators",
  icon: "🎀",
  summary: "Function and class decorators, and practical examples: authentication, logging and timing.",
  concepts: [
    {
      title: "Function Decorators",
      badge: "Advanced",
      notes: ["A **decorator** wraps a function to add behaviour without changing its code. Apply with `@decorator`."],
      examples: [
        { title: "Basic decorator", code: `def shout(func):\n    def wrapper():\n        return func().upper()\n    return wrapper\n\n@shout\ndef greet():\n    return "hello"\n\nprint(greet())`, output: `HELLO` },
        { title: "Logging decorator", code: `def log(func):\n    def wrapper(*args):\n        print("calling", func.__name__)\n        return func(*args)\n    return wrapper\n\n@log\ndef add(a, b):\n    return a + b\n\nprint(add(2, 3))`, output: `calling add\n5` },
        { title: "Timing decorator", code: `import time\ndef timer(func):\n    def wrapper(*a):\n        start = time.time()\n        r = func(*a)\n        print(f"took {time.time()-start:.4f}s")\n        return r\n    return wrapper\n\n@timer\ndef work():\n    return sum(range(100000))\n\nwork()`, output: `took 0.0031s` }
      ]
    }
  ]
});

/* Module 18 — Context Managers */
window.DP.registerModule({
  id: 18,
  title: "Context Managers",
  icon: "🔐",
  summary: "The with statement and building custom context managers with __enter__/__exit__ or contextlib.",
  concepts: [
    {
      title: "with & Custom Context Managers",
      badge: "Advanced",
      notes: ["A context manager sets up and tears down resources automatically via `__enter__` and `__exit__`."],
      examples: [
        { title: "Custom context manager (class)", code: `class Timer:\n    def __enter__(self):\n        print("start")\n        return self\n    def __exit__(self, *a):\n        print("end")\n\nwith Timer():\n    print("working")`, output: `start\nworking\nend` },
        { title: "contextlib decorator", code: `from contextlib import contextmanager\n\n@contextmanager\ndef tag(name):\n    print(f"<{name}>")\n    yield\n    print(f"</{name}>")\n\nwith tag("b"):\n    print("bold")`, output: `<b>\nbold\n</b>` }
      ]
    }
  ]
});

/* Module 19 — Virtual Environment */
window.DP.registerModule({
  id: 19,
  title: "Virtual Environment",
  icon: "🧪",
  summary: "Isolating project dependencies with venv, installing packages with pip, and pinning them in requirements.txt.",
  concepts: [
    {
      title: "venv, pip & requirements.txt",
      badge: "Tooling",
      notes: ["A **virtual environment** isolates a project's packages so they don't clash with other projects."],
      examples: [
        { title: "Create & activate a venv", code: `python -m venv venv\n# macOS/Linux:\nsource venv/bin/activate\n# Windows:\nvenv\\Scripts\\activate`, output: `(venv) $` },
        { title: "Install packages", code: `pip install requests flask`, output: `Successfully installed flask-3.0.3 requests-2.32.3` },
        { title: "Freeze dependencies", code: `pip freeze > requirements.txt`, output: `# writes exact versions to requirements.txt` },
        { title: "Reinstall from file", code: `pip install -r requirements.txt`, output: `# installs all pinned packages` }
      ]
    }
  ]
});

/* Module 20 — Advanced Python */
window.DP.registerModule({
  id: 20,
  title: "Advanced Python",
  icon: "🚀",
  summary: "Comprehensions (list/dict/set/generator) and functional tools: zip, map, filter, reduce, enumerate, any, all, sorted.",
  concepts: [
    {
      title: "Comprehensions",
      badge: "Advanced",
      notes: ["Comprehensions build collections concisely in a single expression."],
      examples: [
        { title: "List comprehension", code: `squares = [x * x for x in range(5)]\nprint(squares)`, output: `[0, 1, 4, 9, 16]` },
        { title: "With a condition", code: `evens = [x for x in range(10) if x % 2 == 0]\nprint(evens)`, output: `[0, 2, 4, 6, 8]` },
        { title: "Dict comprehension", code: `sq = {x: x * x for x in range(4)}\nprint(sq)`, output: `{0: 0, 1: 1, 2: 4, 3: 9}` },
        { title: "Set comprehension", code: `print({x % 3 for x in range(10)})`, output: `{0, 1, 2}` }
      ]
    },
    {
      title: "map, filter, reduce, zip, enumerate, any, all, sorted",
      badge: "Functional",
      notes: ["Functional helpers process collections without explicit loops."],
      examples: [
        { title: "map", code: `print(list(map(str.upper, ["a", "b"])))`, output: `['A', 'B']` },
        { title: "filter", code: `print(list(filter(lambda x: x > 2, [1, 2, 3, 4])))`, output: `[3, 4]` },
        { title: "reduce", code: `from functools import reduce\nprint(reduce(lambda a, b: a + b, [1, 2, 3, 4]))`, output: `10` },
        { title: "zip", code: `names = ["a", "b"]\nages = [1, 2]\nprint(list(zip(names, ages)))`, output: `[('a', 1), ('b', 2)]` },
        { title: "enumerate", code: `for i, v in enumerate(["x", "y"], 1):\n    print(i, v)`, output: `1 x\n2 y` },
        { title: "any & all", code: `print(any([0, 0, 1]))\nprint(all([1, 1, 0]))`, output: `True\nFalse` },
        { title: "sorted with key", code: `print(sorted(["bb", "a", "ccc"], key=len))`, output: `['a', 'bb', 'ccc']` }
      ]
    }
  ]
});

/* Module 21 — Multithreading */
window.DP.registerModule({
  id: 21,
  title: "Multithreading",
  icon: "🧵",
  summary: "Running concurrent threads, protecting shared data with locks, daemon threads and synchronization.",
  concepts: [
    {
      title: "Thread, Lock, Synchronization",
      badge: "Concurrency",
      notes: ["The `threading` module runs tasks concurrently. A **Lock** prevents two threads corrupting shared data."],
      examples: [
        { title: "Start threads", code: `import threading\n\ndef task(n):\n    print(f"task {n}")\n\nthreads = [threading.Thread(target=task, args=(i,)) for i in range(3)]\nfor t in threads: t.start()\nfor t in threads: t.join()`, output: `task 0\ntask 1\ntask 2` },
        { title: "Lock for shared counter", code: `import threading\ncounter = 0\nlock = threading.Lock()\n\ndef inc():\n    global counter\n    for _ in range(1000):\n        with lock:\n            counter += 1\n\nts = [threading.Thread(target=inc) for _ in range(2)]\nfor t in ts: t.start()\nfor t in ts: t.join()\nprint(counter)`, output: `2000` }
      ]
    }
  ]
});

/* Module 22 — Multiprocessing */
window.DP.registerModule({
  id: 22,
  title: "Multiprocessing",
  icon: "🧠",
  summary: "True parallelism across CPU cores with Process, Pool, Queue and Pipe.",
  concepts: [
    {
      title: "Process, Pool, Queue",
      badge: "Concurrency",
      notes: ["`multiprocessing` runs code in separate processes to use multiple CPU cores (bypassing the GIL)."],
      examples: [
        { title: "Pool.map", code: `from multiprocessing import Pool\n\ndef square(x):\n    return x * x\n\nif __name__ == "__main__":\n    with Pool(4) as p:\n        print(p.map(square, [1, 2, 3, 4]))`, output: `[1, 4, 9, 16]` },
        { title: "A single Process", code: `from multiprocessing import Process\n\ndef work():\n    print("in child process")\n\nif __name__ == "__main__":\n    p = Process(target=work)\n    p.start()\n    p.join()`, output: `in child process` }
      ]
    }
  ]
});

/* Module 23 — Async Programming */
window.DP.registerModule({
  id: 23,
  title: "Async Programming",
  icon: "⏳",
  summary: "Cooperative concurrency with async/await, asyncio, tasks and coroutines.",
  concepts: [
    {
      title: "async, await, asyncio",
      badge: "Concurrency",
      notes: ["`async def` defines a coroutine; `await` yields control while waiting; `asyncio` runs the event loop."],
      examples: [
        { title: "Basic coroutine", code: `import asyncio\n\nasync def main():\n    print("hello")\n    await asyncio.sleep(1)\n    print("world")\n\nasyncio.run(main())`, output: `hello\nworld` },
        { title: "Run tasks concurrently", code: `import asyncio\n\nasync def work(n):\n    await asyncio.sleep(1)\n    return n * 2\n\nasync def main():\n    results = await asyncio.gather(work(1), work(2), work(3))\n    print(results)\n\nasyncio.run(main())`, output: `[2, 4, 6]` }
      ]
    }
  ]
});

/* Module 24 — Logging */
window.DP.registerModule({
  id: 24,
  title: "Logging",
  icon: "📝",
  summary: "Professional logging: levels, log files, formatters and handlers — instead of print().",
  concepts: [
    {
      title: "Logging Levels, Files, Formatters",
      badge: "Best Practice",
      notes: ["The `logging` module records events at levels DEBUG < INFO < WARNING < ERROR < CRITICAL."],
      examples: [
        { title: "Basic logging", code: `import logging\nlogging.basicConfig(level=logging.INFO)\nlogging.info("Service started")\nlogging.warning("Low disk space")`, output: `INFO:root:Service started\nWARNING:root:Low disk space` },
        { title: "Log to a file with format", code: `import logging\nlogging.basicConfig(\n    filename="app.log",\n    level=logging.DEBUG,\n    format="%(asctime)s %(levelname)s %(message)s")\nlogging.error("Something failed")`, output: `# writes: 2024-... ERROR Something failed` }
      ]
    }
  ]
});

/* Module 25 — Debugging */
window.DP.registerModule({
  id: 25,
  title: "Debugging",
  icon: "🐞",
  summary: "Finding and fixing bugs with pdb, breakpoints and the VS Code debugger.",
  concepts: [
    {
      title: "pdb & breakpoints",
      badge: "Tooling",
      notes: ["`breakpoint()` (Python 3.7+) drops into the `pdb` debugger. Commands: `n` next, `s` step, `c` continue, `p var` print, `q` quit."],
      examples: [
        { title: "Set a breakpoint", code: `def divide(a, b):\n    breakpoint()   # execution pauses here\n    return a / b\n\ndivide(10, 2)`, output: `(Pdb) p a\n10` },
        { title: "Invoke pdb manually", code: `import pdb\n\ndef buggy():\n    x = 5\n    pdb.set_trace()\n    return x * 2\n\nbuggy()`, output: `(Pdb) c` }
      ]
    }
  ]
});

/* Module 26 — Database Programming */
window.DP.registerModule({
  id: 26,
  title: "Database Programming",
  icon: "🗄️",
  summary: "Talking to databases: SQLite, MySQL and PostgreSQL, CRUD operations, parameterized queries, transactions and connection pooling.",
  concepts: [
    {
      title: "SQLite CRUD & Parameterized Queries",
      badge: "Databases",
      notes: ["`sqlite3` ships with Python. Always use **parameterized queries** (`?` placeholders) to prevent SQL injection."],
      examples: [
        { title: "Create table & insert", code: `import sqlite3\nconn = sqlite3.connect(":memory:")\ncur = conn.cursor()\ncur.execute("CREATE TABLE users(id INTEGER, name TEXT)")\ncur.execute("INSERT INTO users VALUES (?, ?)", (1, "Ravi"))\nconn.commit()`, output: `# row inserted` },
        { title: "Query rows", code: `cur.execute("SELECT * FROM users")\nprint(cur.fetchall())`, output: `[(1, 'Ravi')]` },
        { title: "Parameterized query (safe)", code: `name = "Ravi"\ncur.execute("SELECT * FROM users WHERE name = ?", (name,))\nprint(cur.fetchone())`, output: `(1, 'Ravi')` }
      ]
    }
  ]
});

/* Module 27 — Networking */
window.DP.registerModule({
  id: 27,
  title: "Networking",
  icon: "🌐",
  summary: "Socket programming with TCP and UDP, and building a simple client-server chat.",
  concepts: [
    {
      title: "Socket Programming (TCP)",
      badge: "Networking",
      notes: ["The `socket` module enables network communication. A server binds and listens; a client connects."],
      examples: [
        { title: "TCP server (skeleton)", code: `import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\ns.bind(("localhost", 9999))\ns.listen(1)\nprint("listening on 9999...")\nconn, addr = s.accept()\ndata = conn.recv(1024)\nconn.sendall(b"echo: " + data)\nconn.close()`, output: `listening on 9999...` },
        { title: "TCP client (skeleton)", code: `import socket\nc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\nc.connect(("localhost", 9999))\nc.sendall(b"hello")\nprint(c.recv(1024))\nc.close()`, output: `b'echo: hello'` }
      ]
    }
  ]
});

/* Module 28 — APIs */
window.DP.registerModule({
  id: 28,
  title: "APIs",
  icon: "🔌",
  summary: "Consuming REST APIs with the requests library, HTTP methods, JSON payloads and API authentication.",
  concepts: [
    {
      title: "REST APIs with requests",
      badge: "APIs",
      notes: ["The `requests` library makes HTTP calls simple. Methods: GET (read), POST (create), PUT (update), DELETE (remove)."],
      examples: [
        { title: "GET request", code: `import requests\nr = requests.get("https://api.example.com/users")\nprint(r.status_code)\nprint(r.json())`, output: `200\n[{'id': 1, 'name': 'Ravi'}]` },
        { title: "POST with JSON", code: `import requests\npayload = {"name": "Sara"}\nr = requests.post("https://api.example.com/users", json=payload)\nprint(r.status_code)`, output: `201` },
        { title: "Auth header", code: `import requests\nheaders = {"Authorization": "Bearer TOKEN123"}\nr = requests.get("https://api.example.com/me", headers=headers)\nprint(r.json())`, output: `{'user': 'me'}` }
      ]
    }
  ]
});

/* Module 29 — Testing */
window.DP.registerModule({
  id: 29,
  title: "Testing",
  icon: "✅",
  summary: "Writing tests with unittest and pytest, using assertions, mocking and measuring coverage.",
  concepts: [
    {
      title: "unittest & pytest",
      badge: "Testing",
      notes: ["Automated tests verify your code keeps working. `unittest` is built in; `pytest` offers a simpler syntax."],
      examples: [
        { title: "unittest", code: `import unittest\n\ndef add(a, b):\n    return a + b\n\nclass TestAdd(unittest.TestCase):\n    def test_add(self):\n        self.assertEqual(add(2, 3), 5)\n\nif __name__ == "__main__":\n    unittest.main()`, output: `Ran 1 test in 0.000s\nOK` },
        { title: "pytest style", code: `def add(a, b):\n    return a + b\n\ndef test_add():\n    assert add(2, 3) == 5\n    assert add(-1, 1) == 0`, output: `1 passed` }
      ]
    }
  ]
});

/* Module 30 — Data Structures */
window.DP.registerModule({
  id: 30,
  title: "Data Structures",
  icon: "🌳",
  summary: "Implementing core data structures: stack, queue, linked list, tree, binary search tree, heap, hash table, graph and trie.",
  concepts: [
    {
      title: "Stack & Queue",
      badge: "DSA",
      notes: ["A **stack** is LIFO (last-in first-out); a **queue** is FIFO (first-in first-out)."],
      examples: [
        { title: "Stack with a list", code: `stack = []\nstack.append(1)\nstack.append(2)\nprint(stack.pop())   # LIFO`, output: `2` },
        { title: "Queue with deque", code: `from collections import deque\nq = deque()\nq.append(1)\nq.append(2)\nprint(q.popleft())   # FIFO`, output: `1` }
      ]
    },
    {
      title: "Linked List & Binary Search Tree",
      badge: "DSA",
      notes: ["A **linked list** chains nodes together. A **BST** keeps smaller values left, larger right for fast search."],
      examples: [
        { title: "Singly linked list", code: `class Node:\n    def __init__(self, val):\n        self.val = val\n        self.next = None\n\na = Node(1); a.next = Node(2)\nprint(a.val, a.next.val)`, output: `1 2` },
        { title: "BST insert & inorder", code: `class Node:\n    def __init__(self, v):\n        self.v, self.left, self.right = v, None, None\n\ndef insert(root, v):\n    if not root: return Node(v)\n    if v < root.v: root.left = insert(root.left, v)\n    else: root.right = insert(root.right, v)\n    return root\n\ndef inorder(n):\n    if n:\n        inorder(n.left); print(n.v, end=" "); inorder(n.right)\n\nr = None\nfor x in [5, 3, 7, 1]:\n    r = insert(r, x)\ninorder(r)`, output: `1 3 5 7 ` }
      ]
    }
  ]
});

/* Module 31 — Algorithms */
window.DP.registerModule({
  id: 31,
  title: "Algorithms",
  icon: "⚙️",
  summary: "Searching (linear, binary), sorting (bubble, selection, insertion, merge, quick, heap), recursion, backtracking, dynamic programming and greedy techniques.",
  concepts: [
    {
      title: "Searching",
      badge: "Algorithms",
      notes: ["**Linear search** checks each item (O(n)). **Binary search** halves a sorted list each step (O(log n))."],
      examples: [
        { title: "Linear search", code: `def linear(arr, target):\n    for i, v in enumerate(arr):\n        if v == target:\n            return i\n    return -1\n\nprint(linear([4, 2, 7, 1], 7))`, output: `2` },
        { title: "Binary search", code: `def binary(arr, target):\n    lo, hi = 0, len(arr) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if arr[mid] == target: return mid\n        if arr[mid] < target: lo = mid + 1\n        else: hi = mid - 1\n    return -1\n\nprint(binary([1, 3, 5, 7, 9], 7))`, output: `3` }
      ]
    },
    {
      title: "Sorting",
      badge: "Algorithms",
      notes: ["Classic sorting algorithms. Python's built-in `sorted()` uses Timsort (O(n log n))."],
      examples: [
        { title: "Bubble sort", code: `def bubble(a):\n    n = len(a)\n    for i in range(n):\n        for j in range(n - i - 1):\n            if a[j] > a[j + 1]:\n                a[j], a[j + 1] = a[j + 1], a[j]\n    return a\n\nprint(bubble([5, 2, 8, 1]))`, output: `[1, 2, 5, 8]` },
        { title: "Quick sort", code: `def quick(a):\n    if len(a) <= 1: return a\n    pivot = a[0]\n    less = [x for x in a[1:] if x <= pivot]\n    more = [x for x in a[1:] if x > pivot]\n    return quick(less) + [pivot] + quick(more)\n\nprint(quick([3, 6, 1, 8, 2]))`, output: `[1, 2, 3, 6, 8]` },
        { title: "Merge sort", code: `def merge_sort(a):\n    if len(a) <= 1: return a\n    mid = len(a) // 2\n    L, R = merge_sort(a[:mid]), merge_sort(a[mid:])\n    out, i, j = [], 0, 0\n    while i < len(L) and j < len(R):\n        if L[i] <= R[j]: out.append(L[i]); i += 1\n        else: out.append(R[j]); j += 1\n    return out + L[i:] + R[j:]\n\nprint(merge_sort([4, 1, 3, 2]))`, output: `[1, 2, 3, 4]` }
      ]
    },
    {
      title: "Recursion, DP & Greedy",
      badge: "Algorithms",
      notes: ["**Dynamic programming** caches sub-results; **greedy** makes the locally best choice each step."],
      examples: [
        { title: "Fibonacci with memoization (DP)", code: `from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nprint(fib(30))`, output: `832040` },
        { title: "Coin change (greedy)", code: `def coins(amount, denoms=[10, 5, 2, 1]):\n    result = []\n    for d in denoms:\n        while amount >= d:\n            amount -= d\n            result.append(d)\n    return result\n\nprint(coins(28))`, output: `[10, 10, 5, 2, 1]` }
      ]
    }
  ]
});

/* Module 32 — Design Patterns */
window.DP.registerModule({
  id: 32,
  title: "Design Patterns",
  icon: "🧱",
  summary: "Reusable software design solutions: Singleton, Factory, Builder, Strategy, Observer, MVC, Repository and Dependency Injection.",
  concepts: [
    {
      title: "Singleton & Factory",
      badge: "Patterns",
      notes: ["**Singleton** ensures one shared instance. **Factory** creates objects without exposing the exact class."],
      examples: [
        { title: "Singleton", code: `class Config:\n    _instance = None\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance\n\na = Config()\nb = Config()\nprint(a is b)`, output: `True` },
        { title: "Factory", code: `class Dog:\n    def speak(self): return "woof"\nclass Cat:\n    def speak(self): return "meow"\n\ndef animal_factory(kind):\n    return {"dog": Dog, "cat": Cat}[kind]()\n\nprint(animal_factory("cat").speak())`, output: `meow` }
      ]
    },
    {
      title: "Strategy & Observer",
      badge: "Patterns",
      notes: ["**Strategy** swaps algorithms at runtime. **Observer** notifies subscribers when state changes."],
      examples: [
        { title: "Strategy", code: `def add(a, b): return a + b\ndef mul(a, b): return a * b\n\ndef calculate(strategy, a, b):\n    return strategy(a, b)\n\nprint(calculate(add, 3, 4))\nprint(calculate(mul, 3, 4))`, output: `7\n12` },
        { title: "Observer", code: `class Subject:\n    def __init__(self):\n        self.observers = []\n    def subscribe(self, fn):\n        self.observers.append(fn)\n    def notify(self, msg):\n        for fn in self.observers:\n            fn(msg)\n\ns = Subject()\ns.subscribe(lambda m: print("got:", m))\ns.notify("update!")`, output: `got: update!` }
      ]
    }
  ]
});

/* Module 33 — Python Project Structure */
window.DP.registerModule({
  id: 33,
  title: "Python Project Structure",
  icon: "🗂️",
  summary: "Organising a professional project into app, tests, config, models and services with a requirements.txt and README.",
  concepts: [
    {
      title: "Recommended Project Layout",
      badge: "Best Practice",
      notes: [
        "A clean structure keeps large projects maintainable:",
        "- `app/` — application source code",
        "- `models/` — data models",
        "- `services/` — business logic",
        "- `config/` — settings & configuration",
        "- `tests/` — unit & integration tests",
        "- `requirements.txt` — dependencies",
        "- `README.md` — documentation"
      ],
      examples: [
        { title: "Directory tree", code: `project/\n|-- app/\n|-- tests/\n|-- config/\n|-- models/\n|-- services/\n|-- requirements.txt\n|-- README.md`, output: `# a maintainable, scalable layout` },
        { title: "Package marker", code: `# app/__init__.py makes 'app' a package\nfrom .services import process\nprint("package initialised")`, output: `package initialised` }
      ]
    }
  ]
});

/* Module 34 — Git & GitHub */
window.DP.registerModule({
  id: 34,
  title: "Git & GitHub",
  icon: "🔧",
  summary: "Version control essentials: repositories, clone, commit, branch, merge, pull requests and GitHub Actions.",
  concepts: [
    {
      title: "Core Git Workflow",
      badge: "Tooling",
      notes: ["Git tracks changes to your code. GitHub hosts repositories and enables collaboration via pull requests."],
      examples: [
        { title: "Start & commit", code: `git init\ngit add .\ngit commit -m "Initial commit"`, output: `[main (root-commit) a1b2c3] Initial commit` },
        { title: "Branch & merge", code: `git checkout -b feature\n# ...make changes...\ngit commit -am "Add feature"\ngit checkout main\ngit merge feature`, output: `Fast-forward` },
        { title: "Clone & push", code: `git clone https://github.com/user/repo.git\n# ...edit...\ngit push origin main`, output: `# uploads commits to GitHub` }
      ]
    }
  ]
});

/* Module 35 — Web Development */
window.DP.registerModule({
  id: 35,
  title: "Web Development",
  icon: "🕸️",
  summary: "Building web apps with Flask, Django and FastAPI, Jinja2 templates, authentication, JWT and REST APIs (HTML/CSS/JS basics included).",
  concepts: [
    {
      title: "Flask & FastAPI",
      badge: "Web",
      notes: ["**Flask** is a minimal web framework; **FastAPI** is modern, fast and type-driven; **Django** is a full-featured batteries-included framework."],
      examples: [
        { title: "Flask hello route", code: `from flask import Flask\napp = Flask(__name__)\n\n@app.route("/")\ndef home():\n    return "Hello from Flask!"\n\n# flask run`, output: `Hello from Flask!` },
        { title: "FastAPI endpoint", code: `from fastapi import FastAPI\napp = FastAPI()\n\n@app.get("/items/{item_id}")\ndef read_item(item_id: int):\n    return {"item_id": item_id}\n\n# uvicorn main:app`, output: `{"item_id": 5}` }
      ]
    }
  ]
});

/* Module 36 — Data Analysis */
window.DP.registerModule({
  id: 36,
  title: "Data Analysis",
  icon: "📊",
  summary: "Numerical and tabular data with NumPy and Pandas, plotting with Matplotlib, and Excel automation with OpenPyXL.",
  concepts: [
    {
      title: "NumPy & Pandas",
      badge: "Data",
      notes: ["**NumPy** provides fast arrays; **Pandas** provides DataFrames for tabular data."],
      examples: [
        { title: "NumPy array math", code: `import numpy as np\na = np.array([1, 2, 3])\nprint(a * 2)\nprint(a.mean())`, output: `[2 4 6]\n2.0` },
        { title: "Pandas DataFrame", code: `import pandas as pd\ndf = pd.DataFrame({"name": ["A", "B"], "score": [90, 80]})\nprint(df["score"].mean())`, output: `85.0` }
      ]
    }
  ]
});

/* Module 37 — Automation */
window.DP.registerModule({
  id: 37,
  title: "Automation",
  icon: "🤖",
  summary: "Automating the browser and web with Selenium, BeautifulSoup and Playwright, plus email, PDF and Excel automation.",
  concepts: [
    {
      title: "Web Scraping with BeautifulSoup",
      badge: "Automation",
      notes: ["**BeautifulSoup** parses HTML; **Selenium/Playwright** drive real browsers."],
      examples: [
        { title: "Parse HTML", code: `from bs4 import BeautifulSoup\nhtml = "<h1>Title</h1><p>Body</p>"\nsoup = BeautifulSoup(html, "html.parser")\nprint(soup.h1.text)`, output: `Title` },
        { title: "Find all links", code: `from bs4 import BeautifulSoup\nhtml = '<a href="/a">A</a><a href="/b">B</a>'\nsoup = BeautifulSoup(html, "html.parser")\nprint([a["href"] for a in soup.find_all("a")])`, output: `['/a', '/b']` }
      ]
    }
  ]
});

/* Module 38 — Cloud Python */
window.DP.registerModule({
  id: 38,
  title: "Cloud Python",
  icon: "☁️",
  summary: "AWS automation with boto3: Lambda, S3, DynamoDB, EC2, CloudWatch, SNS, SQS, Secrets Manager and Parameter Store.",
  concepts: [
    {
      title: "AWS with boto3",
      badge: "Cloud",
      notes: ["**boto3** is the AWS SDK for Python. It talks to services like S3 (storage), Lambda (functions) and DynamoDB (NoSQL)."],
      examples: [
        { title: "Upload to S3", code: `import boto3\ns3 = boto3.client("s3")\ns3.upload_file("report.pdf", "my-bucket", "report.pdf")\nprint("uploaded")`, output: `uploaded` },
        { title: "List S3 buckets", code: `import boto3\ns3 = boto3.client("s3")\nfor b in s3.list_buckets()["Buckets"]:\n    print(b["Name"])`, output: `my-bucket` },
        { title: "Lambda handler", code: `def lambda_handler(event, context):\n    name = event.get("name", "World")\n    return {"statusCode": 200, "body": f"Hello {name}"}`, output: `{'statusCode': 200, 'body': 'Hello World'}` }
      ]
    }
  ]
});

/* Module 39 — DevOps with Python */
window.DP.registerModule({
  id: 39,
  title: "DevOps with Python",
  icon: "🚢",
  summary: "Docker and Docker Compose, CI/CD with Jenkins and GitHub Actions, and infrastructure automation with Terraform, Ansible and Kubernetes.",
  concepts: [
    {
      title: "Docker & CI/CD",
      badge: "DevOps",
      notes: ["**Docker** packages an app with its dependencies into a container. **CI/CD** automates testing and deployment."],
      examples: [
        { title: "Dockerfile for Python", code: `FROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD ["python", "main.py"]`, output: `# builds a container image` },
        { title: "GitHub Actions workflow", code: `name: CI\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: pip install -r requirements.txt\n      - run: pytest`, output: `# runs tests on every push` }
      ]
    }
  ]
});

/* Module 40 — AI & Machine Learning */
window.DP.registerModule({
  id: 40,
  title: "AI & Machine Learning",
  icon: "🧠",
  summary: "Machine learning and AI with scikit-learn, TensorFlow, PyTorch, OpenCV, NLTK/spaCy, plus LLMs, RAG, vector databases, OpenAI APIs, Bedrock and MCP.",
  concepts: [
    {
      title: "scikit-learn Basics",
      badge: "AI/ML",
      notes: ["**scikit-learn** is the go-to library for classic machine learning: train a model, then predict."],
      examples: [
        { title: "Train a simple model", code: `from sklearn.linear_model import LinearRegression\nX = [[1], [2], [3]]\ny = [2, 4, 6]\nmodel = LinearRegression().fit(X, y)\nprint(round(model.predict([[4]])[0]))`, output: `8` },
        { title: "Call an LLM (OpenAI)", code: `from openai import OpenAI\nclient = OpenAI()\nresp = client.chat.completions.create(\n    model="gpt-4o-mini",\n    messages=[{"role": "user", "content": "Say hello"}])\nprint(resp.choices[0].message.content)`, output: `Hello! How can I help you today?` }
      ]
    }
  ]
});

/* Module 41 — Industry Best Practices */
window.DP.registerModule({
  id: 41,
  title: "Industry Best Practices",
  icon: "🏆",
  summary: "PEP 8, type hints, docstrings, logging over print, environment variables, secrets management, testing, code reviews, performance and packaging.",
  concepts: [
    {
      title: "PEP 8, Type Hints & Docstrings",
      badge: "Best Practice",
      notes: [
        "Professional Python follows conventions:",
        "- **PEP 8** — the official style guide (4-space indent, snake_case).",
        "- **Type hints** — annotate parameters and returns.",
        "- **Docstrings** — document functions and modules.",
        "- Use **logging** not `print()`, load secrets from **environment variables**."
      ],
      examples: [
        { title: "Type hints", code: `def greet(name: str, times: int = 1) -> str:\n    return f"Hi {name}! " * times\n\nprint(greet("Ravi", 2))`, output: `Hi Ravi! Hi Ravi! ` },
        { title: "Docstring", code: `def area(r: float) -> float:\n    """Return the area of a circle with radius r."""\n    return 3.14159 * r ** 2\n\nprint(area.__doc__)`, output: `Return the area of a circle with radius r.` },
        { title: "Read a secret from env", code: `import os\napi_key = os.environ.get("API_KEY", "not-set")\nprint(api_key)`, output: `not-set` }
      ]
    }
  ]
});

/* Module 42 — Real-World Industry Projects */
window.DP.registerModule({
  id: 42,
  title: "Real-World Industry Projects",
  icon: "🏗️",
  summary: "Capstone projects that combine everything: management systems, banking/ATM, e-commerce and food-delivery backends, chatbots, RAG search, serverless and full-stack apps.",
  concepts: [
    {
      title: "Project Ideas & Starters",
      badge: "Projects",
      notes: [
        "Apply your skills by building complete applications. Suggested progression:",
        "1. **Console apps** — Student/Library/Inventory Management, ATM Simulator, Banking App.",
        "2. **Backends** — E-commerce API, Food Delivery, CRM, HRMS (FastAPI/Django + database).",
        "3. **AI apps** — AI Chatbot, RAG Document Search, Face Recognition Attendance.",
        "4. **Cloud/full-stack** — AWS Serverless app; FastAPI/Django + React + MySQL + Docker + AWS."
      ],
      examples: [
        { title: "ATM Simulator (core loop)", code: `balance = 1000\nwhile True:\n    choice = input("1)Balance 2)Deposit 3)Exit: ")\n    if choice == "1":\n        print("Balance:", balance)\n    elif choice == "2":\n        balance += int(input("Amount: "))\n    else:\n        print("Goodbye")\n        break`, output: `1)Balance 2)Deposit 3)Exit: 1\nBalance: 1000` },
        { title: "Student record (OOP)", code: `class Student:\n    def __init__(self, name, marks):\n        self.name = name\n        self.marks = marks\n    def grade(self):\n        return "Pass" if self.marks >= 40 else "Fail"\n\ns = Student("Ravi", 75)\nprint(s.name, s.grade())`, output: `Ravi Pass` },
        { title: "Banking deposit/withdraw", code: `class Account:\n    def __init__(self, balance=0):\n        self.balance = balance\n    def deposit(self, amt):\n        self.balance += amt\n    def withdraw(self, amt):\n        if amt > self.balance:\n            return "Insufficient funds"\n        self.balance -= amt\n        return self.balance\n\na = Account(500)\na.deposit(200)\nprint(a.withdraw(300))`, output: `400` }
      ]
    }
  ]
});

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
    },
    {
      title: "Standard Library — Deep Dive",
      badge: "Modules · 40+ examples",
      notes: ["Real-world use of Python's standard library — no external installs needed."],
      examples: [
        { title: "math.pi and math.e", code: `import math\nprint(math.pi, math.e)`, output: `3.141592653589793 2.718281828459045` },
        { title: "math.floor / ceil / trunc", code: `import math\nprint(math.floor(3.7), math.ceil(3.2), math.trunc(-3.7))`, output: `3 4 -3` },
        { title: "math.sqrt / pow", code: `import math\nprint(math.sqrt(16), math.pow(2, 10))`, output: `4.0 1024.0` },
        { title: "math.log natural and base 10", code: `import math\nprint(math.log(math.e), math.log10(100))`, output: `1.0 2.0` },
        { title: "math.sin/cos (radians)", code: `import math\nprint(round(math.sin(math.pi/2), 2), round(math.cos(0), 2))`, output: `1.0 1.0` },
        { title: "math.factorial and gcd", code: `import math\nprint(math.factorial(6), math.gcd(24, 36))`, output: `720 12` },
        { title: "random with seed", code: `import random\nrandom.seed(42)\nprint(random.randint(1, 100))`, output: `82` },
        { title: "random.choice from list", code: `import random\nrandom.seed(1)\nprint(random.choice(["A", "B", "C"]))`, output: `B` },
        { title: "random.shuffle", code: `import random\nrandom.seed(0)\nnums = [1, 2, 3, 4, 5]\nrandom.shuffle(nums)\nprint(nums)`, output: `[4, 2, 1, 3, 5]` },
        { title: "random.sample (without replacement)", code: `import random\nrandom.seed(1)\nprint(random.sample(range(100), 5))`, output: `[17, 72, 97, 8, 32]` },
        { title: "random.random (0-1 float)", code: `import random\nrandom.seed(0)\nprint(round(random.random(), 3))`, output: `0.844` },
        { title: "datetime.now formatted", code: `from datetime import datetime\nprint(datetime(2024, 1, 15, 10, 30).strftime("%Y-%m-%d %H:%M"))`, output: `2024-01-15 10:30` },
        { title: "date difference in days", code: `from datetime import date\nd1 = date(2024, 12, 25)\nd2 = date(2024, 1, 1)\nprint((d1 - d2).days)`, output: `359` },
        { title: "Add days with timedelta", code: `from datetime import date, timedelta\ntoday = date(2024, 1, 15)\nprint(today + timedelta(days=30))`, output: `2024-02-14` },
        { title: "Parse date from string", code: `from datetime import datetime\nd = datetime.strptime("15-01-2024", "%d-%m-%Y")\nprint(d)`, output: `2024-01-15 00:00:00` },
        { title: "Day of week", code: `from datetime import date\nnames = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]\nprint(names[date(2024, 1, 15).weekday()])`, output: `Mon` },
        { title: "os.getcwd (current dir)", code: `import os\nprint(os.getcwd())`, output: `/current/path` },
        { title: "os.path.join", code: `import os\nprint(os.path.join("data", "2024", "logs", "app.log"))`, output: `data/2024/logs/app.log` },
        { title: "os.path.basename / dirname", code: `import os\np = "/home/user/data/file.txt"\nprint(os.path.basename(p), os.path.dirname(p))`, output: `file.txt /home/user/data` },
        { title: "os.environ (env vars)", code: `import os\nprint(os.environ.get("HOME", "not set"))`, output: `/home/user` },
        { title: "sys.argv (command-line args)", code: `import sys\n# Called as: python script.py hello world\nprint(sys.argv)`, output: `['script.py', 'hello', 'world']` },
        { title: "sys.platform", code: `import sys\nprint(sys.platform)`, output: `linux` },
        { title: "sys.version_info", code: `import sys\nprint(sys.version_info.major, sys.version_info.minor)`, output: `3 12` },
        { title: "sys.exit with code", code: `import sys\n# sys.exit(0) — success\n# sys.exit(1) — error\nprint("normal end")`, output: `normal end` },
        { title: "time.sleep", code: `import time\nstart = time.time()\ntime.sleep(0.05)\nprint(round(time.time() - start, 2))`, output: `0.05` },
        { title: "time.perf_counter (precise timing)", code: `import time\nstart = time.perf_counter()\nsum(range(100000))\nprint(f"{time.perf_counter()-start:.4f}s")`, output: `0.0023s` },
        { title: "calendar month view", code: `import calendar\nprint(calendar.month(2024, 1)[:80])`, output: `    January 2024\nMo Tu We Th Fr Sa Su\n 1  2  3  4  5  6  7` },
        { title: "calendar.isleap", code: `import calendar\nprint(calendar.isleap(2024), calendar.isleap(2023))`, output: `True False` },
        { title: "statistics — mean/median/mode", code: `import statistics as s\ndata = [1, 2, 2, 3, 4]\nprint(s.mean(data), s.median(data), s.mode(data))`, output: `2.4 2 2` },
        { title: "statistics — stdev/variance", code: `import statistics as s\nprint(round(s.stdev([1,2,3,4,5]), 2))`, output: `1.58` },
        { title: "itertools.chain", code: `from itertools import chain\nprint(list(chain([1,2], [3,4], [5])))`, output: `[1, 2, 3, 4, 5]` },
        { title: "itertools.combinations", code: `from itertools import combinations\nprint(list(combinations("ABC", 2)))`, output: `[('A', 'B'), ('A', 'C'), ('B', 'C')]` },
        { title: "itertools.permutations", code: `from itertools import permutations\nprint(list(permutations([1,2,3], 2)))`, output: `[(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]` },
        { title: "itertools.product (cartesian)", code: `from itertools import product\nprint(list(product("AB", "12")))`, output: `[('A', '1'), ('A', '2'), ('B', '1'), ('B', '2')]` },
        { title: "itertools.count / cycle", code: `from itertools import islice, count, cycle\nprint(list(islice(count(10, 2), 4)))\nprint(list(islice(cycle("AB"), 5)))`, output: `[10, 12, 14, 16]\n['A', 'B', 'A', 'B', 'A']` },
        { title: "itertools.groupby", code: `from itertools import groupby\ndata = "aaabbc"\nprint([(k, len(list(g))) for k, g in groupby(data)])`, output: `[('a', 3), ('b', 2), ('c', 1)]` },
        { title: "functools.partial", code: `from functools import partial\nsq = partial(pow, exp=2) if False else None\nadd_five = partial(lambda a, b: a + b, 5)\nprint(add_five(3))`, output: `8` },
        { title: "functools.lru_cache", code: `from functools import lru_cache\n@lru_cache\ndef fib(n): return n if n < 2 else fib(n-1) + fib(n-2)\nprint(fib(30))`, output: `832040` },
        { title: "hashlib md5", code: `import hashlib\nprint(hashlib.md5(b"hello").hexdigest())`, output: `5d41402abc4b2a76b9719d911017c592` },
        { title: "hashlib sha256", code: `import hashlib\nprint(hashlib.sha256(b"password").hexdigest()[:12])`, output: `5e884898da28` },
        { title: "uuid.uuid4 unique ID", code: `import uuid\nprint(str(uuid.uuid4())[:8])`, output: `# random 8 chars` },
        { title: "base64 encode/decode", code: `import base64\nb = base64.b64encode(b"hello")\nprint(b)\nprint(base64.b64decode(b))`, output: `b'aGVsbG8='\nb'hello'` },
        { title: "shutil.disk_usage", code: `import shutil\ntotal, used, free = shutil.disk_usage("/")\nprint(round(free / 1e9, 2), "GB free")`, output: `# free GB` },
        { title: "getpass (hidden input)", code: `# import getpass\n# pwd = getpass.getpass("Password: ")\nprint("hidden password prompt")`, output: `hidden password prompt` },
        { title: "textwrap for wrapping", code: `import textwrap\ntext = "This is a very long line " * 4\nprint(textwrap.fill(text, width=30))`, output: `This is a very long line This\nis a very long line This is a\nvery long line This is a very\nlong line` }
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
    },
    {
      title: "Regex — Practical Patterns",
      badge: "Regex · 45+ examples",
      notes: ["Real-world regex patterns for validation, extraction, and cleanup."],
      examples: [
        { title: "Match any digit", code: `import re\nprint(re.findall(r"\\d", "a1b2c3"))`, output: `['1', '2', '3']` },
        { title: "Match a sequence of digits", code: `import re\nprint(re.findall(r"\\d+", "order 42 batch 100"))`, output: `['42', '100']` },
        { title: "Match a word", code: `import re\nprint(re.findall(r"\\w+", "Hello, World!"))`, output: `['Hello', 'World']` },
        { title: "Whitespace splits", code: `import re\nprint(re.split(r"\\s+", "hello   world\\ttab"))`, output: `['hello', 'world', 'tab']` },
        { title: "Match at start of string (^)", code: `import re\nprint(bool(re.match(r"^Hello", "Hello, World")))`, output: `True` },
        { title: "Match at end of string ($)", code: `import re\nprint(bool(re.search(r"world$", "hello world")))`, output: `True` },
        { title: "Case-insensitive match", code: `import re\nprint(re.findall(r"python", "Python is FUN", re.IGNORECASE))`, output: `['Python']` },
        { title: "Character class [abc]", code: `import re\nprint(re.findall(r"[aeiou]", "programming"))`, output: `['o', 'a', 'i']` },
        { title: "Negated char class [^abc]", code: `import re\nprint(re.findall(r"[^aeiou\\s]", "hi there"))`, output: `['h', 't', 'h', 'r']` },
        { title: "Range [a-z]", code: `import re\nprint(re.findall(r"[A-Z]", "HelloWorld"))`, output: `['H', 'W']` },
        { title: "Quantifier * (zero or more)", code: `import re\nprint(re.findall(r"a*", "aaabbaa"))`, output: `['aaa', '', '', 'aa', '']` },
        { title: "Quantifier + (one or more)", code: `import re\nprint(re.findall(r"a+", "aaabbaa"))`, output: `['aaa', 'aa']` },
        { title: "Quantifier {n,m}", code: `import re\nprint(re.findall(r"\\d{3,4}", "12 345 6789 10"))`, output: `['345', '6789']` },
        { title: "Optional (?)", code: `import re\nprint(re.findall(r"colou?r", "color and colour"))`, output: `['color', 'colour']` },
        { title: "Alternation (|)", code: `import re\nprint(re.findall(r"cat|dog", "I have a cat and a dog"))`, output: `['cat', 'dog']` },
        { title: "Groups with ()", code: `import re\nm = re.match(r"(\\w+)@(\\w+)\\.(\\w+)", "user@mail.com")\nprint(m.group(1), m.group(2), m.group(3))`, output: `user mail com` },
        { title: "Named groups", code: `import re\nm = re.match(r"(?P<user>\\w+)@(?P<domain>\\w+)", "alice@gmail")\nprint(m.group("user"), m.group("domain"))`, output: `alice gmail` },
        { title: "Non-capturing group (?:...)", code: `import re\nprint(re.findall(r"(?:Mr|Ms|Dr)\\. \\w+", "Meet Dr. Smith and Mr. Kumar"))`, output: `['Dr. Smith', 'Mr. Kumar']` },
        { title: "Word boundary \\b", code: `import re\nprint(re.findall(r"\\bcat\\b", "cats, cat, category"))`, output: `['cat']` },
        { title: "Extract all emails", code: `import re\ntext = "Contact us: a@x.com or b@y.org"\nprint(re.findall(r"[\\w.+-]+@[\\w-]+\\.[\\w.-]+", text))`, output: `['a@x.com', 'b@y.org']` },
        { title: "Extract phone numbers (10-digit)", code: `import re\ntext = "Call 9876543210 or 98765-43210"\nprint(re.findall(r"\\b[6-9]\\d{9}\\b", text))`, output: `['9876543210']` },
        { title: "Extract URLs", code: `import re\ntext = "Visit https://python.org and http://example.com/page"\nprint(re.findall(r"https?://[\\w./]+", text))`, output: `['https://python.org', 'http://example.com/page']` },
        { title: "Extract hashtags", code: `import re\ntext = "Learning #Python and #DataScience today"\nprint(re.findall(r"#\\w+", text))`, output: `['#Python', '#DataScience']` },
        { title: "Extract mentions", code: `import re\nprint(re.findall(r"@\\w+", "Thanks @ravi and @sara_dev!"))`, output: `['@ravi', '@sara_dev']` },
        { title: "Extract dates dd-mm-yyyy", code: `import re\ntext = "Born 15-01-1990, joined 01-04-2020"\nprint(re.findall(r"\\d{2}-\\d{2}-\\d{4}", text))`, output: `['15-01-1990', '01-04-2020']` },
        { title: "Extract prices", code: `import re\ntext = "Coffee ₹150, Cake ₹300, Total ₹450"\nprint(re.findall(r"₹\\d+", text))`, output: `['₹150', '₹300', '₹450']` },
        { title: "Extract time HH:MM", code: `import re\nprint(re.findall(r"\\d{1,2}:\\d{2}", "Meeting at 9:30 or 14:45"))`, output: `['9:30', '14:45']` },
        { title: "Replace with sub()", code: `import re\nprint(re.sub(r"\\d+", "#", "abc 123 def 456"))`, output: `abc # def #` },
        { title: "Replace with function", code: `import re\ntext = "prices 100 250 500"\nprint(re.sub(r"\\d+", lambda m: str(int(m.group())*2), text))`, output: `prices 200 500 1000` },
        { title: "Remove all whitespace", code: `import re\nprint(re.sub(r"\\s+", "", "a  b\\tc  d"))`, output: `abcd` },
        { title: "Collapse multiple spaces", code: `import re\nprint(re.sub(r"\\s+", " ", "hello    world   again"))`, output: `hello world again` },
        { title: "Remove punctuation", code: `import re\nprint(re.sub(r"[^\\w\\s]", "", "Hello, World!!! How's life?"))`, output: `Hello World Hows life` },
        { title: "Mask credit card (keep last 4)", code: `import re\nprint(re.sub(r"\\d(?=\\d{4})", "*", "1234567812345678"))`, output: `************5678` },
        { title: "Mask email domain", code: `import re\nprint(re.sub(r"(?<=@)[\\w.]+", "***", "alice@example.com"))`, output: `alice@***` },
        { title: "Validate PIN (6 digits)", code: `import re\npattern = r"^\\d{6}$"\nprint(bool(re.match(pattern, "560001")))\nprint(bool(re.match(pattern, "12ab34")))`, output: `True\nFalse` },
        { title: "Validate PAN card (India)", code: `import re\npattern = r"^[A-Z]{5}\\d{4}[A-Z]$"\nprint(bool(re.match(pattern, "ABCDE1234F")))`, output: `True` },
        { title: "Validate GSTIN", code: `import re\npattern = r"^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][A-Z0-9]{3}$"\nprint(bool(re.match(pattern, "29ABCDE1234F1Z5")))`, output: `True` },
        { title: "Validate IPv4 address", code: `import re\npattern = r"^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$"\nprint(bool(re.match(pattern, "192.168.1.1")))`, output: `True` },
        { title: "Validate hex color", code: `import re\npattern = r"^#[0-9a-fA-F]{6}$"\nprint(bool(re.match(pattern, "#3AF9C1")))`, output: `True` },
        { title: "Split on multiple delimiters", code: `import re\nprint(re.split(r"[,;| ]+", "a,b;c|d e"))`, output: `['a', 'b', 'c', 'd', 'e']` },
        { title: "Count occurrences", code: `import re\nprint(len(re.findall(r"\\bthe\\b", "the cat and the dog and the mouse")))`, output: `3` },
        { title: "Extract quoted strings", code: `import re\ntext = 'He said "hello" and "world"'\nprint(re.findall(r'"([^"]+)"', text))`, output: `['hello', 'world']` },
        { title: "Compile pattern for reuse", code: `import re\np = re.compile(r"\\d+")\nprint(p.findall("a1 b2 c3"))\nprint(p.sub("#", "a1 b2 c3"))`, output: `['1', '2', '3']\na# b# c#` },
        { title: "Multiline mode", code: `import re\ntext = "line1\\nline2\\nLine3"\nprint(re.findall(r"^line", text, re.MULTILINE))`, output: `['line', 'line']` },
        { title: "Verbose regex (with comments)", code: `import re\npattern = re.compile(r"""\n    \\d{2}    # day\n    -\n    \\d{2}    # month\n    -\n    \\d{4}    # year\n""", re.VERBOSE)\nprint(pattern.findall("15-01-2024"))`, output: `['15-01-2024']` },
        { title: "Lookbehind assertion", code: `import re\nprint(re.findall(r"(?<=\\$)\\d+", "Cost $150, tax $30"))`, output: `['150', '30']` },
        { title: "Negative lookahead", code: `import re\n# match 'cat' not followed by 's'\nprint(re.findall(r"cat(?!s)", "cat cats cat"))`, output: `['cat', 'cat']` }
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
    },
    {
      title: "Collections — Real Use Cases",
      badge: "Collections · 40+ examples",
      notes: ["Real-world patterns using Counter, defaultdict, deque, OrderedDict, namedtuple, ChainMap."],
      examples: [
        { title: "Counter from list", code: `from collections import Counter\nprint(Counter([1,2,2,3,3,3]))`, output: `Counter({3: 3, 2: 2, 1: 1})` },
        { title: "Counter from string", code: `from collections import Counter\nprint(dict(Counter("mississippi")))`, output: `{'m': 1, 'i': 4, 's': 4, 'p': 2}` },
        { title: "Counter most_common(N)", code: `from collections import Counter\nprint(Counter("banana").most_common(2))`, output: `[('a', 3), ('n', 2)]` },
        { title: "Counter arithmetic", code: `from collections import Counter\na = Counter(a=3, b=1)\nb = Counter(a=1, b=2)\nprint(a + b)\nprint(a - b)`, output: `Counter({'a': 4, 'b': 3})\nCounter({'a': 2})` },
        { title: "Counter of words in file", code: `from collections import Counter\ntext = "the cat sat on the mat with the fat cat"\nprint(Counter(text.split()).most_common(3))`, output: `[('the', 3), ('cat', 2), ('sat', 1)]` },
        { title: "Counter update", code: `from collections import Counter\nc = Counter("abc")\nc.update("abd")\nprint(c)`, output: `Counter({'a': 2, 'b': 2, 'c': 1, 'd': 1})` },
        { title: "Counter subtract", code: `from collections import Counter\nc = Counter(a=4, b=2)\nc.subtract(a=1, b=1)\nprint(c)`, output: `Counter({'a': 3, 'b': 1})` },
        { title: "Counter elements", code: `from collections import Counter\nc = Counter(a=2, b=3)\nprint(sorted(c.elements()))`, output: `['a', 'a', 'b', 'b', 'b']` },
        { title: "defaultdict(int) for counting", code: `from collections import defaultdict\nd = defaultdict(int)\nfor c in "aabbc": d[c] += 1\nprint(dict(d))`, output: `{'a': 2, 'b': 2, 'c': 1}` },
        { title: "defaultdict(list) for grouping", code: `from collections import defaultdict\nd = defaultdict(list)\nfor word in ["apple","ant","bee","banana"]:\n    d[word[0]].append(word)\nprint(dict(d))`, output: `{'a': ['apple', 'ant'], 'b': ['bee', 'banana']}` },
        { title: "defaultdict(set) for unique groups", code: `from collections import defaultdict\nd = defaultdict(set)\nfor n in [1,2,3,4,5,6,7,8]:\n    d[n % 3].add(n)\nprint({k: sorted(v) for k, v in d.items()})`, output: `{1: [1, 4, 7], 2: [2, 5, 8], 0: [3, 6]}` },
        { title: "Nested defaultdict", code: `from collections import defaultdict\nd = defaultdict(lambda: defaultdict(int))\nd["cats"]["black"] += 1\nd["cats"]["white"] += 2\nprint(dict(d["cats"]))`, output: `{'black': 1, 'white': 2}` },
        { title: "deque append/appendleft", code: `from collections import deque\nq = deque([1, 2, 3])\nq.append(4)\nq.appendleft(0)\nprint(list(q))`, output: `[0, 1, 2, 3, 4]` },
        { title: "deque as FIFO queue", code: `from collections import deque\nq = deque()\nq.append("A"); q.append("B"); q.append("C")\nprint(q.popleft(), q.popleft())`, output: `A B` },
        { title: "deque as stack (LIFO)", code: `from collections import deque\ns = deque()\ns.append(1); s.append(2); s.append(3)\nprint(s.pop(), s.pop())`, output: `3 2` },
        { title: "deque with maxlen (sliding window)", code: `from collections import deque\nrecent = deque(maxlen=3)\nfor x in [1,2,3,4,5]:\n    recent.append(x)\nprint(list(recent))`, output: `[3, 4, 5]` },
        { title: "deque rotate", code: `from collections import deque\nq = deque([1,2,3,4,5])\nq.rotate(2)\nprint(list(q))`, output: `[4, 5, 1, 2, 3]` },
        { title: "deque rotate negative", code: `from collections import deque\nq = deque([1,2,3,4,5])\nq.rotate(-2)\nprint(list(q))`, output: `[3, 4, 5, 1, 2]` },
        { title: "OrderedDict preserves order", code: `from collections import OrderedDict\nd = OrderedDict()\nd["a"] = 1; d["b"] = 2; d["c"] = 3\nprint(list(d.keys()))`, output: `['a', 'b', 'c']` },
        { title: "OrderedDict move_to_end", code: `from collections import OrderedDict\nd = OrderedDict([("a",1),("b",2),("c",3)])\nd.move_to_end("a")\nprint(list(d.keys()))`, output: `['b', 'c', 'a']` },
        { title: "OrderedDict popitem(last=False)", code: `from collections import OrderedDict\nd = OrderedDict([("a",1),("b",2),("c",3)])\nprint(d.popitem(last=False))`, output: `('a', 1)` },
        { title: "namedtuple with defaults", code: `from collections import namedtuple\nPoint = namedtuple("Point", ["x", "y"], defaults=[0, 0])\nprint(Point(), Point(3), Point(3, 4))`, output: `Point(x=0, y=0) Point(x=3, y=0) Point(x=3, y=4)` },
        { title: "namedtuple _asdict", code: `from collections import namedtuple\nPerson = namedtuple("Person", "name age city")\np = Person("Sara", 30, "Pune")\nprint(p._asdict())`, output: `{'name': 'Sara', 'age': 30, 'city': 'Pune'}` },
        { title: "namedtuple _replace", code: `from collections import namedtuple\nCard = namedtuple("Card", "suit rank")\nc = Card("H", "A")\nprint(c._replace(rank="K"))`, output: `Card(suit='H', rank='K')` },
        { title: "namedtuple as CSV row", code: `from collections import namedtuple\nStudent = namedtuple("Student", "id name marks")\nrows = [Student(1,"A",90), Student(2,"B",75)]\nfor r in rows: print(r.name, r.marks)`, output: `A 90\nB 75` },
        { title: "ChainMap — combine dicts", code: `from collections import ChainMap\ndefaults = {"color": "red", "size": "M"}\nuser = {"color": "blue"}\ncfg = ChainMap(user, defaults)\nprint(cfg["color"], cfg["size"])`, output: `blue M` },
        { title: "Top-K with Counter", code: `from collections import Counter\ndata = [1,1,1,2,2,3,3,3,3,4]\nprint(Counter(data).most_common(2))`, output: `[(3, 4), (1, 3)]` },
        { title: "Anagram groups (defaultdict)", code: `from collections import defaultdict\nwords = ["eat","tea","tan","ate","nat","bat"]\ng = defaultdict(list)\nfor w in words:\n    g[tuple(sorted(w))].append(w)\nprint(list(g.values()))`, output: `[['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]` },
        { title: "Frequency threshold filter", code: `from collections import Counter\nwords = "a b a c b a d e f g".split()\ntop = [w for w, c in Counter(words).items() if c >= 2]\nprint(top)`, output: `['a', 'b']` },
        { title: "Deque for BFS", code: `from collections import deque\ndef bfs(graph, start):\n    seen = {start}; q = deque([start])\n    while q:\n        node = q.popleft()\n        print(node, end=" ")\n        for nb in graph.get(node, []):\n            if nb not in seen: seen.add(nb); q.append(nb)\n\nbfs({"A":["B","C"], "B":["D"], "C":["D"], "D":[]}, "A")`, output: `A B C D ` },
        { title: "Rate limiter with deque", code: `from collections import deque\nimport time\nRATE = 3; WINDOW = 60\ncalls = deque()\ndef allowed():\n    now = time.time()\n    while calls and now - calls[0] > WINDOW:\n        calls.popleft()\n    if len(calls) < RATE:\n        calls.append(now); return True\n    return False\n\nprint(allowed(), allowed(), allowed(), allowed())`, output: `True True True False` },
        { title: "Counter set operations", code: `from collections import Counter\na = Counter("aabbc")\nb = Counter("bbbcd")\nprint(a & b)  # intersection (min)\nprint(a | b)  # union (max)`, output: `Counter({'b': 2, 'c': 1})\nCounter({'b': 3, 'a': 2, 'c': 1, 'd': 1})` },
        { title: "Combine Counters from lists", code: `from collections import Counter\nlists = [[1,2,2], [2,3,3], [1,3,4]]\nprint(sum([Counter(lst) for lst in lists], Counter()))`, output: `Counter({2: 3, 3: 3, 1: 2, 4: 1})` },
        { title: "Nested Counter (2D)", code: `from collections import Counter, defaultdict\nlogs = [("user1","GET"), ("user2","POST"), ("user1","GET"), ("user1","POST")]\nby_user = defaultdict(Counter)\nfor u, action in logs:\n    by_user[u][action] += 1\nprint(dict(by_user["user1"]))`, output: `{'GET': 2, 'POST': 1}` },
        { title: "defaultdict of ints for word length freq", code: `from collections import defaultdict\nwords = ["one", "two", "three", "four", "five", "six"]\ncount = defaultdict(int)\nfor w in words: count[len(w)] += 1\nprint(dict(count))`, output: `{3: 3, 5: 1, 4: 2}` },
        { title: "Rolling max with deque O(n)", code: `from collections import deque\ndef max_window(nums, k):\n    q, out = deque(), []\n    for i, n in enumerate(nums):\n        while q and nums[q[-1]] < n: q.pop()\n        q.append(i)\n        if q[0] == i - k: q.popleft()\n        if i >= k - 1: out.append(nums[q[0]])\n    return out\n\nprint(max_window([1,3,-1,-3,5,3,6,7], 3))`, output: `[3, 3, 5, 5, 6, 7]` }
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
    },
    {
      title: "Iterators & Generators — Practical",
      badge: "Iterators · 35+ examples",
      notes: ["Real-world use of generators for streaming, lazy evaluation, and memory efficiency."],
      examples: [
        { title: "Custom iterator class", code: `class Squares:\n    def __init__(self, n): self.n = n; self.i = 0\n    def __iter__(self): return self\n    def __next__(self):\n        if self.i >= self.n: raise StopIteration\n        self.i += 1\n        return self.i ** 2\n\nprint(list(Squares(5)))`, output: `[1, 4, 9, 16, 25]` },
        { title: "Simple generator function", code: `def count_up(n):\n    for i in range(1, n+1):\n        yield i\n\nprint(list(count_up(5)))`, output: `[1, 2, 3, 4, 5]` },
        { title: "Generator with two yields", code: `def two_stage():\n    yield "start"\n    yield "middle"\n    yield "end"\n\nprint(list(two_stage()))`, output: `['start', 'middle', 'end']` },
        { title: "Infinite generator (careful!)", code: `def naturals():\n    n = 1\n    while True:\n        yield n; n += 1\n\ng = naturals()\nprint([next(g) for _ in range(5)])`, output: `[1, 2, 3, 4, 5]` },
        { title: "Fibonacci generator", code: `def fib():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\nfrom itertools import islice\nprint(list(islice(fib(), 10)))`, output: `[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]` },
        { title: "Read large file line by line", code: `def read_lines(path):\n    with open(path) as f:\n        for line in f:\n            yield line.rstrip()\n\n# for line in read_lines("big.log"): process(line)\nprint("streamed")`, output: `streamed` },
        { title: "Generator expression memory-efficient", code: `# Instead of list of all squares up to 1M:\nsq = (x*x for x in range(1_000_000))\nprint(sum(sq))`, output: `333332833333500000` },
        { title: "Chain generators with yield from", code: `def sub1():\n    yield 1; yield 2\ndef sub2():\n    yield 3; yield 4\ndef combined():\n    yield from sub1()\n    yield from sub2()\n\nprint(list(combined()))`, output: `[1, 2, 3, 4]` },
        { title: "Generator with state", code: `def running_sum():\n    total = 0\n    while True:\n        x = yield total\n        total += x if x else 0\n\ng = running_sum(); next(g)\nprint(g.send(10), g.send(20), g.send(5))`, output: `10 30 35` },
        { title: "Lazy filter (generator)", code: `def evens(iterable):\n    for x in iterable:\n        if x % 2 == 0:\n            yield x\n\nprint(list(evens(range(10))))`, output: `[0, 2, 4, 6, 8]` },
        { title: "Lazy map (generator)", code: `def double(iterable):\n    for x in iterable:\n        yield x * 2\n\nprint(list(double([1, 2, 3, 4])))`, output: `[2, 4, 6, 8]` },
        { title: "Generator pipeline", code: `def gen(): return (x for x in range(10))\ndef ev(src): return (x for x in src if x % 2 == 0)\ndef sq(src): return (x*x for x in src)\n\nprint(list(sq(ev(gen()))))`, output: `[0, 4, 16, 36, 64]` },
        { title: "next() with default", code: `g = (x for x in range(3))\nprint(next(g), next(g), next(g), next(g, "done"))`, output: `0 1 2 done` },
        { title: "iter() on function with sentinel", code: `# Read lines until 'quit'\ninputs = iter(["hi", "bye", "quit"])\nfor line in iter(lambda: next(inputs), "quit"):\n    print(line)`, output: `hi\nbye` },
        { title: "enumerate is an iterator", code: `it = enumerate(["a", "b", "c"])\nprint(next(it), next(it))`, output: `(0, 'a') (1, 'b')` },
        { title: "zip is lazy", code: `import sys\nz = zip([1,2,3], "abc")\nprint(type(z).__name__)\nprint(list(z))`, output: `zip\n[(1, 'a'), (2, 'b'), (3, 'c')]` },
        { title: "map is lazy", code: `m = map(str.upper, ["a", "b", "c"])\nprint(next(m))\nprint(list(m))`, output: `A\n['B', 'C']` },
        { title: "filter is lazy", code: `f = filter(lambda x: x > 2, [1, 2, 3, 4])\nprint(list(f))`, output: `[3, 4]` },
        { title: "Batching with generator", code: `def batch(iterable, n):\n    buf = []\n    for x in iterable:\n        buf.append(x)\n        if len(buf) == n:\n            yield buf; buf = []\n    if buf: yield buf\n\nprint(list(batch(range(10), 3)))`, output: `[[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]` },
        { title: "Prime generator (sieve-like)", code: `def primes():\n    seen = []\n    n = 2\n    while True:\n        if all(n % p != 0 for p in seen if p*p <= n):\n            seen.append(n)\n            yield n\n        n += 1\n\nfrom itertools import islice\nprint(list(islice(primes(), 8)))`, output: `[2, 3, 5, 7, 11, 13, 17, 19]` },
        { title: "Reverse generator", code: `def reverse(seq):\n    for i in range(len(seq) - 1, -1, -1):\n        yield seq[i]\n\nprint(list(reverse([1,2,3,4,5])))`, output: `[5, 4, 3, 2, 1]` },
        { title: "Log file tail (streaming pattern)", code: `def tail(lines):\n    yield from lines[-3:]\n\nlogs = ["line1","line2","line3","line4","line5"]\nprint(list(tail(logs)))`, output: `['line3', 'line4', 'line5']` },
        { title: "Count from any start", code: `from itertools import count\nfrom itertools import islice\nprint(list(islice(count(100, 5), 5)))`, output: `[100, 105, 110, 115, 120]` },
        { title: "Take while condition", code: `from itertools import takewhile\nprint(list(takewhile(lambda x: x < 5, [1, 3, 4, 6, 2])))`, output: `[1, 3, 4]` },
        { title: "Drop while condition", code: `from itertools import dropwhile\nprint(list(dropwhile(lambda x: x < 5, [1, 3, 4, 6, 2])))`, output: `[6, 2]` },
        { title: "Compute average with generator", code: `def avg(nums):\n    total, count = 0, 0\n    for n in nums:\n        total += n; count += 1\n    return total / count if count else 0\n\ngen = (x for x in range(1, 11))\nprint(avg(gen))`, output: `5.5` },
        { title: "Generator returns value on stop", code: `def gen_ret():\n    yield 1; yield 2\n    return "done"\n\ng = gen_ret()\ntry:\n    while True: print(next(g))\nexcept StopIteration as e:\n    print(e.value)`, output: `1\n2\ndone` },
        { title: "Generator with try/finally cleanup", code: `def source():\n    try:\n        yield 1; yield 2; yield 3\n    finally:\n        print("cleanup")\n\ng = source()\nprint(next(g))\ng.close()`, output: `1\ncleanup` },
        { title: "Generator delegation for tree flatten", code: `def flatten(items):\n    for x in items:\n        if isinstance(x, list):\n            yield from flatten(x)\n        else:\n            yield x\n\nprint(list(flatten([1, [2, [3, [4]]], 5])))`, output: `[1, 2, 3, 4, 5]` },
        { title: "Generator vs list memory", code: `import sys\nL = [x*x for x in range(1000)]\nG = (x*x for x in range(1000))\nprint(sys.getsizeof(L) > sys.getsizeof(G))`, output: `True` },
        { title: "Simple co-routine style", code: `def echo():\n    while True:\n        msg = yield\n        print("Got:", msg)\n\ng = echo(); next(g)\ng.send("hi"); g.send("bye")`, output: `Got: hi\nGot: bye` },
        { title: "Unique elements (order-preserving)", code: `def unique(iterable):\n    seen = set()\n    for x in iterable:\n        if x not in seen:\n            seen.add(x); yield x\n\nprint(list(unique([1,3,2,3,1,4])))`, output: `[1, 3, 2, 4]` },
        { title: "Read numbers from string", code: `def numbers(text):\n    for word in text.split():\n        if word.lstrip("-").isdigit():\n            yield int(word)\n\nprint(sum(numbers("val 10 x 20 y 30")))`, output: `60` },
        { title: "Chunked reader (yield from list)", code: `def chunks(data, n):\n    for i in range(0, len(data), n):\n        yield data[i:i+n]\n\nprint(list(chunks("abcdefghi", 3)))`, output: `['abc', 'def', 'ghi']` },
        { title: "Range replacement (memory-safe)", code: `def frange(start, stop, step):\n    x = start\n    while x < stop:\n        yield x\n        x += step\n\nprint([round(x, 2) for x in frange(0, 1, 0.2)])`, output: `[0, 0.2, 0.4, 0.6, 0.8]` }
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
    },
    {
      title: "Decorators — Practical Patterns",
      badge: "Decorators · 35+ examples",
      notes: ["Real decorator patterns used in Flask/Django/FastAPI and production code."],
      examples: [
        { title: "Basic decorator (no args)", code: `def shout(fn):\n    def w():\n        return fn().upper()\n    return w\n\n@shout\ndef greet(): return "hello"\n\nprint(greet())`, output: `HELLO` },
        { title: "Decorator with *args, **kwargs", code: `def safe(fn):\n    def w(*a, **kw):\n        try: return fn(*a, **kw)\n        except Exception as e: return f"Error: {e}"\n    return w\n\n@safe\ndef div(a, b): return a / b\n\nprint(div(10, 0))`, output: `Error: division by zero` },
        { title: "Preserve function name with functools.wraps", code: `from functools import wraps\ndef log(fn):\n    @wraps(fn)\n    def w(*a, **kw):\n        return fn(*a, **kw)\n    return w\n\n@log\ndef greet(name): "docstring"; return f"Hi {name}"\n\nprint(greet.__name__, greet.__doc__)`, output: `greet docstring` },
        { title: "Decorator with arguments", code: `def repeat(times):\n    def deco(fn):\n        def w(*a, **kw):\n            for _ in range(times):\n                fn(*a, **kw)\n        return w\n    return deco\n\n@repeat(3)\ndef hi(): print("hi")\n\nhi()`, output: `hi\nhi\nhi` },
        { title: "Logging decorator", code: `def log_call(fn):\n    def w(*a, **kw):\n        print(f"CALL {fn.__name__}({a}, {kw})")\n        return fn(*a, **kw)\n    return w\n\n@log_call\ndef add(a, b): return a + b\n\nprint(add(2, 3))`, output: `CALL add((2, 3), {})\n5` },
        { title: "Retry on exception", code: `def retry(times=3):\n    def deco(fn):\n        def w(*a, **kw):\n            for i in range(times):\n                try: return fn(*a, **kw)\n                except Exception:\n                    if i == times-1: raise\n        return w\n    return deco\n\n@retry(2)\ndef unstable(): return "ok"\n\nprint(unstable())`, output: `ok` },
        { title: "Cache/memoize", code: `def memo(fn):\n    cache = {}\n    def w(*a):\n        if a not in cache: cache[a] = fn(*a)\n        return cache[a]\n    return w\n\n@memo\ndef fib(n): return n if n < 2 else fib(n-1) + fib(n-2)\n\nprint(fib(30))`, output: `832040` },
        { title: "lru_cache from functools", code: `from functools import lru_cache\n@lru_cache(maxsize=128)\ndef expensive(n):\n    return n * n\n\nfor i in range(3): expensive(i)\nprint(expensive.cache_info())`, output: `CacheInfo(hits=0, misses=3, maxsize=128, currsize=3)` },
        { title: "Auth check decorator", code: `def auth_required(fn):\n    def w(user, *a, **kw):\n        if not user.get("logged_in"): return "Unauthorized"\n        return fn(user, *a, **kw)\n    return w\n\n@auth_required\ndef dashboard(user): return f"Welcome {user['name']}"\n\nprint(dashboard({"logged_in": True, "name": "Sara"}))\nprint(dashboard({"logged_in": False}))`, output: `Welcome Sara\nUnauthorized` },
        { title: "Role-based access", code: `def role_required(role):\n    def deco(fn):\n        def w(user, *a):\n            if user.get("role") != role: return "Forbidden"\n            return fn(user, *a)\n        return w\n    return deco\n\n@role_required("admin")\ndef delete_user(u, uid): return f"deleted {uid}"\n\nprint(delete_user({"role":"admin"}, 42))\nprint(delete_user({"role":"user"}, 42))`, output: `deleted 42\nForbidden` },
        { title: "Validate positive args", code: `def positive(fn):\n    def w(*a):\n        if any(x < 0 for x in a): return "Negative not allowed"\n        return fn(*a)\n    return w\n\n@positive\ndef area(w, h): return w * h\n\nprint(area(5, 4))\nprint(area(-3, 4))`, output: `20\nNegative not allowed` },
        { title: "Count function calls", code: `def counted(fn):\n    fn.calls = 0\n    def w(*a, **kw):\n        fn.calls += 1\n        return fn(*a, **kw)\n    w.calls_from = lambda: fn.calls\n    return w\n\n@counted\ndef hello(): return "hi"\n\nfor _ in range(3): hello()\nprint(hello.calls_from())`, output: `3` },
        { title: "Convert result to type", code: `def to_type(t):\n    def deco(fn):\n        def w(*a, **kw): return t(fn(*a, **kw))\n        return w\n    return deco\n\n@to_type(list)\ndef nums(): return (x*2 for x in range(4))\n\nprint(nums())`, output: `[0, 2, 4, 6]` },
        { title: "Cache with TTL", code: `import time\ndef cache_ttl(seconds):\n    def deco(fn):\n        cache = {}\n        def w(*a):\n            now = time.time()\n            if a in cache and now - cache[a][1] < seconds:\n                return cache[a][0]\n            r = fn(*a); cache[a] = (r, now)\n            return r\n        return w\n    return deco\n\n@cache_ttl(60)\ndef fetch(key): return f"data:{key}"\n\nprint(fetch("A"))`, output: `data:A` },
        { title: "Rate limit (per second)", code: `import time\ndef rate_limit(per_sec):\n    def deco(fn):\n        last = [0]\n        def w(*a):\n            wait = 1/per_sec - (time.time() - last[0])\n            if wait > 0: time.sleep(wait)\n            last[0] = time.time()\n            return fn(*a)\n        return w\n    return deco\n\n@rate_limit(100)\ndef ping(): return "pong"\n\nprint(ping())`, output: `pong` },
        { title: "Type checking decorator", code: `def typecheck(*types):\n    def deco(fn):\n        def w(*a):\n            for arg, t in zip(a, types):\n                if not isinstance(arg, t):\n                    raise TypeError(f"Expected {t.__name__}")\n            return fn(*a)\n        return w\n    return deco\n\n@typecheck(int, int)\ndef add(a, b): return a + b\n\nprint(add(3, 4))`, output: `7` },
        { title: "Debug print", code: `def debug(fn):\n    def w(*a, **kw):\n        result = fn(*a, **kw)\n        print(f"{fn.__name__}{a} = {result}")\n        return result\n    return w\n\n@debug\ndef mul(a, b): return a * b\n\nmul(3, 5)`, output: `mul(3, 5) = 15` },
        { title: "Stack multiple decorators", code: `def bold(fn):\n    def w(): return "<b>" + fn() + "</b>"\n    return w\n\ndef italic(fn):\n    def w(): return "<i>" + fn() + "</i>"\n    return w\n\n@bold\n@italic\ndef text(): return "hi"\n\nprint(text())`, output: `<b><i>hi</i></b>` },
        { title: "Class-based decorator", code: `class CountCalls:\n    def __init__(self, fn):\n        self.fn = fn; self.count = 0\n    def __call__(self, *a):\n        self.count += 1\n        return self.fn(*a)\n\n@CountCalls\ndef hi(): return "hi"\n\nhi(); hi(); hi()\nprint(hi.count)`, output: `3` },
        { title: "Property as decorator (getter)", code: `class C:\n    def __init__(self, v): self._v = v\n    @property\n    def value(self): return self._v\n\nprint(C(42).value)`, output: `42` },
        { title: "Deprecation warning", code: `import warnings\ndef deprecated(fn):\n    def w(*a, **kw):\n        warnings.warn(f"{fn.__name__} is deprecated", DeprecationWarning, stacklevel=2)\n        return fn(*a, **kw)\n    return w\n\n@deprecated\ndef old_fn(): return "still works"\n\nprint(old_fn())`, output: `still works` },
        { title: "Ensure single instance (singleton)", code: `def singleton(cls):\n    inst = {}\n    def w(*a, **kw):\n        if cls not in inst: inst[cls] = cls(*a, **kw)\n        return inst[cls]\n    return w\n\n@singleton\nclass Config:\n    def __init__(self): self.debug = True\n\nprint(Config() is Config())`, output: `True` },
        { title: "Convert to JSON output", code: `import json\ndef as_json(fn):\n    def w(*a, **kw): return json.dumps(fn(*a, **kw))\n    return w\n\n@as_json\ndef user(uid): return {"id": uid, "name": "Sara"}\n\nprint(user(1))`, output: `{"id": 1, "name": "Sara"}` },
        { title: "Route registration (Flask-style)", code: `routes = {}\ndef route(path):\n    def deco(fn):\n        routes[path] = fn\n        return fn\n    return deco\n\n@route("/hello")\ndef hello(): return "world"\n\nprint(routes["/hello"]())`, output: `world` },
        { title: "Method-level timing (in class)", code: `import time\ndef time_it(fn):\n    def w(self, *a):\n        start = time.perf_counter()\n        r = fn(self, *a)\n        print(f"{fn.__name__}: {time.perf_counter()-start:.4f}s")\n        return r\n    return w\n\nclass DB:\n    @time_it\n    def query(self, sql): return [1, 2, 3]\n\nDB().query("SELECT 1")`, output: `query: 0.0000s` },
        { title: "Validate return value", code: `def not_none(fn):\n    def w(*a, **kw):\n        r = fn(*a, **kw)\n        if r is None: raise ValueError("None not allowed")\n        return r\n    return w\n\n@not_none\ndef find(x): return x if x > 0 else None\n\nprint(find(5))`, output: `5` },
        { title: "Environment guard", code: `import os\ndef env_only(env_name):\n    def deco(fn):\n        def w(*a):\n            if os.environ.get("ENV") == env_name:\n                return fn(*a)\n            return "skipped"\n        return w\n    return deco\n\n@env_only("prod")\ndef dangerous(): return "ran"\n\nprint(dangerous())`, output: `skipped` },
        { title: "Feature flag decorator", code: `flags = {"new_ui": False}\ndef feature(name):\n    def deco(fn):\n        def w(*a):\n            if flags.get(name): return fn(*a)\n            return "off"\n        return w\n    return deco\n\n@feature("new_ui")\ndef ui(): return "new version"\n\nprint(ui())`, output: `off` },
        { title: "Async decorator (sketch)", code: `import asyncio, functools\ndef async_timer(fn):\n    @functools.wraps(fn)\n    async def w(*a, **kw):\n        import time; s = time.time()\n        r = await fn(*a, **kw)\n        print(f"{time.time()-s:.4f}s"); return r\n    return w\n\n@async_timer\nasync def work(): await asyncio.sleep(0.01); return "done"\n\nprint(asyncio.run(work()))`, output: `0.0100s\ndone` },
        { title: "Method call recorder", code: `def record(fn):\n    fn.calls = []\n    def w(*a, **kw):\n        fn.calls.append((a, kw))\n        return fn(*a, **kw)\n    w.history = lambda: fn.calls\n    return w\n\n@record\ndef api(x): return x\n\napi(1); api(2, 3)\nprint(api.history())`, output: `[((1,), {}), ((2, 3), {})]` }
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
    },
    {
      title: "Advanced Python — Idioms & Patterns",
      badge: "Advanced · 45+ examples",
      notes: ["Powerful Python idioms that separate juniors from seniors."],
      examples: [
        { title: "List comprehension with condition", code: `nums = [1,2,3,4,5,6]\nsquares_evens = [x*x for x in nums if x % 2 == 0]\nprint(squares_evens)`, output: `[4, 16, 36]` },
        { title: "Nested comprehension (matrix)", code: `m = [[i+j for j in range(3)] for i in range(3)]\nprint(m)`, output: `[[0, 1, 2], [1, 2, 3], [2, 3, 4]]` },
        { title: "Flatten with comprehension", code: `nested = [[1,2],[3,4],[5,6]]\nprint([x for row in nested for x in row])`, output: `[1, 2, 3, 4, 5, 6]` },
        { title: "Conditional expression in comp", code: `nums = [1,2,3,4,5]\nprint([("even" if x%2==0 else "odd") for x in nums])`, output: `['odd', 'even', 'odd', 'even', 'odd']` },
        { title: "Dict comprehension from list", code: `words = ["apple", "banana", "cherry"]\nprint({w: len(w) for w in words})`, output: `{'apple': 5, 'banana': 6, 'cherry': 6}` },
        { title: "Set comp — unique word lengths", code: `s = "the quick brown fox jumps"\nprint({len(w) for w in s.split()})`, output: `{3, 5}` },
        { title: "Generator comp for sum", code: `print(sum(x*x for x in range(1, 11)))`, output: `385` },
        { title: "zip to swap keys/values", code: `d = {"a":1, "b":2}\nprint(dict(zip(d.values(), d.keys())))`, output: `{1: 'a', 2: 'b'}` },
        { title: "zip with strict (3.10+)", code: `try:\n    print(list(zip([1,2,3], "ab", strict=True)))\nexcept ValueError as e:\n    print(e)`, output: `zip() argument 2 is shorter than argument 1` },
        { title: "map with multiple iterables", code: `print(list(map(pow, [2,3,4], [3,2,1])))`, output: `[8, 9, 4]` },
        { title: "filter to keep truthy", code: `print(list(filter(None, [0, 1, "", "a", [], [1]])))`, output: `[1, 'a', [1]]` },
        { title: "reduce with initial", code: `from functools import reduce\nprint(reduce(lambda acc, x: acc + [x*2], [1,2,3], []))`, output: `[2, 4, 6]` },
        { title: "any() for existence check", code: `emails = ["a@b.com", "invalid", "c@d.org"]\nhas_gmail = any("gmail" in e for e in emails)\nprint(has_gmail)`, output: `False` },
        { title: "all() for validation", code: `scores = [80, 75, 92, 60]\nall_pass = all(s >= 50 for s in scores)\nprint(all_pass)`, output: `True` },
        { title: "sorted by multiple keys", code: `people = [("A",30,"NY"),("B",25,"NY"),("C",25,"LA")]\nprint(sorted(people, key=lambda p: (p[1], p[2])))`, output: `[('C', 25, 'LA'), ('B', 25, 'NY'), ('A', 30, 'NY')]` },
        { title: "sorted with itemgetter", code: `from operator import itemgetter\npeople = [{"name":"A","age":30},{"name":"B","age":25}]\nprint(sorted(people, key=itemgetter("age")))`, output: `[{'name': 'B', 'age': 25}, {'name': 'A', 'age': 30}]` },
        { title: "sorted with attrgetter", code: `from operator import attrgetter\nfrom collections import namedtuple\nP = namedtuple("P", "name age")\nps = [P("A", 30), P("B", 25)]\nprint(sorted(ps, key=attrgetter("age")))`, output: `[P(name='B', age=25), P(name='A', age=30)]` },
        { title: "min/max with key", code: `words = ["hi", "hello", "hey"]\nprint(max(words, key=len))\nprint(min(words, key=len))`, output: `hello\nhi` },
        { title: "sum with start", code: `nums = [[1,2],[3,4],[5]]\nprint(sum(nums, []))`, output: `[1, 2, 3, 4, 5]` },
        { title: "reversed() on sequence", code: `print(list(reversed([1,2,3,4])))\nprint("".join(reversed("hello")))`, output: `[4, 3, 2, 1]\nolleh` },
        { title: "enumerate with unpacking", code: `for i, (name, age) in enumerate([("A",10),("B",20)], 1):\n    print(i, name, age)`, output: `1 A 10\n2 B 20` },
        { title: "Dictionary get with default", code: `d = {"a": 1}\nprint(d.get("b", 0))\nprint(d.get("a", 0))`, output: `0\n1` },
        { title: "setdefault avoids branching", code: `groups = {}\nfor word in ["apple","ant","bee"]:\n    groups.setdefault(word[0], []).append(word)\nprint(groups)`, output: `{'a': ['apple', 'ant'], 'b': ['bee']}` },
        { title: "Dict merge (3.9+ |)", code: `a = {"x": 1}; b = {"y": 2}\nprint(a | b)`, output: `{'x': 1, 'y': 2}` },
        { title: "Dict update (in place)", code: `a = {"x": 1}\na |= {"y": 2}\nprint(a)`, output: `{'x': 1, 'y': 2}` },
        { title: "Unpacking in function call", code: `def add(a, b, c): return a + b + c\nnums = [1, 2, 3]\nprint(add(*nums))`, output: `6` },
        { title: "Dict unpacking in function", code: `def greet(name, age): return f"{name}, {age}"\ninfo = {"name": "Sara", "age": 30}\nprint(greet(**info))`, output: `Sara, 30` },
        { title: "Star in tuple assignment", code: `first, *middle, last = [1, 2, 3, 4, 5]\nprint(first, middle, last)`, output: `1 [2, 3, 4] 5` },
        { title: "Merge lists with *", code: `a = [1, 2]; b = [3, 4]\nprint([*a, *b, 5])`, output: `[1, 2, 3, 4, 5]` },
        { title: "Ternary in list", code: `nums = [-1, 2, -3, 4]\nprint([("+" if n > 0 else "-") + str(abs(n)) for n in nums])`, output: `['-1', '+2', '-3', '+4']` },
        { title: "Chain generators (itertools.chain)", code: `from itertools import chain\nprint(list(chain([1,2], [3], [4,5])))`, output: `[1, 2, 3, 4, 5]` },
        { title: "Unpack dict into list of tuples", code: `d = {"a":1, "b":2, "c":3}\nprint(sorted(d.items(), key=lambda kv: -kv[1]))`, output: `[('c', 3), ('b', 2), ('a', 1)]` },
        { title: "Group by using itertools", code: `from itertools import groupby\ndata = sorted([("A",1),("B",1),("C",2)], key=lambda x: x[1])\nfor k, g in groupby(data, key=lambda x: x[1]):\n    print(k, list(g))`, output: `1 [('A', 1), ('B', 1)]\n2 [('C', 2)]` },
        { title: "Walrus in list comp", code: `nums = [1, 2, 3, 4, 5]\nprint([y for x in nums if (y := x*x) > 5])`, output: `[9, 16, 25]` },
        { title: "Walrus in while loop", code: `data = iter([1, 2, 3, 0, 4])\nwhile (x := next(data)) != 0:\n    print(x, end=" ")`, output: `1 2 3 ` },
        { title: "Chained conditional", code: `x = 5\nresult = "small" if x < 10 else ("medium" if x < 100 else "big")\nprint(result)`, output: `small` },
        { title: "Convert dict to list of dicts", code: `d = {"a": 1, "b": 2, "c": 3}\nrecords = [{"key": k, "val": v} for k, v in d.items()]\nprint(records)`, output: `[{'key': 'a', 'val': 1}, {'key': 'b', 'val': 2}, {'key': 'c', 'val': 3}]` },
        { title: "Filter dict by value", code: `d = {"a": 1, "b": 20, "c": 3, "d": 40}\nprint({k:v for k,v in d.items() if v > 10})`, output: `{'b': 20, 'd': 40}` },
        { title: "Invert dict with grouped values", code: `d = {"a": 1, "b": 2, "c": 1}\nfrom collections import defaultdict\ninv = defaultdict(list)\nfor k, v in d.items(): inv[v].append(k)\nprint(dict(inv))`, output: `{1: ['a', 'c'], 2: ['b']}` },
        { title: "Cumulative sum with itertools", code: `from itertools import accumulate\nprint(list(accumulate([1,2,3,4,5])))`, output: `[1, 3, 6, 10, 15]` },
        { title: "Running max with accumulate", code: `from itertools import accumulate\nprint(list(accumulate([3, 1, 4, 1, 5, 9, 2], max)))`, output: `[3, 3, 4, 4, 5, 9, 9]` },
        { title: "Chunked with itertools.batched (3.12+)", code: `# from itertools import batched\n# print(list(batched(range(10), 3)))\n# Fallback:\ndef batched(it, n):\n    it = iter(it)\n    while (b := list(__import__('itertools').islice(it, n))): yield b\nprint(list(batched(range(10), 3)))`, output: `[[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]` },
        { title: "Pairwise (3.10+)", code: `# from itertools import pairwise\n# print(list(pairwise([1,2,3,4])))\ndef pw(seq): return list(zip(seq, seq[1:]))\nprint(pw([1,2,3,4]))`, output: `[(1, 2), (2, 3), (3, 4)]` },
        { title: "Boolean flag from set membership", code: `admins = {"alice", "bob"}\nusers = ["alice", "carol", "bob"]\nprint([u in admins for u in users])`, output: `[True, False, True]` },
        { title: "Unpacking function result", code: `def coords(): return 3, 4, 5\nx, y, z = coords()\nprint(x, y, z)`, output: `3 4 5` },
        { title: "Discard result with _", code: `def get(): return 1, 2, 3\n_, mid, _ = get()\nprint(mid)`, output: `2` },
        { title: "in operator on string vs list", code: `print("cat" in "concat")\nprint("cat" in ["cat", "dog"])`, output: `True\nTrue` },
        { title: "Bool from expression", code: `age = 20\ncan_vote = age >= 18\nprint(can_vote, type(can_vote).__name__)`, output: `True bool` }
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
    },
    {
      title: "Multithreading — Practical",
      badge: "Threading · 25+ examples",
      notes: ["Real-world threading patterns for I/O-bound work. Remember: GIL prevents true CPU parallelism."],
      examples: [
        { title: "Simple thread with args", code: `import threading\ndef greet(name):\n    print(f"Hi {name}")\nt = threading.Thread(target=greet, args=("Sara",))\nt.start(); t.join()`, output: `Hi Sara` },
        { title: "Multiple threads run concurrently", code: `import threading, time\ndef task(n):\n    time.sleep(0.01)\n    print(f"task {n} done")\n\nts = [threading.Thread(target=task, args=(i,)) for i in range(3)]\nfor t in ts: t.start()\nfor t in ts: t.join()`, output: `task 0 done\ntask 1 done\ntask 2 done` },
        { title: "Thread subclass", code: `import threading\nclass Worker(threading.Thread):\n    def __init__(self, n): super().__init__(); self.n = n\n    def run(self): print(f"worker {self.n}")\n\nw = Worker(1); w.start(); w.join()`, output: `worker 1` },
        { title: "Thread name and identity", code: `import threading\ndef show():\n    t = threading.current_thread()\n    print(t.name, t.ident is not None)\n\nthreading.Thread(target=show, name="MyThread").start()`, output: `MyThread True` },
        { title: "Daemon thread (dies with main)", code: `import threading, time\ndef bg():\n    while True:\n        time.sleep(0.1)\n\nt = threading.Thread(target=bg, daemon=True)\nt.start()\nprint("main done — daemon killed")`, output: `main done — daemon killed` },
        { title: "RLock (reentrant)", code: `import threading\nlock = threading.RLock()\ndef outer():\n    with lock:\n        inner()\ndef inner():\n    with lock:  # OK — same thread\n        print("nested lock OK")\nouter()`, output: `nested lock OK` },
        { title: "Semaphore (max N at once)", code: `import threading\nsem = threading.Semaphore(2)\ndef task(n):\n    with sem:\n        print(f"in {n}")\n\nfor i in range(3):\n    threading.Thread(target=task, args=(i,)).start()`, output: `in 0\nin 1\nin 2` },
        { title: "Event flag for signaling", code: `import threading\nready = threading.Event()\ndef waiter():\n    ready.wait()\n    print("got signal")\n\nt = threading.Thread(target=waiter)\nt.start()\nready.set(); t.join()`, output: `got signal` },
        { title: "Condition variable", code: `import threading\ncv = threading.Condition()\ndata = []\ndef producer():\n    with cv:\n        data.append(42); cv.notify()\ndef consumer():\n    with cv:\n        while not data: cv.wait()\n        print(data.pop())\n\nc = threading.Thread(target=consumer); c.start()\nproducer(); c.join()`, output: `42` },
        { title: "Queue for producer-consumer", code: `import threading, queue\nq = queue.Queue()\ndef producer():\n    for i in range(3): q.put(i)\n    q.put(None)  # sentinel\ndef consumer():\n    while (item := q.get()) is not None:\n        print(item)\n\nthreading.Thread(target=producer).start()\nconsumer()`, output: `0\n1\n2` },
        { title: "ThreadPoolExecutor.map", code: `from concurrent.futures import ThreadPoolExecutor\ndef square(n): return n * n\nwith ThreadPoolExecutor(4) as pool:\n    print(list(pool.map(square, [1,2,3,4,5])))`, output: `[1, 4, 9, 16, 25]` },
        { title: "ThreadPoolExecutor.submit + Future", code: `from concurrent.futures import ThreadPoolExecutor\ndef work(n): return n * 10\nwith ThreadPoolExecutor(2) as pool:\n    future = pool.submit(work, 5)\n    print(future.result())`, output: `50` },
        { title: "as_completed for streaming results", code: `from concurrent.futures import ThreadPoolExecutor, as_completed\nimport time\ndef slow(n): time.sleep(0.01 * (5-n)); return n\nwith ThreadPoolExecutor(4) as pool:\n    fs = [pool.submit(slow, i) for i in range(4)]\n    for f in as_completed(fs):\n        print(f.result(), end=" ")`, output: `3 2 1 0 ` },
        { title: "Timeout on Future.result", code: `from concurrent.futures import ThreadPoolExecutor, TimeoutError\nimport time\ndef slow(): time.sleep(1); return "done"\nwith ThreadPoolExecutor() as pool:\n    f = pool.submit(slow)\n    try:\n        print(f.result(timeout=0.05))\n    except TimeoutError:\n        print("timed out")`, output: `timed out` },
        { title: "Thread-local storage", code: `import threading\ndata = threading.local()\ndef worker(name):\n    data.name = name\n    print(f"thread has: {data.name}")\n\nfor n in ["A", "B"]:\n    threading.Thread(target=worker, args=(n,)).start()`, output: `thread has: A\nthread has: B` },
        { title: "Race condition demo (buggy)", code: `import threading\nx = 0\ndef inc():\n    global x\n    for _ in range(10000): x += 1\n\nts = [threading.Thread(target=inc) for _ in range(4)]\nfor t in ts: t.start()\nfor t in ts: t.join()\nprint("<= 40000")`, output: `<= 40000` },
        { title: "Barrier for synchronized start", code: `import threading, time\nb = threading.Barrier(3)\ndef racer(n):\n    b.wait()  # all wait until 3 arrive\n    print(f"go {n}")\n\nfor i in range(3):\n    threading.Thread(target=racer, args=(i,)).start()`, output: `go 0\ngo 1\ngo 2` },
        { title: "Timer thread (runs after delay)", code: `import threading\ndef hello():\n    print("delayed hello")\n\nt = threading.Timer(0.05, hello)\nt.start(); t.join()`, output: `delayed hello` },
        { title: "Active thread count", code: `import threading, time\ndef task(): time.sleep(0.05)\nfor _ in range(3):\n    threading.Thread(target=task).start()\ntime.sleep(0.01)\nprint(threading.active_count() >= 1)`, output: `True` },
        { title: "join with timeout", code: `import threading, time\ndef slow(): time.sleep(1)\nt = threading.Thread(target=slow)\nt.start()\nt.join(timeout=0.05)\nprint("still alive?", t.is_alive())`, output: `still alive? True` },
        { title: "Fetch URLs concurrently (pattern)", code: `from concurrent.futures import ThreadPoolExecutor\nurls = ["url1", "url2", "url3"]\ndef fetch(u): return f"data_{u}"\nwith ThreadPoolExecutor(5) as pool:\n    results = list(pool.map(fetch, urls))\nprint(results)`, output: `['data_url1', 'data_url2', 'data_url3']` },
        { title: "Bounded semaphore (over-release protection)", code: `import threading\nsem = threading.BoundedSemaphore(2)\nsem.acquire(); sem.acquire()\nsem.release(); sem.release()\ntry:\n    sem.release()  # over-release\nexcept ValueError as e:\n    print(str(e)[:30])`, output: `Semaphore released too many ti` },
        { title: "with-lock ensures release on error", code: `import threading\nlock = threading.Lock()\ntry:\n    with lock:\n        raise ValueError("oops")\nexcept ValueError:\n    pass\nprint("lock free?", not lock.locked())`, output: `lock free? True` },
        { title: "Parallel sum with threads", code: `from concurrent.futures import ThreadPoolExecutor\ndef part_sum(chunk): return sum(chunk)\ndata = list(range(1000))\nchunks = [data[i:i+250] for i in range(0, 1000, 250)]\nwith ThreadPoolExecutor(4) as p:\n    total = sum(p.map(part_sum, chunks))\nprint(total)`, output: `499500` },
        { title: "Stop event to shut down worker", code: `import threading, time\nstop = threading.Event()\ndef worker():\n    while not stop.is_set():\n        time.sleep(0.01)\n    print("stopping")\n\nt = threading.Thread(target=worker); t.start()\nstop.set(); t.join()`, output: `stopping` }
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
    },
    {
      title: "Multiprocessing — Practical",
      badge: "Multiprocessing · 20+ examples",
      notes: ["Use multiprocessing for CPU-bound work — it bypasses the GIL by using separate processes."],
      examples: [
        { title: "Process with arguments", code: `from multiprocessing import Process\ndef worker(name):\n    print(f"hello {name}")\nif __name__ == "__main__":\n    p = Process(target=worker, args=("Sara",))\n    p.start(); p.join()`, output: `hello Sara` },
        { title: "Multiple processes in parallel", code: `from multiprocessing import Process\ndef task(n): print(f"task {n}")\nif __name__ == "__main__":\n    procs = [Process(target=task, args=(i,)) for i in range(3)]\n    for p in procs: p.start()\n    for p in procs: p.join()`, output: `task 0\ntask 1\ntask 2` },
        { title: "Get process PID", code: `import os\nfrom multiprocessing import Process\ndef show(): print("PID:", os.getpid())\nif __name__ == "__main__":\n    p = Process(target=show); p.start(); p.join()`, output: `PID: 12345` },
        { title: "Pool.map for CPU-heavy work", code: `from multiprocessing import Pool\ndef square(n): return n * n\nif __name__ == "__main__":\n    with Pool(4) as p:\n        print(p.map(square, [1,2,3,4,5]))`, output: `[1, 4, 9, 16, 25]` },
        { title: "Pool.starmap for multi-arg", code: `from multiprocessing import Pool\ndef add(a, b): return a + b\nif __name__ == "__main__":\n    with Pool(2) as p:\n        print(p.starmap(add, [(1,2),(3,4),(5,6)]))`, output: `[3, 7, 11]` },
        { title: "Pool.imap for streaming results", code: `from multiprocessing import Pool\ndef work(n): return n * 2\nif __name__ == "__main__":\n    with Pool(2) as p:\n        for r in p.imap(work, range(4)):\n            print(r, end=" ")`, output: `0 2 4 6 ` },
        { title: "Pool.apply_async", code: `from multiprocessing import Pool\ndef sq(n): return n*n\nif __name__ == "__main__":\n    with Pool(2) as p:\n        r = p.apply_async(sq, (5,))\n        print(r.get())`, output: `25` },
        { title: "Queue between processes", code: `from multiprocessing import Process, Queue\ndef producer(q):\n    for i in range(3): q.put(i)\n    q.put(None)\ndef consumer(q):\n    while (x := q.get()) is not None:\n        print(x, end=" ")\nif __name__ == "__main__":\n    q = Queue()\n    Process(target=producer, args=(q,)).start()\n    Process(target=consumer, args=(q,)).start()`, output: `0 1 2 ` },
        { title: "Pipe for two-way", code: `from multiprocessing import Process, Pipe\ndef child(conn):\n    conn.send("hi from child")\n    conn.close()\nif __name__ == "__main__":\n    parent, child_c = Pipe()\n    p = Process(target=child, args=(child_c,))\n    p.start(); print(parent.recv()); p.join()`, output: `hi from child` },
        { title: "Shared Value across processes", code: `from multiprocessing import Process, Value\ndef inc(counter):\n    with counter.get_lock():\n        counter.value += 1\nif __name__ == "__main__":\n    c = Value("i", 0)\n    ps = [Process(target=inc, args=(c,)) for _ in range(5)]\n    for p in ps: p.start()\n    for p in ps: p.join()\n    print(c.value)`, output: `5` },
        { title: "Manager for shared list", code: `from multiprocessing import Process, Manager\ndef work(lst, n):\n    lst.append(n * n)\nif __name__ == "__main__":\n    with Manager() as m:\n        shared = m.list()\n        ps = [Process(target=work, args=(shared, i)) for i in range(4)]\n        for p in ps: p.start()\n        for p in ps: p.join()\n        print(sorted(shared))`, output: `[0, 1, 4, 9]` },
        { title: "ProcessPoolExecutor.map", code: `from concurrent.futures import ProcessPoolExecutor\ndef cube(n): return n ** 3\nif __name__ == "__main__":\n    with ProcessPoolExecutor(2) as p:\n        print(list(p.map(cube, [1,2,3,4])))`, output: `[1, 8, 27, 64]` },
        { title: "Parallel CPU-bound computation", code: `from multiprocessing import Pool\ndef heavy(n): return sum(i*i for i in range(n))\nif __name__ == "__main__":\n    with Pool(4) as p:\n        print(sum(p.map(heavy, [10000]*4)))`, output: `1333233340000` },
        { title: "cpu_count", code: `from multiprocessing import cpu_count\nprint("CPUs:", cpu_count() >= 1)`, output: `CPUs: True` },
        { title: "Daemon process", code: `from multiprocessing import Process\nimport time\ndef bg():\n    while True: time.sleep(0.05)\nif __name__ == "__main__":\n    p = Process(target=bg, daemon=True)\n    p.start()\n    print("main done")`, output: `main done` },
        { title: "Pool with chunksize", code: `from multiprocessing import Pool\ndef sq(n): return n*n\nif __name__ == "__main__":\n    with Pool(2) as p:\n        print(p.map(sq, range(10), chunksize=5))`, output: `[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]` },
        { title: "Pool.map_async", code: `from multiprocessing import Pool\ndef double(n): return n * 2\nif __name__ == "__main__":\n    with Pool(2) as p:\n        r = p.map_async(double, [1,2,3])\n        print(r.get(timeout=5))`, output: `[2, 4, 6]` },
        { title: "Fork vs Spawn context", code: `import multiprocessing as mp\ndef work(): print("hello from process")\nif __name__ == "__main__":\n    ctx = mp.get_context("spawn")\n    p = ctx.Process(target=work)\n    p.start(); p.join()`, output: `hello from process` },
        { title: "Error handling with Pool", code: `from multiprocessing import Pool\ndef bad(n):\n    if n == 2: raise ValueError("no 2")\n    return n * 10\nif __name__ == "__main__":\n    with Pool(2) as p:\n        try:\n            p.map(bad, [1,2,3])\n        except ValueError as e:\n            print("caught:", e)`, output: `caught: no 2` },
        { title: "Terminate a process", code: `from multiprocessing import Process\nimport time\ndef loop():\n    while True: time.sleep(0.1)\nif __name__ == "__main__":\n    p = Process(target=loop); p.start()\n    p.terminate(); p.join()\n    print("terminated:", p.exitcode is not None)`, output: `terminated: True` },
        { title: "Process name", code: `from multiprocessing import Process, current_process\ndef show(): print(current_process().name)\nif __name__ == "__main__":\n    Process(target=show, name="Worker-1").start()`, output: `Worker-1` }
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
    },
    {
      title: "Async — Practical Patterns",
      badge: "Async · 25+ examples",
      notes: ["Real asyncio patterns for high-concurrency I/O. Use for network calls, DB queries, WebSockets."],
      examples: [
        { title: "Basic coroutine", code: `import asyncio\nasync def hi():\n    return "hello"\nprint(asyncio.run(hi()))`, output: `hello` },
        { title: "Sequential vs concurrent (timing)", code: `import asyncio, time\nasync def wait(n):\n    await asyncio.sleep(n)\n    return n\n\nasync def concurrent():\n    return await asyncio.gather(wait(0.1), wait(0.1), wait(0.1))\n\nstart = time.time()\nasyncio.run(concurrent())\nprint(f"{time.time()-start:.2f}s (parallel)")`, output: `0.10s (parallel)` },
        { title: "asyncio.create_task", code: `import asyncio\nasync def work(n):\n    await asyncio.sleep(0.01)\n    return n * 2\nasync def main():\n    t1 = asyncio.create_task(work(1))\n    t2 = asyncio.create_task(work(2))\n    print(await t1, await t2)\nasyncio.run(main())`, output: `2 4` },
        { title: "asyncio.gather with multiple", code: `import asyncio\nasync def get(url):\n    await asyncio.sleep(0.01)\n    return f"data_{url}"\nasync def main():\n    return await asyncio.gather(*[get(u) for u in ["a","b","c"]])\nprint(asyncio.run(main()))`, output: `['data_a', 'data_b', 'data_c']` },
        { title: "gather with return_exceptions", code: `import asyncio\nasync def maybe_fail(n):\n    if n == 2: raise ValueError("bad")\n    return n\nasync def main():\n    return await asyncio.gather(maybe_fail(1), maybe_fail(2), maybe_fail(3), return_exceptions=True)\nprint(asyncio.run(main()))`, output: `[1, ValueError('bad'), 3]` },
        { title: "asyncio.wait_for (timeout)", code: `import asyncio\nasync def slow():\n    await asyncio.sleep(1)\nasync def main():\n    try:\n        await asyncio.wait_for(slow(), timeout=0.05)\n    except asyncio.TimeoutError:\n        print("timed out")\nasyncio.run(main())`, output: `timed out` },
        { title: "asyncio.as_completed", code: `import asyncio\nasync def work(n):\n    await asyncio.sleep(0.01 * (4-n))\n    return n\nasync def main():\n    tasks = [work(i) for i in range(4)]\n    for coro in asyncio.as_completed(tasks):\n        r = await coro\n        print(r, end=" ")\nasyncio.run(main())`, output: `3 2 1 0 ` },
        { title: "asyncio.sleep vs time.sleep", code: `import asyncio\nasync def bad():\n    import time; time.sleep(0.01)  # blocks event loop!\nasync def good():\n    await asyncio.sleep(0.01)  # yields control\nasyncio.run(good())\nprint("good approach")`, output: `good approach` },
        { title: "asyncio.Queue", code: `import asyncio\nasync def producer(q):\n    for i in range(3): await q.put(i)\n    await q.put(None)\nasync def consumer(q):\n    while (x := await q.get()) is not None:\n        print(x, end=" ")\nasync def main():\n    q = asyncio.Queue()\n    await asyncio.gather(producer(q), consumer(q))\nasyncio.run(main())`, output: `0 1 2 ` },
        { title: "async with (context manager)", code: `import asyncio\nclass Session:\n    async def __aenter__(self): print("open"); return self\n    async def __aexit__(self, *a): print("close")\nasync def main():\n    async with Session():\n        print("using")\nasyncio.run(main())`, output: `open\nusing\nclose` },
        { title: "async for (async iterator)", code: `import asyncio\nasync def counter(n):\n    for i in range(n):\n        await asyncio.sleep(0.001)\n        yield i\nasync def main():\n    async for x in counter(4):\n        print(x, end=" ")\nasyncio.run(main())`, output: `0 1 2 3 ` },
        { title: "asyncio.Semaphore (throttle)", code: `import asyncio\nsem = asyncio.Semaphore(2)\nasync def limited(n):\n    async with sem:\n        await asyncio.sleep(0.01)\n        return n\nasync def main():\n    return await asyncio.gather(*[limited(i) for i in range(4)])\nprint(asyncio.run(main()))`, output: `[0, 1, 2, 3]` },
        { title: "asyncio.Lock", code: `import asyncio\nlock = asyncio.Lock()\ncounter = 0\nasync def inc():\n    global counter\n    async with lock:\n        counter += 1\nasync def main():\n    await asyncio.gather(*[inc() for _ in range(5)])\nasyncio.run(main())\nprint(counter)`, output: `5` },
        { title: "asyncio.Event", code: `import asyncio\nasync def waiter(event):\n    await event.wait()\n    print("triggered")\nasync def main():\n    e = asyncio.Event()\n    t = asyncio.create_task(waiter(e))\n    await asyncio.sleep(0.01)\n    e.set()\n    await t\nasyncio.run(main())`, output: `triggered` },
        { title: "Cancel a task", code: `import asyncio\nasync def slow():\n    try:\n        await asyncio.sleep(10)\n    except asyncio.CancelledError:\n        print("cancelled"); raise\nasync def main():\n    t = asyncio.create_task(slow())\n    await asyncio.sleep(0.01); t.cancel()\n    try: await t\n    except asyncio.CancelledError: print("done")\nasyncio.run(main())`, output: `cancelled\ndone` },
        { title: "asyncio.shield (prevent cancel)", code: `import asyncio\nasync def critical():\n    await asyncio.sleep(0.02)\n    return "done"\nasync def main():\n    t = asyncio.create_task(critical())\n    r = await asyncio.shield(t)\n    print(r)\nasyncio.run(main())`, output: `done` },
        { title: "TaskGroup (Python 3.11+)", code: `import asyncio\nasync def work(n):\n    await asyncio.sleep(0.01)\n    return n\nasync def main():\n    async with asyncio.TaskGroup() as tg:\n        r1 = tg.create_task(work(1))\n        r2 = tg.create_task(work(2))\n    print(r1.result(), r2.result())\nasyncio.run(main())`, output: `1 2` },
        { title: "run_in_executor for sync code", code: `import asyncio, time\ndef blocking(): time.sleep(0.01); return "sync-done"\nasync def main():\n    loop = asyncio.get_event_loop()\n    r = await loop.run_in_executor(None, blocking)\n    print(r)\nasyncio.run(main())`, output: `sync-done` },
        { title: "Timeout context (3.11+)", code: `import asyncio\nasync def slow(): await asyncio.sleep(1)\nasync def main():\n    try:\n        async with asyncio.timeout(0.05):\n            await slow()\n    except TimeoutError:\n        print("timed out")\nasyncio.run(main())`, output: `timed out` },
        { title: "Fetch multiple URLs (simulated)", code: `import asyncio\nasync def fetch(url):\n    await asyncio.sleep(0.01)\n    return f"200 {url}"\nasync def main():\n    urls = [f"page{i}" for i in range(5)]\n    return await asyncio.gather(*[fetch(u) for u in urls])\nprint(asyncio.run(main()))`, output: `['200 page0', '200 page1', '200 page2', '200 page3', '200 page4']` },
        { title: "Background task pattern", code: `import asyncio\nasync def background():\n    while True:\n        await asyncio.sleep(0.05)\n        print("tick", end=" ")\n        break\nasync def main():\n    t = asyncio.create_task(background())\n    await t\nasyncio.run(main())`, output: `tick ` },
        { title: "Async generator with anext", code: `import asyncio\nasync def gen():\n    for i in range(3):\n        await asyncio.sleep(0.001)\n        yield i\nasync def main():\n    g = gen()\n    print(await anext(g), await anext(g))\nasyncio.run(main())`, output: `0 1` },
        { title: "asyncio.run vs get_event_loop", code: `import asyncio\nasync def hi(): return "hi"\n# Modern: asyncio.run() creates and closes the loop\nprint(asyncio.run(hi()))`, output: `hi` },
        { title: "Chained async functions", code: `import asyncio\nasync def fetch(): await asyncio.sleep(0.005); return "raw"\nasync def parse(data): await asyncio.sleep(0.005); return data.upper()\nasync def main():\n    data = await fetch()\n    print(await parse(data))\nasyncio.run(main())`, output: `RAW` },
        { title: "Producer-consumer with Queue", code: `import asyncio\nasync def producer(q, n):\n    for i in range(n): await q.put(i)\n    await q.put(None)\nasync def consumer(q):\n    total = 0\n    while (x := await q.get()) is not None:\n        total += x\n    return total\nasync def main():\n    q = asyncio.Queue()\n    _, r = await asyncio.gather(producer(q, 5), consumer(q))\n    print(r)\nasyncio.run(main())`, output: `10` }
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
    },
    {
      title: "Logging — Production Patterns",
      badge: "Logging · 20+ examples",
      notes: ["Production logging replaces print() with structured, filterable, routable log output."],
      examples: [
        { title: "5 log levels", code: `import logging\nlogging.basicConfig(level=logging.DEBUG)\nlogging.debug("detail"); logging.info("info")\nlogging.warning("warn"); logging.error("err")\nlogging.critical("critical")`, output: `DEBUG:root:detail\nINFO:root:info\nWARNING:root:warn\nERROR:root:err\nCRITICAL:root:critical` },
        { title: "Named logger (module scope)", code: `import logging\nlog = logging.getLogger("app.core")\nlogging.basicConfig(level=logging.INFO, format="%(name)s: %(message)s")\nlog.info("hello")`, output: `app.core: hello` },
        { title: "Structured format", code: `import logging\nlogging.basicConfig(\n    format="%(asctime)s [%(levelname)s] %(name)s - %(message)s",\n    datefmt="%H:%M:%S",\n    level=logging.INFO)\nlogging.info("started")`, output: `10:30:15 [INFO] root - started` },
        { title: "Log to console + file", code: `import logging\nlog = logging.getLogger("app")\nlog.setLevel(logging.DEBUG)\nfh = logging.FileHandler("app.log")\nch = logging.StreamHandler()\nlog.addHandler(fh); log.addHandler(ch)\nlog.info("dual output")`, output: `dual output` },
        { title: "Log exception with traceback", code: `import logging\nlogging.basicConfig(level=logging.INFO)\ntry:\n    1/0\nexcept ZeroDivisionError:\n    logging.exception("failed to divide")`, output: `# ERROR with full traceback` },
        { title: "Log with extra context", code: `import logging\nlogging.basicConfig(level=logging.INFO, format="%(user)s: %(message)s")\nlogging.info("login", extra={"user": "alice"})`, output: `alice: login` },
        { title: "Rotate log files by size", code: `from logging.handlers import RotatingFileHandler\nimport logging\nh = RotatingFileHandler("app.log", maxBytes=10_000, backupCount=3)\nlog = logging.getLogger("rot"); log.addHandler(h); log.setLevel(logging.INFO)\nlog.info("rotated log")`, output: `# rotates when file hits 10KB` },
        { title: "Time-based rotation (daily)", code: `from logging.handlers import TimedRotatingFileHandler\nh = TimedRotatingFileHandler("app.log", when="midnight", backupCount=7)\nprint("daily rotation set up")`, output: `daily rotation set up` },
        { title: "Log to syslog (Unix)", code: `import logging\nfrom logging.handlers import SysLogHandler\n# h = SysLogHandler(address="/dev/log")\nprint("syslog handler configured")`, output: `syslog handler configured` },
        { title: "Custom formatter class", code: `import logging\nclass ColorFmt(logging.Formatter):\n    def format(self, r):\n        return f"[{r.levelname[0]}] {r.getMessage()}"\nlog = logging.getLogger("c"); log.setLevel(logging.INFO)\nh = logging.StreamHandler(); h.setFormatter(ColorFmt())\nlog.addHandler(h); log.info("hi")`, output: `[I] hi` },
        { title: "Suppress lower-level messages", code: `import logging\nlogging.basicConfig(level=logging.WARNING)\nlogging.info("hidden"); logging.warning("shown")`, output: `WARNING:root:shown` },
        { title: "Config from dict", code: `import logging.config\ncfg = {\n    "version": 1,\n    "handlers": {"h":{"class":"logging.StreamHandler","level":"INFO"}},\n    "root": {"handlers":["h"], "level":"INFO"}\n}\nlogging.config.dictConfig(cfg)\nlogging.info("configured")`, output: `configured` },
        { title: "Filter by level programmatically", code: `import logging\nclass OnlyError(logging.Filter):\n    def filter(self, r): return r.levelno == logging.ERROR\nlog = logging.getLogger("f"); log.setLevel(logging.DEBUG)\nh = logging.StreamHandler(); h.addFilter(OnlyError())\nlog.addHandler(h)\nlog.info("no"); log.error("yes")`, output: `yes` },
        { title: "Include file/line in log", code: `import logging\nlogging.basicConfig(format="%(filename)s:%(lineno)d %(message)s", level=logging.INFO)\nlogging.info("check")`, output: `<file>:X check` },
        { title: "Structured JSON logs", code: `import logging, json\nclass JsonFmt(logging.Formatter):\n    def format(self, r):\n        return json.dumps({"lvl": r.levelname, "msg": r.getMessage()})\nh = logging.StreamHandler(); h.setFormatter(JsonFmt())\nlog = logging.getLogger("j"); log.addHandler(h); log.setLevel(logging.INFO)\nlog.info("ok")`, output: `{"lvl": "INFO", "msg": "ok"}` },
        { title: "Log function calls with decorator", code: `import logging, functools\nlogging.basicConfig(level=logging.INFO)\ndef logged(fn):\n    @functools.wraps(fn)\n    def w(*a, **kw):\n        logging.info(f"call {fn.__name__}{a}")\n        return fn(*a, **kw)\n    return w\n@logged\ndef add(a,b): return a+b\nadd(2, 3)`, output: `INFO:root:call add(2, 3)` },
        { title: "getLogger returns same instance", code: `import logging\na = logging.getLogger("shared")\nb = logging.getLogger("shared")\nprint(a is b)`, output: `True` },
        { title: "Prevent propagation to root", code: `import logging\nlog = logging.getLogger("private")\nlog.propagate = False\nlog.info("won't reach root")\nprint("done")`, output: `done` },
        { title: "Level as int constant", code: `import logging\nprint(logging.DEBUG, logging.INFO, logging.WARNING, logging.ERROR, logging.CRITICAL)`, output: `10 20 30 40 50` },
        { title: "logger.makeRecord (advanced)", code: `import logging\nlog = logging.getLogger("adv")\n# Standard pattern: use log.info/warning etc\nlog.log(logging.INFO, "custom level use")\nprint("logged")`, output: `logged` }
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
    },
    {
      title: "Debugging — Techniques",
      badge: "Debug · 20+ examples",
      notes: ["Practical debugging patterns beyond print()."],
      examples: [
        { title: "assert for invariants", code: `def divide(a, b):\n    assert b != 0, "b must be non-zero"\n    return a / b\nprint(divide(10, 2))`, output: `5.0` },
        { title: "traceback module", code: `import traceback\ntry:\n    1 / 0\nexcept Exception:\n    print(traceback.format_exc().splitlines()[-1])`, output: `ZeroDivisionError: division by zero` },
        { title: "Print stack from anywhere", code: `import traceback\ndef foo():\n    print(traceback.extract_stack()[-2].name)\ndef bar(): foo()\nbar()`, output: `bar` },
        { title: "sys.exc_info", code: `import sys\ntry:\n    int("abc")\nexcept ValueError:\n    exc_type, exc_val, _ = sys.exc_info()\n    print(exc_type.__name__, exc_val)`, output: `ValueError invalid literal for int() with base 10: 'abc'` },
        { title: "repr() for readable variables", code: `s = "hello\\nworld"\nprint(s)\nprint(repr(s))`, output: `hello\nworld\n'hello\\nworld'` },
        { title: "pprint for nested structures", code: `import pprint\ndata = {"users": [{"n":"A","tags":[1,2,3]}, {"n":"B"}]}\npprint.pprint(data)`, output: `{'users': [{'n': 'A', 'tags': [1, 2, 3]}, {'n': 'B'}]}` },
        { title: "f-string debug format (3.8+)", code: `x = 42; y = 3.14\nprint(f"{x=}, {y=}")`, output: `x=42, y=3.14` },
        { title: "logging vs print for debug", code: `import logging\nlogging.basicConfig(level=logging.DEBUG)\nx = 42\nlogging.debug(f"x is {x}")\nprint("visible in output")`, output: `DEBUG:root:x is 42\nvisible in output` },
        { title: "warnings module", code: `import warnings\nwarnings.warn("This function is deprecated")\nprint("continues")`, output: `continues` },
        { title: "sys.getsizeof memory check", code: `import sys\na = [x for x in range(100)]\nprint(sys.getsizeof(a) > 0)`, output: `True` },
        { title: "gc get_objects count", code: `import gc\ncount = len(gc.get_objects())\nprint("objects tracked:", count > 100)`, output: `objects tracked: True` },
        { title: "dis module — inspect bytecode", code: `import dis\ndef f(): return 1 + 2\ndis.dis(f)`, output: `# LOAD_CONST + RETURN_VALUE bytecode` },
        { title: "inspect.getsource", code: `import inspect\ndef sample(x): return x + 1\nprint(inspect.getsource(sample).strip())`, output: `def sample(x): return x + 1` },
        { title: "inspect.getmembers", code: `import inspect\nclass C:\n    def m(self): pass\nmembers = [n for n, _ in inspect.getmembers(C) if not n.startswith("_")]\nprint(members)`, output: `['m']` },
        { title: "timeit for micro-benchmarks", code: `import timeit\nt = timeit.timeit("x = [i*i for i in range(100)]", number=1000)\nprint(f"{t:.4f}s")`, output: `0.0234s` },
        { title: "cProfile snapshot", code: `import cProfile, pstats, io\npr = cProfile.Profile()\npr.enable()\nsum(range(100000))\npr.disable()\ns = io.StringIO()\npstats.Stats(pr, stream=s).sort_stats("cumtime").print_stats(0)\nprint("profiled")`, output: `profiled` },
        { title: "breakpoint() (3.7+)", code: `def check(x):\n    # breakpoint()  # drops into pdb here\n    return x * 2\nprint(check(5))`, output: `10` },
        { title: "Custom __repr__ for debug", code: `class User:\n    def __init__(self, name): self.name = name\n    def __repr__(self): return f"User(name={self.name!r})"\nprint(User("Sara"))`, output: `User(name='Sara')` },
        { title: "Rich traceback (with locals)", code: `import traceback\ntry:\n    x = 5\n    y = "abc"\n    print(x + y)\nexcept TypeError:\n    lines = traceback.format_exc().splitlines()\n    print(lines[-1])`, output: `TypeError: unsupported operand type(s) for +: 'int' and 'str'` },
        { title: "faulthandler for crashes", code: `import faulthandler\nfaulthandler.enable()\nprint("crash handler on")`, output: `crash handler on` },
        { title: "sys.settrace (advanced)", code: `import sys\ndef tracer(frame, event, arg):\n    if event == "call":\n        print(f"call {frame.f_code.co_name}")\n    return tracer\n# sys.settrace(tracer)  # enables per-line tracing\nprint("tracer defined")`, output: `tracer defined` }
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
    },
    {
      title: "Database — Practical",
      badge: "DB · 25+ examples",
      notes: ["Production database patterns with sqlite3 (transferable to Postgres/MySQL)."],
      examples: [
        { title: "Create table + insert + query", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE users(id INT, name TEXT)")\ndb.execute("INSERT INTO users VALUES (?, ?)", (1, "Sara"))\ndb.commit()\nprint(db.execute("SELECT name FROM users").fetchone())`, output: `('Sara',)` },
        { title: "Insert many rows", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE t(a INT)")\ndb.executemany("INSERT INTO t VALUES (?)", [(1,),(2,),(3,)])\ndb.commit()\nprint(db.execute("SELECT COUNT(*) FROM t").fetchone()[0])`, output: `3` },
        { title: "Fetch all rows", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE t(x INT)")\ndb.executemany("INSERT INTO t VALUES(?)", [(i,) for i in range(3)])\nprint(db.execute("SELECT * FROM t").fetchall())`, output: `[(0,), (1,), (2,)]` },
        { title: "Fetch one and iterate", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE t(x INT)")\ndb.executemany("INSERT INTO t VALUES(?)", [(i,) for i in range(5)])\nfor row in db.execute("SELECT x FROM t WHERE x > 2"):\n    print(row)`, output: `(3,)\n(4,)` },
        { title: "Update rows", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE t(id INT, name TEXT)")\ndb.execute("INSERT INTO t VALUES(1, 'old')")\ndb.execute("UPDATE t SET name=? WHERE id=?", ("new", 1))\ndb.commit()\nprint(db.execute("SELECT name FROM t").fetchone())`, output: `('new',)` },
        { title: "Delete rows", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE t(x INT)")\ndb.executemany("INSERT INTO t VALUES(?)", [(1,),(2,),(3,)])\ndb.execute("DELETE FROM t WHERE x=?", (2,))\ndb.commit()\nprint(db.execute("SELECT * FROM t").fetchall())`, output: `[(1,), (3,)]` },
        { title: "Transaction with commit/rollback", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE t(x INT UNIQUE)")\ntry:\n    db.execute("INSERT INTO t VALUES(1)")\n    db.execute("INSERT INTO t VALUES(1)")  # violates unique\n    db.commit()\nexcept sqlite3.IntegrityError:\n    db.rollback()\nprint(db.execute("SELECT COUNT(*) FROM t").fetchone()[0])`, output: `0` },
        { title: "SQL with 'with' (auto-commit/rollback)", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE t(x INT)")\nwith db:\n    db.execute("INSERT INTO t VALUES(42)")\nprint(db.execute("SELECT * FROM t").fetchone())`, output: `(42,)` },
        { title: "row_factory as dict", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.row_factory = sqlite3.Row\ndb.execute("CREATE TABLE t(id INT, name TEXT)")\ndb.execute("INSERT INTO t VALUES(1, 'A')")\nrow = db.execute("SELECT * FROM t").fetchone()\nprint(dict(row))`, output: `{'id': 1, 'name': 'A'}` },
        { title: "Aggregate SUM/AVG/COUNT", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE sales(amt INT)")\ndb.executemany("INSERT INTO sales VALUES(?)", [(100,),(200,),(300,)])\nprint(db.execute("SELECT COUNT(*), SUM(amt), AVG(amt) FROM sales").fetchone())`, output: `(3, 600, 200.0)` },
        { title: "GROUP BY", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE orders(city TEXT, amt INT)")\ndb.executemany("INSERT INTO orders VALUES(?, ?)", [("A",100),("B",50),("A",200),("B",75)])\nfor row in db.execute("SELECT city, SUM(amt) FROM orders GROUP BY city"):\n    print(row)`, output: `('A', 300)\n('B', 125)` },
        { title: "ORDER BY", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE t(name TEXT, score INT)")\ndb.executemany("INSERT INTO t VALUES(?, ?)", [("A",80),("B",95),("C",70)])\nprint(db.execute("SELECT name FROM t ORDER BY score DESC").fetchall())`, output: `[('B',), ('A',), ('C',)]` },
        { title: "JOIN two tables", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE users(id INT, name TEXT)")\ndb.execute("CREATE TABLE orders(uid INT, item TEXT)")\ndb.execute("INSERT INTO users VALUES(1, 'Sara')")\ndb.execute("INSERT INTO orders VALUES(1, 'Book')")\nrow = db.execute("SELECT u.name, o.item FROM users u JOIN orders o ON u.id=o.uid").fetchone()\nprint(row)`, output: `('Sara', 'Book')` },
        { title: "LIMIT and OFFSET", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE t(x INT)")\ndb.executemany("INSERT INTO t VALUES(?)", [(i,) for i in range(10)])\nprint(db.execute("SELECT x FROM t LIMIT 3 OFFSET 5").fetchall())`, output: `[(5,), (6,), (7,)]` },
        { title: "PRAGMA foreign_keys ON", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("PRAGMA foreign_keys=ON")\ndb.execute("CREATE TABLE users(id INT PRIMARY KEY)")\ndb.execute("CREATE TABLE posts(uid INT, FOREIGN KEY(uid) REFERENCES users(id))")\nprint("FK enabled")`, output: `FK enabled` },
        { title: "Index for faster lookups", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE users(id INT, email TEXT)")\ndb.execute("CREATE INDEX idx_email ON users(email)")\nprint("index created")`, output: `index created` },
        { title: "LIKE for pattern search", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE t(name TEXT)")\ndb.executemany("INSERT INTO t VALUES(?)", [("Alice",),("Bob",),("Amir",)])\nprint(db.execute("SELECT name FROM t WHERE name LIKE 'A%'").fetchall())`, output: `[('Alice',), ('Amir',)]` },
        { title: "IN operator", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE t(id INT)")\ndb.executemany("INSERT INTO t VALUES(?)", [(1,),(2,),(3,)])\nplace = ",".join("?" * 3)\nprint(db.execute(f"SELECT * FROM t WHERE id IN ({place})", (1,2,4)).fetchall())`, output: `[(1,), (2,)]` },
        { title: "AUTOINCREMENT PK", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE t(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)")\ndb.execute("INSERT INTO t(name) VALUES('A')")\ndb.execute("INSERT INTO t(name) VALUES('B')")\ndb.commit()\nprint(db.execute("SELECT * FROM t").fetchall())`, output: `[(1, 'A'), (2, 'B')]` },
        { title: "Context manager for connection", code: `import sqlite3\nfrom contextlib import contextmanager\n@contextmanager\ndef conn(path):\n    db = sqlite3.connect(path)\n    try: yield db; db.commit()\n    except: db.rollback(); raise\n    finally: db.close()\n\nwith conn(":memory:") as db:\n    db.execute("CREATE TABLE t(x INT)")\n    db.execute("INSERT INTO t VALUES(1)")\nprint("ok")`, output: `ok` },
        { title: "SQL injection SAFE vs UNSAFE", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE u(name TEXT)")\ndb.execute("INSERT INTO u VALUES('admin')")\nuser_input = "admin"\n# SAFE:\nprint(db.execute("SELECT * FROM u WHERE name=?", (user_input,)).fetchone())`, output: `('admin',)` },
        { title: "Bulk insert with transaction (fast)", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE t(x INT)")\ndata = [(i,) for i in range(10000)]\nwith db:\n    db.executemany("INSERT INTO t VALUES(?)", data)\nprint(db.execute("SELECT COUNT(*) FROM t").fetchone()[0])`, output: `10000` },
        { title: "Named parameters (:name)", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE t(name TEXT, age INT)")\ndb.execute("INSERT INTO t VALUES(:n, :a)", {"n":"Sara", "a":30})\nprint(db.execute("SELECT * FROM t").fetchone())`, output: `('Sara', 30)` },
        { title: "COUNT DISTINCT", code: `import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE t(dept TEXT)")\ndb.executemany("INSERT INTO t VALUES(?)", [("A",),("B",),("A",),("C",)])\nprint(db.execute("SELECT COUNT(DISTINCT dept) FROM t").fetchone())`, output: `(3,)` },
        { title: "Backup DB in memory to file", code: `import sqlite3\nsrc = sqlite3.connect(":memory:")\nsrc.execute("CREATE TABLE t(x INT)")\nsrc.execute("INSERT INTO t VALUES(1)")\n# dst = sqlite3.connect('backup.db'); src.backup(dst); dst.close()\nprint("backup pattern")`, output: `backup pattern` }
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
    },
    {
      title: "Networking — Practical",
      badge: "Network · 20+ examples",
      notes: ["Practical socket, DNS, and low-level networking patterns in pure Python."],
      examples: [
        { title: "Get hostname", code: `import socket\nprint(socket.gethostname())`, output: `# your machine name` },
        { title: "Get local IP", code: `import socket\nhostname = socket.gethostname()\nprint(socket.gethostbyname(hostname))`, output: `127.0.0.1 or your LAN IP` },
        { title: "DNS lookup by name", code: `import socket\nip = socket.gethostbyname("python.org")\nprint(ip)`, output: `# python.org's IP` },
        { title: "Reverse DNS lookup", code: `import socket\ntry:\n    name = socket.gethostbyaddr("8.8.8.8")\n    print(name[0])\nexcept: print("dns.google")`, output: `dns.google` },
        { title: "TCP socket create", code: `import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\nprint(type(s).__name__)\ns.close()`, output: `socket` },
        { title: "UDP socket create", code: `import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)\nprint("UDP socket")\ns.close()`, output: `UDP socket` },
        { title: "Check port open", code: `import socket\ndef port_open(host, port, timeout=1):\n    s = socket.socket()\n    s.settimeout(timeout)\n    try:\n        s.connect((host, port)); return True\n    except: return False\n    finally: s.close()\n\nprint(port_open("google.com", 80))`, output: `True` },
        { title: "URL parsing", code: `from urllib.parse import urlparse\nu = urlparse("https://user:pw@example.com:8080/path?q=1#top")\nprint(u.scheme, u.hostname, u.port, u.path)`, output: `https example.com 8080 /path` },
        { title: "URL encode/decode", code: `from urllib.parse import quote, unquote\nprint(quote("hello world"))\nprint(unquote("hello%20world"))`, output: `hello%20world\nhello world` },
        { title: "Build query string", code: `from urllib.parse import urlencode\nprint(urlencode({"q":"python","page":2}))`, output: `q=python&page=2` },
        { title: "Parse query string", code: `from urllib.parse import parse_qs\nprint(parse_qs("q=python&page=2"))`, output: `{'q': ['python'], 'page': ['2']}` },
        { title: "urllib.request GET", code: `from urllib import request\nreq = request.Request("https://httpbin.org/get")\n# with request.urlopen(req) as r:\n#     print(r.status)\nprint("GET pattern")`, output: `GET pattern` },
        { title: "Send HTTP with headers", code: `from urllib import request\nreq = request.Request("https://api.example.com",\n    headers={"User-Agent": "MyApp/1.0", "Accept": "application/json"})\nprint(req.headers)`, output: `{'User-agent': 'MyApp/1.0', 'Accept': 'application/json'}` },
        { title: "IP address validation", code: `import ipaddress\ntry:\n    ip = ipaddress.ip_address("192.168.1.1")\n    print(ip.version, ip.is_private)\nexcept ValueError:\n    print("invalid")`, output: `4 True` },
        { title: "IPv4 vs IPv6", code: `import ipaddress\nprint(ipaddress.ip_address("::1"))\nprint(ipaddress.ip_address("192.168.0.1"))`, output: `::1\n192.168.0.1` },
        { title: "Network subnet check", code: `import ipaddress\nnet = ipaddress.ip_network("192.168.1.0/24")\nprint(ipaddress.ip_address("192.168.1.100") in net)`, output: `True` },
        { title: "Port scanner (pattern)", code: `import socket\ndef scan(host, ports):\n    open_ports = []\n    for p in ports:\n        s = socket.socket(); s.settimeout(0.5)\n        try:\n            s.connect((host, p)); open_ports.append(p)\n        except: pass\n        finally: s.close()\n    return open_ports\n\nprint("scanner defined")`, output: `scanner defined` },
        { title: "Get server address info", code: `import socket\nfor family, _, _, _, addr in socket.getaddrinfo("python.org", 80)[:1]:\n    print(family.name, addr)`, output: `AddressFamily.AF_INET ('...', 80)` },
        { title: "Simple UDP echo (skeleton)", code: `import socket\n# server\n# s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)\n# s.bind(("localhost", 9999))\n# data, addr = s.recvfrom(1024)\nprint("UDP skeleton")`, output: `UDP skeleton` },
        { title: "SO_REUSEADDR option", code: `import socket\ns = socket.socket()\ns.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)\nprint("reuse addr set")\ns.close()`, output: `reuse addr set` },
        { title: "Send email via smtplib (pattern)", code: `import smtplib\nfrom email.mime.text import MIMEText\nmsg = MIMEText("Hello!")\nmsg["Subject"] = "Test"\nmsg["From"] = "me@example.com"\nmsg["To"] = "you@example.com"\n# with smtplib.SMTP("smtp.gmail.com", 587) as s:\n#     s.starttls(); s.login(user, pwd); s.send_message(msg)\nprint("email pattern ready")`, output: `email pattern ready` }
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
    },
    {
      title: "APIs — Practical Patterns",
      badge: "APIs · 20+ examples",
      notes: ["Real REST API patterns with requests and http.client."],
      examples: [
        { title: "GET with query params", code: `import requests\nr = requests.get("https://api.example.com/search",\n    params={"q": "python", "limit": 10})\nprint(r.url)`, output: `https://api.example.com/search?q=python&limit=10` },
        { title: "POST JSON payload", code: `import requests\nr = requests.post("https://api.example.com/users",\n    json={"name": "Sara", "age": 30})\nprint(r.status_code)`, output: `201` },
        { title: "PUT (full update)", code: `import requests\nr = requests.put("https://api.example.com/users/1",\n    json={"name": "New", "age": 25})\nprint(r.status_code)`, output: `200` },
        { title: "PATCH (partial update)", code: `import requests\nr = requests.patch("https://api.example.com/users/1",\n    json={"name": "Updated"})\nprint(r.status_code)`, output: `200` },
        { title: "DELETE", code: `import requests\nr = requests.delete("https://api.example.com/users/1")\nprint(r.status_code)`, output: `204` },
        { title: "Timeout to prevent hang", code: `import requests\ntry:\n    r = requests.get("https://slow.example.com", timeout=(3, 10))\n    print(r.status_code)\nexcept requests.Timeout:\n    print("timed out")`, output: `timed out` },
        { title: "Session with connection reuse", code: `import requests\nwith requests.Session() as s:\n    s.headers.update({"User-Agent": "MyApp"})\n    # multiple requests reuse TCP connection\n    print("session ready")`, output: `session ready` },
        { title: "Retry with urllib3", code: `import requests\nfrom requests.adapters import HTTPAdapter\nfrom urllib3.util.retry import Retry\nretry = Retry(total=3, backoff_factor=0.5, status_forcelist=[429, 500, 502, 503, 504])\ns = requests.Session()\ns.mount("https://", HTTPAdapter(max_retries=retry))\nprint("retry configured")`, output: `retry configured` },
        { title: "Basic Auth", code: `import requests\nfrom requests.auth import HTTPBasicAuth\nr = requests.get("https://api.example.com",\n    auth=HTTPBasicAuth("user", "pass"))\nprint(r.status_code)`, output: `200` },
        { title: "Bearer token (JWT)", code: `import requests\ntoken = "eyJhbGc..."\nr = requests.get("https://api.example.com/me",\n    headers={"Authorization": f"Bearer {token}"})\nprint("authenticated")`, output: `authenticated` },
        { title: "Custom headers", code: `import requests\nr = requests.get("https://api.example.com",\n    headers={\n        "Accept": "application/json",\n        "X-Client-Version": "1.0",\n        "X-Request-ID": "abc123"\n    })\nprint("headers sent")`, output: `headers sent` },
        { title: "Upload file (multipart)", code: `import requests\n# with open("photo.jpg", "rb") as f:\n#     r = requests.post("https://api.example.com/upload",\n#         files={"file": f})\nprint("upload pattern")`, output: `upload pattern` },
        { title: "Download file (streaming)", code: `import requests\n# with requests.get("https://example.com/big.zip", stream=True) as r:\n#     with open("big.zip", "wb") as f:\n#         for chunk in r.iter_content(8192):\n#             f.write(chunk)\nprint("stream download pattern")`, output: `stream download pattern` },
        { title: "Response status handling", code: `import requests\nr = requests.get("https://api.example.com")\ntry:\n    r.raise_for_status()\n    data = r.json()\nexcept requests.HTTPError as e:\n    print(f"HTTP {e.response.status_code}")`, output: `HTTP 404` },
        { title: "Get response headers", code: `import requests\nr = requests.get("https://httpbin.org/get")\n# print(r.headers.get("Content-Type"))\nprint("Content-Type check")`, output: `Content-Type check` },
        { title: "URL encoding", code: `from urllib.parse import quote\nprint(quote("data with spaces & symbols"))`, output: `data%20with%20spaces%20%26%20symbols` },
        { title: "GraphQL-style POST", code: `import requests\nquery = "{ user(id: 1) { name email } }"\n# r = requests.post("https://api.example.com/graphql",\n#     json={"query": query})\nprint("graphql pattern")`, output: `graphql pattern` },
        { title: "Pagination with cursor", code: `import requests\ndef fetch_all(url):\n    while url:\n        # r = requests.get(url).json()\n        r = {"items": [1,2], "next": None}  # simulated\n        yield from r["items"]\n        url = r.get("next")\n\nprint(list(fetch_all("https://api.example.com/items")))`, output: `[1, 2]` },
        { title: "Handle rate limiting (429)", code: `import requests, time\ndef safe_get(url):\n    while True:\n        r = requests.get(url)\n        if r.status_code == 429:\n            wait = int(r.headers.get("Retry-After", 1))\n            time.sleep(wait)\n            continue\n        return r\nprint("rate limit handler ready")`, output: `rate limit handler ready` },
        { title: "OAuth 2 client credentials flow (pattern)", code: `import requests\n# r = requests.post("https://oauth.example.com/token",\n#     data={"grant_type": "client_credentials",\n#           "client_id": "abc", "client_secret": "xyz"})\n# token = r.json()["access_token"]\nprint("oauth pattern")`, output: `oauth pattern` }
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
    },
    {
      title: "Testing — Practical Patterns",
      badge: "Testing · 25+ examples",
      notes: ["Real pytest/unittest patterns for production test suites."],
      examples: [
        { title: "Basic pytest test", code: `def divide(a, b):\n    return a / b\n\ndef test_divide():\n    assert divide(10, 2) == 5\n    assert divide(9, 3) == 3`, output: `2 passed` },
        { title: "Test raising exception", code: `import pytest\ndef divide(a, b):\n    if b == 0: raise ValueError("no zero")\n    return a / b\n\ndef test_zero():\n    with pytest.raises(ValueError, match="no zero"):\n        divide(1, 0)`, output: `passed` },
        { title: "Parametrized tests", code: `import pytest\n@pytest.mark.parametrize("a,b,exp", [\n    (2, 3, 5),\n    (-1, 1, 0),\n    (0, 0, 0),\n])\ndef test_add(a, b, exp):\n    assert a + b == exp`, output: `3 passed` },
        { title: "Fixture (setup/teardown)", code: `import pytest\n@pytest.fixture\ndef sample_data():\n    return [1, 2, 3, 4, 5]\n\ndef test_sum(sample_data):\n    assert sum(sample_data) == 15\n\ndef test_len(sample_data):\n    assert len(sample_data) == 5`, output: `2 passed` },
        { title: "Fixture with yield (teardown)", code: `import pytest\n@pytest.fixture\ndef temp_file(tmp_path):\n    f = tmp_path / "test.txt"\n    f.write_text("hello")\n    yield f  # teardown after yield\n    # cleanup runs here (tmp_path auto-cleans)\n\ndef test_read(temp_file):\n    assert temp_file.read_text() == "hello"`, output: `1 passed` },
        { title: "Fixture scope=session", code: `import pytest\n@pytest.fixture(scope="session")\ndef db():\n    print("expensive setup once")\n    yield "db_conn"\n    print("teardown once")\n\ndef test_a(db): assert db == "db_conn"\ndef test_b(db): assert db == "db_conn"`, output: `2 passed (setup runs once)` },
        { title: "Skip test", code: `import pytest, sys\n@pytest.mark.skipif(sys.version_info < (3, 10), reason="needs 3.10+")\ndef test_new_feature():\n    match "x":\n        case "x": assert True`, output: `1 passed` },
        { title: "Expected failure (xfail)", code: `import pytest\n@pytest.mark.xfail(reason="known bug")\ndef test_bug():\n    assert 1 == 2`, output: `1 xfailed` },
        { title: "Mock a function", code: `from unittest.mock import Mock\nmock_api = Mock(return_value={"status": "ok"})\nprint(mock_api())\nprint(mock_api.called, mock_api.call_count)`, output: `{'status': 'ok'}\nTrue 1` },
        { title: "MagicMock supports magic methods", code: `from unittest.mock import MagicMock\nm = MagicMock()\nm.__len__.return_value = 42\nprint(len(m))`, output: `42` },
        { title: "patch object", code: `from unittest.mock import patch\nimport json\nwith patch("json.dumps", return_value="mocked"):\n    print(json.dumps({"a": 1}))`, output: `mocked` },
        { title: "patch as decorator", code: `from unittest.mock import patch, MagicMock\nimport json\n@patch("json.loads")\ndef test_parse(mock_loads):\n    mock_loads.return_value = {"ok": True}\n    print(json.loads("{}"))\n\ntest_parse()`, output: `{'ok': True}` },
        { title: "Assert mock was called", code: `from unittest.mock import Mock\nm = Mock()\nm(1, 2, x=3)\nm.assert_called_with(1, 2, x=3)\nprint("called correctly")`, output: `called correctly` },
        { title: "Mock side_effect", code: `from unittest.mock import Mock\nm = Mock(side_effect=[1, 2, 3])\nprint(m(), m(), m())`, output: `1 2 3` },
        { title: "Mock side_effect raises", code: `from unittest.mock import Mock\nm = Mock(side_effect=ValueError("boom"))\ntry:\n    m()\nexcept ValueError as e:\n    print(e)`, output: `boom` },
        { title: "unittest TestCase", code: `import unittest\nclass TestMath(unittest.TestCase):\n    def test_add(self):\n        self.assertEqual(2+3, 5)\n    def test_true(self):\n        self.assertTrue(1 < 2)\n\n# unittest.main()\nprint("TestCase defined")`, output: `TestCase defined` },
        { title: "assertRaises", code: `import unittest\nclass T(unittest.TestCase):\n    def test_err(self):\n        with self.assertRaises(ZeroDivisionError):\n            1/0\n# T().test_err()\nprint("test defined")`, output: `test defined` },
        { title: "setUp / tearDown", code: `import unittest\nclass T(unittest.TestCase):\n    def setUp(self):\n        self.data = [1, 2, 3]\n    def tearDown(self):\n        self.data = None\n    def test_it(self):\n        self.assertEqual(len(self.data), 3)\nprint("lifecycle hooks defined")`, output: `lifecycle hooks defined` },
        { title: "Test tmp_path fixture", code: `# pytest gives tmp_path auto\ndef test_write(tmp_path):\n    p = tmp_path / "data.txt"\n    p.write_text("hello")\n    assert p.read_text() == "hello"\nprint("tmp_path pattern")`, output: `tmp_path pattern` },
        { title: "Capture stdout", code: `# pytest gives capsys\ndef test_print(capsys):\n    print("hi")\n    captured = capsys.readouterr()\n    assert captured.out == "hi\\n"\nprint("capsys pattern")`, output: `capsys pattern` },
        { title: "Parametrize with ids", code: `import pytest\n@pytest.mark.parametrize("val", [1, 2, 3], ids=["one","two","three"])\ndef test_pos(val):\n    assert val > 0`, output: `3 passed` },
        { title: "monkeypatch env var", code: `# pytest fixture monkeypatch\ndef test_env(monkeypatch):\n    monkeypatch.setenv("KEY", "value")\n    import os\n    assert os.getenv("KEY") == "value"\nprint("env override pattern")`, output: `env override pattern` },
        { title: "Approx float compare", code: `import pytest\nassert 0.1 + 0.2 == pytest.approx(0.3)\nprint("approx works")`, output: `approx works` },
        { title: "Test coverage command", code: `# Run: pytest --cov=my_module tests/\n# See report of covered lines\nprint("coverage measured")`, output: `coverage measured` },
        { title: "Test class grouping", code: `class TestUser:\n    def test_create(self):\n        assert True\n    def test_update(self):\n        assert True\nprint("class grouping")`, output: `class grouping` }
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
    },
    {
      title: "Data Structures — Implementations",
      badge: "DSA · 25+ examples",
      notes: ["Practical implementations of common data structures from scratch."],
      examples: [
        { title: "Stack (LIFO)", code: `stack = []\nstack.append(1); stack.append(2); stack.append(3)\nprint(stack.pop())\nprint(stack.pop())`, output: `3\n2` },
        { title: "Stack class", code: `class Stack:\n    def __init__(self): self._items = []\n    def push(self, x): self._items.append(x)\n    def pop(self): return self._items.pop() if self._items else None\n    def peek(self): return self._items[-1] if self._items else None\n    def is_empty(self): return len(self._items) == 0\n\ns = Stack(); s.push(1); s.push(2)\nprint(s.peek(), s.pop())`, output: `2 2` },
        { title: "Queue with deque", code: `from collections import deque\nq = deque()\nq.append("A"); q.append("B"); q.append("C")\nprint(q.popleft())`, output: `A` },
        { title: "Queue class", code: `from collections import deque\nclass Queue:\n    def __init__(self): self._q = deque()\n    def enqueue(self, x): self._q.append(x)\n    def dequeue(self): return self._q.popleft() if self._q else None\n    def size(self): return len(self._q)\n\nq = Queue(); q.enqueue(1); q.enqueue(2)\nprint(q.dequeue(), q.size())`, output: `1 1` },
        { title: "Linked list node + traverse", code: `class Node:\n    def __init__(self, v): self.v = v; self.next = None\n\nhead = Node(1); head.next = Node(2); head.next.next = Node(3)\ncur = head\nwhile cur:\n    print(cur.v, end=" "); cur = cur.next`, output: `1 2 3 ` },
        { title: "Linked list insert at head", code: `class Node:\n    def __init__(self, v): self.v = v; self.next = None\n\ndef prepend(head, v):\n    n = Node(v); n.next = head; return n\n\nh = None\nfor x in [3, 2, 1]:\n    h = prepend(h, x)\ncur = h\nwhile cur: print(cur.v, end=" "); cur = cur.next`, output: `1 2 3 ` },
        { title: "Reverse linked list", code: `class Node:\n    def __init__(self, v): self.v = v; self.next = None\n\ndef reverse(head):\n    prev = None; cur = head\n    while cur:\n        nxt = cur.next; cur.next = prev\n        prev = cur; cur = nxt\n    return prev\n\nh = Node(1); h.next = Node(2); h.next.next = Node(3)\nr = reverse(h)\nwhile r: print(r.v, end=" "); r = r.next`, output: `3 2 1 ` },
        { title: "Detect cycle in linked list", code: `class Node:\n    def __init__(self, v): self.v = v; self.next = None\n\ndef has_cycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next; fast = fast.next.next\n        if slow == fast: return True\n    return False\n\nh = Node(1); h.next = Node(2); h.next.next = h  # cycle!\nprint(has_cycle(h))`, output: `True` },
        { title: "Binary tree", code: `class TreeNode:\n    def __init__(self, v):\n        self.v = v; self.left = None; self.right = None\n\nroot = TreeNode(1)\nroot.left = TreeNode(2); root.right = TreeNode(3)\nprint(root.v, root.left.v, root.right.v)`, output: `1 2 3` },
        { title: "BST search", code: `class Node:\n    def __init__(self, v): self.v = v; self.l = self.r = None\n\ndef search(root, v):\n    if not root or root.v == v: return root\n    return search(root.l, v) if v < root.v else search(root.r, v)\n\nr = Node(5); r.l = Node(3); r.r = Node(7)\nprint(search(r, 3).v)`, output: `3` },
        { title: "Tree preorder traversal", code: `class N:\n    def __init__(self, v): self.v = v; self.l = self.r = None\ndef preorder(n):\n    if n: print(n.v, end=" "); preorder(n.l); preorder(n.r)\n\nroot = N(1); root.l = N(2); root.r = N(3)\npreorder(root)`, output: `1 2 3 ` },
        { title: "Tree postorder traversal", code: `class N:\n    def __init__(self, v): self.v = v; self.l = self.r = None\ndef postorder(n):\n    if n: postorder(n.l); postorder(n.r); print(n.v, end=" ")\n\nroot = N(1); root.l = N(2); root.r = N(3)\npostorder(root)`, output: `2 3 1 ` },
        { title: "BFS on tree (level order)", code: `from collections import deque\nclass N:\n    def __init__(self, v): self.v = v; self.l = self.r = None\ndef bfs(root):\n    q = deque([root])\n    while q:\n        n = q.popleft(); print(n.v, end=" ")\n        if n.l: q.append(n.l)\n        if n.r: q.append(n.r)\n\nroot = N(1); root.l = N(2); root.r = N(3)\nroot.l.l = N(4); root.l.r = N(5)\nbfs(root)`, output: `1 2 3 4 5 ` },
        { title: "Min heap with heapq", code: `import heapq\nh = []\nfor x in [3, 1, 4, 1, 5, 9, 2, 6]:\n    heapq.heappush(h, x)\nprint(heapq.heappop(h), heapq.heappop(h))`, output: `1 1` },
        { title: "Max heap trick (negate)", code: `import heapq\nh = []\nfor x in [3, 1, 4, 1, 5]:\n    heapq.heappush(h, -x)\nprint(-heapq.heappop(h))`, output: `5` },
        { title: "N largest / smallest", code: `import heapq\nnums = [3, 1, 4, 1, 5, 9, 2, 6]\nprint(heapq.nlargest(3, nums))\nprint(heapq.nsmallest(3, nums))`, output: `[9, 6, 5]\n[1, 1, 2]` },
        { title: "Priority queue", code: `import heapq\npq = []\nheapq.heappush(pq, (2, "task-b"))\nheapq.heappush(pq, (1, "task-a"))\nheapq.heappush(pq, (3, "task-c"))\nprint(heapq.heappop(pq))`, output: `(1, 'task-a')` },
        { title: "Hash table (dict)", code: `# Python dict IS a hash table\nphonebook = {}\nphonebook["Sara"] = "555-0100"\nphonebook["Ravi"] = "555-0101"\nprint(phonebook["Sara"])\nprint("Ravi" in phonebook)`, output: `555-0100\nTrue` },
        { title: "Trie (prefix tree)", code: `class Trie:\n    def __init__(self): self.root = {}\n    def insert(self, word):\n        node = self.root\n        for c in word:\n            node = node.setdefault(c, {})\n        node["$"] = True\n    def search(self, word):\n        node = self.root\n        for c in word:\n            if c not in node: return False\n            node = node[c]\n        return "$" in node\n\nt = Trie(); t.insert("apple"); t.insert("app")\nprint(t.search("app"), t.search("apx"))`, output: `True False` },
        { title: "Graph as adjacency list", code: `graph = {\n    "A": ["B", "C"],\n    "B": ["D"],\n    "C": ["D"],\n    "D": []\n}\nfor node, neighbors in graph.items():\n    print(f"{node} -> {neighbors}")`, output: `A -> ['B', 'C']\nB -> ['D']\nC -> ['D']\nD -> []` },
        { title: "Graph DFS", code: `def dfs(graph, start, visited=None):\n    if visited is None: visited = set()\n    visited.add(start); print(start, end=" ")\n    for n in graph.get(start, []):\n        if n not in visited:\n            dfs(graph, n, visited)\n\ndfs({"A":["B","C"], "B":["D"], "C":["D"], "D":[]}, "A")`, output: `A B D C ` },
        { title: "Graph BFS", code: `from collections import deque\ndef bfs(graph, start):\n    visited = {start}\n    q = deque([start])\n    while q:\n        node = q.popleft(); print(node, end=" ")\n        for n in graph.get(node, []):\n            if n not in visited:\n                visited.add(n); q.append(n)\n\nbfs({"A":["B","C"], "B":["D"], "C":["D"], "D":[]}, "A")`, output: `A B C D ` },
        { title: "Circular queue with maxlen", code: `from collections import deque\nq = deque(maxlen=3)\nfor x in [1, 2, 3, 4, 5]:\n    q.append(x)\nprint(list(q))`, output: `[3, 4, 5]` },
        { title: "Doubly linked list node", code: `class DNode:\n    def __init__(self, v):\n        self.v = v; self.prev = None; self.next = None\n\na = DNode(1); b = DNode(2)\na.next = b; b.prev = a\nprint(a.v, "->", a.next.v, "<-", a.next.prev.v)`, output: `1 -> 2 <- 1` },
        { title: "Union-Find (Disjoint Set)", code: `class UF:\n    def __init__(self, n):\n        self.p = list(range(n))\n    def find(self, x):\n        if self.p[x] != x:\n            self.p[x] = self.find(self.p[x])\n        return self.p[x]\n    def union(self, x, y):\n        self.p[self.find(x)] = self.find(y)\n\nu = UF(5)\nu.union(0, 1); u.union(2, 3); u.union(1, 3)\nprint(u.find(0) == u.find(3))`, output: `True` }
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
    },
    {
      title: "Algorithms — Practical",
      badge: "Algorithms · 30+ examples",
      notes: ["Common algorithms every developer should know."],
      examples: [
        { title: "Linear search", code: `def linear_search(arr, target):\n    for i, v in enumerate(arr):\n        if v == target: return i\n    return -1\n\nprint(linear_search([3, 7, 1, 9, 4], 9))`, output: `3` },
        { title: "Binary search iterative", code: `def bsearch(arr, target):\n    lo, hi = 0, len(arr) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: lo = mid + 1\n        else: hi = mid - 1\n    return -1\n\nprint(bsearch([1, 3, 5, 7, 9, 11], 7))`, output: `3` },
        { title: "Binary search recursive", code: `def bsearch(arr, t, lo=0, hi=None):\n    if hi is None: hi = len(arr) - 1\n    if lo > hi: return -1\n    mid = (lo + hi) // 2\n    if arr[mid] == t: return mid\n    if arr[mid] < t: return bsearch(arr, t, mid+1, hi)\n    return bsearch(arr, t, lo, mid-1)\n\nprint(bsearch([1,3,5,7,9], 5))`, output: `2` },
        { title: "Bubble sort", code: `def bubble(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n\nprint(bubble([5, 2, 8, 1, 9]))`, output: `[1, 2, 5, 8, 9]` },
        { title: "Selection sort", code: `def selection(arr):\n    n = len(arr)\n    for i in range(n):\n        m = i\n        for j in range(i+1, n):\n            if arr[j] < arr[m]: m = j\n        arr[i], arr[m] = arr[m], arr[i]\n    return arr\n\nprint(selection([64, 25, 12, 22, 11]))`, output: `[11, 12, 22, 25, 64]` },
        { title: "Insertion sort", code: `def insertion(arr):\n    for i in range(1, len(arr)):\n        key, j = arr[i], i-1\n        while j >= 0 and arr[j] > key:\n            arr[j+1] = arr[j]; j -= 1\n        arr[j+1] = key\n    return arr\n\nprint(insertion([5, 2, 4, 6, 1, 3]))`, output: `[1, 2, 3, 4, 5, 6]` },
        { title: "Merge sort", code: `def merge_sort(arr):\n    if len(arr) <= 1: return arr\n    mid = len(arr) // 2\n    L = merge_sort(arr[:mid])\n    R = merge_sort(arr[mid:])\n    out, i, j = [], 0, 0\n    while i < len(L) and j < len(R):\n        if L[i] <= R[j]: out.append(L[i]); i += 1\n        else: out.append(R[j]); j += 1\n    return out + L[i:] + R[j:]\n\nprint(merge_sort([38, 27, 43, 3, 9, 82, 10]))`, output: `[3, 9, 10, 27, 38, 43, 82]` },
        { title: "Quick sort", code: `def quick(arr):\n    if len(arr) <= 1: return arr\n    pivot = arr[0]\n    less = [x for x in arr[1:] if x <= pivot]\n    more = [x for x in arr[1:] if x > pivot]\n    return quick(less) + [pivot] + quick(more)\n\nprint(quick([3, 6, 8, 10, 1, 2, 1]))`, output: `[1, 1, 2, 3, 6, 8, 10]` },
        { title: "Fibonacci recursive (slow)", code: `def fib(n):\n    return n if n < 2 else fib(n-1) + fib(n-2)\n\nprint([fib(i) for i in range(10)])`, output: `[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]` },
        { title: "Fibonacci memoized DP", code: `from functools import lru_cache\n@lru_cache\ndef fib(n):\n    return n if n < 2 else fib(n-1) + fib(n-2)\n\nprint(fib(50))`, output: `12586269025` },
        { title: "Fibonacci iterative O(1) space", code: `def fib(n):\n    a, b = 0, 1\n    for _ in range(n): a, b = b, a + b\n    return a\n\nprint(fib(10))`, output: `55` },
        { title: "Factorial iterative", code: `def factorial(n):\n    r = 1\n    for i in range(2, n+1): r *= i\n    return r\n\nprint(factorial(10))`, output: `3628800` },
        { title: "Power (fast exponentiation)", code: `def power(base, exp):\n    if exp == 0: return 1\n    half = power(base, exp // 2)\n    return half * half * (base if exp % 2 else 1)\n\nprint(power(2, 20))`, output: `1048576` },
        { title: "GCD (Euclidean)", code: `def gcd(a, b):\n    while b: a, b = b, a % b\n    return a\n\nprint(gcd(48, 36))\nprint(gcd(100, 75))`, output: `12\n25` },
        { title: "LCM", code: `def gcd(a, b):\n    while b: a, b = b, a % b\n    return a\ndef lcm(a, b): return a * b // gcd(a, b)\n\nprint(lcm(12, 18))`, output: `36` },
        { title: "Prime check", code: `def is_prime(n):\n    if n < 2: return False\n    for i in range(2, int(n**0.5)+1):\n        if n % i == 0: return False\n    return True\n\nprint([n for n in range(2, 20) if is_prime(n)])`, output: `[2, 3, 5, 7, 11, 13, 17, 19]` },
        { title: "Sieve of Eratosthenes", code: `def primes(n):\n    sieve = [True] * (n + 1)\n    sieve[0] = sieve[1] = False\n    for i in range(2, int(n**0.5)+1):\n        if sieve[i]:\n            for j in range(i*i, n+1, i):\n                sieve[j] = False\n    return [i for i, p in enumerate(sieve) if p]\n\nprint(primes(30))`, output: `[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]` },
        { title: "Reverse a number", code: `def reverse(n):\n    r = 0\n    while n > 0:\n        r = r * 10 + n % 10\n        n //= 10\n    return r\n\nprint(reverse(12345))`, output: `54321` },
        { title: "Palindrome number", code: `def is_pal(n):\n    r = 0; orig = n\n    while n > 0:\n        r = r * 10 + n % 10\n        n //= 10\n    return orig == r\n\nprint(is_pal(121), is_pal(123))`, output: `True False` },
        { title: "Two Sum (hash map)", code: `def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen:\n            return [seen[target - n], i]\n        seen[n] = i\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))`, output: `[0, 1]` },
        { title: "Max subarray (Kadane's)", code: `def max_sub(nums):\n    cur = best = nums[0]\n    for n in nums[1:]:\n        cur = max(n, cur + n)\n        best = max(best, cur)\n    return best\n\nprint(max_sub([-2, 1, -3, 4, -1, 2, 1, -5, 4]))`, output: `6` },
        { title: "Longest common subsequence", code: `def lcs(a, b):\n    m, n = len(a), len(b)\n    dp = [[0]*(n+1) for _ in range(m+1)]\n    for i in range(1, m+1):\n        for j in range(1, n+1):\n            dp[i][j] = dp[i-1][j-1] + 1 if a[i-1] == b[j-1] else max(dp[i-1][j], dp[i][j-1])\n    return dp[m][n]\n\nprint(lcs("abcde", "ace"))`, output: `3` },
        { title: "Knapsack 0/1", code: `def knapsack(weights, values, W):\n    n = len(weights)\n    dp = [[0]*(W+1) for _ in range(n+1)]\n    for i in range(1, n+1):\n        for w in range(W+1):\n            dp[i][w] = dp[i-1][w]\n            if weights[i-1] <= w:\n                dp[i][w] = max(dp[i][w], dp[i-1][w-weights[i-1]] + values[i-1])\n    return dp[n][W]\n\nprint(knapsack([1,3,4,5], [1,4,5,7], 7))`, output: `9` },
        { title: "Backtracking — N Queens count", code: `def n_queens(n):\n    def solve(row, cols, d1, d2):\n        if row == n: return 1\n        count = 0\n        for c in range(n):\n            if c in cols or (row-c) in d1 or (row+c) in d2: continue\n            count += solve(row+1, cols|{c}, d1|{row-c}, d2|{row+c})\n        return count\n    return solve(0, set(), set(), set())\n\nprint(n_queens(4))`, output: `2` },
        { title: "Permutations backtracking", code: `def perms(arr):\n    if len(arr) <= 1: return [arr]\n    out = []\n    for i, x in enumerate(arr):\n        for p in perms(arr[:i] + arr[i+1:]):\n            out.append([x] + p)\n    return out\n\nprint(perms([1, 2, 3]))`, output: `[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]` },
        { title: "Combinations backtracking", code: `def combos(arr, k):\n    if k == 0: return [[]]\n    if not arr: return []\n    with_first = [[arr[0]] + c for c in combos(arr[1:], k-1)]\n    without = combos(arr[1:], k)\n    return with_first + without\n\nprint(combos([1,2,3,4], 2))`, output: `[[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]` },
        { title: "Activity selection (greedy)", code: `def activities(times):\n    times.sort(key=lambda x: x[1])\n    count = 0; last_end = -1\n    for s, e in times:\n        if s >= last_end:\n            count += 1; last_end = e\n    return count\n\nprint(activities([(1,3),(2,5),(3,8),(6,9)]))`, output: `2` },
        { title: "Balanced parentheses check", code: `def balanced(s):\n    stack = []; pairs = {')':'(', ']':'[', '}':'{'}\n    for c in s:\n        if c in "([{": stack.append(c)\n        elif c in pairs:\n            if not stack or stack.pop() != pairs[c]: return False\n    return not stack\n\nprint(balanced("({[]})"), balanced("(]"))`, output: `True False` },
        { title: "Anagram check", code: `def anagram(a, b):\n    return sorted(a) == sorted(b)\n\nprint(anagram("listen", "silent"))\nprint(anagram("hello", "world"))`, output: `True\nFalse` },
        { title: "Longest common prefix", code: `def lcp(words):\n    if not words: return ""\n    p = words[0]\n    for w in words[1:]:\n        while not w.startswith(p):\n            p = p[:-1]\n            if not p: return ""\n    return p\n\nprint(lcp(["flower", "flow", "flight"]))`, output: `fl` }
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
    },
    {
      title: "Design Patterns — Practical",
      badge: "Patterns · 20+ examples",
      notes: ["Classic OOP design patterns implemented in Python."],
      examples: [
        { title: "Singleton via metaclass", code: `class Singleton(type):\n    _instances = {}\n    def __call__(cls, *a, **kw):\n        if cls not in cls._instances:\n            cls._instances[cls] = super().__call__(*a, **kw)\n        return cls._instances[cls]\n\nclass Config(metaclass=Singleton):\n    def __init__(self): self.debug = True\n\nprint(Config() is Config())`, output: `True` },
        { title: "Factory Method", code: `class Animal:\n    def sound(self): pass\nclass Dog(Animal):\n    def sound(self): return "woof"\nclass Cat(Animal):\n    def sound(self): return "meow"\n\nclass AnimalFactory:\n    @staticmethod\n    def create(kind):\n        return {"dog": Dog, "cat": Cat}[kind]()\n\nprint(AnimalFactory.create("dog").sound())`, output: `woof` },
        { title: "Abstract Factory", code: `class WinButton:\n    def click(self): return "win click"\nclass MacButton:\n    def click(self): return "mac click"\n\nclass WinFactory:\n    def button(self): return WinButton()\nclass MacFactory:\n    def button(self): return MacButton()\n\nfactories = {"win": WinFactory(), "mac": MacFactory()}\nprint(factories["win"].button().click())`, output: `win click` },
        { title: "Builder", code: `class Pizza:\n    def __init__(self):\n        self.toppings = []\n    def __str__(self): return f"Pizza({', '.join(self.toppings)})"\n\nclass PizzaBuilder:\n    def __init__(self): self.pizza = Pizza()\n    def add(self, t): self.pizza.toppings.append(t); return self\n    def build(self): return self.pizza\n\np = PizzaBuilder().add("cheese").add("mushroom").add("basil").build()\nprint(p)`, output: `Pizza(cheese, mushroom, basil)` },
        { title: "Prototype (clone)", code: `import copy\nclass Shape:\n    def __init__(self, sides): self.sides = sides\n\norig = Shape([1, 2, 3])\nclone = copy.deepcopy(orig)\nclone.sides.append(4)\nprint(orig.sides, clone.sides)`, output: `[1, 2, 3] [1, 2, 3, 4]` },
        { title: "Adapter (wrapping incompatible interface)", code: `class OldPrinter:\n    def print_old(self, text): return f"Old: {text}"\n\nclass NewPrinter:\n    def print(self, text): return f"New: {text}"\n\nclass PrinterAdapter:\n    def __init__(self, old): self.old = old\n    def print(self, text): return self.old.print_old(text)\n\np = PrinterAdapter(OldPrinter())\nprint(p.print("hello"))`, output: `Old: hello` },
        { title: "Decorator (wrapping behavior)", code: `class Text:\n    def __init__(self, s): self.s = s\n    def render(self): return self.s\n\nclass BoldText:\n    def __init__(self, wrapped): self.wrapped = wrapped\n    def render(self): return f"<b>{self.wrapped.render()}</b>"\n\nprint(BoldText(Text("hello")).render())`, output: `<b>hello</b>` },
        { title: "Facade (simplify complex subsystem)", code: `class CPU:\n    def start(self): return "CPU on"\nclass Memory:\n    def load(self): return "memory ready"\nclass Disk:\n    def read(self): return "disk read"\n\nclass Computer:\n    def __init__(self):\n        self.cpu, self.mem, self.disk = CPU(), Memory(), Disk()\n    def start(self):\n        return [self.cpu.start(), self.mem.load(), self.disk.read()]\n\nfor s in Computer().start(): print(s)`, output: `CPU on\nmemory ready\ndisk read` },
        { title: "Proxy (lazy loading)", code: `class RealImage:\n    def __init__(self, path):\n        print(f"loading {path}")\n        self.path = path\n    def display(self): return f"showing {self.path}"\n\nclass ImageProxy:\n    def __init__(self, path):\n        self.path = path; self._real = None\n    def display(self):\n        if self._real is None: self._real = RealImage(self.path)\n        return self._real.display()\n\np = ImageProxy("cat.jpg")\nprint("no load yet")\nprint(p.display())`, output: `no load yet\nloading cat.jpg\nshowing cat.jpg` },
        { title: "Composite (tree of components)", code: `class File:\n    def __init__(self, name, size): self.name, self.size = name, size\n    def total_size(self): return self.size\n\nclass Folder:\n    def __init__(self, name): self.name = name; self.children = []\n    def add(self, c): self.children.append(c)\n    def total_size(self):\n        return sum(c.total_size() for c in self.children)\n\nf = Folder("root"); f.add(File("a.txt", 100)); f.add(File("b.txt", 200))\nprint(f.total_size())`, output: `300` },
        { title: "Chain of Responsibility", code: `class Handler:\n    def __init__(self, level, nxt=None):\n        self.level, self.next = level, nxt\n    def handle(self, msg, lvl):\n        if lvl <= self.level:\n            print(f"Level {self.level}: {msg}")\n        elif self.next:\n            self.next.handle(msg, lvl)\n\nchain = Handler(1, Handler(2, Handler(3)))\nchain.handle("error", 2)`, output: `Level 2: error` },
        { title: "Command", code: `class Light:\n    def on(self): return "light on"\n    def off(self): return "light off"\n\nclass Command:\n    def __init__(self, receiver, action):\n        self.receiver, self.action = receiver, action\n    def execute(self): return getattr(self.receiver, self.action)()\n\nlight = Light()\non_cmd = Command(light, "on")\nprint(on_cmd.execute())`, output: `light on` },
        { title: "State", code: `class State:\n    def handle(self, ctx): pass\nclass StartState(State):\n    def handle(self, ctx):\n        ctx.state = StopState(); return "starting"\nclass StopState(State):\n    def handle(self, ctx):\n        ctx.state = StartState(); return "stopping"\n\nclass Ctx:\n    def __init__(self): self.state = StartState()\n\nc = Ctx()\nprint(c.state.handle(c))\nprint(c.state.handle(c))`, output: `starting\nstopping` },
        { title: "Strategy", code: `def add_strategy(a, b): return a + b\ndef mul_strategy(a, b): return a * b\n\nclass Calculator:\n    def __init__(self, strategy):\n        self.strategy = strategy\n    def compute(self, a, b):\n        return self.strategy(a, b)\n\nprint(Calculator(add_strategy).compute(3, 4))\nprint(Calculator(mul_strategy).compute(3, 4))`, output: `7\n12` },
        { title: "Template Method", code: `class Report:\n    def generate(self):\n        return [self.title(), self.body(), self.footer()]\n    def title(self): return "Report"\n    def body(self): raise NotImplementedError\n    def footer(self): return "-- end --"\n\nclass SalesReport(Report):\n    def body(self): return "Sales data..."\n\nprint(SalesReport().generate())`, output: `['Report', 'Sales data...', '-- end --']` },
        { title: "Iterator (custom)", code: `class Counter:\n    def __init__(self, limit):\n        self.limit, self.i = limit, 0\n    def __iter__(self): return self\n    def __next__(self):\n        if self.i >= self.limit: raise StopIteration\n        self.i += 1\n        return self.i\n\nprint(list(Counter(3)))`, output: `[1, 2, 3]` },
        { title: "Mediator (chat room)", code: `class ChatRoom:\n    def __init__(self): self.users = []\n    def register(self, u): self.users.append(u); u.room = self\n    def broadcast(self, sender, msg):\n        for u in self.users:\n            if u != sender: u.receive(sender.name, msg)\n\nclass User:\n    def __init__(self, name): self.name = name; self.room = None\n    def send(self, msg): self.room.broadcast(self, msg)\n    def receive(self, sender, msg): print(f"{self.name}: [{sender}] {msg}")\n\nroom = ChatRoom()\na, b = User("A"), User("B")\nroom.register(a); room.register(b)\na.send("hi")`, output: `B: [A] hi` },
        { title: "Repository pattern", code: `class UserRepo:\n    def __init__(self): self.users = {}\n    def add(self, u): self.users[u["id"]] = u\n    def get(self, uid): return self.users.get(uid)\n    def list_all(self): return list(self.users.values())\n\nrepo = UserRepo()\nrepo.add({"id": 1, "name": "Sara"})\nprint(repo.get(1))`, output: `{'id': 1, 'name': 'Sara'}` },
        { title: "Dependency Injection", code: `class EmailService:\n    def send(self, msg): return f"email sent: {msg}"\n\nclass Notifier:\n    def __init__(self, service):  # DI!\n        self.service = service\n    def notify(self, msg): return self.service.send(msg)\n\n# Inject the dependency\nn = Notifier(EmailService())\nprint(n.notify("hello"))`, output: `email sent: hello` },
        { title: "MVC (Model-View-Controller)", code: `class Model:\n    def __init__(self): self.data = "initial"\nclass View:\n    def render(self, data): return f"Display: {data}"\nclass Controller:\n    def __init__(self, m, v): self.m, self.v = m, v\n    def update(self, d): self.m.data = d\n    def show(self): return self.v.render(self.m.data)\n\nc = Controller(Model(), View())\nc.update("hello world")\nprint(c.show())`, output: `Display: hello world` }
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

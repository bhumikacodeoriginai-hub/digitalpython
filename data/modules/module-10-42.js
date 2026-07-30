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
      badge: "Errors",
      notes: ["Wrap risky code in `try`. `except` catches errors, `else` runs on success, `finally` always runs (cleanup)."],
      examples: [
        { title: "Catch an error", code: `try:\n    x = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")`, output: `Cannot divide by zero` },
        { title: "Catch specific exception", code: `try:\n    int("abc")\nexcept ValueError as e:\n    print("Bad value:", e)`, output: `Bad value: invalid literal for int() with base 10: 'abc'` },
        { title: "else and finally", code: `try:\n    n = int("5")\nexcept ValueError:\n    print("failed")\nelse:\n    print("parsed", n)\nfinally:\n    print("done")`, output: `parsed 5\ndone` },
        { title: "Multiple exceptions", code: `try:\n    data = [1]\n    print(data[5])\nexcept (IndexError, KeyError):\n    print("Lookup failed")`, output: `Lookup failed` }
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

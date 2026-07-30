/* Module 9 — Functions */
window.DP.registerModule({
  id: 9,
  title: "Functions",
  icon: "🧩",
  summary: "Defining reusable blocks of code: built-in vs user-defined functions, all argument types, lambda and recursive functions, nested functions and variable scope.",
  concepts: [
    {
      title: "Built-in & User-Defined Functions",
      badge: "Functions",
      notes: [
        "Python ships with many **built-in** functions (`len`, `sum`, `max`…). You create your own with `def name(params):` and `return` a result.",
        "> A function that doesn't `return` anything gives back `None`."
      ],
      examples: [
        { title: "Some built-in functions", code: `print(len("python"))\nprint(max(3, 9, 2))\nprint(sum([1, 2, 3]))`, output: `6\n9\n6` },
        { title: "Define & call a function", code: `def greet():\n    print("Hello!")\n\ngreet()`, output: `Hello!` },
        { title: "Function with a return value", code: `def square(n):\n    return n * n\n\nprint(square(5))`, output: `25` },
        { title: "Function with parameters", code: `def add(a, b):\n    return a + b\n\nprint(add(4, 6))`, output: `10` },
        { title: "Return multiple values", code: `def stats(nums):\n    return min(nums), max(nums)\n\nlo, hi = stats([4, 1, 9])\nprint(lo, hi)`, output: `1 9` }
      ]
    },
    {
      title: "Function Arguments",
      badge: "Functions",
      notes: [
        "Argument types:",
        "- **Positional** — matched by order.",
        "- **Keyword** — matched by name.",
        "- **Default** — used when no value is passed.",
        "- **Variable length** — `*args` (tuple) and `**kwargs` (dict)."
      ],
      examples: [
        { title: "Positional arguments", code: `def power(base, exp):\n    return base ** exp\n\nprint(power(2, 3))`, output: `8` },
        { title: "Keyword arguments", code: `def intro(name, age):\n    print(f"{name}, {age}")\n\nintro(age=25, name="Ravi")`, output: `Ravi, 25` },
        { title: "Default arguments", code: `def greet(name="Guest"):\n    print("Hi", name)\n\ngreet()\ngreet("Sara")`, output: `Hi Guest\nHi Sara` },
        { title: "*args — variable length", code: `def total(*nums):\n    return sum(nums)\n\nprint(total(1, 2, 3, 4))`, output: `10` },
        { title: "**kwargs — keyword dict", code: `def profile(**info):\n    for k, v in info.items():\n        print(k, "=", v)\n\nprofile(name="Meera", city="Pune")`, output: `name = Meera\ncity = Pune` }
      ]
    },
    {
      title: "Lambda & Anonymous Functions",
      badge: "Functions",
      notes: ["A `lambda` is a small anonymous function written in one line: `lambda args: expression`."],
      examples: [
        { title: "Simple lambda", code: `square = lambda x: x * x\nprint(square(6))`, output: `36` },
        { title: "Lambda with two args", code: `add = lambda a, b: a + b\nprint(add(3, 4))`, output: `7` },
        { title: "Lambda with sorted()", code: `pairs = [(1, "b"), (2, "a")]\nprint(sorted(pairs, key=lambda p: p[1]))`, output: `[(2, 'a'), (1, 'b')]` },
        { title: "Lambda inside map()", code: `nums = [1, 2, 3]\nprint(list(map(lambda x: x * 10, nums)))`, output: `[10, 20, 30]` }
      ]
    },
    {
      title: "Recursive & Nested Functions",
      badge: "Functions",
      notes: ["A **recursive** function calls itself (always needs a base case). A **nested** function is defined inside another function."],
      examples: [
        { title: "Factorial (recursion)", code: `def fact(n):\n    if n <= 1:\n        return 1\n    return n * fact(n - 1)\n\nprint(fact(5))`, output: `120` },
        { title: "Fibonacci (recursion)", code: `def fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nprint([fib(i) for i in range(7)])`, output: `[0, 1, 1, 2, 3, 5, 8]` },
        { title: "Nested function", code: `def outer():\n    def inner():\n        return "inner result"\n    return inner()\n\nprint(outer())`, output: `inner result` }
      ]
    },
    {
      title: "Variable Scope: Global & Local",
      badge: "Functions",
      notes: ["A **local** variable exists only inside its function. A **global** variable lives at module level; use the `global` keyword to modify it inside a function."],
      examples: [
        { title: "Local scope", code: `def f():\n    x = 10   # local\n    print(x)\n\nf()`, output: `10` },
        { title: "Global read", code: `count = 5\ndef show():\n    print(count)   # can read global\n\nshow()`, output: `5` },
        { title: "global keyword", code: `count = 0\ndef increment():\n    global count\n    count += 1\n\nincrement()\nincrement()\nprint(count)`, output: `2` },
        { title: "Function with docstring", code: `def area(r):\n    """Return the area of a circle with radius r."""\n    return 3.14159 * r * r\n\nprint(area.__doc__)\nprint(area(5))`, output: `Return the area of a circle with radius r.\n78.53975` },
        { title: "Function returning tuple", code: `def stats(nums):\n    return min(nums), max(nums), sum(nums)/len(nums)\n\nlo, hi, avg = stats([4, 1, 9, 3])\nprint(lo, hi, avg)`, output: `1 9 4.25` },
        { title: "Function as argument", code: `def apply(fn, x):\n    return fn(x)\n\nprint(apply(str.upper, "hello"))\nprint(apply(len, "python"))`, output: `HELLO\n6` },
        { title: "Function returning function", code: `def make_adder(n):\n    def add(x): return x + n\n    return add\n\nadd5 = make_adder(5)\nprint(add5(10))`, output: `15` },
        { title: "Closure counter", code: `def counter():\n    count = 0\n    def inc():\n        nonlocal count\n        count += 1\n        return count\n    return inc\n\nc = counter()\nprint(c(), c(), c())`, output: `1 2 3` },
        { title: "Recursion — sum of digits", code: `def digit_sum(n):\n    if n == 0: return 0\n    return n % 10 + digit_sum(n // 10)\n\nprint(digit_sum(1234))`, output: `10` },
        { title: "Recursion — power", code: `def power(b, e):\n    if e == 0: return 1\n    return b * power(b, e-1)\n\nprint(power(2, 10))`, output: `1024` },
        { title: "Recursion — reverse string", code: `def rev(s):\n    return s if len(s) <= 1 else rev(s[1:]) + s[0]\n\nprint(rev("hello"))`, output: `olleh` },
        { title: "Function with type hints", code: `def greet(name: str, times: int = 1) -> str:\n    return f"Hi {name}! " * times\n\nprint(greet("Ravi", 3))`, output: `Hi Ravi! Hi Ravi! Hi Ravi! ` },
        { title: "Multiple lambda in sort key", code: `people = [("A", 30), ("B", 25), ("C", 28)]\nprint(sorted(people, key=lambda p: p[1]))`, output: `[('B', 25), ('C', 28), ('A', 30)]` },
        { title: "Lambda with map", code: `nums = [1, 2, 3, 4]\nprint(list(map(lambda x: x**2, nums)))`, output: `[1, 4, 9, 16]` },
        { title: "Lambda with filter", code: `nums = [1, 2, 3, 4, 5, 6]\nprint(list(filter(lambda x: x % 2 == 0, nums)))`, output: `[2, 4, 6]` },
        { title: "Lambda with reduce", code: `from functools import reduce\nprint(reduce(lambda a, b: a*b, [1,2,3,4]))`, output: `24` },
        { title: "*args — variadic sum", code: `def total(*nums):\n    return sum(nums)\nprint(total(1, 2, 3, 4, 5))`, output: `15` },
        { title: "**kwargs — build config", code: `def config(**opts):\n    for k, v in opts.items():\n        print(f"{k}: {v}")\nconfig(host="localhost", port=8080, debug=True)`, output: `host: localhost\nport: 8080\ndebug: True` },
        { title: "Mix *args and **kwargs", code: `def show(a, *args, **kwargs):\n    print(a, args, kwargs)\nshow(1, 2, 3, x=10, y=20)`, output: `1 (2, 3) {'x': 10, 'y': 20}` },
        { title: "Unpack list into function", code: `def add(a, b, c): return a+b+c\nnums = [1, 2, 3]\nprint(add(*nums))`, output: `6` },
        { title: "Unpack dict into function", code: `def greet(name, age): print(f"{name}, {age}")\ninfo = {"name": "Sara", "age": 30}\ngreet(**info)`, output: `Sara, 30` },
        { title: "Default mutable trap fix", code: `def add_item(x, lst=None):\n    if lst is None: lst = []\n    lst.append(x)\n    return lst\n\nprint(add_item(1)); print(add_item(2))`, output: `[1]\n[2]` },
        { title: "Recursive Fibonacci", code: `def fib(n):\n    return n if n < 2 else fib(n-1) + fib(n-2)\n\nprint([fib(i) for i in range(8)])`, output: `[0, 1, 1, 2, 3, 5, 8, 13]` },
        { title: "Memoized Fibonacci with cache", code: `from functools import lru_cache\n@lru_cache\ndef fib(n):\n    return n if n < 2 else fib(n-1) + fib(n-2)\n\nprint(fib(50))`, output: `12586269025` },
        { title: "Function returning None", code: `def log(msg):\n    print("LOG:", msg)\n\nresult = log("hello")\nprint(result)`, output: `LOG: hello\nNone` },
        { title: "Higher-order — compose", code: `def compose(f, g):\n    return lambda x: f(g(x))\n\ndouble = lambda x: x*2\ninc = lambda x: x+1\nprint(compose(double, inc)(5))  # (5+1)*2`, output: `12` },
        { title: "Partial function application", code: `from functools import partial\ndef power(b, e): return b**e\ncube = partial(power, e=3)\nprint(cube(4))`, output: `64` },
        { title: "Positional-only parameter (3.8+)", code: `def divmod2(a, b, /):\n    return a // b, a % b\n\nprint(divmod2(10, 3))`, output: `(3, 1)` },
        { title: "Keyword-only parameter", code: `def make(*, host, port):\n    return f"{host}:{port}"\n\nprint(make(host="localhost", port=8080))`, output: `localhost:8080` },
        { title: "Function annotation access", code: `def add(a: int, b: int) -> int:\n    return a + b\n\nprint(add.__annotations__)`, output: `{'a': <class 'int'>, 'b': <class 'int'>, 'return': <class 'int'>}` },
        { title: "Function as dict value", code: `ops = {\n    "add": lambda a,b: a+b,\n    "sub": lambda a,b: a-b,\n}\nprint(ops["add"](5, 3))`, output: `8` },
        { title: "Nested function with closure", code: `def outer(x):\n    def inner(y):\n        return x + y\n    return inner\n\nadd10 = outer(10)\nprint(add10(5))`, output: `15` },
        { title: "Recursion — factorial", code: `def fact(n):\n    return 1 if n <= 1 else n * fact(n-1)\nprint(fact(6))`, output: `720` },
        { title: "Recursive tree sum", code: `def tree_sum(node):\n    if node is None: return 0\n    return node['val'] + tree_sum(node.get('l')) + tree_sum(node.get('r'))\n\ntree = {'val': 1, 'l': {'val': 2}, 'r': {'val': 3, 'l': {'val': 4}}}\nprint(tree_sum(tree))`, output: `10` },
        { title: "Generator function (yield)", code: `def evens(limit):\n    n = 0\n    while n < limit:\n        yield n; n += 2\n\nprint(list(evens(10)))`, output: `[0, 2, 4, 6, 8]` },
        { title: "Anonymous function in sorted", code: `words = ["banana", "apple", "cherry"]\nprint(sorted(words, key=lambda w: len(w)))`, output: `['apple', 'banana', 'cherry']` },
        { title: "Chained function calls", code: `s = "  Hello World  "\nprint(s.strip().lower().replace("world", "python"))`, output: `hello python` },
        { title: "Function with default computed", code: `import datetime\ndef stamp(msg, when=None):\n    if when is None: when = "now"\n    return f"[{when}] {msg}"\n\nprint(stamp("hi"))`, output: `[now] hi` },
        { title: "Function scoping — LEGB", code: `x = "global"\ndef outer():\n    x = "enclosing"\n    def inner():\n        x = "local"\n        print(x)\n    inner()\nouter()`, output: `local` },
        { title: "nonlocal keyword", code: `def outer():\n    n = 0\n    def inner():\n        nonlocal n\n        n += 1\n    inner(); inner()\n    return n\nprint(outer())`, output: `2` },
        { title: "Return early on error", code: `def safe_div(a, b):\n    if b == 0: return None\n    return a / b\n\nprint(safe_div(10, 2))\nprint(safe_div(10, 0))`, output: `5.0\nNone` },
        { title: "Function counting calls", code: `def counter():\n    counter.n = getattr(counter, 'n', 0) + 1\n    return counter.n\n\nprint(counter(), counter(), counter())`, output: `1 2 3` },
        { title: "Simple decorator", code: `def double(fn):\n    def wrap(*a, **kw):\n        return fn(*a, **kw) * 2\n    return wrap\n\n@double\ndef add(a, b): return a + b\n\nprint(add(3, 4))  # (3+4)*2`, output: `14` }
      ]
    }
  ]
});

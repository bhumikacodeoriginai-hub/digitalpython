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
        { title: "global keyword", code: `count = 0\ndef increment():\n    global count\n    count += 1\n\nincrement()\nincrement()\nprint(count)`, output: `2` }
      ]
    }
  ]
});

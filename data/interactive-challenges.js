/* ============================================================
   Digital Python Notes — Interactive Challenges
   Predict the Output + Find the Bug banks (Phase 4)
   Developed by Code Origin.AI Private Limited
   ============================================================ */
(function () {
  "use strict";
  var IV = window.DP_INTERVIEW;
  if (!IV) { console.warn("DP_INTERVIEW missing"); return; }

  /* ---------- Predict the Output — 45 curated challenges ---------- */
  IV.predictOutput = [
    { id: "po1",  difficulty: "Beginner",  topic: "Variables",
      code: "x = 5\ny = 2\nprint(x + y)\nprint(x - y)\nprint(x * y)",
      output: "7\n3\n10",
      explanation: "Assign then print three arithmetic results — nothing tricky here." },

    { id: "po2",  difficulty: "Beginner",  topic: "Strings",
      code: "s = 'python'\nprint(s.upper())\nprint(s[::-1])\nprint(len(s))",
      output: "PYTHON\nnohtyp\n6",
      explanation: ".upper() returns a NEW string. [::-1] reverses via slicing. len() counts characters." },

    { id: "po3",  difficulty: "Beginner",  topic: "Lists",
      code: "a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)",
      output: "[1, 2, 3, 4]",
      explanation: "`b = a` makes both names point to the SAME list. Appending via b mutates the shared list, so a shows the change." },

    { id: "po4",  difficulty: "Beginner",  topic: "Tuples",
      code: "t = (1, 2, 3)\nprint(t + (4,))\nprint(t * 2)",
      output: "(1, 2, 3, 4)\n(1, 2, 3, 1, 2, 3)",
      explanation: "Tuples are immutable, but `+` produces a NEW tuple and `*` repeats it. Note the trailing comma in `(4,)` — without it, it's just parentheses around 4." },

    { id: "po5",  difficulty: "Beginner",  topic: "Dicts",
      code: "d = {'a': 1, 'b': 2}\nd['c'] = 3\nprint(len(d))\nprint('a' in d)",
      output: "3\nTrue",
      explanation: "Adding a new key increases the size to 3. `in` on a dict checks for keys, not values." },

    { id: "po6",  difficulty: "Beginner",  topic: "Operators",
      code: "print(10 // 3)\nprint(10 % 3)\nprint(2 ** 5)",
      output: "3\n1\n32",
      explanation: "// is floor division, % is remainder, ** is exponentiation." },

    { id: "po7",  difficulty: "Beginner",  topic: "Booleans",
      code: "print(True + True)\nprint(True * 3)\nprint(bool(''))",
      output: "2\n3\nFalse",
      explanation: "True is really the integer 1 in disguise. Empty string is falsy → bool('') is False." },

    { id: "po8",  difficulty: "Easy",  topic: "Slicing",
      code: "s = 'Interview'\nprint(s[2:6])\nprint(s[:3])\nprint(s[-3:])",
      output: "terv\nInt\niew",
      explanation: "s[2:6] takes indexes 2,3,4,5. s[:3] takes 0,1,2. Negative indexes count from the end." },

    { id: "po9",  difficulty: "Easy",  topic: "Loops",
      code: "total = 0\nfor i in range(1, 5):\n    total += i\nprint(total)",
      output: "10",
      explanation: "range(1, 5) is 1,2,3,4. Sum = 1+2+3+4 = 10." },

    { id: "po10", difficulty: "Easy",  topic: "Conditions",
      code: "x = 7\nif x > 5 and x < 10:\n    print('mid')\nelif x >= 10:\n    print('big')\nelse:\n    print('small')",
      output: "mid",
      explanation: "7 > 5 AND 7 < 10 is True, so 'mid' prints. The other branches are skipped." },

    { id: "po11", difficulty: "Easy",  topic: "String Methods",
      code: "s = 'a,b,,c'\nprint(s.split(','))\nprint('-'.join(['x', 'y', 'z']))",
      output: "['a', 'b', '', 'c']\nx-y-z",
      explanation: "split keeps empty strings between consecutive separators. join glues an iterable with a separator." },

    { id: "po12", difficulty: "Easy",  topic: "List Methods",
      code: "a = [3, 1, 2]\na.sort()\nprint(a)\nb = sorted([5, 4], reverse=True)\nprint(b)",
      output: "[1, 2, 3]\n[5, 4]",
      explanation: ".sort() mutates the list. sorted() returns a new sorted list. reverse=True gives descending order." },

    { id: "po13", difficulty: "Intermediate", topic: "Mutable Default",
      code: "def add(x, lst=[]):\n    lst.append(x)\n    return lst\n\nprint(add(1))\nprint(add(2))\nprint(add(3))",
      output: "[1]\n[1, 2]\n[1, 2, 3]",
      explanation: "🎯 CLASSIC TRAP: The default list is created ONCE when the function is defined, and reused across calls. Always use `lst=None` and initialise inside." },

    { id: "po14", difficulty: "Intermediate", topic: "is vs ==",
      code: "a = [1, 2, 3]\nb = [1, 2, 3]\nprint(a == b)\nprint(a is b)",
      output: "True\nFalse",
      explanation: "`==` compares values (equal). `is` compares identity — a and b are two SEPARATE list objects that happen to hold equal contents." },

    { id: "po15", difficulty: "Intermediate", topic: "Integer Cache",
      code: "a = 256\nb = 256\nprint(a is b)\na = 257\nb = 257\nprint(a is b)",
      output: "True\nFalse",
      explanation: "CPython caches small ints from -5 to 256. Beyond that, each assignment can create a new object → identity differs." },

    { id: "po16", difficulty: "Intermediate", topic: "String Interning",
      code: "a = 'hello'\nb = 'hello'\nprint(a is b)\nc = 'hello world!'\nd = 'hello world!'\nprint(c is d)",
      output: "True\nTrue",
      explanation: "Simple string literals are interned (deduplicated) in CPython. Behaviour can vary — never rely on `is` for string equality." },

    { id: "po17", difficulty: "Intermediate", topic: "List Multiplication",
      code: "grid = [[0] * 3] * 3\ngrid[0][0] = 1\nprint(grid)",
      output: "[[1, 0, 0], [1, 0, 0], [1, 0, 0]]",
      explanation: "🎯 TRAP: `[[0]*3]*3` creates ONE inner list referenced 3 times. Modifying grid[0][0] shows up in all rows. Use a comprehension instead: `[[0]*3 for _ in range(3)]`." },

    { id: "po18", difficulty: "Intermediate", topic: "Closures",
      code: "funcs = []\nfor i in range(3):\n    funcs.append(lambda: i)\nprint([f() for f in funcs])",
      output: "[2, 2, 2]",
      explanation: "🎯 LATE-BINDING TRAP: The lambdas capture the VARIABLE i, not its value. By the time we call them, i is 2. Fix: `lambda i=i: i`." },

    { id: "po19", difficulty: "Intermediate", topic: "Set Ops",
      code: "a = {1, 2, 3}\nb = {3, 4, 5}\nprint(a & b)\nprint(a | b)\nprint(a - b)\nprint(a ^ b)",
      output: "{3}\n{1, 2, 3, 4, 5}\n{1, 2}\n{1, 2, 4, 5}",
      explanation: "& = intersection, | = union, - = difference, ^ = symmetric difference (in either but not both)." },

    { id: "po20", difficulty: "Intermediate", topic: "Dict get",
      code: "d = {'a': 1}\nprint(d.get('a'))\nprint(d.get('b'))\nprint(d.get('b', 99))",
      output: "1\nNone\n99",
      explanation: ".get() returns None for missing keys. Passing a second arg gives a custom default." },

    { id: "po21", difficulty: "Intermediate", topic: "Comprehensions",
      code: "nums = [1, 2, 3, 4, 5]\nresult = [n*2 for n in nums if n % 2 == 0]\nprint(result)",
      output: "[4, 8]",
      explanation: "The comprehension filters even numbers (2, 4) then doubles each. Order: iterate → filter → map." },

    { id: "po22", difficulty: "Intermediate", topic: "Dict Comprehension",
      code: "sqs = {n: n*n for n in range(1, 4)}\nprint(sqs)",
      output: "{1: 1, 2: 4, 3: 9}",
      explanation: "Dict comprehension: `{key: value for var in iter}`. Great for building lookup tables in one line." },

    { id: "po23", difficulty: "Intermediate", topic: "Unpacking",
      code: "a, *b, c = [1, 2, 3, 4, 5]\nprint(a)\nprint(b)\nprint(c)",
      output: "1\n[2, 3, 4]\n5",
      explanation: "Extended unpacking: * captures everything in the middle. a = first, c = last, b = the leftover list." },

    { id: "po24", difficulty: "Intermediate", topic: "Zip",
      code: "names = ['Ana', 'Bob']\nages = [30, 25, 40]\nprint(list(zip(names, ages)))",
      output: "[('Ana', 30), ('Bob', 25)]",
      explanation: "zip stops at the shortest iterable. Ana→30, Bob→25, and 40 is dropped." },

    { id: "po25", difficulty: "Intermediate", topic: "Enumerate",
      code: "items = ['a', 'b', 'c']\nfor i, x in enumerate(items, start=10):\n    print(i, x)",
      output: "10 a\n11 b\n12 c",
      explanation: "enumerate yields (index, value) pairs. `start=10` bumps the initial index." },

    { id: "po26", difficulty: "Intermediate", topic: "Try/Finally",
      code: "def f():\n    try:\n        return 1\n    finally:\n        return 2\nprint(f())",
      output: "2",
      explanation: "🎯 TRICKY: finally always runs. When it contains a return, it OVERRIDES the try's return value. Avoid returning from finally in real code." },

    { id: "po27", difficulty: "Intermediate", topic: "Loop else",
      code: "for i in range(3):\n    print(i)\nelse:\n    print('done')",
      output: "0\n1\n2\ndone",
      explanation: "Python's for/else: the else runs only if the loop completes WITHOUT a `break`. Useful for search loops." },

    { id: "po28", difficulty: "Intermediate", topic: "Loop else + break",
      code: "for i in range(3):\n    if i == 1:\n        break\nelse:\n    print('done')\nprint('after')",
      output: "after",
      explanation: "Since `break` fired, the else clause is SKIPPED. Only 'after' prints." },

    { id: "po29", difficulty: "Advanced", topic: "Generators",
      code: "def gen():\n    yield 1\n    yield 2\n    yield 3\n\ng = gen()\nprint(next(g))\nprint(list(g))",
      output: "1\n[2, 3]",
      explanation: "next(g) consumes the first item. Then list(g) drains the rest. A generator is single-use — once consumed, always consumed." },

    { id: "po30", difficulty: "Advanced", topic: "Generators exhausted",
      code: "g = (x*2 for x in range(3))\nprint(list(g))\nprint(list(g))",
      output: "[0, 2, 4]\n[]",
      explanation: "🎯 TRAP: Generator expressions can be iterated ONCE. The second list(g) sees an exhausted iterator." },

    { id: "po31", difficulty: "Advanced", topic: "Decorators",
      code: "def deco(fn):\n    def w(*a, **kw):\n        return fn(*a, **kw) * 2\n    return w\n\n@deco\ndef add(a, b):\n    return a + b\n\nprint(add(3, 4))",
      output: "14",
      explanation: "The decorator wraps add so its result is doubled. add(3,4)=7, wrapper returns 7*2=14." },

    { id: "po32", difficulty: "Advanced", topic: "Class attributes",
      code: "class A:\n    n = 0\n    def inc(self):\n        A.n += 1\n\na, b = A(), A()\na.inc(); b.inc()\nprint(A.n)\nprint(a.n)",
      output: "2\n2",
      explanation: "n is a CLASS variable shared across instances. Both instances calling inc() bump the shared counter to 2." },

    { id: "po33", difficulty: "Advanced", topic: "Instance shadows class",
      code: "class A:\n    n = 10\n\na = A()\na.n = 99\nprint(A.n)\nprint(a.n)",
      output: "10\n99",
      explanation: "Writing `a.n = 99` creates an INSTANCE attribute that shadows the class attribute. A.n stays 10." },

    { id: "po34", difficulty: "Advanced", topic: "MRO",
      code: "class A:\n    def m(self): return 'A'\nclass B(A):\n    def m(self): return 'B'\nclass C(A):\n    def m(self): return 'C'\nclass D(B, C):\n    pass\nprint(D().m())",
      output: "B",
      explanation: "Python uses C3 linearization: D → B → C → A. Since B defines m() first in the MRO, it wins." },

    { id: "po35", difficulty: "Advanced", topic: "Dict update order",
      code: "d = {'a': 1}\nd.update({'b': 2, 'a': 10})\nprint(d)",
      output: "{'a': 10, 'b': 2}",
      explanation: "update() overwrites existing keys with new values. Insertion order is preserved (Py 3.7+): 'a' keeps its position, 'b' appended." },

    { id: "po36", difficulty: "Advanced", topic: "Function default arg",
      code: "x = 10\ndef f(a=x):\n    return a\nx = 99\nprint(f())",
      output: "10",
      explanation: "Default arguments are evaluated ONCE at function-definition time. f's default was bound to 10 before x was reassigned." },

    { id: "po37", difficulty: "Advanced", topic: "Any / All",
      code: "print(any([]))\nprint(all([]))\nprint(any([0, '', None]))\nprint(all([1, 'x']))",
      output: "False\nTrue\nFalse\nTrue",
      explanation: "🎯 EDGE CASE: all([]) is True by convention (vacuous truth — no falses found). any([]) is False (no trues found)." },

    { id: "po38", difficulty: "Advanced", topic: "Chained comparisons",
      code: "print(1 < 2 < 3)\nprint(1 < 2 > 3)\nprint(5 > 3 < 4)",
      output: "True\nFalse\nTrue",
      explanation: "Python chains comparisons: `a<b<c` is `a<b and b<c`. Read them as sequential 'and' checks." },

    { id: "po39", difficulty: "Advanced", topic: "Ternary",
      code: "x = 5\nresult = 'even' if x % 2 == 0 else 'odd'\nprint(result)",
      output: "odd",
      explanation: "Conditional expression: `value_if_true if condition else value_if_false`. x=5 is odd." },

    { id: "po40", difficulty: "Advanced", topic: "String Formatting",
      code: "name = 'Ravi'\nage = 30\nprint(f'{name:>8}|{age:03d}')",
      output: "    Ravi|030",
      explanation: "`>8` right-aligns in width 8. `03d` pads the integer to 3 digits with leading zeros." },

    { id: "po41", difficulty: "Expert", topic: "Global vs Local",
      code: "x = 10\ndef f():\n    x = 20\n    print(x)\nf()\nprint(x)",
      output: "20\n10",
      explanation: "Inside f, `x = 20` creates a LOCAL x. The outer x=10 is untouched. To modify the outer, you'd need `global x`." },

    { id: "po42", difficulty: "Expert", topic: "Nonlocal",
      code: "def outer():\n    x = 1\n    def inner():\n        nonlocal x\n        x += 10\n    inner()\n    return x\nprint(outer())",
      output: "11",
      explanation: "`nonlocal x` targets the ENCLOSING function's x (not global). Without it, `x += 10` would raise UnboundLocalError." },

    { id: "po43", difficulty: "Expert", topic: "Walrus operator",
      code: "nums = [1, 2, 3, 4, 5]\nif (n := len(nums)) > 3:\n    print(f'{n} items')",
      output: "5 items",
      explanation: "The walrus `:=` assigns AND returns in one expression. Avoids recomputing len(nums) inside the if body." },

    { id: "po44", difficulty: "Expert", topic: "Truthy/Falsy",
      code: "vals = [0, '', [], None, 'x', [0]]\nprint([bool(v) for v in vals])",
      output: "[False, False, False, False, True, True]",
      explanation: "Falsy: 0, empty string, empty list, None. Truthy: non-empty string, non-empty list — even if that element is 0." },

    { id: "po45", difficulty: "Expert", topic: "GIL / Threading",
      code: "import threading\nc = 0\ndef inc():\n    global c\n    for _ in range(1000):\n        c += 1\nts = [threading.Thread(target=inc) for _ in range(2)]\nfor t in ts: t.start()\nfor t in ts: t.join()\n# c may or may not be 2000\nprint('possibly', c, 'or less')",
      output: "possibly 2000 or less",
      explanation: "🎯 Even with the GIL, `c += 1` is read-modify-write. Two threads can interleave and lose updates. Use threading.Lock or itertools.count." }
  ];

  /* ---------- Find the Bug — 30 curated challenges ---------- */
  IV.findBug = [
    { id: "bug1", difficulty: "Beginner", topic: "Indentation",
      buggyCode: "def greet(name):\nprint('Hello ' + name)\n\ngreet('Ravi')",
      fixedCode: "def greet(name):\n    print('Hello ' + name)\n\ngreet('Ravi')",
      bug: "Missing indentation inside the function body",
      explanation: "Python uses indentation to define code blocks. The body of a function must be indented (4 spaces is standard). Without it, Python raises IndentationError.",
      hints: ["Look at the line inside the function", "Python is whitespace-sensitive"] },

    { id: "bug2", difficulty: "Beginner", topic: "Colon",
      buggyCode: "for i in range(5)\n    print(i)",
      fixedCode: "for i in range(5):\n    print(i)",
      bug: "Missing colon at the end of the for statement",
      explanation: "Every for/if/while/def/class/try header in Python ends with a colon. Without it, you get SyntaxError.",
      hints: ["Compound statements need a colon", "Check the end of the first line"] },

    { id: "bug3", difficulty: "Beginner", topic: "String concat",
      buggyCode: "age = 25\nprint('Age is: ' + age)",
      fixedCode: "age = 25\nprint('Age is: ' + str(age))\n# or: print(f'Age is: {age}')",
      bug: "Trying to concatenate int with str using +",
      explanation: "Python does not implicitly convert types. Convert age with str(age) or use an f-string.",
      hints: ["The types don't match", "How would you convert int to str?"] },

    { id: "bug4", difficulty: "Beginner", topic: "Off-by-one",
      buggyCode: "nums = [10, 20, 30]\nfor i in range(1, len(nums)):\n    print(nums[i])",
      fixedCode: "nums = [10, 20, 30]\nfor i in range(len(nums)):\n    print(nums[i])",
      bug: "Loop starts at 1 instead of 0 — skips first element",
      explanation: "range() starts at 0 by default. Using range(1, ...) skips index 0. Better yet: iterate directly with `for n in nums`.",
      hints: ["Where does the loop start?", "Which element is missed?"] },

    { id: "bug5", difficulty: "Beginner", topic: "Assign vs Compare",
      buggyCode: "x = 5\nif x = 10:\n    print('ten')",
      fixedCode: "x = 5\nif x == 10:\n    print('ten')",
      bug: "Used `=` (assignment) instead of `==` (comparison)",
      explanation: "= assigns a value. == checks equality. In a condition you always want == (or 'is' for identity).",
      hints: ["One equals or two?", "Assignment vs comparison"] },

    { id: "bug6", difficulty: "Easy", topic: "Modify while iterating",
      buggyCode: "nums = [1, 2, 3, 4, 5]\nfor n in nums:\n    if n % 2 == 0:\n        nums.remove(n)\nprint(nums)",
      fixedCode: "nums = [1, 2, 3, 4, 5]\nnums = [n for n in nums if n % 2 != 0]\nprint(nums)",
      bug: "Modifying a list while iterating skips elements",
      explanation: "When you remove an item, the iterator's index shifts. Result is unreliable (misses 4). Fix: iterate a copy `for n in nums[:]:` or use a list comprehension.",
      hints: ["What happens when the list length changes mid-loop?"] },

    { id: "bug7", difficulty: "Easy", topic: "Mutable default arg",
      buggyCode: "def add_item(item, cart=[]):\n    cart.append(item)\n    return cart\n\nprint(add_item('pen'))\nprint(add_item('book'))",
      fixedCode: "def add_item(item, cart=None):\n    if cart is None:\n        cart = []\n    cart.append(item)\n    return cart",
      bug: "Mutable default argument shared across calls",
      explanation: "The default `[]` is created ONCE and reused. Subsequent calls append to the SAME list. Use None as sentinel.",
      hints: ["What is the default `[]` shared between?"] },

    { id: "bug8", difficulty: "Easy", topic: "Division",
      buggyCode: "def average(nums):\n    return sum(nums) / len(nums)\n\nprint(average([]))",
      fixedCode: "def average(nums):\n    if not nums:\n        return 0\n    return sum(nums) / len(nums)",
      bug: "Division by zero when list is empty",
      explanation: "sum([])/len([]) is 0/0 → ZeroDivisionError. Always validate inputs before division.",
      hints: ["Edge case: empty input", "What is len([])?"] },

    { id: "bug9", difficulty: "Easy", topic: "Index error",
      buggyCode: "def last(lst):\n    return lst[len(lst)]\n\nprint(last([1, 2, 3]))",
      fixedCode: "def last(lst):\n    return lst[len(lst) - 1]\n# or simpler: return lst[-1]",
      bug: "Off-by-one on the last-element index",
      explanation: "A 3-item list has indexes 0, 1, 2. len(lst)=3, but index 3 doesn't exist → IndexError. Use len(lst)-1 or lst[-1].",
      hints: ["Last valid index vs length"] },

    { id: "bug10", difficulty: "Easy", topic: "Late binding",
      buggyCode: "funcs = []\nfor i in range(3):\n    funcs.append(lambda: i)\n\nfor f in funcs:\n    print(f())",
      fixedCode: "funcs = []\nfor i in range(3):\n    funcs.append(lambda i=i: i)\n\nfor f in funcs:\n    print(f())",
      bug: "Closures capture variable name, not value — all return 2",
      explanation: "All lambdas share the same `i` binding. By call time i=2. Bind at definition with a default arg: `lambda i=i: i`.",
      hints: ["Late-binding closure trap"] },

    { id: "bug11", difficulty: "Intermediate", topic: "Except order",
      buggyCode: "try:\n    val = int('abc')\nexcept Exception:\n    print('generic')\nexcept ValueError:\n    print('specific')",
      fixedCode: "try:\n    val = int('abc')\nexcept ValueError:\n    print('specific')\nexcept Exception:\n    print('generic')",
      bug: "More specific exception is placed AFTER a broader one — never reached",
      explanation: "Python checks handlers top-down. Exception catches everything first. Put specific handlers before general ones.",
      hints: ["Order of except clauses matters"] },

    { id: "bug12", difficulty: "Intermediate", topic: "File not closed",
      buggyCode: "f = open('data.txt')\ncontent = f.read()\nprocess(content)\nf.close()",
      fixedCode: "with open('data.txt') as f:\n    content = f.read()\nprocess(content)",
      bug: "If process() raises, the file never closes",
      explanation: "Between open and close, any exception leaks the file handle. Use `with` — it guarantees close() runs even on error.",
      hints: ["Resource leak on exception", "Context manager"] },

    { id: "bug13", difficulty: "Intermediate", topic: "Copy vs Reference",
      buggyCode: "matrix = [[0] * 3] * 3\nmatrix[0][0] = 1\nprint(matrix)",
      fixedCode: "matrix = [[0] * 3 for _ in range(3)]\nmatrix[0][0] = 1\nprint(matrix)",
      bug: "All 3 rows are the SAME list — writing to row 0 shows in all rows",
      explanation: "`[x] * 3` repeats the reference 3 times, not 3 independent lists. Use a list comprehension so each row is fresh.",
      hints: ["What does list multiplication actually copy?"] },

    { id: "bug14", difficulty: "Intermediate", topic: "Hash of unhashable",
      buggyCode: "d = { [1,2]: 'value' }\nprint(d)",
      fixedCode: "d = { (1,2): 'value' }\nprint(d)",
      bug: "Lists cannot be dictionary keys — they are mutable and unhashable",
      explanation: "Dict keys must be hashable (immutable). Use a tuple instead of a list.",
      hints: ["Mutable objects can't be hashed"] },

    { id: "bug15", difficulty: "Intermediate", topic: "Global scope",
      buggyCode: "count = 0\ndef inc():\n    count += 1\ninc()\nprint(count)",
      fixedCode: "count = 0\ndef inc():\n    global count\n    count += 1\ninc()\nprint(count)",
      bug: "Modifying a global inside a function without `global` declaration",
      explanation: "`count += 1` treats count as local because it's assigned in the function. Reading before defining raises UnboundLocalError. Declare `global count`.",
      hints: ["Local vs global scope"] },

    { id: "bug16", difficulty: "Intermediate", topic: "Float equality",
      buggyCode: "if 0.1 + 0.2 == 0.3:\n    print('equal')\nelse:\n    print('not equal')",
      fixedCode: "import math\nif math.isclose(0.1 + 0.2, 0.3):\n    print('equal')\nelse:\n    print('not equal')",
      bug: "Floating-point representation errors — 0.1 + 0.2 = 0.30000000000000004",
      explanation: "Floats can't represent 0.1 or 0.2 exactly in binary. Never compare floats with `==` — use math.isclose or round.",
      hints: ["Try printing 0.1 + 0.2 directly"] },

    { id: "bug17", difficulty: "Intermediate", topic: "Dict iteration",
      buggyCode: "d = {'a': 1, 'b': 2, 'c': 3}\nfor k in d:\n    if k == 'b':\n        del d[k]\nprint(d)",
      fixedCode: "d = {'a': 1, 'b': 2, 'c': 3}\nfor k in list(d):\n    if k == 'b':\n        del d[k]\nprint(d)",
      bug: "Can't delete keys while iterating a dict — RuntimeError",
      explanation: "Modifying a dict during iteration is illegal. Take a snapshot with `list(d)` or build a set of keys to delete and remove afterwards.",
      hints: ["Dict changed size during iteration"] },

    { id: "bug18", difficulty: "Intermediate", topic: "Truth of container",
      buggyCode: "def has_data(items):\n    if items == True:\n        return 'yes'\n    return 'no'\n\nprint(has_data([1,2,3]))",
      fixedCode: "def has_data(items):\n    if items:\n        return 'yes'\n    return 'no'",
      bug: "Comparing a list to True never matches — always returns 'no'",
      explanation: "`[1,2,3] == True` is False. Use truthiness: `if items:` returns 'yes' for any non-empty list.",
      hints: ["Avoid comparing to True / False"] },

    { id: "bug19", difficulty: "Advanced", topic: "Deep copy",
      buggyCode: "import copy\noriginal = {'nums': [1, 2, 3]}\nshallow = copy.copy(original)\nshallow['nums'].append(999)\nprint(original)",
      fixedCode: "import copy\noriginal = {'nums': [1, 2, 3]}\ndeep = copy.deepcopy(original)\ndeep['nums'].append(999)\nprint(original)",
      bug: "Shallow copy shares nested objects — changing deep list mutates original",
      explanation: "copy.copy duplicates only the top level; nested list is still shared. Use copy.deepcopy to duplicate recursively.",
      hints: ["Shallow vs deep"] },

    { id: "bug20", difficulty: "Advanced", topic: "Generator drain",
      buggyCode: "def evens():\n    for i in range(10):\n        if i % 2 == 0:\n            yield i\n\ng = evens()\nprint(list(g))\nprint(list(g))",
      fixedCode: "def evens():\n    for i in range(10):\n        if i % 2 == 0:\n            yield i\n\nprint(list(evens()))\nprint(list(evens()))",
      bug: "Generators are single-use — second list(g) is empty",
      explanation: "Once a generator is drained, it stays exhausted. Call the generator function again to get a fresh one.",
      hints: ["Generators can be iterated only once"] },

    { id: "bug21", difficulty: "Advanced", topic: "super()",
      buggyCode: "class Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        self.breed = breed\n\nd = Dog('Rex', 'Lab')\nprint(d.name)",
      fixedCode: "class Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name)\n        self.breed = breed",
      bug: "Subclass never called parent __init__, so name is unset",
      explanation: "Dog overrides __init__ but doesn't invoke Animal's init. Use super().__init__(...) to reuse parent behaviour.",
      hints: ["Attribute error on d.name — where is name set?"] },

    { id: "bug22", difficulty: "Advanced", topic: "Concurrent counter",
      buggyCode: "import threading\ncount = 0\ndef inc():\n    global count\n    for _ in range(100000):\n        count += 1\n\nts = [threading.Thread(target=inc) for _ in range(4)]\nfor t in ts: t.start()\nfor t in ts: t.join()\nprint(count)",
      fixedCode: "import threading\ncount = 0\nlock = threading.Lock()\ndef inc():\n    global count\n    for _ in range(100000):\n        with lock:\n            count += 1\n\nts = [threading.Thread(target=inc) for _ in range(4)]\nfor t in ts: t.start()\nfor t in ts: t.join()\nprint(count)",
      bug: "Race condition — `count += 1` is not atomic even under the GIL",
      explanation: "The GIL protects individual bytecodes but += is read-modify-write. Threads can interleave and lose updates. Use threading.Lock.",
      hints: ["Multiple threads writing to the same variable"] },

    { id: "bug23", difficulty: "Advanced", topic: "SQL injection",
      buggyCode: "user_id = input('id: ')\ncursor.execute(f'SELECT * FROM users WHERE id = {user_id}')",
      fixedCode: "user_id = input('id: ')\ncursor.execute('SELECT * FROM users WHERE id = ?', (user_id,))",
      bug: "String-formatting user input into SQL — classic SQL injection",
      explanation: "Never concatenate/format user input into SQL. Use parameter placeholders — the driver escapes safely. Otherwise `'; DROP TABLE users; --` gets executed.",
      hints: ["Attacker inputs: '; DROP TABLE users; --"] },

    { id: "bug24", difficulty: "Advanced", topic: "Recursion",
      buggyCode: "def factorial(n):\n    return n * factorial(n - 1)\n\nprint(factorial(5))",
      fixedCode: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)",
      bug: "Missing base case — infinite recursion → RecursionError",
      explanation: "Every recursive function needs a base case where it returns without recursing. Otherwise the call stack blows up.",
      hints: ["When does recursion stop?"] },

    { id: "bug25", difficulty: "Advanced", topic: "Type hint mismatch",
      buggyCode: "def total(items: list[int]) -> int:\n    return items[0] + items[1]\n\nprint(total(['a', 'b']))",
      fixedCode: "def total(items: list[int]) -> int:\n    if not all(isinstance(i, int) for i in items):\n        raise TypeError('expected list of ints')\n    return sum(items)",
      bug: "Type hints aren't enforced at runtime — bad input yields 'ab', not an error",
      explanation: "Type hints are advisory. Add explicit validation or use pydantic/mypy for real enforcement.",
      hints: ["What does + do with strings?"] },

    { id: "bug26", difficulty: "Expert", topic: "Async blocking",
      buggyCode: "import asyncio, time\nasync def fetch(url):\n    time.sleep(1)  # blocking!\n    return url\n\nasync def main():\n    r = await asyncio.gather(fetch('a'), fetch('b'), fetch('c'))\n    print(r)\n\nasyncio.run(main())",
      fixedCode: "import asyncio\nasync def fetch(url):\n    await asyncio.sleep(1)\n    return url\n\nasync def main():\n    r = await asyncio.gather(fetch('a'), fetch('b'), fetch('c'))\n    print(r)\n\nasyncio.run(main())",
      bug: "time.sleep blocks the event loop — cannot run concurrently",
      explanation: "In async code, never call blocking APIs. Use asyncio.sleep, aiohttp, or asyncio.to_thread. Otherwise you serialise all coroutines.",
      hints: ["Why does the code take 3 seconds not 1?"] },

    { id: "bug27", difficulty: "Expert", topic: "Weak reference",
      buggyCode: "cache = {}\ndef expensive(x):\n    if x not in cache:\n        cache[x] = x * x  # never evicted!\n    return cache[x]",
      fixedCode: "from functools import lru_cache\n\n@lru_cache(maxsize=128)\ndef expensive(x):\n    return x * x",
      bug: "Unbounded cache grows forever — memory leak",
      explanation: "A plain dict cache never evicts entries. Use functools.lru_cache with a maxsize, or a weakref-based cache, or a proper LRU implementation.",
      hints: ["What happens after 10 million distinct inputs?"] },

    { id: "bug28", difficulty: "Expert", topic: "Datetime tz",
      buggyCode: "from datetime import datetime\ndef is_recent(iso_str):\n    dt = datetime.fromisoformat(iso_str)\n    return (datetime.now() - dt).days < 7",
      fixedCode: "from datetime import datetime, timezone\ndef is_recent(iso_str):\n    dt = datetime.fromisoformat(iso_str)\n    if dt.tzinfo is None:\n        dt = dt.replace(tzinfo=timezone.utc)\n    now = datetime.now(timezone.utc)\n    return (now - dt).days < 7",
      bug: "Naive datetime — mixes timezone-aware and naive values",
      explanation: "datetime.now() is naive by default; parsed dt might be timezone-aware. Subtracting naive from aware raises TypeError. Always work in UTC.",
      hints: ["Aware vs naive datetimes"] },

    { id: "bug29", difficulty: "Expert", topic: "Iterator vs Iterable",
      buggyCode: "class Numbers:\n    def __init__(self, n):\n        self.n = n\n    def __iter__(self):\n        for i in range(self.n):\n            yield i\n        return self  # bug\n\nn = Numbers(3)\nprint(list(n))",
      fixedCode: "class Numbers:\n    def __init__(self, n):\n        self.n = n\n    def __iter__(self):\n        for i in range(self.n):\n            yield i",
      bug: "Returning from a generator function silently ends iteration — the `return self` is misleading (it becomes StopIteration value)",
      explanation: "In a generator, `return X` raises StopIteration(X). The return here is dead code and the mixed intent confuses readers. Drop the return.",
      hints: ["Should __iter__ be a generator or return an iterator?"] },

    { id: "bug30", difficulty: "Expert", topic: "Broad except",
      buggyCode: "def safe_divide(a, b):\n    try:\n        return a / b\n    except:\n        return 0",
      fixedCode: "def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return 0",
      bug: "Bare except catches EVERYTHING, including KeyboardInterrupt and SystemExit",
      explanation: "`except:` swallows control-flow exceptions too — you can't Ctrl+C the program. Catch specific exceptions (ZeroDivisionError here) or at minimum `except Exception:`.",
      hints: ["What happens when you press Ctrl+C?"] }
  ];

  /* ---------- Phase 6: Adaptive picker ----------
     Uses DPProgress metrics to bias question selection toward weak topics. */
  IV.pickAdaptive = function (count) {
    count = count || 10;
    var progress = window.DPProgress;
    var metrics = progress ? progress.computeMetrics(IV.questions) : null;

    // Fresh user with no history — return a balanced beginner-friendly set
    if (!metrics || (metrics.correct + metrics.incorrect) === 0) {
      return IV.pickMockQuestions({ count: count, difficulty: "Beginner" });
    }

    var weakTopics = metrics.weak.map(function (w) { return w.topic; });
    var strongTopics = metrics.strong.map(function (s) { return s.topic; });

    var pool = IV.questions.map(function (q, i) { return { q: q, index: i }; });

    // Score each candidate — higher = more useful for this user
    pool.forEach(function (item) {
      var q = item.q;
      var s = 1;
      // Big boost if in a weak topic (need practice here)
      if (weakTopics.indexOf(q.level) !== -1) s += 8;
      // Boost easier difficulties when weak — build confidence
      if (weakTopics.indexOf(q.level) !== -1) {
        if (q.difficulty === "Beginner")    s += 4;
        if (q.difficulty === "Easy")        s += 3;
        if (q.difficulty === "Intermediate") s += 1;
      }
      // Boost unstudied questions
      if (progress && !progress.isStudied(item.index)) s += 3;
      // Boost frequency
      var freqW = { extreme:4, very:3, often:2, common:1, rare:0 };
      s += (freqW[q.frequency] || 1);
      // Slight boost harder for strong topics (challenge)
      if (strongTopics.indexOf(q.level) !== -1) {
        if (q.difficulty === "Advanced") s += 2;
        if (q.difficulty === "Expert")   s += 3;
      }
      // Penalise already-correct questions unless bookmarked
      if (progress && progress.isCorrect(item.index) && !progress.isBookmarked(item.index)) s -= 4;
      item._score = s;
    });

    pool.sort(function (a, b) { return b._score - a._score; });
    // Shuffle within top 2x count, then take count
    var top = pool.slice(0, Math.max(count * 2, count + 5));
    for (var i = top.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = top[i]; top[i] = top[j]; top[j] = tmp;
    }
    return top.slice(0, count);
  };
})();

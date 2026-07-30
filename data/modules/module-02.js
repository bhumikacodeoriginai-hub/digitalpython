/* Module 2 — Python Data Types (v3 — 65+ examples) */
window.DP.registerModule({
  id: 2,
  title: "Python Data Types",
  icon: "🧮",
  summary: "The built-in data types: numeric (int, float, complex), strings and their methods, booleans, lists, tuples, dictionaries and sets — with 65+ practical examples.",
  concepts: [
    {
      title: "Numeric Types: int, float, complex",
      badge: "Type · 12 examples",
      notes: [
        "Python has three numeric types:",
        "- **int** — whole numbers of unlimited size.",
        "- **float** — decimal (floating-point) numbers.",
        "- **complex** — numbers with real + imaginary parts.",
        "> Use `type()` to check and `isinstance()` to test."
      ],
      examples: [
        { title: "Three numeric types", code: `a = 100\nb = 10.5\nc = 2 + 5j\nprint(type(a), type(b), type(c))`, output: `<class 'int'> <class 'float'> <class 'complex'>` },
        { title: "Integers have unlimited size", code: `big = 2 ** 100\nprint(big)`, output: `1267650600228229401496703205376` },
        { title: "Float precision issue", code: `print(0.1 + 0.2)\nprint(round(0.1 + 0.2, 2))`, output: `0.30000000000000004\n0.3` },
        { title: "Complex number parts", code: `z = 3 + 4j\nprint(z.real, z.imag, abs(z))`, output: `3.0 4.0 5.0` },
        { title: "Different integer bases", code: `print(0b1010, 0o17, 0xFF)`, output: `10 15 255` },
        { title: "Convert between types", code: `print(int(9.8), float(7), complex(2))`, output: `9 7.0 (2+0j)` },
        { title: "Divmod — quotient & remainder", code: `q, r = divmod(17, 5)\nprint(q, r)`, output: `3 2` },
        { title: "Absolute value", code: `print(abs(-42), abs(3+4j))`, output: `42 5.0` },
        { title: "Power with modulus", code: `print(pow(2, 10))\nprint(pow(2, 10, 1000))`, output: `1024\n24` },
        { title: "Check if integer", code: `x = 5.0\nprint(x.is_integer())`, output: `True` },
        { title: "Infinity and NaN", code: `inf = float("inf")\nnan = float("nan")\nprint(inf > 1000000, nan == nan)`, output: `True False` },
        { title: "Number formatting", code: `n = 1234567.89\nprint(f"{n:,.2f}")\nprint(f"{n:.2e}")`, output: `1,234,567.89\n1.23e+06` }
      ]
    },

    {
      title: "String Operations & Methods",
      badge: "Type · 22 examples",
      notes: [
        "A **string** is an immutable sequence of characters. Key operations: indexing, slicing, concatenation, repetition, membership. Methods: `upper`, `lower`, `title`, `capitalize`, `split`, `join`, `replace`, `strip`, `find`, `index`, `count`, `startswith`, `endswith`, `isalpha`, `isdigit`, `isalnum`, `center`, `ljust`, `rjust`, `zfill`."
      ],
      examples: [
        { title: "Create & access", code: `s = "Python"\nprint(s[0], s[-1], len(s))`, output: `P n 6` },
        { title: "Slicing", code: `s = "Hello World"\nprint(s[0:5])\nprint(s[6:])\nprint(s[::-1])`, output: `Hello\nWorld\ndlroW olleH` },
        { title: "Concatenation & repetition", code: `print("Hi" + " " + "there")\nprint("-" * 20)`, output: `Hi there\n--------------------` },
        { title: "Membership", code: `print("Py" in "Python")\nprint("xyz" not in "Python")`, output: `True\nTrue` },
        { title: "upper() / lower() / title()", code: `s = "hello world"\nprint(s.upper(), s.title())`, output: `HELLO WORLD Hello World` },
        { title: "capitalize() / swapcase()", code: `s = "hELLO"\nprint(s.capitalize(), s.swapcase())`, output: `Hello Hello` },
        { title: "split() and join()", code: `words = "one,two,three".split(",")\nprint(words)\nprint(" | ".join(words))`, output: `['one', 'two', 'three']\none | two | three` },
        { title: "replace()", code: `s = "I love Java"\nprint(s.replace("Java", "Python"))`, output: `I love Python` },
        { title: "strip() / lstrip() / rstrip()", code: `s = "  hello  "\nprint(f"[{s.strip()}]")\nprint(f"[{s.lstrip()}]")`, output: `[hello]\n[hello  ]` },
        { title: "find() and index()", code: `s = "programming"\nprint(s.find("gram"), s.find("xyz"))`, output: `3 -1` },
        { title: "count()", code: `print("banana".count("a"))`, output: `3` },
        { title: "startswith() / endswith()", code: `f = "report.pdf"\nprint(f.startswith("report"), f.endswith(".pdf"))`, output: `True True` },
        { title: "isalpha() / isdigit() / isalnum()", code: `print("abc".isalpha(), "123".isdigit(), "abc1".isalnum())`, output: `True True True` },
        { title: "center() / ljust() / rjust()", code: `print("Hi".center(10, "-"))\nprint("Hi".ljust(10, "."))\nprint("Hi".rjust(10, "."))`, output: `----Hi----\nHi........\n........Hi` },
        { title: "zfill() — pad with zeros", code: `print("42".zfill(5))\nprint("3.14".zfill(7))`, output: `00042\n003.14` },
        { title: "f-string formatting", code: `name, score = "Ravi", 95.5\nprint(f"{name} scored {score:.1f}%")`, output: `Ravi scored 95.5%` },
        { title: "Multi-line string", code: `text = """Line 1\nLine 2\nLine 3"""\nprint(text)`, output: `Line 1\nLine 2\nLine 3` },
        { title: "Raw string (no escape)", code: `path = r"C:\\Users\\name"\nprint(path)`, output: `C:\\Users\\name` },
        { title: "String to list of chars", code: `print(list("abc"))`, output: `['a', 'b', 'c']` },
        { title: "Reverse a string", code: `s = "Python"\nprint(s[::-1])`, output: `nohtyP` },
        { title: "Check palindrome", code: `word = "madam"\nprint(word == word[::-1])`, output: `True` },
        { title: "Remove vowels", code: `s = "Hello World"\nresult = "".join(c for c in s if c.lower() not in "aeiou")\nprint(result)`, output: `Hll Wrld` }
      ]
    },

    {
      title: "Boolean Type",
      badge: "Type · 6 examples",
      notes: ["`True` and `False`. Result from comparisons. `bool()` converts any value — empty/zero = False, else True."],
      examples: [
        { title: "Boolean values", code: `print(True, False, type(True))`, output: `True False <class 'bool'>` },
        { title: "Comparisons produce booleans", code: `print(5 > 2, 5 == 2, 10 != 10)`, output: `True False False` },
        { title: "Booleans are numbers", code: `print(True + True + False)`, output: `2` },
        { title: "Truthy and falsy", code: `print(bool(0), bool(""), bool([]))\nprint(bool(1), bool("x"), bool([1]))`, output: `False False False\nTrue True True` },
        { title: "Logical operators", code: `print(True and False)\nprint(True or False)\nprint(not True)`, output: `False\nTrue\nFalse` },
        { title: "Short-circuit evaluation", code: `print(0 or "default")\nprint("value" and "other")`, output: `default\nother` }
      ]
    },

    {
      title: "List — Create, Modify, Delete & Methods",
      badge: "Type · 18 examples",
      notes: [
        "A **list** is ordered, mutable, allows duplicates. Created with `[]`. Methods: `append`, `extend`, `insert`, `remove`, `pop`, `clear`, `sort`, `reverse`, `copy`, `count`, `index`.",
        "> Lists are the most used data structure in Python."
      ],
      examples: [
        { title: "Create a list", code: `fruits = ["apple", "banana", "cherry"]\nprint(fruits)`, output: `['apple', 'banana', 'cherry']` },
        { title: "Access & negative index", code: `nums = [10, 20, 30, 40, 50]\nprint(nums[0], nums[-1], nums[1:4])`, output: `10 50 [20, 30, 40]` },
        { title: "Modify an item", code: `nums = [1, 2, 3]\nnums[1] = 99\nprint(nums)`, output: `[1, 99, 3]` },
        { title: "append() & extend()", code: `a = [1, 2]\na.append(3)\na.extend([4, 5])\nprint(a)`, output: `[1, 2, 3, 4, 5]` },
        { title: "insert() at position", code: `a = [1, 3, 4]\na.insert(1, 2)\nprint(a)`, output: `[1, 2, 3, 4]` },
        { title: "remove() & pop()", code: `a = [1, 2, 3, 2]\na.remove(2)\nlast = a.pop()\nprint(a, "popped:", last)`, output: `[1, 3] popped: 2` },
        { title: "sort() & reverse()", code: `nums = [5, 1, 3, 2, 4]\nnums.sort()\nprint(nums)\nnums.reverse()\nprint(nums)`, output: `[1, 2, 3, 4, 5]\n[5, 4, 3, 2, 1]` },
        { title: "sort with key", code: `words = ["banana", "apple", "cherry"]\nwords.sort(key=len)\nprint(words)`, output: `['apple', 'banana', 'cherry']` },
        { title: "copy() vs aliasing", code: `a = [1, 2, 3]\nb = a.copy()\nb.append(4)\nprint(a, b)`, output: `[1, 2, 3] [1, 2, 3, 4]` },
        { title: "count() & index()", code: `a = [1, 2, 2, 3, 2]\nprint(a.count(2), a.index(3))`, output: `3 3` },
        { title: "List comprehension", code: `squares = [x*x for x in range(1, 6)]\nprint(squares)`, output: `[1, 4, 9, 16, 25]` },
        { title: "Nested list (matrix)", code: `matrix = [[1, 2], [3, 4], [5, 6]]\nprint(matrix[1][0])`, output: `3` },
        { title: "Flatten nested list", code: `nested = [[1, 2], [3, 4], [5]]\nflat = [x for row in nested for x in row]\nprint(flat)`, output: `[1, 2, 3, 4, 5]` },
        { title: "Filter with comprehension", code: `nums = [1, 2, 3, 4, 5, 6]\nevens = [n for n in nums if n % 2 == 0]\nprint(evens)`, output: `[2, 4, 6]` },
        { title: "Unpack a list", code: `first, *rest = [10, 20, 30, 40]\nprint(first, rest)`, output: `10 [20, 30, 40]` },
        { title: "Zip two lists", code: `names = ["A", "B", "C"]\nscores = [90, 80, 70]\nprint(list(zip(names, scores)))`, output: `[('A', 90), ('B', 80), ('C', 70)]` },
        { title: "Find max, min, sum", code: `nums = [4, 1, 9, 2, 7]\nprint(max(nums), min(nums), sum(nums))`, output: `9 1 23` },
        { title: "Remove duplicates (preserve order)", code: `nums = [1, 3, 2, 3, 1, 4]\nseen = []\nfor n in nums:\n    if n not in seen:\n        seen.append(n)\nprint(seen)`, output: `[1, 3, 2, 4]` }
      ]
    },

    {
      title: "Tuple",
      badge: "Type · 10 examples",
      notes: ["An ordered, **immutable** collection in `()`. Use for fixed data (coords, DB rows). Methods: `count`, `index`. Supports packing/unpacking."],
      examples: [
        { title: "Create a tuple", code: `point = (3, 4)\nprint(point, type(point))`, output: `(3, 4) <class 'tuple'>` },
        { title: "Access items", code: `t = (10, 20, 30)\nprint(t[0], t[-1], t[1:])`, output: `10 30 (20, 30)` },
        { title: "Packing & unpacking", code: `person = "Ravi", 25, "Pune"\nname, age, city = person\nprint(name, age, city)`, output: `Ravi 25 Pune` },
        { title: "Single-element tuple", code: `one = (5,)\nprint(type(one), type((5)))`, output: `<class 'tuple'> <class 'int'>` },
        { title: "Immutable — cannot change", code: `t = (1, 2, 3)\ntry:\n    t[0] = 99\nexcept TypeError as e:\n    print(e)`, output: `'tuple' object does not support item assignment` },
        { title: "Extended unpacking", code: `first, *mid, last = (1, 2, 3, 4, 5)\nprint(first, mid, last)`, output: `1 [2, 3, 4] 5` },
        { title: "count() and index()", code: `t = (1, 2, 2, 3, 2)\nprint(t.count(2), t.index(3))`, output: `3 3` },
        { title: "Tuple as dict key", code: `locations = {(28.6, 77.2): "Delhi", (19.0, 72.8): "Mumbai"}\nprint(locations[(28.6, 77.2)])`, output: `Delhi` },
        { title: "Return multiple values (tuple)", code: `def stats(nums):\n    return min(nums), max(nums), sum(nums)\n\nlo, hi, total = stats([4, 1, 9])\nprint(lo, hi, total)`, output: `1 9 14` },
        { title: "Named tuple for readability", code: `from collections import namedtuple\nStudent = namedtuple("Student", "name age")\ns = Student("Meera", 22)\nprint(s.name, s.age)`, output: `Meera 22` }
      ]
    },

    {
      title: "Dictionary",
      badge: "Type · 14 examples",
      notes: ["Key-value pairs in `{}`. Keys must be unique and immutable. Methods: `keys`, `values`, `items`, `get`, `update`, `pop`, `popitem`, `clear`, `setdefault`."],
      examples: [
        { title: "Create & access", code: `student = {"name": "Arjun", "age": 25}\nprint(student["name"])`, output: `Arjun` },
        { title: "Add & update", code: `d = {"a": 1}\nd["b"] = 2\nd["a"] = 100\nprint(d)`, output: `{'a': 100, 'b': 2}` },
        { title: "get() — safe access", code: `d = {"x": 1}\nprint(d.get("x"), d.get("z", "default"))`, output: `1 default` },
        { title: "keys(), values(), items()", code: `d = {"x": 1, "y": 2}\nprint(list(d.keys()))\nprint(list(d.values()))\nprint(list(d.items()))`, output: `['x', 'y']\n[1, 2]\n[('x', 1), ('y', 2)]` },
        { title: "Loop over items", code: `d = {"a": 1, "b": 2, "c": 3}\nfor k, v in d.items():\n    print(f"{k} = {v}")`, output: `a = 1\nb = 2\nc = 3` },
        { title: "update()", code: `d = {"a": 1}\nd.update({"b": 2, "c": 3})\nprint(d)`, output: `{'a': 1, 'b': 2, 'c': 3}` },
        { title: "pop() & popitem()", code: `d = {"a": 1, "b": 2, "c": 3}\nprint(d.pop("a"))\nprint(d.popitem())`, output: `1\n('c', 3)` },
        { title: "setdefault()", code: `d = {"a": 1}\nd.setdefault("b", 99)\nd.setdefault("a", 99)\nprint(d)`, output: `{'a': 1, 'b': 99}` },
        { title: "Dict comprehension", code: `sq = {x: x*x for x in range(1, 6)}\nprint(sq)`, output: `{1: 1, 2: 4, 3: 9, 4: 16, 5: 25}` },
        { title: "Nested dictionary", code: `users = {\n    "u1": {"name": "Sara", "age": 30},\n    "u2": {"name": "Ravi", "age": 25}\n}\nprint(users["u1"]["name"])`, output: `Sara` },
        { title: "Merge dicts (Python 3.9+)", code: `a = {"x": 1}\nb = {"y": 2}\nmerged = a | b\nprint(merged)`, output: `{'x': 1, 'y': 2}` },
        { title: "Count word frequency", code: `text = "a b a c b a"\nfreq = {}\nfor w in text.split():\n    freq[w] = freq.get(w, 0) + 1\nprint(freq)`, output: `{'a': 3, 'b': 2, 'c': 1}` },
        { title: "Sort dict by value", code: `d = {"b": 2, "a": 3, "c": 1}\nsorted_d = dict(sorted(d.items(), key=lambda x: x[1]))\nprint(sorted_d)`, output: `{'c': 1, 'b': 2, 'a': 3}` },
        { title: "Delete with del", code: `d = {"a": 1, "b": 2}\ndel d["a"]\nprint(d)`, output: `{'b': 2}` }
      ]
    },

    {
      title: "Set & Frozenset",
      badge: "Type · 12 examples",
      notes: ["Unordered collection of **unique** values in `{}`. Methods: `add`, `update`, `remove`, `discard`, `union`, `intersection`, `difference`, `symmetric_difference`. `frozenset` is immutable."],
      examples: [
        { title: "Create (removes duplicates)", code: `s = {1, 2, 2, 3, 3, 3}\nprint(s)`, output: `{1, 2, 3}` },
        { title: "From a list", code: `nums = [1, 1, 2, 3, 3]\nprint(set(nums))`, output: `{1, 2, 3}` },
        { title: "add() & update()", code: `s = {1, 2}\ns.add(3)\ns.update([4, 5])\nprint(s)`, output: `{1, 2, 3, 4, 5}` },
        { title: "remove() vs discard()", code: `s = {1, 2, 3}\ns.discard(99)  # no error\ns.remove(2)\nprint(s)`, output: `{1, 3}` },
        { title: "union() — combine all", code: `a, b = {1, 2}, {2, 3}\nprint(a | b)`, output: `{1, 2, 3}` },
        { title: "intersection() — common", code: `a, b = {1, 2, 3}, {2, 3, 4}\nprint(a & b)`, output: `{2, 3}` },
        { title: "difference() — in a not b", code: `a, b = {1, 2, 3}, {2, 3}\nprint(a - b)`, output: `{1}` },
        { title: "symmetric_difference()", code: `a, b = {1, 2, 3}, {3, 4, 5}\nprint(a ^ b)`, output: `{1, 2, 4, 5}` },
        { title: "Subset & superset", code: `a = {1, 2}\nb = {1, 2, 3, 4}\nprint(a.issubset(b), b.issuperset(a))`, output: `True True` },
        { title: "frozenset (immutable)", code: `fs = frozenset([1, 2, 3])\nprint(fs, type(fs))`, output: `frozenset({1, 2, 3}) <class 'frozenset'>` },
        { title: "Set as filter for uniqueness", code: `emails = ["a@b.com", "c@d.com", "a@b.com"]\nunique = list(set(emails))\nprint(len(unique))`, output: `2` },
        { title: "Set comprehension", code: `s = {x % 5 for x in range(20)}\nprint(sorted(s))`, output: `[0, 1, 2, 3, 4]` }
      ]
    }
  ]
});

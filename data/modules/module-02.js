/* Module 2 — Python Data Types */
window.DP.registerModule({
  id: 2,
  title: "Python Data Types",
  icon: "🧮",
  summary: "The built-in data types: numeric (int, float, complex), strings and their methods, booleans, lists, tuples, dictionaries and sets — with the key operations and methods for each.",
  concepts: [
    {
      title: "Numeric Types: int, float, complex",
      badge: "Type",
      notes: [
        "Python has three numeric types:",
        "- **int** — whole numbers of unlimited size, e.g. `100`.",
        "- **float** — decimal numbers, e.g. `10.5`.",
        "- **complex** — numbers with a real and imaginary part, e.g. `2+5j`.",
        "> Use `type()` to check a value's type and `isinstance()` to test it."
      ],
      examples: [
        { title: "The three numeric types", code: `a = 100      # int\nb = 10.5     # float\nc = 2 + 5j   # complex\nprint(type(a), type(b), type(c))`, output: `<class 'int'> <class 'float'> <class 'complex'>` },
        { title: "Integers have unlimited size", code: `big = 2 ** 100\nprint(big)`, output: `1267650600228229401496703205376` },
        { title: "Float precision", code: `print(0.1 + 0.2)\nprint(round(0.1 + 0.2, 2))`, output: `0.30000000000000004\n0.3` },
        { title: "Complex number parts", code: `z = 3 + 4j\nprint(z.real, z.imag)\nprint(abs(z))   # magnitude`, output: `3.0 4.0\n5.0` },
        { title: "Different integer bases", code: `print(0b1010)  # binary\nprint(0o17)    # octal\nprint(0xFF)    # hex`, output: `10\n15\n255` },
        { title: "Convert between numeric types", code: `print(int(9.8))\nprint(float(7))\nprint(complex(2))`, output: `9\n7.0\n(2+0j)` }
      ]
    },

    {
      title: "String Operations",
      badge: "Type",
      notes: [
        "A **string** is an ordered, immutable sequence of characters written in quotes.",
        "Core operations: **indexing**, **negative indexing**, **slicing**, **concatenation** (`+`), **repetition** (`*`), **membership** (`in`) and **formatting**."
      ],
      examples: [
        { title: "Create a string", code: `name = "Python"\nprint(name)`, output: `Python` },
        { title: "Indexing", code: `s = "Python"\nprint(s[0])   # first\nprint(s[3])`, output: `P\nh` },
        { title: "Negative indexing", code: `s = "Python"\nprint(s[-1])  # last\nprint(s[-2])`, output: `n\no` },
        { title: "Slicing [start:stop]", code: `s = "Python"\nprint(s[0:3])\nprint(s[2:])`, output: `Pyt\nthon` },
        { title: "Slicing with step", code: `s = "Python"\nprint(s[::2])   # every 2nd char\nprint(s[::-1])  # reversed`, output: `Pto\nnohtyP` },
        { title: "Concatenation", code: `a = "Hello"\nb = "World"\nprint(a + " " + b)`, output: `Hello World` },
        { title: "Repetition", code: `print("ab" * 3)\nprint("-" * 10)`, output: `ababab\n----------` },
        { title: "Membership test", code: `s = "programming"\nprint("gram" in s)\nprint("xyz" not in s)`, output: `True\nTrue` },
        { title: "String length", code: `print(len("Python"))`, output: `6` },
        { title: "Loop over characters", code: `for ch in "abc":\n    print(ch)`, output: `a\nb\nc` },
        { title: "Multi-line string", code: `text = """Line 1\nLine 2"""\nprint(text)`, output: `Line 1\nLine 2` },
        { title: "f-string formatting", code: `name, age = "Sara", 30\nprint(f"{name} is {age}")`, output: `Sara is 30` }
      ]
    },

    {
      title: "String Methods",
      badge: "Methods",
      notes: [
        "Strings come with many built-in methods. They return **new** strings (strings are immutable).",
        "Covered here: `upper`, `lower`, `title`, `capitalize`, `split`, `replace`, `strip`, `find`, `index`, `count`, `startswith`, `endswith`, `isalpha`, `isdigit`, `isalnum`."
      ],
      examples: [
        { title: "upper() and lower()", code: `s = "Python"\nprint(s.upper())\nprint(s.lower())`, output: `PYTHON\npython` },
        { title: "title() and capitalize()", code: `s = "hello world"\nprint(s.title())\nprint(s.capitalize())`, output: `Hello World\nHello world` },
        { title: "split()", code: `s = "a,b,c"\nprint(s.split(","))`, output: `['a', 'b', 'c']` },
        { title: "split() on whitespace", code: `s = "one two three"\nprint(s.split())`, output: `['one', 'two', 'three']` },
        { title: "replace()", code: `s = "I like Java"\nprint(s.replace("Java", "Python"))`, output: `I like Python` },
        { title: "strip()", code: `s = "   spaced   "\nprint("[" + s.strip() + "]")`, output: `[spaced]` },
        { title: "find()", code: `s = "programming"\nprint(s.find("gram"))\nprint(s.find("xyz"))  # -1 if not found`, output: `3\n-1` },
        { title: "index()", code: `s = "programming"\nprint(s.index("g"))`, output: `3` },
        { title: "count()", code: `s = "banana"\nprint(s.count("a"))`, output: `3` },
        { title: "startswith() / endswith()", code: `f = "report.pdf"\nprint(f.startswith("report"))\nprint(f.endswith(".pdf"))`, output: `True\nTrue` },
        { title: "isalpha()", code: `print("abc".isalpha())\nprint("abc1".isalpha())`, output: `True\nFalse` },
        { title: "isdigit()", code: `print("123".isdigit())\nprint("12.3".isdigit())`, output: `True\nFalse` },
        { title: "isalnum()", code: `print("abc123".isalnum())\nprint("abc 123".isalnum())`, output: `True\nFalse` },
        { title: "join() — the opposite of split", code: `words = ["Learn", "Python", "Today"]\nprint(" ".join(words))`, output: `Learn Python Today` }
      ]
    },

    {
      title: "Boolean Type",
      badge: "Type",
      notes: [
        "The **bool** type has exactly two values: `True` and `False`. They result from comparisons and are used in conditions.",
        "Internally `True == 1` and `False == 0`.",
        "> Comparison operators (`>`, `==`, `<`, etc.) produce booleans."
      ],
      examples: [
        { title: "The two boolean values", code: `print(True)\nprint(False)\nprint(type(True))`, output: `True\nFalse\n<class 'bool'>` },
        { title: "Comparisons produce booleans", code: `print(5 > 2)\nprint(5 == 2)`, output: `True\nFalse` },
        { title: "Booleans are numbers", code: `print(True + True)\nprint(False + 10)`, output: `2\n10` },
        { title: "bool() of different values", code: `print(bool(0))\nprint(bool(""))\nprint(bool("x"))\nprint(bool([1]))`, output: `False\nFalse\nTrue\nTrue` },
        { title: "Combine with logical operators", code: `age = 20\nprint(age > 18 and age < 60)`, output: `True` }
      ]
    },

    {
      title: "List — Create, Modify, Delete",
      badge: "Type",
      notes: [
        "A **list** is an ordered, **mutable** collection written in square brackets `[]`. It can hold mixed types and can be nested.",
        "You can add, change and remove items after creation."
      ],
      examples: [
        { title: "Create a list", code: `fruits = ["apple", "banana", "cherry"]\nprint(fruits)`, output: `['apple', 'banana', 'cherry']` },
        { title: "Access by index", code: `nums = [10, 20, 30]\nprint(nums[0], nums[-1])`, output: `10 30` },
        { title: "Modify an item", code: `nums = [10, 20, 30]\nnums[1] = 99\nprint(nums)`, output: `[10, 99, 30]` },
        { title: "Slice a list", code: `nums = [1, 2, 3, 4, 5]\nprint(nums[1:4])`, output: `[2, 3, 4]` },
        { title: "Mixed types & nesting", code: `data = [1, "two", 3.0, [4, 5]]\nprint(data[3])`, output: `[4, 5]` },
        { title: "Nested list access", code: `matrix = [[1, 2], [3, 4]]\nprint(matrix[1][0])`, output: `3` },
        { title: "Delete with del", code: `nums = [1, 2, 3]\ndel nums[0]\nprint(nums)`, output: `[2, 3]` },
        { title: "Membership & length", code: `nums = [1, 2, 3]\nprint(2 in nums, len(nums))`, output: `True 3` },
        { title: "Loop over a list", code: `for f in ["a", "b", "c"]:\n    print(f)`, output: `a\nb\nc` },
        { title: "List concatenation & repetition", code: `print([1, 2] + [3, 4])\nprint([0] * 3)`, output: `[1, 2, 3, 4]\n[0, 0, 0]` }
      ]
    },

    {
      title: "List Methods",
      badge: "Methods",
      notes: [
        "The list methods from the syllabus: `append`, `extend`, `insert`, `remove`, `pop`, `clear`, `sort`, `reverse`, `copy`, `count`, `index`."
      ],
      examples: [
        { title: "append() — add to end", code: `nums = [1, 2]\nnums.append(3)\nprint(nums)`, output: `[1, 2, 3]` },
        { title: "extend() — add many", code: `nums = [1, 2]\nnums.extend([3, 4])\nprint(nums)`, output: `[1, 2, 3, 4]` },
        { title: "insert() — at position", code: `nums = [1, 3]\nnums.insert(1, 2)\nprint(nums)`, output: `[1, 2, 3]` },
        { title: "remove() — by value", code: `nums = [1, 2, 3, 2]\nnums.remove(2)\nprint(nums)`, output: `[1, 3, 2]` },
        { title: "pop() — remove & return", code: `nums = [1, 2, 3]\nlast = nums.pop()\nprint(last, nums)`, output: `3 [1, 2]` },
        { title: "clear() — empty the list", code: `nums = [1, 2, 3]\nnums.clear()\nprint(nums)`, output: `[]` },
        { title: "sort()", code: `nums = [3, 1, 2]\nnums.sort()\nprint(nums)`, output: `[1, 2, 3]` },
        { title: "sort(reverse=True)", code: `nums = [3, 1, 2]\nnums.sort(reverse=True)\nprint(nums)`, output: `[3, 2, 1]` },
        { title: "reverse()", code: `nums = [1, 2, 3]\nnums.reverse()\nprint(nums)`, output: `[3, 2, 1]` },
        { title: "copy()", code: `a = [1, 2]\nb = a.copy()\nb.append(3)\nprint(a, b)`, output: `[1, 2] [1, 2, 3]` },
        { title: "count()", code: `nums = [1, 2, 2, 3, 2]\nprint(nums.count(2))`, output: `3` },
        { title: "index()", code: `nums = [10, 20, 30]\nprint(nums.index(20))`, output: `1` }
      ]
    },

    {
      title: "Tuple",
      badge: "Type",
      notes: [
        "A **tuple** is an ordered but **immutable** collection written in parentheses `()`.",
        "Concepts: create, access, **packing**, **unpacking**, and the immutable idea. Methods: `count`, `index`.",
        "> Use tuples for fixed collections that should not change (like coordinates)."
      ],
      examples: [
        { title: "Create a tuple", code: `point = (3, 4)\nprint(point)`, output: `(3, 4)` },
        { title: "Access items", code: `t = (10, 20, 30)\nprint(t[0], t[-1])`, output: `10 30` },
        { title: "Packing", code: `person = "Ravi", 25, "Pune"\nprint(person)`, output: `('Ravi', 25, 'Pune')` },
        { title: "Unpacking", code: `name, age, city = ("Ravi", 25, "Pune")\nprint(name, age, city)`, output: `Ravi 25 Pune` },
        { title: "Immutable — cannot change", code: `t = (1, 2, 3)\nt[0] = 99  # TypeError`, output: `TypeError: 'tuple' object does not support item assignment` },
        { title: "Single-element tuple needs a comma", code: `one = (5,)\nnot_tuple = (5)\nprint(type(one), type(not_tuple))`, output: `<class 'tuple'> <class 'int'>` },
        { title: "count()", code: `t = (1, 2, 2, 3, 2)\nprint(t.count(2))`, output: `3` },
        { title: "index()", code: `t = (10, 20, 30)\nprint(t.index(30))`, output: `2` },
        { title: "Extended unpacking with *", code: `first, *rest = (1, 2, 3, 4)\nprint(first, rest)`, output: `1 [2, 3, 4]` }
      ]
    },

    {
      title: "Dictionary",
      badge: "Type",
      notes: [
        "A **dictionary** stores data as **key: value** pairs in curly braces `{}`. Keys are unique and immutable.",
        "Concepts: create, access, update, delete. Methods: `keys`, `values`, `items`, `get`, `update`, `pop`, `popitem`, `clear`."
      ],
      examples: [
        { title: "Create a dictionary", code: `student = {"name": "Arjun", "age": 25}\nprint(student)`, output: `{'name': 'Arjun', 'age': 25}` },
        { title: "Access by key", code: `student = {"name": "Arjun", "age": 25}\nprint(student["name"])`, output: `Arjun` },
        { title: "Update / add a key", code: `d = {"a": 1}\nd["b"] = 2\nd["a"] = 100\nprint(d)`, output: `{'a': 100, 'b': 2}` },
        { title: "Delete a key with del", code: `d = {"a": 1, "b": 2}\ndel d["a"]\nprint(d)`, output: `{'b': 2}` },
        { title: "keys(), values(), items()", code: `d = {"x": 1, "y": 2}\nprint(list(d.keys()))\nprint(list(d.values()))\nprint(list(d.items()))`, output: `['x', 'y']\n[1, 2]\n[('x', 1), ('y', 2)]` },
        { title: "get() — safe access", code: `d = {"a": 1}\nprint(d.get("a"))\nprint(d.get("z", "default"))`, output: `1\ndefault` },
        { title: "update()", code: `d = {"a": 1}\nd.update({"b": 2, "c": 3})\nprint(d)`, output: `{'a': 1, 'b': 2, 'c': 3}` },
        { title: "pop() by key", code: `d = {"a": 1, "b": 2}\nval = d.pop("a")\nprint(val, d)`, output: `1 {'b': 2}` },
        { title: "popitem() — last pair", code: `d = {"a": 1, "b": 2}\nprint(d.popitem())`, output: `('b', 2)` },
        { title: "clear()", code: `d = {"a": 1}\nd.clear()\nprint(d)`, output: `{}` },
        { title: "Loop over items", code: `d = {"x": 1, "y": 2}\nfor k, v in d.items():\n    print(k, "=", v)`, output: `x = 1\ny = 2` }
      ]
    },

    {
      title: "Set",
      badge: "Type",
      notes: [
        "A **set** is an unordered collection of **unique** values written in curly braces `{}`. A **frozenset** is an immutable set.",
        "Methods & operations: `add`, `update`, `remove`, `discard`, `union`, `intersection`, `difference`, `symmetric_difference`."
      ],
      examples: [
        { title: "Create a set (removes duplicates)", code: `s = {1, 2, 2, 3, 3, 3}\nprint(s)`, output: `{1, 2, 3}` },
        { title: "Unique values from a list", code: `nums = [1, 1, 2, 3, 3]\nprint(set(nums))`, output: `{1, 2, 3}` },
        { title: "add()", code: `s = {1, 2}\ns.add(3)\nprint(s)`, output: `{1, 2, 3}` },
        { title: "update() — add many", code: `s = {1}\ns.update([2, 3])\nprint(s)`, output: `{1, 2, 3}` },
        { title: "remove() vs discard()", code: `s = {1, 2, 3}\ns.discard(5)   # no error if missing\ns.remove(2)\nprint(s)`, output: `{1, 3}` },
        { title: "union()", code: `a = {1, 2}\nb = {2, 3}\nprint(a.union(b))`, output: `{1, 2, 3}` },
        { title: "intersection()", code: `a = {1, 2, 3}\nb = {2, 3, 4}\nprint(a.intersection(b))`, output: `{2, 3}` },
        { title: "difference()", code: `a = {1, 2, 3}\nb = {2, 3}\nprint(a.difference(b))`, output: `{1}` },
        { title: "symmetric_difference()", code: `a = {1, 2, 3}\nb = {3, 4}\nprint(a.symmetric_difference(b))`, output: `{1, 2, 4}` },
        { title: "frozenset — immutable set", code: `fs = frozenset([1, 2, 3])\nprint(fs)\n# fs.add(4) would raise AttributeError`, output: `frozenset({1, 2, 3})` }
      ]
    }
  ]
});

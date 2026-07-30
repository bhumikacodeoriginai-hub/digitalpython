/* Module 5 — Type Conversion */
window.DP.registerModule({
  id: 5,
  title: "Type Conversion",
  icon: "🔄",
  summary: "Implicit (automatic) versus explicit (manual) type conversion, and the casting functions int(), float(), str(), list(), tuple() and set().",
  concepts: [
    {
      title: "Implicit Conversion",
      badge: "Concept",
      notes: ["Python automatically promotes a smaller type to a larger one to avoid data loss (e.g. int → float). This is **implicit** conversion / type coercion."],
      examples: [
        { title: "int + float becomes float", code: `result = 5 + 2.0\nprint(result, type(result))`, output: `7.0 <class 'float'>` },
        { title: "int + bool", code: `print(10 + True)`, output: `11` },
        { title: "Division promotes to float", code: `x = 6 / 2\nprint(x, type(x))`, output: `3.0 <class 'float'>` },
        { title: "int and complex", code: `z = 3 + (2 + 1j)\nprint(z, type(z))`, output: `(5+1j) <class 'complex'>` }
      ]
    },
    {
      title: "Explicit Conversion (Casting)",
      badge: "Concept",
      notes: ["You convert types manually with casting functions: `int()`, `float()`, `str()`, `list()`, `tuple()`, `set()`."],
      examples: [
        { title: "int()", code: `print(int("100"))\nprint(int(9.9))`, output: `100\n9` },
        { title: "float()", code: `print(float("3.14"))\nprint(float(7))`, output: `3.14\n7.0` },
        { title: "str()", code: `n = 25\nprint("Age: " + str(n))`, output: `Age: 25` },
        { title: "list() from string", code: `print(list("abc"))`, output: `['a', 'b', 'c']` },
        { title: "list() from tuple", code: `print(list((1, 2, 3)))`, output: `[1, 2, 3]` },
        { title: "tuple() from list", code: `print(tuple([1, 2, 3]))`, output: `(1, 2, 3)` },
        { title: "set() removes duplicates", code: `print(set([1, 1, 2, 3]))`, output: `{1, 2, 3}` },
        { title: "int with a base", code: `print(int("FF", 16))\nprint(int("1010", 2))`, output: `255\n10` },
        { title: "Invalid conversion raises error", code: `int("hello")  # ValueError`, output: `ValueError: invalid literal for int() with base 10: 'hello'` },
        { title: "Round-trip number <-> string", code: `n = 42\ns = str(n)\nback = int(s)\nprint(s, back, back + 1)`, output: `42 42 43` },
        { title: "int() rounds toward zero", code: `print(int(3.9), int(-3.9))`, output: `3 -3` },
        { title: "int from bool", code: `print(int(True), int(False))`, output: `1 0` },
        { title: "float from int", code: `print(float(10))`, output: `10.0` },
        { title: "float from scientific string", code: `print(float("1.5e3"))`, output: `1500.0` },
        { title: "str from float removes trailing", code: `print(str(2.0), str(2.50))`, output: `2.0 2.5` },
        { title: "list from string (chars)", code: `print(list("abc"))`, output: `['a', 'b', 'c']` },
        { title: "list from dict (keys)", code: `d = {"a":1, "b":2}\nprint(list(d))`, output: `['a', 'b']` },
        { title: "list from dict.items()", code: `d = {"a":1, "b":2}\nprint(list(d.items()))`, output: `[('a', 1), ('b', 2)]` },
        { title: "tuple from range", code: `print(tuple(range(5)))`, output: `(0, 1, 2, 3, 4)` },
        { title: "set from list removes duplicates", code: `print(set([1,1,2,3,3]))`, output: `{1, 2, 3}` },
        { title: "set from string (unique chars)", code: `print(sorted(set("mississippi")))`, output: `['i', 'm', 'p', 's']` },
        { title: "dict from list of pairs", code: `print(dict([("a",1),("b",2)]))`, output: `{'a': 1, 'b': 2}` },
        { title: "dict from zip", code: `keys=["a","b"]; vals=[1,2]\nprint(dict(zip(keys, vals)))`, output: `{'a': 1, 'b': 2}` },
        { title: "chr() and ord() — char codes", code: `print(ord("A"), chr(97))`, output: `65 a` },
        { title: "int to binary string", code: `print(bin(10), oct(10), hex(255))`, output: `0b1010 0o12 0xff` },
        { title: "Convert temperature string", code: `s = "37.5°C"\nn = float(s.replace("°C",""))\nprint(n * 9/5 + 32)`, output: `99.5` },
        { title: "Sum a list of numeric strings", code: `nums = ["10", "20", "30"]\nprint(sum(int(x) for x in nums))`, output: `60` },
        { title: "Parse CSV row", code: `row = "1,ravi,25,pune"\nparts = row.split(",")\nprint(int(parts[0]), parts[1], int(parts[2]))`, output: `1 ravi 25` },
        { title: "String to bool (careful)", code: `def s2b(s): return s.lower() in ("true","yes","1")\nprint(s2b("Yes"), s2b("no"))`, output: `True False` },
        { title: "list -> string", code: `chars = ['h','i']\nprint(''.join(chars))`, output: `hi` },
        { title: "list of ints -> string", code: `nums = [1, 2, 3]\nprint(','.join(map(str, nums)))`, output: `1,2,3` },
        { title: "Float precision in conversion", code: `print(int(0.1 + 0.2))\nprint(round(0.1 + 0.2, 1))`, output: `0\n0.3` },
        { title: "Bytes to string (decode)", code: `b = b'hello'\nprint(b.decode('utf-8'))`, output: `hello` },
        { title: "String to bytes (encode)", code: `s = "hi"\nprint(s.encode('utf-8'))`, output: `b'hi'` },
        { title: "bool from various values", code: `for v in [0, 1, "", "a", [], [1], None]:\n    print(v, "->", bool(v))`, output: `0 -> False\n1 -> True\n -> False\na -> True\n[] -> False\n[1] -> True\nNone -> False` },
        { title: "list of strings -> ints via map", code: `print(list(map(int, "1 2 3 4".split())))`, output: `[1, 2, 3, 4]` },
        { title: "Range to list", code: `print(list(range(3, 8)))`, output: `[3, 4, 5, 6, 7]` },
        { title: "Convert user input to average", code: `nums = list(map(float, "10 20 30".split()))\nprint(sum(nums)/len(nums))`, output: `20.0` },
        { title: "int with default on failure", code: `def safe_int(s, default=0):\n    try: return int(s)\n    except ValueError: return default\nprint(safe_int("abc", -1))`, output: `-1` },
        { title: "Float format via string", code: `s = f"{99.5:.2f}"\nprint(s, type(s).__name__)`, output: `99.50 str` },
        { title: "Convert seconds to h:m:s", code: `secs = 3725\nh, r = divmod(secs, 3600)\nm, s = divmod(r, 60)\nprint(f"{h:02d}:{m:02d}:{s:02d}")`, output: `01:02:05` },
        { title: "Cast to bool for filtering", code: `data = [0, 1, "", "hi", None, [1]]\nprint(list(filter(bool, data)))`, output: `[1, 'hi', [1]]` },
        { title: "Convert dict values in place", code: `d = {"a":"10","b":"20"}\nd = {k:int(v) for k,v in d.items()}\nprint(d)`, output: `{'a': 10, 'b': 20}` }
      ]
    }
  ]
});

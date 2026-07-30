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
        { title: "Round-trip number <-> string", code: `n = 42\ns = str(n)\nback = int(s)\nprint(s, back, back + 1)`, output: `42 42 43` }
      ]
    }
  ]
});

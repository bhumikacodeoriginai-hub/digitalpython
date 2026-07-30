/* Module 3 — Operators */
window.DP.registerModule({
  id: 3,
  title: "Operators",
  icon: "➗",
  summary: "Arithmetic, comparison, logical, assignment, identity, membership and bitwise operators — the building blocks of every expression.",
  concepts: [
    {
      title: "Arithmetic Operators",
      badge: "Operators",
      notes: [
        "Arithmetic operators: `+`, `-`, `*`, `/`, `%` (modulus), `//` (floor division), `**` (power)."
      ],
      examples: [
        { title: "Addition & subtraction", code: `print(10 + 3)\nprint(10 - 3)`, output: `13\n7` },
        { title: "Multiplication", code: `print(10 * 3)`, output: `30` },
        { title: "True division /", code: `print(10 / 3)`, output: `3.3333333333333335` },
        { title: "Modulus % (remainder)", code: `print(10 % 3)\nprint(17 % 5)`, output: `1\n2` },
        { title: "Floor division //", code: `print(10 // 3)\nprint(-10 // 3)`, output: `3\n-4` },
        { title: "Exponent **", code: `print(2 ** 10)\nprint(9 ** 0.5)`, output: `1024\n3.0` },
        { title: "Order of operations", code: `print(2 + 3 * 4)\nprint((2 + 3) * 4)`, output: `14\n20` },
        { title: "Even or odd with %", code: `n = 7\nprint("odd" if n % 2 else "even")`, output: `odd` }
      ]
    },
    {
      title: "Comparison Operators",
      badge: "Operators",
      notes: ["Comparison operators return a boolean: `==`, `!=`, `>`, `<`, `>=`, `<=`."],
      examples: [
        { title: "Equal and not equal", code: `print(5 == 5)\nprint(5 != 3)`, output: `True\nTrue` },
        { title: "Greater / less than", code: `print(7 > 3)\nprint(2 < 1)`, output: `True\nFalse` },
        { title: ">= and <=", code: `print(5 >= 5)\nprint(4 <= 3)`, output: `True\nFalse` },
        { title: "Chained comparisons", code: `x = 5\nprint(1 < x < 10)`, output: `True` },
        { title: "Compare strings (lexicographic)", code: `print("apple" < "banana")`, output: `True` }
      ]
    },
    {
      title: "Logical Operators",
      badge: "Operators",
      notes: ["`and`, `or`, `not` combine boolean expressions. They also short-circuit."],
      examples: [
        { title: "and", code: `print(True and False)\nprint(5 > 2 and 3 > 1)`, output: `False\nTrue` },
        { title: "or", code: `print(False or True)`, output: `True` },
        { title: "not", code: `print(not True)`, output: `False` },
        { title: "Real condition", code: `age = 20\nprint(age >= 18 and age <= 60)`, output: `True` },
        { title: "Short-circuit returns a value", code: `print(0 or "fallback")\nprint("a" and "b")`, output: `fallback\nb` }
      ]
    },
    {
      title: "Assignment Operators",
      badge: "Operators",
      notes: ["`=`, `+=`, `-=`, `*=`, `/=`, `//=`, `%=`, `**=` update a variable in place."],
      examples: [
        { title: "Simple and += ", code: `x = 10\nx += 5\nprint(x)`, output: `15` },
        { title: "-= and *=", code: `x = 10\nx -= 3\nx *= 2\nprint(x)`, output: `14` },
        { title: "/= and //=", code: `x = 20\nx /= 4\nprint(x)`, output: `5.0` },
        { title: "**= power assign", code: `x = 2\nx **= 5\nprint(x)`, output: `32` },
        { title: "Build a string with +=", code: `s = ""\nfor c in "abc":\n    s += c\nprint(s)`, output: `abc` }
      ]
    },
    {
      title: "Identity Operators",
      badge: "Operators",
      notes: ["`is` and `is not` test whether two names refer to the **same object** in memory (not just equal values)."],
      examples: [
        { title: "is with None", code: `x = None\nprint(x is None)`, output: `True` },
        { title: "is vs ==", code: `a = [1, 2]\nb = [1, 2]\nprint(a == b)   # equal values\nprint(a is b)   # different objects`, output: `True\nFalse` },
        { title: "Same object", code: `a = [1, 2]\nb = a\nprint(a is b)`, output: `True` },
        { title: "is not", code: `x = 5\nprint(x is not None)`, output: `True` }
      ]
    },
    {
      title: "Membership Operators",
      badge: "Operators",
      notes: ["`in` and `not in` test whether a value exists inside a sequence or collection."],
      examples: [
        { title: "in with a list", code: `nums = [1, 2, 3]\nprint(2 in nums)`, output: `True` },
        { title: "not in", code: `print(5 not in [1, 2, 3])`, output: `True` },
        { title: "in with a string", code: `print("cat" in "concatenate")`, output: `True` },
        { title: "in with a dict (checks keys)", code: `d = {"a": 1}\nprint("a" in d)`, output: `True` }
      ]
    },
    {
      title: "Bitwise Operators",
      badge: "Operators",
      notes: ["Operate on the binary bits of integers: `&` AND, `|` OR, `^` XOR, `~` NOT, `<<` left shift, `>>` right shift."],
      examples: [
        { title: "AND &", code: `print(5 & 3)   # 101 & 011 = 001`, output: `1` },
        { title: "OR |", code: `print(5 | 3)   # 101 | 011 = 111`, output: `7` },
        { title: "XOR ^", code: `print(5 ^ 3)   # 101 ^ 011 = 110`, output: `6` },
        { title: "NOT ~", code: `print(~5)      # -(x+1)`, output: `-6` },
        { title: "Left shift <<", code: `print(1 << 4)  # 1 * 2**4`, output: `16` },
        { title: "Right shift >>", code: `print(16 >> 2) # 16 // 2**2`, output: `4` }
      ]
    }
  ]
});

/* Module 3 — Operators (v3 — 50+ examples) */
window.DP.registerModule({
  id: 3,
  title: "Operators",
  icon: "➗",
  summary: "All Python operators with 50+ practical examples: arithmetic, comparison, logical, assignment, identity, membership and bitwise.",
  concepts: [
    {
      title: "Arithmetic Operators",
      badge: "Operators · 15 examples",
      notes: ["`+`, `-`, `*`, `/` (true division), `%` (modulus), `//` (floor division), `**` (power). Follow PEMDAS order."],
      examples: [
        { title: "Basic math", code: `print(10 + 3, 10 - 3, 10 * 3)`, output: `13 7 30` },
        { title: "True division /", code: `print(10 / 3)\nprint(7 / 2)`, output: `3.3333333333333335\n3.5` },
        { title: "Floor division //", code: `print(10 // 3)\nprint(-10 // 3)`, output: `3\n-4` },
        { title: "Modulus % (remainder)", code: `print(10 % 3, 17 % 5, 20 % 4)`, output: `1 2 0` },
        { title: "Exponent **", code: `print(2 ** 10, 9 ** 0.5)`, output: `1024 3.0` },
        { title: "Order of operations", code: `print(2 + 3 * 4)\nprint((2 + 3) * 4)`, output: `14\n20` },
        { title: "Even or odd", code: `for n in range(1, 6):\n    print(n, "even" if n % 2 == 0 else "odd")`, output: `1 odd\n2 even\n3 odd\n4 even\n5 odd` },
        { title: "Percentage calculation", code: `total = 500\nscored = 420\npercent = (scored / total) * 100\nprint(f"{percent}%")`, output: `84.0%` },
        { title: "Temperature conversion", code: `c = 100\nf = c * 9/5 + 32\nprint(f)`, output: `212.0` },
        { title: "Compound interest", code: `p, r, t = 10000, 5, 3\namount = p * (1 + r/100) ** t\nprint(round(amount, 2))`, output: `11576.25` },
        { title: "BMI calculator", code: `weight, height = 70, 1.75\nbmi = weight / height ** 2\nprint(f"BMI: {bmi:.1f}")`, output: `BMI: 22.9` },
        { title: "Days to hours/minutes", code: `days = 5\nhours = days * 24\nminutes = hours * 60\nprint(f"{days}d = {hours}h = {minutes}m")`, output: `5d = 120h = 7200m` },
        { title: "Digit sum", code: `n = 9876\ntotal = 0\nwhile n > 0:\n    total += n % 10\n    n //= 10\nprint(total)`, output: `30` },
        { title: "Last digit of a number", code: `n = 12345\nprint(n % 10)`, output: `5` },
        { title: "Remove last digit", code: `n = 12345\nprint(n // 10)`, output: `1234` }
      ]
    },
    {
      title: "Comparison Operators",
      badge: "Operators · 10 examples",
      notes: ["Return `True`/`False`: `==`, `!=`, `>`, `<`, `>=`, `<=`. Python supports **chained** comparisons like `1 < x < 10`."],
      examples: [
        { title: "Equal and not equal", code: `print(5 == 5, 5 != 3)`, output: `True True` },
        { title: "Greater / less", code: `print(7 > 3, 2 < 1)`, output: `True False` },
        { title: ">= and <=", code: `print(5 >= 5, 4 <= 3)`, output: `True False` },
        { title: "Chained comparison", code: `x = 5\nprint(1 < x < 10)\nprint(10 < x < 20)`, output: `True\nFalse` },
        { title: "Compare strings", code: `print("apple" < "banana")\nprint("abc" == "abc")`, output: `True\nTrue` },
        { title: "Compare with None", code: `x = None\nprint(x == None)\nprint(x is None)`, output: `True\nTrue` },
        { title: "Largest of three", code: `a, b, c = 12, 45, 7\nprint(max(a, b, c))`, output: `45` },
        { title: "Grade check", code: `score = 85\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelse:\n    print("C")`, output: `B` },
        { title: "Password length check", code: `pwd = "hello123"\nprint("OK" if len(pwd) >= 8 else "Too short")`, output: `OK` },
        { title: "Compare lists", code: `print([1, 2] == [1, 2])\nprint([1, 2] < [1, 3])`, output: `True\nTrue` }
      ]
    },
    {
      title: "Logical Operators",
      badge: "Operators · 8 examples",
      notes: ["`and`, `or`, `not` — combine conditions. They **short-circuit** and can return non-boolean values."],
      examples: [
        { title: "and / or / not", code: `print(True and False)\nprint(True or False)\nprint(not True)`, output: `False\nTrue\nFalse` },
        { title: "Real condition", code: `age, income = 25, 50000\nprint(age >= 18 and income > 30000)`, output: `True` },
        { title: "Short-circuit or", code: `name = "" or "Guest"\nprint(name)`, output: `Guest` },
        { title: "Short-circuit and", code: `x = "hello" and "world"\nprint(x)`, output: `world` },
        { title: "Validate range", code: `x = 15\nvalid = 10 <= x <= 20\nprint(valid)`, output: `True` },
        { title: "Login check", code: `user, pwd = "admin", "1234"\nif user == "admin" and pwd == "1234":\n    print("Welcome!")`, output: `Welcome!` },
        { title: "Multiple conditions", code: `age, has_id = 20, True\ncan_vote = age >= 18 and has_id\nprint(can_vote)`, output: `True` },
        { title: "Default value pattern", code: `config = None\nsetting = config or {"theme": "dark"}\nprint(setting)`, output: `{'theme': 'dark'}` }
      ]
    },
    {
      title: "Assignment Operators",
      badge: "Operators · 8 examples",
      notes: ["`=`, `+=`, `-=`, `*=`, `/=`, `//=`, `%=`, `**=` — update variables in place."],
      examples: [
        { title: "+= and -=", code: `x = 10\nx += 5\nprint(x)\nx -= 3\nprint(x)`, output: `15\n12` },
        { title: "*= and /=", code: `x = 6\nx *= 4\nprint(x)\nx /= 8\nprint(x)`, output: `24\n3.0` },
        { title: "//= and %=", code: `x = 17\nprint(x // 5, x % 5)\nx //= 5\nprint(x)`, output: `3 2\n3` },
        { title: "**= power", code: `x = 2\nx **= 8\nprint(x)`, output: `256` },
        { title: "Build a string with +=", code: `result = ""\nfor word in ["Hello", "World"]:\n    result += word + " "\nprint(result.strip())`, output: `Hello World` },
        { title: "Running total", code: `total = 0\nfor price in [10, 20, 30, 40]:\n    total += price\nprint("Total:", total)`, output: `Total: 100` },
        { title: "Countdown", code: `n = 5\nwhile n > 0:\n    print(n, end=" ")\n    n -= 1`, output: `5 4 3 2 1 ` },
        { title: "Double until big", code: `x = 1\nwhile x < 100:\n    x *= 2\nprint(x)`, output: `128` }
      ]
    },
    {
      title: "Identity & Membership Operators",
      badge: "Operators · 8 examples",
      notes: ["`is` / `is not` test same **object** in memory. `in` / `not in` test if value exists in a container."],
      examples: [
        { title: "is with None", code: `x = None\nprint(x is None, x is not None)`, output: `True False` },
        { title: "is vs == (lists)", code: `a = [1, 2]\nb = [1, 2]\nprint(a == b, a is b)`, output: `True False` },
        { title: "in with list", code: `fruits = ["apple", "banana"]\nprint("apple" in fruits)`, output: `True` },
        { title: "not in", code: `print(5 not in [1, 2, 3])`, output: `True` },
        { title: "in with string", code: `print("cat" in "concatenate")`, output: `True` },
        { title: "in with dict (checks keys)", code: `d = {"name": "Ravi"}\nprint("name" in d, "age" in d)`, output: `True False` },
        { title: "Search in a sentence", code: `msg = "Python is awesome"\nkeyword = "awesome"\nprint(keyword in msg)`, output: `True` },
        { title: "Validate input", code: `choice = "B"\nvalid = ["A", "B", "C", "D"]\nprint("Valid" if choice in valid else "Invalid")`, output: `Valid` }
      ]
    },
    {
      title: "Bitwise Operators",
      badge: "Operators · 8 examples",
      notes: ["Operate on binary bits: `&` AND, `|` OR, `^` XOR, `~` NOT, `<<` left shift, `>>` right shift."],
      examples: [
        { title: "AND & and OR |", code: `print(5 & 3)   # 101 & 011 = 001\nprint(5 | 3)   # 101 | 011 = 111`, output: `1\n7` },
        { title: "XOR ^", code: `print(5 ^ 3)   # 101 ^ 011 = 110`, output: `6` },
        { title: "NOT ~", code: `print(~5)      # -(5+1)`, output: `-6` },
        { title: "Left shift <<", code: `print(1 << 4)  # 1 * 2^4 = 16`, output: `16` },
        { title: "Right shift >>", code: `print(32 >> 3) # 32 / 2^3 = 4`, output: `4` },
        { title: "Check if even (bitwise)", code: `n = 6\nprint("even" if not (n & 1) else "odd")`, output: `even` },
        { title: "Swap with XOR", code: `a, b = 5, 9\na ^= b\nb ^= a\na ^= b\nprint(a, b)`, output: `9 5` },
        { title: "Powers of 2", code: `for i in range(5):\n    print(f"2^{i} = {1 << i}")`, output: `2^0 = 1\n2^1 = 2\n2^2 = 4\n2^3 = 8\n2^4 = 16` }
      ]
    }
  ]
});

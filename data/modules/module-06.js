/* Module 6 — Decision Making */
window.DP.registerModule({
  id: 6,
  title: "Decision Making",
  icon: "🔀",
  summary: "Controlling program flow with if, if-else, nested if, elif and match-case — plus classic worked examples: marks, age, voting, electricity bill and student grade.",
  concepts: [
    {
      title: "if, if-else, elif",
      badge: "Control Flow",
      notes: [
        "Decision-making runs different code depending on conditions.",
        "- `if` runs a block when a condition is `True`.",
        "- `else` runs when it is `False`.",
        "- `elif` (else-if) checks additional conditions.",
        "> Indentation defines the block — use 4 spaces."
      ],
      examples: [
        { title: "Simple if", code: `age = 20\nif age >= 18:\n    print("Adult")`, output: `Adult` },
        { title: "if-else", code: `n = 7\nif n % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")`, output: `Odd` },
        { title: "elif chain", code: `score = 75\nif score >= 90:\n    print("A")\nelif score >= 60:\n    print("B")\nelse:\n    print("C")`, output: `B` },
        { title: "Nested if", code: `num = 10\nif num > 0:\n    if num % 2 == 0:\n        print("Positive even")`, output: `Positive even` },
        { title: "One-line (ternary) if", code: `x = 5\nprint("positive" if x > 0 else "non-positive")`, output: `positive` }
      ]
    },
    {
      title: "match-case",
      badge: "Control Flow",
      notes: ["`match-case` (Python 3.10+) compares a value against patterns — a cleaner alternative to long elif chains."],
      examples: [
        { title: "Basic match", code: `day = "SUN"\nmatch day:\n    case "SAT" | "SUN":\n        print("Weekend")\n    case _:\n        print("Weekday")`, output: `Weekend` },
        { title: "Match a number", code: `code = 404\nmatch code:\n    case 200:\n        print("OK")\n    case 404:\n        print("Not Found")\n    case _:\n        print("Other")`, output: `Not Found` }
      ]
    },
    {
      title: "Worked Examples",
      badge: "Practice",
      notes: ["The classic decision-making programs from the syllabus."],
      examples: [
        { title: "Marks program", code: `marks = 82\nif marks >= 90:\n    print("Excellent")\nelif marks >= 60:\n    print("Good")\nelse:\n    print("Needs improvement")`, output: `Good` },
        { title: "Age program (adult check)", code: `age = 15\nprint("Adult" if age >= 18 else "Minor")`, output: `Minor` },
        { title: "Voting eligibility", code: `age = 18\nif age >= 18:\n    print("Eligible to vote")\nelse:\n    print("Not eligible")`, output: `Eligible to vote` },
        { title: "Electricity bill (slabs)", code: `units = 250\nif units <= 100:\n    bill = units * 2\nelif units <= 300:\n    bill = 100 * 2 + (units - 100) * 4\nelse:\n    bill = 100 * 2 + 200 * 4 + (units - 300) * 6\nprint("Bill:", bill)`, output: `Bill: 800` },
        { title: "Student grade", code: `score = 88\nif score >= 90:\n    grade = "A+"\nelif score >= 80:\n    grade = "A"\nelif score >= 70:\n    grade = "B"\nelse:\n    grade = "C"\nprint("Grade:", grade)`, output: `Grade: A` },
        { title: "Largest of three numbers", code: `a, b, c = 12, 45, 7\nlargest = max(a, b, c)\nprint("Largest:", largest)`, output: `Largest: 45` },
        { title: "Leap year check", code: `year = 2024\nif year % 4 == 0 and (year % 100 != 0 or year % 400 == 0):\n    print("Leap year")\nelse:\n    print("Not a leap year")`, output: `Leap year` },
        { title: "Positive / negative / zero", code: `n = -5\nif n > 0: print("positive")\nelif n < 0: print("negative")\nelse: print("zero")`, output: `negative` },
        { title: "Odd or even", code: `n = 7\nprint("even" if n % 2 == 0 else "odd")`, output: `odd` },
        { title: "Character type check", code: `c = "A"\nif c.isalpha(): print("letter")\nelif c.isdigit(): print("digit")\nelse: print("other")`, output: `letter` },
        { title: "Vowel or consonant", code: `c = "e"\nif c.lower() in "aeiou": print("vowel")\nelse: print("consonant")`, output: `vowel` },
        { title: "Password strength", code: `p = "Pass@123"\nif len(p) < 8: print("weak")\nelif not any(c.isupper() for c in p): print("medium")\nelse: print("strong")`, output: `strong` },
        { title: "BMI category", code: `bmi = 22.5\nif bmi < 18.5: cat = "Under"\nelif bmi < 25: cat = "Normal"\nelif bmi < 30: cat = "Over"\nelse: cat = "Obese"\nprint(cat)`, output: `Normal` },
        { title: "Discount by amount", code: `amt = 1500\nif amt >= 1000: rate = 0.10\nelif amt >= 500: rate = 0.05\nelse: rate = 0\nprint(f"Discount: {amt*rate}")`, output: `Discount: 150.0` },
        { title: "Grade with +/-", code: `m = 87\nif m >= 90: g = "A+"\nelif m >= 80: g = "A"\nelif m >= 70: g = "B"\nelif m >= 60: g = "C"\nelse: g = "F"\nprint(g)`, output: `A` },
        { title: "Login check", code: `user, pwd = "admin", "1234"\nif user == "admin" and pwd == "1234":\n    print("Welcome!")\nelse:\n    print("Denied")`, output: `Welcome!` },
        { title: "Weekend or weekday", code: `day = "SAT"\nprint("Weekend" if day in ("SAT","SUN") else "Weekday")`, output: `Weekend` },
        { title: "Traffic light action", code: `color = "yellow"\nmatch color:\n    case "red": print("Stop")\n    case "yellow": print("Slow")\n    case "green": print("Go")`, output: `Slow` },
        { title: "Number range classifier", code: `n = 55\nif n < 0: print("negative")\nelif n < 10: print("small")\nelif n < 100: print("medium")\nelse: print("large")`, output: `medium` },
        { title: "Category by keyword", code: `title = "Python for beginners"\nif "python" in title.lower(): print("Programming")\nelse: print("Other")`, output: `Programming` },
        { title: "Nested if — eligibility", code: `age = 20; has_id = True\nif age >= 18:\n    if has_id: print("Can vote")\n    else: print("Get an ID")\nelse: print("Too young")`, output: `Can vote` },
        { title: "Combine and/or", code: `age = 25; salary = 50000\nif age >= 21 and salary >= 30000:\n    print("Loan approved")`, output: `Loan approved` },
        { title: "Guard clause (early return)", code: `def divide(a, b):\n    if b == 0:\n        return "Cannot divide"\n    return a / b\nprint(divide(10, 0))\nprint(divide(10, 2))`, output: `Cannot divide\n5.0` },
        { title: "Ternary chain", code: `n = 0\nprint("pos" if n > 0 else ("neg" if n < 0 else "zero"))`, output: `zero` },
        { title: "Boolean flag pattern", code: `errors = []\nemail = "abc"\nif "@" not in email: errors.append("no @")\nif len(email) < 5: errors.append("too short")\nprint("OK" if not errors else errors)`, output: `['no @', 'too short']` },
        { title: "String startswith check", code: `filename = "report.pdf"\nif filename.endswith(".pdf"): print("PDF file")`, output: `PDF file` },
        { title: "Dict-based dispatch", code: `ops = {"+": lambda a,b: a+b, "-": lambda a,b: a-b}\nop = "+"\nprint(ops[op](5, 3) if op in ops else "unknown")`, output: `8` },
        { title: "Match with multiple patterns", code: `code = 500\nmatch code:\n    case 200 | 201: print("Success")\n    case 301 | 302: print("Redirect")\n    case 400 | 404: print("Client error")\n    case 500 | 502: print("Server error")`, output: `Server error` },
        { title: "Match wildcard default", code: `x = 99\nmatch x:\n    case 1: print("one")\n    case 2: print("two")\n    case _: print("other")`, output: `other` },
        { title: "Match with condition guard", code: `age = 20\nmatch age:\n    case n if n < 13: print("child")\n    case n if n < 20: print("teen")\n    case _: print("adult")`, output: `adult` },
        { title: "Deep nested config", code: `config = {"debug": True, "level": "high"}\nif config.get("debug"):\n    if config.get("level") == "high":\n        print("Verbose debugging on")`, output: `Verbose debugging on` },
        { title: "Absolute value manually", code: `n = -12\nprint(-n if n < 0 else n)`, output: `12` },
        { title: "Max of three", code: `a, b, c = 10, 25, 15\nif a >= b and a >= c: print(a)\nelif b >= c: print(b)\nelse: print(c)`, output: `25` },
        { title: "Chained comparisons", code: `x = 5\nif 1 < x < 10: print("in range")`, output: `in range` },
        { title: "Type dispatch", code: `def show(x):\n    if isinstance(x, int): print("int:", x)\n    elif isinstance(x, str): print("str:", x)\n    else: print("other")\nshow(42); show("hi")`, output: `int: 42\nstr: hi` },
        { title: "Multiple return branches", code: `def sign(n):\n    if n > 0: return 1\n    if n < 0: return -1\n    return 0\nprint(sign(-5), sign(0), sign(3))`, output: `-1 0 1` },
        { title: "Simple ATM PIN check", code: `stored = "1234"; attempts = 3\nfor _ in range(attempts):\n    entry = "1234"  # simulated\n    if entry == stored:\n        print("Access granted"); break\nelse:\n    print("Blocked")`, output: `Access granted` },
        { title: "Fine on overspeed", code: `speed = 92\nif speed <= 60: fine = 0\nelif speed <= 80: fine = 500\nelif speed <= 100: fine = 1500\nelse: fine = 5000\nprint("Fine:", fine)`, output: `Fine: 1500` },
        { title: "Item availability", code: `stock = {"apple": 10, "banana": 0}\nif stock.get("banana", 0) > 0:\n    print("In stock")\nelse:\n    print("Out of stock")`, output: `Out of stock` },
        { title: "Yes/No confirmation loop", code: `resp = "n"  # simulated\nif resp.lower().startswith("y"):\n    print("Proceeding")\nelse:\n    print("Cancelled")`, output: `Cancelled` },
        { title: "Time-of-day greeting", code: `hour = 14\nif hour < 12: g = "Morning"\nelif hour < 17: g = "Afternoon"\nelif hour < 21: g = "Evening"\nelse: g = "Night"\nprint(f"Good {g}")`, output: `Good Afternoon` },
        { title: "Rock Paper Scissors round", code: `me, other = "R", "S"\nif me == other: r = "tie"\nelif (me, other) in [("R","S"),("S","P"),("P","R")]: r = "win"\nelse: r = "lose"\nprint(r)`, output: `win` },
        { title: "Nested elif with return", code: `def grade(m):\n    if m >= 90: return "A"\n    elif m >= 80: return "B"\n    elif m >= 70: return "C"\n    elif m >= 60: return "D"\n    else: return "F"\nprint([grade(x) for x in [95, 82, 71, 55]])`, output: `['A', 'B', 'C', 'F']` },
        { title: "Weight-based courier price", code: `w = 3.5\nif w <= 1: price = 50\nelif w <= 5: price = 100\nelif w <= 10: price = 200\nelse: price = 200 + (w-10)*30\nprint(price)`, output: `100` },
        { title: "Ticket price by age", code: `age = 8\nif age < 5: price = 0\nelif age < 12: price = 50\nelif age < 60: price = 200\nelse: price = 100\nprint(price)`, output: `50` }
      ]
    }
  ]
});

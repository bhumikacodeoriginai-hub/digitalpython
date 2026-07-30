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
        { title: "Leap year check", code: `year = 2024\nif year % 4 == 0 and (year % 100 != 0 or year % 400 == 0):\n    print("Leap year")\nelse:\n    print("Not a leap year")`, output: `Leap year` }
      ]
    }
  ]
});

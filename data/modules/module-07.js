/* Module 7 — Loops */
window.DP.registerModule({
  id: 7,
  title: "Loops",
  icon: "🔁",
  summary: "Repeating work with for and while loops, nested loops, the range() function, and loop-control statements break, continue and pass.",
  concepts: [
    {
      title: "for Loop & range()",
      badge: "Loops",

      introduction: [
        "**What is it?** A loop repeats a block of code multiple times automatically.",
        "**Why do we need it?** Imagine printing 'Hello' 1000 times — without a loop you'd need 1000 print statements! A loop does it in 2 lines.",
        "**Where is it used?**",
        "- Sending emails to 100 customers (loop through each email)",
        "- Calculating salary for 50 employees (loop through each employee)",
        "- Displaying items on a shopping page (loop through each product)",
        "- Processing every pixel in an image (loops within loops)"
      ],

      analogy: [
        "**Think of it like a school assembly:**",
        "- The teacher says: 'Roll number 1 to 50, come one by one and collect your report card'",
        "- Student 1 comes → collects → goes back",
        "- Student 2 comes → collects → goes back",
        "- ... continues until student 50",
        "",
        "**That's exactly what a for loop does:**",
        "- `for student in range(1, 51):` — 'For each student from 1 to 50...'",
        "- `    give_report_card(student)` — '...give them their report card'",
        "",
        "**Another analogy — Washing dishes:**",
        "- Pick up dish 1 → wash → put in rack",
        "- Pick up dish 2 → wash → put in rack",
        "- ... repeat until all dishes are done",
        "- The 'repeat until done' part is the LOOP"
      ],

      diagram: [
        "┌────────────────────────────────────────────────┐",
        "│        HOW A FOR LOOP WORKS                     │",
        "├────────────────────────────────────────────────┤",
        "│                                                │",
        "│   for i in range(5):  ← Start (i=0,1,2,3,4)  │",
        "│       print(i)        ← Body (runs 5 times)   │",
        "│                                                │",
        "│   Execution trace:                             │",
        "│   ┌──────┬───────────┬──────────────┐         │",
        "│   │ Loop │ i value   │ Output       │         │",
        "│   ├──────┼───────────┼──────────────┤         │",
        "│   │  1st │ i = 0     │ prints: 0    │         │",
        "│   │  2nd │ i = 1     │ prints: 1    │         │",
        "│   │  3rd │ i = 2     │ prints: 2    │         │",
        "│   │  4th │ i = 3     │ prints: 3    │         │",
        "│   │  5th │ i = 4     │ prints: 4    │         │",
        "│   │ STOP │ i = 5 (≥5)│ loop ends    │         │",
        "│   └──────┴───────────┴──────────────┘         │",
        "│                                                │",
        "│   range(5) = [0, 1, 2, 3, 4]                  │",
        "│   (starts at 0, stops BEFORE 5)                │",
        "└────────────────────────────────────────────────┘"
      ],

      syntax: [
        "**For loop syntax:**",
        "```",
        "for variable in range(stop):",
        "    code to repeat    ← MUST be indented (4 spaces)",
        "```",
        "",
        "**range() options:**",
        "- `range(5)` → 0, 1, 2, 3, 4 (starts at 0)",
        "- `range(1, 6)` → 1, 2, 3, 4, 5 (starts at 1, stops before 6)",
        "- `range(0, 10, 2)` → 0, 2, 4, 6, 8 (step of 2)",
        "- `range(5, 0, -1)` → 5, 4, 3, 2, 1 (countdown)",
        "",
        "**Important rules:**",
        "- The colon `:` after range() is REQUIRED",
        "- The body MUST be indented (4 spaces)",
        "- The loop variable changes automatically each iteration"
      ],

      notes: [
        "A `for` loop iterates over a sequence. `range(start, stop, step)` generates numbers commonly used to drive counting loops.",
        "> `range(n)` produces `0` to `n-1`."
      ],
      examples: [
        { title: "Loop over a range", code: `for i in range(5):\n    print(i)`, output: `0\n1\n2\n3\n4` },
        { title: "range(start, stop)", code: `for i in range(2, 6):\n    print(i)`, output: `2\n3\n4\n5` },
        { title: "range with step", code: `for i in range(0, 10, 2):\n    print(i)`, output: `0\n2\n4\n6\n8` },
        { title: "Countdown (negative step)", code: `for i in range(5, 0, -1):\n    print(i)`, output: `5\n4\n3\n2\n1` },
        { title: "Loop over a list", code: `for fruit in ["apple", "banana"]:\n    print(fruit)`, output: `apple\nbanana` },
        { title: "Sum 1 to 100", code: `total = 0\nfor i in range(1, 101):\n    total += i\nprint(total)`, output: `5050` },
        { title: "enumerate for index + value", code: `for i, c in enumerate("abc"):\n    print(i, c)`, output: `0 a\n1 b\n2 c` }
      ],

      mistakes: [
        {
          wrong: `for i in range(5)\n    print(i)`,
          right: `for i in range(5):\n    print(i)`,
          error: `SyntaxError: expected ':'`,
          explanation: "The colon `:` at the end of the `for` line is **required**. It tells Python 'the loop body starts on the next line'. Never forget it!"
        },
        {
          wrong: `for i in range(5):\nprint(i)`,
          right: `for i in range(5):\n    print(i)`,
          error: `IndentationError: expected an indented block`,
          explanation: "The loop body MUST be **indented** (4 spaces). Without indentation, Python doesn't know which code is inside the loop."
        },
        {
          wrong: `for i in range(1, 5):\n    print(i)  # expects 1,2,3,4,5`,
          right: `for i in range(1, 6):\n    print(i)  # gives 1,2,3,4,5`,
          error: `Logic error: prints 1,2,3,4 (misses 5)`,
          explanation: "`range(1, 5)` stops BEFORE 5, so it only gives 1,2,3,4. If you want 1 to 5, use `range(1, 6)`. The stop value is always EXCLUDED."
        }
      ],

      interview: [
        { q: "What is the difference between range(5) and range(1,5)?", a: "`range(5)` gives 0,1,2,3,4 (starts at 0). `range(1,5)` gives 1,2,3,4 (starts at 1). Both stop BEFORE the end value." },
        { q: "How do you loop in reverse (countdown)?", a: "Use `range(start, stop, -1)`. Example: `range(5, 0, -1)` gives 5,4,3,2,1." },
        { q: "What is the difference between for and while loop?", a: "Use `for` when you know HOW MANY times to repeat. Use `while` when you don't know how many times — you just have a condition to check." },
        { q: "Can you modify a list while looping through it?", a: "It's **dangerous** and can cause bugs. Best practice: loop through a copy of the list, or create a new list." }
      ],

      practice: [
        { problem: "Print numbers from 1 to 20.", difficulty: "Easy", hint: "range(1, 21)" },
        { problem: "Print all even numbers between 1 and 50.", difficulty: "Easy", hint: "Use range(2, 51, 2) or check n % 2 == 0" },
        { problem: "Calculate the sum of all numbers from 1 to 1000.", difficulty: "Medium", hint: "total += i inside a loop" },
        { problem: "Print the multiplication table of 7 (7×1=7, 7×2=14, etc.).", difficulty: "Medium", hint: "for i in range(1, 11): print(f'7 x {i} = {7*i}')" },
        { problem: "Count how many numbers between 1 and 100 are divisible by both 3 and 5.", difficulty: "Hard", hint: "Check n % 3 == 0 and n % 5 == 0" },
        { problem: "Print the reverse of a string using a for loop (without slicing).", difficulty: "Company", hint: "Loop from len-1 to 0 with step -1" }
      ],

      revision: [
        "**Key Points:**",
        "1. `for` loop repeats code a known number of times",
        "2. `range(n)` gives 0 to n-1 (n numbers total)",
        "3. `range(start, stop)` — stop is EXCLUDED",
        "4. `range(start, stop, step)` — step controls the increment",
        "5. Always put `:` at end and indent the body (4 spaces)",
        "6. The loop variable changes automatically each iteration",
        "7. Use `enumerate()` when you need both index and value"
      ]
    },
    {
      title: "while Loop",
      badge: "Loops",
      notes: ["A `while` loop repeats as long as its condition is `True`. Always ensure the condition eventually becomes `False`."],
      examples: [
        { title: "Basic while", code: `i = 1\nwhile i <= 3:\n    print(i)\n    i += 1`, output: `1\n2\n3` },
        { title: "Sum with while", code: `n, total = 5, 0\nwhile n > 0:\n    total += n\n    n -= 1\nprint(total)`, output: `15` },
        { title: "while with else", code: `i = 0\nwhile i < 3:\n    print(i)\n    i += 1\nelse:\n    print("done")`, output: `0\n1\n2\ndone` },
        { title: "Reverse a number", code: `n = 123\nrev = 0\nwhile n > 0:\n    rev = rev * 10 + n % 10\n    n //= 10\nprint(rev)`, output: `321` }
      ]
    },
    {
      title: "Nested Loops",
      badge: "Loops",
      notes: ["A loop inside another loop. The inner loop completes fully for each iteration of the outer loop."],
      examples: [
        { title: "Multiplication grid", code: `for i in range(1, 4):\n    for j in range(1, 4):\n        print(i * j, end=" ")\n    print()`, output: `1 2 3 \n2 4 6 \n3 6 9 ` },
        { title: "Coordinate pairs", code: `for x in range(2):\n    for y in range(2):\n        print(f"({x},{y})", end=" ")`, output: `(0,0) (0,1) (1,0) (1,1) ` }
      ]
    },
    {
      title: "Loop Control: break, continue, pass",
      badge: "Loops",
      notes: [
        "- `break` exits the loop immediately.",
        "- `continue` skips to the next iteration.",
        "- `pass` does nothing (a placeholder)."
      ],
      examples: [
        { title: "break", code: `for i in range(10):\n    if i == 5:\n        break\n    print(i)`, output: `0\n1\n2\n3\n4` },
        { title: "continue", code: `for i in range(5):\n    if i % 2 == 0:\n        continue\n    print(i)`, output: `1\n3` },
        { title: "pass as placeholder", code: `for i in range(3):\n    pass  # to be implemented later\nprint("loop ran")`, output: `loop ran` },
        { title: "Find first divisor", code: `n = 15\nfor d in range(2, n):\n    if n % d == 0:\n        print("Divisible by", d)\n        break`, output: `Divisible by 3` }
      ]
    }
  ]
});

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

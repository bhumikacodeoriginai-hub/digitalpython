/* Module 8 — Pattern Programs */
window.DP.registerModule({
  id: 8,
  title: "Pattern Programs",
  icon: "🌟",
  summary: "Classic nested-loop pattern challenges: star patterns, number patterns, pyramids, diamonds, butterfly, Pascal's and Floyd's triangles and hollow shapes.",
  concepts: [
    {
      title: "Star Patterns",
      badge: "Patterns",
      notes: ["Star patterns are the best way to master nested loops. The outer loop controls rows, the inner loop controls columns."],
      examples: [
        { title: "Right triangle", code: `n = 5\nfor i in range(1, n + 1):\n    print("*" * i)`, output: `*\n**\n***\n****\n*****` },
        { title: "Inverted triangle", code: `n = 5\nfor i in range(n, 0, -1):\n    print("*" * i)`, output: `*****\n****\n***\n**\n*` },
        { title: "Square of stars", code: `n = 4\nfor i in range(n):\n    print("* " * n)`, output: `* * * * \n* * * * \n* * * * \n* * * * ` }
      ]
    },
    {
      title: "Number Patterns",
      badge: "Patterns",
      notes: ["Same idea as star patterns, but print numbers instead."],
      examples: [
        { title: "Number triangle", code: `for i in range(1, 6):\n    for j in range(1, i + 1):\n        print(j, end="")\n    print()`, output: `1\n12\n123\n1234\n12345` },
        { title: "Repeated row number", code: `for i in range(1, 5):\n    print(str(i) * i)`, output: `1\n22\n333\n4444` }
      ]
    },
    {
      title: "Pyramid & Diamond",
      badge: "Patterns",
      notes: ["Centered patterns combine spaces (for alignment) with stars."],
      examples: [
        { title: "Pyramid", code: `n = 5\nfor i in range(1, n + 1):\n    print(" " * (n - i) + "*" * (2 * i - 1))`, output: `    *\n   ***\n  *****\n *******\n*********` },
        { title: "Diamond", code: `n = 3\nfor i in range(1, n + 1):\n    print(" " * (n - i) + "*" * (2 * i - 1))\nfor i in range(n - 1, 0, -1):\n    print(" " * (n - i) + "*" * (2 * i - 1))`, output: `  *\n ***\n*****\n ***\n  *` }
      ]
    },
    {
      title: "Butterfly, Pascal & Floyd",
      badge: "Patterns",
      notes: ["More advanced classics that show up in interviews."],
      examples: [
        { title: "Butterfly pattern", code: `n = 4\nfor i in range(1, n + 1):\n    print("*" * i + " " * (2 * (n - i)) + "*" * i)\nfor i in range(n, 0, -1):\n    print("*" * i + " " * (2 * (n - i)) + "*" * i)`, output: `*      *\n**    **\n***  ***\n********\n********\n***  ***\n**    **\n*      *` },
        { title: "Floyd's triangle", code: `num = 1\nfor i in range(1, 5):\n    for j in range(i):\n        print(num, end=" ")\n        num += 1\n    print()`, output: `1 \n2 3 \n4 5 6 \n7 8 9 10 ` },
        { title: "Pascal's triangle", code: `n = 5\nfor i in range(n):\n    val = 1\n    row = []\n    for k in range(i + 1):\n        row.append(val)\n        val = val * (i - k) // (k + 1)\n    print(" ".join(map(str, row)).center(2 * n))`, output: `     1     \n    1 1    \n   1 2 1   \n  1 3 3 1  \n 1 4 6 4 1 ` }
      ]
    },
    {
      title: "Hollow Rectangle",
      badge: "Patterns",
      notes: ["Print borders only — stars on the edges, spaces inside."],
      examples: [
        { title: "Hollow rectangle", code: `rows, cols = 4, 6\nfor i in range(rows):\n    for j in range(cols):\n        if i == 0 or i == rows - 1 or j == 0 or j == cols - 1:\n            print("*", end="")\n        else:\n            print(" ", end="")\n    print()`, output: `******\n*    *\n*    *\n******` }
      ]
    }
  ]
});

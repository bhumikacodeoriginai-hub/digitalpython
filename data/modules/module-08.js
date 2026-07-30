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
        { title: "Hollow rectangle", code: `rows, cols = 4, 6\nfor i in range(rows):\n    for j in range(cols):\n        if i == 0 or i == rows - 1 or j == 0 or j == cols - 1:\n            print("*", end="")\n        else:\n            print(" ", end="")\n    print()`, output: `******\n*    *\n*    *\n******` },
        { title: "Hollow square", code: `n = 5\nfor i in range(n):\n    for j in range(n):\n        if i in (0, n-1) or j in (0, n-1):\n            print("*", end="")\n        else:\n            print(" ", end="")\n    print()`, output: `*****\n*   *\n*   *\n*   *\n*****` },
        { title: "Hollow triangle", code: `n = 5\nfor i in range(1, n+1):\n    for j in range(1, i+1):\n        if j == 1 or j == i or i == n:\n            print("*", end="")\n        else:\n            print(" ", end="")\n    print()`, output: `*\n**\n* *\n*  *\n*****` },
        { title: "Hollow pyramid", code: `n = 5\nfor i in range(1, n+1):\n    for j in range(n-i): print(" ", end="")\n    for j in range(1, 2*i):\n        if j == 1 or j == 2*i-1 or i == n:\n            print("*", end="")\n        else:\n            print(" ", end="")\n    print()`, output: `    *\n   * *\n  *   *\n *     *\n*********` },
        { title: "Hollow diamond", code: `n = 4\nfor i in range(1, n+1):\n    print(" "*(n-i) + "*" + " "*(2*i-3) + ("*" if i>1 else ""))\nfor i in range(n-1, 0, -1):\n    print(" "*(n-i) + "*" + " "*(2*i-3) + ("*" if i>1 else ""))`, output: `   *\n  * *\n *   *\n*     *\n *   *\n  * *\n   *` },
        { title: "Number pyramid", code: `n = 5\nfor i in range(1, n+1):\n    print(" "*(n-i) + " ".join(str(x) for x in range(1, i+1)))`, output: `    1\n   1 2\n  1 2 3\n 1 2 3 4\n1 2 3 4 5` }
      ]
    },
    {
      title: "More Practical Patterns",
      badge: "Patterns · 35+ examples",
      notes: ["Advanced pattern practice — great for interviews and building loop intuition."],
      examples: [
        { title: "Rectangle of stars", code: `for i in range(4):\n    print("*" * 6)`, output: `******\n******\n******\n******` },
        { title: "Right triangle", code: `for i in range(1, 6):\n    print("*" * i)`, output: `*\n**\n***\n****\n*****` },
        { title: "Left-aligned triangle", code: `n = 5\nfor i in range(1, n+1):\n    print(" "*(n-i) + "*"*i)`, output: `    *\n   **\n  ***\n ****\n*****` },
        { title: "Inverted right triangle", code: `for i in range(5, 0, -1):\n    print("*" * i)`, output: `*****\n****\n***\n**\n*` },
        { title: "Inverted left triangle", code: `n = 5\nfor i in range(n, 0, -1):\n    print(" "*(n-i) + "*"*i)`, output: `*****\n ****\n  ***\n   **\n    *` },
        { title: "Descending pyramid", code: `n = 5\nfor i in range(n, 0, -1):\n    print(" "*(n-i) + "*"*(2*i-1))`, output: `*********\n *******\n  *****\n   ***\n    *` },
        { title: "Hourglass pattern", code: `n = 5\nfor i in range(n, 0, -1):\n    print(" "*(n-i) + "*"*(2*i-1))\nfor i in range(2, n+1):\n    print(" "*(n-i) + "*"*(2*i-1))`, output: `*********\n *******\n  *****\n   ***\n    *\n   ***\n  *****\n *******\n*********` },
        { title: "Numbers 1..N per row", code: `for i in range(1, 6):\n    for j in range(1, i+1):\n        print(j, end=" ")\n    print()`, output: `1 \n1 2 \n1 2 3 \n1 2 3 4 \n1 2 3 4 5 ` },
        { title: "Same digit per row", code: `for i in range(1, 6):\n    print(str(i) * i)`, output: `1\n22\n333\n4444\n55555` },
        { title: "Descending numbers", code: `for i in range(5, 0, -1):\n    for j in range(1, i+1):\n        print(j, end=" ")\n    print()`, output: `1 2 3 4 5 \n1 2 3 4 \n1 2 3 \n1 2 \n1 ` },
        { title: "Alphabet triangle", code: `for i in range(5):\n    for j in range(i+1):\n        print(chr(65+j), end=" ")\n    print()`, output: `A \nA B \nA B C \nA B C D \nA B C D E ` },
        { title: "Reverse alphabet triangle", code: `for i in range(5):\n    for j in range(i+1):\n        print(chr(65+i-j), end=" ")\n    print()`, output: `A \nB A \nC B A \nD C B A \nE D C B A ` },
        { title: "Alphabet pyramid", code: `n = 5\nfor i in range(n):\n    print(" "*(n-i-1) + " ".join(chr(65+j) for j in range(i+1)))`, output: `    A\n   A B\n  A B C\n A B C D\nA B C D E` },
        { title: "Digit + letter mix", code: `for i in range(1, 5):\n    print(f"{i}-" + chr(64+i)*i)`, output: `1-A\n2-BB\n3-CCC\n4-DDDD` },
        { title: "Binary triangle", code: `for i in range(1, 6):\n    for j in range(i):\n        print((i+j)%2, end=" ")\n    print()`, output: `1 \n0 1 \n1 0 1 \n0 1 0 1 \n1 0 1 0 1 ` },
        { title: "Right-aligned numbers", code: `n = 5\nfor i in range(1, n+1):\n    print(" "*(n-i) + " ".join(str(x) for x in range(1, i+1)))`, output: `    1\n   1 2\n  1 2 3\n 1 2 3 4\n1 2 3 4 5` },
        { title: "Pascal's triangle first 5 rows", code: `n = 5\nfor i in range(n):\n    val = 1\n    print(" "*(n-i), end="")\n    for k in range(i+1):\n        print(val, end=" ")\n        val = val*(i-k)//(k+1)\n    print()`, output: `     1 \n    1 1 \n   1 2 1 \n  1 3 3 1 \n 1 4 6 4 1 ` },
        { title: "Multiplication table pattern", code: `for i in range(1, 6):\n    for j in range(1, 6):\n        print(f"{i*j:3d}", end="")\n    print()`, output: `  1  2  3  4  5\n  2  4  6  8 10\n  3  6  9 12 15\n  4  8 12 16 20\n  5 10 15 20 25` },
        { title: "Cross pattern", code: `n = 5\nfor i in range(n):\n    for j in range(n):\n        if i == j or i+j == n-1:\n            print("*", end="")\n        else:\n            print(" ", end="")\n    print()`, output: `*   *\n * * \n  *  \n * * \n*   *` },
        { title: "Checkerboard", code: `n = 6\nfor i in range(n):\n    for j in range(n):\n        print("#" if (i+j)%2==0 else " ", end="")\n    print()`, output: `# # # \n # # #\n# # # \n # # #\n# # # \n # # #` },
        { title: "Right-angle number stair", code: `n = 5\nfor i in range(1, n+1):\n    print(" "*(n-i) + str(i)*i)`, output: `    1\n   22\n  333\n 4444\n55555` },
        { title: "Sandglass (numbers)", code: `n = 4\nfor i in range(n, 0, -1):\n    print(" "*(n-i) + " ".join(str(x) for x in range(1, i+1)))\nfor i in range(2, n+1):\n    print(" "*(n-i) + " ".join(str(x) for x in range(1, i+1)))`, output: `1 2 3 4\n 1 2 3\n  1 2\n   1\n  1 2\n 1 2 3\n1 2 3 4` },
        { title: "Right-angle Floyd triangle", code: `num = 1\nfor i in range(1, 6):\n    for _ in range(i):\n        print(num, end=" "); num += 1\n    print()`, output: `1 \n2 3 \n4 5 6 \n7 8 9 10 \n11 12 13 14 15 ` },
        { title: "Reverse pyramid of numbers", code: `n = 5\nfor i in range(n, 0, -1):\n    print(" "*(n-i) + " ".join(str(j) for j in range(1, i+1)))`, output: `1 2 3 4 5\n 1 2 3 4\n  1 2 3\n   1 2\n    1` },
        { title: "Zigzag pattern", code: `n = 3; cols = 9\nfor i in range(n):\n    for j in range(cols):\n        if (i+j)%4==0 or (i==1 and j%4==2):\n            print("*", end="")\n        else:\n            print(" ", end="")\n    print()`, output: `*   *   *\n * * * * \n*   *   *` },
        { title: "Solid rhombus", code: `n = 5\nfor i in range(n):\n    print(" "*(n-i-1) + "*"*n)`, output: `    *****\n   *****\n  *****\n *****\n*****` },
        { title: "Reverse butterfly", code: `n = 4\nfor i in range(n, 0, -1):\n    print("*"*i + " "*(2*(n-i)) + "*"*i)\nfor i in range(1, n+1):\n    print("*"*i + " "*(2*(n-i)) + "*"*i)`, output: `****    ****\n***      ***\n**        **\n*          *\n*          *\n**        **\n***      ***\n****    ****` },
        { title: "Solid triangle centered", code: `n = 5\nfor i in range(n):\n    print(" "*(n-i-1) + "* "*(i+1))`, output: `    * \n   * * \n  * * * \n * * * * \n* * * * * ` },
        { title: "Alphabet pyramid (each letter)", code: `n = 4\nfor i in range(n):\n    c = chr(65 + i)\n    print(" "*(n-i-1) + c*(2*i+1))`, output: `   A\n  BBB\n CCCCC\nDDDDDDD` },
        { title: "Star border grid", code: `n = 5\nfor i in range(n):\n    for j in range(n):\n        print("*" if i==0 or j==0 or i==n-1 or j==n-1 else "*" if i==j or i+j==n-1 else " ", end="")\n    print()`, output: `*****\n** **\n* * *\n** **\n*****` },
        { title: "Odd number pattern", code: `n = 5\nfor i in range(1, n+1):\n    for j in range(1, i+1):\n        print(2*j-1, end=" ")\n    print()`, output: `1 \n1 3 \n1 3 5 \n1 3 5 7 \n1 3 5 7 9 ` },
        { title: "Square of numbers", code: `n = 5\nfor i in range(1, n+1):\n    for j in range(1, n+1):\n        print(j, end=" ")\n    print()`, output: `1 2 3 4 5 \n1 2 3 4 5 \n1 2 3 4 5 \n1 2 3 4 5 \n1 2 3 4 5 ` },
        { title: "Nested boxes", code: `n = 7\nfor i in range(n):\n    for j in range(n):\n        d = min(i, j, n-1-i, n-1-j)\n        print(d, end=" ")\n    print()`, output: `0 0 0 0 0 0 0 \n0 1 1 1 1 1 0 \n0 1 2 2 2 1 0 \n0 1 2 3 2 1 0 \n0 1 2 2 2 1 0 \n0 1 1 1 1 1 0 \n0 0 0 0 0 0 0 ` },
        { title: "Right-angled Pascal triangle", code: `def C(n, r):\n    v = 1\n    for i in range(r): v = v*(n-i)//(i+1)\n    return v\nfor i in range(6):\n    for j in range(i+1):\n        print(C(i, j), end=" ")\n    print()`, output: `1 \n1 1 \n1 2 1 \n1 3 3 1 \n1 4 6 4 1 \n1 5 10 10 5 1 ` }
      ]
    }
  ]
});

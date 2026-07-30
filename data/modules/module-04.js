/* Module 4 — Input and Output */
window.DP.registerModule({
  id: 4,
  title: "Input and Output",
  icon: "⌨️",
  summary: "Reading user input with input(), displaying results with print(), inspecting types with type(), and formatting output using f-strings, format() and % placeholders.",
  concepts: [
    {
      title: "input()",
      badge: "I/O",
      notes: [
        "`input()` reads a line of text from the user and always returns a **string**. Convert it with `int()` / `float()` when you need a number."
      ],
      examples: [
        { title: "Read a name", code: `name = input("Enter your name: ")\nprint("Hello", name)`, output: `Enter your name: Arjun\nHello Arjun` },
        { title: "input() returns a string", code: `age = input("Age: ")\nprint(type(age))`, output: `Age: 25\n<class 'str'>` },
        { title: "Convert to int", code: `age = int(input("Age: "))\nprint(age + 1)`, output: `Age: 25\n26` },
        { title: "Read two numbers and add", code: `a = int(input("a: "))\nb = int(input("b: "))\nprint("Sum:", a + b)`, output: `a: 4\nb: 6\nSum: 10` },
        { title: "Read multiple values on one line", code: `x, y = input("x y: ").split()\nprint(x, y)`, output: `x y: 3 5\n3 5` }
      ]
    },
    {
      title: "print()",
      badge: "I/O",
      notes: ["`print()` writes to the screen. Useful arguments: `sep` (separator) and `end` (line ending)."],
      examples: [
        { title: "Print multiple items", code: `print("a", "b", "c")`, output: `a b c` },
        { title: "Custom separator", code: `print("2024", "01", "15", sep="-")`, output: `2024-01-15` },
        { title: "Custom end", code: `print("Loading", end="...")\nprint("done")`, output: `Loading...done` },
        { title: "Print without newline in a loop", code: `for i in range(5):\n    print(i, end=" ")`, output: `0 1 2 3 4` },
        { title: "Print a blank line", code: `print("top")\nprint()\nprint("bottom")`, output: `top\n\nbottom` }
      ]
    },
    {
      title: "type()",
      badge: "I/O",
      notes: ["`type()` returns the class of a value — handy for debugging and learning."],
      examples: [
        { title: "Check common types", code: `print(type(10))\nprint(type(3.14))\nprint(type("hi"))\nprint(type([1]))`, output: `<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'list'>` },
        { title: "type() with a variable", code: `x = {"a": 1}\nprint(type(x))`, output: `<class 'dict'>` },
        { title: "Use in a condition", code: `x = 5\nif type(x) is int:\n    print("integer")`, output: `integer` }
      ]
    },
    {
      title: "Formatting: f-string, format(), %s, %d",
      badge: "Formatting",
      notes: [
        "Three ways to format output:",
        "- **f-strings** (recommended): `f\"{value}\"`",
        "- **str.format()**: `\"{}\".format(value)`",
        "- **% operator**: `%s` for strings, `%d` for integers, `%f` for floats."
      ],
      examples: [
        { title: "f-string basics", code: `name, age = "Sara", 30\nprint(f"{name} is {age}")`, output: `Sara is 30` },
        { title: "f-string with expressions", code: `a, b = 4, 5\nprint(f"{a} + {b} = {a + b}")`, output: `4 + 5 = 9` },
        { title: "f-string number formatting", code: `pi = 3.14159\nprint(f"{pi:.2f}")`, output: `3.14` },
        { title: "f-string padding & alignment", code: `print(f"{'left':<8}|")\nprint(f"{'right':>8}|")`, output: `left    |\n   right|` },
        { title: "format() method", code: `print("{} scored {}".format("Ravi", 90))`, output: `Ravi scored 90` },
        { title: "format() with index", code: `print("{0} {1} {0}".format("a", "b"))`, output: `a b a` },
        { title: "%s and %d", code: `print("%s is %d years old" % ("Meera", 24))`, output: `Meera is 24 years old` },
        { title: "%f with precision", code: `print("Total: %.2f" % 99.5)`, output: `Total: 99.50` },
        { title: "Thousands separator", code: `print(f"{1000000:,}")`, output: `1,000,000` }
      ]
    }
  ]
});

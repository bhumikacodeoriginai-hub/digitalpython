/* Module 43 — Coding Interview Preparation */
window.DP.registerModule({
  id: 43,
  title: "Coding Interview Preparation",
  icon: "🧑‍💻",
  summary: "Crack technical interviews at top companies. Master the most-asked coding patterns, string/array problems, and problem-solving strategies with detailed step-by-step solutions.",
  concepts: [
    {
      title: "String & Array Problems (Most Asked)",
      badge: "Interview · 15 examples",
      introduction: [
        "**What is it?** These are the coding problems companies ask MOST often in interviews (Google, Amazon, TCS, Infosys, Wipro, startups).",
        "**Why learn this?** 80% of coding rounds test string and array logic. Master these = clear most interviews.",
        "**Where used?** Every technical interview, online assessments (HackerRank, LeetCode), campus placements."
      ],
      analogy: [
        "**Think of an array like a train:**",
        "- Each coach (element) has a seat number (index) starting from 0",
        "- You can visit any coach directly by its number",
        "- A string is like a train where each coach holds one letter",
        "",
        "**Solving a problem is like being a train inspector** — you walk through each coach, check something, and take action."
      ],
      examples: [
        { title: "Reverse a string", code: `s = "hello"\nreversed_s = s[::-1]\nprint(reversed_s)`, output: `olleh` },
        { title: "Check palindrome", code: `def is_palindrome(s):\n    return s == s[::-1]\n\nprint(is_palindrome("madam"))\nprint(is_palindrome("hello"))`, output: `True\nFalse` },
        { title: "Count vowels", code: `def count_vowels(s):\n    count = 0\n    for ch in s.lower():\n        if ch in "aeiou":\n            count += 1\n    return count\n\nprint(count_vowels("Education"))`, output: `5` },
        { title: "Find largest number", code: `nums = [23, 67, 12, 89, 45]\nlargest = nums[0]\nfor n in nums:\n    if n > largest:\n        largest = n\nprint(largest)`, output: `89` },
        { title: "Second largest number", code: `nums = [23, 67, 12, 89, 45]\nunique = sorted(set(nums), reverse=True)\nprint(unique[1])`, output: `67` },
        { title: "Count word frequency", code: `text = "cat dog cat bird dog cat"\nfreq = {}\nfor word in text.split():\n    freq[word] = freq.get(word, 0) + 1\nprint(freq)`, output: `{'cat': 3, 'dog': 2, 'bird': 1}` },
        { title: "Remove duplicates", code: `nums = [1, 2, 2, 3, 3, 3, 4]\nunique = list(dict.fromkeys(nums))\nprint(unique)`, output: `[1, 2, 3, 4]` },
        { title: "Find missing number (1 to n)", code: `nums = [1, 2, 4, 5, 6]\nn = 6\nexpected = n * (n + 1) // 2\nactual = sum(nums)\nprint("Missing:", expected - actual)`, output: `Missing: 3` },
        { title: "Check anagram", code: `def is_anagram(a, b):\n    return sorted(a) == sorted(b)\n\nprint(is_anagram("listen", "silent"))\nprint(is_anagram("hello", "world"))`, output: `True\nFalse` },
        { title: "First non-repeating character", code: `def first_unique(s):\n    for ch in s:\n        if s.count(ch) == 1:\n            return ch\n    return None\n\nprint(first_unique("aabbccdee"))`, output: `d` },
        { title: "Reverse words in a sentence", code: `sentence = "Python is awesome"\nwords = sentence.split()\nprint(" ".join(reversed(words)))`, output: `awesome is Python` },
        { title: "Find pairs summing to target", code: `nums = [2, 7, 11, 15]\ntarget = 9\nseen = set()\nfor n in nums:\n    if target - n in seen:\n        print(f"Pair: {target-n}, {n}")\n    seen.add(n)`, output: `Pair: 2, 7` },
        { title: "Move zeros to end", code: `nums = [0, 1, 0, 3, 12]\nresult = [n for n in nums if n != 0] + [0] * nums.count(0)\nprint(result)`, output: `[1, 3, 12, 0, 0]` },
        { title: "Count occurrences of each char", code: `from collections import Counter\ns = "mississippi"\nprint(dict(Counter(s)))`, output: `{'m': 1, 'i': 4, 's': 4, 'p': 2}` },
        { title: "Rotate array by k", code: `nums = [1, 2, 3, 4, 5]\nk = 2\nrotated = nums[-k:] + nums[:-k]\nprint(rotated)`, output: `[4, 5, 1, 2, 3]` }
      ],
      mistakes: [
        { wrong: `s = "hello"\ns[0] = "H"`, right: `s = "hello"\ns = "H" + s[1:]`, error: `TypeError: 'str' object does not support item assignment`, explanation: "Strings are **immutable** — you cannot change a character directly. Create a new string instead." },
        { wrong: `nums = [1,2,3]\nprint(nums[3])`, right: `nums = [1,2,3]\nprint(nums[2])  # last index`, error: `IndexError: list index out of range`, explanation: "A list of 3 items has indexes 0, 1, 2. Index 3 doesn't exist! The last index is always length - 1." }
      ],
      interview: [
        { q: "How do you reverse a string in Python?", a: "The Pythonic way is slicing: `s[::-1]`. This works because [::-1] means 'take all characters with step -1' (backwards)." },
        { q: "What is the time complexity of checking 'x in list' vs 'x in set'?", a: "`x in list` is O(n) — checks every element. `x in set` is O(1) — instant lookup using hashing. Use sets for fast membership tests!" },
        { q: "How do you count character frequency efficiently?", a: "Use `collections.Counter(string)` — it's the fastest and cleanest way. Or use a dictionary with `d.get(char, 0) + 1`." }
      ],
      practice: [
        { problem: "Find the longest word in a sentence.", difficulty: "Easy", hint: "Use max() with key=len" },
        { problem: "Check if two strings are rotations of each other.", difficulty: "Medium", hint: "Check if b is a substring of a+a" },
        { problem: "Find all duplicate elements in an array.", difficulty: "Medium", hint: "Use Counter and filter count > 1" },
        { problem: "Given an array, find the subarray with the maximum sum (Kadane's algorithm).", difficulty: "Hard", hint: "Track current_sum and max_sum" },
        { problem: "Find two numbers that add up to a target (return their indices).", difficulty: "Company", hint: "Use a dictionary to store value→index" }
      ],
      revision: [
        "**Key Points:**",
        "1. Strings are immutable — slicing `[::-1]` reverses them",
        "2. Use `set` for O(1) membership checks",
        "3. `collections.Counter` counts frequencies instantly",
        "4. List index goes 0 to length-1",
        "5. Practice these patterns until they're automatic — they appear in 80% of interviews"
      ]
    }
  ]
});

/* Module 44 — Career & Job Readiness */
window.DP.registerModule({
  id: 44,
  title: "Career & Job Readiness",
  icon: "🚀",
  summary: "Everything to land your first Python job: building a portfolio, writing a resume, Git/GitHub for showcasing projects, and preparing for HR + technical rounds.",
  concepts: [
    {
      title: "Building Your Developer Portfolio",
      badge: "Career · 12 examples",
      introduction: [
        "**What is it?** A portfolio is a collection of projects that PROVES you can code. It's more powerful than any certificate.",
        "**Why do we need it?** Companies hire people who can SHOW their work. A GitHub with 5 good projects beats 10 certificates.",
        "**Where is it used?** In job applications, LinkedIn, resume links. Recruiters check your GitHub before interviews."
      ],
      analogy: [
        "**Think of a portfolio like a chef's tasting menu:**",
        "- A restaurant doesn't hire a chef based on their words — they taste the food",
        "- Companies don't hire coders based on claims — they see your projects",
        "- Each project = a dish that shows a different skill",
        "",
        "**Your GitHub = your kitchen** where everyone can see what you've cooked!"
      ],
      examples: [
        { title: "Project idea: To-Do List app", code: `tasks = []\n\ndef add_task(task):\n    tasks.append({"task": task, "done": False})\n\ndef complete_task(index):\n    tasks[index]["done"] = True\n\nadd_task("Learn Python")\nadd_task("Build portfolio")\ncomplete_task(0)\nfor t in tasks:\n    status = "✓" if t["done"] else "○"\n    print(f"{status} {t['task']}")`, output: `✓ Learn Python\n○ Build portfolio` },
        { title: "Project idea: Password generator", code: `import random\nimport string\n\ndef generate_password(length=12):\n    chars = string.ascii_letters + string.digits + "!@#$%"\n    return "".join(random.choice(chars) for _ in range(length))\n\nprint(generate_password())`, output: `aK9#mP2!xQ7z` },
        { title: "Project idea: Expense tracker", code: `expenses = [\n    {"item": "Coffee", "amount": 150},\n    {"item": "Books", "amount": 800},\n    {"item": "Lunch", "amount": 250}\n]\ntotal = sum(e["amount"] for e in expenses)\nprint(f"Total spent: ₹{total}")\nprint(f"Average: ₹{total/len(expenses):.2f}")`, output: `Total spent: ₹1200\nAverage: ₹400.00` },
        { title: "Project idea: Number guessing game", code: `import random\nsecret = random.randint(1, 100)\nguesses = [50, 75, 62, 68]  # simulated\nfor g in guesses:\n    if g == secret:\n        print(f"Correct! It was {g}")\n        break\n    elif g < secret:\n        print(f"{g} is too low")\n    else:\n        print(f"{g} is too high")`, output: `50 is too low\n75 is too high\n62 is too low\n68 is too high` },
        { title: "Project idea: Word counter tool", code: `text = "Python is great and Python is easy to learn"\nwords = text.split()\nprint(f"Total words: {len(words)}")\nprint(f"Unique words: {len(set(words))}")`, output: `Total words: 9\nUnique words: 7` },
        { title: "Project idea: Simple calculator", code: `def calculator(a, b, op):\n    ops = {"+": a+b, "-": a-b, "*": a*b, "/": a/b if b else "Error"}\n    return ops.get(op, "Invalid")\n\nprint(calculator(10, 5, "+"))\nprint(calculator(10, 5, "*"))`, output: `15\n50` },
        { title: "Project idea: Temperature converter", code: `def convert(temp, unit):\n    if unit == "C":\n        return f"{temp * 9/5 + 32}°F"\n    return f"{(temp - 32) * 5/9:.1f}°C"\n\nprint(convert(100, "C"))\nprint(convert(212, "F"))`, output: `212.0°F\n100.0°C` },
        { title: "Project idea: Contact book", code: `contacts = {}\ncontacts["Arjun"] = "9876543210"\ncontacts["Meera"] = "9123456780"\n\nfor name, phone in contacts.items():\n    print(f"{name}: {phone}")`, output: `Arjun: 9876543210\nMeera: 9123456780` },
        { title: "README structure for a project", code: `# My Project Name\n\n## Description\nWhat the project does\n\n## Features\n- Feature 1\n- Feature 2\n\n## How to run\npython main.py\n\n## Technologies\nPython 3.12`, output: `# A good README helps recruiters understand your project` },
        { title: "Project idea: Quiz app", code: `questions = [\n    {"q": "Capital of India?", "a": "Delhi"},\n    {"q": "2 + 2?", "a": "4"}\n]\nanswers = ["Delhi", "4"]  # simulated\nscore = 0\nfor i, item in enumerate(questions):\n    if answers[i].lower() == item["a"].lower():\n        score += 1\nprint(f"Score: {score}/{len(questions)}")`, output: `Score: 2/2` },
        { title: "Project idea: BMI calculator", code: `def bmi(weight, height):\n    b = weight / (height ** 2)\n    if b < 18.5: cat = "Underweight"\n    elif b < 25: cat = "Normal"\n    else: cat = "Overweight"\n    return f"BMI: {b:.1f} ({cat})"\n\nprint(bmi(70, 1.75))`, output: `BMI: 22.9 (Normal)` },
        { title: "Project idea: Stopwatch logic", code: `import time\nstart = time.time()\n# ... do some work ...\ntotal = sum(range(1000000))\nelapsed = time.time() - start\nprint(f"Task took {elapsed:.4f} seconds")`, output: `Task took 0.0234 seconds` }
      ],
      interview: [
        { q: "How many projects should I have in my portfolio?", a: "Quality over quantity — 3 to 5 well-documented projects with clean code and good READMEs are better than 15 half-finished ones." },
        { q: "What makes a good beginner project?", a: "One that solves a real problem, has clean code, a good README, and shows you understand core concepts. Examples: expense tracker, quiz app, weather app using an API." },
        { q: "Should I put my code on GitHub?", a: "Absolutely YES. GitHub is your coding resume. Recruiters and hiring managers check it. Commit regularly to show consistency." }
      ],
      practice: [
        { problem: "Build a complete To-Do list app with add, delete, and mark-complete features.", difficulty: "Easy", hint: "Use a list of dictionaries" },
        { problem: "Create an expense tracker that saves data to a file.", difficulty: "Medium", hint: "Use JSON to save/load" },
        { problem: "Build a command-line quiz game with score tracking.", difficulty: "Medium", hint: "Use a list of question dictionaries" },
        { problem: "Create a weather app that fetches real data from an API.", difficulty: "Hard", hint: "Use the requests library" },
        { problem: "Build a full CRUD application with a database (SQLite).", difficulty: "Company", hint: "Combine sqlite3 with functions for Create/Read/Update/Delete" }
      ],
      revision: [
        "**Career Success Checklist:**",
        "1. Build 3-5 quality projects (not 15 unfinished ones)",
        "2. Put everything on GitHub with good README files",
        "3. Write clean, commented code",
        "4. Practice explaining your projects out loud",
        "5. Solve coding problems daily (even 1 per day helps)",
        "6. Keep learning — technology changes fast",
        "",
        "> **Remember:** Consistency beats intensity. Code a little every day!"
      ]
    }
  ]
});

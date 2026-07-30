/* ============================================================
   Digital Python Notes — Interview Preparation Question Bank
   Structured Q&A for 0 to 10+ years experience.
   Developed by Code Origin.AI Private Limited
   ============================================================ */
window.DP_INTERVIEW = {
  levels: [
    "Python Basics", "Control Flow", "Collections", "Functions",
    "File Handling", "OOP", "Advanced Python", "Data Structures",
    "Algorithms", "Libraries", "Database", "APIs", "Testing",
    "Coding Problems", "Scenario-Based", "HR & Behavioural"
  ],
  companies: [
    "Google", "Amazon", "Microsoft", "Meta", "Apple", "Netflix",
    "Adobe", "Oracle", "TCS", "Infosys", "Wipro", "Accenture",
    "Cognizant", "Zoho", "Freshworks", "Uber", "PayPal", "Startups"
  ],
  questions: []
};


/* ---------- LEVEL 1: PYTHON BASICS ---------- */
window.DP_INTERVIEW.questions.push(
  {
    q: "What is the difference between a list and a tuple?",
    level: "Collections", difficulty: "Beginner", experience: "0-2 Years",
    company: ["TCS", "Infosys", "Wipro", "Accenture", "Amazon"],
    why: "Tests your understanding of mutability — one of the most fundamental Python concepts. Interviewers use it to check if you know WHEN to use each.",
    answer: "A **list** is mutable (can be changed after creation) and uses square brackets `[]`. A **tuple** is immutable (cannot be changed) and uses parentheses `()`. Lists are used for collections that change; tuples for fixed data.",
    analogy: "A list is like a **shopping cart** — you can add/remove items anytime. A tuple is like a **printed receipt** — once printed, it can't be changed.",
    code: `# List — mutable\nfruits = ["apple", "banana"]\nfruits.append("mango")\nprint(fruits)\n\n# Tuple — immutable\npoint = (3, 4)\n# point[0] = 5  # ERROR!\nprint(point)`,
    output: `['apple', 'banana', 'mango']\n(3, 4)`,
    timeComplexity: "Access: O(1) for both", spaceComplexity: "O(n) for both",
    mistakes: "Thinking tuples are always faster (only slightly). Forgetting a single-element tuple needs a comma: (5,) not (5).",
    bestPractices: "Use tuples for fixed data (coordinates, DB records) and as dictionary keys. Use lists when data changes.",
    followUps: ["Can a tuple contain a list?", "Why are tuples hashable but lists aren't?", "Which is faster and why?"],
    tips: "Mention that tuples can be dictionary keys but lists cannot — this shows deeper understanding."
  },
  {
    q: "What are Python's key features?",
    level: "Python Basics", difficulty: "Beginner", experience: "0-1 Years",
    company: ["TCS", "Infosys", "Cognizant", "Startups"],
    why: "A warm-up question to check basic awareness. Often the very first question in fresher interviews.",
    answer: "Python is: **Interpreted** (runs line by line), **Dynamically typed** (no type declaration), **High-level** (easy to read), **Object-oriented**, **Free & open-source**, **Portable** (cross-platform), and has a **huge standard library**.",
    analogy: "Python is like an **automatic car** — easy to drive (write), handles complex stuff for you (memory management), and works everywhere.",
    code: `# Dynamic typing in action\nx = 10        # int\nx = "hello"   # now a string — no error!\nx = [1, 2, 3] # now a list\nprint(type(x))`,
    output: `<class 'list'>`,
    timeComplexity: "N/A", spaceComplexity: "N/A",
    mistakes: "Just saying 'it's easy' without specifics. Give concrete features.",
    bestPractices: "Structure your answer as a list of 5-6 clear features with a one-line explanation each.",
    followUps: ["What does 'interpreted' mean?", "What is dynamic typing?", "Is Python compiled at all?"],
    tips: "Keep it to 5-6 features. Don't ramble. End with a real use case (AI, web, automation)."
  },
  {
    q: "What is the difference between '==' and 'is'?",
    level: "Python Basics", difficulty: "Beginner", experience: "0-3 Years",
    company: ["Amazon", "Zoho", "Freshworks", "TCS"],
    why: "A classic trick question. Tests understanding of value vs identity — trips up many candidates.",
    answer: "`==` checks if two values are **equal** (same content). `is` checks if two variables point to the **same object** in memory (same identity).",
    analogy: "`==` asks 'Do these two people have the same name?' `is` asks 'Are these two actually the same person?' Twins have the same name (==) but are different people (is).",
    code: `a = [1, 2, 3]\nb = [1, 2, 3]\nc = a\n\nprint(a == b)  # same values\nprint(a is b)  # different objects\nprint(a is c)  # same object`,
    output: `True\nFalse\nTrue`,
    timeComplexity: "O(n) for ==, O(1) for is", spaceComplexity: "O(1)",
    mistakes: "Using `is` to compare values (works for small ints/strings by luck due to caching, but fails for larger ones). Always use `==` for value comparison.",
    bestPractices: "Use `==` for value comparison. Use `is` only for None checks: `if x is None`.",
    followUps: ["Why does 'is' sometimes work for small integers?", "What is integer caching?", "How to correctly check for None?"],
    tips: "Mention integer caching (-5 to 256) to impress — Python pre-caches these so `is` accidentally works."
  },
  {
    q: "What is the difference between mutable and immutable objects?",
    level: "Python Basics", difficulty: "Intermediate", experience: "1-4 Years",
    company: ["Google", "Amazon", "Microsoft", "Adobe"],
    why: "Fundamental to understanding Python's memory model, function arguments, and avoiding bugs.",
    answer: "**Mutable** objects can be changed after creation (list, dict, set). **Immutable** objects cannot be changed (int, float, str, tuple, frozenset). Modifying an immutable creates a NEW object.",
    analogy: "Immutable is like a **stone tablet** — to change it you carve a new one. Mutable is like a **whiteboard** — you erase and rewrite the same board.",
    code: `# Immutable — new object created\ns = "hello"\nprint(id(s))\ns += " world"\nprint(id(s))  # different id!\n\n# Mutable — same object modified\nlst = [1, 2]\nprint(id(lst))\nlst.append(3)\nprint(id(lst))  # same id`,
    output: `140... (id1)\n140... (id2 - different)\n140... (id3)\n140... (id3 - same)`,
    timeComplexity: "N/A", spaceComplexity: "N/A",
    mistakes: "Using a mutable default argument like `def f(x=[])` — it's shared across calls! A famous bug.",
    bestPractices: "Never use mutable default arguments. Use `def f(x=None): if x is None: x = []`.",
    followUps: ["Why are strings immutable?", "What is the mutable default argument trap?", "Are tuples truly immutable if they contain a list?"],
    tips: "The mutable default argument trap is a favorite follow-up — be ready to explain it."
  }
);


/* ---------- FUNCTIONS ---------- */
window.DP_INTERVIEW.questions.push(
  {
    q: "What are *args and **kwargs?",
    level: "Functions", difficulty: "Intermediate", experience: "1-4 Years",
    company: ["Amazon", "Microsoft", "Zoho", "Infosys"],
    why: "Tests understanding of flexible function arguments — used heavily in real frameworks and decorators.",
    answer: "`*args` lets a function accept ANY number of positional arguments (collected as a tuple). `**kwargs` accepts any number of keyword arguments (collected as a dict).",
    analogy: "`*args` is like a **buffet plate** — take as many items as you want. `**kwargs` is like a **form with labeled fields** — each value has a name (key).",
    code: `def order(*args, **kwargs):\n    print("Items:", args)\n    print("Details:", kwargs)\n\norder("pizza", "coke", size="large", spicy=True)`,
    output: `Items: ('pizza', 'coke')\nDetails: {'size': 'large', 'spicy': True}`,
    timeComplexity: "O(n)", spaceComplexity: "O(n)",
    mistakes: "Wrong order of parameters. Correct order: positional, *args, keyword, **kwargs.",
    bestPractices: "Use `*args`/`**kwargs` for flexible APIs and decorators. Don't overuse — explicit params are clearer.",
    followUps: ["What is the correct parameter order?", "How to unpack a list into function arguments?", "Can you use both together?"],
    tips: "Mention that the names 'args' and 'kwargs' are convention — only `*` and `**` matter."
  },
  {
    q: "What is a decorator? Explain with an example.",
    level: "Functions", difficulty: "Advanced", experience: "3-7 Years",
    company: ["Google", "Meta", "Netflix", "Uber", "PayPal"],
    why: "A senior-level favorite. Decorators are used in Flask, Django, FastAPI. Tests understanding of functions as first-class objects and closures.",
    answer: "A **decorator** is a function that takes another function and extends its behaviour WITHOUT modifying its code. Applied with the `@decorator` syntax. Common uses: logging, authentication, timing, caching.",
    analogy: "A decorator is like **gift wrapping** — the gift (function) stays the same, but you add a wrapper (extra behaviour) around it. Or like a **phone case** — adds protection without changing the phone.",
    code: `def log(func):\n    def wrapper(*args, **kwargs):\n        print(f"Calling {func.__name__}")\n        return func(*args, **kwargs)\n    return wrapper\n\n@log\ndef add(a, b):\n    return a + b\n\nprint(add(3, 5))`,
    output: `Calling add\n8`,
    timeComplexity: "O(1) overhead", spaceComplexity: "O(1)",
    mistakes: "Forgetting `*args, **kwargs` in wrapper (breaks functions with arguments). Forgetting to return the result.",
    bestPractices: "Use `functools.wraps` to preserve the original function's name and docstring.",
    followUps: ["What is functools.wraps and why use it?", "How do decorators with arguments work?", "Real-world use cases?"],
    tips: "Mention real frameworks: Flask's @app.route, so the interviewer sees you understand practical use."
  }
);

/* ---------- OOP ---------- */
window.DP_INTERVIEW.questions.push(
  {
    q: "Explain the 4 pillars of OOP with examples.",
    level: "OOP", difficulty: "Intermediate", experience: "1-5 Years",
    company: ["Amazon", "Microsoft", "Oracle", "TCS", "Accenture"],
    why: "The most fundamental OOP question. Asked in almost every OOP-related interview.",
    answer: "1. **Encapsulation** — bundling data + methods, hiding internal details (private variables). 2. **Abstraction** — showing only essential features, hiding complexity. 3. **Inheritance** — a class reusing another class's code. 4. **Polymorphism** — same method name behaving differently for different classes.",
    analogy: "Think of a **car**: Encapsulation = engine hidden under the hood. Abstraction = you just use the steering, not the mechanics. Inheritance = a SportsCar inherits from Car. Polymorphism = 'start()' works for petrol, diesel, and electric cars differently.",
    code: `class Animal:\n    def sound(self):\n        return "Some sound"\n\nclass Dog(Animal):        # Inheritance\n    def sound(self):      # Polymorphism (override)\n        return "Woof"\n\nclass Cat(Animal):\n    def sound(self):\n        return "Meow"\n\nfor a in [Dog(), Cat()]:\n    print(a.sound())`,
    output: `Woof\nMeow`,
    timeComplexity: "N/A", spaceComplexity: "N/A",
    mistakes: "Confusing abstraction with encapsulation. Abstraction = hiding complexity; Encapsulation = hiding data.",
    bestPractices: "Give a real-world example for each pillar. Use the ABC module for abstraction.",
    followUps: ["Difference between abstraction and encapsulation?", "What is method overriding vs overloading?", "How does Python achieve abstraction?"],
    tips: "Have ONE consistent real-world example (like a car or animal) to explain all 4 — shows clarity."
  },
  {
    q: "What is method overriding vs method overloading in Python?",
    level: "OOP", difficulty: "Advanced", experience: "2-6 Years",
    company: ["Microsoft", "Adobe", "Oracle", "Cognizant"],
    why: "A tricky question because Python handles overloading differently from Java/C++.",
    answer: "**Overriding** = a child class provides a new version of a parent's method (same name, same params). Python fully supports this. **Overloading** = multiple methods with the same name but different parameters. Python does NOT support true overloading — the last definition wins. We simulate it with default args or *args.",
    analogy: "Overriding is like a **child changing a family recipe** to their taste. Overloading is like **one dish name having multiple recipes based on ingredients** — Python only remembers the last recipe.",
    code: `class Calc:\n    # Simulated overloading with default args\n    def add(self, a, b, c=0):\n        return a + b + c\n\nc = Calc()\nprint(c.add(2, 3))      # 2 args\nprint(c.add(2, 3, 4))   # 3 args`,
    output: `5\n9`,
    timeComplexity: "N/A", spaceComplexity: "N/A",
    mistakes: "Claiming Python supports overloading like Java. It doesn't — the second definition overwrites the first.",
    bestPractices: "Use default arguments, *args, or functools.singledispatch to simulate overloading.",
    followUps: ["Why doesn't Python support overloading?", "What is functools.singledispatch?", "How to override __init__?"],
    tips: "Clearly state Python does NOT have true overloading — this correction impresses interviewers."
  }
);

/* ---------- ADVANCED ---------- */
window.DP_INTERVIEW.questions.push(
  {
    q: "What is the GIL (Global Interpreter Lock)?",
    level: "Advanced Python", difficulty: "Expert", experience: "4-10+ Years",
    company: ["Google", "Meta", "Netflix", "Uber", "Amazon"],
    why: "A senior/expert question. Tests deep understanding of Python internals and concurrency.",
    answer: "The **GIL** is a mutex (lock) that allows only ONE thread to execute Python bytecode at a time, even on multi-core CPUs. This means Python threads don't give true parallelism for CPU-bound tasks. For CPU-heavy work, use **multiprocessing** (separate processes bypass the GIL). For I/O-bound work, threading still helps.",
    analogy: "The GIL is like a **single microphone in a meeting** — only one person (thread) can speak at a time, even if many want to. For real parallel discussions, you need separate rooms (processes).",
    code: `# CPU-bound: use multiprocessing (bypasses GIL)\nfrom multiprocessing import Pool\n\ndef square(n):\n    return n * n\n\nif __name__ == "__main__":\n    with Pool(4) as p:\n        print(p.map(square, [1, 2, 3, 4]))`,
    output: `[1, 4, 9, 16]`,
    timeComplexity: "N/A", spaceComplexity: "N/A",
    mistakes: "Saying Python can't do parallelism at all (it can, via multiprocessing). Confusing concurrency with parallelism.",
    bestPractices: "Threading for I/O-bound tasks, multiprocessing for CPU-bound tasks, asyncio for high-concurrency I/O.",
    followUps: ["How to achieve true parallelism in Python?", "Threading vs multiprocessing vs asyncio?", "Does GIL affect I/O tasks?"],
    tips: "Distinguish CPU-bound vs I/O-bound clearly — this is the key insight interviewers look for."
  },
  {
    q: "What is the difference between a shallow copy and a deep copy?",
    level: "Advanced Python", difficulty: "Advanced", experience: "2-6 Years",
    company: ["Amazon", "Microsoft", "Adobe", "PayPal"],
    why: "Tests understanding of references and nested objects — a common source of real bugs.",
    answer: "A **shallow copy** copies the outer object but shares references to nested objects. A **deep copy** recursively copies everything, creating fully independent objects. Use `copy.copy()` for shallow and `copy.deepcopy()` for deep.",
    analogy: "Shallow copy is like **photocopying a document with links to files** — the copy points to the same files. Deep copy is like **copying the document AND all linked files** — completely separate.",
    code: `import copy\noriginal = [[1, 2], [3, 4]]\n\nshallow = copy.copy(original)\ndeep = copy.deepcopy(original)\n\noriginal[0][0] = 99\nprint("Shallow:", shallow)  # affected!\nprint("Deep:", deep)        # safe`,
    output: `Shallow: [[99, 2], [3, 4]]\nDeep: [[1, 2], [3, 4]]`,
    timeComplexity: "Shallow O(1), Deep O(n)", spaceComplexity: "Deep O(n)",
    mistakes: "Assuming a slice copy `list[:]` is a deep copy — it's shallow! Nested objects are still shared.",
    bestPractices: "Use deepcopy only when needed (it's slower). For flat lists, shallow copy is enough.",
    followUps: ["Is list[:] a deep or shallow copy?", "How does deepcopy handle circular references?", "Performance impact?"],
    tips: "Show the nested list example — it clearly demonstrates the difference and impresses."
  }
);


/* ---------- DATA STRUCTURES & ALGORITHMS ---------- */
window.DP_INTERVIEW.questions.push(
  {
    q: "How do you reverse a linked list?",
    level: "Data Structures", difficulty: "Advanced", experience: "2-7 Years",
    company: ["Google", "Amazon", "Meta", "Microsoft", "Uber"],
    why: "One of the MOST asked DSA questions at product companies. Tests pointer manipulation.",
    answer: "Iterate through the list, reversing the direction of each node's pointer. Keep three pointers: previous, current, next. At each step, point current to previous, then move all pointers forward.",
    analogy: "Like reversing a **train** — you flip each coupling so each coach points to the one behind it instead of ahead.",
    code: `class Node:\n    def __init__(self, val):\n        self.val = val\n        self.next = None\n\ndef reverse(head):\n    prev = None\n    curr = head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev\n\n# Build 1->2->3, reverse to 3->2->1\na = Node(1); a.next = Node(2); a.next.next = Node(3)\nr = reverse(a)\nwhile r:\n    print(r.val, end=" ")\n    r = r.next`,
    output: `3 2 1 `,
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    mistakes: "Losing the 'next' pointer before reassigning (must save it first). Off-by-one errors.",
    bestPractices: "Draw the pointers on paper first. The iterative approach uses O(1) space vs recursive O(n).",
    followUps: ["Can you do it recursively?", "Reverse in groups of k?", "Detect a cycle in a linked list?"],
    tips: "Explain your three pointers OUT LOUD as you code — interviewers grade communication too."
  },
  {
    q: "Find two numbers in an array that sum to a target (Two Sum).",
    level: "Coding Problems", difficulty: "Beginner", experience: "0-5 Years",
    company: ["Amazon", "Google", "Microsoft", "Adobe", "Walmart Global Tech"],
    why: "The #1 most famous coding interview question. Tests if you can optimize from brute force to hash map.",
    answer: "Brute force: check every pair — O(n²). Optimized: use a hash map (dict). For each number, check if (target - number) is already seen. If yes, you found the pair — O(n).",
    analogy: "Like finding two puzzle pieces that fit — instead of comparing every piece with every other (slow), you remember pieces you've seen and instantly check if the matching piece exists.",
    code: `def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        complement = target - n\n        if complement in seen:\n            return [seen[complement], i]\n        seen[n] = i\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))`,
    output: `[0, 1]`,
    timeComplexity: "O(n) optimized, O(n²) brute", spaceComplexity: "O(n)",
    mistakes: "Using the same element twice. Returning values instead of indices when indices are asked.",
    bestPractices: "Always mention the brute-force first, THEN optimize. Interviewers want to see your thought process.",
    followUps: ["What if there are multiple pairs?", "Three Sum problem?", "What if the array is sorted?"],
    tips: "Start with brute force, say 'this is O(n²), can we do better?', then show the hash map solution."
  },
  {
    q: "Check if a string has all unique characters.",
    level: "Coding Problems", difficulty: "Beginner", experience: "0-3 Years",
    company: ["Amazon", "TCS", "Zoho", "Freshworks"],
    why: "A common warm-up coding question. Tests set usage and complexity awareness.",
    answer: "Compare the length of the string with the length of the set of its characters. If they're equal, all characters are unique (sets remove duplicates).",
    analogy: "Like checking if everyone in a room has a unique name — put all names in a 'no-duplicates box' (set); if the box has the same count, all are unique.",
    code: `def all_unique(s):\n    return len(s) == len(set(s))\n\nprint(all_unique("python"))\nprint(all_unique("hello"))`,
    output: `True\nFalse`,
    timeComplexity: "O(n)", spaceComplexity: "O(n)",
    mistakes: "Using nested loops (O(n²)) when a set gives O(n). Not considering case sensitivity.",
    bestPractices: "Ask the interviewer: 'Should it be case-sensitive?' — clarifying shows maturity.",
    followUps: ["Solve without extra data structures?", "What about Unicode?", "Case-insensitive version?"],
    tips: "Always ask clarifying questions about edge cases (empty string, case) before coding."
  }
);

/* ---------- HR & BEHAVIOURAL ---------- */
window.DP_INTERVIEW.questions.push(
  {
    q: "Tell me about yourself.",
    level: "HR & Behavioural", difficulty: "Beginner", experience: "0-10+ Years",
    company: ["TCS", "Infosys", "Wipro", "Accenture", "All Companies"],
    why: "The FIRST question in almost every interview. Sets the tone. Tests communication and self-awareness.",
    answer: "Use the **Present → Past → Future** formula: (1) Present: who you are now and your current skills. (2) Past: relevant education/projects/experience. (3) Future: why you're excited about THIS role. Keep it 60-90 seconds, focused on professional details.",
    analogy: "Like a **movie trailer** — give the highlights that make them want to watch the full film (hire you), not the entire plot.",
    code: `# Structure your answer:\n# 1. PRESENT: "I'm a Python developer skilled in..."\n# 2. PAST:    "I built X project using Django which..."\n# 3. FUTURE:  "I'm excited about this role because..."`,
    output: `A confident, structured 60-90 second introduction`,
    timeComplexity: "60-90 seconds", spaceComplexity: "N/A",
    mistakes: "Reciting your resume line by line. Sharing personal/family details. Going over 2 minutes.",
    bestPractices: "Practice out loud. Tailor it to the specific job. End with why you want THIS role.",
    followUps: ["Why do you want to work here?", "What are your strengths?", "Walk me through your best project."],
    tips: "Memorize the structure, not the words — sound natural, not rehearsed. Smile and be confident."
  },
  {
    q: "What is your greatest weakness?",
    level: "HR & Behavioural", difficulty: "Intermediate", experience: "0-10+ Years",
    company: ["All Companies"],
    why: "Tests self-awareness and honesty. Interviewers want growth mindset, not a fake 'I work too hard'.",
    answer: "Pick a REAL but non-critical weakness, then show how you're actively improving it. Formula: Weakness + Action you're taking + Progress made. Avoid weaknesses core to the job.",
    analogy: "Like a **fitness journey** — admit you're not perfect (e.g., 'I was weak at public speaking'), but show you're training and improving (joined a group, gave 5 talks).",
    code: `# GOOD answer structure:\n# "I used to struggle with [real weakness].\n#  I've been [specific action] to improve.\n#  For example, [concrete progress]."`,
    output: `An honest answer showing self-awareness + growth`,
    timeComplexity: "30-60 seconds", spaceComplexity: "N/A",
    mistakes: "Cliché answers like 'I'm a perfectionist'. Naming a weakness critical to the role. Saying 'I have no weaknesses'.",
    bestPractices: "Be genuine. Show a growth mindset. Always end on the improvement/progress note.",
    followUps: ["How do you handle criticism?", "Tell me about a failure.", "How do you improve your skills?"],
    tips: "Never say a job-critical weakness (e.g., don't say 'coding' for a dev role). Choose something like documentation or public speaking."
  }
);


/* ---------- COMPANY-WISE INTERVIEW GUIDE ---------- */
window.DP_INTERVIEW.companyGuide = [
  {
    name: "Google", tier: "FAANG",
    rounds: "Phone screen → 4-5 onsite rounds (coding + system design + behavioural)",
    focus: "Data structures, algorithms (hard level), system design, clean code",
    patterns: "Graphs, DP, trees, sliding window, binary search",
    tips: "Think out loud. Optimize from brute force. Discuss trade-offs. Code must be bug-free. Practice on a whiteboard."
  },
  {
    name: "Amazon", tier: "FAANG",
    rounds: "Online assessment → 3-4 rounds (coding + Leadership Principles)",
    focus: "DSA + Amazon's 16 Leadership Principles (behavioural is HUGE here)",
    patterns: "Trees, graphs, DP, two pointers, heaps",
    tips: "Prepare STAR-format stories for EVERY Leadership Principle. Amazon weighs behavioural as much as coding."
  },
  {
    name: "Microsoft", tier: "FAANG",
    rounds: "Online test → 3-4 technical rounds → HR",
    focus: "DSA, problem solving, OOP concepts, some system design",
    patterns: "Strings, arrays, trees, recursion, linked lists",
    tips: "Focus on clean, readable code. They value clarity and collaboration. Explain edge cases."
  },
  {
    name: "TCS / Infosys / Wipro", tier: "Service-Based (MNC)",
    rounds: "Aptitude test → Technical round → HR round",
    focus: "Python basics, OOP, DBMS, SQL, one coding problem, projects",
    patterns: "Basic string/array problems, pattern printing, simple logic",
    tips: "Master fundamentals + SQL. Know your resume projects deeply. Communication and attitude matter a lot for freshers."
  },
  {
    name: "Zoho / Freshworks", tier: "Product (India)",
    rounds: "Multiple coding rounds → technical → HR (often full-day)",
    focus: "Strong problem solving, coding without IDE, logic building",
    patterns: "String manipulation, math, arrays, real-world logic",
    tips: "Zoho tests raw coding ability heavily. Practice writing code on paper. Multiple elimination rounds."
  },
  {
    name: "Startups", tier: "Startup",
    rounds: "1-2 rounds (often practical/take-home) → founder chat",
    focus: "Practical skills, frameworks (Flask/Django/FastAPI), can you build & ship",
    patterns: "Real project tasks, API building, debugging",
    tips: "Show you can build end-to-end. Have a strong portfolio. Enthusiasm and versatility are valued over pure DSA."
  }
];

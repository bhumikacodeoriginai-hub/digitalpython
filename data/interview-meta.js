/* ============================================================
   Digital Python Notes — Interview Metadata (Phase 1 upgrade)
   Adds: experience levels, interview rounds, frequencies,
   question types, expanded companies, study plans, top-question
   enrichment map. Non-destructive: extends window.DP_INTERVIEW.
   Developed by Code Origin.AI Private Limited
   ============================================================ */
(function () {
  "use strict";
  var IV = window.DP_INTERVIEW;
  if (!IV) { console.warn("DP_INTERVIEW not loaded before interview-meta.js"); return; }

  /* ---------- Experience Levels (Level 0 → 7) ---------- */
  IV.experienceLevels = [
    { id: 0, label: "Level 0 — Absolute Beginner",     range: "Student",       hint: "Never coded before" },
    { id: 1, label: "Level 1 — Fresher",               range: "0–1 Years",     hint: "Just learning Python" },
    { id: 2, label: "Level 2 — Junior",                range: "1–2 Years",     hint: "Building small apps" },
    { id: 3, label: "Level 3 — Developer",             range: "2–3 Years",     hint: "Owning features" },
    { id: 4, label: "Level 4 — Mid-Level",             range: "3–5 Years",     hint: "Designing services" },
    { id: 5, label: "Level 5 — Senior",                range: "5–7 Years",     hint: "Leading modules" },
    { id: 6, label: "Level 6 — Staff / Lead",          range: "7–10 Years",    hint: "Owning systems" },
    { id: 7, label: "Level 7 — Architect / Principal", range: "10+ Years",     hint: "Cross-team architecture" }
  ];

  /* ---------- Interview Rounds ---------- */
  IV.rounds = [
    { id: "R1", name: "Round 1 — Screening",           icon: "📞", topics: ["MCQ","Python basics","Output prediction","Simple coding"] },
    { id: "R2", name: "Round 2 — Technical",           icon: "🧠", topics: ["Python","OOP","Collections","Functions","Exceptions","Modules"] },
    { id: "R3", name: "Round 3 — Coding",              icon: "💻", topics: ["Easy","Medium","Hard","Expert"] },
    { id: "R4", name: "Round 4 — Advanced Python",     icon: "🐍", topics: ["Iterators","Generators","Decorators","Closures","Context Managers","Descriptors","Metaclasses","GIL","Memory","GC","Asyncio","Threading","Multiprocessing"] },
    { id: "R5", name: "Round 5 — Project Discussion",  icon: "🏗️", topics: ["Architecture","Database","API","Auth","Deploy","Security","Performance","Scaling","Debugging"] },
    { id: "R6", name: "Round 6 — System Design",       icon: "🌐", topics: ["Requirements","APIs","DB","Cache","Queues","LB","Scaling","Availability","Security","Observability"] },
    { id: "R7", name: "Round 7 — Managerial",          icon: "👥", topics: ["Team fit","Conflict","Trade-offs","Prioritisation","Mentoring"] },
    { id: "R8", name: "Round 8 — HR",                  icon: "🤝", topics: ["Culture","Salary","Notice","Motivation","Goals"] }
  ];

  /* ---------- Frequency tiers with fire indicators ---------- */
  IV.frequencies = [
    { id: "extreme", label: "Extremely Frequent",  emoji: "🔥🔥🔥🔥🔥", weight: 5 },
    { id: "very",    label: "Very Frequent",       emoji: "🔥🔥🔥🔥",   weight: 4 },
    { id: "often",   label: "Frequently Asked",    emoji: "🔥🔥🔥",     weight: 3 },
    { id: "common",  label: "Common",              emoji: "🔥🔥",       weight: 2 },
    { id: "rare",    label: "Occasionally Asked",  emoji: "🔥",         weight: 1 }
  ];

  /* ---------- Question Types ---------- */
  IV.questionTypes = [
    { id: "conceptual",  label: "Conceptual",           icon: "💡" },
    { id: "coding",      label: "Coding Problem",       icon: "💻" },
    { id: "output",      label: "Predict the Output",   icon: "🔮" },
    { id: "debug",       label: "Find the Bug",         icon: "🐞" },
    { id: "mcq",         label: "MCQ",                  icon: "☑️" },
    { id: "scenario",    label: "Scenario-Based",       icon: "🎬" },
    { id: "system",      label: "System Design",        icon: "🏛️" },
    { id: "rapid",       label: "Rapid Fire",           icon: "⚡" },
    { id: "hr",          label: "HR / Behavioural",     icon: "🤝" },
    { id: "tricky",      label: "Tricky Python",        icon: "🎩" }
  ];

  /* ---------- Question provenance labels ---------- */
  IV.sourceTypes = [
    { id: "verified",     label: "Verified company question",   badge: "✅ Verified" },
    { id: "reported",     label: "Reported interview question", badge: "📝 Reported" },
    { id: "representative", label: "Representative question",   badge: "🎯 Representative" },
    { id: "industry",     label: "Industry-standard question",  badge: "🏢 Industry-Standard" }
  ];

  /* ---------- Expanded companies (32 total) ---------- */
  IV.companiesExtended = [
    // FAANG+
    "Google","Amazon","Microsoft","Meta","Apple","Netflix",
    // Big product
    "Adobe","Oracle","IBM","Intel","Cisco","SAP","Salesforce","PayPal","Uber","Airbnb","Walmart Global Tech","LinkedIn","Stripe","Shopify",
    // Indian IT services
    "TCS","Infosys","Wipro","Cognizant","Capgemini","Accenture","Deloitte","HCL","Tech Mahindra","Mphasis","LTIMindtree","Mindtree",
    // Product companies (India)
    "Zoho","Freshworks","Flipkart","Swiggy","Zomato","Razorpay","Paytm","Ola","Byju's","PhonePe",
    // Others
    "Startups","Fintech","Healthtech","E-commerce","EdTech"
  ];

  /* ---------- Expanded company guide (with round patterns) ---------- */
  IV.companyGuideExtended = [
    { name: "Google",              tier: "FAANG",         rounds: "Phone + 4-5 onsite (coding, coding, coding, system design, behavioural)", focus: "DSA depth, clean code, communication, complexity analysis, edge cases", patterns: "Two pointers, sliding window, DFS/BFS, DP, graphs, binary search on answer", tips: "Talk through your approach out loud. Don't jump to code. Ask clarifying questions early." },
    { name: "Amazon",              tier: "FAANG",         rounds: "OA + 4-6 rounds (coding, LP behavioural, LP behavioural, LP behavioural, bar raiser)", focus: "Leadership Principles + medium-hard coding. STAR stories are non-negotiable.", patterns: "Trees, graphs, BFS/DFS, hash maps, heaps, LP-style behavioural", tips: "Prepare 8+ STAR stories mapped to 16 Leadership Principles. Bar raiser is the toughest round." },
    { name: "Microsoft",           tier: "FAANG",         rounds: "Phone + 4-5 onsite (coding on whiteboard, low-level design, system design, behavioural)", focus: "Fundamentals + OOP + practical problem solving + collaboration", patterns: "Linked lists, trees, strings, DP, LLD (design a parking lot etc.)", tips: "Show incremental thinking. Write clean C-style code. Explain trade-offs, not just correctness." },
    { name: "Meta",                tier: "FAANG",         rounds: "Phone + 4-5 (coding × 2, system design, behavioural)", focus: "Medium-hard LeetCode, product sense, moving fast", patterns: "Graph, DP, arrays, backtracking, heavy Meta-tagged problems", tips: "Speed matters — aim for 2 medium problems in 45 min. Practice Meta-tagged LC." },
    { name: "Apple",               tier: "FAANG",         rounds: "Phone + 4-6 onsite, team-specific", focus: "Deep systems, OS-level thinking, memory, hardware-software interfaces", patterns: "OOP, low-level design, C/Python, performance tuning", tips: "Every team is different. Research your interviewers' team scope carefully." },
    { name: "Netflix",             tier: "FAANG",         rounds: "3-4 rounds, senior-focused, freedom & responsibility culture", focus: "System design at scale, judgement, seniority. Fewer LeetCode-style questions.", patterns: "Streaming, caching, distributed systems, RPC, observability", tips: "Only apply if you're strong on senior scope. They hire fully-formed engineers." },
    { name: "Adobe",               tier: "Big product",   rounds: "OA + 3-4 onsite (coding, DSA, behavioural, hiring manager)", focus: "DSA + product understanding + core Python/JS", patterns: "Arrays, strings, trees, dynamic programming, some ML for AI teams", tips: "Read Adobe's product suite. Have a portfolio piece using PDFs/creative APIs if possible." },
    { name: "Uber",                tier: "Big product",   rounds: "Phone + 4-5 (coding, system design × 2, behavioural)", focus: "Real-time distributed systems, geospatial, latency", patterns: "Graphs, matrix, DP, marketplace-style design", tips: "System design is heavier than at other companies. Study dispatch/rider-driver matching." },
    { name: "Airbnb",              tier: "Big product",   rounds: "Phone + 4-5 onsite (coding, coding, cross-functional, host round)", focus: "Cultural fit + medium-hard coding + product thinking", patterns: "Trees, backtracking, graphs, DP, occasionally OOP design", tips: "Cross-functional round is unique — non-eng interviewers assess collaboration." },
    { name: "Stripe",              tier: "Big product",   rounds: "Phone + 4-5 onsite (integration, bug squash, API design, system design)", focus: "Payment domain, correctness under money-moving constraints", patterns: "Real-world API tasks, idempotency, retries, JSON handling", tips: "Integration round: build against a real API in the interview. Practice reading docs fast." },
    { name: "LinkedIn",            tier: "Big product",   rounds: "OA + 4 onsite (coding × 2, system design, host)", focus: "Search/relevance/feed problems, distributed systems", patterns: "Graphs, heaps, tries, DP on strings, feed design", tips: "System design often around feeds, ranking, follow graph." },
    { name: "Walmart Global Tech", tier: "Big product",   rounds: "OA + 2-3 rounds (DSA + system design + managerial)", focus: "E-commerce scale, inventory + order systems, cost-conscious design", patterns: "Arrays, strings, DP, LLD around cart/checkout", tips: "Numbers matter — quote scale (100k RPS etc.). Talk about cost trade-offs." },
    { name: "TCS",                 tier: "Indian IT",     rounds: "Aptitude + Technical + HR (sometimes MR)", focus: "Fundamentals, resume projects, HR fit", patterns: "Python basics, SQL, OOP, one small coding question", tips: "Know your resume line by line. HR round can decide the offer." },
    { name: "Infosys",             tier: "Indian IT",     rounds: "InfyTQ MCQ + Technical + HR", focus: "Fundamentals, output-based, some SQL", patterns: "OOP, exceptions, small coding, Python vs Java compare", tips: "InfyTQ is filtering. Practice output-based questions and pseudo-code." },
    { name: "Wipro",               tier: "Indian IT",     rounds: "NLTH written + Technical + HR", focus: "Python basics + English + logical", patterns: "MCQ + basic coding + HR", tips: "NLTH is a hurdle — focus on aptitude first, coding second." },
    { name: "Cognizant",           tier: "Indian IT",     rounds: "GenC MCQ + Technical + HR (sometimes managerial)", focus: "Python basics, SQL, some cloud/AI awareness", patterns: "OOP, one coding question, SQL joins", tips: "Show interest in AI/cloud roles — Cognizant is pushing GenC AI/Cloud tracks." },
    { name: "Accenture",           tier: "Indian IT",     rounds: "Cognitive + Technical + HR", focus: "Fundamentals + communication", patterns: "Python basics, OOP, small SQL", tips: "Communication is heavily weighted here. Practice explaining code aloud." },
    { name: "Capgemini",           tier: "Indian IT",     rounds: "Written + Technical + HR", focus: "Fundamentals + basic coding + English", patterns: "OOP, exceptions, strings", tips: "Standard IT interview. Be confident on Python basics." },
    { name: "Deloitte",            tier: "Consulting",    rounds: "Aptitude + Case + Technical + HR", focus: "Analytical + Python + a bit of case study", patterns: "Python + SQL + basic analytics", tips: "Case study is unique — practice structured thinking (MECE)." },
    { name: "HCL",                 tier: "Indian IT",     rounds: "Written + Technical + HR", focus: "Fundamentals + resume projects", patterns: "OOP, small coding, SQL", tips: "Same profile as TCS/Infosys. Basics are enough if solid." },
    { name: "Tech Mahindra",       tier: "Indian IT",     rounds: "Written + Technical + HR", focus: "Fundamentals, some telecom/network flavour", patterns: "Python basics + basic networking", tips: "For telecom/network roles: know sockets, HTTP basics." },
    { name: "Zoho",                tier: "Indian product", rounds: "3-4 rounds, deeply technical, no aptitude", focus: "Real coding on paper, fundamentals, systems thinking", patterns: "Recursion, strings, DP, LLD, sometimes C", tips: "Zoho rewards depth over breadth. They test if you REALLY understand." },
    { name: "Freshworks",          tier: "Indian product", rounds: "OA + 3-4 onsite (coding, design, behavioural)", focus: "SaaS scale, Python + web, product feel", patterns: "Strings, hashing, LLD (design a ticket system)", tips: "Play with Freshdesk/CRM domain. LLD questions often product-shaped." },
    { name: "Flipkart",            tier: "Indian product", rounds: "OA + 3-4 (coding, system design, hiring manager)", focus: "E-commerce scale, DSA, LLD, system design", patterns: "Arrays, trees, DP, LLD (cart/checkout), high-scale SD", tips: "System design is core from mid-level upwards. Know CAP + sharding." },
    { name: "Razorpay",            tier: "Indian product", rounds: "OA + 3-4 (coding, low-level design, system design, culture)", focus: "Fintech correctness, latency, distributed txns", patterns: "Idempotency, retries, ledgers, hashing, graphs", tips: "Have opinions on money-moving APIs (idempotency, at-least-once, sagas)." },
    { name: "Swiggy",              tier: "Indian product", rounds: "OA + 3-4 (coding, system design, HM)", focus: "Real-time marketplace, geospatial, ML integration", patterns: "Heaps, graphs, DP, dispatch design", tips: "Read about ETA/dispatch problems. Prepare to design an order flow." },
    { name: "Zomato",              tier: "Indian product", rounds: "OA + 3-4 (coding, system design, HM)", focus: "Similar to Swiggy — order + delivery + rating flows", patterns: "Graphs, DP, LLD around orders", tips: "System design of an order/restaurant listing is common." },
    { name: "PhonePe",             tier: "Indian product", rounds: "OA + 3-4 (coding, LLD/SD, culture)", focus: "UPI/payment scale, correctness", patterns: "Trees, DP, LLD (wallets), system design (transaction pipeline)", tips: "Fintech basics: double-entry, ledgers, reconciliation." },
    { name: "Paytm",               tier: "Indian product", rounds: "OA + 2-3 (coding + technical)", focus: "Payment + super-app scale, Java/Python OOP", patterns: "Arrays, strings, some system design", tips: "Test speed on OA is high — practice speed." },
    { name: "Startups",            tier: "Startups",       rounds: "Depends: 1-3 rounds, often faster + more scrappy", focus: "Can you ship? Do you own things end-to-end?", patterns: "Practical projects, one coding question, culture", tips: "Have a portfolio. Show a project you shipped alone. Speed of learning matters more than depth." }
  ];

  /* ---------- Study plans (adaptive) ---------- */
  IV.studyPlans = [
    { id: "1d",  duration: "1 Day",   audience: "Interview tomorrow", steps: [
      "Morning: Top 30 must-know Python questions (basics + OOP)",
      "Afternoon: 3 easy + 2 medium coding problems + review complexity",
      "Evening: Behavioural — Tell me about yourself + 3 STAR stories",
      "Night: Review your resume line by line + mock 5 rapid-fire"
    ] },
    { id: "3d",  duration: "3 Days",  audience: "Weekend cramming", steps: [
      "Day 1: Python fundamentals (data types, control flow, functions, OOP) — 40 questions",
      "Day 2: DSA (arrays, strings, hashing, two-pointer) — 15 problems",
      "Day 3: Mock interview + system design walkthrough + HR/behavioural"
    ] },
    { id: "7d",  duration: "7 Days",  audience: "One-week ramp", steps: [
      "Day 1: Python basics + strings + collections",
      "Day 2: OOP + exceptions + file handling",
      "Day 3: Advanced Python (decorators, generators, context managers)",
      "Day 4: DSA — arrays, strings, trees (15 problems)",
      "Day 5: DP + graphs (10 problems) + one system design",
      "Day 6: Company-specific mock (pick 2 target companies)",
      "Day 7: HR/behavioural + resume + final mock"
    ] },
    { id: "15d", duration: "15 Days", audience: "Solid prep window", steps: [
      "Days 1-3: Python basics + output-based + tricky questions",
      "Days 4-6: OOP deep + design patterns + exceptions",
      "Days 7-9: Advanced Python (async, threading, memory, GIL, decorators)",
      "Days 10-12: DSA — 30 problems across all patterns",
      "Days 13-14: System design (5 designs)",
      "Day 15: Full mock + resume + HR prep"
    ] },
    { id: "30d", duration: "30 Days", audience: "Standard interview prep", steps: [
      "Week 1: Python fundamentals — 100 questions + 20 coding",
      "Week 2: OOP + advanced Python — 80 questions + 20 coding",
      "Week 3: DSA — 50 problems across patterns + start SD",
      "Week 4: SD deep + company-specific + 5 full mocks + HR"
    ] },
    { id: "60d", duration: "60 Days", audience: "Career transition / senior prep", steps: [
      "Weeks 1-2: All Python fundamentals + output-based + tricky",
      "Weeks 3-4: Advanced Python + libraries (NumPy, Pandas, FastAPI, Django)",
      "Weeks 5-6: DSA — 80 problems + patterns + complexity mastery",
      "Weeks 7-8: System design at scale + company-specific mocks + salary prep"
    ] },
    { id: "90d", duration: "90 Days", audience: "Deep 3-month prep (senior/staff)", steps: [
      "Month 1: Python end-to-end (all 44 modules) + 150 questions",
      "Month 2: DSA (120 problems) + libraries + backend + AI/ML basics",
      "Month 3: System design (20 designs) + 15 full mocks + behavioural + negotiation"
    ] }
  ];

  /* ---------- Rapid Fire deck (100 short Q&A pairs) ---------- */
  IV.rapidFire = [
    { q: "What is Python?",                             a: "A high-level, interpreted, dynamically-typed language." },
    { q: "Is Python compiled or interpreted?",          a: "Interpreted — but source is first compiled to bytecode (.pyc) internally." },
    { q: "What is PEP 8?",                              a: "Python's official style guide — 4-space indent, snake_case, 79-char lines." },
    { q: "Difference between list and tuple?",          a: "List mutable, tuple immutable. Tuple is hashable, list is not." },
    { q: "What is a set?",                              a: "Unordered collection of unique, hashable items with O(1) membership tests." },
    { q: "What is a dictionary?",                       a: "Key-value store, hash-based, ordered since Python 3.7." },
    { q: "Difference between == and is?",               a: "== compares values, is compares object identity." },
    { q: "What is None?",                               a: "Python's null — a singleton object of type NoneType." },
    { q: "Mutable data types?",                         a: "list, dict, set, bytearray, most custom classes." },
    { q: "Immutable data types?",                       a: "int, float, str, tuple, bool, frozenset, bytes." },
    { q: "What is *args?",                              a: "Collect variable positional arguments into a tuple." },
    { q: "What is **kwargs?",                           a: "Collect variable keyword arguments into a dict." },
    { q: "What is a lambda?",                           a: "Anonymous single-expression function." },
    { q: "What is a decorator?",                        a: "A function that wraps another to extend its behaviour." },
    { q: "What is a generator?",                        a: "A function using yield to produce values lazily." },
    { q: "What is an iterator?",                        a: "Any object with __iter__ and __next__ methods." },
    { q: "What is a closure?",                          a: "A function that remembers variables from its enclosing scope." },
    { q: "What is the GIL?",                            a: "Global Interpreter Lock — allows only one thread to execute Python bytecode at a time." },
    { q: "When to use threads vs processes?",           a: "Threads for I/O-bound, processes for CPU-bound work." },
    { q: "What is asyncio?",                            a: "Standard library for writing single-threaded concurrent code using async/await." },
    { q: "What is a context manager?",                  a: "Object with __enter__ and __exit__ used with `with` statement." },
    { q: "What is list comprehension?",                 a: "Concise syntax to build a list from an iterable: [x*2 for x in items]." },
    { q: "Difference between shallow and deep copy?",   a: "Shallow copies the outer object only; deep copies everything recursively." },
    { q: "What is LEGB?",                               a: "Local, Enclosing, Global, Built-in — Python's name-lookup order." },
    { q: "What is MRO?",                                a: "Method Resolution Order — how Python decides which parent method to call in multi-inheritance." },
    { q: "What is @staticmethod?",                      a: "Method that doesn't receive self or cls — bound to the class namespace only." },
    { q: "What is @classmethod?",                       a: "Method that receives the class as first argument (cls)." },
    { q: "What is @property?",                          a: "Turns a method into a read-only attribute." },
    { q: "What is __init__?",                           a: "The instance initialiser — called after an object is created." },
    { q: "What is __new__?",                            a: "The instance creator — called before __init__ to allocate the object." },
    { q: "What is a dataclass?",                        a: "A decorator that auto-generates __init__, __repr__, __eq__ from type annotations." },
    { q: "What is duck typing?",                        a: "Objects are treated by behaviour, not by class — 'if it quacks like a duck…'." },
    { q: "What is polymorphism?",                       a: "Same interface, different implementations across types." },
    { q: "What is encapsulation?",                      a: "Hiding data behind methods; controlling access." },
    { q: "What is abstraction?",                        a: "Exposing what an object does, not how." },
    { q: "What is inheritance?",                        a: "Deriving a class from another to reuse and extend behaviour." },
    { q: "What is method overriding?",                  a: "Redefining a parent method in a subclass." },
    { q: "What is method overloading in Python?",       a: "Python doesn't support it directly — use default args or *args." },
    { q: "What are magic methods?",                     a: "Dunder methods like __add__, __len__ that Python calls implicitly." },
    { q: "What is a metaclass?",                        a: "A class whose instances are classes themselves — 'the class of a class'." },
    { q: "What is a descriptor?",                       a: "An object defining __get__/__set__/__delete__ used to manage attributes." },
    { q: "What is memoization?",                        a: "Caching a function's results by inputs — see functools.lru_cache." },
    { q: "What is recursion?",                          a: "A function that calls itself with a smaller input until a base case." },
    { q: "What is the difference between range and xrange?", a: "Python 3 has only range — it's the lazy version (xrange was Python 2)." },
    { q: "What is enumerate()?",                        a: "Iterates producing (index, value) pairs." },
    { q: "What is zip()?",                              a: "Pairs elements from multiple iterables into tuples." },
    { q: "What is map()?",                              a: "Applies a function to every item of an iterable." },
    { q: "What is filter()?",                           a: "Keeps items where a predicate returns True." },
    { q: "What is reduce()?",                           a: "Accumulates a value across an iterable (functools.reduce)." },
    { q: "How to sort a dict by value?",                a: "sorted(d.items(), key=lambda kv: kv[1])" },
    { q: "How to reverse a string?",                    a: "s[::-1]" },
    { q: "How to remove duplicates from a list?",       a: "list(dict.fromkeys(items)) — preserves order." },
    { q: "How to check palindrome?",                    a: "s == s[::-1]" },
    { q: "What is pass?",                               a: "A no-op statement — placeholder for empty blocks." },
    { q: "What is break?",                              a: "Exits the innermost loop immediately." },
    { q: "What is continue?",                           a: "Skips to the next iteration of the loop." },
    { q: "What is else on a for loop?",                 a: "Runs after the loop finishes normally — skipped if break fires." },
    { q: "What is try/except/finally?",                 a: "try attempts, except handles errors, finally always runs." },
    { q: "What is raise?",                              a: "Manually throws an exception." },
    { q: "What is assert?",                             a: "Debug-time check — raises AssertionError if condition is False." },
    { q: "What is a module?",                           a: "A single .py file that can be imported." },
    { q: "What is a package?",                          a: "A folder of modules with an __init__.py." },
    { q: "What is pip?",                                a: "The Python package installer for PyPI packages." },
    { q: "What is a virtual environment?",              a: "An isolated Python setup with its own packages, created with `python -m venv`." },
    { q: "What is __name__ == '__main__'?",             a: "True only when the file is run directly, not imported." },
    { q: "What is JSON?",                               a: "JavaScript Object Notation — a text format for structured data." },
    { q: "How to parse JSON?",                          a: "json.loads(text) → dict; json.load(file)." },
    { q: "What is pickle?",                             a: "Python's binary serialisation — only safe for trusted data." },
    { q: "What is a REST API?",                         a: "HTTP-based interface using GET/POST/PUT/DELETE on resources with JSON payloads." },
    { q: "What is JWT?",                                a: "A signed token containing user claims — stateless authentication." },
    { q: "What is CORS?",                               a: "A browser rule that controls cross-origin HTTP requests." },
    { q: "What is a docstring?",                        a: "A string literal at the top of a function/class/module used as documentation." },
    { q: "What is type hinting?",                       a: "Optional annotations like def f(x: int) -> str — checked by mypy, not runtime." },
    { q: "What is walrus operator :=?",                 a: "Assigns and returns in one expression (Python 3.8+)." },
    { q: "What is f-string?",                           a: "Formatted string literal: f\"{name} is {age}\"." },
    { q: "How to swap two variables?",                  a: "a, b = b, a" },
    { q: "What is Counter?",                            a: "collections.Counter — a dict subclass that counts hashable items." },
    { q: "What is defaultdict?",                        a: "Dict with a factory for missing keys (e.g. defaultdict(list))." },
    { q: "What is OrderedDict?",                        a: "Dict that remembers insertion order (built-in since 3.7)." },
    { q: "What is namedtuple?",                         a: "A tuple subclass with named fields — lightweight class alternative." },
    { q: "What is deque?",                              a: "collections.deque — O(1) append/pop on both ends." },
    { q: "What is heapq?",                              a: "Binary min-heap module — priority queue." },
    { q: "What is @lru_cache?",                         a: "Decorator that memoises a function's results (functools)." },
    { q: "What is a stack?",                            a: "LIFO structure — use a list with append/pop or collections.deque." },
    { q: "What is a queue?",                            a: "FIFO structure — use collections.deque or queue.Queue." },
    { q: "What is BFS?",                                a: "Breadth-first search — level-order traversal using a queue." },
    { q: "What is DFS?",                                a: "Depth-first search — go deep using recursion or a stack." },
    { q: "What is Dijkstra's algorithm?",               a: "Shortest path in a weighted graph with non-negative edges using a min-heap." },
    { q: "What is a binary search tree?",               a: "A tree where left < node < right — O(log n) search when balanced." },
    { q: "What is a hash collision?",                   a: "Two keys hashing to the same bucket — resolved by chaining or open addressing." },
    { q: "What is Big-O?",                              a: "Asymptotic upper bound on time/space growth as input scales." },
    { q: "What is O(1)?",                               a: "Constant time — independent of input size (hash lookup)." },
    { q: "What is O(log n)?",                           a: "Halves the search space each step — binary search." },
    { q: "What is O(n log n)?",                         a: "Efficient sorting bound — merge sort, quicksort average." },
    { q: "What is memoization vs tabulation?",          a: "Top-down cached recursion vs bottom-up table fill — same complexity." },
    { q: "What is SQL JOIN?",                           a: "Combines rows from two tables based on a matching column." },
    { q: "What is an index in a database?",             a: "A data structure (usually B-tree) that speeds up reads on specific columns." },
    { q: "What is normalization?",                      a: "Structuring tables to reduce redundancy (1NF/2NF/3NF)." },
    { q: "What is a transaction?",                      a: "A group of DB ops that succeed or fail together — ACID." },
    { q: "What is Redis?",                              a: "An in-memory key-value store — used for cache, queues, sessions." },
    { q: "What is Docker?",                             a: "A tool to package apps + deps into portable containers." },
    { q: "What is Kubernetes?",                         a: "An orchestrator for containers — schedules, scales, heals them." },
    { q: "What is CI/CD?",                              a: "Continuous integration + delivery — auto-test and deploy on every commit." },
    { q: "What is Git rebase vs merge?",                a: "Rebase rewrites history to a linear line; merge preserves it and adds a merge commit." }
  ];

  /* ---------- Top-30 question enrichment (frequency + round + type) ---------- */
  /* Applied at load time by app.js. Keyed by normalised question text. */
  IV.enrichmentMap = (function () {
    function norm(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim(); }
    var raw = [
      // [normQuestion, frequencyId, roundId, questionTypeId, expectedKeywords[]]
      ["what is the difference between a list and a tuple",     "extreme","R1","conceptual", ["mutable","immutable","hashable","O(1)"]],
      ["what are pythons key features",                         "extreme","R1","conceptual", ["interpreted","dynamic","OOP","cross-platform"]],
      ["what is the difference between  and is",                "extreme","R2","conceptual", ["value","identity","integer cache","None"]],
      ["what is the difference between mutable and immutable objects", "extreme","R2","conceptual", ["mutable","immutable","hashable","default arg trap"]],
      ["what are args and kwargs",                              "very",   "R2","conceptual", ["tuple","dict","unpacking","order"]],
      ["what is a decorator explain with an example",           "very",   "R2","conceptual", ["closure","wraps","logging","first-class"]],
      ["what is a generator",                                   "very",   "R4","conceptual", ["yield","lazy","state","memory"]],
      ["what is a closure",                                     "often",  "R4","conceptual", ["enclosing","free variables","late binding"]],
      ["what is the gil",                                       "very",   "R4","conceptual", ["one thread","cpython","io-bound","cpu-bound"]],
      ["what is inheritance",                                   "very",   "R2","conceptual", ["parent","child","super","MRO"]],
      ["what is polymorphism",                                  "very",   "R2","conceptual", ["overriding","duck typing","interface"]],
      ["what is encapsulation",                                 "often",  "R2","conceptual", ["private","name-mangling","property"]],
      ["what is abstraction",                                   "often",  "R2","conceptual", ["ABC","interface","hide implementation"]],
      ["what is the difference between shallow copy and deep copy","very","R4","conceptual", ["copy","nested","reference","recursive"]],
      ["what is a lambda function",                             "often",  "R2","conceptual", ["anonymous","single expression","map/filter"]],
      ["what is list comprehension",                            "often",  "R1","conceptual", ["concise","readable","filtering"]],
      ["what is python decorators used for",                    "very",   "R2","conceptual", ["logging","auth","caching","framework"]],
      ["what is method resolution order mro",                   "often",  "R4","conceptual", ["C3","super()","diamond"]],
      ["what is a metaclass",                                   "common", "R4","conceptual", ["class of class","type","framework"]],
      ["what is init in python",                                "very",   "R2","conceptual", ["constructor","self","attributes"]],
      ["what is self in python",                                "extreme","R2","conceptual", ["instance","method","implicit first arg"]],
      ["what is name main",                                     "very",   "R1","conceptual", ["script","module","import"]],
      ["what is pep 8",                                         "very",   "R1","conceptual", ["style","4 spaces","snake_case","line length"]],
      ["what is a virtual environment",                         "often",  "R1","conceptual", ["venv","isolation","deps"]],
      ["how do you handle exceptions in python",                "very",   "R2","conceptual", ["try","except","finally","specific"]],
      ["what is the difference between except exception and except", "common","R2","conceptual", ["bare except","specific","masking"]],
      ["what is a context manager",                             "very",   "R4","conceptual", ["with","__enter__","__exit__","resource"]],
      ["what is an iterator",                                   "often",  "R4","conceptual", ["__iter__","__next__","StopIteration"]],
      ["what is duck typing",                                   "common", "R2","conceptual", ["behaviour","protocol","EAFP"]],
      ["explain reverse a string",                              "extreme","R3","coding",     ["slicing","two pointer","reversed"]]
    ];
    var map = {};
    raw.forEach(function (r) { map[norm(r[0])] = { frequency: r[1], round: r[2], questionType: r[3], expectedKeywords: r[4] }; });
    return { _norm: norm, byQuestion: map };
  })();

  /* ---------- Public helper for app.js ---------- */
  IV.getFrequency = function (id) {
    for (var i = 0; i < IV.frequencies.length; i++) if (IV.frequencies[i].id === id) return IV.frequencies[i];
    return null;
  };
  IV.getRound = function (id) {
    for (var i = 0; i < IV.rounds.length; i++) if (IV.rounds[i].id === id) return IV.rounds[i];
    return null;
  };
  IV.getQuestionType = function (id) {
    for (var i = 0; i < IV.questionTypes.length; i++) if (IV.questionTypes[i].id === id) return IV.questionTypes[i];
    return null;
  };

  /* ---------- P2: Bulk derivation ----------
     Assigns round / questionType / frequency / expLevel to EVERY question
     based on its existing level, difficulty and experience fields. */

  /* Map from level -> default round */
  var LEVEL_TO_ROUND = {
    "Python Basics":            "R1",  "MCQ":                    "R1",
    "Output-Based":             "R1",  "Rapid-Fire":             "R1",
    "Control Flow":             "R2",  "Collections":            "R2",
    "Functions":                "R2",  "File Handling":          "R2",
    "OOP":                      "R2",  "Libraries":              "R2",
    "Debugging":                "R2",  "Testing":                "R2",
    "APIs":                     "R2",
    "Coding Problems":          "R3",  "Data Structures":        "R3",
    "Algorithms":               "R3",  "Database":               "R3",
    "Database Deep-Dive":       "R3",
    "Advanced Python":          "R4",  "Concurrency":            "R4",
    "Python Internals":         "R4",  "AI/ML":                  "R4",
    "LLM & AI Specialty":       "R4",  "Data Engineering":       "R4",
    "Scenario-Based":           "R5",  "DevOps":                 "R5",
    "Cloud":                    "R5",  "Frontend & Full-Stack":  "R5",
    "Networking":               "R6",  "System Design":          "R6",
    "Security":                 "R6",
    "Company-Specific":         "R2",  // default; overridden per case
    "HR & Behavioural":         "R8"
  };

  /* Map from level -> default questionType */
  var LEVEL_TO_TYPE = {
    "MCQ":                "mcq",         "Output-Based":       "output",
    "Debugging":          "debug",       "Coding Problems":    "coding",
    "Data Structures":    "coding",      "Algorithms":         "coding",
    "Scenario-Based":     "scenario",    "System Design":      "system",
    "Rapid-Fire":         "rapid",       "HR & Behavioural":   "hr"
    // everything else -> "conceptual" (fallback)
  };

  /* Derive expLevel (0-7) from experience string */
  function deriveExpLevel(exp) {
    if (!exp) return 1;
    var s = String(exp).toLowerCase();
    if (/10\+|10\s*year|architect|principal/.test(s))              return 7;
    if (/7-10|7\s*year|8\s*year|9\s*year|staff|lead/.test(s))       return 6;
    if (/5-10|5-7|6-|senior/.test(s))                                return 5;
    if (/3-5|3-7|3-8|4-|mid/.test(s))                                return 4;
    if (/2-5|2-6|2-7|2-8|2-10/.test(s))                              return 3;
    if (/1-5|1-4|1-6|1-7|1-8|1-10/.test(s))                          return 3;
    if (/0-4|0-5|0-3|1-3/.test(s))                                   return 2;
    if (/0-2|0-1|fresher|beginner|student/.test(s))                  return 1;
    if (/all|any/.test(s))                                           return 3;
    return 3;
  }

  /* Derive frequency from level + difficulty */
  var HOT_LEVELS = { "Python Basics": true, "Control Flow": true, "Collections": true, "Functions": true, "OOP": true, "Output-Based": true, "MCQ": true, "Company-Specific": true };
  var MEDIUM_LEVELS = { "File Handling": true, "Libraries": true, "Coding Problems": true, "Debugging": true, "HR & Behavioural": true, "Rapid-Fire": true, "APIs": true, "Database": true, "Testing": true };
  function deriveFrequency(level, difficulty) {
    if (HOT_LEVELS[level])    return difficulty === "Expert" ? "often"  : "very";
    if (MEDIUM_LEVELS[level]) return difficulty === "Expert" ? "common" : "often";
    if (difficulty === "Expert" || difficulty === "Advanced") return "common";
    return "common";
  }

  /* Detect coding-style questions from the level string */
  function looksCoding(level) {
    var s = String(level || "").toLowerCase();
    return s.indexOf("coding") !== -1 || s.indexOf("algorithm") !== -1 || s.indexOf("data structure") !== -1;
  }

  /* Round for Company-Specific: guess by looking at the question text */
  function refineCompanyRound(q) {
    var t = (q.q || "").toLowerCase();
    if (/design a |scale|architecture|distributed|system/.test(t)) return "R6";
    if (/coding|leetcode|find|two sum|palindrome|reverse|sort/.test(t)) return "R3";
    if (/explain|difference|what is|how does/.test(t)) return "R2";
    return "R2";
  }

  /* Apply derivation to every question — only fills missing fields */
  var round_added = 0, type_added = 0, freq_upgraded = 0, exp_added = 0;
  IV.questions.forEach(function (q) {
    // First try precise enrichment map
    var key = IV.enrichmentMap._norm(q.q);
    var extra = IV.enrichmentMap.byQuestion[key];
    if (extra) {
      if (!q.frequency)         q.frequency = extra.frequency;
      if (!q.round)             q.round = extra.round;
      if (!q.questionType)      q.questionType = extra.questionType;
      if (!q.expectedKeywords)  q.expectedKeywords = extra.expectedKeywords;
    }

    // Round derivation
    if (!q.round) {
      if (q.level === "Company-Specific") q.round = refineCompanyRound(q);
      else q.round = LEVEL_TO_ROUND[q.level] || "R2";
      round_added++;
    }

    // Question type derivation
    if (!q.questionType) {
      if (looksCoding(q.level)) q.questionType = "coding";
      else q.questionType = LEVEL_TO_TYPE[q.level] || "conceptual";
      type_added++;
    }

    // Frequency: fill or upgrade default "common" using level/difficulty
    var derived = deriveFrequency(q.level, q.difficulty);
    if (!q.frequency) {
      q.frequency = derived;
    } else if (q.frequency === "common" && derived !== "common") {
      q.frequency = derived;
      freq_upgraded++;
    }

    // Experience level (numeric 0-7)
    if (q.expLevel == null) {
      q.expLevel = deriveExpLevel(q.experience);
      exp_added++;
    }
  });
  // console.log("interview-meta.js P2 derivation:", { round_added, type_added, freq_upgraded, exp_added });

  /* ---------- P5: Mock Interview scoring helpers ---------- */
  IV.pickMockQuestions = function (opts) {
    // opts: { count, difficulty, round, level, company, expLevel }
    var pool = IV.questions.map(function (q, i) { return { q: q, index: i }; });
    if (opts.difficulty) pool = pool.filter(function (x) { return x.q.difficulty === opts.difficulty; });
    if (opts.round)      pool = pool.filter(function (x) { return x.q.round === opts.round; });
    if (opts.level)      pool = pool.filter(function (x) { return x.q.level === opts.level; });
    if (opts.type)       pool = pool.filter(function (x) { return x.q.questionType === opts.type; });
    if (opts.expLevel != null) pool = pool.filter(function (x) { return Math.abs((x.q.expLevel || 3) - opts.expLevel) <= 1; });
    if (opts.company)    pool = pool.filter(function (x) { return x.q.company && x.q.company.indexOf(opts.company) !== -1; });
    // Prefer higher-frequency questions if pool is big enough
    var freqW = { extreme:5, very:4, often:3, common:2, rare:1 };
    pool.sort(function (a, b) { return (freqW[b.q.frequency] || 2) - (freqW[a.q.frequency] || 2); });
    // Shuffle within the top 3x count, then take count
    var top = pool.slice(0, Math.max(opts.count * 3, opts.count + 5));
    for (var i2 = top.length - 1; i2 > 0; i2--) {
      var j2 = Math.floor(Math.random() * (i2 + 1));
      var tmp = top[i2]; top[i2] = top[j2]; top[j2] = tmp;
    }
    return top.slice(0, opts.count);
  };
})();

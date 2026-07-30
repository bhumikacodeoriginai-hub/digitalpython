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
    },
    {
      title: "Trees, Graphs & DP — Interview Patterns",
      badge: "Interview · 25 examples",
      introduction: [
        "**What is it?** The next tier of interview questions — used for Amazon/Google/Microsoft/Meta second and third rounds.",
        "**Why learn this?** These separate 'junior' from 'mid/senior' candidates. Master them and you unlock 80% of medium-hard problems.",
        "**Where used?** LeetCode Medium/Hard, system design coding rounds, on-site whiteboard interviews."
      ],
      analogy: [
        "**Trees are like a family tree** — one root ancestor, branches for children.",
        "**Graphs are like a road map** — cities (nodes) connected by roads (edges), possibly with loops.",
        "**Dynamic Programming is like remembering your homework** — solve a small piece once, write it down, reuse the answer instead of redoing it."
      ],
      examples: [
        { title: "Binary tree node", code: `class Node:\n    def __init__(self, v):\n        self.v, self.left, self.right = v, None, None\nroot = Node(1); root.left = Node(2); root.right = Node(3)\nprint(root.v, root.left.v, root.right.v)`, output: `1 2 3` },
        { title: "Inorder traversal (recursive)", code: `def inorder(n, out):\n    if not n: return\n    inorder(n.left, out); out.append(n.v); inorder(n.right, out)\nclass N:\n    def __init__(self,v,l=None,r=None): self.v,self.left,self.right=v,l,r\nroot = N(2, N(1), N(3))\nout = []; inorder(root, out); print(out)`, output: `[1, 2, 3]` },
        { title: "Level-order (BFS)", code: `from collections import deque\ndef bfs(root):\n    if not root: return []\n    q, out = deque([root]), []\n    while q:\n        n = q.popleft(); out.append(n.v)\n        if n.left: q.append(n.left)\n        if n.right: q.append(n.right)\n    return out\nclass N:\n    def __init__(self,v,l=None,r=None): self.v,self.left,self.right=v,l,r\nprint(bfs(N(1, N(2), N(3))))`, output: `[1, 2, 3]` },
        { title: "Max depth of tree", code: `def depth(n):\n    if not n: return 0\n    return 1 + max(depth(n.left), depth(n.right))\nclass N:\n    def __init__(self,v,l=None,r=None): self.v,self.left,self.right=v,l,r\nprint(depth(N(1, N(2, N(4)), N(3))))`, output: `3` },
        { title: "Check balanced tree", code: `def bal(n):\n    def h(n):\n        if not n: return 0\n        lh = h(n.left); rh = h(n.right)\n        if lh == -1 or rh == -1 or abs(lh-rh) > 1: return -1\n        return 1 + max(lh, rh)\n    return h(n) != -1\nclass N:\n    def __init__(self,v,l=None,r=None): self.v,self.left,self.right=v,l,r\nprint(bal(N(1, N(2), N(3))))`, output: `True` },
        { title: "BST insert", code: `class N:\n    def __init__(self,v): self.v,self.left,self.right=v,None,None\ndef insert(n, v):\n    if not n: return N(v)\n    if v < n.v: n.left = insert(n.left, v)\n    else: n.right = insert(n.right, v)\n    return n\nroot = None\nfor x in [5,3,7,1]:\n    root = insert(root, x)\nprint(root.v, root.left.v, root.right.v, root.left.left.v)`, output: `5 3 7 1` },
        { title: "BST search", code: `def search(n, t):\n    while n:\n        if n.v == t: return True\n        n = n.left if t < n.v else n.right\n    return False\nprint("O(log n) on balanced BST")`, output: `O(log n) on balanced BST` },
        { title: "Lowest common ancestor (BST)", code: `def lca(n, a, b):\n    while n:\n        if a < n.v and b < n.v: n = n.left\n        elif a > n.v and b > n.v: n = n.right\n        else: return n.v\nclass N:\n    def __init__(self,v,l=None,r=None): self.v,self.left,self.right=v,l,r\nroot = N(6, N(2, N(0), N(4)), N(8, N(7), N(9)))\nprint(lca(root, 0, 4))`, output: `2` },
        { title: "Validate BST", code: `def valid(n, lo=float("-inf"), hi=float("inf")):\n    if not n: return True\n    if not (lo < n.v < hi): return False\n    return valid(n.left, lo, n.v) and valid(n.right, n.v, hi)\nclass N:\n    def __init__(self,v,l=None,r=None): self.v,self.left,self.right=v,l,r\nprint(valid(N(2, N(1), N(3))))`, output: `True` },
        { title: "Graph BFS shortest path", code: `from collections import deque\ndef sp(g, s, t):\n    q = deque([(s, 0)]); seen = {s}\n    while q:\n        n, d = q.popleft()\n        if n == t: return d\n        for nb in g[n]:\n            if nb not in seen:\n                seen.add(nb); q.append((nb, d+1))\n    return -1\ng = {"A":["B","C"], "B":["D"], "C":["D"], "D":[]}\nprint(sp(g, "A", "D"))`, output: `2` },
        { title: "Detect cycle in directed graph", code: `def has_cycle(g):\n    WHITE, GRAY, BLACK = 0, 1, 2\n    color = {v: WHITE for v in g}\n    def dfs(u):\n        color[u] = GRAY\n        for v in g[u]:\n            if color[v] == GRAY: return True\n            if color[v] == WHITE and dfs(v): return True\n        color[u] = BLACK\n        return False\n    return any(dfs(u) for u in g if color[u] == WHITE)\nprint(has_cycle({"A":["B"], "B":["A"]}))`, output: `True`, explanation: "Classic 3-color DFS. GRAY means 'in current path' → seeing GRAY again = back edge = cycle." },
        { title: "Number of islands", code: `def islands(g):\n    if not g: return 0\n    R, C = len(g), len(g[0])\n    seen = set()\n    def dfs(r,c):\n        if r<0 or c<0 or r>=R or c>=C or (r,c) in seen or g[r][c]=="0":\n            return\n        seen.add((r,c))\n        for dr,dc in [(1,0),(-1,0),(0,1),(0,-1)]:\n            dfs(r+dr, c+dc)\n    cnt = 0\n    for r in range(R):\n        for c in range(C):\n            if g[r][c]=="1" and (r,c) not in seen:\n                cnt += 1; dfs(r,c)\n    return cnt\nprint(islands([["1","1","0"],["0","1","0"],["0","0","1"]]))`, output: `2` },
        { title: "Course schedule (topo sort)", code: `from collections import defaultdict, deque\ndef can_finish(n, prereq):\n    g = defaultdict(list); indeg = [0]*n\n    for a, b in prereq: g[b].append(a); indeg[a] += 1\n    q = deque([i for i in range(n) if indeg[i]==0])\n    taken = 0\n    while q:\n        c = q.popleft(); taken += 1\n        for nx in g[c]:\n            indeg[nx] -= 1\n            if indeg[nx] == 0: q.append(nx)\n    return taken == n\nprint(can_finish(2, [[1,0]]))`, output: `True` },
        { title: "DP — Fibonacci (memo)", code: `def fib(n, memo={}):\n    if n < 2: return n\n    if n in memo: return memo[n]\n    memo[n] = fib(n-1) + fib(n-2)\n    return memo[n]\nprint(fib(30))`, output: `832040`, explanation: "Memoization turns exponential brute-force into linear time. Store each subresult once." },
        { title: "DP — climb stairs", code: `def climb(n):\n    if n < 2: return 1\n    a, b = 1, 1\n    for _ in range(n-1):\n        a, b = b, a + b\n    return b\nprint(climb(5))`, output: `8` },
        { title: "DP — house robber", code: `def rob(a):\n    prev, cur = 0, 0\n    for x in a:\n        prev, cur = cur, max(cur, prev + x)\n    return cur\nprint(rob([2,7,9,3,1]))`, output: `12` },
        { title: "DP — coin change", code: `def coin(coins, amt):\n    dp = [0] + [amt+1] * amt\n    for a in range(1, amt+1):\n        for c in coins:\n            if a - c >= 0: dp[a] = min(dp[a], dp[a-c] + 1)\n    return dp[amt] if dp[amt] <= amt else -1\nprint(coin([1,2,5], 11))`, output: `3` },
        { title: "DP — longest increasing subseq", code: `def lis(a):\n    dp = [1] * len(a)\n    for i in range(len(a)):\n        for j in range(i):\n            if a[j] < a[i]:\n                dp[i] = max(dp[i], dp[j] + 1)\n    return max(dp) if dp else 0\nprint(lis([10,9,2,5,3,7,101,18]))`, output: `4` },
        { title: "DP — 0/1 knapsack", code: `def ks(w, v, cap):\n    n = len(w)\n    dp = [[0]*(cap+1) for _ in range(n+1)]\n    for i in range(1, n+1):\n        for c in range(cap+1):\n            dp[i][c] = dp[i-1][c]\n            if w[i-1] <= c:\n                dp[i][c] = max(dp[i][c], dp[i-1][c-w[i-1]] + v[i-1])\n    return dp[n][cap]\nprint(ks([1,3,4], [15,20,30], 4))`, output: `35` },
        { title: "Backtracking — subsets", code: `def subsets(a):\n    res = [[]]\n    for x in a:\n        res += [r + [x] for r in res]\n    return res\nprint(subsets([1,2,3]))`, output: `[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]` },
        { title: "Backtracking — N-Queens count", code: `def nq(n):\n    cols=set(); d1=set(); d2=set(); cnt=[0]\n    def bt(r):\n        if r == n: cnt[0]+=1; return\n        for c in range(n):\n            if c in cols or (r-c) in d1 or (r+c) in d2: continue\n            cols.add(c); d1.add(r-c); d2.add(r+c)\n            bt(r+1)\n            cols.remove(c); d1.remove(r-c); d2.remove(r+c)\n    bt(0); return cnt[0]\nprint(nq(4))`, output: `2` },
        { title: "Trie autocomplete", code: `class Trie:\n    def __init__(self): self.r = {}\n    def add(self, w):\n        n = self.r\n        for c in w: n = n.setdefault(c, {})\n        n["$"] = w\n    def suggest(self, pre):\n        n = self.r\n        for c in pre:\n            if c not in n: return []\n            n = n[c]\n        out = []\n        def walk(node):\n            for k,v in node.items():\n                if k == "$": out.append(v)\n                else: walk(v)\n        walk(n); return out\nt = Trie()\nfor w in ["cat","car","dog","cart"]: t.add(w)\nprint(sorted(t.suggest("ca")))`, output: `['car', 'cart', 'cat']`, explanation: "Tries power search suggestions, spell-check, and IP-routing tables in real products." },
        { title: "Union-Find groups", code: `class DSU:\n    def __init__(self,n): self.p=list(range(n))\n    def f(self,x):\n        while self.p[x]!=x:\n            self.p[x]=self.p[self.p[x]]; x=self.p[x]\n        return x\n    def u(self,a,b): self.p[self.f(a)]=self.f(b)\nd = DSU(5)\nfor a,b in [(0,1),(1,2),(3,4)]: d.u(a,b)\nprint(d.f(0)==d.f(2), d.f(0)==d.f(4))`, output: `True False` },
        { title: "System design snippet: LRU", code: `from collections import OrderedDict\nclass LRU:\n    def __init__(self, cap): self.c=cap; self.d=OrderedDict()\n    def get(self, k):\n        if k not in self.d: return -1\n        self.d.move_to_end(k); return self.d[k]\n    def put(self, k, v):\n        if k in self.d: self.d.move_to_end(k)\n        self.d[k] = v\n        if len(self.d) > self.c: self.d.popitem(last=False)\nc = LRU(2); c.put(1,1); c.put(2,2); c.get(1); c.put(3,3)\nprint(c.get(2))`, output: `-1` },
        { title: "How to attack a hard problem", code: `# 1. Restate the problem in your own words.\n# 2. Try tiny inputs by hand -> find a pattern.\n# 3. Brute force first, then optimise.\n# 4. Match to a pattern (two-pointer, DP, BFS, ...).\n# 5. Write pseudocode, then code.\n# 6. Test edge cases: empty, single, huge, duplicates.\nprint("technique > memorisation")`, output: `technique > memorisation` }
      ],
      mistakes: [
        { wrong: `def fib(n): return fib(n-1) + fib(n-2) if n>1 else n`, right: `from functools import lru_cache\n@lru_cache\ndef fib(n): return fib(n-1)+fib(n-2) if n>1 else n`, error: `RecursionError / very slow (2^n calls)`, explanation: "Without memoization Fibonacci recomputes the same subproblems exponentially. Cache them." },
        { wrong: `def dfs(n):\n    dfs(n.left); dfs(n.right)`, right: `def dfs(n):\n    if n is None: return\n    dfs(n.left); dfs(n.right)`, error: `AttributeError: 'NoneType' object has no attribute 'left'`, explanation: "Always base-case on `None` before touching children." }
      ],
      interview: [
        { q: "When would you use BFS vs DFS?", a: "BFS gives shortest path in an unweighted graph; use it when levels/hops matter. DFS is simpler recursively and used for connectivity, cycles, topological sort." },
        { q: "What's dynamic programming in one sentence?", a: "Break the problem into overlapping subproblems, solve each once, store the answer, and combine to get the final result." },
        { q: "What's the difference between memoization and tabulation?", a: "Memoization is top-down recursion with a cache. Tabulation is bottom-up: fill a table from smallest subproblems up. Same complexity, tabulation saves recursion stack." },
        { q: "How would you scale an autocomplete service to millions of users?", a: "Trie in memory per shard, cache popular prefixes in Redis, precompute top-K suggestions per prefix nightly, replicate read-only to multiple regions." }
      ],
      practice: [
        { problem: "Serialize and deserialize a binary tree.", difficulty: "Hard", hint: "Level-order with 'null' markers" },
        { problem: "Find the shortest path in a grid with obstacles.", difficulty: "Medium", hint: "BFS from source" },
        { problem: "Edit distance between two strings.", difficulty: "Hard", hint: "2D DP" },
        { problem: "Word ladder — transform beginWord to endWord.", difficulty: "Hard", hint: "BFS over word graph" },
        { problem: "Design an LRU cache in O(1).", difficulty: "Company", hint: "HashMap + doubly linked list" }
      ],
      revision: [
        "**Master these and you clear 80% of medium-hard rounds:**",
        "1. Traversals: inorder, preorder, postorder, level-order",
        "2. BFS = shortest hops; DFS = go deep / cycles / topo",
        "3. DP = overlapping subproblems + optimal substructure",
        "4. Recognise the pattern, then adapt the template",
        "5. Always test empty, single, and huge inputs",
        "",
        "> **Interview truth:** Companies test pattern recognition, not memorised code. Practice 50 problems, not 500 randomly."
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
    },
    {
      title: "Resume, LinkedIn & HR Rounds",
      badge: "Career · 22 examples",
      introduction: [
        "**What is it?** How to package your skills so recruiters call you back and how to nail non-coding rounds.",
        "**Why do we need it?** A great engineer with a weak resume gets ignored. Getting the interview is half the battle.",
        "**Where is it used?** Every application, every phone screen, every HR round, every offer negotiation."
      ],
      analogy: [
        "**Your resume is like a movie trailer:**",
        "- It has 30 seconds to convince the recruiter you're worth an hour.",
        "- Show the exciting parts (impact, numbers), not the whole plot (every task).",
        "- One version doesn't fit every audience — cut it for the role."
      ],
      examples: [
        { title: "STAR answer template", code: `# For behavioural questions, use STAR:\n# S — Situation ("At my last project, our API was slow...")\n# T — Task     ("I owned the performance fix.")\n# A — Action   ("I profiled it, found N+1 queries, added eager loading + Redis.")\n# R — Result   ("Response time dropped from 800ms to 90ms, saved ~30% servers.")\nprint("structure = confidence")`, output: `structure = confidence` },
        { title: "Tell me about yourself (60s)", code: `# Present -> Past -> Future\n# "I'm a Python developer with 2 years building FastAPI backends.\n#  Before that I finished my B.Tech and built 4 portfolio projects.\n#  I'm now looking to join a product team where I can grow into backend + AI."\nprint("60 seconds, one clean arc")`, output: `60 seconds, one clean arc` },
        { title: "Resume bullet — impact", code: `# BAD:  "Worked on backend APIs."\n# GOOD: "Built 12 FastAPI endpoints handling 50k req/day with 99.9% uptime,\n#        cutting order processing from 4s to 400ms."\nprint("numbers > adjectives")`, output: `numbers > adjectives`, explanation: "Every bullet should answer 'what did YOU do' + 'what changed because of it'." },
        { title: "Resume skills section", code: `# Languages: Python, SQL, JavaScript\n# Frameworks: FastAPI, Django, React, PyTorch\n# Data: PostgreSQL, MongoDB, Redis\n# Cloud: AWS (Lambda, S3, EC2), Docker, GitHub Actions\n# Testing: pytest, coverage\nprint("group logically, keep tight")`, output: `group logically, keep tight` },
        { title: "Project entry template", code: `# ProjectName  |  Python, FastAPI, PostgreSQL, Docker  |  github.com/you/proj\n# - Built X that does Y for Z users\n# - Reduced/Improved/Automated ... by NN%\n# - Wrote NN tests, achieved 90% coverage, deployed to AWS\nprint("3 bullets, all outcome-focused")`, output: `3 bullets, all outcome-focused` },
        { title: "LinkedIn headline", code: `# BAD:  "Fresher | Looking for opportunities"\n# GOOD: "Python Developer | FastAPI + AWS | Building AI-powered tools"\nprint("say what you DO, not what you WANT")`, output: `say what you DO, not what you WANT` },
        { title: "LinkedIn about section", code: `# 3 short paragraphs:\n# 1. Who you are + main skill.\n# 2. Recent project or achievement with numbers.\n# 3. What you're excited about next + how to reach you.\nprint("Google-able + skimmable")`, output: `Google-able + skimmable` },
        { title: "GitHub profile README", code: `# ## Hi, I'm Ravi 👋\n# - 🔭 Building an AI RAG search engine\n# - 🌱 Learning distributed systems\n# - 💬 Ask me about Python, FastAPI, AWS\n# - 📫 ravi@example.com\nprint("pin your 6 best repos")`, output: `pin your 6 best repos` },
        { title: "Cover email (short)", code: `# Subject: Python Developer application — Ravi Kumar\n#\n# Hi [Name],\n# I'm applying for the Python Developer role at [Company].\n# I recently built [project] using [stack] which shipped [result].\n# Resume + code: [links]. Available for a chat any time this week.\n# Thanks, Ravi\nprint("5 lines, links, done")`, output: `5 lines, links, done` },
        { title: "Answer: 'Why should we hire you?'", code: `# Pick 2 concrete things from the JD, tie each to a story.\n# "You need someone strong in FastAPI + AWS. I built X (link) which uses both\n#  and I've on-called for production issues, so I'm comfortable owning services."\nprint("evidence beats claims")`, output: `evidence beats claims` },
        { title: "Answer: 'Biggest weakness?'", code: `# Real + fixable, not a humble-brag.\n# "Early on I over-engineered for scale we didn't need. I now default to the\n#  simplest thing that works and refactor when data forces me to."\nprint("show self-awareness + growth")`, output: `show self-awareness + growth` },
        { title: "Answer: 'Why leave your current job?'", code: `# Positive, forward-looking. Never trash your current company.\n# "I've learned a lot, but I want to work on <thing this new role offers>.\n#  I'm looking for a place where I can go deep on <specific area>."\nprint("pull toward, not push away")`, output: `pull toward, not push away` },
        { title: "Answer: 'Where in 5 years?'", code: `# "I want to grow into a senior engineer who can own a service end-to-end,\n#  mentor juniors, and drive design decisions. This role's mix of backend +\n#  AI is exactly the environment I want to grow in."\nprint("ambition + fit")`, output: `ambition + fit` },
        { title: "Answer: 'Notice period + salary?'", code: `# Notice: "I have a 2-month notice; happy to discuss buy-out options."\n# Salary: "Based on the role and my 3 YoE I'm looking at NN-NN LPA;\n#          open to discussing the full package."\nprint("give a range, stay flexible")`, output: `give a range, stay flexible` },
        { title: "Salary negotiation", code: `# 1. Research the band on levels.fyi / Glassdoor.\n# 2. Get the offer in writing first.\n# 3. Anchor high but reasonable ("I was expecting X").\n# 4. Ask about equity, bonus, joining bonus, WFH, learning budget.\n# 5. Silence is your friend after quoting a number.\nprint("negotiate the WHOLE package")`, output: `negotiate the WHOLE package`, explanation: "Recruiters expect a negotiation. Not asking = leaving 10-30% on the table on average." },
        { title: "Questions to ask THEM", code: `# 1. What does a great first 90 days look like?\n# 2. How do you decide what to build next?\n# 3. How is code reviewed / deployed?\n# 4. What's the biggest challenge the team is facing?\n# 5. How do you measure success for this role?\nprint("shows engagement + interviews them")`, output: `shows engagement + interviews them` },
        { title: "Coding round strategy", code: `# 1. Repeat the problem back in your own words.\n# 2. Ask 2-3 clarifying questions (empty input? duplicates? size?).\n# 3. Brute force out loud, then optimise.\n# 4. Talk while coding. Silence scares interviewers.\n# 5. Test with the sample + one edge case.\nprint("communicate = 50% of the score")`, output: `communicate = 50% of the score` },
        { title: "System design opener", code: `# Step 1: Clarify scope (functional + non-functional).\n# Step 2: Estimate scale (RPS, storage, latency SLO).\n# Step 3: High-level boxes (client, LB, service, DB, cache).\n# Step 4: Deep-dive one component the interviewer picks.\n# Step 5: Trade-offs — what did you choose and why.\nprint("follow the framework, don't dive in")`, output: `follow the framework, don't dive in` },
        { title: "Behaviour: conflict story", code: `# STAR:\n# S: teammate insisted on custom framework for a small tool\n# T: I owned the delivery, deadline was tight\n# A: proposed a spike with existing tool, measured, shared results in meeting\n# R: team aligned on the simpler tool, shipped 2 weeks early\nprint("show data-driven persuasion")`, output: `show data-driven persuasion` },
        { title: "Post-interview thank-you", code: `# Send within 24h. 4 lines.\n# "Thanks for the time today. I especially enjoyed our chat on <topic>.\n#  Excited about <specific team thing>. Happy to answer follow-ups. — Ravi"\nprint("keeps you top-of-mind")`, output: `keeps you top-of-mind` },
        { title: "When you get rejected", code: `# 1. Ask for feedback (politely, once).\n# 2. Note what to improve.\n# 3. Apply again after 6-12 months if you fixed the gap.\n# Rejection = data, not a verdict on you.\nprint("failure is a rehearsal")`, output: `failure is a rehearsal` },
        { title: "Job-search 30-day plan", code: `# Week 1: polish resume, LinkedIn, GitHub. Pick 20 target companies.\n# Week 2: apply + reach out to 3 people per day. DSA 1 problem/day.\n# Week 3: mock interviews (peer + Pramp). System design study.\n# Week 4: on-site prep, negotiation prep, follow-ups.\nprint("consistent daily action wins")`, output: `consistent daily action wins`, explanation: "Job hunting is a project. Plan it like one and track daily inputs, not outcomes." }
      ],
      interview: [
        { q: "How long should my resume be?", a: "One page for 0-5 years experience. Two pages max for 5-10. Recruiters spend 20-30 seconds — every word must earn its place." },
        { q: "Should I list every technology I've touched?", a: "No. List only technologies you can defend in an interview. If you list Kubernetes, expect Kubernetes questions." },
        { q: "What if I have no work experience?", a: "Projects ARE experience. Freelance work, open source, hackathons, and detailed personal projects all count. Frame them the same way." },
        { q: "How do I explain a gap in my resume?", a: "Be honest and brief. 'I took 6 months to prepare for interviews and build projects X and Y.' Move on quickly to your strengths." }
      ],
      practice: [
        { problem: "Rewrite one resume bullet using the impact formula (verb + what + measurable result).", difficulty: "Easy", hint: "Add a percentage or number" },
        { problem: "Write your 60-second 'tell me about yourself' answer.", difficulty: "Easy", hint: "Present -> past -> future" },
        { problem: "Prepare STAR stories for 5 common behavioural questions.", difficulty: "Medium", hint: "Conflict, failure, leadership, ambiguity, deadline" },
        { problem: "Do 3 mock interviews on Pramp / interviewing.io.", difficulty: "Medium", hint: "Recording yourself is even better" },
        { problem: "Draft a 30-day job-search plan and hit 3 applications a day for 2 weeks.", difficulty: "Hard", hint: "Track applications in a spreadsheet" }
      ],
      revision: [
        "**Career pack — final checklist:**",
        "1. One-page resume, every bullet has a number",
        "2. LinkedIn headline says what you DO, not what you WANT",
        "3. GitHub has 3-5 pinned projects with READMEs",
        "4. STAR stories ready for the 5 most-asked behavioural questions",
        "5. Salary research done — you know your target band",
        "6. Post-interview thank-you note template saved",
        "",
        "> **Truth:** Interview prep isn't just LeetCode. Communication and self-presentation win offers just as often as coding."
      ]
    }
  ]
});

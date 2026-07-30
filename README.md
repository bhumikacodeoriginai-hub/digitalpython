# 🐍 Digital Python Notes

**Developed by Code Origin.AI Private Limited**

A complete, example-driven Python learning application that covers the entire journey **from Basics to Industry Professional** — 42 modules, 94+ concepts and 400+ runnable code examples with expected output, all in a beautiful, fast, self-contained web app.

---

## ✨ Features

- **42 syllabus modules** — from *What is Python?* to full-stack, cloud and AI/ML projects.
- **400+ code examples**, each with the **expected output** shown.
- **Live syntax highlighting** — a lightweight, self-written Python highlighter (no external libraries).
- **Instant search** — jump to any concept or example (press `/` to focus).
- **Copy-to-clipboard** on every code block.
- **Dark / light theme** toggle (your choice is remembered).
- **Fully responsive** — works on desktop, tablet and mobile.
- **Zero dependencies, zero build step** — just static HTML/CSS/JS.

## 🚀 Running the app

Because everything is static, you can simply **open `index.html` in any modern browser**.

For the best experience (and to avoid any browser file-access restrictions), serve the folder locally:

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

## 🗂️ Project structure

```
digitalpython/
├── index.html                 # App shell (loads everything)
├── css/
│   └── styles.css             # Theme + component styles
├── js/
│   ├── app.js                 # SPA engine: routing, rendering, search
│   └── highlight.js           # Self-contained Python syntax highlighter
└── data/
    └── modules/
        ├── module-01.js       # Introduction to Python
        ├── module-02.js       # Python Data Types
        ├── ...                # Modules 03–09 (one file each)
        └── module-10-42.js    # Advanced Python → Industry Projects
```

## 🧩 The 42 Modules

| # | Module | # | Module |
|---|--------|---|--------|
| 1 | Introduction to Python | 22 | Multiprocessing |
| 2 | Python Data Types | 23 | Async Programming |
| 3 | Operators | 24 | Logging |
| 4 | Input and Output | 25 | Debugging |
| 5 | Type Conversion | 26 | Database Programming |
| 6 | Decision Making | 27 | Networking |
| 7 | Loops | 28 | APIs |
| 8 | Pattern Programs | 29 | Testing |
| 9 | Functions | 30 | Data Structures |
| 10 | Modules and Packages | 31 | Algorithms |
| 11 | Exception Handling | 32 | Design Patterns |
| 12 | File Handling | 33 | Python Project Structure |
| 13 | Object-Oriented Programming | 34 | Git & GitHub |
| 14 | Regular Expressions | 35 | Web Development |
| 15 | Collections Module | 36 | Data Analysis |
| 16 | Iterators and Generators | 37 | Automation |
| 17 | Decorators | 38 | Cloud Python |
| 18 | Context Managers | 39 | DevOps with Python |
| 19 | Virtual Environment | 40 | AI & Machine Learning |
| 20 | Advanced Python | 41 | Industry Best Practices |
| 21 | Multithreading | 42 | Real-World Industry Projects |

## ➕ Adding or extending content

All content lives in `data/modules/*.js`. Each file registers a module:

```js
window.DP.registerModule({
  id: 1,
  title: "Introduction to Python",
  icon: "🐍",
  summary: "Short description shown on the home card and module header.",
  concepts: [
    {
      title: "Python Variables",
      badge: "Core",
      notes: "Markdown-ish notes: **bold**, `code`, - bullets, > callouts.",
      examples: [
        { title: "Basic assignment", code: `name = "Arjun"\nprint(name)`, output: `Arjun` }
      ]
    }
  ]
});
```

To add more examples, simply append objects to a concept's `examples` array. To add a whole new module file, create `data/modules/module-XX.js` and add a matching `<script>` tag in `index.html`.

---

© Code Origin.AI Private Limited — *Digital Python Notes*. Built as a complete learning companion for aspiring and professional Python developers.

# Calculator-AI

## 🚀 Project Goal

The goal of this project is to test and explore how different AI tools can work together to create a full application without human coding. 

I chose a calculator app as the first project because I know its rules and logic very well. This makes it easier to focus on using the AI tools, instead of thinking too much about the app itself.

In this project, I wanted to understand how to:
- plan the app idea with AI,
- design the UI with AI tools,
- write and refactor code with AI help,
- and test how well these tools can build an app with little or no human writing.

It is also a way for me to practice using these tools and learn how to include them in my future software development process.


## 🤖 Used AI Tools

In this project, I used different AI tools at each step of the development process. Each tool helped me with a specific task:

- **ChatGPT**  
  I used ChatGPT to plan the project. It helped me write the first version of the project idea, break it into smaller parts, and prepare a to-do list. It was like having a smart teammate who understands what I want to build.

- **Stitch UI**  
  After the plan was ready, I used Stitch to turn the idea into a visual design. With Stitch, I created simple UI components and layouts. It gave me a quick and clean Figma export to use as a base.

- **Lovable**  
  I took the Figma export from Stitch and gave it to Lovable. Lovable turned the design into real frontend code. This saved me a lot of time and made it easy to move from design to code.

- **Cursor**  
  I used Cursor to write and improve the full application code. It helped me add features, fix bugs, and refactor the code. Cursor works inside a code editor and gives smart suggestions. It felt like a real coding partner during development.

By using these tools together, I could go from idea to working app with almost no manual coding. Each tool had a role, and combining them made the process much faster and easier.

## ⌛ Development Timeline & Commentary

| Stage | Tool(s) Used | Approx. Time | Personal Notes |
|-------|--------------|--------------|----------------|
| Planning | ChatGPT | ~1 hour | Quickly distilled ideas into a clear roadmap and task list. |
| UI Design | Stitch UI | ~15 minutes | A single prompt produced a polished Figma mock-up; only minor spacing tweaks were necessary. |
| Code Generation | Lovable | ~10 minutes | Converted the Figma file into clean React/TypeScript code ready to run. |
| Coding & Refinement | Cursor | Continuous | Served as an AI pair-programmer; bug fixes and feature iterations took seconds to minutes. |

## 🗒️ Tool Reflections

### Stitch UI
I used a prompt generated with ChatGPT as the starting point, but I couldn't get the exact layout I wanted right away. The most efficient strategy was **incremental prompting**—iteratively refining the prompt until the design got closer to my target. Stitch UI generally produces a *rough* draft. That was good enough for this calculator, but if your product requires a complex or highly polished interface, extracting a perfect design can be challenging. Still, it's an excellent AI tool for quickly forming a visual concept.

### Lovable
I exported the Figma design from Stitch UI and imported it into Lovable together with the same ChatGPT prompt. The first attempts missed the mark (wrong colour palette, etc.), but after a few iterations Lovable generated a layout I was happy with. In my experience, Lovable is very handy for producing a **frontend skeleton** that you can refine later.

### Cursor (O3 / Claude-4 models)
For pure frontend generation I didn't get as much value from Cursor at first. Instead, I took the code exported by Lovable and used Cursor to implement **all the features and business logic**. I let it replicate the existing design rather than redesigning. Overall, Cursor is powerful, but it sometimes fails at surprisingly simple tasks and can't fix them even with nudging. At that point you need to step in manually.

A few lessons learned:

* Keep prompts focused on a **single task**; long multi-step prompts often confuse the model.
* **Incremental prompting** (small, iterative requests) worked best for me.
* As the codebase grows, Cursor can struggle with context and produce inconsistent results—so break work into small chunks.

For larger projects these tools act as accelerators, handling much of the "grunt work" while you supervise and course-correct when necessary.

## ⚙️ AI-Based Development Workflow

In this project, I followed a full development workflow using AI tools. Each step had a different focus, and I used the right AI tool for each part. Below, you can see each step and what kind of output it created.

---

### 1. 🧠 Planning with ChatGPT

- I started with ChatGPT to plan the project idea.
- I asked questions like "What features should a calculator app have?"
- ChatGPT helped me write a list of steps and explained the project structure.
- I also discussed design ideas and which tools to use.

**Goal:** Create a clear and simple roadmap for the project.

**Extracted Output:**
- A feature list (Basic calculator operations, Clear button, UI layout idea)
- A project task list (Plan → Design → Generate Code → Finalize Logic)
- A tool stack suggestion (Stitch, Lovable, Cursor, etc.)

---

### 2. 🎨 UI Design with Stitch AI

- After the planning, I used Stitch to design the user interface.
- I wrote a prompt to describe how the calculator should look.
- Stitch created clean and modern UI components.
- I exported the UI design as a Figma file.

**Goal:** Turn the idea into a real visual layout.

**Extracted Output:**
- A Figma design file for the calculator
- A UI structure with buttons, screen display, and layout positions
- Responsive design with Bootstrap-like styling

![image](https://github.com/user-attachments/assets/628990b1-a208-482d-b711-7d096478e15a)

![image](https://github.com/user-attachments/assets/f09544b4-847e-445b-a191-76b68438f88b)

---

### 3. 🧩 Code Generation with Lovable

- I gave the Figma file to Lovable to generate frontend code.
- It produced clean HTML/CSS/React code based on the design.
- This saved me time and helped me start with a working layout.

**Goal:** Convert UI design into real code with zero manual effort.

**Extracted Output:**
- A full React component for the calculator UI
- CSS styles for layout and buttons
- Clean folder structure for the frontend project

![image](https://github.com/user-attachments/assets/ba30e9de-ac2b-4f9c-9b86-4cfc56888b32)

---

### 4. 🛠️ Code Completion & Improvements with Cursor

- I used Cursor to write the logic of the calculator.
- Cursor helped me add features like button actions, calculations, and input display.
- It also helped me fix bugs and clean the code.
- I asked for code improvements and Cursor explained the changes clearly.

**Goal:** Finish the full application with AI support inside the code editor.

**Extracted Output:**
- Functional JavaScript/TypeScript code for calculator logic
- Refactored React components with better structure
- Comments and small fixes automatically applied by Cursor
  
![image (3)](https://github.com/user-attachments/assets/8eb7cb1d-3769-481f-903e-4e6e03cb0ce7)
![image (4)](https://github.com/user-attachments/assets/f35884ff-5cd5-4bbb-8976-3ec778a3597b)
![image](https://github.com/user-attachments/assets/395d2172-4cfb-44a1-a3cc-10f3cfe5d414)
![image (1)](https://github.com/user-attachments/assets/e9f72094-74b1-4c98-8653-eeb43cab4372)
![image (2)](https://github.com/user-attachments/assets/f26a6689-54fb-4fec-96b9-cca7810e09bd)

## 🏗️ Tech Stack

This project was boot-strapped with **Vite** and is written entirely in **TypeScript**.  A concise list of the core technologies is shown below.

| Purpose | Package |
|---------|---------|
| UI Library | React 18 |
| Build Tooling | Vite |
| Styling | Tailwind CSS + PostCSS |
| Routing | React-Router-DOM |
| Data-Fetching / Caching | @tanstack/react-query |
| Linting | ESLint (Flat Config) |
| Formatting | Prettier |
| Component Primitives | shadcn/ui |

Feel free to open `package.json` for the full list of dependencies.

## 🛠️ Installation & Running the App

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/calculator-ai.git
   cd calculator-ai
   ```

2. **Install dependencies** (requires **Node >= 18**)
   ```bash
   npm install
   # or: pnpm install / bun install / yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:5173 (or the port shown in your terminal).

4. **Production build**
   ```bash
   npm run build   # generates optimized static assets in dist/
   npm run preview # serves the production build locally
   ```

## 📂 Folder Structure

```
calculator-ai/
├─ public/               # Static assets & the root HTML file
├─ src/
│  ├─ components/        # Reusable UI components
│  │  ├─ ui/             # shadcn-ui primitives (Button, Dialog, …)
│  │  └─ Calculator.tsx  # Root calculator wrapper generated from Figma
│  ├─ pages/             # Route-level components (Index, Settings, 404)
│  ├─ hooks/             # Custom React hooks (use-mobile, use-toast)
│  ├─ lib/               # Generic utilities & helpers
│  ├─ index.css          # Tailwind directives (base, components, utilities)
│  └─ main.tsx           # React entry point / app bootstrap
├─ tailwind.config.ts    # Tailwind configuration & theme tokens
├─ vite.config.ts        # Vite configuration
└─ README.md             # You are here ✔
```

### How It All Fits Together

1. **UI Generation (Lovable)** – The initial calculator layout lives mainly inside `src/components/Calculator.tsx` plus the panel components (`BasicPanel.jsx`, `ScientificPanel.jsx`, etc.).
2. **State Management** – Button actions and calculation logic are colocated inside the panel components to keep them easy to reason about. Any shared helpers live in `src/lib/utils.ts`.
3. **Styling** – Tailwind CSS classes are used directly within JSX. The design tokens exported by Lovable were converted into Tailwind utilities for consistency.
4. **Routing & Pages** – Minimal routing is handled by React-Router; the `Index` page renders the `Calculator` component, while `NotFound` is a simple fallback route.

## 🤝 Contributing

Contributions, issues and feature requests are very welcome!

1. Fork the repo & create your branch: `git checkout -b my-feature`  
2. Commit your changes: `git commit -m "feat: add amazing feature"`  
3. Push to the branch: `git push origin my-feature`  
4. Open a pull request and explain the reasoning behind your change.

Please make sure your code adheres to the existing style by running `npm run lint` and `npm run format` before submitting.

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.




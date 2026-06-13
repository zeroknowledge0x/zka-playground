# ⚡ ZKA Playground

> The **Creative Layer** of the ZKA Labs ecosystem — an AI-powered web app builder — describe what you want, get a live app in seconds.

**Live →** [zeroknowledge0x.github.io/zka-playground](https://zeroknowledge0x.github.io/zka-playground/)

No sign-up. No API keys. No install. Just type and build.

---

## What It Is

ZKA Playground is a browser-based tool that turns natural language prompts into working web applications. Describe an idea in plain English (or Indonesian), and the AI generates a complete vanilla HTML/CSS/JS app, deploys it to an isolated sandbox, and serves you a live preview — all in one click.

It works as a two-pane interface: **chat on the left, live preview on the right.** You can iterate by describing changes in follow-up messages, and the app updates in place.

## Features

### 💬 Chat Mode
Ask questions, brainstorm ideas, or have a conversation. The AI responds inline without triggering a build. Smart intent detection distinguishes between "build me a dashboard" and "what is a dashboard?"

### 🔨 Build Mode
When the AI detects a build request, it generates a complete web app — multiple files, styles, scripts — and deploys it to an isolated sandbox with a live URL.

### 📁 Multi-File Generation
Apps aren't single HTML blobs. The AI can generate separate HTML, CSS, and JS files. Switch to the **Code** tab to browse each file with line numbers, or download everything as a `.zip`.

### 🤖 Model Selection
Three AI models available — pick the right trade-off for your task:
- **⚡ Fast** — quick iterations, lighter tasks
- **🔥 Pro** — complex apps, better reasoning
- **💡 Lite** — simple pages, lowest latency

### 👁️ Live Preview
The generated app renders in a sandboxed iframe. Toggle between **Desktop**, **Tablet (768px)**, and **Mobile (375px)** viewports to check responsiveness.

### 🔒 Sandbox Isolation
Every generated app runs in its own isolated sandbox on a separate origin. The iframe uses sandbox attributes — generated code can't access the parent page, localStorage, or cookies.

### ⬇️ Download
Hit the download button to grab all generated files as a zip archive. No lock-in — take your code and go.

### 📱 Mobile-Ready UI
The interface adapts to small screens with tab-based navigation (Chat / Preview / Code) and touch-friendly controls.

## How It Works

```
User types prompt
       ↓
Intent detection (chat vs. build)
       ↓
   ┌───┴───┐
   Chat    Build
   ↓        ↓
  AI      AI generates vanilla HTML/CSS/JS
  reply        ↓
           Sandbox API deploys files
                ↓
           Live preview in iframe
```

1. **You type a prompt** — e.g. "a pomodoro timer with work/break sessions"
2. **Intent detection** determines if it's a chat question or a build request
3. **For builds**: the AI generates multiple source files (HTML, CSS, JS)
4. **The API** creates an isolated sandbox and serves the files at a unique URL
5. **The iframe** loads the live app — you see it immediately
6. **For edits**: send a follow-up like "add dark mode" — the AI updates the existing code incrementally without starting from scratch

All state (chat history, generated files, sandbox ID) persists in `localStorage` so you can refresh without losing your work.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Single-file HTML app (~680 lines, zero build step) |
| Styling | Inline CSS with CSS custom properties (dark theme) |
| AI Backend | OpenAI-compatible API (`/v1/chat/completions`, `/v1/sandbox/generate`) |
| Sandboxing | Isolated server-side sandbox per app |
| Hosting | GitHub Pages (static, `docs/` folder) |
| Downloads | JSZip (CDN) for zip packaging |
| Persistence | `localStorage` (chat history, files, sandbox state) |

No frameworks. No bundler. No node_modules. The entire app is a single `index.html`.

## Rate Limits

The app uses a server-side API with token-based authentication. Rate limits are enforced at the API layer:

- Requests are subject to the API provider's rate limits
- Each model tier may have different throughput caps
- Repeated rapid requests may be throttled — the UI disables the send button while a request is in-flight
- Sandbox lifetime and count limits are enforced server-side

If you hit a limit, the error will surface in the chat. Wait a moment and try again.

## Project Structure

```
zka-playground/
├── docs/
│   ├── index.html              # The entire app (HTML + CSS + JS)
│   └── coi-serviceworker.js    # Cross-origin isolation for SharedArrayBuffer
└── README.md
```

## Quick Start

Since this is a static site served via GitHub Pages:

```bash
# Clone
git clone https://github.com/zeroknowledge0x/zka-playground.git
cd zka-playground

# Open directly
open docs/index.html

# Or serve locally
npx serve docs
```

No build step. No dependencies. Open `docs/index.html` in a browser and start building.

## License

Private repository. All rights reserved.

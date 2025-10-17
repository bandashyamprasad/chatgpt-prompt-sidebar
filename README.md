# ChatGPT Prompt Sidebar

A lightweight Tampermonkey userscript that adds a floating, hover-to-expand sidebar for ChatGPT.  
You can click any predefined prompt to insert it instantly into the chat box.

## 🧩 Features
- Hover to expand sidebar
- One-click prompt insertion (cursor at end)
- Fully customizable prompts list
- Works on both [chat.openai.com](https://chat.openai.com) and [chatgpt.com](https://chatgpt.com)

## 🚀 Installation
1. Install the [Tampermonkey](https://tampermonkey.net/) extension.
2. Click **Raw** on the `chatgpt-prompt-sidebar.user.js` file in this repo.
3. Tampermonkey will automatically offer to install it.

## ⚙️ Customization
To add or modify prompts, edit the `prompts` array inside the script.

```js
const prompts = [
  "Summarize this professionally",
  "Explain like I’m five",
  "List key insights as bullet points"
];
Made with ❤️ and curiosity by Shyam Prasad Banda
---

Once you’ve created it, send me your repo link   
I’ll help you polish it to look like a **real open-source project** (badges, versioning, etc.).

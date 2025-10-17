// ==UserScript==
// @name         ChatGPT Prompt Sidebar (Hover Expand + Cursor Fix)
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Floating sidebar that expands on hover with reusable prompt templates for ChatGPT. Cursor moves to end after prompt insertion.
// @match        https://chat.openai.com/*
// @match        https://chatgpt.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    console.log("✅ ChatGPT Prompt Sidebar (Hover Expand + Cursor Fix) loaded");

    const prompts = [
        "Summarize this professionally",
        "Explain like I'm five",
        "List key insights as bullet points",
        "Generate test cases for this scenario",
        "Turn this into a LinkedIn post"
    ];

    function getInputBox() {
        // New ChatGPT uses a contenteditable div instead of a textarea
        let box = document.querySelector("div[contenteditable='true']");
        if (box) return box;
        return document.querySelector("textarea");
    }

    function insertPrompt(prompt) {
        const inputBox = getInputBox();
        if (!inputBox) {
            alert("⚠️ Could not find ChatGPT input box!");
            return;
        }

        // Handle new ChatGPT contenteditable divs
        if (inputBox.getAttribute("contenteditable")) {
            inputBox.innerHTML = prompt + " ";

            // Move caret (cursor) to end
            const range = document.createRange();
            const sel = window.getSelection();
            range.selectNodeContents(inputBox);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);

            // Trigger ChatGPT input event
            const inputEvent = new InputEvent("input", { bubbles: true });
            inputBox.dispatchEvent(inputEvent);
        } else {
            // Handle old textarea UI
            inputBox.value = prompt + " ";
            inputBox.selectionStart = inputBox.value.length;
            inputBox.selectionEnd = inputBox.value.length;
            inputBox.focus();
            inputBox.dispatchEvent(new Event("input", { bubbles: true }));
        }

        inputBox.focus();
    }

    function createSidebar() {
        if (document.getElementById("promptSidebar")) return;

        const sidebar = document.createElement("div");
        sidebar.id = "promptSidebar";
        sidebar.style.position = "fixed";
        sidebar.style.top = "100px";
        sidebar.style.right = "0";
        sidebar.style.width = "40px";
        sidebar.style.background = "#1e293b";
        sidebar.style.color = "white";
        sidebar.style.padding = "8px";
        sidebar.style.borderTopLeftRadius = "10px";
        sidebar.style.borderBottomLeftRadius = "10px";
        sidebar.style.boxShadow = "0 0 12px rgba(0,0,0,0.4)";
        sidebar.style.zIndex = 9999;
        sidebar.style.fontFamily = "sans-serif";
        sidebar.style.transition = "width 0.3s ease";
        sidebar.style.overflow = "hidden";

        const label = document.createElement("div");
        label.innerText = "✨";
        label.style.fontSize = "20px";
        label.style.textAlign = "center";
        label.style.cursor = "pointer";
        label.title = "Hover to expand prompts";
        sidebar.appendChild(label);

        const promptsContainer = document.createElement("div");
        promptsContainer.style.display = "none";
        promptsContainer.style.marginTop = "8px";

        const title = document.createElement("h3");
        title.innerText = "Prompts";
        title.style.textAlign = "center";
        title.style.margin = "0 0 8px 0";
        title.style.fontSize = "15px";
        promptsContainer.appendChild(title);

        prompts.forEach(prompt => {
            const btn = document.createElement("button");
            btn.textContent = prompt;
            btn.style.display = "block";
            btn.style.width = "160px";
            btn.style.margin = "6px auto";
            btn.style.padding = "6px";
            btn.style.fontSize = "13px";
            btn.style.background = "#3b82f6";
            btn.style.color = "white";
            btn.style.border = "none";
            btn.style.borderRadius = "6px";
            btn.style.cursor = "pointer";

            btn.onclick = () => insertPrompt(prompt);

            promptsContainer.appendChild(btn);
        });

        sidebar.appendChild(promptsContainer);
        document.body.appendChild(sidebar);

        sidebar.addEventListener("mouseenter", () => {
            sidebar.style.width = "200px";
            promptsContainer.style.display = "block";
        });

        sidebar.addEventListener("mouseleave", () => {
            sidebar.style.width = "40px";
            promptsContainer.style.display = "none";
        });
    }

    // Wait for ChatGPT UI to load
    const interval = setInterval(() => {
        if (getInputBox()) {
            createSidebar();
            clearInterval(interval);
        }
    }, 1500);
})();

Initial commit: ChatGPT Prompt Sidebar userscript

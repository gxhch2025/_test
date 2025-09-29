import { runChat } from "./chat.js";

document.getElementById("checkGpuBtn").addEventListener("click", checkWebGPU);
document.getElementById("loadModelBtn").addEventListener("click", loadModel);
document.getElementById("sendBtn").addEventListener("click", sendPrompt);

function checkWebGPU() {
  const status = document.getElementById("gpuStatus");
  if (!navigator.gpu) {
    status.textContent = "❌ WebGPU 不支持，请使用最新版 Chrome 或 Edge 并启用 WebGPU";
    status.style.color = "red";
  } else {
    status.textContent = "✅ WebGPU 已启用！";
    status.style.color = "green";
  }
}

function loadModel() {
  const model = document.getElementById("modelSelector").value;
  const modelStatus = document.getElementById("modelStatus");
  modelStatus.textContent = `正在加载模型：${model}...`;
  setTimeout(() => {
    modelStatus.textContent = `✅ 模型 ${model} 加载完成（模拟）`;
  }, 1500);
}


import { runChat } from "./chat.js";

const chatHistory = [];

function renderChat() {
  const container = document.getElementById("chatHistory");
  container.innerHTML = "";
  chatHistory.forEach(entry => {
    const div = document.createElement("div");
    div.className = `chat-entry ${entry.role}`;
    div.textContent = entry.text;
    container.appendChild(div);
  });
}

function sendPrompt() {
  const input = document.getElementById("userInput").value.trim();
  if (!input) return;

  chatHistory.push({ role: "user", text: input });
  renderChat();

  runChat(input, (output) => {
    chatHistory.push({ role: "ai", text: output });
    renderChat();
  });
}

function copyInvite() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    document.getElementById("inviteStatus").textContent = "✅ 链接已复制，快去分享吧！";
  });
}
window.copyInvite = copyInvite;


window.onload = checkWebGPU;

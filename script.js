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

async function loadModel() {
  const selector = document.getElementById("modelSelector");
  const file = selector.value;
  const status = document.getElementById("modelStatus");
  status.textContent = `正在加载模型：${file} ...`;
  // 初始化 Worker 并传入模型路径
  await runChat.initModel(`assets/${file}`);
  status.textContent = `✅ 模型 ${file} 加载完成`;
}

function sendPrompt() {
  const input = document.getElementById("userInput").value.trim();
  if (!input) return;
  chatHistory.push({ role: "user", text: input });
  renderChat();

  runChat.chat(input, (output) => {
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

window.onload = checkWebGPU;
document.getElementById("checkGpuBtn").onclick = checkWebGPU;
document.getElementById("loadModelBtn").onclick = loadModel;
document.getElementById("sendBtn").onclick = sendPrompt;
window.copyInvite = copyInvite;

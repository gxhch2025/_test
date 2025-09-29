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
  const modelStatus = document.getElementById("modelStatus");
  modelStatus.textContent = "正在加载模型...";
  setTimeout(() => {
    modelStatus.textContent = "✅ 模型加载完成（模拟）";
  }, 1500);
}

function sendPrompt() {
  const input = document.getElementById("userInput").value;
  const responseBox = document.getElementById("responseBox");

  runChat(input, (output) => {
    responseBox.textContent = output;
  });
}

window.onload = checkWebGPU;

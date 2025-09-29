export async function runChat(inputText, updateResponse) {
  if (!inputText.trim()) {
    updateResponse("⚠️ 请输入内容后再发送。");
    return;
  }

  updateResponse("⏳ 正在生成响应...");

  // 模拟调用 worker（后续可替换为真实推理）
  const worker = new Worker("worker.js");
  worker.postMessage({ type: "infer", payload: inputText });

  worker.onmessage = (event) => {
    const { type, payload } = event.data;
    if (type === "result") {
      updateResponse(payload);
      worker.terminate();
    }
  };
}

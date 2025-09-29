let worker = null;

export async function runChat(inputText, updateResponse) {
  if (!worker) {
    worker = new Worker("worker.js");
    worker.postMessage({ type: "init" });
    worker.onmessage = (event) => {
      const { type, payload } = event.data;
      if (type === "status") {
        console.log(payload);
      }
    };
  }

  updateResponse("⏳ 正在生成响应...");
  worker.postMessage({ type: "infer", payload: inputText });

  worker.onmessage = (event) => {
    const { type, payload } = event.data;
    if (type === "result") {
      updateResponse(payload);
    }
  };
}

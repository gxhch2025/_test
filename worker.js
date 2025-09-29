import initWebLLM from "./webllm.min.js";

let llm = null;

self.onmessage = async (event) => {
  const { type, payload } = event.data;

  if (type === "init") {
    const { modelUrl, tokenizerUrl } = payload;
    llm = await initWebLLM({
      modelUrl,
      tokenizerUrl,
      useWebGPU: true
    });
    self.postMessage({ type: "init_done" });
  }

  if (type === "infer" && llm) {
    const response = await llm.chat(payload);
    self.postMessage({ type: "result", payload: response });
  }
};

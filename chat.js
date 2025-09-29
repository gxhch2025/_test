export const runChat = {
  worker: null,
  initModel: async function(modelUrl) {
    // 第一次调用时创建 Worker 并初始化模型
    if (!this.worker) {
      this.worker = new Worker("worker.js");
      await new Promise(resolve => {
        this.worker.onmessage = (e) => {
          if (e.data.type === "init_done") resolve();
        };
        this.worker.postMessage({ type: "init", payload: { modelUrl, tokenizerUrl: "assets/tokenizer.json" } });
      });
    }
  },
  chat: function(inputText, callback) {
    this.worker.postMessage({ type: "infer", payload: inputText });
    this.worker.onmessage = (e) => {
      if (e.data.type === "result") {
        callback(e.data.payload);
      }
    };
  }
};

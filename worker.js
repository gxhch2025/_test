self.onmessage = async function (event) {
  const { type, payload } = event.data;

  if (type === "infer") {
    const input = payload;
    await new Promise(resolve => setTimeout(resolve, 1000));
    const output = `🧠 模拟响应：你输入的是「${input}」`;
    self.postMessage({ type: "result", payload: output });
  }
};

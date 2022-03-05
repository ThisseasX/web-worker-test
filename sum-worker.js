onmessage = (e) => {
  const sum = e.data.reduce((a, b) => a + b);
  console.log({ sum });
  postMessage(sum);
};

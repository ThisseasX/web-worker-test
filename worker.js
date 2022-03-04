onmessage = (e) => {
  const arr = e.data;
  const result = arr.reduce((a, b) => a + b);

  console.log(result);

  postMessage(result);
};

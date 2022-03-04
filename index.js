const partition = (arr, partitionSize) => {
  const result = [];
  let temp = [];

  arr.forEach((i) => {
    temp.push(i);

    if (i % partitionSize === 0) {
      result.push(temp);
      temp = [];
    }
  });

  if (temp.length > 0) {
    result.push(temp);
  }

  return result;
};

const numbers = Array(32000000)
  .fill()
  .map((_, i) => i + 1);

const splitNumbers = partition(numbers, numbers.length / 8);

console.time('time');

const promises = splitNumbers.map(
  (nums) =>
    new Promise((resolve) => {
      const worker = new Worker('worker.js');

      worker.postMessage(nums);

      worker.onmessage = (e) => {
        resolve(e.data);
      };
    }),
);

Promise.all(promises).then((results) => {
  const sum = results.reduce((a, b) => a + b);

  document.getElementById('data').textContent = sum;

  console.timeEnd('time');
});

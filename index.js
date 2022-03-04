/**
 * Splits an array of numbers to multiple partitions of given size.
 *
 * @param {number[]} arr List of numbers
 * @param {number} partitionSize Size of each partition
 * @returns {number} Array of partitions
 */
const partition = (arr, partitionSize) => {
  const result = [];
  let buffer = [];

  arr.forEach((number) => {
    buffer.push(number);

    if (number % partitionSize === 0) {
      result.push(buffer);
      buffer = [];
    }
  });

  if (buffer.length > 0) {
    result.push(buffer);
  }

  return result;
};

// Long array of numbers to operate on
const numbers = Array(32000000)
  .fill()
  .map((_, i) => i + 1);

// The above array split into 8 equal-size partitions, one for each thread
const splitNumbers = partition(numbers, numbers.length / 8);

// Start performance timer
console.time('time');

// Make a new worker for each partition and have it calculate its sum
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
  // Combine the sums of all workers
  const sum = results.reduce((a, b) => a + b);

  document.getElementById('data').textContent = sum;

  // End performance timer
  console.timeEnd('time');
});

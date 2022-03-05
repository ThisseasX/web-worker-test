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

onmessage = (e) => {
  // Long array of numbers to operate on
  const numbers = Array(e.data)
    .fill()
    .map((_, i) => i + 1);

  // Split the array into 8 equal segments, one for each thread
  const splitNumbers = partition(numbers, numbers.length / 8);

  console.log({ splitNumbers });

  // Send the partitions back to the main thread
  postMessage(splitNumbers);
};

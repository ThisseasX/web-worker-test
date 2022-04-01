// The length of the array used for calculations
const CALCULATION_ARRAY_LENGTH = 64e5;

/**
 * Wraps a worker communication with a Promise.
 *
 * @param {Worker} worker A Worker instance
 * @param {*} message Message sent to the worker
 * @returns
 */
const getWorkerResponse = (worker, message) =>
  new Promise((resolve) => {
    if (message) {
      worker.postMessage(message);
    }

    worker.onmessage = (e) => {
      resolve(e.data);
    };
  });

(async () => {
  console.time('partitioning');
  // Start a worker to get a long array to operate on
  const splitNumbers = await getWorkerResponse(
    new Worker('partition-worker.js'),
    CALCULATION_ARRAY_LENGTH,
  );
  console.timeEnd('partitioning');

  console.time('calculating');
  // Start one worker for each partition and have it calculate its sum
  const workerPromises = splitNumbers.map((numbers) =>
    getWorkerResponse(new Worker('sum-worker.js'), numbers),
  );

  const allResults = await Promise.all(workerPromises);
  // Combine the sums of each worker
  const sum = allResults.reduce((a, b) => a + b);
  console.timeEnd('calculating');

  document.getElementById('data').textContent = sum;
})();

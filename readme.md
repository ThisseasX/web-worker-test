# web-worker-test

Example of using web workers to make multiple concurrent computations.

Preview at [https://thisseasx.github.io/web-worker-test/](https://thisseasx.github.io/web-worker-test/).

## Findings

- Creating the big array and partitioning it takes **23 seconds** which would block the UI if performed on the main thread.

- Calculating the sum of all partitions takes:
  - **17 seconds** with 1 partition (1 thread)
  - **10 seconds** with 8 partitions (8 threads)

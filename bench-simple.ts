// Simple benchmark for Blake3

import { hash } from "./js/blake3.ts";

// Generate random input buffer
const INPUT_BUFFER = new Uint8Array(1024 * 1024);
for (let i = 0; i < INPUT_BUFFER.length; ) {
  let rng = Math.random() * Number.MAX_SAFE_INTEGER;
  for (let j = 0; j < 4; ++j) {
    INPUT_BUFFER[i++] = rng & 0xff;
    rng >>= 8;
  }
}

const sizes = [
  ["96B", 96],
  ["512B", 512],
  ["1KiB", 1024],
  ["32KiB", 32 * 1024],
  ["64KiB", 64 * 1024],
  ["256KiB", 256 * 1024],
  ["1MB", 1024 * 1024],
] as const;

console.log("Blake3 Performance Benchmark\n");

for (const [label, size] of sizes) {
  const input = new Uint8Array(INPUT_BUFFER.buffer, 0, size);
  const iterations = size < 10000 ? 1000 : size < 100000 ? 500 : 100;

  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    hash(input);
  }
  const end = performance.now();

  const timeMs = end - start;
  const throughputMBps = (size * iterations) / (timeMs / 1000) / (1024 * 1024);

  console.log(`${label.padEnd(8)}: ${throughputMBps.toFixed(2).padStart(8)} MB/s`);
}

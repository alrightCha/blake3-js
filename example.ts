// Example usage of the Blake3 implementation

import { hash } from "./js/blake3.ts";

// Helper to convert bytes to hex
function toHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Example 1: Hash empty input
console.log("Example 1: Empty input");
const empty = new Uint8Array(0);
const emptyHash = hash(empty);
console.log("Hash:", toHex(emptyHash));
console.log();

// Example 2: Hash string (encoded as UTF-8)
console.log("Example 2: Hash a string");
const text = "Hello, BLAKE3!";
const encoder = new TextEncoder();
const textBytes = encoder.encode(text);
const textHash = hash(textBytes);
console.log(`Input: "${text}"`);
console.log("Hash:", toHex(textHash));
console.log();

// Example 3: Hash binary data
console.log("Example 3: Hash binary data");
const binaryData = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
const binaryHash = hash(binaryData);
console.log("Input:", Array.from(binaryData).join(", "));
console.log("Hash:", toHex(binaryHash));
console.log();

// Example 4: Hash large data
console.log("Example 4: Hash large data (1MB)");
const largeData = new Uint8Array(1024 * 1024);
// Fill with pseudo-random data
for (let i = 0; i < largeData.length; i++) {
  largeData[i] = (i * 137) & 0xff;
}

const start = performance.now();
const largeHash = hash(largeData);
const end = performance.now();

console.log("Size:", (largeData.length / 1024 / 1024).toFixed(2), "MB");
console.log("Hash:", toHex(largeHash));
console.log("Time:", (end - start).toFixed(2), "ms");
console.log(
  "Throughput:",
  ((largeData.length / 1024 / 1024) / ((end - start) / 1000)).toFixed(2),
  "MB/s"
);
console.log();

// Example 5: Verify hash consistency
console.log("Example 5: Verify hash consistency");
const testData = new Uint8Array([42]);
const hash1 = hash(testData);
const hash2 = hash(testData);
const hash3 = hash(new Uint8Array([42])); // Same data, different array

console.log("Hash 1:", toHex(hash1));
console.log("Hash 2:", toHex(hash2));
console.log("Hash 3:", toHex(hash3));
console.log("All hashes equal:", toHex(hash1) === toHex(hash2) && toHex(hash2) === toHex(hash3));

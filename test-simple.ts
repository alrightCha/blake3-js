// Simple test to verify Blake3 implementation

import { hash } from "./js/blake3.ts";

// Test with empty input
const emptyInput = new Uint8Array(0);
const emptyResult = hash(emptyInput);

console.log("Empty input hash:");
console.log(Array.from(emptyResult).map(b => b.toString(16).padStart(2, '0')).join(''));

// Test with small input
const smallInput = new Uint8Array([0, 1, 2, 3]);
const smallResult = hash(smallInput);

console.log("\nSmall input [0, 1, 2, 3] hash:");
console.log(Array.from(smallResult).map(b => b.toString(16).padStart(2, '0')).join(''));

// Test with larger input
const largeInput = new Uint8Array(1024);
for (let i = 0; i < largeInput.length; i++) {
  largeInput[i] = i & 0xff;
}
const largeResult = hash(largeInput);

console.log("\n1KB sequential input hash:");
console.log(Array.from(largeResult).map(b => b.toString(16).padStart(2, '0')).join(''));

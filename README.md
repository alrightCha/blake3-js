# BLAKE3 - Optimized JavaScript Implementation

A highly optimized pure JavaScript implementation of the BLAKE3 cryptographic hash function, based on the [Fleek Network optimization case study](https://web.archive.org/web/20250320125147/https://blog.fleek.network/post/fleek-network-blake3-case-study/), following the bounty placed by Zooko: [bounty on X](https://x.com/zooko/status/1998185559542657145).

Zcash shielded address: 

u1yul0ex5kh6phvrjxymr875fkgch4pqz7m8p76ckrqgwhsga5falkmy24r6yws85z46a0rq8p4y53jfku2509k6utn8nqvean8hryyx02zh80apqutdugssgq9e0aey56vyfa36963kgvjdhk49ywjdkyxaql34f8lp7c3vguu5w3049v

## Quick Start

```typescript
import { hash } from "./js/blake3.ts";

// Hash some data
const data = new TextEncoder().encode("Hello, BLAKE3!");
const digest = hash(data);

// Convert to hex
const hex = Array.from(digest)
  .map((b) => b.toString(16).padStart(2, "0"))
  .join("");

console.log(hex);
```

## Performance

Benchmarked on Apple M4 Pro:

| Input Size | Throughput |
| ---------- | ---------- |
| 96 bytes   | ~40 MB/s   |
| 512 bytes  | ~224 MB/s  |
| 1 KiB      | ~811 MB/s  |
| 32 KiB     | ~958 MB/s  |
| 64 KiB     | ~1000 MB/s |
| 256 KiB    | ~972 MB/s  |
| 1 MB       | ~978 MB/s  |

## Installation

### Node.js / Bun

```bash
# Clone or copy blake3.ts to your project
cp blake3/js/blake3.ts your-project/
```

### Deno

```typescript
import { hash } from "./blake3.ts";
```

## Usage

### Basic Hashing

```typescript
import { hash } from "./js/blake3.ts";

const data = new Uint8Array([1, 2, 3, 4, 5]);
const digest = hash(data);
// digest is a Uint8Array of 32 bytes (256 bits)
```

### Hash a String

```typescript
const text = "Hello, World!";
const bytes = new TextEncoder().encode(text);
const digest = hash(bytes);

// Convert to hexadecimal
const hex = Array.from(digest)
  .map((b) => b.toString(16).padStart(2, "0"))
  .join("");
console.log(hex);
```

### Hash Large Data

```typescript
const largeData = new Uint8Array(1024 * 1024); // 1 MB
// ... fill with data ...
const digest = hash(largeData);
```

## API

### `hash(input: Uint8Array): Uint8Array`

Computes the BLAKE3 hash of the input data.

- **Parameters:**
  - `input`: A `Uint8Array` containing the data to hash
- **Returns:** A `Uint8Array` of 32 bytes (256 bits) containing the hash digest

## How It Works

This implementation achieves high performance through several optimizations:

1. **Local Variables Over Arrays** - Using JavaScript variables instead of TypedArray access allows the JIT compiler to keep values in registers
2. **Zero-Copy Operations** - Using offsets and views instead of copying data
3. **Little-Endian Fast Path** - Direct `Uint32Array` view on little-endian systems (99% of platforms)
4. **Buffer Reuse** - Pre-allocated buffers that are reused across hash operations
5. **Inline Permutations** - Message permutations are inlined using variable swaps

For more details, see the [Fleek Network blog post](https://blog.fleek.network/post/fleek-network-blake3-case-study/).

## Testing

Run the simple test:

```bash
node test-simple.ts
```

Expected output (empty input):

```
af1349b9f5f9a1a6a0404dea36dcc9499bcb25c9adc112b7cc9a93cae41f3262
```

## Benchmarking

Run the benchmark:

```bash
node bench-simple.ts
```

## Project Structure

```
blake3/
├── js/
│   └── blake3.ts          # Main implementation
├── test-simple.ts         # Simple tests
├── bench-simple.ts        # Performance benchmarks
├── example.ts             # Usage examples
└── README.md              # This file
```

## Algorithm

BLAKE3 is a cryptographic hash function that:

- Uses a Merkle tree structure for parallelization
- Employs 7 rounds (vs 10+ in SHA-2) for better performance
- Produces 256-bit (32-byte) hashes by default
- Supports keyed hashing and key derivation (not implemented here)

The algorithm processes data in 1024-byte chunks, each split into 16 blocks of 64 bytes. Each block goes through a compression function that runs 7 rounds of mixing operations.

## License

MIT

## References

- [BLAKE3 JS Bounty by Zooko](https://x.com/zooko/status/1998185559542657145?s=20)
- [Fleek Network Blake3 Case Study](https://web.archive.org/web/20250320125147/https://blog.fleek.network/post/fleek-network-blake3-case-study/)

# LRU Cache (JavaScript)

A Least Recently Used (LRU) Cache implementation in JavaScript with $O(1)$ time complexity operations and optional TTL (Time-To-Live) expiration support.

---

## 📌 Data Structures Used & Rationale

1. **Hash Map (`Map`)**:
   - Stores key-to-node references.
   - Provides **$O(1)$ average time complexity** for accessing node memory addresses during `get` and `put` operations.

2. **Doubly Linked List (`Node` with `prev` and `next` pointers)**:
   - Maintains the sequence of keys based on their recency of use.
   - Uses sentinel **`head`** and **`tail`** dummy nodes to simplify pointer operations without null checks.
   - Allows **$O(1)$ node relocation** to the head (Most Recently Used) and **$O(1)$ node eviction** from the tail (Least Recently Used).

---

## 🔄 How LRU Ordering is Maintained

- **Most Recently Used (MRU)** nodes are kept right after the `head` sentinel node.
- **Least Recently Used (LRU)** nodes are positioned right before the `tail` sentinel node.
- **`get(key)`**:
  - If the key exists, its node is detached from its current position and inserted right after `head`.
  - Returns `-1` if the key is not found or has expired.
- **`put(key, value, [ttlMs])`**:
  - If the key already exists, updates its value and moves its node to `head`.
  - If it's a new key, creates a node, adds it after `head`, and maps the key.
  - If cache size exceeds `capacity`, the node right before `tail` is removed from both the list and the `Map`.

---

## ⏰ Complexity

| Operation | Time Complexity | Space Complexity | Description |
|---|---|---|---|
| `get(key)` | **$O(1)$** | $O(1)$ | Hash Map lookup + $O(1)$ node pointer updates. |
| `put(key, value)` | **$O(1)$** | $O(1)$ | Hash Map lookup/insert + $O(1)$ node insertion or eviction. |
| **Overall Cache** | — | **$O(N)$** | Where $N$ is the specified cache capacity. |

---

## ⏱️ Optional Feature: TTL (Expiration) Support

- **Approach**: An optional `ttlMs` argument can be passed to `put(key, value, ttlMs)`. The node sets `expiresAt = Date.now() + ttlMs`.
- **Expiration Handling**: Expiration is checked lazily during `get()`. If `Date.now() > node.expiresAt`, the node is deleted from the `Map` and the linked list, returning `-1`.
- **Trade-offs**: Lazy deletion avoids CPU and event-loop overhead caused by active background cleanup timers, preserving pure $O(1)$ execution performance.

---

## 🚀 How to Run

### Prerequisites
- Node.js installed

### 1. Run Execution Demo
```bash
npm start
# or
node demo.js
```

### 2. Run Unit Tests
```bash
npm test
# or
node test/test.js
```

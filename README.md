# LRU Cache (JavaScript)

A Least Recently Used (LRU) Cache implementation in JavaScript supporting $O(1)$ average time complexity operations and optional TTL (Time-To-Live) expiration.

---

## Data Structures Used & Rationale

1. **Hash Map (`Map`)**:
   - Maps keys directly to Doubly Linked List node references.
   - Enables **$O(1)$ average time complexity** for key lookups during `get` and `put` operations.

2. **Doubly Linked List (`Node` with `prev` and `next` pointers)**:
   - Maintains insertion and access recency order.
   - Utilizes sentinel **`head`** and **`tail`** dummy nodes to eliminate boundary pointer checks.
   - Facilitates **$O(1)$ node promotion** to the head (Most Recently Used) and **$O(1)$ node eviction** from the tail (Least Recently Used).

---

## How LRU Ordering is Maintained

- **Most Recently Used (MRU)** nodes reside immediately after the `head` sentinel node.
- **Least Recently Used (LRU)** nodes reside immediately before the `tail` sentinel node.
- **`get(key)`**:
  - If the key exists, its node is detached from its current position and moved right after `head`.
  - Returns `-1` if the key is missing or expired.
- **`put(key, value, [ttlMs])`**:
  - If the key already exists, updates its value and moves its node to `head`.
  - If it is a new key, creates a node, inserts it after `head`, and registers it in the Map.
  - If cache size exceeds `capacity`, the node immediately preceding `tail` is removed from both the list and the Map.

---

## Time and Space Complexity

| Operation | Time Complexity | Space Complexity | Description |
|---|---|---|---|
| `get(key)` | **$O(1)$** | $O(1)$ | Hash Map lookup + $O(1)$ node pointer updates. |
| `put(key, value)` | **$O(1)$** | $O(1)$ | Hash Map lookup/insert + $O(1)$ node insertion or eviction. |
| **Overall Cache** | — | **$O(N)$** | Where $N$ is the specified cache capacity limit. |

---

## TTL (Expiration) Support

- **Approach**: An optional `ttlMs` argument can be passed to `put(key, value, ttlMs)`. The node records `expiresAt = Date.now() + ttlMs`.
- **Expiration Handling**: Expiration is evaluated lazily during `get()`. If `Date.now() > node.expiresAt`, the node is evicted from both the Map and the linked list, returning `-1`.
- **Trade-offs**: Lazy evaluation avoids event-loop timer overhead, preserving $O(1)$ execution guarantees without background thread/timer management.

---

## How to Run

### Prerequisites
- Node.js (v14+ recommended)

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

# LRU Cache in JavaScript

A simple Least Recently Used (LRU) Cache in JavaScript with $O(1)$ operations and optional TTL support.

## Data Structures & Logic
- **Map**: Holds key-to-node references for $O(1)$ lookup.
- **Doubly Linked List**: Keeps track of usage order. Most recently used items are kept near `head`, least recently used near `tail`.

## Complexity
- **Time**: $O(1)$ average for `get()` and `put()`.
- **Space**: $O(N)$ where $N$ is the cache capacity.

## Running the Code
```bash
# Run Demo
node demo.js

# Run Tests
node test/test.js
```

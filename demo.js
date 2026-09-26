const LRUCache = require('./src/LRUCache');

console.log("=========================================");
console.log("       LRU CACHE DEMONSTRATION           ");
console.log("=========================================\n");

// 1. Basic Required Example
console.log("--- Standard LRU Cache Flow (Capacity = 2) ---");
const cache = new LRUCache(2);

console.log('Action: put("A", 10)');
cache.put("A", 10);
console.log('Action: put("B", 20)');
cache.put("B", 20);

console.log('Action: get("A") -> Expected: 10 | Output:', cache.get("A"));

console.log('Action: put("C", 30) (Triggers eviction of "B" as "A" was recently accessed)');
cache.put("C", 30);

console.log('Action: get("B") -> Expected: -1 | Output:', cache.get("B"));
console.log('Action: get("C") -> Expected: 30 | Output:', cache.get("C"));
console.log('Action: get("A") -> Expected: 10 | Output:', cache.get("A"));

console.log("\n--- Bonus: TTL (Expiration) Demo (Capacity = 3) ---");
const ttlCache = new LRUCache(3);

console.log('Action: put("X", 100, 1000) [TTL = 1000ms]');
ttlCache.put("X", 100, 1000);

console.log('Action: put("Y", 200) [No TTL]');
ttlCache.put("Y", 200);

console.log('Immediate get("X") before expiration -> Expected: 100 | Output:', ttlCache.get("X"));

console.log('Waiting 1200ms for "X" to expire...');
setTimeout(() => {
  console.log('Action: get("X") after 1200ms -> Expected: -1 | Output:', ttlCache.get("X"));
  console.log('Action: get("Y") after 1200ms -> Expected: 200 | Output:', ttlCache.get("Y"));
  console.log("\n=========================================");
  console.log("       DEMONSTRATION COMPLETED           ");
  console.log("=========================================");
}, 1200);

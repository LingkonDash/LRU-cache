const LRUCache = require('./src/LRUCache');

console.log("--- Standard LRU Cache Flow ---");
const cache = new LRUCache(2);

cache.put("A", 10);
cache.put("B", 20);
console.log('get("A"):', cache.get("A")); // Returns 10

cache.put("C", 30); // Evicts "B"
console.log('get("B"):', cache.get("B")); // Returns -1
console.log('get("C"):', cache.get("C")); // Returns 30
console.log('get("A"):', cache.get("A")); // Returns 10

console.log("\n--- TTL / Expiration Demo ---");
const ttlCache = new LRUCache(3);

ttlCache.put("X", 100, 1000); // 1 sec TTL
ttlCache.put("Y", 200);

console.log('get("X") before expiry:', ttlCache.get("X")); // Returns 100

setTimeout(() => {
  console.log('get("X") after 1.2s:', ttlCache.get("X")); // Returns -1
  console.log('get("Y") after 1.2s:', ttlCache.get("Y")); // Returns 200
}, 1200);

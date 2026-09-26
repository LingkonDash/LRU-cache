const LRUCache = require('./src/LRUCache');

function logCacheState(cache) {
  const items = cache.getCacheState().map(i => `${i.key}:${i.value}`).join(' -> ');
  console.log(`[Cache State (MRU -> LRU)]: [ ${items} ]`);
}

console.log("=================================================");
console.log("LRU CACHE EXECUTION DEMONSTRATION");
console.log("=================================================\n");

console.log("--- 1. Basic Operations & Eviction (Capacity = 2) ---");
const cache = new LRUCache(2);

console.log('Action: put("A", 10)');
cache.put("A", 10);
console.log('Action: put("B", 20)');
cache.put("B", 20);
logCacheState(cache);

console.log('\nAction: get("A")');
console.log('Result:', cache.get("A"), '(Moved "A" to MRU)');
logCacheState(cache);

console.log('\nAction: put("C", 30) -- Exceeds capacity, evicts "B" (LRU)');
cache.put("C", 30);
logCacheState(cache);

console.log('\nVerification:');
console.log('get("B") ->', cache.get("B"), '(Evicted key returns -1)');
console.log('get("C") ->', cache.get("C"), '(Active key returns value)');
console.log('get("A") ->', cache.get("A"), '(Active key returns value)');

console.log("\n--- 2. TTL Expiration Support (Capacity = 3) ---");
const ttlCache = new LRUCache(3);

console.log('Action: put("X", 100, 1000) [TTL: 1000ms]');
ttlCache.put("X", 100, 1000);

console.log('Action: put("Y", 200)       [No TTL]');
ttlCache.put("Y", 200);

console.log('\nImmediate access before expiration:');
console.log('get("X") ->', ttlCache.get("X"));

console.log('\nWaiting 1200ms for TTL expiration...');

setTimeout(() => {
  console.log('\nAccess after 1200ms:');
  console.log('get("X") ->', ttlCache.get("X"), '(Expired key returns -1)');
  console.log('get("Y") ->', ttlCache.get("Y"), '(Active key returns value)');
  console.log("\n=================================================");
  console.log("DEMONSTRATION COMPLETE");
  console.log("=================================================");
}, 1200);

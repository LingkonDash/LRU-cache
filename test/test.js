const LRUCache = require('../src/LRUCache');

function runTests() {
  console.log("Running LRU Cache Unit Tests...\n");
  let passed = 0;
  let total = 0;

  function assert(condition, message) {
    total++;
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
    }
  }

  // Test 1: Basic Put and Get
  const c1 = new LRUCache(2);
  c1.put("key1", "val1");
  assert(c1.get("key1") === "val1", "Retrieve existing key");
  assert(c1.get("nonexistent") === -1, "Retrieve non-existent key returns -1");

  // Test 2: Eviction order
  const c2 = new LRUCache(2);
  c2.put("A", 1);
  c2.put("B", 2);
  c2.get("A"); // A is MRU, B is LRU
  c2.put("C", 3); // B evicted
  assert(c2.get("B") === -1, "Evicts least recently used item (B)");
  assert(c2.get("A") === 1, "Retains accessed item (A)");
  assert(c2.get("C") === 3, "Retains newly added item (C)");

  // Test 3: Updating key
  const c3 = new LRUCache(2);
  c3.put("A", 1);
  c3.put("B", 2);
  c3.put("A", 10); // Update A, should make A MRU
  c3.put("C", 3); // B should be evicted
  assert(c3.get("A") === 10, "Updated key has new value and refreshed position");
  assert(c3.get("B") === -1, "Evicts item after value update of another item");

  // Test 4: Invalid Capacity Error
  try {
    new LRUCache(0);
    assert(false, "Should throw error on capacity 0");
  } catch (err) {
    assert(true, "Throws error for non-positive capacity");
  }

  console.log(`\nTest Summary: ${passed}/${total} passed.`);
}

runTests();

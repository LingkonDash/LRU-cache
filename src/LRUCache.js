/**
 * Doubly LinkedList Node to store key, value, and pointers to prev & next nodes.
 */
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
    this.expiresAt = null; // Optional TTL support
  }
}

/**
 * Least Recently Used (LRU) Cache implementation.
 * Supports O(1) average time complexity for get and put.
 * Optional TTL (Time-To-Live) support for cache eviction based on expiration.
 */
class LRUCache {
  /**
   * @param {number} capacity - Positive integer capacity of the cache.
   */
  constructor(capacity) {
    if (typeof capacity !== 'number' || capacity <= 0 || !Number.isInteger(capacity)) {
      throw new Error('Capacity must be a positive integer.');
    }

    this.capacity = capacity;
    this.map = new Map(); // Key -> Node mapping for O(1) lookups

    // Dummy Head and Tail nodes to simplify boundary operations
    this.head = new Node(null, null);
    this.tail = new Node(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * Add node right after head (most recently used position).
   * @private
   */
  _addNode(node) {
    node.prev = this.head;
    node.next = this.head.next;

    this.head.next.prev = node;
    this.head.next = node;
  }

  /**
   * Remove an existing node from the doubly linked list.
   * @private
   */
  _removeNode(node) {
    const prev = node.prev;
    const next = node.next;

    prev.next = next;
    next.prev = prev;
  }

  /**
   * Move a node to the head (mark as most recently used).
   * @private
   */
  _moveToHead(node) {
    this._removeNode(node);
    this._addNode(node);
  }

  /**
   * Remove the tail node (least recently used entry).
   * @private
   * @returns {Node}
   */
  _popTail() {
    const res = this.tail.prev;
    this._removeNode(res);
    return res;
  }

  /**
   * Get value by key.
   * Updates key usage to most recently used.
   * If key is expired or non-existent, returns -1.
   * @param {any} key
   * @returns {any}
   */
  get(key) {
    const node = this.map.get(key);
    if (!node) return -1;

    // TTL Expiration Check
    if (node.expiresAt && Date.now() > node.expiresAt) {
      this._removeNode(node);
      this.map.delete(key);
      return -1;
    }

    // Move accessed node to head (Most Recently Used)
    this._moveToHead(node);
    return node.value;
  }

  /**
   * Put key-value pair into cache.
   * Optional ttl (in milliseconds) can be provided.
   * @param {any} key
   * @param {any} value
   * @param {number} [ttlMs] - Optional Time To Live in milliseconds
   */
  put(key, value, ttlMs = null) {
    const node = this.map.get(key);

    const expiresAt = ttlMs ? Date.now() + ttlMs : null;

    if (node) {
      // Update existing node
      node.value = value;
      node.expiresAt = expiresAt;
      this._moveToHead(node);
    } else {
      // Create new node
      const newNode = new Node(key, value);
      newNode.expiresAt = expiresAt;

      this.map.set(key, newNode);
      this._addNode(newNode);

      // Evict least recently used if capacity exceeded
      if (this.map.size > this.capacity) {
        const tail = this._popTail();
        this.map.delete(tail.key);
      }
    }
  }

  /**
   * Helper method to inspect current state from MRU to LRU.
   */
  getCacheState() {
    const items = [];
    let curr = this.head.next;
    while (curr !== this.tail) {
      items.push({ key: curr.key, value: curr.value, expiresAt: curr.expiresAt });
      curr = curr.next;
    }
    return items;
  }
}

module.exports = LRUCache;

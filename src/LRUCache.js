class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
    this.expiresAt = null;
  }
}

class LRUCache {
  constructor(capacity) {
    if (typeof capacity !== 'number' || capacity <= 0) {
      throw new Error('Capacity must be a positive integer');
    }

    this.capacity = capacity;
    this.map = new Map();

    // Sentinel head & tail nodes
    this.head = new Node(null, null);
    this.tail = new Node(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _addNode(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  _removeNode(node) {
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;
  }

  _moveToHead(node) {
    this._removeNode(node);
    this._addNode(node);
  }

  _popTail() {
    const res = this.tail.prev;
    this._removeNode(res);
    return res;
  }

  get(key) {
    const node = this.map.get(key);
    if (!node) return -1;

    // Remove if expired
    if (node.expiresAt && Date.now() > node.expiresAt) {
      this._removeNode(node);
      this.map.delete(key);
      return -1;
    }

    this._moveToHead(node);
    return node.value;
  }

  put(key, value, ttlMs = null) {
    const node = this.map.get(key);
    const expiresAt = ttlMs ? Date.now() + ttlMs : null;

    if (node) {
      node.value = value;
      node.expiresAt = expiresAt;
      this._moveToHead(node);
    } else {
      const newNode = new Node(key, value);
      newNode.expiresAt = expiresAt;

      this.map.set(key, newNode);
      this._addNode(newNode);

      if (this.map.size > this.capacity) {
        const tail = this._popTail();
        this.map.delete(tail.key);
      }
    }
  }
}

module.exports = LRUCache;

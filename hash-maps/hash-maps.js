class Node {
  constructor(item = null, next = null) {
    this.item = item;
    this.next = next;
  }
}

class HashMap {
  #CAPACITY = 16;
  #LOAD_FACTOR = 0.75;

  constructor() {
    this.map = [];
    this.map.length = this.#CAPACITY;
  }

  hash(key) {
    let hashCode = 0;

    // const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        /*primeNumber * */ (hashCode + key.charCodeAt(i)) % this.#CAPACITY;
    }

    hashCode;
    return hashCode;
  }

  set(key, value) {
    const setterIndex = this.hash(key);
    const current = this.map[setterIndex];
    if (!current) {
      this.map[setterIndex] = new Node({ key, value });
    } else if (current.item.key === key) {
      this.map[setterIndex].item.value = value;
    } else {
      const temp = new Node({ key, value });
      temp.next = this.map[setterIndex];
      this.map[setterIndex] = temp;
    }
  }

  get(key) {
    const getterIndex = this.hash(key);
    let node = this.map[getterIndex];
    while (node) {
      if (node.item.key === key) return node; // final version returns node.item.value
      node = node.next;
    }
    return null;
  }

  has(key) {
    return Boolean(this.get(key));
  }

  remove(key) {
    const removeIndex = this.hash(key);
    let node = this.map[removeIndex];
    let isRoot = true;
    while (node) {
      if (isRoot && node.item.key === key) {
        this.map[removeIndex] = node.next;
        return true;
      } else if (node.next?.item.key === key) {
        node.next = node.next.next;
      }
      node = node.next;
      isRoot = false;
    }
    return false;
  }

  length() {
    let length = 0;
    this.map.filter(Boolean).forEach((node) => {
      while (node) {
        length += 1;
        node = node.next;
      }
    });

    return length;
  }

  clear() {
    this.map = [];
    this.map.length = this.#CAPACITY;
    return this.length();
  }

  keys() {
    const keys = [];
    this.map.filter(Boolean).forEach((node) => {
      while (node) {
        keys.push(node.item.key);
        node = node.next;
      }
    });
    return keys;
  }

  values() {
    const values = [];
    this.map.filter(Boolean).forEach((node) => {
      while (node) {
        values.push(node.item.value);
        node = node.next;
      }
    });
    return values;
  }

  entries() {
    const entries = [];
    this.map.filter(Boolean).forEach((node) => {
      while (node) {
        entries.push([node.item.key, node.item.value]);
        node = node.next;
      }
    });
    return entries;
  }
}

const myMap = new HashMap();
myMap.set('hi', 'initial value');
const initialTest = myMap.get('hi');
initialTest;

myMap.set('hi', 'replace value');
const replaceTest = myMap.get('hi');
replaceTest;

myMap.set('ih', 'collision value');
const collisionTest = myMap.get('ih');
collisionTest;

console.log(myMap.has('hi'));
console.log(myMap.length());

myMap.set('new', 'a third value');
console.log(myMap.length());

console.log(myMap.keys());
console.log(myMap.values());
console.log(myMap.entries());

const currentMap = myMap.map;
currentMap;
const removeTest = myMap.remove('ih');
removeTest;
currentMap;

console.log(myMap.length());

console.log(myMap.clear());
console.log(myMap.map);

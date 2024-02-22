class Node {
  constructor(item = null, next = null) {
    this.item = item;
    this.next = next;
  }
}

class HashMap {
  #CAPACITY = 16;
  #LOAD_FACTOR = 0.75;
  #CheckOutOfBounds(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
  }
  #Resize() {
    this.buckets.length *= 2;
  }
  #CheckCapacity() {
    debugger;
    if (
      this.buckets.filter(Boolean).length >=
      this.buckets.length * this.#LOAD_FACTOR
    ) {
      this.#Resize();
    }
  }

  constructor(fullVersion = false) {
    this.buckets = [];
    this.buckets.length = this.#CAPACITY;
    this.fullVersion = fullVersion;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = this.fullVersion ? 31 : 1;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * (hashCode + key.charCodeAt(i))) % this.#CAPACITY;
    }

    this.#CheckOutOfBounds(hashCode);
    return hashCode;
  }

  set(key, value) {
    const setterIndex = this.hash(key);
    const current = this.buckets[setterIndex];

    this.#CheckCapacity();

    if (!current) {
      this.buckets[setterIndex] = new Node({ key, value });
    } else if (current.item.key === key) {
      this.buckets[setterIndex].item.value = value;
    } else {
      const temp = new Node({ key, value });
      temp.next = this.buckets[setterIndex];
      this.buckets[setterIndex] = temp;
    }
  }

  get(key) {
    const getterIndex = this.hash(key);
    let node = this.buckets[getterIndex];
    while (node) {
      if (node.item.key === key)
        return this.fullVersion ? node.item.value : node;
      node = node.next;
    }
    return null;
  }

  has(key) {
    return Boolean(this.get(key));
  }

  remove(key) {
    const removeIndex = this.hash(key);
    let node = this.buckets[removeIndex];
    let isRoot = true;
    while (node) {
      if (isRoot && node.item.key === key) {
        this.buckets[removeIndex] = node.next;
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
    this.buckets.filter(Boolean).forEach((node) => {
      while (node) {
        length += 1;
        node = node.next;
      }
    });

    return length;
  }

  clear() {
    this.buckets = [];
    this.buckets.length = this.#CAPACITY;
    return this.length();
  }

  keys() {
    const keys = [];
    this.buckets.filter(Boolean).forEach((node) => {
      while (node) {
        keys.push(node.item.key);
        node = node.next;
      }
    });
    return keys;
  }

  values() {
    const values = [];
    this.buckets.filter(Boolean).forEach((node) => {
      while (node) {
        values.push(node.item.value);
        node = node.next;
      }
    });
    return values;
  }

  entries() {
    const entries = [];
    this.buckets.filter(Boolean).forEach((node) => {
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

const currentMap = myMap.buckets;
currentMap;
const removeTest = myMap.remove('ih');
removeTest;
currentMap;

console.log(myMap.length());

console.log(myMap.clear());
console.log(myMap.buckets);

const fullMap = new HashMap(true);
[
  'tuxedo',
  'Navajo',
  'zeta',
  'orange',
  'Madrid',
  'cantankerous',
  'Pluto',
  'zirconium',
  'eclipse',
  'ground',
  'voracious',
  'lonely',
  'goof',
  'doubleWide',
  'regret',
  'masterChief',
  'quotidian',
  '',
  'fa',
  'arsene',
].forEach((word) => {
  fullMap.set(word, `${word}, but as a value`);
});

// Above forEach should push array length to 32
console.log(fullMap.buckets.length, fullMap.buckets.filter(Boolean).length);

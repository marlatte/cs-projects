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
}

const myMap = new HashMap();
myMap.set('hi', 'initial value');
const test1 = myMap.get('hi');
test1;

myMap.set('hi', 'new value');
const test2 = myMap.get('hi');
test2;

myMap.set('ih', 'collision value');
const test3 = myMap.get('ih');
test3;

const test4 = myMap.has('hi');
test4;

const test5 = myMap.map;
test5;
const test6 = myMap.remove('ih');
test6;
test5;

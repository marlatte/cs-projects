const LinkedList = () => {
	let head = null;
	let _size = 0;

	const _NodeFactory = (value = null, nextNode = null) => {
		return {
			value,
			nextNode,
		};
	};

	const append = (value) => {
		const temp = _NodeFactory(value);
		if (!head) {
			head = temp;
		} else {
			let node = head;
			while (node.nextNode) {
				node = node.nextNode;
			}
			node.nextNode = temp;
		}
		_size++;
		console.log(`${value} added to list END.`);
	};

	const prepend = (value) => {
		const temp = _NodeFactory(value);
		if (!head) {
			head = temp;
		} else {
			temp.nextNode = head;
			head = temp;
		}
		_size++;
		console.log(`${value} added to list START.`);
	};

	const tail = () => {
		let node = head;
		while (node.nextNode) {
			node = node.nextNode;
		}
		return node.value;
	};

	const at = (index) => {
		// returns item at index
		if (index < _size) {
			let node = head;
			for (let i = 0; i < index; i++) {
				node = node.nextNode;
			}
			return node.value;
		} else {
			throw new Error(`List has fewer than ${index} items.`);
		}
	};

	const pop = () => {
		let node = head;
		while (node.nextNode.nextNode) {
			node = node.nextNode;
		}
		node.nextNode = null;
		_size--;
		console.log('Last item removed from list.');
	};

	const contains = (target) => {
		let node = head;
		while (node) {
			if (node.value === target) {
				return true;
			} else {
				node = node.nextNode;
			}
			return false;
		}
	};

	const find = (target) => {
		// returns index of value, or null if not present.
		let node = head;
		let i = 0;
		while (node) {
			if (node.value === target) {
				return i;
			} else {
				node = node.nextNode;
				i++;
			}
		}
		return null;
	};

	const listToString = () => {
		let node = head;
		let str = '';
		while (node) {
			str += `( ${node.value} ) -> \n`;
			node = node.nextNode;
		}
		str += '  null';
		console.log(str);
	};

	const insertAt = (value, index) => {
		// don't forget to reorg links of surrounding nodes
	};

	const removeAt = (index) => {
		// don't forget to reorg links of surrounding nodes
	};

	return {
		append,
		prepend,
		size: () => _size,
		head,
		tail,
		at,
		pop,
		contains,
		find,
		listToString,
		insertAt,
		removeAt,
	};
};

let list = LinkedList();

list.append('post 1');
list.append('post 2');
list.prepend('pre 1');
list.append('post 3');

console.log('\nLength: ' + list.size());

list.listToString();

console.log('Tail value: ' + list.tail());

let testIndex = 3;
console.log(`Node at index ${testIndex}: ${list.at(testIndex)}`);

list.pop();
console.log('\nLength: ' + list.size());
list.listToString();

console.log(list.contains('pre 1'));
console.log(list.contains('pre 2'));

console.log(list.find('post 2'));
console.log(list.find('pre 2'));

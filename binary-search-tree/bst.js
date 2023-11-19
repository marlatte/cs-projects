function NodeFactory(data) {
	return {
		data,
		left: null,
		right: null,
	};
}

function TreeFactory(arr) {
	const root = buildTree(arr);

	const insert = (key, node = root) => {
		if (isNaN(key)) return 'Please enter a valid key';
		if (!node) {
			node = NodeFactory(key);
		} else if (key < node.data) {
			node.left = insert(key, node.left);
		} else if (key > node.data) {
			node.right = insert(key, node.right);
		}
		return node;
	};

	const remove = (key, node = root) => {
		if (!node || isNaN(key)) return node;

		if (key < node.data) {
			node.left = remove(key, node.left);
			return node;
		} else if (key > node.data) {
			node.right = remove(key, node.right);
			return node;
		}

		if (!node.left || !node.right) {
			const temp = !node.left ? node.right : node.left;
			delete node;
			return temp;
		} else {
			let parent = node;
			let replacement = node.right;
			while (replacement.left) {
				parent = replacement;
				replacement = replacement.left;
			}
			if (parent !== node) {
				parent.left = replacement.right;
			} else {
				parent.right = replacement.right;
			}
			node.data = replacement.data;
			delete replacement;
			return node;
		}
	};

	const find = (key) => {
		if (isNaN(key)) {
			return 'Please enter a valid key';
		}
		let node = root;
		while (node && key !== node.data) {
			if (key < node.data) {
				node = node.left;
			} else if (key > node.data) {
				node = node.right;
			}
		}

		return node ? node : `Node with key "${key}" not found.`;
	};

	return {
		root,
		printTree: () => prettyPrint(root),
		insert,
		find,
		remove,
	};
}

function buildTree(arr) {
	if (!arr.length) return null;
	const mid = Math.floor(arr.length / 2);
	const node = NodeFactory(arr[mid]);

	node.left = buildTree(arr.slice(0, mid));
	node.right = buildTree(arr.slice(mid + 1));

	return node;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
	}
	console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
	}
};

function arrayGenerator(len) {
	const output = new Set();
	while (output.size < len) {
		output.add(Math.floor(Math.random() * 100) + 1);
	}
	return [...output].sort((a, b) => a - b);
}

const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11];
const testTree = TreeFactory(testArray);
console.log('\nTest Tree from: ');
console.log(testArray);
testTree.printTree();

const randomArray = arrayGenerator(40);
const randomTree = TreeFactory(randomArray);
console.log('\nRandom Tree from:');
console.log(randomArray);
randomTree.printTree();
function TreeFactory(arr) {
	function _NodeFactory(data) {
		return {
			data,
			left: null,
			right: null,
		};
	}

	function _buildTree(arr) {
		if (!arr.length) return null;
		const mid = Math.floor(arr.length / 2);
		const node = _NodeFactory(arr[mid]);

		node.left = _buildTree(arr.slice(0, mid));
		node.right = _buildTree(arr.slice(mid + 1));

		return node;
	}

	const _balanceHeight = (node = root) => {
		if (!node) return 0;

		const leftHeight = _balanceHeight(node.left);
		if (leftHeight === -1) return -1;

		const rightHeight = _balanceHeight(node.right);
		if (rightHeight === -1) return -1;

		return Math.abs(leftHeight - rightHeight) > 1
			? -1
			: Math.max(leftHeight, rightHeight) + 1;
	};

	// Remove duplicates and sort array
	const sorted = new Set(arr.sort((a, b) => a - b));
	let root = _buildTree([...sorted]);

	const insert = (key, node = root) => {
		if (isNaN(key)) return 'Please enter a valid key';
		if (!node) {
			node = _NodeFactory(key);
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

	const find = (key, count = false) => {
		if (isNaN(key)) {
			return 'Please enter a valid key';
		}
		let node = root;
		let depth = 0;
		while (node && key !== node.data) {
			if (key < node.data) {
				node = node.left;
			} else if (key > node.data) {
				node = node.right;
			}
			depth++;
		}
		if (count) {
			return depth;
		} else {
			return node ? node : `Node with key "${key}" not found.`;
		}
	};

	const levelOrder = (cb) => {
		if (!root) return;
		const Q = [];
		const output = [];
		Q.push(root);
		while (!!Q.length) {
			const current = Q.shift();
			if (current.left) Q.push(current.left);
			if (current.right) Q.push(current.right);
			if (cb) {
				cb(current);
			} else {
				output.push(current.data);
			}
		}
		if (!cb) return output;
	};

	const preOrder = (cb, node = root) => {
		if (!node) return;
		if (!cb) {
			return [node.data, preOrder(cb, node.left), preOrder(cb, node.right)]
				.flat()
				.filter((val) => !isNaN(val));
		} else {
			cb(node);
			preOrder(cb, node.left);
			preOrder(cb, node.right);
		}
	};

	const inOrder = (cb, node = root) => {
		if (!node) return;
		if (!cb) {
			return [inOrder(cb, node.left), node.data, inOrder(cb, node.right)]
				.flat()
				.filter((val) => !isNaN(val));
		} else {
			inOrder(cb, node.left);
			cb(node);
			inOrder(cb, node.right);
		}
	};

	const postOrder = (cb, node = root) => {
		if (!node) return;
		if (!cb) {
			return [postOrder(cb, node.left), postOrder(cb, node.right), node.data]
				.flat()
				.filter((val) => !isNaN(val));
		} else {
			postOrder(cb, node.left);
			postOrder(cb, node.right);
			cb(node);
		}
	};

	const height = (node) => {
		if (!node) return -1;
		return Math.max(height(node.left), height(node.right)) + 1;
	};

	const depth = (targetNode) => {
		return find(targetNode.data, true);
	};

	const isBalanced = () => {
		return _balanceHeight() !== -1;
	};

	const rebalance = () => {
		root = _buildTree(inOrder());
	};

	return {
		root,
		printTree: () => prettyPrint(root),
		insert,
		find,
		remove,
		levelOrder,
		preOrder,
		inOrder,
		postOrder,
		height,
		depth,
		isBalanced,
		rebalance,
	};
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
	const output = [];
	while (output.length < len) {
		output.push(Math.floor(Math.random() * 100) + 1);
	}
	return output;
}

function createTestTree() {
	const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const testTree = TreeFactory(testArray);
	console.log('\nTest Tree from: ');
	console.log(testArray);
	testTree.printTree();
	return testTree;
}

// Create and display a random tree
const randomArray = arrayGenerator(10);
const randomTree = TreeFactory(randomArray);
console.log('\nRandom Tree from:');
console.log(randomArray);
randomTree.printTree();
console.log(`Tree is: ${randomTree.isBalanced() ? 'balanced' : 'NOT balanced'}`);

// Test traversal methods
console.log('\nLevel Order:');
console.log(randomTree.levelOrder());
console.log('\nPre Order:');
console.log(randomTree.preOrder());
console.log('\nIn Order:');
console.log(randomTree.inOrder());
console.log('\nPost Order:');
console.log(randomTree.postOrder());

// Unbalance the tree
const unbalancers = arrayGenerator(10)
	.map((num) => num + 101)
	.forEach((num) => {
		randomTree.insert(num);
	});
randomTree.printTree();
console.log(`Tree is: ${randomTree.isBalanced() ? 'balanced' : 'NOT balanced'}`);

// Rebalance it
randomTree.rebalance();
randomTree.printTree();
console.log(`Tree is: ${randomTree.isBalanced() ? 'balanced' : 'NOT balanced'}`);

// Test traversal methods after rebalance
console.log('\nLevel Order:');
console.log(randomTree.levelOrder());
console.log('\nPre Order:');
console.log(randomTree.preOrder());
console.log('\nIn Order:');
console.log(randomTree.inOrder());
console.log('\nPost Order:');
console.log(randomTree.postOrder());

function NodeFactory(data) {
	return {
		data,
		left: null,
		right: null,
	};
}

function TreeFactory(arr) {
	const root = buildTree(arr);
	return {
		root,
		printTree: () => prettyPrint(root),
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

const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const testTree = TreeFactory(testArray);
console.log('\nTest Tree from: ');
console.log(testArray);
testTree.printTree();

const randomArray = arrayGenerator(11);
const randomTree = TreeFactory(randomArray);
console.log('\nRandom Tree from:');
console.log(randomArray);
randomTree.printTree();

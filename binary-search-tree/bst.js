function NodeFactory(data) {
	return {
		data,
		left: null,
		right: null,
	};
}

function arrayGenerator(len) {
	const output = [];
	for (let i = 0; i < len; i++) {
		output.push(Math.floor(Math.random() * 100));
	}
	output.sort((a, b) => a - b);
	return output;
}

const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

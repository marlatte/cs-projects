const Gameboard = (dim) => {
	const coordMap = {};
	for (let x = 0; x < dim; x++) {
		for (let y = 0; y < dim; y++) {
			const coord = [x, y];
			const neighbors = [
				[2, 1],
				[1, 2],
				[-1, 2],
				[-2, 1],
				[-2, -1],
				[-1, -2],
				[1, -2],
				[2, -1],
			]
				.map((coordShift) => [coordShift[0] + x, coordShift[1] + y])
				.filter(
					(pair) =>
						pair[0] >= 0 &&
						pair[0] < dim &&
						pair[1] >= 0 &&
						pair[1] < dim
				);

			coordMap[coord] = neighbors;
		}
	}

	const idLookup = {};
	let i = 0;
	Object.keys(coordMap).forEach((key) => (idLookup[key] = i++));

	const coordLookup = Object.keys(coordMap);

	const idMap = {};
	Object.entries(coordMap).forEach((pair) => {
		idMap[idLookup[pair[0]]] = pair[1].map((coord) => idLookup[coord]);
	});

	return { coordMap, coordLookup, idLookup, idMap };
};

const board = Gameboard(8);

function knightMoves(start, end) {
	const path = knightMovesID(board.idLookup[start], board.idLookup[end])
		.reverse()
		.map((id) => `[${board.coordLookup[id]}]`);

	let output = `You made it in ${path.length - 1} moves! Here's your path:`;
	path.forEach((step) => {
		output += '\n';

		const tabs = path.indexOf(step);
		for (let i = 0; i < tabs; i++) {
			output += '\t';
		}
		output += step;
	});
	return output;
}

function knightMovesID(start, end) {
	if (start === end) return [start];
	const Q = [start];
	let i = 0;
	const output = [];
	const checked = [];

	while (i < 64) {
		let parent = Q.shift();
		let children = board.idMap[parent].filter(
			(child) => !checked.includes(child) && !Q.includes(child)
		);
		let childMatch = children.filter((child) => child === end);
		if (childMatch.length) {
			output.push(end, ...knightMovesID(start, parent));
			return output;
		} else {
			checked.push(parent);
			Q.push(...children);
			i++;
		}
	}
}

let result = knightMoves([0, 0], [7, 7]);
console.log(result);

/*
knight at [3, 3], can move to:
[
	[1, 2],
	[2, 1],
	[4, 1],
	[5, 2],
	[5, 4],
	[4, 5],
	[2, 5],
	[1, 4],
];

Small board version: 
Create a gameboard with dimensions 3x3, [0, 0] to [2, 2]
Make an adjacency list of all possible moves from each spot
Store it as a dictionary:
{
	"[0, 0]": [[1, 2], [2, 1]],
	"[0, 1]": [[2, 0], [2, 2]],
	"[0, 2]": [[2, 1], [1, 0]],
	"[1, 0]": [[2, 2], [0, 2]],
	"[1, 1]": [],
	"[1, 2]": [[0, 0], [2, 0]],
	"[2, 0]": [[1, 2], [0, 1]],
	"[2, 1]": [[0, 2], [0, 0]],
	"[2, 2]": [[0, 1], [1, 0]]
}



When knightMoves(start, end) is called,
	IF start === end return end
	Initiate Q, push start
	WHILE i < 64
		parent = Q.shift()
		IF parent contains end
			output.push(end, knightMoves(start, parent))
			return output
		ELSE
			Q.push(board[parent]);
			i++;
		return

*/

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

	const idMap = {};
	Object.entries(coordMap).forEach((pair) => {
		idMap[idLookup[pair[0]]] = pair[1].map((coord) => idLookup[coord]);
	});
	debugger;

	return { coordMap, idLookup, idMap };
};

const board = Gameboard(8);

console.log(board);
console.log(Object.keys(board));

function knightMoves(start, end) {
	debugger;
	if (start === end) return [start];
	const Q = [];
	Q.push(start);
	let i = 0;
	const output = [];
	const checked = [];

	while (i < 64) {
		let parent = Q.shift();
		let children = board[parent];
		let childMatch = children.filter(
			(child) => child.join(',') === end.join(',')
		);
		if (childMatch.length) {
			output.push(end, ...knightMoves(start, parent));
			return output;
		} else {
			checked.push(parent);
			// let checkNext = children.filter(child => )
			Q.push(...children);
			i++;
		}
	}
}

// let result = knightMoves([0, 0], [7, 7]);
// console.log(result);

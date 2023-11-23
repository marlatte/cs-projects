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
	- initiate queue[start]
	- let step = queue.shift()
	- initiate i = 0
	- while (step !== end && i < 64)
		- add all connected nodes of dictionary[step] to queue
		- i++
	- return i

*/

const Gameboard = (dim) => {
	const obj = {};
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

			obj[coord] = neighbors;
		}
	}
	return obj;
};

const board = Gameboard(3);

console.log(board);

function knightMoves(start, end) {
	debugger;
	const Q = [];
	Q.push([start]);
	let i = 0;

	const getMatch = (step) => {
		return step.filter((current) => current.join(',') === end.join(','));
	};

	while (i < 64) {
		let step = Q.shift();
		const isMatch = getMatch(step);
		if (isMatch.length) {
			return i;
		} else {
			Q.push(board[step]);
			i++;
		}
	}
}

let result = knightMoves([0, 0], [1, 2]);

console.log(result);

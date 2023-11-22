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
	- let current = queue.shift()
	- initiate i = 0
	- while (current !== end && i < 64)
		- add all connected nodes of dictionary[current] to queue
		- i++
	- return i

*/

const Gameboard = (dim) => {
	const obj = {};
	for (let i = 0; i < dim; i++) {
		for (let j = 0; j < dim; j++) {
			const coord = [i, j];
			const neighbors = [];
			// Check all variations of moves and add appropriate ones to neighbors

			obj[coord] = neighbors;
		}
	}
	return obj;
};

// [
// 	[
// 		[0, 0],
// 		[
// 			[1, 2],
// 			[2, 1],
// 		],
// 	],
// 	[
// 		[0, 1],
// 		[
// 			[2, 0],
// 			[2, 2],
// 		],
// 	],
// 	[
// 		[0, 2],
// 		[
// 			[2, 1],
// 			[1, 0],
// 		],
// 	],
// 	[
// 		[1, 0],
// 		[
// 			[2, 2],
// 			[0, 2],
// 		],
// 	],
// 	[[1, 1], []],
// 	[
// 		[1, 2],
// 		[
// 			[0, 0],
// 			[2, 0],
// 		],
// 	],
// 	[
// 		[2, 0],
// 		[
// 			[1, 2],
// 			[0, 1],
// 		],
// 	],
// 	[
// 		[2, 1],
// 		[
// 			[0, 2],
// 			[0, 0],
// 		],
// 	],
// 	[
// 		[2, 2],
// 		[
// 			[0, 1],
// 			[1, 0],
// 		],
// 	],
// ].forEach((pair) => (Gameboard[pair[0]] = pair[1]));

const board = Gameboard(3);

console.log(board);

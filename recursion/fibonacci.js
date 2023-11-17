function fib(n) {
	let seq = [0, 1];
	for (let i = 1; i < n - 1; i++) {
		seq.push(seq[i - 1] + seq[i]);
	}
	return seq.slice(0, n);
}

function fibRec(n) {
	if (n < 3) {
		return [0, 1].slice(0, n);
	} else {
		const oneLower = fibRec(n - 1);
		return [...oneLower, oneLower[n - 2] + oneLower[n - 3]];
	}
}

console.log('\n---\nFib:');
console.log(fib(0)); // []
console.log(fib(1)); // [0]
console.log(fib(8)); // [0, 1, 1, 2, 3, 5, 8, 13]

console.log('\n---\nFib recursive:');
console.log(fibRec(0)); // []
console.log(fibRec(1)); // [0]
console.log(fibRec(8)); // [0, 1, 1, 2, 3, 5, 8, 13]

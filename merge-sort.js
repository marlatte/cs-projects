function merge(left, right) {
	let i = 0,
		j = 0,
		output = [];

	while (i < left.length && j < right.length) {
		if (left[i] <= right[j]) {
			output.push(left[i++]);
		} else {
			output.push(right[j++]);
		}
	}
	for (; i < left.length; i++) {
		output.push(left[i]);
	}
	for (; j < right.length; j++) {
		output.push(right[j]);
	}
	return output;
}

function mergeSort(arr) {
	if (arr.length < 2) {
		return arr;
	} else {
		const midPoint = Math.floor(arr.length / 2);
		let leftHalf = arr.slice(0, midPoint);
		let rightHalf = arr.slice(midPoint);
		return merge(mergeSort(leftHalf), mergeSort(rightHalf));
	}
}

// Test with random numbers
function getRandomArray(len) {
	let output = [];
	for (let i = 0; i < len; i++) {
		output.push(Math.floor(Math.random() * 1000));
	}
	return output;
}

const testArray = [9, 3, 7, 5, 6, 4, 8, 2];
const randomArray = getRandomArray(20);
console.log(mergeSort(testArray));
console.log(mergeSort(randomArray));

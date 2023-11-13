function merge(left, right) {
	let counterL = 0,
		counterR = 0,
		counterM = 0,
		output = [];

	while (counterL < left.length || counterR < right.length) {
		if (left[counterL] <= right[counterR]) {
			output[counterM++] = left[counterL++];
		} else {
			output[counterM++] = right[counterR++];
		}
	}
	for (; counterL < left.length; counterL++) {
		output[counterM++] = left[counterL];
	}
	for (; counterR < right.length; counterR++) {
		output[counterM++] = right[counterR];
	}
	return output;
}

function mergeSort(arr) {
	if (arr.length < 2) {
		return arr;
	} else {
		const midPoint = Math.floor(arr.length / 2);
		// sort left half
		const leftHalf = arr.slice(0, midPoint);
		mergeSort(leftHalf);

		// sort right half
		const rightHalf = arr.slice(midPoint + 1);
		mergeSort(rightHalf);

		// Merge
		return merge(leftHalf, rightHalf);
	}
}

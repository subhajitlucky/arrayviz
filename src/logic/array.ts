export type ArrayOperationResult = {
    newArray: number[];
    log: string;
    highlightIndices: number[]; // Indices to highlight during animation/step
    codeSnippet?: string; // Key to identify which code snippet to show
    searchRange?: { low: number; high: number; mid: number }; // For binary search visualization
}

export const insertAt = (arr: number[], index: number, value: number): ArrayOperationResult => {
    if (index < 0 || index > arr.length) {
        return {
            newArray: arr,
            log: `Error: Index ${index} is out of bounds.`,
            highlightIndices: []
        };
    }
    if (arr.length >= 8) {
        return {
            newArray: arr,
            log: `Error: Array is full (max 8 for visualization).`,
            highlightIndices: []
        };
    }

    const newArr = [...arr];
    // Shift elements to the right to make space
    for (let i = newArr.length; i > index; i--) {
        newArr[i] = newArr[i - 1];
    }
    newArr[index] = value;

    return {
        newArray: newArr,
        log: `Inserted ${value} at index ${index}. Elements from index ${index} shifted right.`,
        highlightIndices: [index],
        codeSnippet: 'insert'
    };
};

export const deleteAt = (arr: number[], index: number): ArrayOperationResult => {
    if (index < 0 || index >= arr.length) {
        return {
            newArray: arr,
            log: `Error: Index ${index} is out of bounds.`,
            highlightIndices: []
        };
    }

    const newArr = [...arr];
    // Shift elements to the left to fill the gap
    for (let i = index; i < newArr.length - 1; i++) {
        newArr[i] = newArr[i + 1];
    }
    newArr.pop(); // Remove the last element (which is now a duplicate or empty)

    return {
        newArray: newArr,
        log: `Deleted element at index ${index}. Elements after index ${index} shifted left.`,
        highlightIndices: [index],
        codeSnippet: 'delete'
    };
};

export const search = (arr: number[], value: number): ArrayOperationResult => {
    const index = arr.indexOf(value);
    if (index === -1) {
        return {
            newArray: arr,
            log: `Value ${value} not found in the array.`,
            highlightIndices: [],
            codeSnippet: 'search'
        };
    }
    return {
        newArray: arr,
        log: `Found value ${value} at index ${index}.`,
        highlightIndices: [index],
        codeSnippet: 'search'
    };
};

export const updateAt = (arr: number[], index: number, value: number): ArrayOperationResult => {
    if (index < 0 || index >= arr.length) {
        return {
            newArray: arr,
            log: `Error: Index ${index} is out of bounds.`,
            highlightIndices: []
        };
    }
    const newArr = [...arr];
    newArr[index] = value;
    return {
        newArray: newArr,
        log: `Updated index ${index} to value ${value}.`,
        highlightIndices: [index],
        codeSnippet: 'update'
    };
};

export const sortArray = (arr: number[]): ArrayOperationResult => {
    const newArr = [...arr].sort((a, b) => a - b);
    return {
        newArray: newArr,
        log: "Array sorted. Required for Binary Search.",
        highlightIndices: [],
        codeSnippet: 'sort'
    };
};

// Generator function to yield steps for visualization
export function* binarySearchSteps(arr: number[], value: number) {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        yield {
            newArray: arr,
            log: `Searching range [${low}, ${high}]. Mid index: ${mid}, Value: ${arr[mid]}`,
            highlightIndices: [mid],
            searchRange: { low, high, mid },
            codeSnippet: 'binarySearch'
        };

        if (arr[mid] === value) {
            yield {
                newArray: arr,
                log: `Found ${value} at index ${mid}!`,
                highlightIndices: [mid],
                searchRange: { low, high, mid },
                codeSnippet: 'binarySearch'
            };
            return;
        } else if (arr[mid] < value) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    yield {
        newArray: arr,
        log: `Value ${value} not found.`,
        highlightIndices: [],
        searchRange: { low, high, mid: -1 },
        codeSnippet: 'binarySearch'
    };
}

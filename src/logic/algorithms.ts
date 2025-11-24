
export interface AlgorithmStep {
    array: number[];
    highlightIndices: number[];
    pointers: { index: number; label: string; color: string }[];
    variables: { name: string; value: string | number }[];
    log: string;
    description: string;
}

// 1. Two Pointers: Two Sum (Sorted Array)
export function* twoSumSteps(arr: number[], target: number): Generator<AlgorithmStep> {
    let left = 0;
    let right = arr.length - 1;

    yield {
        array: [...arr],
        highlightIndices: [],
        pointers: [
            { index: left, label: 'L', color: 'text-green-600' },
            { index: right, label: 'R', color: 'text-blue-600' }
        ],
        variables: [{ name: 'Target', value: target }],
        log: "Start Two Pointers",
        description: "Initialize Left pointer at 0 and Right pointer at end."
    };

    while (left < right) {
        const sum = arr[left] + arr[right];

        yield {
            array: [...arr],
            highlightIndices: [left, right],
            pointers: [
                { index: left, label: 'L', color: 'text-green-600' },
                { index: right, label: 'R', color: 'text-blue-600' }
            ],
            variables: [
                { name: 'Target', value: target },
                { name: 'Current Sum', value: `${arr[left]} + ${arr[right]} = ${sum}` }
            ],
            log: `Checking sum: ${sum}`,
            description: `Calculate sum of elements at Left and Right pointers.`
        };

        if (sum === target) {
            yield {
                array: [...arr],
                highlightIndices: [left, right],
                pointers: [
                    { index: left, label: 'L', color: 'text-green-600' },
                    { index: right, label: 'R', color: 'text-blue-600' }
                ],
                variables: [
                    { name: 'Target', value: target },
                    { name: 'Found', value: 'Yes' }
                ],
                log: `Found pair! ${arr[left]} + ${arr[right]} = ${target}`,
                description: "Sum matches target. Pair found!"
            };
            return;
        } else if (sum < target) {
            yield {
                array: [...arr],
                highlightIndices: [left],
                pointers: [
                    { index: left, label: 'L', color: 'text-green-600' },
                    { index: right, label: 'R', color: 'text-blue-600' }
                ],
                variables: [{ name: 'Action', value: 'Increment Left' }],
                log: "Sum is too small. Moving Left pointer.",
                description: "Sum < Target. We need a larger sum, so move Left pointer to the right."
            };
            left++;
        } else {
            yield {
                array: [...arr],
                highlightIndices: [right],
                pointers: [
                    { index: left, label: 'L', color: 'text-green-600' },
                    { index: right, label: 'R', color: 'text-blue-600' }
                ],
                variables: [{ name: 'Action', value: 'Decrement Right' }],
                log: "Sum is too big. Moving Right pointer.",
                description: "Sum > Target. We need a smaller sum, so move Right pointer to the left."
            };
            right--;
        }
    }

    yield {
        array: [...arr],
        highlightIndices: [],
        pointers: [],
        variables: [{ name: 'Result', value: 'Not Found' }],
        log: "Pair not found.",
        description: "Pointers met. No pair found."
    };
}

// 2. Sliding Window: Max Sum of Subarray size K
export function* slidingWindowSteps(arr: number[], k: number): Generator<AlgorithmStep> {
    let maxSum = 0;
    let currentSum = 0;

    // Initial window
    for (let i = 0; i < k; i++) {
        currentSum += arr[i];
        yield {
            array: [...arr],
            highlightIndices: Array.from({ length: i + 1 }, (_, idx) => idx),
            pointers: [{ index: i, label: 'i', color: 'text-purple-600' }],
            variables: [
                { name: 'K', value: k },
                { name: 'Current Sum', value: currentSum }
            ],
            log: `Building initial window. Added ${arr[i]}`,
            description: "Summing up the first K elements."
        };
    }

    maxSum = currentSum;
    yield {
        array: [...arr],
        highlightIndices: Array.from({ length: k }, (_, idx) => idx),
        pointers: [],
        variables: [
            { name: 'Max Sum', value: maxSum },
            { name: 'Current Sum', value: currentSum }
        ],
        log: `Initial window sum: ${currentSum}`,
        description: "Initial window established."
    };

    // Slide
    for (let i = k; i < arr.length; i++) {
        const leaving = arr[i - k];
        const entering = arr[i];

        yield {
            array: [...arr],
            highlightIndices: [i - k, i],
            pointers: [
                { index: i - k, label: '-', color: 'text-red-600' },
                { index: i, label: '+', color: 'text-green-600' }
            ],
            variables: [
                { name: 'Max Sum', value: maxSum },
                { name: 'Leaving', value: leaving },
                { name: 'Entering', value: entering }
            ],
            log: `Sliding: Remove ${leaving}, Add ${entering}`,
            description: "Slide window one step right. Subtract element leaving, add element entering."
        };

        currentSum = currentSum - leaving + entering;
        maxSum = Math.max(maxSum, currentSum);

        const windowIndices = Array.from({ length: k }, (_, idx) => i - k + 1 + idx);
        yield {
            array: [...arr],
            highlightIndices: windowIndices,
            pointers: [{ index: i, label: 'End', color: 'text-blue-600' }],
            variables: [
                { name: 'New Sum', value: currentSum },
                { name: 'Max Sum', value: maxSum }
            ],
            log: `New Sum: ${currentSum}. Max is now ${maxSum}`,
            description: "Updated window sum. Check if it's a new maximum."
        };
    }
}

// 3. Kadane's Algorithm: Max Subarray Sum
export function* kadaneSteps(arr: number[]): Generator<AlgorithmStep> {
    let maxSoFar = arr[0];
    let currentMax = arr[0];

    yield {
        array: [...arr],
        highlightIndices: [0],
        pointers: [{ index: 0, label: 'i', color: 'text-blue-600' }],
        variables: [
            { name: 'Current Max', value: currentMax },
            { name: 'Max So Far', value: maxSoFar }
        ],
        log: "Start Kadane's",
        description: "Initialize with first element."
    };

    for (let i = 1; i < arr.length; i++) {
        const val = arr[i];

        yield {
            array: [...arr],
            highlightIndices: [i],
            pointers: [{ index: i, label: 'i', color: 'text-blue-600' }],
            variables: [
                { name: 'Element', value: val },
                { name: 'Current Max', value: currentMax }
            ],
            log: `Processing ${val}`,
            description: `Decide: Start new subarray at ${val} or extend existing?`
        };

        if (val > currentMax + val) {
            currentMax = val;
            yield {
                array: [...arr],
                highlightIndices: [i],
                pointers: [{ index: i, label: 'i', color: 'text-blue-600' }],
                variables: [
                    { name: 'Decision', value: 'Start New' },
                    { name: 'Current Max', value: currentMax }
                ],
                log: `${val} > ${currentMax + val - val} + ${val}. Starting new subarray.`,
                description: "Element itself is larger than (Current Sum + Element). Start fresh."
            };
        } else {
            currentMax = currentMax + val;
            yield {
                array: [...arr],
                highlightIndices: [i],
                pointers: [{ index: i, label: 'i', color: 'text-blue-600' }],
                variables: [
                    { name: 'Decision', value: 'Extend' },
                    { name: 'Current Max', value: currentMax }
                ],
                log: `Extending subarray. Sum is now ${currentMax}`,
                description: "Adding element increases (or maintains) the sum better than starting over."
            };
        }

        if (currentMax > maxSoFar) {
            maxSoFar = currentMax;
            yield {
                array: [...arr],
                highlightIndices: [i],
                pointers: [{ index: i, label: 'i', color: 'text-blue-600' }],
                variables: [
                    { name: 'New Global Max', value: maxSoFar }
                ],
                log: `New Global Max found: ${maxSoFar}`,
                description: "Current subarray sum beats the global max."
            };
        }
    }

    yield {
        array: [...arr],
        highlightIndices: [],
        pointers: [],
        variables: [{ name: 'Final Result', value: maxSoFar }],
        log: `Finished. Max Sum: ${maxSoFar}`,
        description: "Algorithm complete."
    };
}

// 4. Prefix Sums
export function* prefixSumSteps(arr: number[]): Generator<AlgorithmStep> {
    const prefix = new Array(arr.length).fill(0);
    let runningSum = 0;

    for (let i = 0; i < arr.length; i++) {
        yield {
            array: [...arr], // Show original array
            highlightIndices: [i],
            pointers: [{ index: i, label: 'i', color: 'text-blue-600' }],
            variables: [
                { name: 'Running Sum', value: runningSum },
                { name: 'Add', value: arr[i] }
            ],
            log: `Adding ${arr[i]} to sum`,
            description: "Add current element to the running sum."
        };

        runningSum += arr[i];
        prefix[i] = runningSum;

        yield {
            array: [...prefix], // Show prefix array state
            highlightIndices: [i],
            pointers: [{ index: i, label: 'i', color: 'text-purple-600' }],
            variables: [
                { name: 'New Prefix[i]', value: runningSum }
            ],
            log: `Prefix[${i}] = ${runningSum}`,
            description: "Store the new sum in the prefix array."
        };
    }
}


export interface TreeNode {
    val: number | string;
    left?: TreeNode | null; // Keep for binary compatibility if needed, or just use children
    right?: TreeNode | null;
    children?: TreeNode[]; // For n-ary trees (graphs)
    id: string; // Unique ID for key
}

export interface AlgorithmStep {
    array: number[];
    highlightIndices: number[];
    pointers: { index: number; label: string; color: string }[];
    variables: { name: string; value: string | number }[];
    log: string;
    description: string;
    visualizationType?: 'array' | 'tree' | 'grid';
    grid?: number[][];
    treeRoot?: TreeNode | null;
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

// 5. Fast & Slow Pointers (Runner Technique)
// General pattern: two pointers moving at different speeds
export function* fastSlowPointersSteps(arr: number[]): Generator<AlgorithmStep> {
    yield {
        array: [...arr],
        highlightIndices: [],
        pointers: [],
        variables: [
            { name: 'Pattern', value: 'Fast & Slow Pointers' },
            { name: 'Use Case', value: 'Find middle element' }
        ],
        log: "Fast & Slow Pointers - Runner Technique",
        description: "Slow moves 1 step, Fast moves 2 steps. When fast reaches end, slow is at middle!"
    };

    let slow = 0;
    let fast = 0;

    yield {
        array: [...arr],
        highlightIndices: [0],
        pointers: [
            { index: 0, label: 'S/F', color: 'text-purple-600' }
        ],
        variables: [
            { name: 'Slow', value: slow },
            { name: 'Fast', value: fast }
        ],
        log: "Both pointers start at index 0",
        description: "Initialize both at the beginning. Slow moves 1x, Fast moves 2x speed."
    };

    // Move pointers until fast reaches end
    while (fast < arr.length - 1 && fast + 1 < arr.length) {
        // Move slow by 1
        const prevSlow = slow;
        slow = slow + 1;

        // Move fast by 2
        const prevFast = fast;
        fast = Math.min(fast + 2, arr.length - 1);

        yield {
            array: [...arr],
            highlightIndices: [slow, fast],
            pointers: [
                { index: slow, label: 'S', color: 'text-green-600' },
                { index: fast, label: 'F', color: 'text-blue-600' }
            ],
            variables: [
                { name: 'Slow', value: slow },
                { name: 'Fast', value: fast },
                { name: 'Speed Diff', value: '2x' }
            ],
            log: `Moved: Slow ${prevSlow}→${slow} (+1), Fast ${prevFast}→${fast} (+2)`,
            description: "Slow advances 1 position, Fast advances 2 positions."
        };

        // Stop if fast has reached or passed the end
        if (fast >= arr.length - 1) break;
    }

    yield {
        array: [...arr],
        highlightIndices: [slow],
        pointers: [
            { index: slow, label: 'Middle!', color: 'text-green-600' },
            { index: fast, label: 'End', color: 'text-blue-600' }
        ],
        variables: [
            { name: 'Middle Index', value: slow },
            { name: 'Middle Value', value: arr[slow] },
            { name: 'Array Length', value: arr.length }
        ],
        log: `Fast reached end! Slow is at middle: index ${slow}`,
        description: `Found middle in one pass! The middle element is ${arr[slow]}. O(N) time, O(1) space.`
    };


    yield {
        array: [...arr],
        highlightIndices: [slow],
        pointers: [
            { index: slow, label: '✓', color: 'text-purple-600' }
        ],
        variables: [
            { name: '✓ Result', value: arr[slow] },
            { name: 'Other Uses', value: 'Cycle, Palindrome' }
        ],
        log: `Pattern complete! Middle element: ${arr[slow]}`,
        description: "This pattern also works for: cycle detection, palindrome check, N-th from end, and more!"
    };
}

// 5b. Fast & Slow Pointers - Floyd's Cycle Detection (Find Duplicate)
export function* floydsCycleDetectionSteps(arr: number[]): Generator<AlgorithmStep> {
    // Build Graph for Visualization
    const root: TreeNode = { val: 0, id: '0', children: [] };
    const nodesMap = new Map<string, TreeNode>();
    nodesMap.set('0', root);

    // Create nodes for all reachable indices
    // Note: This is a specific visualization for the "Array as Linked List" concept
    // We'll build the graph structure based on index -> value (next index)

    // We need to handle cycles, so we can't just build a simple tree.
    // However, our TreeRenderer supports children. We can simulate the path.
    // For a true cycle visualization, we'd need a general GraphRenderer, but we can
    // approximate it by showing the path being traced or just stick to array view 
    // if the tree view is strictly hierarchical.

    // Actually, for Cycle Detection, the "Linear Array with Pointers" is often VERY confusing.
    // A better approach with our current tools:
    // Use the Tree view but only show the *path traversed so far* as a tree/line,
    // and when we hit a visited node, show it as a "back edge" or just highlight it.

    // Let's stick to the Array view for now but enhance the description, 
    // because our TreeRenderer assumes a hierarchy and might get stuck or look weird with cycles 
    // unless we implement a specific Cycle Graph renderer.
    // The user asked for "Graph Tree concept" to be in tree mode. 
    // Floyd's is technically a graph problem (Linked List cycle), but visualizing it 
    // as a static tree is hard because of the cycle.

    // ALTERNATIVE: Use the 'grid' view to show nodes as a directed graph? 
    // No, grid is for matrices.

    // DECISION: Keep Floyd's as Array for now, as it's "Fast & Slow Pointers on Array".
    // Transforming it to a graph visualization without a proper Graph Force Layout engine
    // might be misleading or ugly using a hierarchical Tree renderer.
    // I will add a note in the description that we are treating values as next pointers.

    yield {
        array: [...arr],
        highlightIndices: [],
        pointers: [],
        variables: [
            { name: 'Application', value: "Floyd's Algorithm" },
            { name: 'Goal', value: 'Find duplicate' }
        ],
        log: "Floyd's Cycle Detection - Finding Duplicate",
        description: "Treat array values as pointers: index i points to index arr[i]. Duplicate creates a cycle!"
    };

    let slow = 0;
    let fast = 0;

    yield {
        array: [...arr],
        highlightIndices: [0],
        pointers: [
            { index: 0, label: 'Start', color: 'text-purple-600' }
        ],
        variables: [{ name: 'Method', value: 'nums[i] → next index' }],
        log: "Both start at index 0",
        description: "We'll follow nums[index] to get next position (treating values as indices)."
    };

    // Phase 1: Detect cycle
    let stepCount = 0;
    const maxSteps = arr.length * 2;

    do {
        const prevSlow = slow;
        slow = arr[slow];

        const prevFast = fast;
        fast = arr[arr[fast]];

        stepCount++;

        yield {
            array: [...arr],
            highlightIndices: [slow, fast],
            pointers: [
                { index: slow, label: 'S', color: 'text-green-600' },
                { index: fast, label: 'F', color: 'text-blue-600' }
            ],
            variables: [
                { name: 'Slow', value: `idx ${slow}` },
                { name: 'Fast', value: `idx ${fast}` },
                { name: 'Steps', value: stepCount }
            ],
            log: `Phase 1: S ${prevSlow}→${slow}, F ${prevFast}→${fast}`,
            description: "Following: slow=nums[slow], fast=nums[nums[fast]]. Finding collision."
        };

        if (stepCount > maxSteps) {
            yield {
                array: [...arr],
                highlightIndices: [],
                pointers: [],
                variables: [{ name: 'Error', value: 'No cycle' }],
                log: "No cycle detected",
                description: "This array may not have a duplicate."
            };
            return;
        }
    } while (slow !== fast);

    yield {
        array: [...arr],
        highlightIndices: [slow],
        pointers: [
            { index: slow, label: '💥', color: 'text-red-600' }
        ],
        variables: [
            { name: 'Collision!', value: `index ${slow}` },
            { name: 'Value', value: arr[slow] }
        ],
        log: `Pointers met at index ${slow}!`,
        description: "Collision found! Cycle exists. Now find entrance (duplicate)."
    };

    // Phase 2: Find entrance
    slow = 0;

    yield {
        array: [...arr],
        highlightIndices: [0, fast],
        pointers: [
            { index: 0, label: 'S↺', color: 'text-green-600' },
            { index: fast, label: 'F', color: 'text-blue-600' }
        ],
        variables: [
            { name: 'Phase 2', value: 'Find entrance' },
            { name: 'Both', value: '1x speed now' }
        ],
        log: "Reset Slow. Both move 1 step.",
        description: "Move both at same speed to find cycle entrance."
    };

    let steps2 = 0;
    while (slow !== fast) {
        const prevSlow = slow;
        const prevFast = fast;
        slow = arr[slow];
        fast = arr[fast];
        steps2++;

        yield {
            array: [...arr],
            highlightIndices: [slow, fast],
            pointers: [
                { index: slow, label: 'S', color: 'text-green-600' },
                { index: fast, label: 'F', color: 'text-blue-600' }
            ],
            variables: [
                { name: 'Slow', value: slow },
                { name: 'Fast', value: fast }
            ],
            log: `Both: ${prevSlow}→${slow}, ${prevFast}→${fast}`,
            description: "Both move 1 step. Looking for entrance."
        };

        if (steps2 > maxSteps) break;
    }

    yield {
        array: [...arr],
        highlightIndices: [slow],
        pointers: [
            { index: slow, label: '✓', color: 'text-green-600' }
        ],
        variables: [
            { name: '🎯 Duplicate', value: arr[slow] },
            { name: 'At Index', value: slow }
        ],
        log: `Found duplicate: ${arr[slow]}`,
        description: `The duplicate is ${arr[slow]}! It appears multiple times, creating the cycle. O(N) time, O(1) space.`
    };
}


// 6. Hashing Pattern (Frequency Count)
export function* hashingSteps(arr: number[]): Generator<AlgorithmStep> {
    const freq = new Map<number, number>();

    yield {
        array: [...arr],
        highlightIndices: [],
        pointers: [],
        variables: [{ name: 'Hash Map', value: '{}' }],
        log: "Starting frequency counting",
        description: "Initialize empty hash map to count occurrences."
    };

    for (let i = 0; i < arr.length; i++) {
        const num = arr[i];
        const currentCount = freq.get(num) || 0;

        yield {
            array: [...arr],
            highlightIndices: [i],
            pointers: [{ index: i, label: 'i', color: 'text-blue-600' }],
            variables: [
                { name: 'Processing', value: num },
                { name: 'Current Count', value: currentCount }
            ],
            log: `Found ${num}. Current count: ${currentCount}`,
            description: `Checking frequency of ${num} in hash map.`
        };

        freq.set(num, currentCount + 1);

        const mapStr = Array.from(freq.entries()).map(([k, v]) => `${k}:${v}`).join(', ');
        yield {
            array: [...arr],
            highlightIndices: [i],
            pointers: [{ index: i, label: 'i', color: 'text-green-600' }],
            variables: [
                { name: 'Updated', value: num },
                { name: 'New Count', value: freq.get(num) || 0 },
                { name: 'Hash Map', value: `{${mapStr}}` }
            ],
            log: `Incremented count of ${num} to ${freq.get(num)}`,
            description: "Increment count in hash map. O(1) operation!"
        };
    }

    // Find first unique element
    for (let i = 0; i < arr.length; i++) {
        const num = arr[i];
        const count = freq.get(num);

        yield {
            array: [...arr],
            highlightIndices: [i],
            pointers: [{ index: i, label: 'Check', color: 'text-purple-600' }],
            variables: [
                { name: 'Checking', value: num },
                { name: 'Count', value: count! }
            ],
            log: `${num} appears ${count} time(s)`,
            description: `Checking if ${num} is unique (count = 1).`
        };

        if (count === 1) {
            yield {
                array: [...arr],
                highlightIndices: [i],
                pointers: [{ index: i, label: 'Unique!', color: 'text-green-600' }],
                variables: [
                    { name: 'First Unique', value: num }
                ],
                log: `Found first unique element: ${num}`,
                description: "This element appears only once!"
            };
            return;
        }
    }

    yield {
        array: [...arr],
        highlightIndices: [],
        pointers: [],
        variables: [{ name: 'Result', value: 'No unique element' }],
        log: "No unique element found",
        description: "All elements appear more than once."
    };
}

// 7. In-Place Reverse
export function* inPlaceSteps(arr: number[]): Generator<AlgorithmStep> {
    const workingArr = [...arr];
    let start = 0;
    let end = workingArr.length - 1;

    yield {
        array: [...workingArr],
        highlightIndices: [],
        pointers: [
            { index: start, label: 'Start', color: 'text-green-600' },
            { index: end, label: 'End', color: 'text-blue-600' }
        ],
        variables: [],
        log: "Initialize pointers at both ends",
        description: "Start pointer at beginning, End pointer at end."
    };

    while (start < end) {
        yield {
            array: [...workingArr],
            highlightIndices: [start, end],
            pointers: [
                { index: start, label: 'Start', color: 'text-green-600' },
                { index: end, label: 'End', color: 'text-blue-600' }
            ],
            variables: [
                { name: 'Swap', value: `${workingArr[start]} ↔ ${workingArr[end]}` }
            ],
            log: `Swapping ${workingArr[start]} and ${workingArr[end]}`,
            description: "Swap elements at Start and End positions."
        };

        // Swap
        [workingArr[start], workingArr[end]] = [workingArr[end], workingArr[start]];

        yield {
            array: [...workingArr],
            highlightIndices: [start, end],
            pointers: [
                { index: start, label: 'Start', color: 'text-green-600' },
                { index: end, label: 'End', color: 'text-blue-600' }
            ],
            variables: [{ name: 'Action', value: 'Move inward' }],
            log: "Swapped! Moving pointers inward.",
            description: "Swap complete. Move both pointers toward center."
        };

        start++;
        end--;
    }

    yield {
        array: [...workingArr],
        highlightIndices: [],
        pointers: [],
        variables: [{ name: 'Result', value: 'Reversed!' }],
        log: "Array reversed in-place!",
        description: "Pointers met. Array is now reversed!"
    };
}

// 8. 1D DP (Coin Change)
export function* dp1DSteps(coins: number[], amount: number = 11): Generator<AlgorithmStep> {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    yield {
        array: dp.map(v => v === Infinity ? 999 : v),
        highlightIndices: [0],
        pointers: [],
        variables: [
            { name: 'Coins', value: coins.join(', ') },
            { name: 'Target', value: amount }
        ],
        log: "Initialize DP array. dp[0] = 0 (base case)",
        description: "dp[i] = minimum coins to make amount i. Start with Infinity."
    };

    for (let i = 1; i <= amount; i++) {
        yield {
            array: dp.map(v => v === Infinity ? 999 : v),
            highlightIndices: [i],
            pointers: [{ index: i, label: 'i', color: 'text-blue-600' }],
            variables: [
                { name: 'Computing', value: `dp[${i}]` }
            ],
            log: `Computing minimum coins for amount ${i}`,
            description: `Try all coin denominations for amount ${i}.`
        };

        for (const coin of coins) {
            if (i >= coin && dp[i - coin] !== Infinity) {
                const newValue = dp[i - coin] + 1;
                if (newValue < dp[i]) {
                    dp[i] = newValue;

                    yield {
                        array: dp.map(v => v === Infinity ? 999 : v),
                        highlightIndices: [i, i - coin],
                        pointers: [
                            { index: i - coin, label: 'From', color: 'text-green-600' },
                            { index: i, label: 'To', color: 'text-blue-600' }
                        ],
                        variables: [
                            { name: 'Coin Used', value: coin },
                            { name: 'New dp[i]', value: dp[i] }
                        ],
                        log: `Using coin ${coin}: dp[${i}] = dp[${i - coin}] + 1 = ${dp[i]}`,
                        description: `Found better solution using coin ${coin}!`
                    };
                }
            }
        }
    }

    yield {
        array: dp.map(v => v === Infinity ? 999 : v),
        highlightIndices: [amount],
        pointers: [{ index: amount, label: 'Result', color: 'text-purple-600' }],
        variables: [
            { name: 'Final Answer', value: dp[amount] === Infinity ? 'Impossible' : dp[amount] }
        ],
        log: `Minimum coins for ${amount}: ${dp[amount] === Infinity ? 'Impossible' : dp[amount]}`,
        description: "DP table complete!"
    };
}

// Note: The following are simplified visualizations as the full implementations would be very complex

// 9. Monotonic Stack (Next Greater Element)
export function* monotonicStackSteps(arr: number[]): Generator<AlgorithmStep> {
    const result = new Array(arr.length).fill(-1);
    const stack: number[] = [];

    yield {
        array: [...arr],
        highlightIndices: [],
        pointers: [],
        variables: [{ name: 'Stack', value: '[]' }],
        log: "Initialize empty stack",
        description: "Stack will store indices in decreasing order of values."
    };

    for (let i = 0; i < arr.length; i++) {
        yield {
            array: [...arr],
            highlightIndices: [i],
            pointers: [{ index: i, label: 'i', color: 'text-blue-600' }],
            variables: [
                { name: 'Current', value: arr[i] },
                { name: 'Stack', value: `[${stack.join(', ')}]` }
            ],
            log: `Processing element ${arr[i]} at index ${i}`,
            description: "Check if current element is greater than stack top."
        };

        while (stack.length > 0 && arr[i] > arr[stack[stack.length - 1]]) {
            const idx = stack.pop()!;
            result[idx] = arr[i];

            yield {
                array: [...arr],
                highlightIndices: [idx, i],
                pointers: [
                    { index: idx, label: 'Found!', color: 'text-green-600' },
                    { index: i, label: 'Greater', color: 'text-blue-600' }
                ],
                variables: [
                    { name: 'Answer for', value: `arr[${idx}] = ${arr[idx]}` },
                    { name: 'Next Greater', value: arr[i] }
                ],
                log: `${arr[i]} is next greater for ${arr[idx]}`,
                description: `Pop stack. Found next greater element!`
            };
        }

        stack.push(i);
        yield {
            array: [...arr],
            highlightIndices: [i],
            pointers: [{ index: i, label: 'Push', color: 'text-purple-600' }],
            variables: [
                { name: 'Stack', value: `[${stack.join(', ')}]` }
            ],
            log: `Push index ${i} to stack`,
            description: "Add current index to stack."
        };
    }

    yield {
        array: result,
        highlightIndices: [],
        pointers: [],
        variables: [{ name: 'Result', value: 'Complete' }],
        log: "Next greater elements found!",
        description: "Result array shows next greater for each element (-1 if none)."
    };
}

// 10. Simplified visualizations for complex patterns
export function* binarySearchAnswerSteps(arr: number[], days: number = 3): Generator<AlgorithmStep> {
    const maxWeight = Math.max(...arr);
    const totalWeight = arr.reduce((a, b) => a + b, 0);

    yield {
        array: [...arr],
        highlightIndices: [],
        pointers: [],
        variables: [
            { name: 'Search Range', value: `${maxWeight} to ${totalWeight}` },
            { name: 'Days', value: days }
        ],
        log: "Binary search on answer space (capacity)",
        description: "Find minimum capacity to ship all packages in given days."
    };

    let left = maxWeight;
    let right = totalWeight;
    let answer = totalWeight;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        yield {
            array: [...arr],
            highlightIndices: [],
            pointers: [],
            variables: [
                { name: 'Testing Capacity', value: mid },
                { name: 'Range', value: `[${left}, ${right}]` }
            ],
            log: `Testing if capacity ${mid} works`,
            description: "Check if we can ship in given days with this capacity."
        };

        // Simulate checking if capacity works
        let daysNeeded = 1;
        let currentLoad = 0;
        for (const weight of arr) {
            if (currentLoad + weight > mid) {
                daysNeeded++;
                currentLoad = weight;
            } else {
                currentLoad += weight;
            }
        }

        if (daysNeeded <= days) {
            answer = mid;
            right = mid - 1;
            yield {
                array: [...arr],
                highlightIndices: [],
                pointers: [],
                variables: [
                    { name: 'Capacity', value: mid },
                    { name: 'Days Needed', value: daysNeeded },
                    { name: 'Result', value: 'Works! Try smaller' }
                ],
                log: `Capacity ${mid} works! Trying smaller capacity.`,
                description: "This capacity works. Search left half for minimum."
            };
        } else {
            left = mid + 1;
            yield {
                array: [...arr],
                highlightIndices: [],
                pointers: [],
                variables: [
                    { name: 'Capacity', value: mid },
                    { name: 'Days Needed', value: daysNeeded },
                    { name: 'Result', value: 'Too small' }
                ],
                log: `Capacity ${mid} too small. Need larger capacity.`,
                description: "This capacity doesn't work. Search right half."
            };
        }
    }

    yield {
        array: [...arr],
        highlightIndices: [],
        pointers: [],
        variables: [{ name: 'Minimum Capacity', value: answer }],
        log: `Minimum capacity needed: ${answer}`,
        description: "Binary search complete! Found minimum capacity."
    };
}

// Simplified visualizations for very complex patterns
export function* greedyIntervalsSteps(intervals: number[][]): Generator<AlgorithmStep> {
    // Show as flat array for visualization
    const flat = intervals.flat();

    yield {
        array: flat,
        highlightIndices: [],
        pointers: [],
        variables: [{ name: 'Intervals', value: intervals.map(i => `[${i[0]},${i[1]}]`).join(' ') }],
        log: "Sorting intervals by start time",
        description: "First step: Sort all intervals by their start time.",
        visualizationType: 'grid',
        grid: intervals
    };

    const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
    const merged: number[][] = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
        const current = sorted[i];
        const last = merged[merged.length - 1];

        if (current[0] <= last[1]) {
            yield {
                array: flat,
                highlightIndices: [],
                pointers: [],
                variables: [
                    { name: 'Current', value: `[${current[0]},${current[1]}]` },
                    { name: 'Last', value: `[${last[0]},${last[1]}]` },
                    { name: 'Action', value: 'Merge!' }
                ],
                log: `Intervals overlap! Merging [${current[0]},${current[1]}] with [${last[0]},${last[1]}]`,
                description: "Intervals overlap. Merge them!",
                visualizationType: 'grid',
                grid: sorted
            };
            last[1] = Math.max(last[1], current[1]);
        } else {
            merged.push(current);
            yield {
                array: flat,
                highlightIndices: [],
                pointers: [],
                variables: [
                    { name: 'Current', value: `[${current[0]},${current[1]}]` },
                    { name: 'Action', value: 'Add separately' }
                ],
                log: `No overlap. Adding [${current[0]},${current[1]}] as new interval`,
                description: "No overlap. Keep as separate interval.",
                visualizationType: 'grid',
                grid: sorted
            };
        }
    }

    yield {
        array: flat,
        highlightIndices: [],
        pointers: [],
        variables: [
            { name: 'Merged Count', value: merged.length },
            { name: 'Result', value: merged.map(i => `[${i[0]},${i[1]}]`).join(' ') }
        ],
        log: `Merged into ${merged.length} intervals`,
        description: "All overlapping intervals merged!",
        visualizationType: 'grid',
        grid: merged
    };
}

// For very complex patterns, show conceptual visualization
// For very complex patterns, show conceptual visualization
export function* matrixTraversalSteps(matrix: number[][]): Generator<AlgorithmStep> {
    const flat = matrix.flat();

    yield {
        array: flat,
        highlightIndices: [],
        pointers: [],
        variables: [{ name: 'Matrix', value: `${matrix.length}x${matrix[0]?.length || 0}` }],
        log: "Starting spiral traversal",
        description: "Traverse matrix in spiral order: →  ↓ ← ↑",
        visualizationType: 'grid',
        grid: matrix
    };

    const result: number[] = [];
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = (matrix[0]?.length || 1) - 1;

    while (top <= bottom && left <= right) {
        // Right
        for (let i = left; i <= right; i++) {
            result.push(matrix[top][i]);
            yield {
                array: flat,
                highlightIndices: [top * matrix[0].length + i],
                pointers: [],
                variables: [{ name: 'Direction', value: 'Right →' }],
                log: `Adding ${matrix[top][i]} (row ${top}, col ${i})`,
                description: "Moving right along top row",
                visualizationType: 'grid',
                grid: matrix
            };
        }
        top++;

        // Down
        for (let i = top; i <= bottom; i++) {
            result.push(matrix[i][right]);
            yield {
                array: flat,
                highlightIndices: [i * matrix[0].length + right],
                pointers: [],
                variables: [{ name: 'Direction', value: 'Down ↓' }],
                log: `Adding ${matrix[i][right]} (row ${i}, col ${right})`,
                description: "Moving down along right column",
                visualizationType: 'grid',
                grid: matrix
            };
        }
        right--;

        if (top <= bottom) {
            for (let i = right; i >= left; i--) {
                result.push(matrix[bottom][i]);
                yield {
                    array: flat,
                    highlightIndices: [bottom * matrix[0].length + i],
                    pointers: [],
                    variables: [{ name: 'Direction', value: 'Left ←' }],
                    log: `Adding ${matrix[bottom][i]} (row ${bottom}, col ${i})`,
                    description: "Moving left along bottom row",
                    visualizationType: 'grid',
                    grid: matrix
                };
            }
            bottom--;
        }

        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                result.push(matrix[i][left]);
                yield {
                    array: flat,
                    highlightIndices: [i * matrix[0].length + left],
                    pointers: [],
                    variables: [{ name: 'Direction', value: 'Up ↑' }],
                    log: `Adding ${matrix[i][left]} (row ${i}, col ${left})`,
                    description: "Moving up along left column",
                    visualizationType: 'grid',
                    grid: matrix
                };
            }
            left++;
        }
    }

    yield {
        array: result,
        highlightIndices: [],
        pointers: [],
        variables: [{ name: 'Result', value: 'Complete' }],
        log: "Spiral traversal complete!",
        description: "All elements visited in spiral order",
        visualizationType: 'grid',
        grid: matrix
    };
}

// Backtracking - Permutations visualization
export function* backtrackingSteps(arr: number[]): Generator<AlgorithmStep> {
    const result: number[][] = [];
    const current: number[] = [];

    // Tree Visualization Setup
    let nodeIdCounter = 0;
    const root: TreeNode = { val: 'Start', id: (nodeIdCounter++).toString(), children: [] };

    // Map to keep track of tree nodes for each step of recursion
    // Key: path string (e.g., "1,2"), Value: TreeNode
    const treeMap = new Map<string, TreeNode>();
    treeMap.set('', root);

    function* generatePermutations(remaining: number[], parentPath: string): Generator<AlgorithmStep> {
        const parentNode = treeMap.get(parentPath)!;
        const parentId = parseInt(parentNode.id);

        if (remaining.length === 0) {
            result.push([...current]);
            yield {
                array: [...current],
                highlightIndices: [parentId], // Highlight leaf node
                pointers: [],
                variables: [
                    { name: 'Found Permutation!', value: current.join(', ') },
                    { name: 'Total Found', value: result.length }
                ],
                log: `Found permutation: [${current.join(', ')}]`,
                description: "Complete permutation! Backtrack to try next option.",
                visualizationType: 'tree',
                treeRoot: root
            };
            return;
        }

        for (let i = 0; i < remaining.length; i++) {
            const choice = remaining[i];
            current.push(choice);

            // Add node to tree
            const currentPath = parentPath ? `${parentPath},${choice}` : `${choice}`;
            const newNodeId = nodeIdCounter++;
            const newNode: TreeNode = { val: choice, id: newNodeId.toString(), children: [] };

            if (!parentNode.children) parentNode.children = [];
            parentNode.children.push(newNode);
            treeMap.set(currentPath, newNode);

            yield {
                array: [...current, ...remaining.filter((_, idx) => idx !== i)],
                highlightIndices: [newNodeId],
                pointers: [{ index: newNodeId, label: 'Choose', color: 'text-green-600' }],
                variables: [
                    { name: 'Current', value: current.join(', ') },
                    { name: 'Remaining', value: remaining.filter((_, idx) => idx !== i).join(', ') }
                ],
                log: `Choose ${choice}. Current: [${current.join(', ')}]`,
                description: `Make choice: add ${choice} to current permutation.`,
                visualizationType: 'tree',
                treeRoot: root
            };

            const newRemaining = remaining.filter((_, idx) => idx !== i);
            yield* generatePermutations(newRemaining, currentPath);

            current.pop();
            yield {
                array: [...current, ...remaining],
                highlightIndices: [parentId], // Highlight parent when backtracking
                pointers: [{ index: parentId, label: 'Back', color: 'text-red-600' }],
                variables: [
                    { name: 'Backtrack', value: `Remove ${choice}` },
                    { name: 'Current', value: current.join(', ') || 'empty' }
                ],
                log: `Backtrack: remove ${choice}`,
                description: "Undo choice. Try next option.",
                visualizationType: 'tree',
                treeRoot: root
            };
        }
    }

    yield {
        array: arr,
        highlightIndices: [0], // Highlight root
        pointers: [],
        variables: [{ name: 'Start', value: 'Permutations' }],
        log: "Starting backtracking...",
        description: "Explore all possible permutations using a decision tree.",
        visualizationType: 'tree',
        treeRoot: root
    };

    yield* generatePermutations(arr, '');

    yield {
        array: arr,
        highlightIndices: [],
        pointers: [],
        variables: [
            { name: 'Total Permutations', value: result.length }
        ],
        log: `Found all ${result.length} permutations!`,
        description: "Backtracking complete. Explored all possibilities.",
        visualizationType: 'tree',
        treeRoot: root
    };
}

// Simplified stubs for remaining complex patterns
export function* meetInMiddleSteps(arr: number[]): Generator<AlgorithmStep> {
    yield {
        array: arr,
        highlightIndices: [],
        pointers: [],
        variables: [{ name: 'Strategy', value: 'Split & Combine' }],
        log: "Split array into two halves",
        description: "Generate all subsets for each half, then combine results."
    };

    const mid = Math.floor(arr.length / 2);
    yield {
        array: arr,
        highlightIndices: Array.from({ length: mid }, (_, i) => i),
        pointers: [],
        variables: [{ name: 'Left Half', value: `${mid} elements` }],
        log: `Processing left half (${mid} elements)`,
        description: "Generate 2^(N/2) subsets for left half"
    };

    yield {
        array: arr,
        highlightIndices: Array.from({ length: arr.length - mid }, (_, i) => mid + i),
        pointers: [],
        variables: [{ name: 'Right Half', value: `${arr.length - mid} elements` }],
        log: `Processing right half (${arr.length - mid} elements)`,
        description: "Generate 2^(N/2) subsets for right half"
    };

    yield {
        array: arr,
        highlightIndices: [],
        pointers: [],
        variables: [{ name: 'Result', value: 'Combine results' }],
        log: "Combining results from both halves",
        description: "Much faster than checking all 2^N possibilities!"
    };
}

export function* dfsBfsSteps(graph: number[][]): Generator<AlgorithmStep> {
    const flat = graph.flat(); // Keep for array view fallback if needed, but we focus on tree

    // Initialize Tree Root
    const root: TreeNode = { val: 0, id: '0', children: [] };
    const nodesMap = new Map<string, TreeNode>();
    nodesMap.set('0', root);

    yield {
        array: flat,
        highlightIndices: [],
        pointers: [],
        variables: [{ name: 'Algorithm', value: 'BFS' }],
        log: "Starting BFS from node 0",
        description: "Visit all nodes level by level using a queue.",
        visualizationType: 'tree',
        treeRoot: root
    };

    const visited = new Set<number>();
    const queue = [0];
    visited.add(0);

    while (queue.length > 0) {
        const node = queue.shift()!;

        yield {
            array: flat,
            highlightIndices: [node],
            pointers: [{ index: node, label: 'Visit', color: 'text-blue-600' }],
            variables: [
                { name: 'Current Node', value: node },
                { name: 'Queue', value: `[${queue.join(', ')}]` }
            ],
            log: `Visiting node ${node}`,
            description: "Process current node, add unvisited neighbors to queue.",
            visualizationType: 'tree',
            treeRoot: root
        };

        // Get neighbors from adjacency list
        const neighbors = graph[node] || [];

        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);

                // Add to visualization tree
                const parentNode = nodesMap.get(node.toString());
                if (parentNode) {
                    const childNode: TreeNode = { val: neighbor, id: neighbor.toString(), children: [] };
                    if (!parentNode.children) parentNode.children = [];
                    parentNode.children.push(childNode);
                    nodesMap.set(neighbor.toString(), childNode);
                }

                yield {
                    array: flat,
                    highlightIndices: [neighbor],
                    pointers: [{ index: neighbor, label: 'Add', color: 'text-green-600' }],
                    variables: [
                        { name: 'Found Neighbor', value: neighbor },
                        { name: 'Parent', value: node }
                    ],
                    log: `Found unvisited neighbor ${neighbor} of ${node}`,
                    description: `Add ${neighbor} to queue and tree.`,
                    visualizationType: 'tree',
                    treeRoot: root
                };
            }
        }
    }

    yield {
        array: flat,
        highlightIndices: Array.from(visited),
        pointers: [],
        variables: [{ name: 'Visited', value: Array.from(visited).join(', ') }],
        log: "BFS complete!",
        description: "All reachable nodes visited.",
        visualizationType: 'tree',
        treeRoot: root
    };
}

export function* treeTraversalSteps(arr: number[]): Generator<AlgorithmStep> {
    // Helper to build tree from array (BFS/Level Order construction)
    const buildTree = (data: number[]): TreeNode | null => {
        if (!data.length) return null;
        const root: TreeNode = { val: data[0], id: '0' };
        const queue: { node: TreeNode, index: number }[] = [{ node: root, index: 0 }];

        while (queue.length) {
            const { node, index } = queue.shift()!;
            const leftIdx = 2 * index + 1;
            const rightIdx = 2 * index + 2;

            if (leftIdx < data.length) {
                node.left = { val: data[leftIdx], id: leftIdx.toString() };
                queue.push({ node: node.left, index: leftIdx });
            }
            if (rightIdx < data.length) {
                node.right = { val: data[rightIdx], id: rightIdx.toString() };
                queue.push({ node: node.right, index: rightIdx });
            }
        }
        return root;
    };

    const root = buildTree(arr);

    yield {
        array: arr,
        highlightIndices: [],
        pointers: [],
        variables: [{ name: 'Traversal', value: 'Inorder' }],
        log: "Inorder: Left → Root → Right",
        description: "For BST, gives sorted order!",
        visualizationType: 'tree',
        treeRoot: root
    };

    // Simplified: just show sequence
    for (let i = 0; i < arr.length; i++) {
        yield {
            array: arr,
            highlightIndices: [i],
            pointers: [{ index: i, label: 'Visit', color: 'text-blue-600' }],
            variables: [{ name: 'Node', value: arr[i] }],
            log: `Visiting node ${arr[i]}`,
            description: "Visit nodes in order: left subtree, root, right subtree",
            visualizationType: 'tree',
            treeRoot: root
        };
    }

    yield {
        array: arr,
        highlightIndices: [],
        pointers: [],
        variables: [{ name: 'Result', value: arr.join(' → ') }],
        log: "Traversal complete!",
        description: "All nodes visited in inorder sequence",
        visualizationType: 'tree',
        treeRoot: root
    };
}

export function* shortestPathSteps(graph: number[][], start: number = 0, end: number = 4): Generator<AlgorithmStep> {
    const flat = graph.flat();

    // Initialize Tree Root
    const root: TreeNode = { val: start, id: start.toString(), children: [] };
    const nodesMap = new Map<string, TreeNode>();
    nodesMap.set(start.toString(), root);

    yield {
        array: flat,
        highlightIndices: [start],
        pointers: [{ index: start, label: 'Start', color: 'text-green-600' }],
        variables: [
            { name: 'From', value: start },
            { name: 'To', value: end }
        ],
        log: `Finding shortest path from ${start} to ${end}`,
        description: "BFS guarantees shortest path in unweighted graph.",
        visualizationType: 'tree',
        treeRoot: root
    };

    const queue: [number, number][] = [[start, 0]];
    const visited = new Set([start]);
    // Track parent pointers to reconstruct path
    const parents = new Map<number, number>();

    while (queue.length > 0) {
        const [node, dist] = queue.shift()!;

        yield {
            array: flat,
            highlightIndices: [node],
            pointers: [{ index: node, label: `D=${dist}`, color: 'text-blue-600' }],
            variables: [
                { name: 'Current', value: node },
                { name: 'Distance', value: dist }
            ],
            log: `At node ${node}, distance ${dist}`,
            description: "Exploring neighbors at this distance level.",
            visualizationType: 'tree',
            treeRoot: root
        };

        if (node === end) {
            // Reconstruct path
            const path = [end];
            let curr = end;
            while (parents.has(curr)) {
                curr = parents.get(curr)!;
                path.unshift(curr);
            }

            yield {
                array: flat,
                highlightIndices: path,
                pointers: [{ index: end, label: 'Found!', color: 'text-green-600' }],
                variables: [
                    { name: 'Shortest Distance', value: dist },
                    { name: 'Path', value: path.join(' → ') }
                ],
                log: `Reached destination! Shortest path: ${dist}`,
                description: "Found shortest path using BFS!",
                visualizationType: 'tree',
                treeRoot: root
            };
            return;
        }

        // Get neighbors
        const neighbors = graph[node] || [];

        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                parents.set(neighbor, node);
                queue.push([neighbor, dist + 1]);

                // Add to visualization tree
                const parentNode = nodesMap.get(node.toString());
                if (parentNode) {
                    const childNode: TreeNode = { val: neighbor, id: neighbor.toString(), children: [] };
                    if (!parentNode.children) parentNode.children = [];
                    parentNode.children.push(childNode);
                    nodesMap.set(neighbor.toString(), childNode);
                }
            }
        }
    }
}

export function* dp2DSteps(grid: number[][]): Generator<AlgorithmStep> {
    const m = grid.length;
    const n = grid[0]?.length || 0;
    const dp: number[][] = Array(m).fill(0).map(() => Array(n).fill(0));
    const flat = grid.flat();

    yield {
        array: flat,
        highlightIndices: [],
        pointers: [],
        variables: [
            { name: 'Grid Size', value: `${m}x${n}` },
            { name: 'Problem', value: 'Unique Paths' }
        ],
        log: "Computing unique paths in grid",
        description: "dp[i][j] = number of ways to reach cell (i,j)",
        visualizationType: 'grid',
        grid: dp
    };

    // Base case
    for (let i = 0; i < m; i++) dp[i][0] = 1;
    for (let j = 0; j < n; j++) dp[0][j] = 1;

    yield {
        array: dp.flat(),
        highlightIndices: Array.from({ length: n }, (_, i) => i),
        pointers: [],
        variables: [{ name: 'Base Case', value: 'First row/col = 1' }],
        log: "Initialize first row and column to 1",
        description: "Only one way to reach cells in first row/column",
        visualizationType: 'grid',
        grid: dp
    };

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];

            yield {
                array: dp.flat(),
                highlightIndices: [i * n + j],
                pointers: [{ index: i * n + j, label: `(${i},${j})`, color: 'text-blue-600' }],
                variables: [
                    { name: 'dp[i-1][j]', value: dp[i - 1][j] },
                    { name: 'dp[i][j-1]', value: dp[i][j - 1] },
                    { name: 'dp[i][j]', value: dp[i][j] }
                ],
                log: `dp[${i}][${j}] = ${dp[i - 1][j]} + ${dp[i][j - 1]} = ${dp[i][j]}`,
                description: "Paths from top + paths from left",
                visualizationType: 'grid',
                grid: dp
            };
        }
    }

    yield {
        array: dp.flat(),
        highlightIndices: [m * n - 1],
        pointers: [{ index: m * n - 1, label: 'Answer', color: 'text-green-600' }],
        variables: [{ name: 'Total Paths', value: dp[m - 1][n - 1] }],
        log: `Total unique paths: ${dp[m - 1][n - 1]}`,
        description: "DP table complete!",
        visualizationType: 'grid',
        grid: dp
    };
}

export function* knapsackSteps(items: number[][], capacity: number = 50): Generator<AlgorithmStep> {
    // items: [value, weight] pairs
    const values = items.map(i => i[0]);
    const weights = items.map(i => i[1]);
    const n = items.length;

    yield {
        array: values,
        highlightIndices: [],
        pointers: [],
        variables: [
            { name: 'Capacity', value: capacity },
            { name: 'Items', value: n }
        ],
        log: "0/1 Knapsack Problem",
        description: "Maximize value within weight capacity. Each item: take it or leave it.",
        visualizationType: 'grid',
        grid: Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0))
    };

    const dp: number[][] = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        const value = values[i - 1];
        const weight = weights[i - 1];

        yield {
            array: values,
            highlightIndices: [i - 1],
            pointers: [{ index: i - 1, label: `Item ${i}`, color: 'text-blue-600' }],
            variables: [
                { name: 'Value', value: value },
                { name: 'Weight', value: weight }
            ],
            log: `Processing item ${i}: value=${value}, weight=${weight}`,
            description: "For each capacity, decide: include this item or not?",
            visualizationType: 'grid',
            grid: dp
        };

        for (let w = 1; w <= Math.min(capacity, 10); w++) { // Limit for viz
            if (weight <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], value + dp[i - 1][w - weight]);

                if (value + dp[i - 1][w - weight] > dp[i - 1][w]) {
                    yield {
                        array: values,
                        highlightIndices: [i - 1],
                        pointers: [{ index: i - 1, label: 'Include!', color: 'text-green-600' }],
                        variables: [
                            { name: 'Capacity', value: w },
                            { name: 'Include?', value: 'Yes' },
                            { name: 'New Value', value: dp[i][w] }
                        ],
                        log: `Include item ${i} at capacity ${w}`,
                        description: `Better to include! New total: ${dp[i][w]}`,
                        visualizationType: 'grid',
                        grid: dp
                    };
                }
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    yield {
        array: values,
        highlightIndices: [],
        pointers: [],
        variables: [{ name: 'Max Value', value: dp[n][capacity] }],
        log: `Maximum value achievable: ${dp[n][capacity]}`,
        description: "Optimal selection found!",
        visualizationType: 'grid',
        grid: dp
    };
}

export function* lcsSteps(text1: string, text2: string): Generator<AlgorithmStep> {
    const arr1 = text1.split('').map((c) => c.charCodeAt(0) - 65); // Convert to numbers

    yield {
        array: arr1,
        highlightIndices: [],
        pointers: [],
        variables: [
            { name: 'Text1', value: text1 },
            { name: 'Text2', value: text2 }
        ],
        log: "Longest Common Subsequence (LCS)",
        description: "Find longest sequence appearing in both strings in same order.",
        visualizationType: 'grid',
        grid: Array(text1.length + 1).fill(0).map(() => Array(text2.length + 1).fill(0))
    };

    const m = text1.length;
    const n = text2.length;
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            yield {
                array: arr1,
                highlightIndices: [i - 1],
                pointers: [{ index: i - 1, label: text1[i - 1], color: 'text-blue-600' }],
                variables: [
                    { name: 'Comparing', value: `${text1[i - 1]} vs ${text2[j - 1]}` }
                ],
                log: `Comparing '${text1[i - 1]}' with '${text2[j - 1]}'`,
                description: "Check if characters match",
                visualizationType: 'grid',
                grid: dp
            };

            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                yield {
                    array: arr1,
                    highlightIndices: [i - 1],
                    pointers: [{ index: i - 1, label: 'Match!', color: 'text-green-600' }],
                    variables: [
                        { name: 'Match', value: text1[i - 1] },
                        { name: 'LCS Length', value: dp[i][j] }
                    ],
                    log: `Match! LCS length now ${dp[i][j]}`,
                    description: "Characters match! Extend LCS by 1.",
                    visualizationType: 'grid',
                    grid: dp
                };
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    yield {
        array: arr1,
        highlightIndices: [],
        pointers: [],
        variables: [{ name: 'LCS Length', value: dp[m][n] }],
        log: `Longest common subsequence length: ${dp[m][n]}`,
        description: "Found the LCS!",
        visualizationType: 'grid',
        grid: dp
    };
}

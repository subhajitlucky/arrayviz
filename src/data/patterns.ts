

export interface PatternData {
  id: string;
  title: string;
  description: string;
  intuition: string; // The "aha!" moment - core insight
  whenToUse: string; // Clear signals in problems
  detailedExplanation: string; // Multi-paragraph walkthrough
  complexity: { time: string; space: string };
  useCase: string;
  code: string;
  defaultArray: any; // Can be number[], number[][], string[], etc.
  defaultTarget?: number; // For Two Sum, Binary Search
  defaultK?: number; // For Sliding Window
  category: 'core' | 'intermediate' | 'graph-tree' | 'dynamic-programming';
  comingSoon?: boolean; // For patterns without visualizations yet
}


export const patterns: PatternData[] = [
  // ============ CORE ESSENTIAL PATTERNS ============
  {
    id: 'two-pointers',
    title: 'Two Pointers',
    description: 'Traverse from both ends to find a pair satisfying a condition. Best for sorted arrays.',
    intuition: "Exploit sorted order: if the sum is too small, move the left pointer up; if too large, move the right pointer down. Converges in one pass!",
    whenToUse: "• Sorted arrays (or sortable)\n• Finding pairs/triplets with a target sum\n• Comparing ends or reversing in-place",
    detailedExplanation: "Two pointers move toward each other to find a solution efficiently.\n\n**How it works:**\n1. Start at both ends (indices \`0\` and \`n-1\`).\n2. Compare the sum/value to your target.\n3. Adjust pointers based on the result (e.g., sum < target → \`left++\`).\n\n**Why:** Eliminates half the search space with each step, achieving **O(N)** time without extra space.",
    complexity: { time: 'O(N)', space: 'O(1)' },
    useCase: 'Finding pairs in sorted arrays, reversing arrays, palindrome checks.',
    category: 'core',
    defaultArray: [2, 3, 5, 8, 11, 15],
    defaultTarget: 13,
    code: `function twoSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    else if (sum < target) left++;
    else right--;
  }
  return [-1, -1];
}`
  },
  {
    id: 'fast-slow-pointers',
    title: 'Fast & Slow Pointers',
    description: 'Two pointers moving at different speeds (e.g., 1x and 2x) to detect cycles or find the middle.',
    intuition: "Like a race track: if there's a loop, the fast runner will eventually lap the slow one. If not, the fast runner reaches the end first.",
    whenToUse: "• Cycle detection (linked lists/arrays)\n• Finding the middle element\n• Intersection of linked lists\n• Duplicate number detection",
    detailedExplanation: "Uses speed differential to reveal structure.\n\n**Core Mechanics:**\n• **Cycle Detection:** Fast pointer laps slow pointer if a cycle exists.\n• **Middle Element:** When fast reaches the end, slow is exactly at the middle.\n\n**Key:** Solves complex structural problems in **O(N)** time and **O(1)** space.",
    complexity: { time: 'O(N)', space: 'O(1)' },
    useCase: 'Middle of list, cycle detection (Floyd), palindrome check, duplicate number, N-th from end, list intersection, happy number.',
    category: 'core',
    defaultArray: [1, 3, 4, 2, 2],
    code: `// Example: Find middle of linked list
function findMiddle(head) {
  let slow = head;
  let fast = head;
  
  // Move until fast reaches end
  while (fast && fast.next) {
    slow = slow.next;      // 1 step
    fast = fast.next.next; // 2 steps
  }
  return slow; // Middle node
}

// For arrays: find middle element
function findMiddleArray(arr) {
  let slow = 0;
  let fast = 0;
  
  while (fast < arr.length - 1) {
    slow++;      // 1 step
    fast += 2;   // 2 steps
    if (fast >= arr.length) break;
  }
  return arr[slow]; // Middle element
}`
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window',
    description: 'Efficiently process subarrays of size K by sliding a window across the data.',
    intuition: "Don't recompute the whole subarray! Just add the new element entering and remove the old one leaving. It's like a moving frame.",
    whenToUse: "• Subarray/substring problems (min/max/longest)\n• Fixed or variable window size constraints\n• Contiguous sequence analysis",
    detailedExplanation: "Maintains a dynamic window over the data to track properties.\n\n**Mechanism:**\n1. **Expand:** Add element to the right.\n2. **Shrink:** Remove element from the left if condition is broken (variable) or window exceeds size K (fixed).\n\n**Benefit:** Converts nested loops (O(N*K)) into a single linear pass (**O(N)**).",
    complexity: { time: 'O(N)', space: 'O(1)' },
    useCase: 'Max/Min sum of subarray of size K, Longest substring with distinct chars.',
    category: 'core',
    defaultArray: [2, 1, 5, 1, 3, 2],
    defaultK: 3,
    code: `function maxSumSubarray(arr, k) {
  let maxSum = 0;
  let windowSum = 0;
  
  // First window
  for (let i = 0; i < k; i++) windowSum += arr[i];
  maxSum = windowSum;
  
  // Slide
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}`
  },
  {
    id: 'prefix-sum',
    title: 'Prefix Sums',
    description: 'Precompute cumulative sums to answer range queries in O(1).',
    intuition: "Calculate once, query instantly. The sum of a range \`[i, j]\` is simply \`Total(0...j) - Total(0...i-1)\`.",
    whenToUse: "• Frequent range sum queries\n• Calculating subarray sums equals K\n• Matrix block sums",
    detailedExplanation: "Preprocessing technique for instant range calculations.\n\n**Concept:**\n• Build an array where \`prefix[i]\` stores the sum up to index \`i\`.\n• **Query:** \`Sum(i, j) = prefix[j] - prefix[i-1]\`.\n\n**Trade-off:** **O(N)** space for **O(1)** query speed.",
    complexity: { time: 'O(N)', space: 'O(N)' },
    useCase: 'Range Sum Queries, Subarray Sum equals K.',
    category: 'core',
    defaultArray: [1, 2, 3, 4, 5],
    code: `function createPrefixSum(arr) {
  const prefix = new Array(arr.length);
  prefix[0] = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    prefix[i] = prefix[i - 1] + arr[i];
  }
  return prefix;
}`
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    description: 'Divide and conquer sorted data to find a target in logarithmic time.',
    intuition: "Eliminate half the possibilities with every check. Is the target in the left half or right? You only need to look there.",
    whenToUse: "• Sorted arrays\n• Finding specific values or insertion points\n• Monotonic search spaces (e.g., optimization problems)",
    detailedExplanation: "Iteratively halves the search interval.\n\n**Steps:**\n1. Check middle element.\n2. If \`mid < target\`, search right half.\n3. If \`mid > target\`, search left half.\n\n**Power:** Finds a needle in a haystack of 1 million items in just ~20 steps (**O(log N)**).",
    complexity: { time: 'O(log N)', space: 'O(1)' },
    useCase: 'Searching in sorted data.',
    category: 'core',
    defaultArray: [10, 20, 30, 40, 50, 60, 70, 80, 90],
    defaultTarget: 40,
    code: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`
  },
  {
    id: 'binary-search-answer',
    title: 'Binary Search on Answer',
    description: 'Search the solution space itself when the answer lies in a monotonic range.',
    intuition: "If checking 'Is X possible?' is fast, don't search the data—search the answer! If X works, does X+1 work? Use binary search to find the boundary.",
    whenToUse: "• Minimizing maximums / Maximizing minimums\n• Resource allocation\n• Answer range is known and monotonic",
    detailedExplanation: "Applies Binary Search to the *values* of the answer, not array indices.\n\n**Process:**\n1. Define min/max possible answers.\n2. Pick \`mid\` and check validity (\`isValid(mid)\`).\n3. Adjust range based on validity.\n\n**Use:** Solves complex optimization problems where the answer space is ordered.",
    complexity: { time: 'O(N log M)', space: 'O(1)' },
    useCase: 'Minimizing maximum value, allocating resources, painter partition.',
    category: 'core',
    defaultArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Example: ship packages
    code: `function minCapacity(weights, days) {
  let left = Math.max(...weights);
  let right = weights.reduce((a, b) => a + b);
  
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (canShip(weights, days, mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}`
  },
  {
    id: 'kadane',
    title: "Kadane's Algorithm",
    description: 'Find the maximum sum contiguous subarray in O(N).',
    intuition: "Carry the baggage (previous sum) only if it's positive. If it drags you down (negative), drop it and start fresh!",
    whenToUse: "• Maximum subarray sum\n• Best contiguous sequence\n• Stock trading (max profit)",
    detailedExplanation: "Dynamic programming approach for contiguous subarrays.\n\n**Logic:**\n• At each step, decide: extend the current subarray or start a new one?\n• \`currentMax = max(num, currentMax + num)\`\n\n**Result:** Finds the global maximum in a single pass (**O(N)**).",
    complexity: { time: 'O(N)', space: 'O(1)' },
    useCase: 'Maximum Subarray Sum problem.',
    category: 'core',
    defaultArray: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    code: `function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let currentMax = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    maxSoFar = Math.max(maxSoFar, currentMax);
  }
  return maxSoFar;
}`
  },
  {
    id: 'in-place',
    title: 'In-Place Operations',
    description: 'Modify data directly to save space, often using swaps.',
    intuition: "Why buy a new house when you can rearrange the furniture? Swap elements directly to transform the array without extra memory.",
    whenToUse: "• Space constraints (O(1) extra space)\n• Reversing/Rotating arrays\n• Partitioning (e.g., QuickSort)\n• Removing duplicates",
    detailedExplanation: "Techniques to manipulate data without auxiliary structures.\n\n**Common Moves:**\n• **Swap:** \`[a, b] = [b, a]\`\n• **Two Pointers:** One for reading, one for writing (e.g., removing duplicates).\n\n**Goal:** Achieve functionality with minimal memory footprint.",
    complexity: { time: 'O(N)', space: 'O(1) auxiliary' },
    useCase: 'Reversing array, Partitioning (QuickSort), Removing duplicates, Array rotation.',
    category: 'core',
    defaultArray: [1, 2, 3, 4, 5],
    code: `function reverse(arr) {
  let start = 0, end = arr.length - 1;
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}`
  },

  // ============ INTERMEDIATE PATTERNS ============
  {
    id: 'hashing',
    title: 'Hashing Patterns',
    description: 'Use Hash Maps/Sets for O(1) lookups and frequency tracking.',
    intuition: "A magical notebook that tells you instantly if you've seen something before or how many times. Trades space for speed.",
    whenToUse: "• Frequency counting\n• Fast lookups (exists?)\n• Two Sum (unsorted)\n• Anagram grouping",
    detailedExplanation: "Leverages constant-time access of Hash Tables.\n\n**Applications:**\n• **Count:** Map \`element -> frequency\`.\n• **Track:** Set stores seen elements.\n• **Index:** Map \`element -> index\`.\n\n**Trade-off:** Uses **O(N)** space to reduce time complexity from O(N²) to **O(N)**.",
    complexity: { time: 'O(N)', space: 'O(N)' },
    useCase: 'Frequency count, anagrams, subarray sum = k, first unique element.',
    category: 'intermediate',
    defaultArray: [1, 2, 3, 1, 2, 1],
    code: `function firstUnique(arr) {
  const freq = new Map();
  
  // Count frequencies
  for (const num of arr) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }
  
  // Find first with count 1
  for (const num of arr) {
    if (freq.get(num) === 1) return num;
  }
  return -1;
}`
  },
  {
    id: 'monotonic-stack',
    title: 'Monotonic Stack',
    description: 'Track elements in sorted order to find next greater/smaller values.',
    intuition: "Keep a stack of 'waiting' elements. When a bigger one comes along, it resolves the wait for everyone smaller than it. Pop them!",
    whenToUse: "• Next Greater/Smaller Element\n• Stock Span\n• Histogram areas",
    detailedExplanation: "Maintains a stack that is always sorted (increasing or decreasing).\n\n**Mechanism:**\n• **Push:** Add element if order is preserved.\n• **Pop:** If new element breaks order, pop elements—the new element is their 'next greater/smaller'.\n\n**Efficiency:** Each element is pushed/popped at most once (**O(N)**).",
    complexity: { time: 'O(N)', space: 'O(N)' },
    useCase: 'Next greater element, stock span, largest rectangle in histogram.',
    category: 'intermediate',
    defaultArray: [4, 5, 2, 10, 8],
    code: `function nextGreaterElement(arr) {
  const result = new Array(arr.length).fill(-1);
  const stack = [];
  
  for (let i = 0; i < arr.length; i++) {
    while (stack.length && arr[i] > arr[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = arr[i];
    }
    stack.push(i);
  }
  return result;
}`
  },
  {
    id: 'greedy-intervals',
    title: 'Greedy - Intervals',
    description: 'Sort intervals to merge overlaps or select optimal schedules.',
    intuition: "Sort by start or end time. Then, make the best local choice (e.g., earliest finish time) to leave the most room for others.",
    whenToUse: "• Merging intervals\n• Meeting rooms\n• Activity selection\n• Non-overlapping intervals",
    detailedExplanation: "Solves time-based problems by sorting first.\n\n**Strategies:**\n• **Merge:** Sort by start. If overlap, extend end time.\n• **Select:** Sort by end. Pick earliest finishing interval to maximize count.\n\n**Complexity:** Dominated by sorting (**O(N log N)**).",
    complexity: { time: 'O(N log N)', space: 'O(1) to O(N)' },
    useCase: 'Merge intervals, meeting rooms, non-overlapping intervals.',
    category: 'intermediate',
    defaultArray: [[1, 3], [2, 6], [8, 10], [15, 18]],
    code: `function mergeIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const curr = intervals[i];
    
    if (curr[0] <= last[1]) {
      last[1] = Math.max(last[1], curr[1]);
    } else {
      merged.push(curr);
    }
  }
  return merged;
}`
  },
  {
    id: 'matrix-traversal',
    title: 'Matrix Traversal',
    description: 'Navigate 2D grids in specific orders: spiral, diagonal, or layer-by-layer.',
    intuition: "Peel the onion layer by layer, or zigzag like a snake. Use boundaries to constrain your movement.",
    whenToUse: "• Spiral/Diagonal printing\n• Matrix rotation\n• Search in sorted matrix",
    detailedExplanation: "Systematic exploration of 2D arrays.\n\n**Techniques:**\n• **Spiral:** Use 4 boundaries (top, bottom, left, right). Shrink them as you complete rows/cols.\n• **Search:** Start at top-right. Go left if too big, down if too small.\n\n**Key:** Careful index management.",
    complexity: { time: 'O(M×N)', space: 'O(1)' },
    useCase: 'Spiral order, rotate matrix, search in 2D matrix.',
    category: 'intermediate',
    defaultArray: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    code: `function spiralOrder(matrix) {
  const result = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  
  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) result.push(matrix[top][i]);
    top++;
    for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
    right--;
    if (top <= bottom) {
      for (let i = right; i >= left; i--) result.push(matrix[bottom][i]);
      bottom--;
    }
    if (left <= right) {
      for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
      left++;
    }
  }
  return result;
}`
  },
  {
    id: 'backtracking',
    title: 'Backtracking',
    description: 'Explore all potential solutions by building, checking, and undoing choices.',
    intuition: "Try a path in the maze. Dead end? Back up (undo) and try the next path. Exhaustively explores the decision tree.",
    whenToUse: "• Permutations / Combinations\n• Sudoku / N-Queens\n• Pathfinding (all paths)",
    detailedExplanation: "Recursive trial-and-error.\n\n**Template:**\n1. **Choose:** Make a decision.\n2. **Explore:** Recurse.\n3. **Un-choose:** Backtrack (undo decision) to try others.\n\n**Cost:** Exponential time, but guarantees finding the solution.",
    complexity: { time: 'O(2^N or N!)', space: 'O(N)' },
    useCase: 'Permutations, combinations, N-Queens, Sudoku solver, subsets.',
    category: 'intermediate',
    defaultArray: [1, 2, 3],
    code: `function permute(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);
  
  function backtrack(current) {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }
    
    for (let i = 0; i < nums.length; i++) {
      if (!used[i]) {
        used[i] = true;
        current.push(nums[i]);
        backtrack(current);
        current.pop(); // Undo
        used[i] = false;
      }
    }
  }
  
  backtrack([]);
  return result;
}`
  },
  {
    id: 'meet-in-middle',
    title: 'Meet in the Middle',
    description: 'Split a large search space into two halves to reduce complexity.',
    intuition: "Too many combinations? Split the deck! Solve for two halves separately, then combine. Turns O(2^N) into O(2^(N/2)).",
    whenToUse: "• Subset Sum with N ≈ 40\n• Large search spaces\n• Problems splittable into independent parts",
    detailedExplanation: "Optimization for exponential problems.\n\n**Method:**\n1. Split array into Left and Right.\n2. Generate all sums/states for both.\n3. Sort one side and binary search/match with the other.\n\n**Result:** Drastically cuts down search time.",
    complexity: { time: 'O(2^(N/2))', space: 'O(2^(N/2))' },
    useCase: 'Subset sum with large N, complex combination problems.',
    category: 'intermediate',
    defaultArray: [1, 2, 3, 4],
    code: `function countSubsetSum(arr, target) {
  const n = arr.length;
  const mid = Math.floor(n / 2);
  
  // Generate all sums for first half
  const leftSums = [];
  for (let mask = 0; mask < (1 << mid); mask++) {
    let sum = 0;
    for (let i = 0; i < mid; i++) {
      if (mask & (1 << i)) sum += arr[i];
    }
    leftSums.push(sum);
  }
  
  // Generate all sums for second half
  const rightSums = [];
  for (let mask = 0; mask < (1 << (n - mid)); mask++) {
    let sum = 0;
    for (let i = 0; i < n - mid; i++) {
      if (mask & (1 << i)) sum += arr[mid + i];
    }
    rightSums.push(sum);
  }
  
  // Sort right sums for binary search
  rightSums.sort((a, b) => a - b);
  
  // For each left sum, find complement in right
  let count = 0;
  for (const leftSum of leftSums) {
    const needed = target - leftSum;
    // Binary search or check if needed exists in rightSums
    if (rightSums.includes(needed)) count++;
  }
  
  return count;
}`
  },

  // ============ GRAPH/TREE PATTERNS ============
  {
    id: 'dfs-bfs',
    title: 'DFS/BFS Template',
    description: 'Traverse graphs/trees: Depth-First (deep dive) or Breadth-First (layer by layer).',
    intuition: "DFS is a bold explorer rushing to the end of the cave. BFS is a cautious flood filling every corner step by step.",
    whenToUse: "• Connected components\n• Pathfinding\n• Cycle detection\n• Shortest path (BFS unweighted)",
    detailedExplanation: "Fundamental graph traversal algorithms.\n\n• **DFS (Stack/Recursion):** Go deep. Great for full exploration and path finding.\n• **BFS (Queue):** Go wide. Great for shortest paths and level-order traversal.\n\n**Complexity:** **O(V + E)**.",
    complexity: { time: 'O(V+E)', space: 'O(V)' },
    useCase: 'Connected components, cycle detection, all paths, flood fill.',
    category: 'graph-tree',
    defaultArray: [[1, 2], [2, 3], [3, 4]],
    code: `function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);
  
  while (queue.length) {
    const node = queue.shift();
    
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return visited;
}`
  },
  {
    id: 'tree-traversal',
    title: 'Tree Traversal',
    description: 'Visit tree nodes in specific orders: Preorder, Inorder, Postorder, Level-order.',
    intuition: "The order matters! Root first? Middle? Last? Each gives a different perspective (e.g., Inorder on BST gives sorted data).",
    whenToUse: "• Tree serialization\n• BST validation (Inorder)\n• Expression evaluation",
    detailedExplanation: "Systematic visiting of nodes.\n\n• **Preorder:** Root → Left → Right (Copying)\n• **Inorder:** Left → Root → Right (Sorted BST)\n• **Postorder:** Left → Right → Root (Deletion)\n\n**Basis:** Recursion or Stack.",
    complexity: { time: 'O(N)', space: 'O(H)' },
    useCase: 'Tree paths, level order, serialize/deserialize, tree sums.',
    category: 'graph-tree',
    defaultArray: [1, 2, 3, 4, 5],
    code: `// Tree Node structure
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Inorder Traversal (Left-Root-Right)
function inorderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (!node) return;
    traverse(node.left);  // Left
    result.push(node.val); // Root
    traverse(node.right);  // Right
  }
  
  traverse(root);
  return result;
}`
  },
  {
    id: 'shortest-path',
    title: 'Shortest Path (BFS)',
    description: 'Find the shortest path in unweighted graphs using Breadth-First Search.',
    intuition: "Ripples in a pond: the first wave to hit the target is the shortest path. Explores distance 1, then 2, then 3...",
    whenToUse: "• Shortest path (unweighted)\n• Minimum steps/jumps\n• Word Ladder",
    detailedExplanation: "Guarantees shortest path in unweighted graphs.\n\n**Logic:**\n• Use a Queue.\n• Track distance from start.\n• First time reaching target = Shortest distance.\n\n**Note:** Use Dijkstra for weighted graphs.",
    complexity: { time: 'O(V+E)', space: 'O(V)' },
    useCase: 'Shortest path in maze, word ladder, minimum jumps.',
    category: 'graph-tree',
    defaultArray: [[0, 1], [1, 2], [0, 3], [3, 4]],
    code: `function shortestPath(graph, start, end) {
  const queue = [[start, 0]];
  const visited = new Set([start]);
  
  while (queue.length) {
    const [node, dist] = queue.shift();
    if (node === end) return dist;
    
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, dist + 1]);
      }
    }
  }
  return -1;
}`
  },

  // ============ DYNAMIC PROGRAMMING PATTERNS ============
  {
    id: 'dp-1d',
    title: '1D DP',
    description: 'Solve linear problems by remembering previous results (memoization).',
    intuition: "Don't repeat yourself! If you know the answer for step \`i-1\`, use it to solve step \`i\`. Build the solution from the ground up.",
    whenToUse: "• Climbing Stairs / Fibonacci\n• House Robber\n• Min/Max cost to reach target",
    detailedExplanation: "Optimizes recursion by storing states.\n\n**Steps:**\n1. **State:** Define \`dp[i]\`.\n2. **Transition:** \`dp[i] = f(dp[i-1], ...)\`.\n3. **Base Case:** Set initial values.\n\n**Efficiency:** **O(N)** time vs exponential brute force.",
    complexity: { time: 'O(N)', space: 'O(N)' },
    useCase: 'Fibonacci, climbing stairs, house robber, coin change.',
    category: 'dynamic-programming',
    defaultArray: [1, 2, 5],
    code: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i >= coin) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  
  return dp[amount] === Infinity ? -1 : dp[amount];
}`
  },
  {
    id: 'dp-2d',
    title: '2D DP',
    description: 'Solve grid or dual-sequence problems using a table of sub-results.',
    intuition: "Fill the grid! The value at \`(i, j)\` depends on its neighbors (top, left). Like solving a crossword puzzle of numbers.",
    whenToUse: "• Grid paths (unique/min cost)\n• String comparison (LCS, Edit Distance)\n• Knapsack variations",
    detailedExplanation: "Extends DP to two dimensions.\n\n**Common Recurrence:**\n\`dp[i][j]\` derived from \`dp[i-1][j]\` (top) and \`dp[i][j-1]\` (left).\n\n**Application:** Essential for complex optimization on grids or string pairs.",
    complexity: { time: 'O(M×N)', space: 'O(M×N)' },
    useCase: 'Unique paths, edit distance, LCS, grid minimum path.',
    category: 'dynamic-programming',
    defaultArray: [[1, 3, 1], [1, 5, 1], [4, 2, 1]],
    code: `function uniquePaths(m, n) {
  const dp = Array(m).fill(0).map(() => Array(n).fill(0));
  
  // Base case
  for (let i = 0; i < m; i++) dp[i][0] = 1;
  for (let j = 0; j < n; j++) dp[0][j] = 1;
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i-1][j] + dp[i][j-1];
    }
  }
  
  return dp[m-1][n-1];
}`
  },
  {
    id: 'knapsack',
    title: '0/1 Knapsack',
    description: 'Maximize value within a capacity limit by choosing or skipping items.',
    intuition: "For every item, ask: 'Is it worth taking?' Compare taking it (value + remaining space result) vs. leaving it. Pick the winner.",
    whenToUse: "• Resource allocation with limits\n• Subset Sum\n• Partition problems",
    detailedExplanation: "The classic optimization problem.\n\n**Decision:** \`dp[i][w] = max(skip, take)\`\n• **Skip:** \`dp[i-1][w]\`\n• **Take:** \`value + dp[i-1][w-weight]\`\n\n**Result:** Optimal selection for given constraints.",
    complexity: { time: 'O(N×W)', space: 'O(N×W)' },
    useCase: 'Subset sum, partition equal subset, target sum.',
    category: 'dynamic-programming',
    defaultArray: [[60, 10], [100, 20], [120, 30]],
    code: `function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(
          dp[i-1][w],
          values[i-1] + dp[i-1][w - weights[i-1]]
        );
      } else {
        dp[i][w] = dp[i-1][w];
      }
    }
  }
  return dp[n][capacity];
}`
  },
  {
    id: 'lcs',
    title: 'Longest Common Subsequence',
    description: 'Find the longest sequence appearing in two strings (order preserved).',
    intuition: "Match characters! If they match, great (+1). If not, try skipping a char from either string and see which gives a better result.",
    whenToUse: "• Diff utilities\n• DNA alignment\n• String similarity",
    detailedExplanation: "Measures similarity between sequences.\n\n**Logic:**\n• Match? \`1 + dp[i-1][j-1]\`\n• No Match? \`max(dp[i-1][j], dp[i][j-1])\`\n\n**Output:** Length of the longest shared pattern.",
    complexity: { time: 'O(M×N)', space: 'O(M×N)' },
    useCase: 'LCS, longest palindromic subsequence, edit distance.',
    category: 'dynamic-programming',
    defaultArray: ['ABCBDAB', 'BDCAB'],
    code: `function lcs(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i-1] === text2[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
  }
  return dp[m][n];
}`
  }
];

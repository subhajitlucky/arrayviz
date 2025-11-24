
export interface PatternData {
    id: string;
    title: string;
    description: string;
    complexity: { time: string; space: string };
    useCase: string;
    code: string;
    defaultArray: number[];
    defaultTarget?: number; // For Two Sum, Binary Search
    defaultK?: number; // For Sliding Window
}

export const patterns: PatternData[] = [
    {
        id: 'two-pointers',
        title: 'Two Pointers',
        description: 'Use two pointers (usually at ends) to traverse the array to find a pair satisfying a condition. Requires sorted array for Two Sum.',
        complexity: { time: 'O(N)', space: 'O(1)' },
        useCase: 'Finding pairs in sorted arrays, reversing arrays, palindrome checks.',
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
        id: 'sliding-window',
        title: 'Sliding Window',
        description: 'Maintain a window of size K that slides across the array. Efficiently update the result by removing the leaving element and adding the entering one.',
        complexity: { time: 'O(N)', space: 'O(1)' },
        useCase: 'Max/Min sum of subarray of size K, Longest substring with distinct chars.',
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
        id: 'kadane',
        title: "Kadane's Algorithm",
        description: 'Find the contiguous subarray with the largest sum. It decides at each step whether to start a new subarray or extend the existing one.',
        complexity: { time: 'O(N)', space: 'O(1)' },
        useCase: 'Maximum Subarray Sum problem.',
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
        id: 'prefix-sum',
        title: 'Prefix Sums',
        description: 'Precompute an array where index i stores the sum of all elements up to i. Allows range sum queries in O(1).',
        complexity: { time: 'O(N)', space: 'O(N)' },
        useCase: 'Range Sum Queries, Subarray Sum equals K.',
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
        description: 'Repeatedly divide the search interval in half. Requires a sorted array.',
        complexity: { time: 'O(log N)', space: 'O(1)' },
        useCase: 'Searching in sorted data.',
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
        id: 'in-place',
        title: 'In-Place Operations',
        description: 'Modify the input array directly without using extra space. Often involves swapping elements.',
        complexity: { time: 'O(N)', space: 'O(1)' },
        useCase: 'Reversing array, Partitioning (QuickSort), Removing duplicates.',
        defaultArray: [1, 2, 3, 4, 5],
        code: `function reverse(arr) {
  let start = 0, end = arr.length - 1;
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}`
    }
];

export interface Problem {
    id: number;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
    exampleInput: string;
    exampleOutput: string;
    hint: string;
}

export const problems: Problem[] = [
    // --- BASICS & TRAVERSAL (1-10) ---
    { id: 1, title: "Reverse Array", difficulty: "Easy", description: "Reverse the order of elements in an array.", exampleInput: "[1, 2, 3]", exampleOutput: "[3, 2, 1]", hint: "Use two pointers: start and end." },
    { id: 2, title: "Max Element", difficulty: "Easy", description: "Find the maximum element in an array.", exampleInput: "[1, 5, 3]", exampleOutput: "5", hint: "Iterate and keep track of max." },
    { id: 3, title: "Min Element", difficulty: "Easy", description: "Find the minimum element in an array.", exampleInput: "[1, 5, 3]", exampleOutput: "1", hint: "Iterate and keep track of min." },
    { id: 4, title: "Check Sorted", difficulty: "Easy", description: "Check if the array is sorted in non-decreasing order.", exampleInput: "[1, 2, 3]", exampleOutput: "true", hint: "Check if arr[i] <= arr[i+1] for all i." },
    { id: 5, title: "Sum of Array", difficulty: "Easy", description: "Calculate the sum of all elements.", exampleInput: "[1, 2, 3]", exampleOutput: "6", hint: "Accumulate sum in a loop." },
    { id: 6, title: "Contains Duplicate", difficulty: "Easy", description: "Check if any value appears at least twice.", exampleInput: "[1, 2, 3, 1]", exampleOutput: "true", hint: "Use a HashSet." },
    { id: 7, title: "Linear Search", difficulty: "Easy", description: "Find the index of a target value.", exampleInput: "[10, 20, 30], 20", exampleOutput: "1", hint: "Iterate through the array." },
    { id: 8, title: "Count Occurrences", difficulty: "Easy", description: "Count how many times a value appears.", exampleInput: "[1, 2, 1, 3], 1", exampleOutput: "2", hint: "Increment counter when match found." },
    { id: 9, title: "Remove Element", difficulty: "Easy", description: "Remove all instances of a value in-place.", exampleInput: "[3, 2, 2, 3], 3", exampleOutput: "[2, 2]", hint: "Use a write pointer." },
    { id: 10, title: "Find Duplicate Number", difficulty: "Medium", description: "Find the duplicate number in an array of n+1 integers.", exampleInput: "[1, 3, 4, 2, 2]", exampleOutput: "2", hint: "Floyd's Cycle Detection or Negative Marking." },

    // --- TWO POINTERS (11-25) ---
    { id: 11, title: "Valid Palindrome", difficulty: "Easy", description: "Check if array/string is a palindrome.", exampleInput: "[1, 2, 2, 1]", exampleOutput: "true", hint: "Compare start and end, move inwards." },
    { id: 12, title: "Two Sum II", difficulty: "Medium", description: "Find two numbers that add up to target in sorted array.", exampleInput: "[2, 7, 11, 15], 9", exampleOutput: "[1, 2]", hint: "Two pointers: start and end." },
    { id: 13, title: "Move Zeroes", difficulty: "Easy", description: "Move zeroes to end maintaining order.", exampleInput: "[0, 1, 0, 3]", exampleOutput: "[1, 3, 0, 0]", hint: "Keep index of last non-zero." },
    { id: 14, title: "Container With Most Water", difficulty: "Medium", description: "Find two lines that form a container with most water.", exampleInput: "[1,8,6,2,5,4,8,3,7]", exampleOutput: "49", hint: "Shrink window from side with smaller height." },
    { id: 15, title: "Squares of Sorted Array", difficulty: "Easy", description: "Return squares of sorted array in sorted order.", exampleInput: "[-4, -1, 0, 3, 10]", exampleOutput: "[0, 1, 9, 16, 100]", hint: "Compare absolute values from ends." },
    { id: 16, title: "3Sum", difficulty: "Medium", description: "Find all unique triplets that sum to zero.", exampleInput: "[-1, 0, 1, 2, -1, -4]", exampleOutput: "[[-1, -1, 2], [-1, 0, 1]]", hint: "Sort, then fix one and use 2Sum." },
    { id: 17, title: "3Sum Closest", difficulty: "Medium", description: "Find triplet sum closest to target.", exampleInput: "[-1, 2, 1, -4], 1", exampleOutput: "2", hint: "Similar to 3Sum, track min difference." },
    { id: 18, title: "4Sum", difficulty: "Medium", description: "Find unique quadruplets summing to target.", exampleInput: "[1, 0, -1, 0, -2, 2], 0", exampleOutput: "...", hint: "Sort, two nested loops, then 2Sum." },
    { id: 19, title: "Remove Duplicates Sorted", difficulty: "Easy", description: "Remove duplicates in-place from sorted array.", exampleInput: "[1, 1, 2]", exampleOutput: "[1, 2]", hint: "Compare current with previous unique." },
    { id: 20, title: "Remove Duplicates Sorted II", difficulty: "Medium", description: "Allow at most two duplicates.", exampleInput: "[1, 1, 1, 2, 2, 3]", exampleOutput: "[1, 1, 2, 2, 3]", hint: "Compare with index-2." },
    { id: 21, title: "Sort Colors", difficulty: "Medium", description: "Sort array of 0s, 1s, 2s.", exampleInput: "[2, 0, 2, 1, 1, 0]", exampleOutput: "[0, 0, 1, 1, 2, 2]", hint: "Dutch National Flag algorithm." },
    { id: 22, title: "Trapping Rain Water", difficulty: "Hard", description: "Compute trapped water.", exampleInput: "[0,1,0,2,1,0,1,3,2,1,2,1]", exampleOutput: "6", hint: "Max-left and Max-right arrays." },
    { id: 23, title: "Merge Sorted Arrays", difficulty: "Easy", description: "Merge two sorted arrays into one.", exampleInput: "[1, 3], [2, 4]", exampleOutput: "[1, 2, 3, 4]", hint: "Fill from back if in-place." },
    { id: 24, title: "Intersection of Arrays", difficulty: "Easy", description: "Find unique intersection.", exampleInput: "[1, 2, 2, 1], [2, 2]", exampleOutput: "[2]", hint: "Use Set or sort and two pointers." },
    { id: 25, title: "Intersection of Arrays II", difficulty: "Easy", description: "Find intersection with duplicates.", exampleInput: "[1, 2, 2, 1], [2, 2]", exampleOutput: "[2, 2]", hint: "Sort and two pointers." },

    // --- SLIDING WINDOW (26-40) ---
    { id: 26, title: "Max Subarray Sum (Size K)", difficulty: "Easy", description: "Max sum of subarray of size K.", exampleInput: "[2, 1, 5, 1, 3, 2], k=3", exampleOutput: "9", hint: "Add next, subtract first." },
    { id: 27, title: "Longest Substring No Repeats", difficulty: "Medium", description: "Length of longest substring without repeating chars.", exampleInput: "abcabcbb", exampleOutput: "3", hint: "Map char to index, update start." },
    { id: 28, title: "Min Size Subarray Sum", difficulty: "Medium", description: "Smallest subarray with sum >= target.", exampleInput: "[2,3,1,2,4,3], 7", exampleOutput: "2", hint: "Expand right, shrink left while sum >= target." },
    { id: 29, title: "Longest Repeating Char Replacement", difficulty: "Medium", description: "Longest substring same letter after k changes.", exampleInput: "ABAB, k=2", exampleOutput: "4", hint: "Window len - max count <= k." },
    { id: 30, title: "Permutation in String", difficulty: "Medium", description: "Check if s2 contains permutation of s1.", exampleInput: "ab, eidbaooo", exampleOutput: "true", hint: "Fixed window size, match char counts." },
    { id: 31, title: "Find All Anagrams", difficulty: "Medium", description: "Start indices of p's anagrams in s.", exampleInput: "cbaebabacd, abc", exampleOutput: "[0, 6]", hint: "Sliding window with frequency map." },
    { id: 32, title: "Max Consecutive Ones III", difficulty: "Medium", description: "Max 1s with at most K 0s flipped.", exampleInput: "[1,1,1,0,0,0,1,1,1,1,0], K=2", exampleOutput: "6", hint: "Window can contain at most K zeros." },
    { id: 33, title: "Sliding Window Maximum", difficulty: "Hard", description: "Max value in every window of size k.", exampleInput: "[1,3,-1,-3,5,3,6,7], k=3", exampleOutput: "[3,3,5,5,6,7]", hint: "Monotonic Decreasing Deque." },
    { id: 34, title: "Minimum Window Substring", difficulty: "Hard", description: "Smallest window containing all chars of t.", exampleInput: "ADOBECODEBANC, ABC", exampleOutput: "BANC", hint: "Expand until valid, then shrink." },
    { id: 35, title: "Longest Subarray of 1s", difficulty: "Medium", description: "Longest subarray of 1s after deleting one element.", exampleInput: "[1,1,0,1]", exampleOutput: "3", hint: "Similar to Max Consecutive Ones with K=1." },
    { id: 36, title: "Fruit Into Baskets", difficulty: "Medium", description: "Max fruits with 2 types.", exampleInput: "[1, 2, 1]", exampleOutput: "3", hint: "Longest subarray with at most 2 distinct elements." },
    { id: 37, title: "Subarray Product Less Than K", difficulty: "Medium", description: "Count subarrays with product < K.", exampleInput: "[10, 5, 2, 6], 100", exampleOutput: "8", hint: "Expand right, shrink left if product >= K." },
    { id: 38, title: "Max Vowels in Substring", difficulty: "Medium", description: "Max vowels in substring of length k.", exampleInput: "abciiidef, k=3", exampleOutput: "3", hint: "Fixed window, count vowels." },
    { id: 39, title: "Contains Duplicate II", difficulty: "Easy", description: "Duplicate within distance k.", exampleInput: "[1,2,3,1], k=3", exampleOutput: "true", hint: "Set/Map with size limit k." },
    { id: 40, title: "Number of Sub-arrays Size K Avg >= Threshold", difficulty: "Medium", description: "Count subarrays.", exampleInput: "[2,2,2,2,5,5,5,8], k=3, t=4", exampleOutput: "3", hint: "Sliding window sum." },

    // --- PREFIX SUM (41-50) ---
    { id: 41, title: "Range Sum Query", difficulty: "Easy", description: "Sum of elements between i and j.", exampleInput: "[-2, 0, 3, -5, 2, -1]", exampleOutput: "sumRange(0, 2) -> 1", hint: "Precompute prefix sums." },
    { id: 42, title: "Find Pivot Index", difficulty: "Easy", description: "Index where left sum equals right sum.", exampleInput: "[1, 7, 3, 6, 5, 6]", exampleOutput: "3", hint: "TotalSum - LeftSum - Current = LeftSum." },
    { id: 43, title: "Product of Array Except Self", difficulty: "Medium", description: "Product of all except self without division.", exampleInput: "[1, 2, 3, 4]", exampleOutput: "[24, 12, 8, 6]", hint: "Prefix product * Suffix product." },
    { id: 44, title: "Subarray Sum Equals K", difficulty: "Medium", description: "Count subarrays summing to k.", exampleInput: "[1, 1, 1], k=2", exampleOutput: "2", hint: "Map stores prefix sum frequencies." },
    { id: 45, title: "Contiguous Array", difficulty: "Medium", description: "Max length of subarray with equal 0s and 1s.", exampleInput: "[0, 1]", exampleOutput: "2", hint: "Treat 0 as -1, find max dist between same prefix sums." },
    { id: 46, title: "Running Sum", difficulty: "Easy", description: "Return running sum of array.", exampleInput: "[1, 2, 3, 4]", exampleOutput: "[1, 3, 6, 10]", hint: "arr[i] += arr[i-1]." },
    { id: 47, title: "Highest Altitude", difficulty: "Easy", description: "Max altitude from gain array.", exampleInput: "[-5, 1, 5, 0, -7]", exampleOutput: "1", hint: "Track current altitude (prefix sum)." },
    { id: 48, title: "Min Value to Get Positive Step", difficulty: "Easy", description: "Start value so step sum never < 1.", exampleInput: "[-3, 2, -3, 4, 2]", exampleOutput: "5", hint: "Find min prefix sum." },
    { id: 49, title: "Range Sum Query 2D", difficulty: "Medium", description: "Sum of rectangle in matrix.", exampleInput: "Matrix, (r1,c1,r2,c2)", exampleOutput: "Sum", hint: "2D Prefix Sums." },
    { id: 50, title: "Max Sum Circular Subarray", difficulty: "Medium", description: "Max subarray sum allowing wrap-around.", exampleInput: "[1, -2, 3, -2]", exampleOutput: "3", hint: "Max(Kadane, Total - MinKadane)." },

    // --- BINARY SEARCH (51-65) ---
    { id: 51, title: "Binary Search", difficulty: "Easy", description: "Find target in sorted array.", exampleInput: "[-1,0,3,5,9,12], 9", exampleOutput: "4", hint: "Standard O(log N)." },
    { id: 52, title: "Search Insert Position", difficulty: "Easy", description: "Index to insert target to keep sorted.", exampleInput: "[1,3,5,6], 5", exampleOutput: "2", hint: "Return low if not found." },
    { id: 53, title: "First & Last Position", difficulty: "Medium", description: "Start and end index of target.", exampleInput: "[5,7,7,8,8,10], 8", exampleOutput: "[3, 4]", hint: "Two binary searches." },
    { id: 54, title: "Find Peak Element", difficulty: "Medium", description: "Element greater than neighbors.", exampleInput: "[1, 2, 3, 1]", exampleOutput: "2", hint: "Move towards the rising slope." },
    { id: 55, title: "Search Rotated Sorted Array", difficulty: "Medium", description: "Find target in rotated sorted array.", exampleInput: "[4,5,6,7,0,1,2], 0", exampleOutput: "4", hint: "Check which half is sorted." },
    { id: 56, title: "Find Min in Rotated Array", difficulty: "Medium", description: "Min element in rotated sorted array.", exampleInput: "[3,4,5,1,2]", exampleOutput: "1", hint: "Compare mid with right." },
    { id: 57, title: "Search 2D Matrix", difficulty: "Medium", description: "Find target in sorted matrix.", exampleInput: "[[1,3],[5,7]], 3", exampleOutput: "true", hint: "Treat as 1D array or search row then col." },
    { id: 58, title: "Koko Eating Bananas", difficulty: "Medium", description: "Min speed to eat all bananas in H hours.", exampleInput: "[3,6,7,11], H=8", exampleOutput: "4", hint: "Binary search on answer (speed)." },
    { id: 59, title: "Capacity To Ship Packages", difficulty: "Medium", description: "Min capacity to ship in D days.", exampleInput: "[1,2,3,4,5,6,7,8,9,10], D=5", exampleOutput: "15", hint: "BS on capacity range [max, sum]." },
    { id: 60, title: "Median of Two Sorted Arrays", difficulty: "Hard", description: "Find median of two sorted arrays.", exampleInput: "[1,3], [2]", exampleOutput: "2.0", hint: "Partition both arrays." },
    { id: 61, title: "Single Element in Sorted Array", difficulty: "Medium", description: "Find element appearing once.", exampleInput: "[1,1,2,3,3]", exampleOutput: "2", hint: "Check pairs by index parity." },
    { id: 62, title: "Peak Index in Mountain Array", difficulty: "Easy", description: "Find peak index.", exampleInput: "[0,1,0]", exampleOutput: "1", hint: "Similar to Find Peak Element." },
    { id: 63, title: "Find Smallest Letter Greater Than Target", difficulty: "Easy", description: "Smallest char larger than target.", exampleInput: "['c','f','j'], 'a'", exampleOutput: "'c'", hint: "Standard BS with wrap around logic if needed." },
    { id: 64, title: "Split Array Largest Sum", difficulty: "Hard", description: "Min largest sum of split.", exampleInput: "[7,2,5,10,8], m=2", exampleOutput: "18", hint: "BS on answer (sum)." },
    { id: 65, title: "Aggressive Cows", difficulty: "Medium", description: "Max min distance between cows.", exampleInput: "[1, 2, 8, 4, 9], k=3", exampleOutput: "3", hint: "BS on distance." },

    // --- SORTING & GREEDY (66-75) ---
    { id: 66, title: "Merge Intervals", difficulty: "Medium", description: "Merge overlapping intervals.", exampleInput: "[[1,3],[2,6],[8,10]]", exampleOutput: "[[1,6],[8,10]]", hint: "Sort by start time." },
    { id: 67, title: "Non-overlapping Intervals", difficulty: "Medium", description: "Min removal to make non-overlapping.", exampleInput: "[[1,2],[2,3]]", exampleOutput: "0", hint: "Sort by end time." },
    { id: 68, title: "Insert Interval", difficulty: "Medium", description: "Insert and merge interval.", exampleInput: "[[1,3],[6,9]], [2,5]", exampleOutput: "[[1,5],[6,9]]", hint: "Add before, merge overlap, add after." },
    { id: 69, title: "Meeting Rooms", difficulty: "Easy", description: "Can attend all meetings?", exampleInput: "[[0,30],[5,10]]", exampleOutput: "false", hint: "Sort by start, check overlaps." },
    { id: 70, title: "Meeting Rooms II", difficulty: "Medium", description: "Min conference rooms needed.", exampleInput: "[[0,30],[5,10],[15,20]]", exampleOutput: "2", hint: "Sort starts and ends separately." },
    { id: 71, title: "Majority Element", difficulty: "Easy", description: "Element appearing > n/2 times.", exampleInput: "[3,2,3]", exampleOutput: "3", hint: "Boyer-Moore Voting Algo." },
    { id: 72, title: "Best Time to Buy/Sell Stock", difficulty: "Easy", description: "Max profit from one transaction.", exampleInput: "[7,1,5,3,6,4]", exampleOutput: "5", hint: "Track min price so far." },
    { id: 73, title: "Best Time to Buy/Sell Stock II", difficulty: "Medium", description: "Max profit multiple transactions.", exampleInput: "[7,1,5,3,6,4]", exampleOutput: "7", hint: "Sum all positive slopes." },
    { id: 74, title: "Jump Game", difficulty: "Medium", description: "Can reach last index?", exampleInput: "[2,3,1,1,4]", exampleOutput: "true", hint: "Track max reachable index." },
    { id: 75, title: "Jump Game II", difficulty: "Medium", description: "Min jumps to reach last index.", exampleInput: "[2,3,1,1,4]", exampleOutput: "2", hint: "BFS / Greedy range update." },

    // --- SUBARRAYS & SUBSEQUENCES (76-85) ---
    { id: 76, title: "Max Subarray (Kadane)", difficulty: "Easy", description: "Largest sum contiguous subarray.", exampleInput: "[-2,1,-3,4,-1,2,1,-5,4]", exampleOutput: "6", hint: "Keep local max and global max." },
    { id: 77, title: "Longest Increasing Subsequence", difficulty: "Medium", description: "Longest strictly increasing subsequence.", exampleInput: "[10,9,2,5,3,7,101,18]", exampleOutput: "4", hint: "DP or Patience Sorting (BS)." },
    { id: 78, title: "Longest Common Subsequence", difficulty: "Medium", description: "LCS of two arrays/strings.", exampleInput: "abcde, ace", exampleOutput: "3", hint: "2D DP." },
    { id: 79, title: "Maximum Product Subarray", difficulty: "Medium", description: "Subarray with largest product.", exampleInput: "[2,3,-2,4]", exampleOutput: "6", hint: "Track max and min product." },
    { id: 80, title: "Subarray Sums Divisible by K", difficulty: "Medium", description: "Count subarrays sum divisible by K.", exampleInput: "[4,5,0,-2,-3,1], k=5", exampleOutput: "7", hint: "Prefix sum mod K map." },
    { id: 81, title: "Longest Consecutive Sequence", difficulty: "Medium", description: "Longest sequence elements.", exampleInput: "[100,4,200,1,3,2]", exampleOutput: "4", hint: "Use Set. Check if num-1 exists." },
    { id: 82, title: "Increasing Triplet Subsequence", difficulty: "Medium", description: "Exists i < j < k with nums[i] < nums[j] < nums[k]?", exampleInput: "[1,2,3,4,5]", exampleOutput: "true", hint: "Track first and second smallest." },
    { id: 83, title: "Partition Equal Subset Sum", difficulty: "Medium", description: "Can partition into two equal sum subsets?", exampleInput: "[1,5,11,5]", exampleOutput: "true", hint: "Knapsack DP." },
    { id: 84, title: "Target Sum", difficulty: "Medium", description: "Ways to assign +/- to get target.", exampleInput: "[1,1,1,1,1], 3", exampleOutput: "5", hint: "Subset sum DP." },
    { id: 85, title: "Coin Change", difficulty: "Medium", description: "Min coins to make amount.", exampleInput: "[1,2,5], 11", exampleOutput: "3", hint: "Unbounded Knapsack DP." },

    // --- MATRIX & 2D (86-95) ---
    { id: 86, title: "Rotate Image", difficulty: "Medium", description: "Rotate n x n matrix 90 degrees.", exampleInput: "[[1,2],[3,4]]", exampleOutput: "[[3,1],[4,2]]", hint: "Transpose then reverse rows." },
    { id: 87, title: "Spiral Matrix", difficulty: "Medium", description: "Return elements in spiral order.", exampleInput: "[[1,2,3],[4,5,6],[7,8,9]]", exampleOutput: "[1,2,3,6,9,8,7,4,5]", hint: "Simulation with boundaries." },
    { id: 88, title: "Set Matrix Zeroes", difficulty: "Medium", description: "If element is 0, set row/col to 0.", exampleInput: "[[1,1,1],[1,0,1],[1,1,1]]", exampleOutput: "[[1,0,1],[0,0,0],[1,0,1]]", hint: "Use first row/col as markers." },
    { id: 89, title: "Game of Life", difficulty: "Medium", description: "Next state of cellular automaton.", exampleInput: "[[0,1,0],[0,0,1],[1,1,1],[0,0,0]]", exampleOutput: "...", hint: "Use extra bits to store next state in-place." },
    { id: 90, title: "Valid Sudoku", difficulty: "Medium", description: "Check if 9x9 board is valid.", exampleInput: "Board", exampleOutput: "true", hint: "Check rows, cols, 3x3 boxes." },
    { id: 91, title: "Diagonal Traverse", difficulty: "Medium", description: "Traverse matrix diagonally.", exampleInput: "[[1,2,3],[4,5,6],[7,8,9]]", exampleOutput: "[1,2,4,7,5,3,6,8,9]", hint: "Sum of indices (r+c) is constant." },
    { id: 92, title: "Reshape the Matrix", difficulty: "Easy", description: "Reshape r x c to r' x c'.", exampleInput: "[[1,2],[3,4]], 1, 4", exampleOutput: "[[1,2,3,4]]", hint: "Flatten and reconstruct." },
    { id: 93, title: "Toeplitz Matrix", difficulty: "Easy", description: "Check if diagonals are constant.", exampleInput: "[[1,2],[2,2]]", exampleOutput: "false", hint: "Check arr[r][c] == arr[r-1][c-1]." },
    { id: 94, title: "Transpose Matrix", difficulty: "Easy", description: "Flip over main diagonal.", exampleInput: "[[1,2,3],[4,5,6]]", exampleOutput: "[[1,4],[2,5],[3,6]]", hint: "Swap indices." },
    { id: 95, title: "Flipping an Image", difficulty: "Easy", description: "Reverse rows then invert.", exampleInput: "[[1,1,0],[1,0,1]]", exampleOutput: "[[1,0,0],[0,1,0]]", hint: "Simulation." },

    // --- ADVANCED / MISC (96-100) ---
    { id: 96, title: "First Missing Positive", difficulty: "Hard", description: "Smallest missing positive integer.", exampleInput: "[1,2,0]", exampleOutput: "3", hint: "Cyclic sort / place nums at correct index." },
    { id: 97, title: "Largest Rectangle in Histogram", difficulty: "Hard", description: "Largest rectangle area.", exampleInput: "[2,1,5,6,2,3]", exampleOutput: "10", hint: "Monotonic Stack." },
    { id: 98, title: "Maximal Rectangle", difficulty: "Hard", description: "Largest rectangle of 1s in matrix.", exampleInput: "Matrix", exampleOutput: "6", hint: "Histogram logic on each row." },
    { id: 99, title: "Count Inversions", difficulty: "Hard", description: "Count pairs where i < j and arr[i] > arr[j].", exampleInput: "[8,4,2,1]", exampleOutput: "6", hint: "Merge Sort modification." },
    { id: 100, title: "Next Permutation", difficulty: "Medium", description: "Next lexicographical permutation.", exampleInput: "[1,2,3]", exampleOutput: "[1,3,2]", hint: "Find first decreasing from end, swap, reverse." }
];

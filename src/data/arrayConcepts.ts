export const arrayDefinition = {
    title: "What is an Array?",
    description: "An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together.",
    keyPoints: [
        "Contiguous Memory: Elements are stored side-by-side.",
        "Fixed Size: In many languages (like C/Java), size is fixed on creation.",
        "Same Data Type: All elements usually must be of the same type (int, string, etc)."
    ]
};

export const arrayIndexing = {
    title: "Indexing and Access",
    description: "Arrays use 0-based indexing. This means the first element is at index 0.",
    formula: "Address = Base_Address + (Index * Element_Size)",
    example: "If Base = 1000, Size = 4 bytes, then Index 2 is at 1000 + (2 * 4) = 1008."
};

export const arrayOperations = [
    {
        name: "Access",
        desc: "Getting an element at a specific index.",
        complexity: "O(1)",
        color: "bg-green-100 border-green-300"
    },
    {
        name: "Search",
        desc: "Finding an element by value (Linear Search).",
        complexity: "O(N)",
        color: "bg-yellow-100 border-yellow-300"
    },
    {
        name: "Insertion",
        desc: "Adding an element (requires shifting if not at end).",
        complexity: "O(N)",
        color: "bg-orange-100 border-orange-300"
    },
    {
        name: "Deletion",
        desc: "Removing an element (requires shifting to fill gap).",
        complexity: "O(N)",
        color: "bg-red-100 border-red-300"
    }
];

export const dynamicArrays = {
    title: "Static vs Dynamic Arrays",
    description: "Static arrays have a fixed size. Dynamic arrays (like ArrayList in Java, vector in C++, list in Python) resize automatically.",
    features: [
        { label: "Fixed Size", text: "Allocated once. Cannot grow. (e.g., int arr[10])" },
        { label: "Dynamic Size", text: "Grows as needed. Usually doubles capacity when full." },
        { label: "Amortized O(1)", text: "Insertion is O(1) on average, but O(N) when resizing happens." }
    ]
};

export const multidimensionalArrays = {
    title: "Multidimensional Arrays",
    description: "Arrays can have multiple dimensions, like a grid (2D) or a cube (3D).",
    visual: "Row-major order: Elements are stored row by row in contiguous memory.",
    example: "int matrix[3][3] -> Accessed as matrix[row][col]"
};

export const commonPatterns = [
    {
        name: "Two Pointers",
        desc: "Using two indices to traverse the array (e.g., one from start, one from end).",
        useCase: "Reversing, Pair Sum, Palindrome check."
    },
    {
        name: "Sliding Window",
        desc: "A window of size 'k' moving across the array.",
        useCase: "Max sum subarray of size k, Longest substring."
    },
    {
        name: "Prefix Sum",
        desc: "Precomputing sums to answer range queries quickly.",
        useCase: "Range Sum Query in O(1)."
    }
];

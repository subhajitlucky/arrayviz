import { Code2 } from 'lucide-react';

interface CodeDisplayProps {
  activeOperation: 'insert' | 'delete' | 'search' | 'update' | 'binarySearch' | 'sort' | null;
}

const snippets = {
  insert: `function insertAt(arr, index, value) {
  // Shift elements to make space
  for (let i = arr.length; i > index; i--) {
    arr[i] = arr[i - 1];
  }
  arr[index] = value;
}`,
  delete: `function deleteAt(arr, index) {
  // Shift elements to fill gap
  for (let i = index; i < arr.length - 1; i++) {
    arr[i] = arr[i + 1];
  }
  arr.length--; // Remove last element
}`,
  search: `function search(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) return i;
  }
  return -1;
}`,
  update: `function update(arr, index, value) {
  arr[index] = value;
}`,
  sort: `function sort(arr) {
  // Built-in sort (usually QuickSort or MergeSort)
  arr.sort((a, b) => a - b);
}`,
  binarySearch: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`
};

export default function CodeDisplay({ activeOperation }: CodeDisplayProps) {
  return (
    <div className="bg-slate-900 text-slate-50 p-4 rounded-xl font-mono text-sm overflow-x-auto border border-slate-700 shadow-inner h-full">
      <div className="flex items-center gap-2 mb-3 text-slate-400 border-b border-slate-700 pb-2">
        <Code2 className="w-4 h-4" />
        <span className="uppercase text-xs font-bold tracking-wider">Code Implementation</span>
      </div>
      <pre className="text-blue-300">
        <code>
          {activeOperation ? snippets[activeOperation] : '// Select an operation to see code'}
        </code>
      </pre>
    </div>
  );
}

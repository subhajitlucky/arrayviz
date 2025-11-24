
import type { AlgorithmStep } from './algorithms';
import { binarySearchSteps as originalBinarySearch } from './array';

// Adapter to convert the existing binarySearchSteps generator to match AlgorithmStep
export function* binarySearchAdapter(arr: number[], target: number): Generator<AlgorithmStep> {
    const generator = originalBinarySearch(arr, target);

    for (const step of generator) {
        const pointers = [];
        const variables = [];

        if (step.searchRange) {
            pointers.push({ index: step.searchRange.low, label: 'L', color: 'text-green-600' });
            pointers.push({ index: step.searchRange.high, label: 'H', color: 'text-red-600' });
            pointers.push({ index: step.searchRange.mid, label: 'M', color: 'text-blue-600' });

            variables.push({ name: 'Low', value: step.searchRange.low });
            variables.push({ name: 'High', value: step.searchRange.high });
            variables.push({ name: 'Mid', value: step.searchRange.mid });
        }

        variables.push({ name: 'Target', value: target });

        yield {
            array: step.newArray,
            highlightIndices: step.highlightIndices,
            pointers,
            variables,
            log: step.log,
            description: "Binary Search Step"
        };
    }
}

import { Clock, Database } from 'lucide-react';

interface ComplexityBoxProps {
    activeOperation: 'insert' | 'delete' | 'search' | 'update' | 'binarySearch' | 'sort' | null;
}

const complexities = {
    insert: { time: 'O(N)', space: 'O(1)', note: 'Worst case: Shift all elements' },
    delete: { time: 'O(N)', space: 'O(1)', note: 'Worst case: Shift all elements' },
    search: { time: 'O(N)', space: 'O(1)', note: 'Linear scan needed' },
    update: { time: 'O(1)', space: 'O(1)', note: 'Direct access via index' },
    sort: { time: 'O(N log N)', space: 'O(log N)', note: 'Depends on algorithm (Quick/Merge)' },
    binarySearch: { time: 'O(log N)', space: 'O(1)', note: 'Requires sorted array. Halves search space.' }
};

export default function ComplexityBox({ activeOperation }: ComplexityBoxProps) {
    const info = activeOperation ? complexities[activeOperation] : null;

    return (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm h-full">
            <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
                Complexity Analysis
            </h4>

            {info ? (
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-lg">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Time Complexity</p>
                            <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{info.time}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                            <Database className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Space Complexity</p>
                            <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{info.space}</p>
                        </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-500 dark:text-slate-400 italic">{info.note}</p>
                    </div>
                </div>
            ) : (
                <p className="text-slate-400 text-sm italic py-4 text-center">
                    Perform an operation to see analysis.
                </p>
            )}
        </div>
    );
}

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
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm h-full">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
                Complexity Analysis
            </h4>

            {info ? (
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase">Time Complexity</p>
                            <p className="text-lg font-bold text-slate-800">{info.time}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Database className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase">Space Complexity</p>
                            <p className="text-lg font-bold text-slate-800">{info.space}</p>
                        </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                        <p className="text-xs text-slate-500 italic">{info.note}</p>
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

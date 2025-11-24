import { useState } from 'react';
import { Plus, Trash2, Search, Edit2, RotateCcw, ArrowDownAZ, ScanSearch } from 'lucide-react';

interface ControlPanelProps {
    onInsert: (index: number, value: number) => void;
    onDelete: (index: number) => void;
    onSearch: (value: number) => void;
    onUpdate: (index: number, value: number) => void;
    onReset: () => void;
    onSort: () => void;
    onBinarySearch: (value: number) => void;
}

export default function ControlPanel({ onInsert, onDelete, onSearch, onUpdate, onReset, onSort, onBinarySearch }: ControlPanelProps) {
    const [index, setIndex] = useState<string>('0');
    const [value, setValue] = useState<string>('99');

    const getIndex = () => parseInt(index) || 0;
    const getValue = () => parseInt(value) || 0;

    return (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Index</label>
                    <input
                        type="number"
                        value={index}
                        onChange={(e) => setIndex(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                        placeholder="0"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Value</label>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                        placeholder="0"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={() => onInsert(getIndex(), getValue())}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-700 border border-green-200 rounded hover:bg-green-100 text-sm font-medium transition-colors"
                >
                    <Plus className="w-4 h-4" /> Insert
                </button>
                <button
                    onClick={() => onDelete(getIndex())}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100 text-sm font-medium transition-colors"
                >
                    <Trash2 className="w-4 h-4" /> Delete
                </button>
                <button
                    onClick={() => onSearch(getValue())}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded hover:bg-blue-100 text-sm font-medium transition-colors"
                >
                    <Search className="w-4 h-4" /> Linear Search
                </button>
                <button
                    onClick={() => onUpdate(getIndex(), getValue())}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded hover:bg-amber-100 text-sm font-medium transition-colors"
                >
                    <Edit2 className="w-4 h-4" /> Update
                </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <button
                    onClick={onSort}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-purple-50 text-purple-700 border border-purple-200 rounded hover:bg-purple-100 text-sm font-medium transition-colors"
                >
                    <ArrowDownAZ className="w-4 h-4" /> Sort Array
                </button>
                <button
                    onClick={() => onBinarySearch(getValue())}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded hover:bg-indigo-100 text-sm font-medium transition-colors"
                >
                    <ScanSearch className="w-4 h-4" /> Binary Search
                </button>
            </div>

            <button
                onClick={onReset}
                className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 text-slate-600 border border-slate-200 rounded hover:bg-slate-200 text-sm font-medium transition-colors"
            >
                <RotateCcw className="w-4 h-4" /> Reset Array
            </button>
        </div>
    );
}

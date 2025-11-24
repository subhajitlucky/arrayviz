import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ControlPanel from '../ControlPanel'
import CodeDisplay from '../CodeDisplay'
import ComplexityBox from '../ComplexityBox'
import { insertAt, deleteAt, search, updateAt, sortArray, binarySearchSteps, type ArrayOperationResult } from '../../logic/array'

export default function OperationVisualizer() {
    const [array, setArray] = useState<number[]>([10, 20, 30, 40, 50])
    const [message, setMessage] = useState("Ready to operate.")
    const [activeOperation, setActiveOperation] = useState<'insert' | 'delete' | 'search' | 'update' | 'binarySearch' | 'sort' | null>(null)
    const [highlightIndices, setHighlightIndices] = useState<number[]>([])
    const [searchRange, setSearchRange] = useState<{ low: number; high: number; mid: number } | null>(null)
    const [isSorted, setIsSorted] = useState(false)

    const handleOperationResult = (result: ArrayOperationResult, op: 'insert' | 'delete' | 'search' | 'update' | 'sort') => {
        setArray(result.newArray)
        setMessage(result.log)
        setHighlightIndices(result.highlightIndices)
        setActiveOperation(op)
        setSearchRange(null)

        if (op === 'sort') setIsSorted(true)
        else if (op === 'insert' || op === 'update' || op === 'delete') setIsSorted(false) // Modifying might break sort order

        // Clear highlights after a delay
        setTimeout(() => {
            setHighlightIndices([])
        }, 2000)
    }

    const onInsert = (index: number, value: number) => {
        const result = insertAt(array, index, value)
        handleOperationResult(result, 'insert')
    }

    const onDelete = (index: number) => {
        const result = deleteAt(array, index)
        handleOperationResult(result, 'delete')
    }

    const onSearch = (value: number) => {
        const result = search(array, value)
        handleOperationResult(result, 'search')
    }

    const onUpdate = (index: number, value: number) => {
        const result = updateAt(array, index, value)
        handleOperationResult(result, 'update')
    }

    const onSort = () => {
        const result = sortArray(array)
        handleOperationResult(result, 'sort')
    }

    const onBinarySearch = async (value: number) => {
        if (!isSorted) {
            setMessage("Error: Array must be sorted for Binary Search. Click 'Sort Array' first.")
            return
        }

        setActiveOperation('binarySearch')
        const steps = binarySearchSteps(array, value)

        for (const step of steps) {
            setMessage(step.log)
            setHighlightIndices(step.highlightIndices)
            if (step.searchRange) setSearchRange(step.searchRange)

            // Wait for 1.5 seconds to visualize the step
            await new Promise(resolve => setTimeout(resolve, 1500))
        }

        // Clear range after done
        setTimeout(() => {
            setSearchRange(null)
            setHighlightIndices([])
        }, 2000)
    }

    const onReset = () => {
        setArray([10, 20, 30, 40, 50])
        setMessage("Reset to initial state.")
        setActiveOperation(null)
        setHighlightIndices([])
        setSearchRange(null)
        setIsSorted(true) // Initial state is sorted
    }

    // Base memory address for visualization (e.g., 0x100)
    const BASE_ADDRESS = 0x100;
    const ELEMENT_SIZE = 4; // 4 bytes for an integer

    return (
        <div className="flex flex-col gap-6">
            {/* Top Section: Visualizer & Controls */}
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">

                {/* Left: Visualizer & Controls (Takes 2 cols) */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Visualizer Area */}
                    <div className="bg-white dark:bg-slate-900 p-4 md:p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
                        <h3 className="absolute top-4 left-4 font-bold text-slate-400 text-sm uppercase tracking-wider">Memory Visualization</h3>

                        <div className="flex items-end gap-2 overflow-x-auto max-w-full p-4 pt-12">
                            <AnimatePresence mode='popLayout'>
                                {array.map((val, idx) => {
                                    // Determine if this index is outside the current binary search range
                                    const isDimmed = searchRange && (idx < searchRange.low || idx > searchRange.high);

                                    return (
                                        <div key={`${idx}-${val}`} className={`flex flex-col items-center gap-2 transition-opacity duration-300 ${isDimmed ? 'opacity-20 blur-[1px]' : 'opacity-100'}`}>

                                            {/* Binary Search Pointers */}
                                            {searchRange && (
                                                <div className="h-6 relative w-full flex justify-center">
                                                    {idx === searchRange.low && <span className="absolute -top-6 text-[10px] font-bold text-green-600 dark:text-green-400">L</span>}
                                                    {idx === searchRange.high && <span className="absolute -top-6 text-[10px] font-bold text-red-600 dark:text-red-400">H</span>}
                                                    {idx === searchRange.mid && <span className="absolute -top-6 text-[10px] font-bold text-blue-600 dark:text-blue-400">M</span>}
                                                </div>
                                            )}

                                            {/* Index Label */}
                                            <span className="text-xs font-mono text-slate-400 mb-1">[{idx}]</span>

                                            {/* Array Element Box */}
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    scale: 1,
                                                    backgroundColor: highlightIndices.includes(idx) ? '#3b82f6' : '#ffffff',
                                                    borderColor: highlightIndices.includes(idx) ? '#3b82f6' : '#6366f1',
                                                    color: highlightIndices.includes(idx) ? '#1d4ed8' : '#4338ca'
                                                }}
                                                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                                                transition={{ duration: 0.4 }}
                                                className="relative w-14 h-14 flex items-center justify-center border-2 font-bold rounded-lg shadow-sm z-10 text-lg bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                                            >
                                                {val}
                                            </motion.div>

                                            {/* Memory Address (Hex) */}
                                            <div className="flex flex-col items-center">
                                                <div className="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>
                                                <span className="text-[10px] font-mono text-slate-400 bg-slate-50 dark:bg-slate-800 px-1 rounded border border-slate-100 dark:border-slate-700">
                                                    0x{(BASE_ADDRESS + (idx * ELEMENT_SIZE)).toString(16).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </AnimatePresence>
                        </div>

                        {/* Status Message */}
                        <div className="absolute bottom-4 left-0 right-0 text-center px-4">
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 inline-block px-3 py-1 rounded-full border border-slate-100 dark:border-slate-700">
                                {message}
                            </p>
                        </div>
                    </div>

                    {/* Controls */}
                    <ControlPanel
                        onInsert={onInsert}
                        onDelete={onDelete}
                        onSearch={onSearch}
                        onUpdate={onUpdate}
                        onReset={onReset}
                        onSort={onSort}
                        onBinarySearch={onBinarySearch}
                    />
                </div>

                {/* Right: Code & Complexity (Takes 1 col) */}
                <div className="flex flex-col gap-6">
                    <div className="flex-1 min-h-[200px]">
                        <ComplexityBox activeOperation={activeOperation} />
                    </div>
                    <div className="flex-1 min-h-[200px]">
                        <CodeDisplay activeOperation={activeOperation} />
                    </div>
                </div>
            </div>
        </div>
    )
}

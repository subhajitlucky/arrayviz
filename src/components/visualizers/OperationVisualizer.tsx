import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, RotateCcw } from 'lucide-react'

export default function OperationVisualizer() {
    const [array, setArray] = useState([10, 20, 30, 40, 50])
    const [message, setMessage] = useState("Ready to operate.")

    const insertAtIndex = (index: number, value: number) => {
        if (array.length >= 8) {
            setMessage("Array is full! (Max 8 elements for demo)")
            return
        }
        setMessage(`Inserting ${value} at index ${index}... Shifting elements right.`)
        const newArr = [...array]
        newArr.splice(index, 0, value)
        setArray(newArr)
    }

    const deleteAtIndex = (index: number) => {
        if (array.length <= 0) return
        setMessage(`Deleting element at index ${index}... Shifting elements left.`)
        const newArr = [...array]
        newArr.splice(index, 1)
        setArray(newArr)
    }

    const reset = () => {
        setArray([10, 20, 30, 40, 50])
        setMessage("Reset to initial state.")
    }

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Visualizing Operations</h3>

            {/* Controls */}
            <div className="flex flex-wrap gap-3 mb-8">
                <button
                    onClick={() => insertAtIndex(2, 99)}
                    className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 border border-green-200 rounded hover:bg-green-100 text-sm font-medium"
                >
                    <Plus className="w-4 h-4" /> Insert 99 at Index 2
                </button>
                <button
                    onClick={() => deleteAtIndex(2)}
                    className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100 text-sm font-medium"
                >
                    <Trash2 className="w-4 h-4" /> Delete Index 2
                </button>
                <button
                    onClick={reset}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-50 text-slate-700 border border-slate-200 rounded hover:bg-slate-100 text-sm font-medium ml-auto"
                >
                    <RotateCcw className="w-4 h-4" /> Reset
                </button>
            </div>

            {/* Visualization */}
            <div className="relative h-24 flex items-center gap-2 overflow-hidden border-b border-slate-100 pb-8">
                <AnimatePresence mode='popLayout'>
                    {array.map((val, idx) => (
                        <motion.div
                            key={`${val}-${idx}`} // Using idx in key to force re-render on shift for demo clarity, or unique ID ideally
                            layout
                            initial={{ opacity: 0, y: -20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.8 }}
                            transition={{ duration: 0.4 }}
                            className="relative w-12 h-12 flex items-center justify-center bg-white border-2 border-indigo-500 text-indigo-700 font-bold rounded-lg shadow-sm z-10"
                        >
                            {val}
                            <span className="absolute -bottom-6 text-[10px] text-slate-400 font-mono font-normal">
                                {idx}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="mt-4 text-sm text-slate-600 italic">
                Status: {message}
            </div>
        </div>
    )
}

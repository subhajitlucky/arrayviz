import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, RefreshCw } from 'lucide-react'

export default function DynamicArrayVisualizer() {
    const [capacity, setCapacity] = useState(4)
    const [elements, setElements] = useState<number[]>([10, 20])
    const [isResizing, setIsResizing] = useState(false)
    const [message, setMessage] = useState("Ready. Capacity is 4, Size is 2.")

    const addElement = async () => {
        if (isResizing) return

        if (elements.length === capacity) {
            // Trigger Resize
            setIsResizing(true)
            setMessage(`Capacity full (${capacity}). Resizing to ${capacity * 2}...`)

            // Wait for visual effect of "full" state
            await new Promise(r => setTimeout(r, 1000))

            // Double capacity
            const newCapacity = capacity * 2
            setCapacity(newCapacity)
            setMessage(`Allocated new memory block of size ${newCapacity}. Copying elements...`)

            // Simulate copying delay
            await new Promise(r => setTimeout(r, 1500))

            setIsResizing(false)
            setElements([...elements, Math.floor(Math.random() * 90) + 10])
            setMessage(`Resizing complete. Added new element.`)
        } else {
            setElements([...elements, Math.floor(Math.random() * 90) + 10])
            setMessage(`Added element. Size: ${elements.length + 1}, Capacity: ${capacity}`)
        }
    }

    const reset = () => {
        setCapacity(4)
        setElements([10, 20])
        setIsResizing(false)
        setMessage("Reset to initial state.")
    }

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-slate-100">Dynamic Array Internals</h3>

            {/* Metrics */}
            <div className="flex gap-8 mb-6">
                <div>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase block">Size</span>
                    <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{elements.length}</span>
                </div>
                <div>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase block">Capacity</span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{capacity}</span>
                </div>
                <div className="flex-1 text-right">
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase block">Status</span>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{message}</span>
                </div>
            </div>

            {/* Visualizer */}
            <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-4 min-h-[120px] flex items-center gap-2 overflow-x-auto bg-slate-50 dark:bg-slate-800/50 transition-all duration-500"
                style={{ borderColor: isResizing ? '#f59e0b' : '#cbd5e1' }}
            >
                {isResizing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-slate-900/50 z-20 backdrop-blur-[1px]">
                        <div className="flex flex-col items-center gap-2">
                            <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
                            <span className="text-amber-600 font-bold text-sm">Resizing & Copying...</span>
                        </div>
                    </div>
                )}

                <AnimatePresence>
                    {/* Render actual elements */}
                    {elements.map((val, idx) => (
                        <motion.div
                            key={`${idx}-${val}`} // Use index in key to prevent re-mount issues during simple adds, but unique enough
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-blue-500 text-white font-bold rounded shadow-sm z-10"
                        >
                            {val}
                        </motion.div>
                    ))}

                    {/* Render empty capacity slots */}
                    {Array.from({ length: capacity - elements.length }).map((_, idx) => (
                        <div
                            key={`empty-${idx}`}
                            className="w-12 h-12 flex-shrink-0 border-2 border-slate-200 dark:border-slate-700 rounded border-dashed flex items-center justify-center text-slate-300 dark:text-slate-600 text-xs"
                        >
                            Empty
                        </div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-6 flex gap-4">
                <button
                    onClick={addElement}
                    disabled={isResizing}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                    <Plus className="w-4 h-4" /> Add Element
                </button>
                <button
                    onClick={reset}
                    disabled={isResizing}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors font-medium"
                >
                    <RefreshCw className="w-4 h-4" /> Reset
                </button>
            </div>
        </div>
    )
}

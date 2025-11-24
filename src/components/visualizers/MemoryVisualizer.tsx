import { useState } from 'react'

export default function MemoryVisualizer() {
    const [baseAddress, setBaseAddress] = useState(1000)
    const [elementSize, setElementSize] = useState(4)
    const [highlightIndex, setHighlightIndex] = useState<number | null>(null)

    const arrayLength = 5
    const indices = Array.from({ length: arrayLength }, (_, i) => i)

    return (
        <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-slate-100">Interactive Memory Layout</h3>

            <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Base Address</label>
                    <input
                        type="number"
                        value={baseAddress}
                        onChange={(e) => setBaseAddress(Number(e.target.value))}
                        className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 rounded px-2 py-1 w-24 font-mono text-sm text-slate-900 dark:text-slate-100"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Element Size (Bytes)</label>
                    <select
                        value={elementSize}
                        onChange={(e) => setElementSize(Number(e.target.value))}
                        className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 rounded px-2 py-1 font-mono text-sm text-slate-900 dark:text-slate-100"
                    >
                        <option value={1}>1 (char)</option>
                        <option value={4}>4 (int)</option>
                        <option value={8}>8 (double)</option>
                    </select>
                </div>
            </div>

            <div className="relative pt-8 pb-8 overflow-x-auto max-w-full">
                <div className="flex gap-1 min-w-max">
                    {indices.map((index) => {
                        const address = baseAddress + (index * elementSize)
                        const isHighlighted = highlightIndex === index

                        return (
                            <div
                                key={index}
                                className="relative flex flex-col items-center group cursor-pointer"
                                onMouseEnter={() => setHighlightIndex(index)}
                                onMouseLeave={() => setHighlightIndex(null)}
                            >
                                {/* Index Label */}
                                <span className="mb-2 text-xs font-mono text-slate-400 dark:text-slate-500">Index {index}</span>

                                {/* Memory Block */}
                                <div className={`
                  w-20 h-20 border-2 flex items-center justify-center font-bold text-xl transition-all duration-200
                  ${isHighlighted
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-md -translate-y-1 z-10'
                                        : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}
                `}>
                                    data[{index}]
                                </div>

                                {/* Address Label */}
                                <div className="mt-2 flex flex-col items-center">
                                    <span className={`text-xs font-mono font-bold ${isHighlighted ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>
                                        {address}
                                    </span>
                                    {isHighlighted && (
                                        <div className="absolute top-full mt-1 whitespace-nowrap z-20 bg-slate-800 dark:bg-slate-700 text-white text-[10px] px-2 py-1 rounded">
                                            {baseAddress} + ({index} × {elementSize})
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="mt-6 bg-slate-50 dark:bg-slate-800/50 p-3 rounded text-sm text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                <p>
                    <strong>Formula:</strong> <code className="bg-white dark:bg-slate-900 px-1 border border-slate-200 dark:border-slate-700 rounded">Address = Base + (Index × Size)</code>
                </p>
                {highlightIndex !== null && (
                    <p className="mt-1 text-blue-600 dark:text-blue-400">
                        Address of index {highlightIndex} = {baseAddress} + ({highlightIndex} × {elementSize}) = <strong>{baseAddress + (highlightIndex * elementSize)}</strong>
                    </p>
                )}
            </div>
        </div>
    )
}

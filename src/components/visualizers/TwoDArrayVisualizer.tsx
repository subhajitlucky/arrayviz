import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function TwoDArrayVisualizer() {
    const rows = 3
    const cols = 3
    const [hoveredCell, setHoveredCell] = useState<{ r: number, c: number } | null>(null)

    // Generate matrix data
    const matrix = Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => ({ r, c, val: r * cols + c }))
    )

    // Linear memory representation
    const linearMemory = matrix.flat()
    const BASE_ADDRESS = 2000;
    const ELEMENT_SIZE = 4;

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-lg mb-6 text-slate-900 dark:text-slate-100">2D Array in Memory (Row-Major)</h3>

            <div className="flex flex-col gap-12">

                {/* 2D View */}
                <div className="flex flex-col items-center">
                    <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase mb-4">Logical View (Grid)</h4>
                    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                        {matrix.map((row, rIdx) => (
                            row.map((_, cIdx) => {
                                const isHovered = hoveredCell?.r === rIdx && hoveredCell?.c === cIdx
                                return (
                                    <div
                                        key={`${rIdx}-${cIdx}`}
                                        onMouseEnter={() => setHoveredCell({ r: rIdx, c: cIdx })}
                                        onMouseLeave={() => setHoveredCell(null)}
                                        className={`
                      w-12 h-12 flex items-center justify-center border-2 rounded cursor-pointer transition-all
                      ${isHovered
                                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 scale-110 shadow-lg z-10'
                                                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'}
                    `}
                                    >
                                        <span className="text-xs font-mono">[{rIdx}][{cIdx}]</span>
                                    </div>
                                )
                            })
                        ))}
                    </div>
                </div>

                {/* Linear View */}
                <div className="flex flex-col w-full overflow-hidden">
                    <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase mb-4 text-center">Physical View (Linear Memory)</h4>

                    <div className="overflow-x-auto pb-6 pt-2 px-4">
                        <div className="flex items-start gap-0 w-fit mx-auto">
                            {linearMemory.map((cell, idx) => {
                                const isHovered = hoveredCell?.r === cell.r && hoveredCell?.c === cell.c
                                const isRowStart = cell.c === 0
                                const address = BASE_ADDRESS + (idx * ELEMENT_SIZE)

                                return (
                                    <div key={idx} className="flex flex-col items-center group relative">
                                        {/* Row Label (Only at start of row block) */}
                                        {isRowStart && (
                                            <div className="absolute -top-8 left-0 right-0 text-center">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cell.r % 2 === 0 ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800' : 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-800'
                                                    }`}>
                                                    Row {cell.r}
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex items-center">
                                            {/* The Cell */}
                                            <div
                                                onMouseEnter={() => setHoveredCell({ r: cell.r, c: cell.c })}
                                                onMouseLeave={() => setHoveredCell(null)}
                                                className={`
                                                    w-14 h-14 flex flex-col items-center justify-center border-y border-r first:border-l transition-all cursor-pointer relative
                                                    ${isHovered ? 'bg-indigo-50 dark:bg-indigo-900/20 z-10' : 'bg-white dark:bg-slate-800'}
                                                    ${cell.r % 2 === 0 ? 'border-blue-200 dark:border-blue-800' : 'border-purple-200 dark:border-purple-800'}
                                                `}
                                            >
                                                <span className={`font-bold ${isHovered ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}>
                                                    {cell.val}
                                                </span>
                                                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                                                    {cell.r},{cell.c}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Address */}
                                        <div className="mt-2 flex flex-col items-center">
                                            <div className="h-2 w-px bg-slate-200 dark:bg-slate-700 mb-1"></div>
                                            <span className={`text-[10px] font-mono ${isHovered ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-400 dark:text-slate-500'}`}>
                                                {address}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}

                            {/* Continuation dots */}
                            <div className="flex items-center h-14 pl-2 text-slate-300 dark:text-slate-600">
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-center">
                        <span className="inline-block w-3 h-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-sm align-middle mr-1"></span> Row 0
                        <span className="mx-2">|</span>
                        <span className="inline-block w-3 h-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-sm align-middle mr-1"></span> Row 1
                        <span className="mx-2">|</span>
                        Memory addresses are contiguous.
                    </p>
                </div>

            </div>
        </div>
    )
}

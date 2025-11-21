import { useState } from 'react'

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

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-6">2D Array in Memory (Row-Major)</h3>

            <div className="grid md:grid-cols-2 gap-12 items-start">

                {/* 2D View */}
                <div className="flex flex-col items-center">
                    <h4 className="text-sm font-semibold text-slate-500 uppercase mb-4">Logical View (Grid)</h4>
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
                                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700 scale-110 shadow-lg z-10'
                                                : 'border-slate-200 bg-white text-slate-600'}
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
                <div className="flex flex-col items-center w-full">
                    <h4 className="text-sm font-semibold text-slate-500 uppercase mb-4">Physical View (Linear Memory)</h4>
                    <div className="flex flex-wrap gap-1 justify-center max-w-xs">
                        {linearMemory.map((cell, idx) => {
                            const isHovered = hoveredCell?.r === cell.r && hoveredCell?.c === cell.c
                            const isRowStart = cell.c === 0

                            return (
                                <div key={idx} className="flex flex-col items-center">
                                    {/* Row Label for visual grouping */}
                                    {isRowStart && (
                                        <div className="w-full text-[10px] text-slate-400 text-center border-b border-slate-100 mb-1 pb-1">
                                            Row {cell.r}
                                        </div>
                                    )}

                                    <div
                                        className={`
                      w-10 h-10 flex items-center justify-center border rounded text-xs font-mono transition-all
                      ${isHovered
                                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700 scale-110 shadow-md'
                                                : 'border-slate-200 bg-slate-50 text-slate-400'}
                    `}
                                    >
                                        {idx}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <p className="mt-4 text-xs text-slate-500 text-center max-w-xs">
                        Notice how <strong>Row 0</strong> is stored first, followed immediately by <strong>Row 1</strong>, and so on.
                    </p>
                </div>

            </div>
        </div>
    )
}

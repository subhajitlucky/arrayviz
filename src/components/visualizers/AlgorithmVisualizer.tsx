import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';
import type { AlgorithmStep, TreeNode } from '../../logic/algorithms';

interface AlgorithmVisualizerProps {
    generator: Generator<AlgorithmStep>;
    initialArray: number[];
    onReset: () => void;
}

export default function AlgorithmVisualizer({ generator, initialArray, onReset }: AlgorithmVisualizerProps) {
    const [step, setStep] = useState<AlgorithmStep | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    // We need to keep the generator instance ref to persist it across renders
    const generatorRef = useRef<Generator<AlgorithmStep>>(generator);

    // Initialize first step
    useEffect(() => {
        // Reset state when generator changes (or on mount)
        generatorRef.current = generator;
        setIsFinished(false);
        setIsPlaying(false);

        // Initial "dummy" step to show initial array
        setStep({
            array: initialArray,
            highlightIndices: [],
            pointers: [],
            variables: [],
            log: "Ready to start.",
            description: "Click Play or Step to begin."
        });
    }, [generator, initialArray]);

    const nextStep = () => {
        if (isFinished) return;

        const result = generatorRef.current.next();

        if (result.done) {
            setIsFinished(true);
            setIsPlaying(false);
            return;
        }

        const newStep = result.value;
        setStep(newStep);
    };

    useEffect(() => {
        let interval: any;
        if (isPlaying && !isFinished) {
            interval = setInterval(() => {
                nextStep();
            }, 1500); // 1.5s delay between steps
        }
        return () => clearInterval(interval);
    }, [isPlaying, isFinished]);

    if (!step) return null;

    return (
        <div className="flex flex-col gap-6">
            {/* Visualizer Box */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm h-[400px] flex flex-col items-center justify-center relative overflow-hidden">

                {/* Visualization Area */}
                <div className="flex items-center justify-center w-full h-full overflow-auto p-4">
                    <AnimatePresence mode='wait'>
                        {/* GRID MODE */}
                        {step.visualizationType === 'grid' && step.grid ? (
                            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${step.grid[0].length}, minmax(40px, 1fr))` }}>
                                {step.grid.flat().map((val, idx) => {
                                    const row = Math.floor(idx / step.grid![0].length);
                                    const col = idx % step.grid![0].length;
                                    const isHighlighted = step.highlightIndices.includes(idx);

                                    return (
                                        <motion.div
                                            key={`${row}-${col}-${val}`}
                                            layout
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{
                                                scale: 1,
                                                opacity: 1,
                                                backgroundColor: isHighlighted ? '#eff6ff' : '#ffffff',
                                                borderColor: isHighlighted ? '#3b82f6' : '#e2e8f0',
                                                color: isHighlighted ? '#1d4ed8' : '#1e293b'
                                            }}
                                            className={`
                                                w-10 h-10 flex items-center justify-center border rounded font-mono text-sm shadow-sm
                                                dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100
                                                ${isHighlighted ? '!bg-blue-900/20 !border-blue-500 !text-blue-400' : ''}
                                            `}
                                        >
                                            {val}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        ) : step.visualizationType === 'tree' && step.treeRoot ? (
                            /* TREE MODE */
                            <div className="flex justify-center items-start pt-8">
                                <TreeRenderer node={step.treeRoot} highlightIndices={step.highlightIndices} allNodes={step.array} />
                            </div>
                        ) : (
                            /* ARRAY MODE (Default) */
                            <div className="flex items-end gap-3">
                                {step.array.map((val, idx) => (
                                    <div key={`${idx}-${val}`} className="flex flex-col items-center gap-2 relative">
                                        {/* Pointers */}
                                        <div className="absolute -top-8 h-8 w-full flex justify-center items-end">
                                            {step.pointers.filter(p => p.index === idx).map((p, pIdx) => (
                                                <motion.div
                                                    key={p.label}
                                                    initial={{ y: -10, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    className={`absolute ${p.color} font-bold text-sm flex flex-col items-center whitespace-nowrap`}
                                                    style={{ bottom: `${pIdx * 20}px`, zIndex: 10 }}
                                                >
                                                    <span>{p.label}</span>
                                                    <div className="w-0.5 h-2 bg-current"></div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Element Box */}
                                        <motion.div
                                            layout
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{
                                                scale: 1,
                                                opacity: 1,
                                                backgroundColor: step.highlightIndices.includes(idx) ? '#eff6ff' : '#ffffff',
                                                borderColor: step.highlightIndices.includes(idx) ? '#3b82f6' : '#e2e8f0',
                                                color: step.highlightIndices.includes(idx) ? '#1d4ed8' : '#1e293b'
                                            }}
                                            className={`
                                                w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold text-lg shadow-sm z-10 relative
                                                dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100
                                                ${step.highlightIndices.includes(idx) ? '!bg-blue-900/20 !border-blue-500 !text-blue-400' : ''}
                                            `}
                                        >
                                            {val}
                                        </motion.div>

                                        {/* Index */}
                                        <span className="text-xs font-mono text-slate-400">
                                            {idx}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Variables Panel */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                    {step.variables.map((v) => (
                        <div key={v.name} className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded border border-slate-100 dark:border-slate-700 text-xs font-mono shadow-sm">
                            <span className="text-slate-500 dark:text-slate-400 mr-2">{v.name}:</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{v.value}</span>
                        </div>
                    ))}
                </div>

                {/* Log/Description */}
                <div className="absolute bottom-4 left-0 right-0 text-center px-4">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 inline-block px-4 py-2 rounded-full border border-slate-100 dark:border-slate-700 shadow-sm">
                        {step.log}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{step.description}</p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
                <button
                    onClick={onReset}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-colors"
                >
                    <RotateCcw className="w-4 h-4" /> Reset
                </button>

                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    disabled={isFinished}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/20 ${isFinished
                        ? 'bg-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Pause' : 'Play'}
                </button>

                <button
                    onClick={nextStep}
                    disabled={isFinished || isPlaying}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-colors disabled:opacity-50"
                >
                    Step <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

function TreeRenderer({ node, highlightIndices, allNodes }: { node: TreeNode, highlightIndices: number[], allNodes: number[] }) {
    // Find index of this node in the original array (naive approach for this specific demo)
    const index = parseInt(node.id);
    const isHighlighted = highlightIndices.includes(index);

    return (
        <div className="flex flex-col items-center">
            <motion.div
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    backgroundColor: isHighlighted ? '#eff6ff' : '#ffffff',
                    borderColor: isHighlighted ? '#3b82f6' : '#e2e8f0',
                    color: isHighlighted ? '#1d4ed8' : '#1e293b'
                }}
                className={`
                    w-12 h-12 flex items-center justify-center border-2 rounded-full font-bold text-lg shadow-sm z-10 relative mb-4
                    dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100
                    ${isHighlighted ? '!bg-blue-900/20 !border-blue-500 !text-blue-400' : ''}
                `}
            >
                {node.val}
                <span className="absolute -bottom-6 text-[10px] text-slate-400 font-mono">idx:{index}</span>
            </motion.div>

            {/* Children Container */}
            <div className="flex gap-4 mt-8 relative">
                {/* N-ary children */}
                {node.children && node.children.length > 0 && (
                    <>
                        {node.children.map((child) => (
                            <div key={child.id} className="relative flex flex-col items-center">
                                {/* Connector Line */}
                                <div className="absolute -top-8 left-1/2 w-px h-8 bg-slate-300 -translate-x-1/2" />
                                {/* Horizontal connector if multiple children (simplified) */}
                                <TreeRenderer node={child} highlightIndices={highlightIndices} allNodes={allNodes} />
                            </div>
                        ))}
                    </>
                )}

                {/* Binary Fallback (if no children array used) */}
                {!node.children && (node.left || node.right) && (
                    <>
                        {node.left && (
                            <div className="relative flex flex-col items-center">
                                <div className="absolute -top-8 right-0 w-8 h-px bg-slate-300 origin-right rotate-45 translate-y-4" />
                                <TreeRenderer node={node.left} highlightIndices={highlightIndices} allNodes={allNodes} />
                            </div>
                        )}
                        {node.right && (
                            <div className="relative flex flex-col items-center">
                                <div className="absolute -top-8 left-0 w-8 h-px bg-slate-300 origin-left -rotate-45 translate-y-4" />
                                <TreeRenderer node={node.right} highlightIndices={highlightIndices} allNodes={allNodes} />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

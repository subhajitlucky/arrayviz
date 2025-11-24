import { useState } from 'react';
import { patterns } from '../data/patterns';
import AlgorithmVisualizer from '../components/visualizers/AlgorithmVisualizer';
import { twoSumSteps, slidingWindowSteps, kadaneSteps, prefixSumSteps } from '../logic/algorithms';
import { binarySearchAdapter } from '../logic/binarySearchAdapter';
import { Clock, Database, Code2, PlayCircle } from 'lucide-react';

export default function Patterns() {
    const [activePatternId, setActivePatternId] = useState(patterns[0].id);
    const [key, setKey] = useState(0); // Used to force re-render of visualizer on reset

    const activePattern = patterns.find(p => p.id === activePatternId) || patterns[0];

    // Helper to get the correct generator based on ID
    const getGenerator = () => {
        switch (activePattern.id) {
            case 'two-pointers':
                return twoSumSteps(activePattern.defaultArray, activePattern.defaultTarget || 13);
            case 'sliding-window':
                return slidingWindowSteps(activePattern.defaultArray, activePattern.defaultK || 3);
            case 'kadane':
                return kadaneSteps(activePattern.defaultArray);
            case 'prefix-sum':
                return prefixSumSteps(activePattern.defaultArray);
            case 'binary-search':
                return binarySearchAdapter(activePattern.defaultArray, activePattern.defaultTarget || 40);
            // Fallback for others not yet implemented
            default:
                return twoSumSteps(activePattern.defaultArray, 13);
        }
    };

    const handleReset = () => {
        setKey(prev => prev + 1);
    };

    return (
        <main className="mx-auto max-w-7xl px-4 py-12">
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Essential Patterns</h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                    Master these fundamental algorithmic patterns to solve complex array problems efficiently.
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Sidebar: Pattern List */}
                <div className="lg:col-span-3 space-y-2">
                    {patterns.map((pattern) => (
                        <button
                            key={pattern.id}
                            onClick={() => {
                                setActivePatternId(pattern.id);
                                handleReset();
                            }}
                            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-between ${activePatternId === pattern.id
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                                }`}
                        >
                            {pattern.title}
                            {activePatternId === pattern.id && <PlayCircle className="w-4 h-4" />}
                        </button>
                    ))}
                </div>

                {/* Main Content */}
                <div className="lg:col-span-9 space-y-8">

                    {/* Pattern Info */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{activePattern.title}</h2>
                                <p className="text-slate-600 dark:text-slate-300">{activePattern.description}</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg text-sm font-medium border border-orange-100 dark:border-orange-800">
                                    <Clock className="w-4 h-4" /> {activePattern.complexity.time}
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium border border-blue-100 dark:border-blue-800">
                                    <Database className="w-4 h-4" /> {activePattern.complexity.space}
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800 mb-6">
                            <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Common Use Cases</h4>
                            <p className="text-slate-700 dark:text-slate-300">{activePattern.useCase}</p>
                        </div>

                        {/* Visualizer */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Visualization</h3>
                            {/* Key forces re-mount on reset/change */}
                            <AlgorithmVisualizer
                                key={`${activePatternId}-${key}`}
                                generator={getGenerator()}
                                initialArray={activePattern.defaultArray}
                                onReset={handleReset}
                            />
                        </div>

                        {/* Code Snippet */}
                        <div>
                            <div className="flex items-center gap-2 mb-3 text-slate-500 dark:text-slate-400">
                                <Code2 className="w-4 h-4" />
                                <span className="uppercase text-xs font-bold tracking-wider">Implementation</span>
                            </div>
                            <pre className="bg-slate-900 text-blue-300 p-4 rounded-xl font-mono text-sm overflow-x-auto border border-slate-700 shadow-inner">
                                <code>{activePattern.code}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

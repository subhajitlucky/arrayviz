import { useState } from 'react';
import { patterns } from '../data/patterns';
import AlgorithmVisualizer from '../components/visualizers/AlgorithmVisualizer';
import {
    twoSumSteps,
    slidingWindowSteps,
    kadaneSteps,
    prefixSumSteps,
    fastSlowPointersSteps,
    floydsCycleDetectionSteps,
    hashingSteps,
    inPlaceSteps,
    monotonicStackSteps,
    binarySearchAnswerSteps,
    greedyIntervalsSteps,
    matrixTraversalSteps,
    backtrackingSteps,
    meetInMiddleSteps,
    dfsBfsSteps,
    treeTraversalSteps,
    shortestPathSteps,
    dp1DSteps,
    dp2DSteps,
    knapsackSteps,
    lcsSteps
} from '../logic/algorithms';
import { binarySearchAdapter } from '../logic/binarySearchAdapter';
import { Clock, Database, Code2, Sparkles } from 'lucide-react';

// Category labels
const categoryLabels = {
    'core': 'Core Essential Patterns',
    'intermediate': 'Intermediate Patterns',
    'graph-tree': 'Graph & Tree Patterns',
    'dynamic-programming': 'Dynamic Programming'
};

export default function Patterns() {
    const [activePatternId, setActivePatternId] = useState(patterns[0].id);
    const [key, setKey] = useState(0); // Used to force re-render of visualizer on reset
    const [fastSlowVariant, setFastSlowVariant] = useState<'middle' | 'floyd'>('middle'); // For Fast & Slow switcher

    const activePattern = patterns.find(p => p.id === activePatternId) || patterns[0];

    // Group patterns by category
    const groupedPatterns = patterns.reduce((acc, pattern) => {
        if (!acc[pattern.category]) acc[pattern.category] = [];
        acc[pattern.category].push(pattern);
        return acc;
    }, {} as Record<string, typeof patterns>);

    // Helper to get the correct generator based on ID
    const getGenerator = () => {
        switch (activePattern.id) {
            // Core patterns
            case 'two-pointers':
                return twoSumSteps(activePattern.defaultArray, activePattern.defaultTarget || 13);
            case 'fast-slow-pointers':
                return fastSlowVariant === 'floyd'
                    ? floydsCycleDetectionSteps(activePattern.defaultArray)
                    : fastSlowPointersSteps(activePattern.defaultArray);
            case 'sliding-window':
                return slidingWindowSteps(activePattern.defaultArray, activePattern.defaultK || 3);
            case 'prefix-sum':
                return prefixSumSteps(activePattern.defaultArray);
            case 'binary-search':
                return binarySearchAdapter(activePattern.defaultArray, activePattern.defaultTarget || 40);
            case 'binary-search-answer':
                return binarySearchAnswerSteps(activePattern.defaultArray);
            case 'kadane':
                return kadaneSteps(activePattern.defaultArray);
            case 'in-place':
                return inPlaceSteps(activePattern.defaultArray);

            // Intermediate patterns
            case 'hashing':
                return hashingSteps(activePattern.defaultArray);
            case 'monotonic-stack':
                return monotonicStackSteps(activePattern.defaultArray);
            case 'greedy-intervals':
                return greedyIntervalsSteps(activePattern.defaultArray as any);
            case 'matrix-traversal':
                return matrixTraversalSteps(activePattern.defaultArray as any);
            case 'backtracking':
                return backtrackingSteps(activePattern.defaultArray);
            case 'meet-in-middle':
                return meetInMiddleSteps(activePattern.defaultArray);

            // Graph/Tree patterns
            case 'dfs-bfs':
                return dfsBfsSteps(activePattern.defaultArray as any);
            case 'tree-traversal':
                return treeTraversalSteps(activePattern.defaultArray);
            case 'shortest-path':
                return shortestPathSteps(activePattern.defaultArray as any);

            // Dynamic Programming patterns
            case 'dp-1d':
                return dp1DSteps(activePattern.defaultArray);
            case 'dp-2d':
                return dp2DSteps(activePattern.defaultArray as any);
            case 'knapsack':
                return knapsackSteps(activePattern.defaultArray as any);
            case 'lcs':
                return lcsSteps(activePattern.defaultArray[0] as any, activePattern.defaultArray[1] as any);

            // Fallback
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
                    Master these 21 fundamental algorithmic patterns to solve complex problems efficiently. Patterns are organized by category.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar - Pattern List */}
                <div className="lg:col-span-3 space-y-6">
                    {Object.entries(groupedPatterns).map(([category, categoryPatterns]) => (
                        <div key={category}>
                            {/* Category Header */}
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 px-2">
                                {categoryLabels[category as keyof typeof categoryLabels]}
                            </h3>

                            {/* Pattern Buttons */}
                            <div className="space-y-1">
                                {categoryPatterns.map(pattern => (
                                    <button
                                        key={pattern.id}
                                        onClick={() => {
                                            setActivePatternId(pattern.id);
                                            handleReset();
                                        }}
                                        className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${activePatternId === pattern.id
                                            ? 'bg-blue-600 dark:bg-blue-600 text-white shadow-sm'
                                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                                            }`}
                                    >
                                        <span className="text-sm font-medium">{pattern.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="lg:col-span-9 space-y-8">

                    {/* Pattern Info */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{activePattern.title}</h2>
                                    {activePattern.comingSoon && (
                                        <span className="flex items-center gap-1 px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded text-xs font-bold">
                                            <Sparkles className="w-3 h-3" />
                                            Coming Soon
                                        </span>
                                    )}
                                </div>
                                <p className="text-slate-600 dark:text-slate-300">{activePattern.description}</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg text-sm font-medium border border-orange-100 dark:border-orange-800 whitespace-nowrap">
                                    <Clock className="w-4 h-4" /> {activePattern.complexity.time}
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium border border-blue-100 dark:border-blue-800 whitespace-nowrap">
                                    <Database className="w-4 h-4" /> {activePattern.complexity.space}
                                </div>
                            </div>
                        </div>

                        {/* Intuition - The Aha! Moment */}
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800 mb-4">
                            <h4 className="text-sm font-bold text-purple-700 dark:text-purple-400 uppercase mb-2 flex items-center gap-2">
                                💡 The "Aha!" Moment
                            </h4>
                            <div className="text-purple-900 dark:text-purple-200">
                                <RichText text={activePattern.intuition} />
                            </div>
                        </div>

                        {/* When to Use */}
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mb-4">
                            <h4 className="text-sm font-bold text-green-700 dark:text-green-400 uppercase mb-2 flex items-center gap-2">
                                🎯 When to Use This Pattern
                            </h4>
                            <div className="text-green-900 dark:text-green-200">
                                <RichText text={activePattern.whenToUse} />
                            </div>
                        </div>

                        {/* Detailed Explanation */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
                            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase mb-2 flex items-center gap-2">
                                📚 How It Works
                            </h4>
                            <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                <RichText text={activePattern.detailedExplanation} />
                            </div>
                        </div>

                        {/* Common Use Cases */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
                            <h4 className="text-sm font-bold text-blue-700 dark:text-blue-400 uppercase mb-2">Real-World Applications</h4>
                            <p className="text-blue-900 dark:text-blue-200">{activePattern.useCase}</p>
                        </div>

                        {/* Visualizer or Coming Soon Message */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Interactive Visualization</h3>
                            {activePattern.comingSoon ? (
                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border-2 border-dashed border-amber-300 dark:border-amber-700 rounded-xl p-12 flex flex-col items-center justify-center text-center">
                                    <Sparkles className="w-12 h-12 text-amber-500 dark:text-amber-400 mb-4" />
                                    <h4 className="text-xl font-bold text-amber-900 dark:text-amber-300 mb-2">Visualization Coming Soon</h4>
                                    <p className="text-amber-700 dark:text-amber-400 max-w-md">
                                        We're working on an interactive visualization for this pattern. For now, study the detailed explanation above and the code implementation below!
                                    </p>
                                </div>
                            ) : (
                                <>
                                    {/* Fast & Slow Pointers Switcher */}
                                    {activePattern.id === 'fast-slow-pointers' && (
                                        <div className="mb-4 flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit">
                                            <button
                                                onClick={() => { setFastSlowVariant('middle'); setKey(prev => prev + 1); }}
                                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${fastSlowVariant === 'middle'
                                                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                                                    }`}
                                            >
                                                Find Middle
                                            </button>
                                            <button
                                                onClick={() => { setFastSlowVariant('floyd'); setKey(prev => prev + 1); }}
                                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${fastSlowVariant === 'floyd'
                                                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                                                    }`}
                                            >
                                                Floyd's Cycle
                                            </button>
                                        </div>
                                    )}

                                    <AlgorithmVisualizer
                                        key={`${activePatternId}-${key}`}
                                        generator={getGenerator()}
                                        initialArray={activePattern.defaultArray}
                                        onReset={handleReset}
                                    />
                                </>
                            )}
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

// Helper to render markdown-like text
const RichText = ({ text, className }: { text: string, className?: string }) => {
    if (!text) return null;

    // Split by newlines to handle paragraphs and lists
    const lines = text.split('\n').filter(line => line.trim());

    return (
        <div className={`space-y-2 ${className || ''}`}>
            {lines.map((line, i) => {
                const trimmed = line.trim();
                // Check for bullet points
                if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
                    return (
                        <div key={i} className="flex items-start gap-2 ml-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-60 shrink-0" />
                            <span>{parseBold(trimmed.replace(/^[•-]\s*/, ''))}</span>
                        </div>
                    );
                }

                // Regular paragraph
                return <p key={i}>{parseBold(line)}</p>;
            })}
        </div>
    );
};

const parseBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
    });
};

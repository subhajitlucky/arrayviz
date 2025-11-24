import {
  arrayDefinition,
  arrayIndexing,
  arrayOperations,
  dynamicArrays,
  multidimensionalArrays,
  commonPatterns
} from '../data/arrayConcepts'
import MemoryVisualizer from '../components/visualizers/MemoryVisualizer'
import OperationVisualizer from '../components/visualizers/OperationVisualizer'
import TwoDArrayVisualizer from '../components/visualizers/TwoDArrayVisualizer'
import DynamicArrayVisualizer from '../components/visualizers/DynamicArrayVisualizer'
import LearningPath from '../components/LearningPath'

function Concepts() {
  return (
    <main className="mx-auto max-w-5xl w-full px-4 py-8 md:py-12 flex flex-col gap-12 overflow-hidden">

      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Array Concepts</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
          Understand the building blocks of arrays. From memory layout to Big-O complexity.
        </p>
      </div>

      {/* Learning Path */}
      <LearningPath />

      {/* Definition Section */}
      <section id="definition" className="space-y-4 scroll-mt-24 w-full">
        <h2 className="text-xl md:text-2xl font-semibold border-l-4 border-blue-500 pl-3 text-slate-900 dark:text-white break-words">{arrayDefinition.title}</h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base break-words">{arrayDefinition.description}</p>
        <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 text-sm md:text-base break-words">
          {arrayDefinition.keyPoints.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </section>

      {/* Indexing Section */}
      <section className="space-y-4 w-full">
        <h2 className="text-xl md:text-2xl font-semibold border-l-4 border-purple-500 pl-3 text-slate-900 dark:text-white break-words">{arrayIndexing.title}</h2>
        <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base break-words">{arrayIndexing.description}</p>
        <div className="bg-slate-900 dark:bg-black text-slate-50 p-4 rounded-lg font-mono text-xs md:text-sm shadow-md border border-slate-700 overflow-x-auto max-w-full">
          <div className="mb-2 text-slate-400">// Memory Address Calculation</div>
          <div className="whitespace-nowrap">{arrayIndexing.formula}</div>
          <div className="mt-2 text-green-400 whitespace-nowrap">{arrayIndexing.example}</div>
        </div>

        {/* Memory Visualizer */}
        <div className="mt-6">
          <MemoryVisualizer />
        </div>
      </section>

      {/* Operations & Complexity */}
      <section id="operations" className="space-y-6 scroll-mt-24">
        <h2 className="text-xl md:text-2xl font-semibold border-l-4 border-orange-500 pl-3 text-slate-900 dark:text-white">Operations & Complexity</h2>

        {/* Operation Visualizer */}
        <div className="mb-6">
          <OperationVisualizer />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {arrayOperations.map((op) => (
            <div key={op.name} className={`p-4 border rounded-lg shadow-sm ${op.color} dark:bg-slate-900 dark:border-slate-800`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{op.name}</h3>
                <span className="bg-white dark:bg-slate-800 px-2 py-1 rounded text-xs font-mono border dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300">
                  {op.complexity}
                </span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-400">{op.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Arrays */}
      <section id="dynamic" className="space-y-4 scroll-mt-24">
        <h2 className="text-xl md:text-2xl font-semibold border-l-4 border-teal-500 pl-3 text-slate-900 dark:text-white">{dynamicArrays.title}</h2>
        <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base">{dynamicArrays.description}</p>

        {/* Dynamic Array Visualizer */}
        <div className="mt-6">
          <DynamicArrayVisualizer />
        </div>

        <div className="grid gap-4 sm:grid-cols-3 mt-4">
          {dynamicArrays.features.map((feature, idx) => (
            <div key={idx} className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 p-4 rounded-lg">
              <h4 className="font-bold text-teal-800 dark:text-teal-200 mb-1">{feature.label}</h4>
              <p className="text-sm text-teal-700 dark:text-teal-300">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Multidimensional Arrays */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold border-l-4 border-indigo-500 pl-3 text-slate-900 dark:text-white">{multidimensionalArrays.title}</h2>
        <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base">{multidimensionalArrays.description}</p>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 p-4 rounded-lg flex flex-col gap-2 overflow-x-auto">
          <p className="font-medium text-indigo-900 dark:text-indigo-200 whitespace-nowrap">{multidimensionalArrays.visual}</p>
          <code className="bg-white dark:bg-slate-900 px-2 py-1 rounded border border-indigo-100 dark:border-indigo-900 text-sm font-mono text-indigo-700 dark:text-indigo-300 w-fit whitespace-nowrap">
            {multidimensionalArrays.example}
          </code>
        </div>

        {/* 2D Array Visualizer */}
        <div className="mt-6">
          <TwoDArrayVisualizer />
        </div>
      </section>

      {/* Common Patterns */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold border-l-4 border-pink-500 pl-3 text-slate-900 dark:text-white">Common Patterns</h2>
        <div className="space-y-3">
          {commonPatterns.map((pattern) => (
            <div key={pattern.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-slate-900 gap-2">
              <div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">{pattern.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{pattern.desc}</p>
              </div>
              <div className="text-xs font-medium bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-3 py-1 rounded-full w-fit whitespace-nowrap">
                {pattern.useCase}
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}

export default Concepts

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

function Concepts() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 flex flex-col gap-12">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Array Concepts</h1>
        <p className="text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
          Understand the building blocks of arrays. From memory layout to Big-O complexity.
        </p>
      </div>

      {/* Definition Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3 text-slate-900 dark:text-white">{arrayDefinition.title}</h2>
        <p className="text-gray-700 dark:text-slate-300 leading-relaxed">{arrayDefinition.description}</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-slate-300 bg-gray-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
          {arrayDefinition.keyPoints.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </section>

      {/* Indexing Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3 text-slate-900 dark:text-white">{arrayIndexing.title}</h2>
        <p className="text-gray-700 dark:text-slate-300">{arrayIndexing.description}</p>
        <div className="bg-slate-900 dark:bg-black text-slate-50 p-4 rounded-lg font-mono text-sm shadow-md border border-slate-700">
          <div className="mb-2 text-gray-400">// Memory Address Calculation</div>
          <div>{arrayIndexing.formula}</div>
          <div className="mt-2 text-green-400">{arrayIndexing.example}</div>
        </div>

        {/* Memory Visualizer */}
        <div className="mt-6">
          <MemoryVisualizer />
        </div>
      </section>

      {/* Operations & Complexity */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-3 text-slate-900 dark:text-white">Operations & Complexity</h2>

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
              <p className="text-sm text-gray-700 dark:text-slate-400">{op.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Arrays */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-l-4 border-teal-500 pl-3 text-slate-900 dark:text-white">{dynamicArrays.title}</h2>
        <p className="text-gray-700 dark:text-slate-300">{dynamicArrays.description}</p>

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
        <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 text-slate-900 dark:text-white">{multidimensionalArrays.title}</h2>
        <p className="text-gray-700 dark:text-slate-300">{multidimensionalArrays.description}</p>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 p-4 rounded-lg flex flex-col gap-2">
          <p className="font-medium text-indigo-900 dark:text-indigo-200">{multidimensionalArrays.visual}</p>
          <code className="bg-white dark:bg-slate-900 px-2 py-1 rounded border border-indigo-100 dark:border-indigo-900 text-sm font-mono text-indigo-700 dark:text-indigo-300 w-fit">
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
        <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-3 text-slate-900 dark:text-white">Common Patterns</h2>
        <div className="space-y-3">
          {commonPatterns.map((pattern) => (
            <div key={pattern.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-slate-900">
              <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{pattern.name}</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400">{pattern.desc}</p>
              </div>
              <div className="mt-2 sm:mt-0 text-xs font-medium bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-3 py-1 rounded-full">
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

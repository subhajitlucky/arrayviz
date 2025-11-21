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

function Concepts() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 flex flex-col gap-12">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Array Concepts</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Understand the building blocks of arrays. From memory layout to Big-O complexity.
        </p>
      </div>

      {/* Definition Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3">{arrayDefinition.title}</h2>
        <p className="text-gray-700 leading-relaxed">{arrayDefinition.description}</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 bg-gray-50 p-4 rounded-lg border">
          {arrayDefinition.keyPoints.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </section>

      {/* Indexing Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3">{arrayIndexing.title}</h2>
        <p className="text-gray-700">{arrayIndexing.description}</p>
        <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm shadow-md">
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
        <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-3">Operations & Complexity</h2>

        {/* Operation Visualizer */}
        <div className="mb-6">
          <OperationVisualizer />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {arrayOperations.map((op) => (
            <div key={op.name} className={`p-4 border rounded-lg shadow-sm ${op.color}`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{op.name}</h3>
                <span className="bg-white px-2 py-1 rounded text-xs font-mono border font-bold">
                  {op.complexity}
                </span>
              </div>
              <p className="text-sm text-gray-700">{op.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Arrays */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-l-4 border-teal-500 pl-3">{dynamicArrays.title}</h2>
        <p className="text-gray-700">{dynamicArrays.description}</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {dynamicArrays.features.map((feature, idx) => (
            <div key={idx} className="bg-teal-50 border border-teal-200 p-4 rounded-lg">
              <h4 className="font-bold text-teal-800 mb-1">{feature.label}</h4>
              <p className="text-sm text-teal-700">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Multidimensional Arrays */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3">{multidimensionalArrays.title}</h2>
        <p className="text-gray-700">{multidimensionalArrays.description}</p>
        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg flex flex-col gap-2">
          <p className="font-medium text-indigo-900">{multidimensionalArrays.visual}</p>
          <code className="bg-white px-2 py-1 rounded border text-sm font-mono text-indigo-700 w-fit">
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
        <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-3">Common Patterns</h2>
        <div className="space-y-3">
          {commonPatterns.map((pattern) => (
            <div key={pattern.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{pattern.name}</h3>
                <p className="text-sm text-gray-600">{pattern.desc}</p>
              </div>
              <div className="mt-2 sm:mt-0 text-xs font-medium bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
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

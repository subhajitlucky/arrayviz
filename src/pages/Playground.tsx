import OperationVisualizer from '../components/visualizers/OperationVisualizer'

function Playground() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Interactive Playground</h1>
        <p className="text-slate-600">
          Experiment with array operations. Visualize how memory changes in real-time.
        </p>
      </div>

      <OperationVisualizer />
    </main>
  )
}

export default Playground

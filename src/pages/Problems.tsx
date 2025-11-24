import { useState } from 'react'
import { problems } from '../data/problems'
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react'

export default function Problems() {
  const [filter, setFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All')
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [showHintId, setShowHintId] = useState<number | null>(null)

  const filteredProblems = filter === 'All'
    ? problems
    : problems.filter(p => p.difficulty === filter)

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
    setShowHintId(null) // Reset hint when closing/opening
  }

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
      case 'Hard': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      default: return 'text-slate-600 dark:text-slate-400'
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Practice Problems</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Mastery comes from practice. Solve these curated problems to solidify your understanding of array patterns.
        </p>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-3 mb-8">
        {['All', 'Easy', 'Medium', 'Hard'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === f
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Problem List */}
      <div className="space-y-4">
        {filteredProblems.map((problem) => (
          <div
            key={problem.id}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all hover:shadow-md"
          >
            <div
              onClick={() => toggleExpand(problem.id)}
              className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 rounded text-xs font-bold border ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">{problem.title}</h3>
              </div>
              {expandedId === problem.id ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
            </div>

            {expandedId === problem.id && (
              <div className="px-5 pb-5 pt-0 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="mt-4 space-y-4">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{problem.description}</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-slate-950 p-3 rounded border border-slate-200 dark:border-slate-800">
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase block mb-1">Input</span>
                      <code className="text-sm font-mono text-slate-700 dark:text-slate-300">{problem.exampleInput}</code>
                    </div>
                    <div className="bg-white dark:bg-slate-950 p-3 rounded border border-slate-200 dark:border-slate-800">
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase block mb-1">Output</span>
                      <code className="text-sm font-mono text-slate-700 dark:text-slate-300">{problem.exampleOutput}</code>
                    </div>
                  </div>

                  <div className="pt-2">
                    {showHintId === problem.id ? (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 p-3 rounded border border-yellow-200 dark:border-yellow-800 text-sm flex gap-2 items-start animate-in fade-in slide-in-from-top-2">
                        <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{problem.hint}</span>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); setShowHintId(problem.id); }}
                        className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1"
                      >
                        <Lightbulb className="w-4 h-4" /> Show Hint
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}

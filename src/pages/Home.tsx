import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Code2, Terminal, CheckCircle2, Zap, Layers, Search, Hash, MoveRight } from 'lucide-react'

function Home() {
  const [demoArray] = useState([2, 5, 9, 3, 7])
  const [highlightIndex, setHighlightIndex] = useState(2)

  const handleArrayClick = (index: number) => {
    setHighlightIndex(index)
  }

  return (
    <main className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 pt-16 pb-24 px-4">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12">

          {/* Hero Text */}
          <div className="max-w-2xl flex flex-col gap-6 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-medium w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Interactive Learning Platform
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              Master Arrays <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Visually & Intuitively.
              </span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
              Stop memorizing code. Start visualizing patterns. From basic memory layout to complex sliding window algorithms.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <Link to="/concepts" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 dark:shadow-blue-900/50">
                Start Learning <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/playground" className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                Try Playground <Terminal className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="w-full md:w-auto z-10">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 w-full max-w-sm mx-auto transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Memory View</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
              </div>

              <div className="flex justify-center gap-2 mb-6">
                {demoArray.map((value, index) => (
                  <button
                    key={index}
                    onClick={() => handleArrayClick(index)}
                    className={`relative w-12 h-12 flex items-center justify-center rounded-lg border-2 text-lg font-bold transition-all duration-200 ${index === highlightIndex
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 -translate-y-1 shadow-md'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                  >
                    {value}
                    <span className="absolute -bottom-6 text-[10px] font-normal text-slate-400 font-mono">
                      {index}
                    </span>
                  </button>
                ))}
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg font-mono text-xs text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700">
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2 mb-2">
                  <span>Access Time:</span>
                  <span className="text-green-600 dark:text-green-400 font-bold">O(1)</span>
                </div>
                <div className="space-y-1">
                  <p><span className="text-purple-600 dark:text-purple-400">const</span> arr = [{demoArray.join(', ')}];</p>
                  <p>
                    arr[<span className="text-blue-600 dark:text-blue-400 font-bold">{highlightIndex}</span>]
                    <span className="text-slate-400"> // Returns </span>
                    <span className="text-orange-600 dark:text-orange-400 font-bold">{demoArray[highlightIndex]}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 left-0 -translate-y-12 -translate-x-12 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white dark:bg-slate-950 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors duration-300 border border-slate-100 dark:border-slate-800 hover:border-blue-100 dark:hover:border-blue-800">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Learn Concepts</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Deep dive into array internals. Understand memory allocation, addressing math, and complexity analysis.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors duration-300 border border-slate-100 dark:border-slate-800 hover:border-purple-100 dark:hover:border-purple-800">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Visual Playground</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Don't just read. Experiment. Insert, delete, and shift elements in real-time to see how indices change.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors duration-300 border border-slate-100 dark:border-slate-800 hover:border-orange-100 dark:hover:border-orange-800">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Master Patterns</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Conquer coding interviews by mastering the underlying patterns: Sliding Window, Two Pointers, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Patterns Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Essential Patterns</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              These aren't just algorithms. They are the building blocks of efficient problem solving.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Two Pointers", icon: <MoveRight className="w-5 h-5" />, desc: "Solve pair problems in O(N)." },
              { title: "Sliding Window", icon: <Layers className="w-5 h-5" />, desc: "Optimize subarray queries." },
              { title: "Prefix Sums", icon: <Hash className="w-5 h-5" />, desc: "Range queries in O(1)." },
              { title: "Binary Search", icon: <Search className="w-5 h-5" />, desc: "Logarithmic search on sorted data." },
              { title: "In-place Ops", icon: <Zap className="w-5 h-5" />, desc: "Optimize space complexity." },
              { title: "Kadane's Algo", icon: <CheckCircle2 className="w-5 h-5" />, desc: "Max subarray sum in O(N)." },
            ].map((pattern, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow flex items-start gap-4">
                <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300">
                  {pattern.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{pattern.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{pattern.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Promise */}
      <section className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 px-4">
        <div className="mx-auto max-w-6xl flex flex-wrap justify-center gap-8 text-sm text-slate-500 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" /> Free & Open Source
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" /> No Login Required
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" /> Visual-First Approach
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" /> Interview Ready
          </div>
        </div>
      </section>

    </main>
  )
}

export default Home

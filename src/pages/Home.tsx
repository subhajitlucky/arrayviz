function Home() {
  const demoArray = [2, 5, 9, 3, 7]
  const highlightIndex = 2

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 flex flex-col gap-10">
      {/* Hero */}
      <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-4xl font-semibold mb-1">Master Arrays Visually.</h1>
          <p className="text-sm md:text-base">
            Everything about arrays, explained with clean visuals, patterns, and focused practice. No noise. Just what you need to go from basics to interviews.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a href="/concepts" className="px-4 py-2 border text-sm">Explore Concepts</a>
            <a href="/playground" className="px-4 py-2 border text-sm">Open Playground</a>
          </div>
        </div>

        {/* Mini visual demo (skeleton) */}
        <div className="mt-4 md:mt-0 w-full md:w-64 border p-3 text-xs flex flex-col gap-2">
          <div className="text-[10px] uppercase">Mini array demo</div>
          <div className="flex gap-1">
            {demoArray.map((value, index) => (
              <div
                key={index}
                className={`flex h-10 w-10 items-center justify-center border text-xs ${
                  index === highlightIndex ? 'bg-gray-100' : ''
                }`}
              >
                {value}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px]">
            <span>Indices: 0 1 2 3 4</span>
            <span>Access index 2 → {demoArray[highlightIndex]}</span>
          </div>
        </div>
      </section>

      {/* Learn / Play / Practice */}
      <section className="grid gap-4 md:grid-cols-3 text-sm">
        <div className="border p-3 flex flex-col gap-1">
          <h2 className="font-semibold">Learn</h2>
          <p>Understand arrays, memory, complexity, and core operations with clear visuals.</p>
        </div>
        <div className="border p-3 flex flex-col gap-1">
          <h2 className="font-semibold">Play</h2>
          <p>Use the playground to see inserts, deletes, shifts, and pointers in action.</p>
        </div>
        <div className="border p-3 flex flex-col gap-1">
          <h2 className="font-semibold">Practice</h2>
          <p>Solve curated array problems with step-wise explanations (coming next).</p>
        </div>
      </section>

      {/* Patterns you will master */}
      <section className="flex flex-col gap-2 text-sm">
        <h2 className="font-semibold text-base">Patterns you&apos;ll master</h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <div className="px-3 py-2 border">Two Pointers</div>
          <div className="px-3 py-2 border">Sliding Window</div>
          <div className="px-3 py-2 border">Prefix / Suffix Sums</div>
          <div className="px-3 py-2 border">Kadane&apos;s (Max Subarray)</div>
          <div className="px-3 py-2 border">Binary Search on Arrays</div>
          <div className="px-3 py-2 border">In-place Transformations</div>
        </div>
      </section>

      {/* Promise strip */}
      <section className="flex flex-wrap gap-3 text-xs">
        <div className="px-3 py-2 border">Free</div>
        <div className="px-3 py-2 border">Open Source</div>
        <div className="px-3 py-2 border">Beginner → Interview Ready</div>
        <div className="px-3 py-2 border">Visual-first</div>
        <div className="px-3 py-2 border">Frontend-only, fast</div>
      </section>
    </main>
  )
}

export default Home

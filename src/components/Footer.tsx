function Footer() {
    return (
      <footer className="w-full border-t">
        <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col gap-4 text-xs">
          {/* Top: columns */}
          <div className="flex flex-wrap gap-8 justify-between">
            <div>
              <div className="font-semibold mb-1">ArrayViz</div>
              <div>Visual learning for arrays.</div>
            </div>
  
            <div>
              <div className="font-semibold mb-1">Learn</div>
              <div>Concepts</div>
              <div>Playground</div>
              <div>Problems</div>
            </div>
  
            <div>
              <div className="font-semibold mb-1">Community</div>
              <div>GitHub</div>
              <div>Contribute</div>
            </div>
          </div>
  
          {/* Bottom: single line */}
          <div className="text-[10px]">
            © {new Date().getFullYear()} ArrayViz. Free & open-source.
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer
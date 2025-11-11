import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="w-full border-b">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Left: Logo / Brand */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-6 w-6 border flex items-center justify-center text-xs">AV</div>
            <span className="text-base font-semibold">ArrayViz</span>
          </Link>
        </div>

        {/* Center: Nav links (desktop) */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/concepts">Concepts</Link>
          <Link to="/playground">Playground</Link>
          <Link to="/problems">Problems</Link>
        </div>

        {/* Right: placeholders */}
        <div className="flex items-center gap-3">
          <button className="h-8 w-8 border text-xs">☼</button>
          <button className="hidden sm:flex h-8 w-8 border text-xs items-center justify-center">GH</button>
          <button className="md:hidden h-8 w-8 border text-xs">☰</button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar

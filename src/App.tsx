import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Concepts from './pages/Concepts'
import Playground from './pages/Playground'
import Problems from './pages/Problems'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/concepts" element={<Concepts />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/problems" element={<Problems />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

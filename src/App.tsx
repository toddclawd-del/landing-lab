import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import AuroraMeshLanding from './pages/2026-01-27-aurora-mesh'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aurora-mesh" element={<AuroraMeshLanding />} />
      </Routes>
    </HashRouter>
  )
}

export default App

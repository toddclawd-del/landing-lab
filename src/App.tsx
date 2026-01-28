import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import AuroraMeshLanding from './pages/2026-01-27-aurora-mesh'
import VercelMinimal from './pages/2026-01-27-vercel-minimal'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aurora-mesh" element={<AuroraMeshLanding />} />
        <Route path="/vercel-minimal" element={<VercelMinimal />} />
      </Routes>
    </HashRouter>
  )
}

export default App

import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import AuroraMeshLanding from './pages/2026-01-27-aurora-mesh'
import VercelMinimal from './pages/2026-01-27-vercel-minimal'
import KineticTypography from './pages/2026-01-28-kinetic-typography'
import SunnySide from './pages/2026-01-28-sunny-side'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SunnySide />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aurora-mesh" element={<AuroraMeshLanding />} />
        <Route path="/vercel-minimal" element={<VercelMinimal />} />
        <Route path="/kinetic-typography" element={<KineticTypography />} />
        <Route path="/sunny-side" element={<SunnySide />} />
      </Routes>
    </HashRouter>
  )
}

export default App

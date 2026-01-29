import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import AuroraMeshLanding from './pages/2026-01-27-aurora-mesh'
import VercelMinimal from './pages/2026-01-27-vercel-minimal'
import KineticTypography from './pages/2026-01-28-kinetic-typography'
import SunnySide from './pages/2026-01-28-sunny-side'
import VoodooBracket from './pages/2026-01-28-voodoo-bracket'
import BentoGrid from './pages/2026-01-29-bento-grid'
import CylinderTextPage from './pages/2026-01-29-cylinder-text'
import DomainWarpPage from './pages/2026-01-29-domain-warp'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aurora-mesh" element={<AuroraMeshLanding />} />
        <Route path="/vercel-minimal" element={<VercelMinimal />} />
        <Route path="/kinetic-typography" element={<KineticTypography />} />
        <Route path="/sunny-side" element={<SunnySide />} />
        <Route path="/voodoo-bracket" element={<VoodooBracket />} />
        <Route path="/bento-grid" element={<BentoGrid />} />
        <Route path="/cylinder-text" element={<CylinderTextPage />} />
        <Route path="/domain-warp" element={<DomainWarpPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App

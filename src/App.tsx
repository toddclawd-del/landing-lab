import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import AuroraMeshLanding from './pages/2026-01-27-aurora-mesh'
import VercelMinimal from './pages/2026-01-27-vercel-minimal'
import KineticTypography from './pages/2026-01-28-kinetic-typography'
import SunnySide from './pages/2026-01-28-sunny-side'
import VoodooBracket from './pages/2026-01-28-voodoo-bracket'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<VoodooBracket />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aurora-mesh" element={<AuroraMeshLanding />} />
        <Route path="/vercel-minimal" element={<VercelMinimal />} />
        <Route path="/kinetic-typography" element={<KineticTypography />} />
        <Route path="/sunny-side" element={<SunnySide />} />
        <Route path="/voodoo-bracket" element={<VoodooBracket />} />
      </Routes>
    </HashRouter>
  )
}

export default App

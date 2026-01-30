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
import NeoBrutalism from './pages/2026-01-30-neo-brutalism'
// GSAP Interaction Modules
import TextReveal from './pages/2026-01-30-text-reveal'
import ScrollVelocity from './pages/2026-01-30-scroll-velocity'
import MagneticButtons from './pages/2026-01-30-magnetic-buttons'
import HorizontalScroll from './pages/2026-01-30-horizontal-scroll'
import ImageReveal from './pages/2026-01-30-image-reveal'
import CounterAnimations from './pages/2026-01-30-counter-animations'
import StaggerGrids from './pages/2026-01-30-stagger-grids'
import ScrollProgress from './pages/2026-01-30-scroll-progress'
import ParallaxLayers from './pages/2026-01-30-parallax-layers'
import PinnedSections from './pages/2026-01-30-pinned-sections'
import ElasticEffects from './pages/2026-01-30-elastic-effects'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Landing Page Templates */}
        <Route path="/aurora-mesh" element={<AuroraMeshLanding />} />
        <Route path="/vercel-minimal" element={<VercelMinimal />} />
        <Route path="/kinetic-typography" element={<KineticTypography />} />
        <Route path="/sunny-side" element={<SunnySide />} />
        <Route path="/voodoo-bracket" element={<VoodooBracket />} />
        <Route path="/bento-grid" element={<BentoGrid />} />
        <Route path="/cylinder-text" element={<CylinderTextPage />} />
        <Route path="/domain-warp" element={<DomainWarpPage />} />
        <Route path="/neo-brutalism" element={<NeoBrutalism />} />
        {/* GSAP Interaction Modules */}
        <Route path="/text-reveal" element={<TextReveal />} />
        <Route path="/scroll-velocity" element={<ScrollVelocity />} />
        <Route path="/magnetic-buttons" element={<MagneticButtons />} />
        <Route path="/horizontal-scroll" element={<HorizontalScroll />} />
        <Route path="/image-reveal" element={<ImageReveal />} />
        <Route path="/counter-animations" element={<CounterAnimations />} />
        <Route path="/stagger-grids" element={<StaggerGrids />} />
        <Route path="/scroll-progress" element={<ScrollProgress />} />
        <Route path="/parallax-layers" element={<ParallaxLayers />} />
        <Route path="/pinned-sections" element={<PinnedSections />} />
        <Route path="/elastic-effects" element={<ElasticEffects />} />
      </Routes>
    </HashRouter>
  )
}

export default App

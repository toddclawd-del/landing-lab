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
import LiquidMotion from './pages/2026-01-31-liquid-motion'
import CreativeAgencyPage from './pages/2026-01-31-creative-agency'
import Claymorphism from './pages/2026-02-01-claymorphism'
import ArchivalIndex from './pages/2026-02-02-archival-index'
import HumanScribble from './pages/2026-02-03-human-scribble'
import CyberBrutalism from './pages/2026-02-04-cyber-brutalism'
import NeoDeco from './pages/2026-02-05-neo-deco'
import SurveillanceThermal from './pages/2026-02-06-surveillance-thermal'
import StripeGradient from './pages/2026-02-07-stripe-gradient'
import LinearLook from './pages/2026-02-08-linear-look'
import NovaCinematic from './pages/2026-02-09-nova-cinematic'
import Neonwave from './pages/2026-02-10-neonwave'
import ChromeDreams from './pages/2026-02-11-chrome-dreams'
import TheBroadsheet from './pages/2026-02-12-the-broadsheet'

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
        {/* Landing Page Templates */}
        <Route path="/liquid-motion" element={<LiquidMotion />} />
        <Route path="/creative-agency" element={<CreativeAgencyPage />} />
        <Route path="/claymorphism" element={<Claymorphism />} />
        <Route path="/archival-index" element={<ArchivalIndex />} />
        <Route path="/human-scribble" element={<HumanScribble />} />
        <Route path="/cyber-brutalism" element={<CyberBrutalism />} />
        <Route path="/neo-deco" element={<NeoDeco />} />
        <Route path="/surveillance-thermal" element={<SurveillanceThermal />} />
        <Route path="/stripe-gradient" element={<StripeGradient />} />
        <Route path="/linear-look" element={<LinearLook />} />
        <Route path="/nova-cinematic" element={<NovaCinematic />} />
        <Route path="/neonwave" element={<Neonwave />} />
        <Route path="/chrome-dreams" element={<ChromeDreams />} />
        <Route path="/the-broadsheet" element={<TheBroadsheet />} />
      </Routes>
    </HashRouter>
  )
}

export default App

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Seo from './components/Seo';
import { EASE_OUT } from './components/motion';
import Home from './pages/Home';

// Home ships in the main bundle (it is the LCP route); every other page is its own chunk.
// The server adds a modulepreload for the requested route's chunk (server.ts).
const pages = {
  About: () => import('./pages/About'),
  Services: () => import('./pages/Services'),
  ServiceDetail: () => import('./pages/ServiceDetail'),
  Projects: () => import('./pages/Projects'),
  ProjectDetail: () => import('./pages/ProjectDetail'),
  Contact: () => import('./pages/Contact'),
  NotFound: () => import('./pages/NotFound'),
};
const About = lazy(pages.About);
const Services = lazy(pages.Services);
const ServiceDetail = lazy(pages.ServiceDetail);
const Projects = lazy(pages.Projects);
const ProjectDetail = lazy(pages.ProjectDetail);
const Contact = lazy(pages.Contact);
const NotFound = lazy(pages.NotFound);

// Dev-only stress-data switch (break-ui); the production build drops it.
const DevDataToggle = import.meta.env.DEV ? lazy(() => import('./components/DevDataToggle')) : null;

/** Once the first page is up and the browser is idle, fetch the other routes so navigation stays instant. */
function usePrefetchRoutes() {
  useEffect(() => {
    const run = () => Object.values(pages).forEach((load) => load());
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(run, { timeout: 5000 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(run, 3000);
    return () => clearTimeout(id);
  }, []);
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } }}
        exit={{ opacity: 0, y: -8, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }}
      >
        {/* A full-viewport fallback keeps the footer below the fold while a route chunk arrives (no CLS) */}
        <Suspense fallback={<div className="min-h-svh" />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/servicios/:slug" element={<ServiceDetail />} />
            <Route path="/proyectos" element={<Projects />} />
            <Route path="/proyectos/:slug" element={<ProjectDetail />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

/** The site, without a router: main.tsx wraps it in BrowserRouter, entry-server.tsx in StaticRouter. */
export default function App() {
  usePrefetchRoutes();
  return (
    <MotionConfig reducedMotion="user">
      <Seo />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
        <FloatingWhatsApp />
        {DevDataToggle && (
          <Suspense fallback={null}>
            <DevDataToggle />
          </Suspense>
        )}
      </div>
    </MotionConfig>
  );
}

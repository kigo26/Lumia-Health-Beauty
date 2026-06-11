import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, BottomNav, Sidebar, MobileNavbar } from './components/Navigation';
import { Bookings } from './pages/Bookings';
import { Marketplace } from './pages/Marketplace';
import { Wallet } from './pages/Wallet';
import { Landing } from './pages/Landing';
import { Profile } from './pages/Profile';
import { LumiaAI } from './components/LumiaAI';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { SearchProvider } from './context/SearchContext';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './pages/Login';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Toaster } from 'react-hot-toast';

// Basic Placeholder components for other pages
const PlaceholderPage = ({ name }: { name: string }) => (
  <div className="pt-24 px-6 max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center text-center">
    <div className="w-20 h-20 bg-lumia-emerald/10 rounded-3xl flex items-center justify-center mb-6 text-lumia-emerald">
      <div className="w-10 h-10 border-4 border-lumia-emerald border-t-transparent rounded-full animate-spin"></div>
    </div>
    <h1 className="text-3xl font-serif italic text-lumia-gold mb-2">{name} is Coming Soon</h1>
    <p className="text-lumia-white/40 font-medium">We're crafting a premium experience for you. Stay tuned.</p>
  </div>
);

const AnimatedPage = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-sky-50 text-aura-dark flex flex-col md:flex-row antialiased">
      {!isLandingPage && <Sidebar />}
      <div className={cn("flex-1 flex flex-col", !isLandingPage && "md:pl-20")}>
        {!isLandingPage && <Navbar />}
        {!isLandingPage && <MobileNavbar />}
        <main className="flex-1 relative">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<AnimatedPage><Landing /></AnimatedPage>} />
              <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
              <Route path="/explore" element={<AnimatedPage><Marketplace /></AnimatedPage>} />
              <Route path="/bookings" element={<AnimatedPage><Bookings /></AnimatedPage>} />
              <Route path="/wallet" element={<AnimatedPage><Wallet /></AnimatedPage>} />
              <Route path="/chat" element={<AnimatedPage><PlaceholderPage name="Lumia Messenger" /></AnimatedPage>} />
              <Route path="/profile" element={<AnimatedPage><Profile /></AnimatedPage>} />
            </Routes>
          </AnimatePresence>
        </main>
        {!isLandingPage && <BottomNav />}
      </div>
      <LumiaAI />
      
      {/* Desk top side decorations */}
      <div className="hidden lg:block fixed top-1/2 left-0 w-[500px] h-[500px] bg-serene-sage/10 blur-[120px] rounded-full -z-10 -ml-64"></div>
      <div className="hidden lg:block fixed bottom-0 right-0 w-[400px] h-[400px] bg-serene-accent/5 blur-[100px] rounded-full -z-10 -mr-48"></div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <SearchProvider>
          <Router>
            <AppContent />
          </Router>
          <Toaster />
        </SearchProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;


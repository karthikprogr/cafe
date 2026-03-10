import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Booking from './pages/Booking';
import ReviewsPage from './pages/Reviews';
import Admin from './pages/Admin';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

function PageWrapper({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <Navbar />
      <Cart />

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/menu" element={<PageWrapper><Menu /></PageWrapper>} />
            <Route path="/order" element={<PageWrapper><Order /></PageWrapper>} />
            <Route path="/booking" element={<PageWrapper><Booking /></PageWrapper>} />
            <Route path="/reviews" element={<PageWrapper><ReviewsPage /></PageWrapper>} />
            <Route path="/admin" element={<PageWrapper><Admin /></PageWrapper>} />
            {/* 404 fallback */}
            <Route path="*" element={
              <PageWrapper>
                <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
                  <div className="text-8xl font-display font-bold gold-text">404</div>
                  <h2 className="text-white text-2xl font-semibold">Page Not Found</h2>
                  <p className="text-white/40">Looks like this page wandered off.</p>
                  <a href="/" className="btn-primary mt-2">Back to Home</a>
                </div>
              </PageWrapper>
            } />
          </Routes>
        </AnimatePresence>
      </div>

      {!isAdmin && <Footer />}

      {/* Floating Chatbot */}
      <Chatbot />

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1a1a1a',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            fontSize: '14px',
          },
        }}
      />
    </div>
  );
}

export default AppLayout;

import { lazy, Suspense, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

// Lazy-load below-the-fold pages for smaller initial bundle
const BrowsePage = lazy(() => import('./pages/BrowsePage'));
const SubmitPage = lazy(() => import('./pages/SubmitPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

import { AdminThemeProvider } from './context/AdminThemeContext';

/** Prefetch all public page chunks during idle time so navigation is instant */
const pagePrefetches = [
  () => import('./pages/BrowsePage'),
  () => import('./pages/SubmitPage'),
  () => import('./pages/SearchPage'),
  () => import('./pages/ContactPage'),
];

function usePrefetchPages() {
  const hasPrefetched = useRef(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (hasPrefetched.current || pathname !== '/') return;
    hasPrefetched.current = true;

    const schedule = typeof requestIdleCallback === 'function'
      ? requestIdleCallback
      : (cb: () => void) => setTimeout(cb, 200);

    schedule(() => {
      pagePrefetches.forEach(load => load());
    });
  }, [pathname]);
}

/** Minimal loading fallback */
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--neu-bg)' }}>
      <div
        className="w-10 h-10 rounded-full border-3 animate-spin"
        style={{ borderColor: 'var(--neu-bg)', borderTopColor: 'var(--neu-accent)' }}
      />
    </div>
  );
}

/** Scroll to top on route change (including query params) */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Use 'instant' behavior to avoid smooth scrolling conflicts during navigation
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

/** Public layout — with Navbar + Footer on homepage */
function PublicLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--neu-bg)' }}>
      <Navbar />
      <main className="flex-1">{children}</main>
      {isHome && <Footer />}
    </div>
  );
}

/** 404 page */
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--neu-bg)' }}>
      <div className="text-center">
        <div
          className="w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto mb-6 text-4xl"
          style={{ boxShadow: 'var(--neu-shadow-extruded)' }}
        >
          🔍
        </div>
        <h1
          className="text-3xl font-extrabold mb-3 tracking-tight"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--neu-fg)' }}
        >
          Page Not Found
        </h1>
        <p className="mb-6" style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--neu-muted)' }}>
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="px-6 py-3 rounded-2xl text-white font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: 'var(--neu-accent)',
            boxShadow: 'var(--neu-shadow-extruded)',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

/** Detects if current route is an admin route */
function useIsAdmin() {
  const location = useLocation();
  return location.pathname.startsWith('/admin');
}

/** Root — decides which shell to render based on route */
function Root() {
  usePrefetchPages();
  const isAdmin = useIsAdmin();

  if (isAdmin) {
    // Admin routes — no Navbar, no Footer, dark background
    return (
      <AdminThemeProvider>
        <div style={{ minHeight: '100vh', background: '#0F1117' }}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/admin" element={<AdminLoginPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </AdminThemeProvider>
    );
  }

  // Public routes
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/browse" element={<PublicLayout><BrowsePage /></PublicLayout>} />
        <Route path="/submit" element={<PublicLayout><SubmitPage /></PublicLayout>} />
        <Route path="/search" element={<PublicLayout><SearchPage /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Root />
    </BrowserRouter>
  );
}

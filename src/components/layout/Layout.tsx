import Header from './Header';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import { AnimatePresence, motion } from 'framer-motion';

const Layout = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
      <Header />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Breadcrumbs />
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
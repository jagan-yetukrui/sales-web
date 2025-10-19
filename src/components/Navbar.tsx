import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useCustomizer } from '../context/CustomizerContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { state, dispatch } = useCustomizer();

  return (
    <motion.nav
      className="sticky top-0 z-40 glass-card border-b border-white/20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white font-bold text-lg">PC</span>
            </motion.div>
            <span className="text-xl font-bold gradient-text">
              Product Customizer 2.0
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-300 ${
                location.pathname === '/'
                  ? 'text-primary-500'
                  : 'text-neutral-600 hover:text-primary-500'
              }`}
            >
              Home
            </Link>
            <Link
              to="/customize"
              className={`text-sm font-medium transition-colors duration-300 ${
                location.pathname === '/customize'
                  ? 'text-primary-500'
                  : 'text-neutral-600 hover:text-primary-500'
              }`}
            >
              Customize
            </Link>
            <Link
              to="/checkout"
              className={`text-sm font-medium transition-colors duration-300 ${
                location.pathname === '/checkout'
                  ? 'text-primary-500'
                  : 'text-neutral-600 hover:text-primary-500'
              }`}
            >
              Checkout
            </Link>
          </div>

          {/* Theme Toggle & Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              className="p-2 rounded-full glass-card hover:bg-white/20 transition-colors duration-300"
              onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {state.theme === 'light' ? (
                <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </motion.button>

            {/* AR Preview Button */}
            <motion.button
              className="btn-accent text-sm px-4 py-2"
              onClick={() => dispatch({ type: 'TOGGLE_AR_PREVIEW' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              AR Preview
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-full glass-card hover:bg-white/20 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open menu"
            >
              <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* AR Preview Modal */}
      {state.showARPreview && (
        <motion.div
          className="ar-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => dispatch({ type: 'TOGGLE_AR_PREVIEW' })}
        >
          <motion.div
            className="ar-modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                AR Preview Coming Soon
              </h3>
              <p className="text-neutral-600 mb-6">
                Experience your customized product in augmented reality. This feature will be available in a future update.
              </p>
              <button
                className="btn-primary"
                onClick={() => dispatch({ type: 'TOGGLE_AR_PREVIEW' })}
              >
                Got it
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

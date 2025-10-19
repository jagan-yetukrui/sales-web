import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCustomizer } from '../context/CustomizerContext';
import { products } from '../data/products';
import Navbar from '../components/Navbar';
import ProductViewer from '../components/ProductViewer';
import OptionSelector from '../components/OptionSelector';
import SummaryCard from '../components/SummaryCard';
import ProductComparison from '../components/ProductComparison';
import Wishlist from '../components/Wishlist';
import ProductTour from '../components/ProductTour';
import SocialSharing from '../components/SocialSharing';
import AdvancedFiltering from '../components/AdvancedFiltering';
import ProductReviews from '../components/ProductReviews';

const CustomizePage: React.FC = () => {
  const { state, dispatch, loadFromStorage } = useCustomizer();

  // Load saved configuration on mount
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // Set default product if none selected
  useEffect(() => {
    if (!state.selectedProduct && products.length > 0) {
      dispatch({ type: 'SET_PRODUCT', payload: products[0] });
    }
  }, [state.selectedProduct, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Product Selector */}
        <motion.div
          className="mb-12 product-selector"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-neutral-900 mb-8 text-center">
            Choose Your Product
          </h1>
          <div className="product-grid">
            {products.map((product) => (
              <motion.button
                key={product.id}
                className={`px-8 py-6 rounded-3xl text-lg font-medium product-card w-full ${
                  state.selectedProduct?.id === product.id
                    ? 'bg-primary-500 text-white shadow-neon'
                    : 'bg-white/50 backdrop-blur-sm text-neutral-700 hover:bg-white/80 border border-white/30 hover:shadow-magnetic'
                }`}
                onClick={() => dispatch({ type: 'SET_PRODUCT', payload: product })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: products.indexOf(product) * 0.1 }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold ${
                    state.selectedProduct?.id === product.id ? 'bg-white/20' : 'bg-neutral-100'
                  }`}>
                    {product.brand.charAt(0)}
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm opacity-80">{product.brand}</p>
                    <p className="text-xl font-bold mt-2">${product.basePrice.toLocaleString()}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Customization Interface */}
        {state.selectedProduct && (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Product Display */}
            <ProductViewer />

            {/* Options Panel */}
            <OptionSelector />
          </motion.div>
        )}
      </div>

      {/* Floating Summary Card */}
      <SummaryCard />

            {/* Floating Feature Components */}
            <div className="floating-components">
              <ProductComparison />
              <Wishlist />
              <ProductTour />
              <SocialSharing />
            </div>
            
            {/* Bottom Right Components */}
            <div className="bottom-floating-components">
              <AdvancedFiltering />
              <ProductReviews />
            </div>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/8 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      {/* Loading Overlay */}
      {state.isLoading && (
        <motion.div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="glass-card p-8 rounded-2xl text-center">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-neutral-700">Updating configuration...</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CustomizePage;

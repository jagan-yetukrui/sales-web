import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCustomizer } from '../context/CustomizerContext';
import OptimizedImage from './OptimizedImage';

const ProductViewer: React.FC = () => {
  const { state } = useCustomizer();

  if (!state.selectedProduct || !state.selectedColor || !state.selectedVariant) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Select a Product
          </h3>
          <p className="text-neutral-600">
            Choose a product to start customizing
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12 relative product-viewer">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/8 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Product Image Container */}
      <motion.div 
        className="relative w-full max-w-2xl aspect-square mb-8 z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Glassmorphic background */}
        <div className="absolute inset-0 glass-card rounded-3xl"></div>
        
        {/* Loading shimmer overlay */}
        {state.isLoading && (
          <div className="absolute inset-0 glass-card rounded-3xl shimmer" />
        )}
        
        {/* Product Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${state.selectedColor.id}-${state.selectedVariant.id}`}
            className="relative z-10 w-full h-full p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <OptimizedImage
              src={state.selectedVariant.image}
              alt={`${state.selectedProduct.name} in ${state.selectedColor.name}`}
              className="w-full h-full object-contain"
              priority={true}
              fallbackSrc="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center&auto=format&q=80"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Floating elements for visual interest */}
        <motion.div
          className="absolute top-4 right-4 w-3 h-3 bg-primary-500 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-8 left-8 w-2 h-2 bg-accent-500 rounded-full opacity-30"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.div>

      {/* Product Info */}
      <motion.div 
        className="text-center max-w-md z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-sm text-neutral-500 font-medium">
            {state.selectedProduct.brand}
          </span>
          <div className="w-1 h-1 bg-neutral-400 rounded-full" />
          <span className="text-sm text-neutral-500 font-medium">
            {state.selectedProduct.category}
          </span>
        </div>
        
        <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">
          {state.selectedProduct.name}
        </h2>
        <p className="text-lg text-neutral-600 mb-4">
          {state.selectedProduct.description}
        </p>
        
        {/* Color indicator */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-sm text-neutral-500">Color:</span>
          <div 
            className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
            style={{ backgroundColor: state.selectedColor.hex }}
          />
          <span className="text-sm font-medium text-neutral-700">
            {state.selectedColor.name}
          </span>
        </div>
        
        {/* Variant indicator */}
        <div className="text-sm text-neutral-500 mb-4">
          {state.selectedVariant.name}
        </div>

        {/* Specs */}
        {state.selectedVariant.specs && (
          <div className="flex flex-wrap justify-center gap-2">
            {state.selectedVariant.specs.map((spec, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full text-xs font-medium text-neutral-700"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              >
                {spec}
              </motion.span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Interactive Elements */}
      <motion.div
        className="absolute top-8 left-8 w-4 h-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full opacity-60"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-12 right-12 w-2 h-2 bg-accent-500 rounded-full opacity-40"
        animate={{
          y: [0, -10, 0],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      />
    </div>
  );
};

export default ProductViewer;

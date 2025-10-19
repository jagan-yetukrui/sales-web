import React from 'react';
import { motion } from 'framer-motion';
import { Product, ProductColor, ProductVariant } from '../data/products';

interface ProductDisplayProps {
  product: Product;
  selectedColor: ProductColor;
  selectedVariant: ProductVariant;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ 
  product, 
  selectedColor, 
  selectedVariant 
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12">
      {/* Product Image Container */}
      <motion.div 
        className="relative w-full max-w-2xl aspect-square mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Glassmorphic background */}
        <div className="absolute inset-0 glass-card rounded-3xl"></div>
        
        {/* Product Image */}
        <motion.img
          src={selectedVariant.image}
          alt={`${product.name} in ${selectedColor.name}`}
          className="relative z-10 w-full h-full object-contain p-8"
          key={`${selectedColor.id}-${selectedVariant.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Floating elements for visual interest */}
        <motion.div
          className="absolute top-4 right-4 w-3 h-3 bg-apple-gray-900 rounded-full opacity-20"
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
          className="absolute bottom-8 left-8 w-2 h-2 bg-apple-gray-400 rounded-full opacity-30"
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
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl lg:text-4xl font-semibold text-apple-gray-900 mb-2">
          {product.name}
        </h2>
        <p className="text-lg text-apple-gray-600 mb-4">
          {product.description}
        </p>
        
        {/* Color indicator */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-sm text-apple-gray-500">Color:</span>
          <div 
            className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
            style={{ backgroundColor: selectedColor.hex }}
          />
          <span className="text-sm font-medium text-apple-gray-700">
            {selectedColor.name}
          </span>
        </div>
        
        {/* Variant indicator */}
        <div className="text-sm text-apple-gray-500">
          {selectedVariant.name}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDisplay;

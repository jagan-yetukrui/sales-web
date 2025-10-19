import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products, Product } from '../data/products';
import OptimizedImage from './OptimizedImage';

const ProductComparison: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleProduct = (product: Product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.some(p => p.id === product.id);
      if (isSelected) {
        return prev.filter(p => p.id !== product.id);
      } else if (prev.length < 3) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const comparisonFeatures = [
    { key: 'basePrice', label: 'Starting Price', format: (value: number) => `$${value.toLocaleString()}` },
    { key: 'category', label: 'Category', format: (value: string) => value },
    { key: 'brand', label: 'Brand', format: (value: string) => value },
  ] as const;

  return (
    <>
      {/* Comparison Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="floating-component bg-gradient-to-r from-blue-500 to-cyan-600 text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={`Compare Products (${selectedProducts.length}/3)`}
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        {selectedProducts.length > 0 && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {selectedProducts.length}
          </motion.div>
        )}
      </motion.button>

      {/* Comparison Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            
            <motion.div
              className="relative w-full max-w-6xl max-h-[90vh] glass-card rounded-3xl p-8 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-neutral-900">Product Comparison</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Product Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-neutral-700 mb-4">Select Products to Compare</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => {
                    const isSelected = selectedProducts.some(p => p.id === product.id);
                    const isDisabled = !isSelected && selectedProducts.length >= 3;
                    
                    return (
                      <motion.div
                        key={product.id}
                        className={`glass-card p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                          isSelected ? 'ring-2 ring-primary-500 bg-primary-50' : 
                          isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                        }`}
                        onClick={() => !isDisabled && toggleProduct(product)}
                        whileHover={!isDisabled ? { scale: 1.02 } : {}}
                        whileTap={!isDisabled ? { scale: 0.98 } : {}}
                      >
                        <div className="aspect-square mb-4 rounded-xl overflow-hidden">
                          <OptimizedImage
                            src={product.colors[0]?.variants[0]?.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center&auto=format&q=80'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="font-semibold text-neutral-900 mb-2">{product.name}</h4>
                        <p className="text-sm text-neutral-600 mb-2">{product.brand}</p>
                        <p className="text-lg font-bold text-primary-600">${product.basePrice.toLocaleString()}</p>
                        {isSelected && (
                          <div className="mt-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Comparison Table */}
              {selectedProducts.length > 0 && (
                <motion.div
                  className="overflow-x-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-200">
                        <th className="text-left py-4 px-2 font-semibold text-neutral-700">Feature</th>
                        {selectedProducts.map((product) => (
                          <th key={product.id} className="text-center py-4 px-2 font-semibold text-neutral-700">
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 mb-2 rounded-xl overflow-hidden">
                                <OptimizedImage
                                  src={product.colors[0]?.variants[0]?.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center&auto=format&q=80'}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="text-sm">{product.name}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonFeatures.map((feature, index) => (
                        <motion.tr
                          key={feature.key}
                          className="border-b border-neutral-100"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <td className="py-4 px-2 font-medium text-neutral-700">{feature.label}</td>
                          {selectedProducts.map((product) => (
                            <td key={product.id} className="py-4 px-2 text-center text-neutral-600">
                              {feature.key === 'basePrice' 
                                ? `$${(product.basePrice as number).toLocaleString()}`
                                : feature.key === 'category'
                                ? product.category
                                : product.brand
                              }
                            </td>
                          ))}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}

              {/* Action Buttons */}
              {selectedProducts.length > 0 && (
                <motion.div
                  className="flex gap-4 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    onClick={() => setSelectedProducts([])}
                    className="px-6 py-3 bg-neutral-100 text-neutral-700 rounded-xl hover:bg-neutral-200 transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Close Comparison
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductComparison;

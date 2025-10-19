import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCustomizer } from '../context/CustomizerContext';
import { Link } from 'react-router-dom';

const SummaryCard: React.FC = () => {
  const { state, calculateTotalPrice } = useCustomizer();

  if (!state.selectedProduct || !state.selectedColor || !state.selectedVariant) {
    return null;
  }

  const totalPrice = calculateTotalPrice();
  const addonsTotal = state.selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  const variantPrice = state.selectedVariant.price;

  return (
        <motion.div
          className="fixed bottom-6 left-6 w-80 glass-card rounded-2xl p-6 shadow-glass z-50 summary-card"
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-neutral-900">
          Your {state.selectedProduct.name}
        </h3>
        <div className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded-full border border-white shadow-sm"
            style={{ backgroundColor: state.selectedColor.hex }}
          />
          <span className="text-xs text-neutral-500">
            {state.selectedColor.name}
          </span>
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        {/* Base Product */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-neutral-600">
            {state.selectedProduct.name}
          </span>
          <span className="font-medium text-neutral-900">
            ${state.selectedProduct.basePrice.toLocaleString()}
          </span>
        </div>

        {/* Variant */}
        {variantPrice > 0 && (
          <motion.div
            className="flex justify-between items-center text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-neutral-600">
              {state.selectedVariant.name}
            </span>
            <span className="font-medium text-neutral-900">
              +${variantPrice.toLocaleString()}
            </span>
          </motion.div>
        )}

        {/* Add-ons */}
        <AnimatePresence>
          {state.selectedAddons.map((addon) => (
            <motion.div
              key={addon.id}
              className="flex justify-between items-center text-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2">
                {addon.icon && (
                  <span className="text-xs">{addon.icon}</span>
                )}
                <span className="text-neutral-600">
                  {addon.name}
                </span>
              </div>
              <span className="font-medium text-neutral-900">
                ${addon.price.toLocaleString()}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add-ons Total */}
        {addonsTotal > 0 && (
          <motion.div
            className="flex justify-between items-center text-sm border-t border-neutral-200 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-neutral-600">
              Accessories
            </span>
            <span className="font-medium text-neutral-900">
              ${addonsTotal.toLocaleString()}
            </span>
          </motion.div>
        )}
      </div>

      {/* Total */}
      <div className="border-t border-neutral-200 pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-neutral-900">
            Total
          </span>
          <motion.span
            className="text-2xl font-bold gradient-text"
            key={totalPrice}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            ${totalPrice.toLocaleString()}
          </motion.span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Link to="/checkout">
            <motion.button
              className="btn-primary w-full text-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Proceed to Checkout
            </motion.button>
          </Link>
          
          <motion.button
            className="btn-secondary w-full text-center text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              // Save configuration
              const config = {
                product: state.selectedProduct,
                color: state.selectedColor,
                variant: state.selectedVariant,
                addons: state.selectedAddons,
                totalPrice
              };
              localStorage.setItem('customizer-config', JSON.stringify(config));
            }}
          >
            Save Configuration
          </motion.button>
        </div>
      </div>

      {/* Floating animation elements */}
      <motion.div
        className="absolute -top-2 -right-2 w-4 h-4 bg-primary-500 rounded-full opacity-20"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute -bottom-1 -left-1 w-2 h-2 bg-accent-500 rounded-full opacity-30"
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

      {/* Progress indicator */}
      <div className="mt-4 pt-4 border-t border-neutral-200">
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
          <span>Configuration Progress</span>
          <span>100%</span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SummaryCard;
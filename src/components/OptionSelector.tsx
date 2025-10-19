import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useCustomizer } from '../context/CustomizerContext';
import { ProductColor, ProductVariant, ProductAddon } from '../data/products';

const OptionSelector: React.FC = () => {
  const { state, dispatch } = useCustomizer();

  const handleColorChange = useCallback((color: ProductColor) => {
    dispatch({ type: 'SET_COLOR', payload: color });
  }, [dispatch]);

  const handleVariantChange = useCallback((variant: ProductVariant) => {
    dispatch({ type: 'SET_VARIANT', payload: variant });
  }, [dispatch]);

  const handleAddonToggle = useCallback((addon: ProductAddon) => {
    dispatch({ type: 'TOGGLE_ADDON', payload: addon });
  }, [dispatch]);

  if (!state.selectedProduct || !state.selectedColor || !state.selectedVariant) {
    return null;
  }

  return (
    <div className="flex-1 p-6 lg:p-8 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="space-y-10"
      >
        {/* Color Selection */}
        <div className="color-selector">
          <h3 className="text-xl font-semibold text-neutral-900 mb-4">
            Choose your color
          </h3>
          <div className="flex gap-3 flex-wrap">
            {state.selectedProduct.colors.map((color, index) => (
              <motion.button
                key={color.id}
                className={`option-button flex items-center gap-2 ${
                  state.selectedColor?.id === color.id ? 'selected' : ''
                }`}
                onClick={() => handleColorChange(color)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div
                  className="w-4 h-4 rounded-full border border-neutral-300"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-sm font-medium">{color.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Storage/Variant Selection */}
        <div className="variant-selector">
          <h3 className="text-xl font-semibold text-neutral-900 mb-4">
            Choose your configuration
          </h3>
          <div className="space-y-2">
            {state.selectedColor.variants.map((variant, index) => (
              <motion.button
                key={variant.id}
                className={`option-button w-full text-left ${
                  state.selectedVariant?.id === variant.id ? 'selected' : ''
                }`}
                onClick={() => handleVariantChange(variant)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{variant.name}</span>
                    {variant.description && (
                      <p className="text-xs text-neutral-500 mt-1">
                        {variant.description}
                      </p>
                    )}
                  </div>
                  {variant.price > 0 && (
                    <span className="text-sm text-neutral-500 font-medium">
                      +${variant.price.toLocaleString()}
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Add-ons Selection */}
        <div className="addons-selector">
          <h3 className="text-xl font-semibold text-neutral-900 mb-4">
            Add accessories
          </h3>
          <div className="space-y-3">
            {state.selectedProduct.addons.map((addon, index) => {
              const isSelected = state.selectedAddons.some(selected => selected.id === addon.id);
              return (
                <motion.div
                  key={addon.id}
                  className={`glass-card p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    isSelected ? 'ring-2 ring-primary-500 bg-primary-50' : ''
                  }`}
                  onClick={() => handleAddonToggle(addon)}
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleAddonToggle(addon)}
                        className="mt-1 w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {addon.icon && (
                            <span className="text-sm">{addon.icon}</span>
                          )}
                          <h4 className="font-medium text-neutral-900">
                            {addon.name}
                          </h4>
                          {addon.popular && (
                            <span className="px-2 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutral-600">
                          {addon.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full">
                            {addon.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-neutral-700">
                      ${addon.price.toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Financing Options */}
        <div>
          <h3 className="text-xl font-semibold text-neutral-900 mb-4">
            Financing & Delivery
          </h3>
          <div className="space-y-3">
            {[
              { id: 'standard', name: 'Standard Delivery', price: 0, description: '5-7 business days' },
              { id: 'express', name: 'Express Delivery', price: 25, description: '2-3 business days' },
              { id: 'financing', name: 'Monthly Financing', price: 0, description: 'Starting at $29/month' }
            ].map((option, index) => (
              <motion.div
                key={option.id}
                className="glass-card p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/70"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-neutral-900 mb-1">
                      {option.name}
                    </h4>
                    <p className="text-sm text-neutral-600">
                      {option.description}
                    </p>
                  </div>
                  {option.price > 0 && (
                    <span className="text-sm font-medium text-neutral-700">
                      +${option.price.toLocaleString()}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OptionSelector;

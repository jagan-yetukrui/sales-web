import React from 'react';
import { motion } from 'framer-motion';
import { Product, ProductColor, ProductVariant, ProductAddon } from '../data/products';

interface OptionsPanelProps {
  product: Product;
  selectedColor: ProductColor;
  selectedVariant: ProductVariant;
  selectedAddons: ProductAddon[];
  onColorChange: (color: ProductColor) => void;
  onVariantChange: (variant: ProductVariant) => void;
  onAddonToggle: (addon: ProductAddon) => void;
}

const OptionsPanel: React.FC<OptionsPanelProps> = ({
  product,
  selectedColor,
  selectedVariant,
  selectedAddons,
  onColorChange,
  onVariantChange,
  onAddonToggle
}) => {
  return (
    <div className="flex-1 p-6 lg:p-8 max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="space-y-8"
      >
        {/* Color Selection */}
        <div>
          <h3 className="text-xl font-semibold text-apple-gray-900 mb-4">
            Choose your color
          </h3>
          <div className="flex gap-3 flex-wrap">
            {product.colors.map((color) => (
              <motion.button
                key={color.id}
                className={`option-button flex items-center gap-2 ${
                  selectedColor.id === color.id ? 'selected' : ''
                }`}
                onClick={() => onColorChange(color)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="w-4 h-4 rounded-full border border-apple-gray-300"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-sm font-medium">{color.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Storage/Variant Selection */}
        <div>
          <h3 className="text-xl font-semibold text-apple-gray-900 mb-4">
            Choose your configuration
          </h3>
          <div className="space-y-2">
            {selectedColor.variants.map((variant) => (
              <motion.button
                key={variant.id}
                className={`option-button w-full text-left ${
                  selectedVariant.id === variant.id ? 'selected' : ''
                }`}
                onClick={() => onVariantChange(variant)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{variant.name}</span>
                  {variant.price > 0 && (
                    <span className="text-sm text-apple-gray-500">
                      +${variant.price.toLocaleString()}
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Add-ons Selection */}
        <div>
          <h3 className="text-xl font-semibold text-apple-gray-900 mb-4">
            Add accessories
          </h3>
          <div className="space-y-3">
            {product.addons.map((addon) => {
              const isSelected = selectedAddons.some(selected => selected.id === addon.id);
              return (
                <motion.div
                  key={addon.id}
                  className={`glass-card p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    isSelected ? 'ring-2 ring-apple-gray-900' : ''
                  }`}
                  onClick={() => onAddonToggle(addon)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onAddonToggle(addon)}
                        className="mt-1 w-4 h-4 text-apple-gray-900 border-apple-gray-300 rounded focus:ring-apple-gray-900"
                      />
                      <div>
                        <h4 className="font-medium text-apple-gray-900 mb-1">
                          {addon.name}
                        </h4>
                        <p className="text-sm text-apple-gray-600">
                          {addon.description}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-apple-gray-700">
                      ${addon.price.toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OptionsPanel;

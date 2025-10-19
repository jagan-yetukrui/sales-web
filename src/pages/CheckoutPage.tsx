import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCustomizer } from '../context/CustomizerContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CheckoutPage: React.FC = () => {
  const { state, calculateTotalPrice } = useCustomizer();

  if (!state.selectedProduct || !state.selectedColor || !state.selectedVariant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
              No Configuration Found
            </h2>
            <p className="text-neutral-600 mb-6">
              Please customize a product first before proceeding to checkout.
            </p>
            <Link to="/customize">
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Customizing
              </motion.button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const totalPrice = calculateTotalPrice();
  const addonsTotal = state.selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  const variantPrice = state.selectedVariant.price;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Review Your Order
          </h1>
          <p className="text-lg text-neutral-600">
            Confirm your configuration and complete your purchase
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Product Details */}
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
                Product Details
              </h2>
              
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <img
                    src={state.selectedVariant.image}
                    alt={state.selectedProduct.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-neutral-500 font-medium">
                      {state.selectedProduct.brand}
                    </span>
                    <div className="w-1 h-1 bg-neutral-400 rounded-full" />
                    <span className="text-sm text-neutral-500 font-medium">
                      {state.selectedProduct.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {state.selectedProduct.name}
                  </h3>
                  
                  <p className="text-neutral-600 mb-4">
                    {state.selectedProduct.description}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-500">Color:</span>
                      <div 
                        className="w-4 h-4 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: state.selectedColor.hex }}
                      />
                      <span className="text-sm font-medium text-neutral-700">
                        {state.selectedColor.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-500">Configuration:</span>
                      <span className="text-sm font-medium text-neutral-700">
                        {state.selectedVariant.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Add-ons */}
            {state.selectedAddons.length > 0 && (
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                  Accessories
                </h3>
                
                <div className="space-y-4">
                  {state.selectedAddons.map((addon) => (
                    <motion.div
                      key={addon.id}
                      className="flex items-center justify-between p-4 bg-white/50 rounded-xl"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-3">
                        {addon.icon && (
                          <span className="text-lg">{addon.icon}</span>
                        )}
                        <div>
                          <h4 className="font-medium text-neutral-900">
                            {addon.name}
                          </h4>
                          <p className="text-sm text-neutral-600">
                            {addon.description}
                          </p>
                        </div>
                      </div>
                      <span className="font-medium text-neutral-900">
                        ${addon.price.toLocaleString()}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                Price Breakdown
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-600">
                    {state.selectedProduct.name}
                  </span>
                  <span className="font-medium text-neutral-900">
                    ${state.selectedProduct.basePrice.toLocaleString()}
                  </span>
                </div>

                {variantPrice > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-600">
                      {state.selectedVariant.name}
                    </span>
                    <span className="font-medium text-neutral-900">
                      +${variantPrice.toLocaleString()}
                    </span>
                  </div>
                )}

                {addonsTotal > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-600">
                      Accessories
                    </span>
                    <span className="font-medium text-neutral-900">
                      +${addonsTotal.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="border-t border-neutral-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-neutral-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold gradient-text">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Checkout Form */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Contact Information */}
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                Delivery Options
              </h3>
              
              <div className="space-y-3">
                {[
                  { id: 'standard', name: 'Standard Delivery', price: 0, description: '5-7 business days' },
                  { id: 'express', name: 'Express Delivery', price: 25, description: '2-3 business days' },
                  { id: 'overnight', name: 'Overnight Delivery', price: 50, description: 'Next business day' }
                ].map((option) => (
                  <label key={option.id} className="flex items-center justify-between p-4 bg-white/50 rounded-xl cursor-pointer hover:bg-white/70 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        value={option.id}
                        className="w-4 h-4 text-primary-500 border-neutral-300 focus:ring-primary-500"
                        defaultChecked={option.id === 'standard'}
                      />
                      <div>
                        <div className="font-medium text-neutral-900">
                          {option.name}
                        </div>
                        <div className="text-sm text-neutral-600">
                          {option.description}
                        </div>
                      </div>
                    </div>
                    {option.price > 0 && (
                      <span className="text-sm font-medium text-neutral-700">
                        +${option.price}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <motion.button
                className="btn-primary w-full text-center py-4 text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // Simulate successful purchase
                  alert('Purchase successful! Thank you for your order.');
                }}
              >
                Complete Purchase
              </motion.button>
              
              <Link to="/customize">
                <motion.button
                  className="btn-secondary w-full text-center py-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Edit Configuration
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;

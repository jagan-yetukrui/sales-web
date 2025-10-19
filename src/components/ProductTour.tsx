import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const ProductTour: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasCompletedTour, setHasCompletedTour] = useState(false);

  const tourSteps: TourStep[] = [
    {
      id: 'product-selector',
      title: 'Choose Your Product',
      description: 'Select from our premium collection of MacBook, Tesla, and Nike products.',
      target: '.product-selector',
      position: 'bottom'
    },
    {
      id: 'color-selector',
      title: 'Pick Your Color',
      description: 'Choose from a variety of stunning colors to match your style.',
      target: '.color-selector',
      position: 'right'
    },
    {
      id: 'variant-selector',
      title: 'Select Configuration',
      description: 'Customize storage, performance, and other specifications.',
      target: '.variant-selector',
      position: 'right'
    },
    {
      id: 'addons-selector',
      title: 'Add Accessories',
      description: 'Enhance your product with premium add-ons and accessories.',
      target: '.addons-selector',
      position: 'right'
    },
    {
      id: 'product-viewer',
      title: 'See Your Product',
      description: 'View your customized product in real-time as you make changes.',
      target: '.product-viewer',
      position: 'left'
    },
    {
      id: 'summary-card',
      title: 'Review & Purchase',
      description: 'Check your configuration and total price before proceeding to checkout.',
      target: '.summary-card',
      position: 'top'
    }
  ];

  useEffect(() => {
    const completed = localStorage.getItem('product-tour-completed');
    setHasCompletedTour(completed === 'true');
  }, []);

  const startTour = () => {
    setIsActive(true);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTour = () => {
    setIsActive(false);
    setCurrentStep(0);
    setHasCompletedTour(true);
    localStorage.setItem('product-tour-completed', 'true');
  };

  const skipTour = () => {
    setIsActive(false);
    setCurrentStep(0);
  };

  const resetTour = () => {
    setHasCompletedTour(false);
    localStorage.removeItem('product-tour-completed');
  };

  const getTooltipPosition = (position: string) => {
    switch (position) {
      case 'top': return 'bottom-full mb-4';
      case 'bottom': return 'top-full mt-4';
      case 'left': return 'right-full mr-4';
      case 'right': return 'left-full ml-4';
      default: return 'top-full mt-4';
    }
  };

  const getArrowPosition = (position: string) => {
    switch (position) {
      case 'top': return 'top-full left-1/2 transform -translate-x-1/2';
      case 'bottom': return 'bottom-full left-1/2 transform -translate-x-1/2';
      case 'left': return 'left-full top-1/2 transform -translate-y-1/2';
      case 'right': return 'right-full top-1/2 transform -translate-y-1/2';
      default: return 'top-full left-1/2 transform -translate-x-1/2';
    }
  };

  return (
    <>
      {/* Tour Start Button */}
      {!hasCompletedTour && !isActive && (
        <motion.button
          onClick={startTour}
          className="floating-component bg-gradient-to-r from-green-500 to-emerald-600 text-white"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Take a Product Tour"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </motion.button>
      )}

      {/* Reset Tour Button (for testing) */}
      {hasCompletedTour && (
        <motion.button
          onClick={resetTour}
          className="fixed top-44 right-6 z-50 glass-card p-2 rounded-xl hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        </motion.button>
      )}

      {/* Tour Overlay */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            
            {/* Highlighted element */}
            {tourSteps[currentStep] && (
              <motion.div
                className="absolute border-2 border-primary-500 rounded-2xl shadow-neon"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  // This would need to be calculated based on the target element
                  // For now, we'll use a placeholder
                }}
              />
            )}

            {/* Tooltip */}
            {tourSteps[currentStep] && (
              <motion.div
                className={`absolute z-10 ${getTooltipPosition(tourSteps[currentStep].position)}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="glass-card p-6 rounded-2xl max-w-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                        {currentStep + 1}
                      </div>
                      <span className="text-sm text-neutral-500">
                        {currentStep + 1} of {tourSteps.length}
                      </span>
                    </div>
                    <button
                      onClick={skipTour}
                      className="w-6 h-6 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center"
                    >
                      <svg className="w-3 h-3 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {tourSteps[currentStep].title}
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    {tourSteps[currentStep].description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {currentStep > 0 && (
                        <button
                          onClick={prevStep}
                          className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
                        >
                          Previous
                        </button>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={skipTour}
                        className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
                      >
                        Skip Tour
                      </button>
                      <button
                        onClick={nextStep}
                        className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                      >
                        {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Arrow */}
                <div className={`absolute ${getArrowPosition(tourSteps[currentStep].position)}`}>
                  <div className={`w-0 h-0 border-4 ${
                    tourSteps[currentStep].position === 'top' ? 'border-t-primary-500 border-l-transparent border-r-transparent border-b-transparent' :
                    tourSteps[currentStep].position === 'bottom' ? 'border-b-primary-500 border-l-transparent border-r-transparent border-t-transparent' :
                    tourSteps[currentStep].position === 'left' ? 'border-l-primary-500 border-t-transparent border-r-transparent border-b-transparent' :
                    'border-r-primary-500 border-t-transparent border-l-transparent border-b-transparent'
                  }`} />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductTour;

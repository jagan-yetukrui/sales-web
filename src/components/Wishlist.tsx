import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCustomizer } from '../context/CustomizerContext';
import { products } from '../data/products';
import OptimizedImage from './OptimizedImage';

interface WishlistItem {
  productId: string;
  addedAt: Date;
  notes?: string;
}

const Wishlist: React.FC = () => {
  const { state } = useCustomizer();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showAddNote, setShowAddNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (productId: string) => {
    if (!wishlist.some(item => item.productId === productId)) {
      setWishlist(prev => [...prev, { productId, addedAt: new Date() }]);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item.productId !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.productId === productId);
  };

  const addNote = (productId: string) => {
    setWishlist(prev => prev.map(item => 
      item.productId === productId 
        ? { ...item, notes: noteText }
        : item
    ));
    setShowAddNote(null);
    setNoteText('');
  };

  const getWishlistProducts = () => {
    return wishlist.map(item => ({
      ...products.find(p => p.id === item.productId)!,
      wishlistItem: item
    })).filter(Boolean);
  };

  return (
    <>
      {/* Wishlist Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="floating-component bg-gradient-to-r from-pink-500 to-red-600 text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={`Wishlist (${wishlist.length})`}
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        {wishlist.length > 0 && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-white text-pink-600 text-xs rounded-full flex items-center justify-center font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {wishlist.length}
          </motion.div>
        )}
      </motion.button>

      {/* Wishlist Modal */}
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
              className="relative w-full max-w-4xl max-h-[90vh] glass-card rounded-3xl p-8 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-neutral-900">My Wishlist</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Wishlist Items */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {getWishlistProducts().length === 0 ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-700 mb-2">Your wishlist is empty</h3>
                    <p className="text-neutral-500">Add products to your wishlist to save them for later</p>
                  </motion.div>
                ) : (
                  getWishlistProducts().map((product, index) => (
                    <motion.div
                      key={product.id}
                      className="glass-card p-6 rounded-2xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-xl overflow-hidden">
                          <OptimizedImage
                            src={product.colors[0]?.variants[0]?.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center&auto=format&q=80'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-neutral-900 mb-1">{product.name}</h3>
                          <p className="text-neutral-600 mb-2">{product.brand}</p>
                          <p className="text-xl font-bold text-primary-600">${product.basePrice.toLocaleString()}</p>
                          <p className="text-sm text-neutral-500">
                            Added {new Date(product.wishlistItem.addedAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setShowAddNote(product.id)}
                            className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors"
                            title="Add note"
                          >
                            <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          
                          <button
                            onClick={() => removeFromWishlist(product.id)}
                            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition-colors"
                            title="Remove from wishlist"
                          >
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Note Section */}
                      {showAddNote === product.id && (
                        <motion.div
                          className="mt-4 pt-4 border-t border-neutral-200"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                        >
                          <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Add a note about this product..."
                            className="w-full p-3 rounded-lg border border-neutral-200 resize-none"
                            rows={3}
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => addNote(product.id)}
                              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                            >
                              Save Note
                            </button>
                            <button
                              onClick={() => setShowAddNote(null)}
                              className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {product.wishlistItem.notes && (
                        <div className="mt-4 pt-4 border-t border-neutral-200">
                          <p className="text-sm text-neutral-600 italic">"{product.wishlistItem.notes}"</p>
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add to Wishlist Button for Current Product */}
      {state.selectedProduct && (
        <motion.button
          onClick={() => addToWishlist(state.selectedProduct!.id)}
          className={`fixed bottom-32 right-6 z-40 glass-card p-4 rounded-2xl transition-all duration-300 ${
            isInWishlist(state.selectedProduct.id) 
              ? 'bg-red-50 text-red-600' 
              : 'hover:scale-105'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isInWishlist(state.selectedProduct.id)
                ? 'bg-red-500'
                : 'bg-gradient-to-r from-accent-500 to-primary-500'
            }`}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium">
              {isInWishlist(state.selectedProduct.id) ? 'In Wishlist' : 'Add to Wishlist'}
            </span>
          </div>
        </motion.button>
      )}
    </>
  );
};

export default Wishlist;

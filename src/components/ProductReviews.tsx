import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

const ProductReviews: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    comment: '',
    userName: ''
  });
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Mock reviews data
  const mockReviews: Review[] = [
    {
      id: '1',
      userName: 'Sarah Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face&auto=format&q=80',
      rating: 5,
      title: 'Absolutely amazing!',
      comment: 'This product exceeded all my expectations. The quality is outstanding and the design is beautiful. Highly recommended!',
      date: '2024-01-15',
      helpful: 12,
      verified: true
    },
    {
      id: '2',
      userName: 'Mike Chen',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format&q=80',
      rating: 4,
      title: 'Great product with minor issues',
      comment: 'Overall very satisfied with the purchase. The build quality is excellent, though the setup process could be smoother.',
      date: '2024-01-10',
      helpful: 8,
      verified: true
    },
    {
      id: '3',
      userName: 'Emily Rodriguez',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face&auto=format&q=80',
      rating: 5,
      title: 'Perfect for my needs',
      comment: 'I\'ve been using this for a month now and it\'s been fantastic. The performance is exactly what I was looking for.',
      date: '2024-01-08',
      helpful: 15,
      verified: false
    },
    {
      id: '4',
      userName: 'David Kim',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format&q=80',
      rating: 3,
      title: 'Good but not perfect',
      comment: 'It\'s a solid product but there are some areas for improvement. The price point is reasonable for what you get.',
      date: '2024-01-05',
      helpful: 5,
      verified: true
    }
  ];

  const [reviews, setReviews] = useState<Review[]>(mockReviews);

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => 
    reviews.filter(review => review.rating === star).length
  );

  const handleSubmitReview = () => {
    if (newReview.rating === 0 || !newReview.title || !newReview.comment) return;

    const review: Review = {
      id: Date.now().toString(),
      userName: newReview.userName || 'Anonymous',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face&auto=format&q=80',
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      verified: false
    };

    setReviews(prev => [review, ...prev]);
    setNewReview({ rating: 0, title: '', comment: '', userName: '' });
    setShowReviewForm(false);
  };

  const StarRating: React.FC<{ rating: number; interactive?: boolean; onRatingChange?: (rating: number) => void }> = ({ 
    rating, 
    interactive = false, 
    onRatingChange 
  }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            className={`w-5 h-5 ${
              interactive ? 'cursor-pointer' : 'cursor-default'
            }`}
            onClick={() => interactive && onRatingChange?.(star)}
            whileHover={interactive ? { scale: 1.2 } : {}}
            whileTap={interactive ? { scale: 0.9 } : {}}
          >
            <svg
              className={`w-full h-full ${
                star <= rating ? 'text-yellow-400' : 'text-neutral-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </motion.button>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Reviews Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="floating-component bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={`Reviews (${reviews.length}) - ${averageRating.toFixed(1)} stars`}
      >
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-white text-orange-600 text-xs rounded-full flex items-center justify-center font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {reviews.length}
        </motion.div>
      </motion.button>

      {/* Reviews Modal */}
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
                <div>
                  <h2 className="text-3xl font-bold text-neutral-900">Customer Reviews</h2>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <StarRating rating={Math.round(averageRating)} />
                      <span className="text-lg font-semibold text-neutral-700">
                        {averageRating.toFixed(1)} out of 5
                      </span>
                    </div>
                    <span className="text-neutral-500">
                      Based on {reviews.length} reviews
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Rating Distribution */}
              <div className="mb-8 p-6 bg-neutral-50 rounded-2xl">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Rating Distribution</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-sm text-neutral-600 w-4">{star}</span>
                      <StarRating rating={1} />
                      <div className="flex-1 bg-neutral-200 rounded-full h-2">
                        <motion.div
                          className="bg-yellow-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(ratingDistribution[5-star] / reviews.length) * 100}%` }}
                          transition={{ duration: 0.8, delay: star * 0.1 }}
                        />
                      </div>
                      <span className="text-sm text-neutral-600 w-8">
                        {ratingDistribution[5-star]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Write Review Button */}
              <div className="mb-6">
                <motion.button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Write a Review
                </motion.button>
              </div>

              {/* Review Form */}
              <AnimatePresence>
                {showReviewForm && (
                  <motion.div
                    className="mb-8 p-6 bg-neutral-50 rounded-2xl"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">Write Your Review</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Your Rating
                        </label>
                        <StarRating 
                          rating={newReview.rating} 
                          interactive 
                          onRatingChange={(rating) => setNewReview(prev => ({ ...prev, rating }))}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Name (optional)
                        </label>
                        <input
                          type="text"
                          value={newReview.userName}
                          onChange={(e) => setNewReview(prev => ({ ...prev, userName: e.target.value }))}
                          className="w-full p-3 rounded-lg border border-neutral-200"
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Review Title
                        </label>
                        <input
                          type="text"
                          value={newReview.title}
                          onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full p-3 rounded-lg border border-neutral-200"
                          placeholder="Summarize your experience"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Your Review
                        </label>
                        <textarea
                          value={newReview.comment}
                          onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                          className="w-full p-3 rounded-lg border border-neutral-200 resize-none"
                          rows={4}
                          placeholder="Tell us about your experience with this product"
                        />
                      </div>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={handleSubmitReview}
                          className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                        >
                          Submit Review
                        </button>
                        <button
                          onClick={() => setShowReviewForm(false)}
                          className="px-6 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Reviews List */}
              <div className="space-y-6 max-h-96 overflow-y-auto">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    className="glass-card p-6 rounded-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-neutral-900">{review.userName}</h4>
                          {review.verified && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <StarRating rating={review.rating} />
                          <span className="text-sm text-neutral-500">{review.date}</span>
                        </div>
                        
                        <h5 className="font-semibold text-neutral-900 mb-2">{review.title}</h5>
                        <p className="text-neutral-700 mb-3">{review.comment}</p>
                        
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V18m-7-8a2 2 0 112 2 2 2 0 01-2-2z" />
                            </svg>
                            Helpful ({review.helpful})
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductReviews;

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquarePlus, User, CheckCircle } from 'lucide-react';
import staticReviews from '../data/reviews';

// --- Star Rating Display ---
function StarDisplay({ rating, size = 'sm' }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' };
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${sizes[size]} ${s <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}
        />
      ))}
    </div>
  );
}

// --- Interactive Star Picker ---
function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(s)}
          className="transition-transform hover:scale-125"
        >
          <Star
            className={`h-7 w-7 transition-colors ${
              s <= (hovered || value) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 fill-gray-300'
            }`}
          />
        </button>
      ))}
      <span className="ml-2 text-sm font-bold text-gray-500">
        {value === 1 && 'Poor'}
        {value === 2 && 'Fair'}
        {value === 3 && 'Good'}
        {value === 4 && 'Very Good'}
        {value === 5 && 'Excellent!'}
      </span>
    </div>
  );
}

// --- Single Review Card ---
function ReviewCard({ review, index }) {
  const colors = ['bg-primary', 'bg-secondary', 'bg-emerald-600', 'bg-violet-600', 'bg-rose-500', 'bg-sky-600'];
  const color = colors[index % colors.length];
  const date = new Date(review.date).toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Stars */}
      <StarDisplay rating={review.rating} />

      {/* Review Text */}
      <p className="mt-4 text-gray-600 font-medium leading-relaxed flex-grow text-sm">
        "{review.text}"
      </p>

      {/* Author */}
      <div className="mt-5 flex items-center gap-3">
        <div className={`${color} w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0`}>
          {review.avatar}
        </div>
        <div>
          <p className="font-bold text-secondary text-sm">{review.author}</p>
          <p className="text-xs text-gray-400 font-medium">{review.location} · {date}</p>
        </div>
        {review.isNew && (
          <span className="ml-auto text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
            New
          </span>
        )}
      </div>
    </motion.div>
  );
}

// --- Add Review Form ---
function AddReviewForm({ productId, onReviewAdded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ author: '', location: '', rating: 0, text: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.rating) { setError('Please select a star rating.'); return; }
    if (!form.text.trim()) { setError('Please write a review.'); return; }
    if (!form.author.trim()) { setError('Please enter your name.'); return; }

    const newReview = {
      id: `user-${Date.now()}`,
      author: form.author.trim(),
      location: form.location.trim() || 'Pakistan',
      rating: form.rating,
      date: new Date().toISOString().split('T')[0],
      text: form.text.trim(),
      avatar: form.author.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
      isNew: true,
    };

    // Save to localStorage
    const key = `reviews_${productId}`;
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    localStorage.setItem(key, JSON.stringify([newReview, ...existing]));

    onReviewAdded(newReview);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setIsOpen(false); setForm({ author: '', location: '', rating: 0, text: '' }); setError(''); }, 2500);
  };

  const inputCls = 'w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-secondary font-medium text-sm focus:outline-none focus:border-primary focus:bg-white transition-all';

  return (
    <div className="mt-8">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-6 py-3.5 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-2xl transition-all hover:-translate-y-0.5 shadow-md text-sm"
        >
          <MessageSquarePlus className="h-4 w-4" />
          Write a Review
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <CheckCircle className="h-14 w-14 text-green-500 mx-auto mb-3" />
                </motion.div>
                <h3 className="text-xl font-black text-secondary">Shukriya!</h3>
                <p className="text-gray-500 mt-1 font-medium">Aapka review publish ho gaya hai.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-secondary">Your Review</h3>
                  <button type="button" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold text-sm transition-colors">Cancel</button>
                </div>

                {error && <p className="text-sm font-bold text-red-500 bg-red-50 px-4 py-3 rounded-xl">{error}</p>}

                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Rating *</label>
                  <StarPicker value={form.rating} onChange={(r) => { setForm(p => ({ ...p, rating: r })); setError(''); }} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Your Name *</label>
                    <input value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))} placeholder="e.g., Khalid Ahmed" className={inputCls} required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">City</label>
                    <input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder="e.g., Lahore" className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Review *</label>
                  <textarea
                    value={form.text}
                    onChange={e => { setForm(p => ({ ...p, text: e.target.value })); setError(''); }}
                    placeholder="Apna experience share karein..."
                    rows={4}
                    className={`${inputCls} resize-none`}
                    required
                  />
                </div>

                <button type="submit" className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-black rounded-2xl transition-all hover:-translate-y-0.5 shadow-[0_0_20px_rgba(249,115,22,0.25)]">
                  Submit Review
                </button>
              </form>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

// ============================================================
// MAIN EXPORT: ReviewsSection
// Props:
//   productId (string) - 'home' for homepage, product id for product page
//   title (string)     - Section heading
//   subtitle (string)  - Section subheading
//   limit (number)     - Max reviews to show initially
// ============================================================
export default function ReviewsSection({ productId = 'home', title, subtitle, limit = 6 }) {
  const baseStatic = staticReviews[productId] || [];
  const savedRaw = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(`reviews_${productId}`) || '[]') : [];

  const [userReviews, setUserReviews] = useState(savedRaw);
  const [showAll, setShowAll] = useState(false);

  const allReviews = [...userReviews, ...baseStatic];
  const visibleReviews = showAll ? allReviews : allReviews.slice(0, limit);

  const avgRating = allReviews.length
    ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
    : null;

  const handleNewReview = (review) => {
    setUserReviews(prev => [review, ...prev]);
  };

  const defaultTitle = productId === 'home' ? 'What Our Customers Say' : 'Customer Reviews';
  const defaultSubtitle = productId === 'home'
    ? 'Hazaron satisfied customers ki trust se hamari pehchan hai'
    : 'Is product ke bare mein customers ki raye';

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            {productId === 'home' && (
              <span className="inline-block text-xs font-black text-primary uppercase tracking-widest mb-3">
                ★ Testimonials
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-secondary leading-tight">
              {title || defaultTitle}
            </h2>
            <p className="mt-2 text-gray-500 font-medium max-w-lg">{subtitle || defaultSubtitle}</p>
          </div>

          {/* Rating Summary */}
          {avgRating && (
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-2xl px-5 py-3 flex-shrink-0">
              <p className="text-4xl font-black text-secondary">{avgRating}</p>
              <div>
                <StarDisplay rating={Math.round(parseFloat(avgRating))} size="md" />
                <p className="text-xs text-gray-500 font-medium mt-1">{allReviews.length} reviews</p>
              </div>
            </div>
          )}
        </div>

        {/* Reviews Grid */}
        {allReviews.length === 0 ? (
          <div className="text-center py-14 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <User className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 font-bold">No Comments Yet</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleReviews.map((review, i) => (
                <ReviewCard key={review.id} review={review} index={i} />
              ))}
            </div>

            {allReviews.length > limit && !showAll && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAll(true)}
                  className="px-8 py-3.5 border-2 border-gray-200 text-secondary font-bold rounded-2xl hover:border-primary hover:text-primary transition-all text-sm"
                >
                  Show All {allReviews.length} Reviews
                </button>
              </div>
            )}
          </>
        )}

        {/* Add Review Form */}
        <AddReviewForm productId={productId} onReviewAdded={handleNewReview} />
      </div>
    </section>
  );
}

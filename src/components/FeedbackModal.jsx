import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Star, MessageSquare, Send, CheckCircle, 
  Sparkles, ThumbsUp, User, Quote 
} from 'lucide-react';
import { databaseService } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export default function FeedbackModal({ isOpen, onClose }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [recentReviews, setRecentReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('write'); // 'write' | 'recent'

  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      setName(user.user_metadata.full_name);
    } else if (user?.email) {
      setName(user.email.split('@')[0]);
    }
  }, [user]);

  // Load reviews on mount / open
  useEffect(() => {
    if (isOpen) {
      loadReviews();
    }
  }, [isOpen]);

  const loadReviews = async () => {
    try {
      const data = await databaseService.getFeedback();
      if (data) setRecentReviews(data);
    } catch (err) {
      console.error('Error loading feedback:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      const newReview = await databaseService.submitFeedback({
        userId: user?.id || 'anon',
        name: name || 'Anonymous Professional',
        rating,
        message: message.trim(),
      });
      setSubmitted(true);
      setRecentReviews((prev) => [newReview, ...prev]);
      setTimeout(() => {
        setMessage('');
        setSubmitted(false);
        setActiveTab('recent');
      }, 1500);
    } catch (err) {
      console.error('Submit feedback failed:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/80 shadow-amber-900/10 relative max-h-[90vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center border border-amber-300">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              User Feedback & Reviews
            </h3>
            <p className="text-xs text-slate-500">
              Share your ResumeForge experience with us & the community
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-4 border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('write')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
              activeTab === 'write' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Leave a Review
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('recent')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'recent' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Community Feedback</span>
            <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[10px] rounded-full">
              {recentReviews.length}
            </span>
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto pr-1">
          {activeTab === 'write' ? (
            submitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Thank you for your feedback!</h4>
                <p className="text-xs text-slate-500 mt-1">Your review has been saved to Supabase.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Star rating selector */}
                <div className="text-center py-3 bg-amber-50/60 rounded-2xl border border-amber-200/60">
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    How would you rate your experience?
                  </label>
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-125 focus:outline-none"
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            (hoverRating || rating) >= star
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <div className="text-xs font-semibold text-amber-800 mt-1">
                    {rating === 5 && 'Outstanding! (5/5)'}
                    {rating === 4 && 'Very Good (4/5)'}
                    {rating === 3 && 'Average (3/5)'}
                    {rating === 2 && 'Needs Improvement (2/5)'}
                    {rating === 1 && 'Disappointing (1/5)'}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name or Alias</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex M."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message & Insights</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you liked, what templates worked best for you, or features you'd like to see next..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                    required
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading || !message.trim()}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-bold text-xs shadow-md shadow-amber-300/40 hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Review to Supabase</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )
          ) : (
            /* Recent reviews public list */
            <div className="space-y-3">
              {recentReviews.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-400">
                  No reviews submitted yet. Be the first!
                </div>
              ) : (
                recentReviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-2xl bg-amber-50/40 border border-amber-100 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 font-bold text-[10px] flex items-center justify-center">
                          {rev.name ? rev.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span className="font-bold text-slate-900">{rev.name}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 italic">"{rev.message}"</p>
                    <div className="text-[10px] text-slate-400 mt-1 text-right">
                      {new Date(rev.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

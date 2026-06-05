import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, X, Shield, CheckCircle, MessageSquare, Clock, Send, Loader2 } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { MOCK_REVIEWS } from '../data';
import { Review } from '../types';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';

interface ProviderProfileProps {
  provider: any;
  onClose: () => void;
  onBook: () => void;
}

export const ProviderProfile = ({ provider, onClose, onBook }: ProviderProfileProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    // In a real app, we'd fetch from Firestore
    // For this prototype, we'll combine mock data with a listener
    const reviewsRef = collection(db, 'reviews');
    const q = query(
      reviewsRef,
      where('targetId', '==', provider.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const firestoreReviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      
      // Filter mock reviews for this provider
      const mockReviewsForProvider = MOCK_REVIEWS.filter(r => r.targetId === provider.uid);
      
      // Merge and sort (mock reviews are strings, firestore uses serverTimestamp)
      const combined = [...firestoreReviews, ...mockReviewsForProvider.filter(mr => !firestoreReviews.find(fr => fr.id === mr.id))] as Review[];
      setReviews(combined);
    });

    return () => unsubscribe();
  }, [provider.uid]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert('Please sign in to leave a review');
      return;
    }

    setIsSubmitting(true);
    try {
      const reviewData = {
        authorId: auth.currentUser.uid,
        authorName: auth.currentUser.displayName || 'Anonymous',
        authorPhoto: auth.currentUser.photoURL,
        targetId: provider.uid,
        targetType: 'provider',
        rating: newRating,
        comment: newComment,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'reviews'), reviewData);
      
      setNewComment('');
      setNewRating(5);
      setShowReviewForm(false);
    } catch (err) {
      console.error('Error submitting review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-aura-dark/60 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header/Cover Photo */}
        <div className="relative h-64 bg-aura-beige/10">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-20"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="absolute inset-0 bg-aura-dark opacity-40"></div>
          
          <div className="absolute -bottom-20 left-12 flex items-end gap-8">
            <div className="relative">
              <img 
                src={provider.photoURL} 
                alt={provider.displayName} 
                className="w-40 h-40 rounded-[2rem] object-cover border-4 border-white shadow-2xl grayscale-[0.2]"
              />
              <div className="absolute -bottom-2 -right-2 bg-aura-dark text-aura-beige p-2.5 rounded-2xl shadow-lg border-2 border-white">
                <Shield className="w-5 h-5" />
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-4xl lg:text-5xl font-serif italic text-white drop-shadow-2xl">{provider.displayName}</h2>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-[10px] bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full font-bold uppercase tracking-widest border border-white/20">
                  {provider.certificationLevel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pt-28 px-12 pb-12 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-12">
              <section>
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-aura-dark/20 mb-6">Mastery Narrative</h3>
                <p className="text-aura-dark/70 text-lg leading-relaxed font-medium font-serif italic">
                  "{provider.bio || "Crafting transformative wellness journeys with over 8 years of specialized practice in restorative rituals. Dedicated to the art of holistic healing and personalized rejuvenation."}"
                </p>
              </section>

              <section>
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-aura-dark/20 mb-6">Disciplines</h3>
                <div className="flex flex-wrap gap-3">
                  {provider.specialties.map((s: string) => (
                    <span key={s} className="px-5 py-2.5 bg-aura-beige/10 border border-aura-beige/30 rounded-2xl text-[10px] font-bold text-aura-brown uppercase tracking-widest">
                      {s}
                    </span>
                  ))}
                </div>
              </section>

              {/* Reviews Section */}
              <section className="pt-12 border-t border-black/5">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-serif italic text-aura-brown">Client Testimonials</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center text-aura-beige">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={cn("w-3.5 h-3.5", i < Math.round(provider.rating) ? "fill-current" : "text-aura-beige/30")} />
                        ))}
                      </div>
                      <span className="text-[9px] font-bold text-aura-dark/30 uppercase tracking-widest">{provider.reviewCount} Experiences</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="text-[10px] font-bold text-aura-brown uppercase tracking-[0.3em] hover:brightness-110"
                  >
                    {showReviewForm ? 'Dismiss' : 'Share Experience'}
                  </button>
                </div>

                <AnimatePresence>
                  {showReviewForm && (
                    <motion.form 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-aura-beige/5 border border-aura-beige/20 rounded-[2rem] p-10 mb-12 space-y-6 overflow-hidden shadow-sm"
                      onSubmit={handleSubmitReview}
                    >
                      <div className="flex items-center gap-6 mb-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-aura-dark/40">Rating</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewRating(star)}
                              className="focus:outline-none"
                            >
                              <Star className={cn("w-6 h-6 transition-all duration-300", star <= newRating ? "text-aura-beige fill-current scale-110" : "text-black/10")} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <textarea 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Describe the atmosphere and ritual outcome..."
                        className="w-full bg-white border border-black/5 rounded-2xl p-6 text-base font-medium text-aura-dark focus:outline-none focus:border-aura-beige transition-all min-h-[140px] shadow-sm"
                        required
                      />
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-6 bg-aura-dark text-aura-beige rounded-3xl font-bold text-[10px] tracking-[0.5em] uppercase flex items-center justify-center gap-3 hover:brightness-110 disabled:opacity-50 shadow-2xl transition-all"
                      >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                        Authenticate Experience
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>

                <div className="space-y-10">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="pb-10 border-b border-black/5 last:border-0">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-[1rem] bg-aura-beige/10 flex items-center justify-center text-aura-brown text-xs font-bold border border-aura-beige/20">
                              {review.authorPhoto ? (
                                <img src={review.authorPhoto} className="w-full h-full rounded-[1rem] object-covergrayscale-[0.5]" />
                              ) : (
                                review.authorName.charAt(0)
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-aura-dark tracking-tight">{review.authorName}</p>
                              <p className="text-[9px] text-aura-brown font-bold uppercase tracking-widest">Ritual Graduate</p>
                            </div>
                          </div>
                          <div className="flex items-center text-aura-beige">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={cn("w-3 h-3", i < review.rating ? "fill-current" : "text-aura-beige/20")} />
                            ))}
                          </div>
                        </div>
                        <p className="text-lg text-aura-dark/60 leading-relaxed italic font-serif">"{review.comment}"</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20 bg-aura-beige/5 rounded-[2rem] border border-dashed border-aura-beige/30">
                      <MessageSquare className="w-12 h-12 text-aura-beige/40 mx-auto mb-4" />
                      <p className="text-[10px] text-aura-dark/30 font-bold uppercase tracking-[0.4em]">Narrative Pending</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            <aside className="space-y-8">
              <div className="bg-aura-dark rounded-[2.5rem] p-10 space-y-10 shadow-2xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-aura-beige/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-aura-beige/40">Secure Escrow</span>
                  <Shield className="w-5 h-5 text-aura-beige" />
                </div>
                <div className="space-y-2 relative z-10">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-aura-beige/40">Ritual Honorarium</p>
                  <p className="text-5xl font-serif italic text-aura-beige leading-none">{formatCurrency(7500)}</p>
                </div>
                <button 
                  onClick={onBook}
                  className="w-full py-6 bg-aura-beige text-aura-dark rounded-3xl font-bold text-[10px] tracking-[0.5em] uppercase shadow-2xl hover:scale-[1.02] active:scale-95 transition-all relative z-10"
                >
                  Confirm Ritual
                </button>
                <div className="pt-8 border-t border-white/5 space-y-6 relative z-10">
                  <div className="flex items-center gap-4 text-xs text-white/50 font-medium">
                    <Clock className="w-4 h-4 text-aura-beige" />
                    Response: Immediate
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white/50 font-medium">
                    <CheckCircle className="w-4 h-4 text-aura-beige" />
                    Identity Authenticated
                  </div>
                </div>
              </div>

              <div className="bg-aura-beige/10 rounded-[2rem] p-10 border border-aura-beige/20">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-aura-brown mb-4 opacity-40">Operating Sphere</p>
                <p className="text-sm text-aura-dark font-medium leading-relaxed italic">"Exclusively available for sanctuary rituals within 15km of the Nairobi Collective."</p>
              </div>
            </aside>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

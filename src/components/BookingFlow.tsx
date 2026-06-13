import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Landmark, Calendar, Clock, CreditCard, ChevronRight, Check, Shield, Sparkles } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { SERVICES, MOCK_PROVIDERS, MOCK_CENTERS } from '../data';
import Lottie from 'lottie-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { CalendarSlotPicker } from './CalendarSlotPicker';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const BookingFlow = ({ onClose }: { onClose: () => void }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [deliveryType, setDeliveryType] = useState<'home' | 'center' | null>(null);
  const [service, setService] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [center, setCenter] = useState<any>(null);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [animationData, setAnimationData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestedTimes, setSuggestedTimes] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://lottie.host/5a2d67a9-2d14-41d3-a3d5-738982a8947e/n4Z1Z9I1yD.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error('Failed to load Lottie animation:', err));
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      const q = query(collection(db, 'bookings'), where('clientId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const bookings = querySnapshot.docs.map(doc => doc.data());
      
      if (bookings.length > 0) {
        const timeFrequency: Record<string, number> = {};
        bookings.forEach(b => {
          timeFrequency[b.time] = (timeFrequency[b.time] || 0) + 1;
        });
        
        // Suggest times with highest frequency
        const sorted = Object.entries(timeFrequency)
            .sort((a, b) => b[1] - a[1])
            .map(x => x[0])
            .slice(0, 2);
        setSuggestedTimes(sorted);
      }
    };
    fetchHistory();
  }, [user]);

  const nextStep = () => setStep(s => s + 1);

  const confirmBooking = async () => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        clientId: user.uid,
        providerId: provider?.uid,
        centerId: center?.id,
        service,
        date,
        time,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      nextStep();
    } catch (e) {
      console.error(e);
      toast.error('Booking failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const purchaseGift = async () => {
    if (!user) return;
    setIsSubmitting(true);
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    try {
      await addDoc(collection(db, 'gift_cards'), {
        clientId: user.uid,
        service,
        code,
        status: 'active',
        createdAt: serverTimestamp()
      });
      nextStep();
      toast.success(`Gift purchased! Code: ${code}`);
    } catch (e) {
      console.error(e);
      toast.error('Gift purchase failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProviders = MOCK_PROVIDERS.filter(p => p.specialties.includes(service));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        className="relative bg-white w-full max-w-2xl rounded-[3rem] border border-black/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-12 border-b border-black/5 flex items-center justify-between bg-aura-beige/5">
          <div>
            <h2 className="text-3xl font-serif tracking-tight text-aura-dark">Reserving <br /><span className="italic text-aura-beige">Your Experience</span></h2>
            <div className="flex gap-1.5 mt-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className={cn("h-1 w-10 rounded-full transition-all duration-700", step >= i ? "bg-aura-dark" : "bg-aura-dark/5")} />
              ))}
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-white border border-black/10 rounded-full text-aura-dark/70 hover:text-aura-dark transition-all hover:rotate-90">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-aura-dark/60 text-center">Protocol Selection</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <button 
                    onClick={() => { setDeliveryType('home'); nextStep(); }}
                    className={cn(
                      "p-12 rounded-[2.5rem] border flex flex-col items-center gap-8 transition-all group duration-500",
                      deliveryType === 'home' ? "border-aura-dark bg-aura-dark text-aura-beige" : "border-black/5 bg-aura-beige/5 hover:border-aura-beige/40"
                    )}
                  >
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <Home className={cn("w-10 h-10 transition-colors", deliveryType === 'home' ? "text-aura-dark" : "text-aura-brown")} />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-lg tracking-tight">Private Sanctuary</p>
                      <p className={cn("text-[9px] uppercase tracking-[0.3em] mt-3 font-bold", deliveryType === 'home' ? "text-aura-beige" : "text-aura-dark/60")}>Ritual at your location</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => { setDeliveryType('center'); nextStep(); }}
                    className={cn(
                      "p-12 rounded-[2.5rem] border flex flex-col items-center gap-8 transition-all group duration-500",
                      deliveryType === 'center' ? "border-aura-dark bg-aura-dark text-aura-beige" : "border-black/5 bg-aura-beige/5 hover:border-aura-beige/40"
                    )}
                  >
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <Landmark className={cn("w-10 h-10 transition-colors", deliveryType === 'center' ? "text-aura-dark" : "text-aura-brown")} />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-lg tracking-tight">Public Sanctuary</p>
                      <p className={cn("text-[9px] uppercase tracking-[0.3em] mt-3 font-bold opacity-40", deliveryType === 'center' ? "text-aura-beige" : "text-aura-dark")}>Visit an Aura Center</p>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-aura-dark/60 text-center">Ritual Selection</h3>
                <div className="grid grid-cols-1 gap-10">
                  {SERVICES.map((cat) => (
                    <div key={cat.id} className="space-y-6">
                      <p className="text-[10px] font-bold text-aura-brown uppercase tracking-[0.3em] border-l-2 border-aura-beige pl-4">{cat.name}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {cat.subtypes.map(s => (
                          <button 
                            key={s}
                            onClick={() => { setService(s); nextStep(); }}
                            className="p-6 rounded-[1.5rem] bg-white border border-black/5 hover:border-aura-dark text-sm font-bold text-left transition-all hover:shadow-xl hover:-translate-y-1 text-aura-dark/80 hover:text-aura-dark"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-aura-dark/60 text-center">
                   {deliveryType === 'center' ? 'Center Selection' : 'Specialist Registry'}
                </h3>
                <div className="space-y-4">
                  {deliveryType === 'center' ? (
                    MOCK_CENTERS.map(c => (
                      <button 
                        key={c.id}
                        onClick={() => { setCenter(c); nextStep(); }}
                        className="w-full p-6 bg-white border border-black/5 rounded-[2rem] flex items-center gap-6 text-left hover:border-aura-dark transition-all group hover:shadow-2xl"
                      >
                        <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm shrink-0 grayscale hover:grayscale-0 transition-all duration-500">
                          <img src={c.images[0]} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-aura-dark tracking-tight">{c.name}</p>
                          <p className="text-[9px] text-aura-dark/60 uppercase tracking-[0.2em] mt-2 font-bold">{c.address}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-aura-brown opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))
                  ) : (
                    filteredProviders.length > 0 ? (
                      filteredProviders.map(p => (
                        <button 
                          key={p.uid}
                          onClick={() => { setProvider(p); nextStep(); }}
                          className="w-full p-6 bg-white border border-black/5 rounded-[2rem] flex items-center gap-6 text-left hover:border-aura-dark transition-all group hover:shadow-2xl"
                        >
                          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm shrink-0 grayscale hover:grayscale-0 transition-all duration-500">
                            <img src={p.photoURL} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-aura-dark tracking-tight">{p.displayName}</p>
                            <p className="text-[9px] text-aura-dark/30 uppercase tracking-[0.2em] mt-2 font-bold">{p.specialties.join(' • ')}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-aura-brown opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </button>
                      ))
                    ) : (
                      <p className="text-center text-aura-dark/50">No specialists found for this ritual.</p>
                    )
                  )}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-aura-dark/60 text-center">Ritual Timing</h3>
                
                <CalendarSlotPicker
                  selectedDate={date ? new Date(date) : null}
                  selectedTime={time || null}
                  onDateChange={(d) => setDate(d ? d.toISOString().split('T')[0] : '')}
                  onTimeChange={setTime}
                  availableTimes={['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM']}
                  suggestedTimes={suggestedTimes}
                />

                <button 
                  disabled={!date || !time}
                  onClick={nextStep}
                  className="w-full py-7 bg-aura-dark text-aura-beige rounded-[1.5rem] font-bold tracking-[0.4em] disabled:opacity-20 uppercase text-[10px] transition-all hover:scale-[1.02] shadow-2xl"
                >
                  Validate Ritual Details
                </button>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div 
                key="step5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="bg-aura-beige/10 p-10 rounded-[3rem] border border-aura-beige/20 relative overflow-hidden">
                  <h3 className="text-[10px] font-bold text-aura-brown uppercase tracking-[0.4em] mb-10 text-center">Ritual Summary</h3>
                  <div className="space-y-5 text-sm relative z-10">
                    <div className="flex justify-between items-center bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-black/5">
                      <span className="text-aura-dark/20 font-bold uppercase text-[9px] tracking-[0.3em]">Ritual</span>
                      <span className="font-bold text-aura-dark tracking-tight">{service}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-black/5">
                      <span className="text-aura-dark/20 font-bold uppercase text-[9px] tracking-[0.3em]">Sanctuary</span>
                      <span className="font-bold text-aura-dark tracking-tight">{deliveryType === 'center' ? center?.name : 'Private Location'}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-black/5">
                      <span className="text-aura-dark/20 font-bold uppercase text-[9px] tracking-[0.3em]">Moment</span>
                      <span className="font-bold text-aura-dark tracking-tight">{date} • {time}</span>
                    </div>
                    <div className="pt-10 mt-6 border-t border-aura-beige/30 flex justify-between items-center">
                      <span className="text-2xl font-serif italic text-aura-dark/40"> Ritual Value</span>
                      <span className="text-4xl font-serif italic text-aura-dark">{formatCurrency(7500)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-aura-brown uppercase tracking-[0.4em] mb-4 text-center">Settlement Method</h4>
                  <button className="w-full p-6 rounded-[1.5rem] bg-aura-dark text-aura-beige flex items-center justify-between group transition-all hover:scale-[1.02] shadow-2xl">
                    <div className="flex items-center gap-5">
                      <div className="p-3 bg-white/10 rounded-xl">
                        <CreditCard className="w-6 h-6 text-aura-beige" />
                      </div>
                      <span className="font-bold uppercase text-[10px] tracking-[0.4em]">Integrated Credit Card</span>
                    </div>
                    <Check className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={purchaseGift}
                    className="w-full p-6 rounded-[1.5rem] bg-aura-beige text-aura-dark flex items-center justify-between transition-all hover:bg-aura-beige/20 border border-aura-brown/10"
                  >
                    <div className="flex items-center gap-5">
                      <div className="p-3 bg-white rounded-xl">
                        <Sparkles className="w-6 h-6 text-aura-brown" />
                      </div>
                      <span className="font-bold uppercase text-[10px] tracking-[0.4em]">Gift Experience</span>
                    </div>
                  </button>
                  <button 
                    onClick={async () => {
                      if ((window as any).ethereum) {
                        try {
                          await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
                        } catch (err) {
                          console.error("MetaMask connection failed", err);
                        }
                      }
                    }}
                    className="w-full p-6 rounded-[1.5rem] bg-white border border-black/10 flex items-center justify-between transition-all hover:bg-black/5"
                  >
                    <div className="flex items-center gap-5">
                      <div className="p-3 bg-black/5 rounded-xl text-aura-brown">
                        <Shield className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-aura-dark uppercase text-[10px] tracking-[0.4em]">Web3 Secure Wallet</span>
                    </div>
                  </button>
                </div>

                <div className="flex gap-6 items-center p-8 bg-aura-dark rounded-[2rem] border border-white/5 relative overflow-hidden group">
                  <Shield className="w-10 h-10 text-aura-beige shrink-0 opacity-20 group-hover:scale-110 transition-transform" />
                  <p className="text-[9px] text-white/40 font-bold leading-relaxed tracking-[0.3em] uppercase relative z-10">
                    Your value is secured via <span className="text-aura-beige">Aura Escrow™</span>. Release is authenticated only after experience.
                  </p>
                </div>

                <button 
                  disabled={isSubmitting}
                  onClick={confirmBooking}
                  className="w-full py-8 bg-aura-dark text-white rounded-[2rem] font-bold text-[11px] tracking-[0.6em] uppercase transition-all shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] hover:scale-[1.02]"
                >
                  {isSubmitting ? 'Authenticating...' : 'Authenticate Ritual'}
                </button>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div 
                key="step6"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center text-center py-10 space-y-12"
              >
                <div className="w-64 h-64 relative">
                  {animationData ? (
                    <Lottie 
                      animationData={animationData} 
                      loop={false}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-24 h-24 bg-aura-beige/20 rounded-full flex items-center justify-center animate-pulse">
                        <Check className="w-12 h-12 text-aura-dark" />
                      </div>
                    </div>
                  )}
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.2, type: 'spring' }}
                    className="absolute -top-6 -right-6 w-16 h-16 bg-aura-dark rounded-full flex items-center justify-center text-aura-beige shadow-2xl"
                  >
                    <Sparkles className="w-8 h-8" />
                  </motion.div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-5xl font-serif italic text-aura-dark leading-tight">Ritual <br /> Authenticated</h2>
                  <div className="text-[10px] font-bold text-aura-dark p-6 bg-aura-beige/20 rounded-2xl border border-black/5 space-y-2">
                    <p>Provider: {provider?.displayName}</p>
                    <p>Date: {date}</p>
                    <p>Time: {time}</p>
                  </div>
                  <p className="text-aura-dark/40 font-bold uppercase tracking-[0.4em] text-[10px] max-w-sm mx-auto leading-loose">
                    Your sanctuary awaits. The specialist is preparing for your restorative journey.
                  </p>
                </div>

                <div className="bg-aura-beige/5 border border-black/5 rounded-[2.5rem] p-10 w-full space-y-6">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-aura-dark/20 font-bold uppercase tracking-[0.3em]">Protocol ID</span>
                    <span className="font-mono text-aura-dark font-bold">AUR-8492-X9</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-aura-dark/20 font-bold uppercase tracking-[0.3em]">Protection Layer</span>
                    <span className="text-aura-brown font-bold uppercase tracking-[0.3em]">Escrow Active</span>
                  </div>
                </div>

                <Link 
                  to="/bookings"
                  onClick={onClose}
                  className="w-full py-8 bg-aura-dark text-white rounded-[2rem] font-bold text-[11px] tracking-[0.6em] uppercase transition-all shadow-2xl hover:scale-[1.05] block text-center"
                >
                  View My Bookings
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
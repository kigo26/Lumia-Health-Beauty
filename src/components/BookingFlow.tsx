import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Landmark, Calendar, Clock, CreditCard, ChevronRight, Check, Shield, Sparkles } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { SERVICES, MOCK_PROVIDERS, MOCK_CENTERS } from '../data';
import Lottie from 'lottie-react';

export const BookingFlow = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [deliveryType, setDeliveryType] = useState<'home' | 'center' | null>(null);
  const [service, setService] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [center, setCenter] = useState<any>(null);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch('https://lottie.host/5a2d67a9-2d14-41d3-a3d5-738982a8947e/n4Z1Z9I1yD.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error('Failed to load Lottie animation:', err));
  }, []);

  const nextStep = () => setStep(s => s + 1);

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
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white w-full max-w-2xl rounded-[32px] border border-black/5 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-lumia-text"
      >
        <div className="p-10 border-b border-black/5 flex items-center justify-between bg-black/[0.01]">
          <div>
            <h2 className="text-2xl font-serif italic text-lumia-gold">Reserving your <span className="text-lumia-text">Experience</span></h2>
            <div className="flex gap-1 mt-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className={cn("h-1 w-8 rounded-full transition-all duration-500", step >= i ? "bg-lumia-emerald" : "bg-black/5")} />
              ))}
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-black/5 rounded-full text-lumia-text/40 hover:text-lumia-text transition-colors">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h3 className="text-lg font-bold tracking-tight">How would you like to receive your ritual?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button 
                    onClick={() => { setDeliveryType('home'); nextStep(); }}
                    className={cn(
                      "p-10 rounded-3xl border-2 flex flex-col items-center gap-6 transition-all group",
                      deliveryType === 'home' ? "border-lumia-emerald bg-lumia-emerald/5" : "border-black/5 bg-black/[0.01] hover:border-black/20"
                    )}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-black/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Home className="w-8 h-8 text-lumia-gold" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-base">Sanctuary Service</p>
                      <p className="text-[10px] text-lumia-text/40 uppercase tracking-widest mt-1 font-bold">Specialist travels to you</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => { setDeliveryType('center'); nextStep(); }}
                    className={cn(
                      "p-10 rounded-3xl border-2 flex flex-col items-center gap-6 transition-all group",
                      deliveryType === 'center' ? "border-lumia-gold bg-lumia-gold/5" : "border-black/5 bg-black/[0.01] hover:border-black/20"
                    )}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-black/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Landmark className="w-8 h-8 text-lumia-emerald" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-base">Wellness Center</p>
                      <p className="text-[10px] text-lumia-text/40 uppercase tracking-widest mt-1 font-bold">Visit a Lumia Sanctuary</p>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h3 className="text-lg font-bold tracking-tight">Select your Ritual</h3>
                <div className="grid grid-cols-1 gap-6">
                  {SERVICES.map((cat) => (
                    <div key={cat.id} className="space-y-4">
                      <p className="text-[10px] font-bold text-lumia-charcoal/20 uppercase tracking-[0.2em]">{cat.name}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {cat.subtypes.map(s => (
                          <button 
                            key={s}
                            onClick={() => { setService(s); nextStep(); }}
                            className="p-5 rounded-2xl bg-black/[0.02] border border-black/5 hover:border-lumia-gold/50 text-sm font-bold text-left transition-all hover:bg-black/[0.04]"
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-bold tracking-tight">Choose {deliveryType === 'center' ? 'Center' : 'Specialist'}</h3>
                <div className="space-y-4">
                  {deliveryType === 'center' ? (
                    MOCK_CENTERS.map(c => (
                      <button 
                        key={c.id}
                        onClick={() => { setCenter(c); nextStep(); }}
                        className="w-full p-5 bg-black/[0.01] border border-black/5 rounded-2xl flex items-center gap-5 text-left hover:border-lumia-gold transition-all group"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-black/10 shrink-0">
                          <img src={c.images[0]} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-lumia-charcoal/90 group-hover:text-lumia-gold">{c.name}</p>
                          <p className="text-[10px] text-lumia-charcoal/30 uppercase tracking-widest mt-1 font-bold">{c.address}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-lumia-charcoal/20 group-hover:text-lumia-gold" />
                      </button>
                    ))
                  ) : (
                    MOCK_PROVIDERS.map(p => (
                      <button 
                        key={p.uid}
                        onClick={() => { setProvider(p); nextStep(); }}
                        className="w-full p-5 bg-black/[0.01] border border-black/5 rounded-2xl flex items-center gap-5 text-left hover:border-lumia-gold transition-all group"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-black/10 shrink-0">
                          <img src={p.photoURL} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-lumia-charcoal/90 group-hover:text-lumia-gold">{p.displayName}</p>
                          <p className="text-[10px] text-lumia-charcoal/30 uppercase tracking-widest mt-1 font-bold">{p.specialties.join(', ')}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-lumia-charcoal/20 group-hover:text-lumia-gold" />
                      </button>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h3 className="text-lg font-bold tracking-tight">Schedule Moment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-lumia-charcoal/20 uppercase tracking-widest">Select Date</label>
                    <input 
                      type="date" 
                      className="w-full p-5 bg-black/[0.01] border border-black/10 rounded-2xl outline-none focus:ring-2 focus:ring-lumia-gold/20 text-lumia-charcoal font-medium transition-all" 
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-lumia-charcoal/20 uppercase tracking-widest">Select Slot</label>
                    <select 
                      className="w-full p-5 bg-black/[0.01] border border-black/10 rounded-2xl outline-none focus:ring-2 focus:ring-lumia-gold/20 appearance-none text-lumia-charcoal font-medium cursor-pointer"
                      onChange={(e) => setTime(e.target.value)}
                    >
                      <option value="" className="bg-white">Choose a slot</option>
                      {['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'].map(t => (
                        <option key={t} value={t} className="bg-white">{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button 
                  disabled={!date || !time}
                  onClick={nextStep}
                  className="w-full py-5 bg-lumia-gold text-white rounded-2xl font-bold tracking-widest disabled:opacity-30 uppercase text-[10px] transition-all hover:bg-lumia-gold-hover"
                >
                  Confirm Details
                </button>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div 
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="bg-black/[0.01] p-8 rounded-3xl border border-black/5 relative overflow-hidden">
                  <h3 className="text-[10px] font-bold text-lumia-gold uppercase tracking-[0.2em] mb-6">Reservation Summary</h3>
                  <div className="space-y-4 text-sm relative z-10">
                    <div className="flex justify-between items-center bg-black/[0.01] p-4 rounded-xl">
                      <span className="text-lumia-text/30 font-bold uppercase text-[9px] tracking-widest">Ritual</span>
                      <span className="font-bold text-lumia-text">{service}</span>
                    </div>
                    <div className="flex justify-between items-center bg-black/[0.01] p-4 rounded-xl">
                      <span className="text-lumia-text/30 font-bold uppercase text-[9px] tracking-widest">Sanctuary</span>
                      <span className="font-bold text-lumia-text">{deliveryType === 'center' ? center?.name : 'Bespoke Location'}</span>
                    </div>
                    <div className="flex justify-between items-center bg-black/[0.01] p-4 rounded-xl">
                      <span className="text-lumia-text/30 font-bold uppercase text-[9px] tracking-widest">Schedule</span>
                      <span className="font-bold text-lumia-text">{date} • {time}</span>
                    </div>
                    <div className="pt-6 mt-4 border-t border-black/5 flex justify-between items-center">
                      <span className="text-lg font-serif italic text-lumia-text/40">Total ritual cost</span>
                      <span className="text-2xl font-serif italic text-lumia-emerald">{formatCurrency(7500)}</span>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-lumia-gold/5 blur-3xl -mr-10 -mt-10"></div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-lumia-charcoal/20 uppercase tracking-widest mb-2">Completion Method</h4>
                  <button className="w-full p-5 rounded-2xl bg-lumia-emerald shadow-lg shadow-lumia-emerald/10 flex items-center justify-between group transition-all hover:brightness-110">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-xl">
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-white uppercase text-[10px] tracking-widest">Complete with Card</span>
                    </div>
                    <Check className="w-5 h-5 text-white" />
                  </button>
                  <button 
                    onClick={async () => {
                      if ((window as any).ethereum) {
                        try {
                          await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
                        } catch (err) {
                          console.error("MetaMask connection failed", err);
                        }
                      } else {
                        alert("Please install MetaMask");
                      }
                    }}
                    className="w-full p-5 rounded-2xl bg-[#F6851B]/10 border border-[#F6851B]/20 flex items-center justify-between transition-all hover:bg-[#F6851B]/20"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/50 rounded-xl">
                        <Shield className="w-5 h-5 text-[#F6851B]" />
                      </div>
                      <span className="font-bold text-[#F6851B] uppercase text-[10px] tracking-widest">Pay with MetaMask</span>
                    </div>
                  </button>
                  <button className="w-full p-5 rounded-2xl bg-black/[0.01] border border-black/10 flex items-center justify-between transition-all hover:bg-black/[0.03]">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-black/5 rounded-xl">
                        <Landmark className="w-5 h-5 text-lumia-charcoal/40" />
                      </div>
                      <span className="font-bold text-lumia-charcoal/60 uppercase text-[10px] tracking-widest">Lumia Credits</span>
                    </div>
                  </button>
                </div>

                <div className="flex gap-4 items-center p-6 bg-lumia-gold/5 border border-lumia-gold/10 rounded-2xl">
                  <Shield className="w-8 h-8 text-lumia-gold shrink-0 opacity-40" />
                  <p className="text-[10px] text-lumia-charcoal/40 font-bold leading-relaxed tracking-wider uppercase">
                    Your payment is held securely in <span className="text-lumia-gold">Lumia Escrow</span> until the ritual is fully experienced.
                  </p>
                </div>

                <button 
                  onClick={nextStep}
                  className="w-full py-6 bg-lumia-text text-white rounded-3xl font-bold text-xs tracking-[0.3em] uppercase transition-all shadow-2xl shadow-black/10 hover:scale-[1.02]"
                >
                  Confirm Experience
                </button>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div 
                key="step6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-10 space-y-8"
              >
                <div className="w-48 h-48 relative">
                  {animationData ? (
                    <Lottie 
                      animationData={animationData} 
                      loop={false}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-20 h-20 bg-lumia-emerald/10 rounded-full flex items-center justify-center animate-pulse">
                        <Check className="w-10 h-10 text-lumia-emerald" />
                      </div>
                    </div>
                  )}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: 'spring' }}
                    className="absolute -top-4 -right-4 w-12 h-12 bg-lumia-gold rounded-full flex items-center justify-center text-white shadow-lg"
                  >
                    <Sparkles className="w-6 h-6" />
                  </motion.div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-4xl font-serif italic text-lumia-gold">Ritual Confirmed</h2>
                  <p className="text-lumia-text/60 font-medium tracking-wide max-w-xs mx-auto">
                    Your sanctuary awaits. Your specialist is preparing for your restorative journey.
                  </p>
                </div>

                <div className="bg-black/[0.02] border border-black/5 rounded-3xl p-8 w-full space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-lumia-text/40 font-bold uppercase tracking-widest">Transaction ID</span>
                    <span className="font-mono text-lumia-text/80">LM-8492-X9</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-lumia-text/40 font-bold uppercase tracking-widest">Escrow Status</span>
                    <span className="text-lumia-emerald font-bold uppercase tracking-widest">Secured</span>
                  </div>
                </div>

                <button 
                  onClick={onClose}
                  className="w-full py-6 bg-lumia-text text-white rounded-3xl font-bold text-xs tracking-[0.3em] uppercase transition-all shadow-xl hover:scale-[1.02]"
                >
                  Return to Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

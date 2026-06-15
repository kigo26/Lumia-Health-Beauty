import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeartPulse, Brain, Moon, Zap, ChevronRight, RefreshCw, X, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

type Metric = 'stress' | 'sleep' | 'energy' | 'tension';

interface AssessmentState {
  stress: number;
  sleep: number;
  energy: number;
  tension: number;
}

export const WellnessAssessment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [metrics, setMetrics] = useState<AssessmentState>({
    stress: 5,
    sleep: 5,
    energy: 5,
    tension: 5,
  });

  const updateMetric = (key: Metric, value: number) => {
    setMetrics(prev => ({ ...prev, [key]: value }));
  };

  const getRecommendation = () => {
    if (metrics.stress > 7) return { name: 'Lumia Stress Reset Experience™', reason: 'To rapidly regulate your nervous system.' };
    if (metrics.tension > 7) return { name: 'Lumia Ultimate Recovery Ritual™', reason: 'For deep muscular restoration.' };
    if (metrics.sleep < 4) return { name: 'Lumia Serenity Ritual™', reason: 'To prepare your body for deep restorative rest.' };
    if (metrics.energy < 4) return { name: 'Lumia Golden Harmony™', reason: 'To re-align your internal energy flow.' };
    return { name: 'Lumia Signature Wellness Journey™', reason: 'A comprehensive adaptive experience.' };
  };

  return (
    <div className="relative">
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="w-full bg-tranquil-teal/5 hover:bg-tranquil-teal/10 border border-tranquil-teal/10 rounded-[2rem] p-8 text-left group transition-all"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-full bg-tranquil-teal flex items-center justify-center text-white">
            <HeartPulse className="w-5 h-5" />
          </div>
          <Sparkles className="w-4 h-4 text-tranquil-teal opacity-20 group-hover:opacity-100 transition-opacity" />
        </div>
        <h3 className="text-xl font-serif text-tranquil-text mb-2">Wellness Assessment</h3>
        <p className="text-xs text-tranquil-text/70 font-light leading-relaxed">Personalize your Lumia ritual based on your current biological state.</p>
        <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-tranquil-teal">
          Start Check-in <ChevronRight className="w-3 h-3" />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-tranquil-teal/20 backdrop-blur-md z-[100]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 max-h-[90vh] md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[500px] bg-white rounded-[3rem] shadow-2xl z-[101] overflow-hidden flex flex-col"
            >
              <div className="p-8 md:p-12 overflow-y-auto">
                <div className="flex justify-between items-center mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-tranquil-teal/80">Biological Check-in</span>
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                    <X className="w-5 h-5 text-tranquil-text/60" />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <h2 className="text-3xl font-serif text-tranquil-text leading-tight">How are you feeling <br className="hidden md:block" /> at this moment?</h2>
                      
                      <div className="space-y-6">
                        <MetricSlider 
                          icon={<Brain className="w-4 h-4" />} 
                          label="Stress Level" 
                          value={metrics.stress} 
                          onChange={(v) => updateMetric('stress', v)} 
                        />
                        <MetricSlider 
                          icon={<Moon className="w-4 h-4" />} 
                          label="Sleep Quality" 
                          value={metrics.sleep} 
                          onChange={(v) => updateMetric('sleep', v)} 
                        />
                        <MetricSlider 
                          icon={<Zap className="w-4 h-4" />} 
                          label="Energy Level" 
                          value={metrics.energy} 
                          onChange={(v) => updateMetric('energy', v)} 
                        />
                        <MetricSlider 
                          icon={<HeartPulse className="w-4 h-4" />} 
                          label="Physical Tension" 
                          value={metrics.tension} 
                          onChange={(v) => updateMetric('tension', v)} 
                        />
                      </div>

                      <button 
                        onClick={() => setStep(2)}
                        className="w-full py-5 bg-tranquil-teal text-white rounded-2xl font-bold text-[10px] tracking-[0.4em] uppercase transition-all shadow-xl hover:brightness-110 active:scale-95"
                      >
                        Generate Protocol
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-tranquil-teal/10 flex items-center justify-center mx-auto mb-8">
                        <RefreshCw className="w-8 h-8 text-tranquil-teal animate-spin-slow" />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-tranquil-teal/70 mb-2">Recommended Ritual</p>
                      <h2 className="text-3xl md:text-4xl font-serif text-tranquil-text mb-6 italic">{getRecommendation().name}</h2>
                      <p className="text-sm text-tranquil-text/80 font-light leading-relaxed mb-12 italic">
                        "{getRecommendation().reason}"
                      </p>

                      <div className="space-y-4">
                        <button className="w-full py-5 bg-tranquil-teal text-white rounded-2xl font-bold text-[10px] tracking-[0.4em] uppercase transition-all shadow-xl hover:brightness-110 active:scale-95">
                          Book Now
                        </button>
                        <button 
                          onClick={() => setStep(1)}
                          className="w-full py-5 border border-black/5 text-tranquil-teal/40 rounded-2xl font-bold text-[10px] tracking-[0.4em] uppercase transition-all hover:bg-black/5"
                        >
                          Retake Assessment
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const MetricSlider = ({ icon, label, value, onChange }: { icon: React.ReactNode, label: string, value: number, onChange: (v: number) => void }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-tranquil-teal/70">
      <div className="flex items-center gap-2">
        {icon}
        {label}
      </div>
      <span>{value}/10</span>
    </div>
    <input 
      type="range" 
      min="1" 
      max="10" 
      value={value} 
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-1 bg-black/5 rounded-lg appearance-none cursor-pointer accent-tranquil-teal"
    />
  </div>
);

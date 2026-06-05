import React from 'react';
import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';
import { Ritual } from '../types';

interface Props {
  rituals: Ritual[];
  onClose: () => void;
}

export const RitualCompareModal = ({ rituals, onClose }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-serene-dark/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-serene-white rounded-[2rem] w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
      >
        <header className="px-10 py-8 border-b border-black/5 flex justify-between items-center">
          <h2 className="text-2xl font-serif text-serene-dark italic">Ritual Comparison</h2>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <X className="w-6 h-6 text-serene-dark" />
          </button>
        </header>
        <div className="p-10 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rituals.map((ritual) => (
              <div key={ritual.id} className="space-y-6">
                <h3 className="font-serif text-lg text-serene-dark">{ritual.name}</h3>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-xl border border-black/5">
                    <p className="text-[10px] font-bold text-serene-dark/40 uppercase tracking-widest">Duration</p>
                    <p className="font-mono text-serene-dark">{ritual.duration}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-black/5">
                    <p className="text-[10px] font-bold text-serene-dark/40 uppercase tracking-widest">Pricing</p>
                    <p className="font-mono text-serene-dark">${ritual.price}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {ritual.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-serene-dark/70">
                      <Check className="w-4 h-4 text-serene-accent" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

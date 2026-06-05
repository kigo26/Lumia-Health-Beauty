import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Clock, Sparkles, Award, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface Milestone {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'upcoming';
  description: string;
}

interface RitualProgressItem {
  ritualName: string;
  progress: number; // 0 to 100
  milestones: Milestone[];
  status: 'Active' | 'Paused' | 'Ready';
}

const MOCK_PROGRESS: RitualProgressItem[] = [
  {
    ritualName: 'Lumia Serenity Ritual™',
    progress: 65,
    status: 'Active',
    milestones: [
      { id: '1', name: 'Neural Calming', status: 'completed', description: 'Initial stage of nervous system regulation.' },
      { id: '2', name: 'Somatic Release', status: 'completed', description: 'Deep muscle tension dissipation.' },
      { id: '3', name: 'Cognitive Reset', status: 'current', description: 'Alpha wave synchronization phase.' },
      { id: '4', name: 'Transcendence', status: 'upcoming', description: 'Final state of peak mental clarity.' },
    ]
  },
  {
    ritualName: 'Lumia Emerald Escape™',
    progress: 25,
    status: 'Active',
    milestones: [
      { id: '1', name: 'Nature Phase', status: 'completed', description: 'Environmental harmonization.' },
      { id: '2', name: 'Dermal Detox', status: 'current', description: 'Deep botanical infusion.' },
      { id: '3', name: 'Cellular Vitality', status: 'upcoming', description: 'Optimization of nutrient absorption.' },
    ]
  }
];

export const RitualProgress = () => {
  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl md:text-3xl font-serif text-tranquil-text">Signature Journey Progress</h2>
        <p className="text-xs text-gray-400 font-light tracking-wide uppercase">Your Restorative Evolution Track</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {MOCK_PROGRESS.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <div className="bg-white border border-black/5 rounded-[2.5rem] p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl md:text-2xl font-serif text-tranquil-text">{item.ritualName}</h3>
                    <div className={cn(
                      "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest",
                      item.status === 'Active' ? "bg-tranquil-teal/10 text-tranquil-teal" : "bg-gray-100 text-gray-400"
                    )}>
                      {item.status}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 font-light italic">Participating in since June 2026</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-tranquil-teal/40">Overall Progress</p>
                    <p className="text-2xl font-serif text-tranquil-teal">{item.progress}%</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-tranquil-teal/20 flex items-center justify-center">
                    <Zap className={cn("w-5 h-5", item.progress > 50 ? "text-tranquil-teal" : "text-tranquil-teal/30")} />
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-2 bg-black/5 rounded-full mb-12 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full bg-tranquil-teal rounded-full shadow-[0_0_10px_rgba(26,60,52,0.3)]"
                />
              </div>

              {/* Milestones */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4 text-tranquil-teal/60" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-tranquil-text">Active Milestones</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {item.milestones.map((milestone) => (
                    <div 
                      key={milestone.id}
                      className={cn(
                        "p-4 rounded-2xl border transition-all duration-300",
                        milestone.status === 'completed' ? "bg-tranquil-teal/5 border-tranquil-teal/10" : 
                        milestone.status === 'current' ? "bg-white border-tranquil-teal shadow-md" : 
                        "bg-gray-50 border-transparent opacity-60"
                      )}
                    >
                      <div className="flex justify-between items-start mb-3">
                        {milestone.status === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4 text-tranquil-teal" />
                        ) : milestone.status === 'current' ? (
                          <div className="w-4 h-4 rounded-full border-2 border-tranquil-teal border-t-transparent animate-spin" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-300" />
                        )}
                        {milestone.status === 'current' && (
                          <span className="bg-tranquil-teal text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">In Progress</span>
                        )}
                      </div>
                      <h4 className={cn(
                        "text-[11px] font-bold uppercase tracking-wider mb-1",
                        milestone.status === 'upcoming' ? "text-gray-400" : "text-tranquil-text"
                      )}>
                        {milestone.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-light leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-black/5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-300" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Next Session: Tomorrow, 10:00 AM</span>
                </div>
                <button className={cn(
                   "group flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest transition-all",
                   item.status === 'Active' ? "text-tranquil-teal hover:gap-5" : "text-gray-300"
                )}>
                  Continue Ritual <Sparkles className="w-3 h-3 group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

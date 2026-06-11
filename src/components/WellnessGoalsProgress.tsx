import React from 'react';
import { motion } from 'motion/react';
import { Target, Trophy, Award } from 'lucide-react';
import { cn } from '../lib/utils';

interface Goal {
  id: string;
  name: string;
  progress: number;
  target: number;
  unit: string;
  icon: React.ElementType;
}

const MOCK_GOALS: Goal[] = [
  { id: '1', name: 'Monthly Rituals', progress: 8, target: 12, unit: 'rituals', icon: Trophy },
  { id: '2', name: 'Hydration Target', progress: 2400, target: 3000, unit: 'ml/day', icon: Target },
  { id: '3', name: 'Meditation Milestone', progress: 15, target: 20, unit: 'hours', icon: Award },
];

export const WellnessGoalsProgress = () => {
  return (
    <section className="p-10 rounded-[2.5rem] bg-white border border-black/5 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-tranquil-teal/70">Wellness Milestones</h3>
        <span className="text-[9px] font-bold uppercase tracking-widest text-tranquil-teal bg-tranquil-teal/5 px-3 py-1 rounded-full">June 2026</span>
      </div>
      
      <div className="space-y-6">
        {MOCK_GOALS.map((goal, i) => {
          const percentage = (goal.progress / goal.target) * 100;
          return (
            <div key={goal.id} className="group">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-tranquil-cream flex items-center justify-center text-tranquil-teal">
                    <goal.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-tranquil-text">{goal.name}</h4>
                    <p className="text-[9px] text-gray-400 font-light">{goal.progress} / {goal.target} {goal.unit}</p>
                  </div>
                </div>
                <span className="text-sm font-serif text-tranquil-teal">{Math.round(percentage)}%</span>
              </div>
              <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="h-full bg-tranquil-teal rounded-full"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

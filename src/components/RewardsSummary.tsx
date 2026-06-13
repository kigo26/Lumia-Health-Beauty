import React from 'react';
import { motion } from 'motion/react';
import { Gift, Star, Crown } from 'lucide-react';
import { cn } from '../lib/utils';

interface RewardsSummaryProps {
  points: number;
  tier: string;
}

export const RewardsSummary = ({ points = 1250, tier = 'Gold' }: RewardsSummaryProps) => {
  return (
    <section className="relative p-10 rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 shadow-2xl">
      {/* Gold Theme Effects */}
      <div className="absolute inset-0 bg-black/5" />
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl opacity-50" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/90 flex items-center gap-2">
                <Crown className="w-4 h-4 text-white" />
                Loyalty Rewards
            </h4>
            <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                {tier} Tier
            </span>
        </div>
        
        <div className="mb-8">
            <p className="text-white/70 text-[10px] uppercase font-bold tracking-widest mb-1">Current Points</p>
            <p className="text-5xl font-serif text-white">{points.toLocaleString()}</p>
        </div>

        <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
                <Gift className="w-5 h-5 text-white" />
                <span className="text-xs font-bold text-white">Free Ritual Upgrade</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
                <Star className="w-5 h-5 text-white" />
                <span className="text-xs font-bold text-white">Priority Sanctuary Access</span>
            </div>
        </div>
      </div>
    </section>
  );
};

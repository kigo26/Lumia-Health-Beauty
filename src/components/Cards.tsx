import React from 'react';
import { Star, MapPin, ShieldCheck, CheckCircle, Award } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface CardProps {
  name: string;
  image?: string;
  rating: number;
  subtitle?: string;
  badge?: string;
  address?: string;
  onClick?: () => void;
  certificationLevel?: 'gold' | 'silver' | 'standard' | 'none';
}

export const ServiceCard = ({ icon: Icon, name, subtypes, isActive, onClick }: any) => (
  <motion.button 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={cn(
      "flex flex-col items-center gap-3 p-6 rounded-2xl min-w-[120px] transition-all duration-300 border",
      isActive 
        ? "bg-lumia-emerald shadow-[0_0_20px_rgba(6,95,70,0.1)] text-white border-lumia-emerald" 
        : "bg-black/5 text-lumia-text/60 hover:text-lumia-text hover:bg-black/10 border-black/5"
    )}
  >
    <Icon className="w-8 h-8" />
    <span className="font-bold text-xs uppercase tracking-widest">{name}</span>
  </motion.button>
);

export const ProviderCard = ({ name, image, rating, subtitle, badge, onClick }: CardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className="premium-card p-4 flex gap-4 items-center cursor-pointer group"
    onClick={onClick}
  >
    <div className="relative">
      <img src={image} alt={name} className="w-20 h-20 rounded-xl object-cover shadow-xl" />
      <div className="absolute -bottom-1 -right-1 bg-lumia-emerald text-white p-1 rounded-full border-2 border-white">
        <CheckCircle className="w-3 h-3" />
      </div>
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lumia-text group-hover:text-lumia-gold transition-colors">{name}</h3>
        <div className="flex items-center gap-1 text-xs font-bold text-lumia-gold">
          <Star className="w-3 h-3 fill-current" />
          {rating}
        </div>
      </div>
      <p className="text-xs text-lumia-text/50 mt-1 line-clamp-1">{subtitle}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-[10px] bg-lumia-emerald/5 text-lumia-emerald px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-lumia-emerald/10">
          {badge}
        </span>
      </div>
    </div>
  </motion.div>
);

export const ProviderSkeleton = () => (
  <div className="premium-card p-4 flex gap-4 items-center animate-pulse opacity-60">
    <div className="w-20 h-20 rounded-xl bg-black/5" />
    <div className="flex-1 space-y-3">
      <div className="flex items-center justify-between">
        <div className="h-4 w-32 bg-black/5 rounded-md" />
        <div className="h-4 w-8 bg-black/5 rounded-md" />
      </div>
      <div className="h-3 w-48 bg-black/5 rounded-md" />
      <div className="h-5 w-20 bg-lumia-emerald/5 rounded-full" />
    </div>
  </div>
);

export const CenterCard = ({ name, image, rating, address, certificationLevel, onClick }: CardProps) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.02 }}
    className="premium-card overflow-hidden group cursor-pointer border-black/5"
    onClick={onClick}
  >
    <div className="relative h-48 overflow-hidden">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" 
      />
      <div className="absolute top-4 right-4">
        {certificationLevel === 'gold' && (
          <div className="bg-[#D4AF37] text-white px-3 py-1 rounded-full flex items-center gap-1 text-[10px] font-bold shadow-xl border border-white/20">
            <Award className="w-3 h-3" /> LUMIA GOLD
          </div>
        )}
        {certificationLevel === 'silver' && (
          <div className="bg-[#C8CDD3] text-lumia-text px-3 py-1 rounded-full flex items-center gap-1 text-[10px] font-bold shadow-xl border border-black/10">
            <Award className="w-3 h-3" /> LUMIA SILVER
          </div>
        )}
        {certificationLevel === 'standard' && (
          <div className="bg-[#B68D5B] text-white px-3 py-1 rounded-full flex items-center gap-1 text-[10px] font-bold shadow-xl">
            <Award className="w-3 h-3" /> LUMIA STANDARD
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-60"></div>
    </div>
    <div className="p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-serif italic text-xl text-lumia-text group-hover:text-lumia-gold transition-colors">{name}</h3>
        <div className="flex items-center gap-1 font-bold text-lumia-gold text-sm">
          <Star className="w-3 h-3 fill-current" />
          {rating}
        </div>
      </div>
      <div className="flex items-center gap-1 text-sm text-lumia-text/40 mb-6 font-medium">
        <MapPin className="w-4 h-4 text-lumia-emerald" />
        {address}
      </div>
      <button className="w-full py-4 bg-lumia-gold text-white rounded-xl font-bold text-xs tracking-[0.2em] uppercase transition-all shadow-sm hover:shadow-xl hover:scale-[1.02]">
        Book Ritual
      </button>
    </div>
  </motion.div>
);

export const CenterSkeleton = () => (
  <div className="premium-card overflow-hidden animate-pulse opacity-60 border-black/5">
    <div className="h-48 bg-black/5" />
    <div className="p-5 space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-6 w-40 bg-black/5 rounded-md" />
        <div className="h-4 w-10 bg-black/5 rounded-md" />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-black/5" />
        <div className="h-4 w-32 bg-black/5 rounded-md" />
      </div>
      <div className="h-12 w-full bg-lumia-gold/10 rounded-xl" />
    </div>
  </div>
);

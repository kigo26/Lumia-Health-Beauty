import React from 'react';
import { Ritual } from '../types';
import { Star, MapPin, ShieldCheck, CheckCircle, Award } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface CardProps {
  name: string;
  image?: string;
  rating: number;
  reviewCount?: number;
  subtitle?: string;
  badge?: string;
  address?: string;
  distance?: number;
  onClick?: () => void;
  certificationLevel?: 'gold' | 'silver' | 'standard' | 'none';
  status?: 'available' | 'busy' | 'on_leave';
}

const RatingSummary = ({ rating, reviewCount, compact = false }: { rating: number, reviewCount?: number, compact?: boolean }) => {
  const fullStars = Math.floor(rating);
  
  return (
    <div className={cn("flex flex-col", compact ? "items-end" : "items-start")}>
      <div className="flex items-center gap-0.5 mb-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={cn(
              "w-3 h-3", 
              i < fullStars ? "fill-serene-sage text-serene-sage" : "text-black/10"
            )} 
          />
        ))}
        <span className={cn("ml-2 text-[10px] font-bold text-serene-dark", compact && "hidden md:inline")}>{rating.toFixed(1)}</span>
      </div>
      {reviewCount !== undefined && (
        <span className="text-[9px] text-serene-dark/40 font-bold uppercase tracking-tighter">
          {reviewCount} reviews
        </span>
      )}
    </div>
  );
};

export const ServiceCard = ({ icon: Icon, name, subtypes, isActive, onClick, index }: any) => (
  <motion.button 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ 
      duration: 0.5, 
      delay: index * 0.05,
      ease: [0.21, 0, 0.07, 1]
    }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={cn(
      "flex flex-col items-center gap-3 p-6 rounded-[2rem] min-w-[120px] transition-all duration-500 border",
      isActive 
        ? "bg-serene-dark shadow-2xl text-serene-accent border-serene-dark" 
        : "bg-white text-serene-dark/80 hover:text-serene-dark hover:bg-serene-sage/10 border-black/5"
    )}
  >
    <Icon className="w-8 h-8" />
    <span className="font-bold text-[10px] uppercase tracking-[0.3em]">{name}</span>
  </motion.button>
);

export const ProviderCard = ({ name, image, rating, reviewCount, subtitle, badge, distance, status, onClick }: CardProps) => {
  const statusConfig = status === 'available' 
    ? { label: 'Available Now', color: 'bg-green-50 text-green-700 border-green-200' }
    : status === 'busy' 
    ? { label: 'Busy', color: 'bg-orange-50 text-orange-700 border-orange-200' }
    : { label: 'On Leave', color: 'bg-gray-50 text-gray-500 border-gray-200' };

  return (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ 
      duration: 0.8,
      ease: [0.21, 0, 0.07, 1]
    }}
    whileHover={{ y: -5, x: 5 }}
    className="bg-white rounded-[2rem] p-6 flex gap-6 items-center cursor-pointer group border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500"
    onClick={onClick}
  >
    <div className="relative">
      <img src={image} alt={name} className="w-24 h-24 rounded-2xl object-cover shadow-2xl grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
      <div className="absolute -bottom-2 -right-2 bg-serene-dark text-serene-accent p-1.5 rounded-xl border-2 border-white">
        <CheckCircle className="w-3 h-3" />
      </div>
    </div>
    <div className="flex-1">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-serif italic text-2xl text-serene-dark group-hover:text-serene-sage transition-colors mb-1">{name}</h3>
          <p className="text-[10px] text-serene-dark/70 font-bold uppercase tracking-widest">{subtitle}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <RatingSummary rating={rating} reviewCount={reviewCount} compact />
          {distance !== undefined && (
            <span className="text-[9px] text-serene-dark/60 font-bold uppercase tracking-tighter">{distance.toFixed(1)}km</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <span className="text-[9px] bg-serene-sage/20 text-serene-dark px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-serene-sage/30">
          {badge}
        </span>
        {status && (
          <span className={cn("text-[9px] px-3 py-1 rounded-full font-bold uppercase tracking-widest border flex items-center gap-1.5", statusConfig.color)}>
            <div className={cn("w-1.5 h-1.5 rounded-full",
                status === 'available' ? "bg-green-500" :
                status === 'busy' ? "bg-orange-500" : "bg-gray-500"
            )} />
            {statusConfig.label}
          </span>
        )}
      </div>
    </div>
  </motion.div>
)};

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

export const CenterCard = ({ name, image, rating, reviewCount, address, certificationLevel, distance, onClick }: CardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ 
      duration: 0.8,
      ease: [0.21, 0, 0.07, 1]
    }}
    whileHover={{ scale: 1.01 }}
    className="bg-white rounded-[2.5rem] overflow-hidden group cursor-pointer border border-black/5 shadow-sm hover:shadow-2xl transition-all duration-700"
    onClick={onClick}
  >
    <div className="relative h-48 md:h-64 overflow-hidden">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0" 
      />
      <div className="absolute top-4 md:top-6 right-4 md:right-6 flex flex-col items-end gap-2">
        {certificationLevel === 'gold' && (
          <div className="bg-serene-accent text-serene-dark px-3 md:px-4 py-1 md:py-1.5 rounded-full flex items-center gap-1 md:gap-2 text-[8px] md:text-[10px] font-bold shadow-2xl border border-white/20 uppercase tracking-widest">
            <Award className="w-3 h-3" /> Serene Gold
          </div>
        )}
        {certificationLevel === 'silver' && (
          <div className="bg-white/90 backdrop-blur-md text-serene-dark px-3 md:px-4 py-1 md:py-1.5 rounded-full flex items-center gap-1 md:gap-2 text-[8px] md:text-[10px] font-bold shadow-2xl border border-black/10 uppercase tracking-widest">
            <Award className="w-3 h-3" /> Serene Silver
          </div>
        )}
        {distance !== undefined && (
          <div className="bg-serene-dark text-serene-accent px-2 md:px-3 py-0.5 md:py-1 rounded-lg text-[8px] md:text-[9px] font-bold border border-white/10 tracking-widest">
            {distance.toFixed(1)}KM
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-serene-dark/20 to-transparent"></div>
    </div>
    <div className="p-6 md:p-8">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-serif italic text-2xl md:text-3xl text-serene-dark group-hover:text-serene-sage transition-colors">{name}</h3>
        <RatingSummary rating={rating} reviewCount={reviewCount} />
      </div>
      <div className="flex items-center gap-2 text-[10px] text-serene-dark/70 mb-8 font-bold uppercase tracking-widest">
        <MapPin className="w-3 h-3" />
        {address}
      </div>
      <button className="w-full py-5 bg-serene-dark text-white rounded-2xl font-bold text-[10px] tracking-[0.4em] uppercase transition-all shadow-xl hover:bg-serene-sage hover:scale-[1.02]">
        Book Ritual
      </button>
    </div>
  </motion.div>
);

export const RitualCard = ({ ritual, image, isSelected, onSelect }: { ritual: Ritual, image?: string, isSelected: boolean, onSelect: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: [0.21, 0, 0.07, 1] }}
    whileHover={{ scale: 1.02 }}
    onClick={onSelect}
    className={cn(
      "overflow-hidden rounded-[2.5rem] border border-black/5 cursor-pointer transition-all duration-500",
      isSelected ? "border-serene-accent shadow-lg bg-serene-sage/5" : "bg-white hover:shadow-2xl hover:-translate-y-1 hover:border-black/10"
    )}
  >
    {image && <img src={image} alt={ritual.name} className="w-full h-48 object-cover" />}
    <div className="p-8">
      <h3 className="font-serif text-2xl text-serene-dark mb-4">{ritual.name}</h3>
      <div className="flex gap-4 mb-6">
        <span className="text-[10px] font-bold uppercase text-serene-dark/40 tracking-widest">{ritual.duration}</span>
        <span className="text-[10px] font-bold uppercase text-serene-accent tracking-widest">${ritual.price}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {ritual.benefits.slice(0, 2).map((benefit, i) => (
          <span key={i} className="text-[10px] bg-black/5 text-serene-dark/70 px-4 py-1.5 rounded-full uppercase tracking-wider">{benefit}</span>
        ))}
      </div>
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

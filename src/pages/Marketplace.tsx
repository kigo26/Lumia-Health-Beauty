import React, { useState, useEffect } from 'react';
import { SERVICES, MOCK_PROVIDERS, MOCK_CENTERS } from '../data';
import { ServiceCard, ProviderCard, CenterCard, ProviderSkeleton, CenterSkeleton } from '../components/Cards';
import { BookingFlow } from '../components/BookingFlow';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Filter, Map, Sparkles, Search, Shield } from 'lucide-react';
import { cn } from '../lib/utils';

import { useSearch } from '../context/SearchContext';
import Fuse from 'fuse.js';

export const Marketplace = () => {
  const [activeCategory, setActiveCategory] = useState('massage');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { searchQuery, setSearchQuery } = useSearch();

  const [filteredProviders, setFilteredProviders] = useState(MOCK_PROVIDERS);
  const [filteredCenters, setFilteredCenters] = useState(MOCK_CENTERS);

  useEffect(() => {
    // Simulate initial data fetch
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredProviders(MOCK_PROVIDERS);
      setFilteredCenters(MOCK_CENTERS);
      return;
    }

    const providerFuse = new Fuse(MOCK_PROVIDERS, {
      keys: ['displayName', 'specialties'],
      threshold: 0.4,
    });

    const centerFuse = new Fuse(MOCK_CENTERS, {
      keys: ['name', 'address'],
      threshold: 0.4,
    });

    setFilteredProviders(providerFuse.search(searchQuery).map(res => res.item));
    setFilteredCenters(centerFuse.search(searchQuery).map(res => res.item));
  }, [searchQuery]);

  return (
    <div className="pb-32 pt-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header Info (Visible on Desktop) */}
      <header className="flex justify-between items-center mb-8 md:mb-12">
        <div className="max-w-[70%] md:max-w-none">
          <h1 className="text-2xl md:text-4xl font-serif italic text-lumia-gold leading-tight">LUMIA Rituals</h1>
          <p className="text-lumia-text/60 text-[10px] md:text-sm mt-1 md:mt-2 font-medium tracking-wide">Welcome back, Elara. Your path to wellness awaits.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white border border-black/5 rounded-2xl md:rounded-3xl p-3 md:p-5 flex flex-col justify-between min-w-[140px] md:min-w-[240px] shadow-sm">
            <div className="flex justify-between items-start mb-1 md:mb-2 text-lumia-gold">
              <Shield className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-lumia-emerald">
                <span className="w-1.5 h-1.5 bg-lumia-emerald rounded-full animate-pulse"></span> Identity Verified
              </span>
            </div>
            <p className="text-[8px] md:text-[10px] text-lumia-text/30 uppercase tracking-widest font-bold">Certification Status</p>
            <p className="text-[10px] md:text-sm font-bold text-lumia-text/90">Lumia Elite</p>
          </div>
        </div>
      </header>

      {/* AI Search Section */}
      <section className="mb-12">
        <div className="luxury-gradient border border-black/5 rounded-[32px] p-6 md:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 text-lumia-text tracking-tight">How are you feeling today?</h2>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative group">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="'I need a deep tissue massage for back pain'..." 
                  className="w-full bg-white border border-black/10 rounded-2xl px-6 py-5 text-sm md:text-base text-lumia-text focus:outline-none focus:border-lumia-gold/50 transition-all placeholder:text-lumia-text/30 shadow-sm pr-14"
                />
                <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-lumia-text/20 group-focus-within:text-lumia-gold transition-colors" />
              </div>
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="w-full md:w-auto bg-lumia-gold text-white px-10 py-5 rounded-2xl font-bold hover:bg-lumia-gold-hover hover:scale-105 transition-all shadow-[0_12px_40px_rgba(212,175,55,0.25)] uppercase text-xs tracking-[0.2em] md:tracking-widest"
              >
                AI Assistant
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-6 overflow-x-auto hide-scrollbar pb-2">
              {['Deep Tissue', 'Aromatherapy', 'Physiotherapy', 'Facials'].map(tag => (
                <span key={tag} className="text-[10px] px-3 py-1 rounded-full bg-white/50 border border-black/5 text-lumia-text/50 font-bold uppercase tracking-widest hover:text-lumia-emerald hover:bg-white cursor-pointer transition-all">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-lumia-emerald opacity-5 blur-[100px] rounded-full animate-pulse"></div>
        </div>
      </section>

      <div className="flex lg:grid lg:grid-cols-4 flex-col-reverse gap-12">
        {/* Sidebar categories / Rituals - Moved to top on mobile */}
        <div className="space-y-8 contents lg:block">
          <section className="lg:order-none order-first overflow-x-auto hide-scrollbar -mx-4 px-4 pb-4 lg:mx-0 lg:px-0 lg:pb-0">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-lumia-text/30 mb-4 hidden lg:block">Service Rituals</h3>
            <div className="flex lg:flex-col gap-3 min-w-max lg:min-w-0">
              {SERVICES.map((cat) => (
                <div 
                  key={cat.id} 
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "p-4 lg:p-5 rounded-2xl border flex items-center justify-between group cursor-pointer transition-all",
                    activeCategory === cat.id 
                      ? "bg-lumia-emerald text-white border-lumia-emerald shadow-lg" 
                      : "bg-white border-black/5 text-lumia-text/60 hover:bg-black/5 hover:border-black/10"
                  )}
                >
                  <span className="text-xs lg:text-sm font-bold tracking-tight whitespace-nowrap">{cat.name}</span>
                  <span className="hidden lg:block text-[10px] font-bold text-lumia-text/20 group-hover:text-white uppercase tracking-widest transition-colors">{cat.subtypes.length} Types</span>
                </div>
              ))}
            </div>
          </section>

          {/* Membership / Stats (Desktop Sidebar) */}
          <section className="hidden lg:block bg-white rounded-3xl p-6 border border-black/5 shadow-sm">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-lumia-gold mb-4">Lumia Elite</h4>
            <p className="text-xs text-lumia-text/60 mb-6 leading-relaxed">
              Your membership is currently <span className="text-lumia-emerald">Active</span>. Enjoy priority scheduling and exclusive concierge support.
            </p>
            <div className="flex items-center gap-4 text-[10px] font-bold text-lumia-text/30 uppercase tracking-widest">
              <div className="flex flex-col gap-1">
                <span className="text-lumia-gold">1,240</span> Providers
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-lumia-gold">48</span> Centers
              </div>
            </div>
          </section>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-12">
          {/* Featured Professionals */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-lumia-text/40">Featured Specialists</h3>
              <button className="text-[10px] md:text-xs text-lumia-emerald font-bold tracking-widest uppercase hover:underline">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => <ProviderSkeleton key={i} />)
              ) : filteredProviders.length > 0 ? (
                filteredProviders.map((provider) => (
                  <ProviderCard 
                    key={provider.uid}
                    name={provider.displayName}
                    image={provider.photoURL}
                    rating={provider.rating}
                    subtitle={provider.specialties.join(' • ')}
                    badge={provider.certificationLevel}
                    onClick={() => setIsBookingOpen(true)}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mb-4 text-lumia-text/20">
                    <Search className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-serif italic text-lumia-gold">No Specialists Found</h4>
                  <p className="text-sm text-lumia-text/40 mt-2">Try adjusting your search terms or filters.</p>
                </div>
              )}
            </div>
          </section>

          {/* Luxury Centers */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-lumia-text/40">Sanctuaries of Peace</h3>
              <button className="text-[10px] md:text-xs text-lumia-emerald font-bold tracking-widest uppercase hover:underline">
                Explore All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {isLoading ? (
                Array.from({ length: 2 }).map((_, i) => <CenterSkeleton key={i} />)
              ) : filteredCenters.length > 0 ? (
                filteredCenters.map((center) => (
                  <CenterCard 
                    key={center.id}
                    name={center.name}
                    image={center.images[0]}
                    rating={center.rating}
                    address={center.address}
                    certificationLevel={center.certificationLevel as any}
                    onClick={() => setIsBookingOpen(true)}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mb-4 text-lumia-text/20">
                    <Map className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-serif italic text-lumia-gold">No Sanctuaries Found</h4>
                  <p className="text-sm text-lumia-text/40 mt-2">No locations matched your specific search criteria.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      <AnimatePresence>
        {isBookingOpen && (
          <BookingFlow onClose={() => setIsBookingOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { SERVICES, MOCK_PROVIDERS, MOCK_CENTERS, LUMIA_RITUALS } from '../data';
import { FilterSidebar } from '../components/FilterSidebar';
import { ServiceCard, ProviderCard, CenterCard, ProviderSkeleton, CenterSkeleton, RitualCard } from '../components/Cards';
import { LazyLoadWrapper } from '../components/LazyLoadWrapper';
import { RitualCompareModal } from '../components/RitualCompareModal';
import { Ritual } from '../types';
import { BookingFlow } from '../components/BookingFlow';
import { ProviderProfile } from '../components/ProviderProfile';
import { WellnessAssessment } from '../components/WellnessAssessment';
import { SanctuaryMap } from '../components/SanctuaryMap';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Search, Shield, LayoutGrid, Map as MapIcon } from 'lucide-react';
import { cn } from '../lib/utils';

import { useSearch } from '../context/SearchContext';
import Fuse from 'fuse.js';
import { calculateDistance } from '../lib/utils';

export const Marketplace = () => {
  const [activeCategory, setActiveCategory] = useState('signature');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { searchQuery, setSearchQuery } = useSearch();

  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedRituals, setSelectedRituals] = useState<Ritual[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [sortByDistance, setSortByDistance] = useState(false);

  const [filteredProviders, setFilteredProviders] = useState<any[]>(MOCK_PROVIDERS);
  const [filteredCenters, setFilteredCenters] = useState<any[]>(MOCK_CENTERS);
  
  const ritualImages: {[key: string]: string} = {
    'r1': "https://images.unsplash.com/photo-1544161515-4ae6ce6db87e?auto=format&fit=crop&q=80&w=800",
    'r2': "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800",
    'r3': "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800",
    'r4': "https://images.unsplash.com/photo-1519415510236-85155f82b9c3?auto=format&fit=crop&q=80&w=800",
    'r5': "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800",
    'r6': "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    'r7': "https://images.unsplash.com/photo-1594434057390-1c944eb98471?auto=format&fit=crop&q=80&w=800",
    'r8': "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800"
  };

  const handleProviderClick = (provider: any) => {
    setSelectedProvider(provider);
    setIsProfileOpen(true);
  };

  const handleBookFromProfile = () => {
    setIsProfileOpen(false);
    setIsBookingOpen(true);
  };

  useEffect(() => {
    // Get user location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setSortByDistance(true); // Default to sort by distance if location is available
        },
        (error) => {
          console.warn("Geolocation error:", error);
        }
      );
    }

    // Simulate initial data fetch
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let providers = [...MOCK_PROVIDERS];
    let centers = [...MOCK_CENTERS];

    if (searchQuery) {
      const providerFuse = new Fuse(providers, {
        keys: ['displayName', 'specialties'],
        threshold: 0.4,
      });

      const centerFuse = new Fuse(centers, {
        keys: ['name', 'address'],
        threshold: 0.4,
      });

      providers = providerFuse.search(searchQuery).map(res => res.item);
      centers = centerFuse.search(searchQuery).map(res => res.item);
    } else {
      // Filter by category if no search query
      providers = providers.filter(p => {
        if (activeCategory === 'signature') return p.specialties.some(s => s.startsWith('Lumia'));
        if (activeCategory === 'massage') return p.specialties.some(s => ['Swedish', 'Deep Tissue', 'Sports', 'Aromatherapy', 'Hot Stone', 'Prenatal', 'Reflexology'].some(sub => s.includes(sub)));
        if (activeCategory === 'beauty') return p.specialties.some(s => ['Facial', 'Hair', 'Makeup', 'Nail'].some(sub => s.includes(sub)));
        if (activeCategory === 'wellness') return p.specialties.some(s => ['Physio', 'Yoga', 'Meditation', 'Nutrition'].some(sub => s.includes(sub)));
        return true;
      });
    }

    // Calculate distances and sort if needed
    if (userLocation && sortByDistance) {
      providers = (providers as any[]).map(p => ({
        ...p,
        distance: calculateDistance(userLocation.lat, userLocation.lng, p.location!!.lat, p.location!!.lng)
      })).sort((a, b) => (a.distance || 0) - (b.distance || 0));

      centers = (centers as any[]).map(c => ({
        ...c,
        distance: calculateDistance(userLocation.lat, userLocation.lng, c.location!!.lat, c.location!!.lng)
      })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    setFilteredProviders(providers as any);
    setFilteredCenters(centers as any);
  }, [searchQuery, userLocation, sortByDistance, activeCategory]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen font-sans antialiased pb-32 pt-24 md:pt-32 px-4 md:px-8 max-w-[1600px] mx-auto"                
      style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('https://images.unsplash.com/photo-1544161515-4ae6ce6db87e?auto=format&fit=crop&q=80&w=2000')`, backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Header Info */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 md:mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0, 0.07, 1] }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-8xl font-serif tracking-tight text-serene-dark leading-[0.9] md:leading-[0.85]">
            Rituals Of <br />
            <span className="italic text-serene-accent">Tranquility</span>
          </h1>
          <p className="text-serene-dark/70 text-[9px] md:text-sm mt-4 md:mt-8 font-bold uppercase tracking-[0.3em] md:tracking-[0.4em]">Curated Specialists • Global Sanctuaries</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0, 0.07, 1] }}
          className="hidden md:flex items-center gap-4"
        >
          <div className="bg-white border border-black/5 rounded-[2rem] p-8 flex flex-col justify-between min-w-[300px] shadow-sm">
            <div className="flex justify-between items-start mb-4 text-serene-sage">
              <Shield className="w-5 h-5 text-serene-dark" />
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-serene-dark">
                <span className="w-2 h-2 bg-serene-accent rounded-full animate-pulse"></span> Identity Verified
              </span>
            </div>
            <p className="text-[10px] text-serene-dark/60 uppercase tracking-widest font-bold mb-1">Membership Status</p>
            <p className="text-xl font-serif italic text-serene-dark">Serene Elite Circle</p>
          </div>
        </motion.div>
      </header>

      {/* AI Search Section */}
      <section className="mb-16 md:mb-24">
        <div className="bg-serene-dark rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-4xl">
            <h2 className="text-2xl md:text-5xl font-serif italic mb-6 md:mb-10 text-serene-accent">Personalize your journey...</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative group">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Describe your ritual needs..." 
                  className="w-full bg-white/10 border border-white/10 rounded-2xl md:rounded-[2rem] px-6 md:px-10 py-5 md:py-7 text-base md:text-xl text-white focus:outline-none focus:bg-white/20 transition-all placeholder:text-white/20 shadow-sm pr-14 md:pr-16"
                />
                <Search className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 w-5 md:w-6 h-5 md:h-6 text-white/20 group-focus-within:text-serene-accent transition-colors" />
              </div>
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="w-full md:w-auto bg-serene-accent text-serene-dark px-10 md:px-12 py-5 md:py-7 rounded-2xl md:rounded-[2rem] font-bold hover:brightness-110 hover:scale-[1.02] transition-all shadow-2xl uppercase text-[10px] tracking-[0.4em]"
              >
                AI Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3 mt-6 md:mt-10">
              {['Deep Tissue', 'Skin Restoration', 'Aesthetic Art', 'Physiotherapy'].map(tag => (
                <span key={tag} className="text-[8px] md:text-[10px] px-3 md:px-5 py-1.5 md:py-2 rounded-full bg-white/10 border border-white/20 text-white/80 font-bold uppercase tracking-widest hover:text-serene-accent hover:bg-white/20 cursor-pointer transition-all">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,_rgba(226,194,164,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
        </div>
      </section>

      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-12 md:gap-20">
        {/* Sidebar */}
        <aside className="space-y-8 md:space-y-12">
          <FilterSidebar 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory}
            sortByDistance={sortByDistance}
            setSortByDistance={setSortByDistance}
          />

          <WellnessAssessment />

          <section className="bg-serene-sage/10 rounded-[2rem] p-8 text-serene-dark shadow-sm border border-serene-sage/5">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Serene Protocol</h4>
            <p className="text-sm font-medium leading-relaxed opacity-60 italic">
              "Excellence is not an act, but a ritual. Our specialists are vetted through the Serene Merit System."
            </p>
          </section>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-16">
          {/* View Toggles & Search Metadata */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setViewMode('grid')}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                  viewMode === 'grid' ? "bg-serene-dark text-serene-accent shadow-xl" : "bg-white text-serene-dark/40 border border-black/5 hover:border-black/10"
                )}
              >
                <LayoutGrid className="w-4 h-4" />
                Grid View
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                  viewMode === 'map' ? "bg-serene-dark text-serene-accent shadow-xl" : "bg-white text-serene-dark/40 border border-black/5 hover:border-black/10"
                )}
              >
                <MapIcon className="w-4 h-4" />
                Map Overview
              </button>
            </div>

            <AnimatePresence mode="wait">
              {viewMode === 'grid' && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-6"
                >
                  {userLocation && (
                    <button 
                      onClick={() => setSortByDistance(!sortByDistance)}
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-5 py-2 rounded-full border transition-all",
                        sortByDistance 
                          ? "bg-serene-dark border-serene-dark text-serene-accent shadow-lg" 
                          : "bg-white border-black/10 text-serene-dark/40 hover:border-serene-dark/20"
                      )}
                    >
                      Nearby
                    </button>
                  )}
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    {filteredProviders.length + filteredCenters.length} Results Found
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {viewMode === 'map' ? (
              <motion.div
                key="map-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
              >
                <section className="space-y-8">
                  <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-black/5 pb-8">
                    <div>
                      <h3 className="text-xl font-serif italic text-serene-dark">Regional Registry</h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Nairobi Sanctuary Cluster</p>
                    </div>
                    <div className="flex items-center gap-3 text-tranquil-teal bg-tranquil-teal/5 px-4 py-2 rounded-full">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Global Data Synced</span>
                    </div>
                  </header>
                  <SanctuaryMap userLocation={userLocation} />
                </section>
              </motion.div>
            ) : (
              <motion.div
                key="grid-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-24"
              >
                <AnimatePresence>
                  {selectedRituals.length >= 2 && (
                    <motion.div
                      initial={{ y: 100 }}
                      animate={{ y: 0 }}
                      exit={{ y: 100 }}
                      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50"
                    >
                      <button
                        onClick={() => setIsCompareModalOpen(true)}
                        className="bg-serene-dark text-serene-accent px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-transform"
                      >
                        Compare {selectedRituals.length} Rituals
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {activeCategory === 'signature' && (
                  <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.21, 0, 0.07, 1] }}
                    className="mb-24"
                  >
                    <div className="flex items-center justify-between mb-12 border-b border-black/5 pb-8">
                       <h3 className="text-xl font-serif italic text-serene-dark">Lumia Collection</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {LUMIA_RITUALS.map(ritual => (
                        <RitualCard 
                          key={ritual.id} 
                          ritual={ritual} 
                          image={ritualImages[ritual.id]}
                          isSelected={!!selectedRituals.find(r => r.id === ritual.id)} 
                          onSelect={() => setSelectedRituals(prev => prev.find(r => r.id === ritual.id) ? prev.filter(r => r.id !== ritual.id) : [...prev, ritual])} 
                        />
                      ))}
                    </div>
                  </motion.section>
                )}

                {/* Featured Professionals */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.21, 0, 0.07, 1] }}
                >
                  <div className="flex items-center justify-between mb-12 border-b border-black/5 pb-8">
                    <h3 className="text-xl font-serif italic text-serene-dark">Master Practitioners</h3>
                    <button className="text-[10px] text-serene-sage font-bold tracking-[0.3em] uppercase hover:underline">
                      View Registry
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {isLoading ? (
                      Array.from({ length: 4 }).map((_, i) => <ProviderSkeleton key={i} />)
                    ) : filteredProviders.length > 0 ? (
                      filteredProviders.map((provider) => (
                        <LazyLoadWrapper key={provider.uid}>
                          <ProviderCard 
                            name={provider.displayName}
                            image={provider.photoURL}
                            rating={provider.rating}
                            reviewCount={provider.reviewCount}
                            subtitle={provider.specialties.join(' • ')}
                            badge={provider.certificationLevel}
                            status={provider.status}
                            distance={provider.distance}
                            onClick={() => handleProviderClick(provider)}
                          />
                        </LazyLoadWrapper>
                      ))
                    ) : (
                      <div className="col-span-full py-24 flex flex-col items-center text-center bg-white rounded-[3rem] border border-dashed border-black/10">
                        <Search className="w-12 h-12 text-black/5 mb-6" />
                        <h4 className="text-3xl font-serif italic text-aura-dark mb-4">No Specialists Found</h4>
                        <p className="text-aura-dark/30 font-medium max-w-sm">Try expanding your search parameters or selecting a different ritual category.</p>
                      </div>
                    )}
                  </div>
                </motion.section>

                {/* Luxury Centers */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.21, 0, 0.07, 1] }}
                >
                  <div className="flex items-center justify-between mb-12 border-b border-black/5 pb-8">
                    <h3 className="text-xl font-serif italic text-aura-dark">Private Sanctuaries</h3>
                    <button 
                      onClick={() => setViewMode('map')}
                      className="text-[10px] text-aura-brown font-bold tracking-[0.3em] uppercase hover:underline"
                    >
                      Registry Map
                    </button>
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    {isLoading ? (
                      Array.from({ length: 2 }).map((_, i) => <CenterSkeleton key={i} />)
                    ) : filteredCenters.length > 0 ? (
                      filteredCenters.map((center) => (
                        <LazyLoadWrapper key={center.id}>
                          <CenterCard 
                            name={center.name}
                            image={center.images[0]}
                            rating={center.rating}
                            reviewCount={center.reviewCount}
                            address={center.address}
                            certificationLevel={center.certificationLevel as any}
                            distance={center.distance}
                            onClick={() => setIsBookingOpen(true)}
                          />
                        </LazyLoadWrapper>
                      ))
                    ) : (
                      <div className="col-span-full p-24 bg-white rounded-[3rem] border border-dashed border-black/10">
                        {/* Empty State */}
                      </div>
                    )}
                  </div>
                </motion.section>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {isBookingOpen && (
          <BookingFlow onClose={() => setIsBookingOpen(false)} />
        )}
        {isProfileOpen && selectedProvider && (
          <ProviderProfile 
            provider={selectedProvider} 
            onClose={() => setIsProfileOpen(false)} 
            onBook={handleBookFromProfile}
          />
        )}
        {isCompareModalOpen && (
          <RitualCompareModal rituals={selectedRituals} onClose={() => setIsCompareModalOpen(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};


import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, Sparkles, HeartPulse, ArrowUpRight, 
  Award, Globe, CheckCircle2, ChevronRight, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SectionHeader = ({ subtitle, title, description, dark = false }: { subtitle: string, title: string, description?: string, dark?: boolean }) => (
  <div className="mb-16 md:mb-24 text-center">
    <div className={`inline-block px-4 py-1.5 rounded-full border ${dark ? 'border-white/10 bg-white/5 text-lumia-gold' : 'border-lumia-emerald/10 bg-lumia-emerald/5 text-lumia-emerald'} text-[10px] font-bold uppercase tracking-[0.5em] mb-8`}>
      {subtitle}
    </div>
    <h2 className={`text-4xl md:text-7xl font-serif italic mb-8 tracking-tight ${dark ? 'text-white' : 'text-lumia-charcoal'}`}>
      {title}
    </h2>
    {description && (
      <p className={`text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed ${dark ? 'text-white/40' : 'text-lumia-charcoal/40'}`}>
        {description}
      </p>
    )}
  </div>
);

export const Landing = () => {
  return (
    <div className="min-h-screen bg-lumia-bg selection:bg-lumia-gold/20">
      {/* 1. HERO SECTION - Ivory (#FAF9F6) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-lumia-bg overflow-hidden p-6">
        <div className="absolute inset-0 luxury-gradient opacity-30 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-[radial-gradient(circle_at_center,_rgba(15,138,112,0.03)_0%,_transparent_70%)] pointer-events-none"
        />

        <nav className="absolute top-12 left-0 right-0 px-12 flex justify-between items-center z-50">
          <Link to="/" className="text-xl font-serif italic text-lumia-charcoal tracking-tight hover:text-lumia-emerald transition-colors">
            Lumia.
          </Link>
          <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-lumia-charcoal/40">
            <Link to="/explore" className="hover:text-lumia-emerald transition-colors">Sanctuaries</Link>
            <Link to="/wallet" className="hover:text-lumia-emerald transition-colors">Ecosystem</Link>
          </div>
        </nav>

        <motion.main 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 flex flex-col items-center text-center max-w-7xl pt-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-lumia-emerald/10 bg-white shadow-sm text-[9px] font-bold tracking-[0.5em] text-lumia-emerald mb-12 uppercase"
          >
            <Sparkles className="w-3 h-3" /> LUMIA HEALTH & BEAUTY
          </motion.div>

          <h1 className="text-6xl md:text-[10rem] font-serif italic leading-[0.9] tracking-tighter mb-16 max-w-6xl">
            <span className="text-lumia-emerald">A Sanctuary</span> <br />
            <span className="text-lumia-gold">In Every Setting.</span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center gap-12"
          >
            <Link 
              to="/explore" 
              className="px-16 py-7 bg-lumia-gold text-white rounded-full font-bold uppercase text-[11px] tracking-[0.5em] shadow-[0_12px_40px_rgba(212,175,55,0.25)] hover:bg-lumia-gold-hover hover:scale-105 hover:shadow-[0_20px_50px_rgba(212,175,55,0.35)] transition-all active:scale-95"
            >
              Begin Your Ritual
            </Link>

            <p className="text-[10px] text-lumia-charcoal/30 font-bold uppercase tracking-[0.5em] leading-relaxed max-w-sm">
              Expertly Verified Specialists. <br />
              Protected Global Transactions.
            </p>
          </motion.div>
        </motion.main>

        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end z-20 hidden md:flex">
          <div className="flex flex-col gap-2">
            <p className="text-[9px] font-bold text-lumia-charcoal/20 uppercase tracking-[0.4em]">Protocol Active</p>
            <p className="text-[9px] font-bold text-lumia-charcoal/20 uppercase tracking-[0.4em]">&copy; 2026 Lumia</p>
          </div>
          <div className="flex gap-8">
            <ShieldCheck className="w-4 h-4 text-lumia-charcoal/20" />
            <HeartPulse className="w-4 h-4 text-lumia-charcoal/20" />
          </div>
        </div>
      </section>

      {/* 2. RITUALS SECTION - White (#FFFFFF) */}
      <section className="py-24 md:py-40 px-8 bg-lumia-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            subtitle="The Realms" 
            title="Refined Rituals." 
            description="Lumia curates the world's most sophisticated wellness experiences, brought to your domain with cinematic precision."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Skin Restoration', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800', category: 'Dermatology' },
              { name: 'Deep Tissue Ritual', image: 'https://images.unsplash.com/photo-1544161515-4ae6ce6db87e?auto=format&fit=crop&q=80&w=800', category: 'Physiotherapy' },
              { name: 'Aesthetic Artistry', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800', category: 'Beauty' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group relative h-[500px] rounded-[40px] overflow-hidden border border-black/5"
              >
                <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-[2000ms]" />
                <div className="absolute inset-0 bg-gradient-to-t from-lumia-charcoal/80 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <p className="text-[10px] font-bold text-lumia-gold uppercase tracking-[0.4em] mb-3">{item.category}</p>
                  <h3 className="text-3xl font-serif italic text-white mb-6">{item.name}</h3>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-white uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all">
                    Explore Details <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CERTIFICATION SECTION - Ivory/Cream (#F7F4EC) */}
      <section className="py-24 md:py-40 px-8 bg-lumia-bg-certification">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <SectionHeader 
                subtitle="Verification Protocol" 
                title="Trust, Certified." 
              />
              <div className="space-y-12">
                {[
                  { icon: Award, title: "Lumia Verified Professionals", desc: "Every specialist undergoes rigorous identity auditing and certification verification before entering the ecosystem." },
                  { icon: Globe, title: "Sanctuary Inspection", desc: "Lumia Wellness Centers are physically inspected multi-annually to ensure uncompromised luxury and hygiene standards." },
                  { icon: CheckCircle2, title: "Lumia Safe™ Escrow", desc: "Your transactions are held securely until the ritual is celebrated, ensuring absolute financial protection." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-lumia-emerald shadow-sm border border-black/5 group-hover:bg-lumia-emerald group-hover:text-white transition-all">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-serif italic mb-3 text-lumia-charcoal">{item.title}</h4>
                      <p className="text-lumia-charcoal/40 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[60px] overflow-hidden border border-black/5 shadow-2xl relative">
                <img src="https://images.unsplash.com/photo-1540555700478-4be289a5080d?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Certification" />
                <div className="absolute inset-0 bg-lumia-emerald/10 mix-blend-multiply" />
                <div className="absolute top-12 left-10 right-10 p-8 glass rounded-[40px] flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-lumia-emerald flex items-center justify-center text-white shadow-xl">
                    <ShieldCheck className="w-10 h-10" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-lumia-emerald uppercase tracking-[0.4em] mb-1">Status: Active</p>
                    <p className="text-2xl font-serif italic text-lumia-charcoal leading-tight">Lumia Protocol V2.4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MEMBERSHIP SECTION - Very Light Gold (#FFF9E6) */}
      <section className="py-24 md:py-40 px-8 bg-lumia-bg-membership text-center">
        <div className="max-w-4xl mx-auto">
          <SectionHeader 
            subtitle="The Elite Circle" 
            title="A Life Extraordinary." 
            description="Join a global community of individuals who prioritize restoration as the cornerstone of their existence."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
            <div className="p-10 bg-white rounded-[40px] border border-lumia-gold/20 shadow-xl flex flex-col items-center">
              <Zap className="w-12 h-12 text-lumia-gold mb-8" />
              <h4 className="text-3xl font-serif italic mb-4">Lumia Member</h4>
              <p className="text-lumia-charcoal/40 font-medium mb-8">Access to our global network of verified specialists and sanctuaries.</p>
              <div className="mt-auto w-full pt-8 border-t border-black/5">
                <p className="text-[10px] font-bold text-lumia-gold uppercase tracking-[0.4em]">Complimentary Access</p>
              </div>
            </div>
            <div className="p-10 bg-lumia-emerald rounded-[40px] shadow-2xl flex flex-col items-center text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
              <Sparkles className="w-12 h-12 text-lumia-gold mb-8" />
              <h4 className="text-3xl font-serif italic mb-4">Lumia Elite</h4>
              <p className="text-white/60 font-medium mb-8">24/7 dedicated concierge, priority rituals, and exclusive private domains.</p>
              <div className="mt-auto w-full pt-8 border-t border-white/10">
                <p className="text-[10px] font-bold text-lumia-gold uppercase tracking-[0.4em]">Invitation Only</p>
              </div>
            </div>
          </div>
          
          <div className="mt-24">
            <Link 
              to="/explore" 
              className="group inline-flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.6em] text-lumia-gold hover:text-lumia-emerald transition-all"
            >
              Begin Your Journey <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-12 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-2xl font-serif italic text-lumia-charcoal">Lumia.</div>
          <div className="flex gap-12 text-[9px] font-bold uppercase tracking-[0.4em] text-lumia-charcoal/30">
            <span>Privatcy Protocol</span>
            <span>Terms of Service</span>
            <span>Certification Board</span>
          </div>
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-lumia-charcoal/20">
            &copy; 2026 Lumia Health & Beauty
          </p>
        </div>
      </footer>
    </div>
  );
};


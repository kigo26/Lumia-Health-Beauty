import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, Sparkles, HeartPulse, ArrowUpRight, 
  Award, Globe, CheckCircle2, ChevronRight, Zap,
  Menu, X, Search, User, ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { WellnessAssessment } from '../components/WellnessAssessment';
import { TestimonialCarousel } from '../components/TestimonialCarousel';

import { useAuth } from '../contexts/AuthContext';
import { logout } from '../lib/firebase';

import spaDetail from '../assets/images/spa_detail_1780691428480.png';
import spaFacial from '../assets/images/spa_facial_1780691447919.png';
import spaCandle from '../assets/images/spa_candle_1780691461660.png';
import spaBackground from '../assets/images/spa_background_1780691676574.png';
import lumiaLogo from '../assets/images/lumia_logo_mockup_1780881339195.png';


const MoodCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={cn("relative rounded-[2rem] overflow-hidden group", className)}
  >
    {children}
  </motion.div>
);

export const Landing = () => {
  const { user, profile } = useAuth();

  return (
    <div className="min-h-screen font-sans antialiased text-tranquil-text selection:bg-tranquil-teal/10" style={{ backgroundImage: `url(${spaBackground})`, backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Announcement Bar */}
      <div className="bg-tranquil-teal text-white py-2 text-center text-[10px] md:text-xs font-medium tracking-wider">
        Relax, rejuvenate, and restore — enjoy exclusive massage deals this week only!
      </div>

      {/* Header */}
      <nav className="bg-white border-b border-black/5 px-4 md:px-12 py-4">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl md:text-2xl font-serif text-tranquil-teal tracking-tight font-medium">
            <img src={lumiaLogo} alt="Lumia Beauty & Health Spa" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Menu */}
          <div className="hidden lg:flex items-center gap-1 bg-tranquil-teal p-1 rounded-md">
            <Link to="/" className="bg-white text-tranquil-teal px-6 py-2 rounded-sm text-[11px] font-bold uppercase tracking-wider">Home</Link>
            <Link to="/explore" className="text-white hover:bg-white/10 px-6 py-2 rounded-sm text-[11px] font-bold uppercase tracking-wider transition-colors">Blog</Link>
            <Link to="/" className="text-white hover:bg-white/10 px-6 py-2 rounded-sm text-[11px] font-bold uppercase tracking-wider transition-colors">Page</Link>
            <Link to="/" className="text-white hover:bg-white/10 px-6 py-2 rounded-sm text-[11px] font-bold uppercase tracking-wider transition-colors">Contact</Link>
            <Link to="/" className="text-white hover:bg-white/10 px-6 py-2 rounded-sm text-[11px] font-bold uppercase tracking-wider transition-colors">Testimonial</Link>
            <Link to="/" className="text-white hover:bg-white/10 px-6 py-2 rounded-sm text-[11px] font-bold uppercase tracking-wider transition-colors">Team</Link>
            <Link to="/" className="text-white hover:bg-white/10 px-6 py-2 rounded-sm text-[11px] font-bold uppercase tracking-wider transition-colors">Service</Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {user ? (
               <div className="flex items-center gap-6">
                 <div className="hidden md:flex flex-col items-end">
                    <span className="text-[10px] font-bold text-tranquil-teal uppercase tracking-widest">{profile?.role?.replace('_', ' ')}</span>
                    <span className="text-xs font-serif italic text-tranquil-text">{profile?.displayName}</span>
                 </div>
                 <Link to="/profile" className="bg-tranquil-teal p-2.5 rounded-md text-white cursor-pointer hover:brightness-125 transition-all">
                   <User className="w-4 h-4" />
                 </Link>
                 <button 
                  onClick={() => logout()}
                  className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-rose-500 hover:text-rose-600 transition-colors"
                 >
                   Exit
                 </button>
               </div>
            ) : (
              <Link 
                to="/login"
                className="flex items-center gap-2 bg-tranquil-teal px-6 py-2.5 rounded-md text-white text-[11px] font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
              >
                Enter Sanctuary
              </Link>
            )}
            <Menu className="lg:hidden w-6 h-6 text-tranquil-teal cursor-pointer" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[800px] bg-black overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1544161515-4ae6ce6db87e?auto=format&fit=crop&q=80&w=2000" 
          alt="Spa Treatment" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            <div className="space-y-6 md:space-y-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-white/90 text-sm md:text-base font-medium tracking-wide"
              >
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-8xl font-serif text-white leading-[1.1]"
              >
                Relax, Refresh, <br /> 
                Rejuvenate With Us.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/70 text-xs md:text-sm max-w-md font-light leading-relaxed"
              >
                Experience ultimate relaxation at our massage center, where skilled hands melt away stress. Rejuvenate your body and mind in a serene environment designed for your comfort, healing, and well-being.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link to="/explore" className="inline-block border border-white text-white px-8 py-3 rounded-full text-[12px] font-medium uppercase tracking-widest hover:bg-white hover:text-black hover:border-transparent transition-all duration-300">
                  Explore Lumia
                </Link>
              </motion.div>
            </div>

            {/* Right Side Floating Images */}
            <div className="hidden md:flex justify-end relative h-[500px]">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-0 right-10 w-[300px] aspect-[4/3] rounded-sm overflow-hidden border-4 border-white/20 shadow-2xl z-10"
              >
                <img src={spaDetail} className="w-full h-full object-cover" alt="Detail" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] aspect-[4/5] rounded-sm overflow-hidden border-4 border-white/20 shadow-2xl z-20"
              >
                <img src={spaFacial} className="w-full h-full object-cover" alt="Facial" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-0 right-0 w-[250px] aspect-square rounded-sm overflow-hidden border-4 border-white/20 shadow-2xl z-10"
              >
                <img src={spaCandle} className="w-full h-full object-cover" alt="Candle" />
              </motion.div>
              
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
                <div className="bg-white/10 hover:bg-white/20 p-2 border border-white/20 cursor-pointer"><ChevronDown className="w-4 h-4 text-white rotate-180" /></div>
                <div className="bg-white/10 hover:bg-white/20 p-2 border border-white/20 cursor-pointer"><ChevronDown className="w-4 h-4 text-white" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 md:py-40 px-6 md:px-12 max-w-[1800px] mx-auto">
        <div className="text-center mb-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-tranquil-teal mb-6">Our Expertise</p>
          <h2 className="text-3xl md:text-5xl font-serif text-tranquil-text">What We Do?</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Swedish Massage",
              desc: "Experience ultimate relaxation with long, gliding strokes designed to ease tension and improve circulation.",
              image: "https://images.unsplash.com/photo-1544161515-4ae6ce6db87e?auto=format&fit=crop&q=80&w=800"
            },
            {
              title: "Deep Tissue Massage",
              desc: "Target deeper layers of muscle and connective tissue to address chronic aches and stiff necks.",
              image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800"
            },
            {
              title: "Aromatherapy Massage",
              desc: "Enhance your mental and physical well-being through the power of pure essential oils.",
              image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800"
            },
            {
              title: "Hot Stone Massage",
              desc: "Melt away stress with heated volcanic stones placed strategically to release deep-seated tension.",
              image: "https://images.unsplash.com/photo-1519415510236-85155f82b9c3?auto=format&fit=crop&q=80&w=800"
            }
          ].map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tranquil-teal/90 via-tranquil-teal/20 to-transparent transition-opacity duration-500"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif text-white">{service.title}</h3>
                  <div className="h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden transform translate-y-4 group-hover:translate-y-0">
                    <p className="text-xs text-white/70 leading-relaxed font-light mb-6">
                      {service.desc}
                    </p>
                    <Link to="/explore" className="inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-white border-b border-white/30 pb-1 hover:border-white transition-all">
                      Book Now <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Assessment Section */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-sky-50 flex flex-col items-center">
        <div className="max-w-2xl w-full">
           <div className="text-center mb-16 space-y-4">
             <span className="text-[10px] uppercase tracking-[0.3em] text-tranquil-teal font-bold">Bespoke Intelligence</span>
             <h2 className="text-3xl md:text-5xl font-serif text-tranquil-text italic">Lumia Wellness Analyzer</h2>
             <p className="text-sm text-tranquil-text/70 font-light leading-relaxed">
               Let our advanced protocols analyze your current state to suggest the restorative path best suited to your needs today.
             </p>
           </div>
           <div className="bg-tranquil-cream/30 p-8 md:p-12 rounded-[2rem] border border-black/5 shadow-inner">
              <WellnessAssessment />
           </div>
        </div>
      </section>
      
      {/* Global Registry Preview */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-white overflow-hidden">
        <div className="max-w-[1800px] mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-24">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-tranquil-teal mb-6">Global Registry</p>
              <h2 className="text-4xl md:text-7xl font-serif text-tranquil-text leading-tight">
                Our Top <br />
                <span className="italic">Sanctuaries</span> & Experts
              </h2>
            </div>
            <Link to="/explore" className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-tranquil-teal">
              View Full Registry <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Centers Column */}
            <div className="space-y-12">
              <div className="flex items-center gap-4 border-b border-black/5 pb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-tranquil-teal/40">01</span>
                <h3 className="text-xl font-serif text-tranquil-text italic">Premium Sanctuaries</h3>
              </div>
              <div className="grid grid-cols-1 gap-8">
                {[
                  { name: "Emerald Zen Spa", loc: "Riverside, Nairobi", img: "https://images.unsplash.com/photo-1544161515-4ae6ce6db87e?auto=format&fit=crop&q=80&w=800", rating: "4.9" },
                  { name: "Sapphire Sanctuary", loc: "Karen, Nairobi", img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800", rating: "5.0" }
                ].map((center, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -10 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-6 shadow-xl">
                      <img src={center.img} alt={center.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                      <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                        <Award className="w-4 h-4 text-tranquil-teal" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-tranquil-teal">Gold Class</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-2xl font-serif text-tranquil-text italic group-hover:text-tranquil-teal transition-colors">{center.name}</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{center.loc}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-tranquil-teal">
                        <HeartPulse className="w-4 h-4" />
                        <span className="text-sm font-serif">{center.rating}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Providers Column */}
            <div className="space-y-12 lg:pt-24">
              <div className="flex items-center gap-4 border-b border-black/5 pb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-tranquil-teal/40">02</span>
                <h3 className="text-xl font-serif text-tranquil-text italic">Master Artisans</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { name: "Sarah Johnson", role: "Massage Master", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400", rating: "4.9" },
                  { name: "Elena Rodriguez", role: "Aesthetic Artisan", img: "https://images.unsplash.com/photo-1594744803329-a584af1eb518?auto=format&fit=crop&q=80&w=400", rating: "5.0" },
                  { name: "Michael Chen", role: "Physio Specialist", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400", rating: "4.8" },
                  { name: "David Kojo", role: "Senior Practitioner", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400", rating: "4.7" }
                ].map((artisan, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center text-center group cursor-pointer"
                  >
                    <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 border-4 border-tranquil-cream shadow-2xl">
                      <img src={artisan.img} alt={artisan.name} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <h4 className="text-xl font-serif text-tranquil-text italic group-hover:text-tranquil-teal transition-colors">{artisan.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 mb-3">{artisan.role}</p>
                    <div className="flex items-center gap-1.5 text-tranquil-teal/40 group-hover:text-tranquil-teal transition-colors">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase tracking-tight">Verified Specialist</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Collection Section */}
      <section className="py-24 md:py-40 bg-tranquil-cream">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-tranquil-teal/70 mb-6">Exclusive Branded Experiences</p>
            <h2 className="text-4xl md:text-6xl font-serif text-tranquil-text leading-tight">
              Premium <span className="italic">Lumia</span> Signature Collection
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { 
                name: "Lumia Serenity Ritual™", 
                desc: "A ethereal deep-relaxation protocol.",
                image: "https://images.unsplash.com/photo-1544161515-4ae6ce6db87e?auto=format&fit=crop&q=80&w=800"
              },
              { 
                name: "Lumia Emerald Escape™", 
                desc: "Nature-infused restorative therapy.",
                image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800"
              },
              { 
                name: "Lumia Deep Renewal™", 
                desc: "Advanced cellular recovery session.",
                image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800"
              },
              { 
                name: "Lumia Golden Harmony™", 
                desc: "The ultimate balance and flow ritual.",
                image: "https://images.unsplash.com/photo-1519415510236-85155f82b9c3?auto=format&fit=crop&q=80&w=800"
              },
              { 
                name: "Lumia Signature Wellness Journey™", 
                desc: "A bespoke multi-modal experience.",
                image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800"
              },
              { 
                name: "Lumia Stress Reset Experience™", 
                desc: "Rapid nervous system regulation.",
                image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800"
              },
              { 
                name: "Lumia Ultimate Recovery Ritual™", 
                desc: "High-performance body restoration.",
                image: "https://images.unsplash.com/photo-1594434057390-1c944eb98471?auto=format&fit=crop&q=80&w=800"
              },
              { 
                name: "Lumia Couples Sanctuary Experience™", 
                desc: "Shared tranquility for two.",
                image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative aspect-[4/5] overflow-hidden group cursor-pointer"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-tranquil-teal/80 group-hover:bg-tranquil-teal/40 transition-colors duration-500"></div>
                
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-auto group-hover:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5 text-white/60" />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-serif text-white leading-tight">{item.name}</h3>
                    <p className="text-xs text-white/60 leading-relaxed font-light line-clamp-2">{item.desc}</p>
                    <div className="pt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-white">Book Ritual</span>
                      <ChevronRight className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialCarousel />
      
      {/* Footer */}
      <footer className="bg-tranquil-teal text-white py-24 px-12 md:px-24">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-8">
            <h2 className="text-2xl font-serif tracking-tight">Lumia Beauty & Health Spa</h2>
            <p className="text-white/70 text-xs leading-relaxed max-w-xs">
              Providing luxury sanctuary rituals designed for your absolute peace and rejuvenation.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8">Navigation</h4>
            <ul className="space-y-4 text-xs font-light text-white/80">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/explore">Rituals</Link></li>
              <li><Link to="/bookings">Schedule</Link></li>
              <li><Link to="/profile">Concierge</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8">Legal</h4>
            <ul className="space-y-4 text-xs font-light text-white/60">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8">Newsletter</h4>
            <div className="flex gap-2">
              <input type="text" placeholder="Email" className="bg-white/5 border border-white/10 px-4 py-2 text-xs outline-none w-full" />
              <button className="bg-white text-tranquil-teal px-4 py-2 text-[10px] font-bold uppercase">Join</button>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-[10px] uppercase tracking-widest text-white/50">
          Design By <a href="mailto:jamenya1988@gmail.com" className="hover:text-white underline">Kepler Camp Codes</a>
        </div>
      </footer>
    </div>
  );
};

const IconLeaf = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.2C18.5 16.2 15.2 19 11 20z" />
    <path d="M7 20c-3-2-3-5.5 0-9" />
    <path d="M11 20v-4" />
    <path d="M11 16l-2-2" />
    <path d="M11 16l2-2" />
  </svg>
);



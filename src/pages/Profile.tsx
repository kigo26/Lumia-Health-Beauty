import React from 'react';
import { motion } from 'motion/react';
import { User, Settings, ShieldCheck, MapPin, Calendar, Heart, Sparkles, LogOut, ShieldAlert } from 'lucide-react';
import { RitualProgress } from '../components/RitualProgress';
import { MetricChart } from '../components/MetricChart';
import { WellnessGoalsProgress } from '../components/WellnessGoalsProgress';
import { useAuth } from '../contexts/AuthContext';
import { db, logout } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { cn } from '../lib/utils';
import { toast } from 'react-hot-toast';

export const Profile = () => {
  const { user, profile, loading } = useAuth();

  if (loading) return null;
  if (!user) return (
    <div className="pt-40 text-center">
      <h2 className="text-2xl font-serif text-tranquil-text italic">Please sign in to view your profile</h2>
    </div>
  );

  const switchRole = async (newRole: any) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        role: newRole,
        updatedAt: new Date().toISOString()
      });
      toast.success(`Role switched to ${newRole}`);
    } catch (e) {
      console.error(e);
      toast.error('Failed to update role');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-32 pt-24 md:pt-32 px-4 md:px-8 max-w-[1400px] mx-auto"
    >
      <header className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-20">
        <div className="relative">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-tranquil-teal/10 flex items-center justify-center border border-tranquil-teal/20 overflow-hidden">
             <img src={profile?.photoURL || user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border border-black/5 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
            <Settings className="w-4 h-4 text-tranquil-teal" />
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h1 className="text-4xl md:text-6xl font-serif text-tranquil-text italic font-medium">{profile?.displayName || user.displayName}</h1>
            <div className="flex items-center gap-2 bg-tranquil-teal/5 border border-tranquil-teal/10 px-4 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4 text-tranquil-teal" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-tranquil-teal">
                {profile?.role?.replace('_', ' ')} Circle
              </span>
            </div>
          </div>
          
          <div className="flex wrap gap-6">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-light">Biological Resident</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-light">Onboarded {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : '2026'}</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 px-12 py-8 bg-tranquil-cream rounded-[2rem]">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-tranquil-teal/70 mb-1">Rituals Done</p>
            <p className="text-3xl font-serif text-tranquil-text">24</p>
          </div>
          <div className="w-px h-12 bg-black/10"></div>
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-tranquil-teal/70 mb-1">Certificates</p>
            <p className="text-3xl font-serif text-tranquil-text">12</p>
          </div>
          <div className="w-px h-12 bg-black/10"></div>
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-tranquil-teal/70 mb-1">Wellness Score</p>
            <p className="text-3xl font-serif text-tranquil-teal">98</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-20">
          <RitualProgress />
          
          <MetricChart />
          
          <WellnessGoalsProgress />
          
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-tranquil-teal/40 mb-10">Restoration Journal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 { date: 'June 02', title: 'Deep Tissue Recovery', center: 'Emerald Zen Spa', mood: 'Revitalized' },
                 { date: 'May 28', title: 'Aromatherapy Session', center: 'Pearl Wellness', mood: 'Calm' }
               ].map((log, i) => (
                 <div key={i} className="p-6 rounded-3xl bg-white border border-black/5 hover:border-tranquil-teal/20 transition-all flex items-start gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-tranquil-cream flex flex-col items-center justify-center text-tranquil-teal">
                     <span className="text-[10px] font-bold leading-none">{log.date.split(' ')[0]}</span>
                     <span className="text-lg font-serif">{log.date.split(' ')[1]}</span>
                   </div>
                   <div className="flex-1">
                     <h4 className="text-sm font-bold text-tranquil-text mb-1">{log.title}</h4>
                     <p className="text-[10px] text-gray-400 mb-4">{log.center}</p>
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tranquil-teal/5 text-tranquil-teal text-[9px] font-bold uppercase tracking-tighter">
                       <Heart className="w-3 h-3 fill-current" /> {log.mood}
                     </div>
                   </div>
                 </div>
               ))}
            </div>
          </section>
        </div>

        <div className="space-y-12">
          <section className="bg-tranquil-teal text-white rounded-[2.5rem] p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Sparkles className="w-24 h-24" />
            </div>
            <h3 className="text-2xl font-serif mb-4 relative z-10 text-white">Lumia Concierge</h3>
            <p className="text-xs text-white/90 font-light leading-relaxed mb-10 relative z-10">
              Your personal wellness advisor is ready to optimize your next ritual experience based on your current recovery metrics.
            </p>
            <button className="w-full py-4 bg-white text-tranquil-teal rounded-2xl font-bold text-[10px] tracking-[0.4em] uppercase hover:scale-[1.02] transition-transform relative z-10">
              Contact Advisor
            </button>
          </section>

          <section className="p-10 border border-black/5 rounded-[2.5rem] bg-amber-50/30">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-600/70 mb-8 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              Developer Role Switcher
            </h4>
            <div className="grid grid-cols-2 gap-3">
               {[
                 { id: 'client', label: 'Client' },
                 { id: 'provider', label: 'Provider' },
                 { id: 'owner', label: 'Sanctuary Owner' },
                 { id: 'admin', label: 'Admin' },
                 { id: 'super_admin', label: 'Super Admin' }
               ].map((role) => (
                 <button 
                  key={role.id}
                  onClick={() => switchRole(role.id)}
                  className={cn(
                    "py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all",
                    profile?.role === role.id 
                      ? "bg-amber-600 text-white shadow-md shadow-amber-600/20" 
                      : "bg-white text-amber-600 border border-amber-600/20 hover:bg-amber-600/5"
                  )}
                 >
                   {role.label}
                 </button>
               ))}
            </div>
            <div className="mt-8 pt-8 border-t border-amber-600/10">
              <button 
                onClick={() => logout()}
                className="w-full py-4 border border-rose-500/20 text-rose-500 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center gap-3"
              >
                <LogOut className="w-4 h-4" />
                Sign Out of Sanctuary
              </button>
            </div>
          </section>

          <section className="p-10 border border-black/5 rounded-[2.5rem]">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-tranquil-teal/70 mb-8">Bio-Stats</h4>
            <div className="space-y-6">
               {[
                 { label: 'Sleep Consistency', value: 92 },
                 { label: 'Hydration Level', value: 78 },
                 { label: 'Muscle Relaxation', value: 85 }
               ].map((stat, i) => (
                 <div key={i} className="space-y-2">
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-tranquil-text">
                     <span>{stat.label}</span>
                     <span>{stat.value}%</span>
                   </div>
                   <div className="h-1 bg-black/5 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }}
                       whileInView={{ width: `${stat.value}%` }}
                       className="h-full bg-tranquil-teal"
                     />
                   </div>
                 </div>
               ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

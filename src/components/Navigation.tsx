import React, { useState, useEffect } from 'react';
import { Search, Bell, User, MessageSquare, Home, Calendar, Wallet as WalletIcon, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';

import { useSearch } from '../context/SearchContext';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, LogIn } from 'lucide-react';
import { logout } from '../lib/firebase';

export const Navbar = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const { user, profile } = useAuth();
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    if (user && !sessionStorage.getItem('hasGreeted')) {
      setShowGreeting(true);
      sessionStorage.setItem('hasGreeted', 'true');
      const timer = setTimeout(() => setShowGreeting(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <nav className="fixed top-0 left-20 right-0 z-50 h-20 bg-serene-white/80 backdrop-blur-md hidden md:flex items-center justify-between px-10 border-b border-black/5">
      <div className="flex items-center gap-6 w-1/2">
        <div className="flex items-center gap-4 bg-serene-sage/5 border border-black/5 rounded-full px-6 py-2.5 w-full max-w-md shadow-sm transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-serene-dark/5">
          <Search className="w-4 h-4 text-serene-dark/30" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rituals, sanctuaries or protocols..." 
            className="bg-transparent border-none outline-none text-sm w-full text-serene-dark placeholder:text-serene-dark/20 font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-8">
        {showGreeting && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute right-36 bg-serene-white/90 backdrop-blur shadow-sm border border-serene-sage/20 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest text-serene-dark uppercase"
          >
            Welcome back, {profile?.displayName || 'Traveler'}
          </motion.div>
        )}
        <div className="hidden lg:flex items-center gap-3 bg-serene-dark text-serene-white rounded-full px-5 py-2 shadow-sm border border-white/10">
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-60">Status</span>
          <span className="font-mono text-[11px] font-bold text-serene-accent">ALPHA-73B8</span>
        </div>
        <button className="relative p-2 text-serene-dark/30 hover:text-serene-dark transition-all hover:scale-110">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-serene-accent rounded-full ring-2 ring-white"></span>
        </button>
        
        {user ? (
          <Link to="/profile" className="flex items-center gap-4">
            <div className="flex flex-col items-end hidden lg:flex">
              <span className="text-sm font-bold text-tranquil-text leading-none">{profile?.displayName}</span>
              <span className="text-[9px] uppercase tracking-widest text-tranquil-teal font-bold mt-1">
                {profile?.role?.replace('_', ' ')}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-serene-sage/20 border border-serene-sage/10 p-[2px] cursor-pointer hover:scale-105 transition-all">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img src={profile?.photoURL || user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} alt="User" className="w-full h-full object-cover grayscale-[0.2]" />
              </div>
            </div>
          </Link>
        ) : (
          <Link 
            to="/login"
            className="flex items-center gap-2 px-6 py-2.5 bg-serene-dark text-serene-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-tranquil-teal transition-all shadow-lg"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export const MobileNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-serene-white/90 backdrop-blur-md flex md:hidden items-center justify-between px-6 border-b border-black/5 shadow-sm">
      <Link to="/" className="text-xl font-serif text-serene-dark tracking-tight">serene.</Link>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-serene-dark/5 border border-black/5 rounded-full px-3 py-1 mr-1">
          <div className="w-1.5 h-1.5 bg-serene-accent rounded-full animate-pulse" />
          <span className="text-[8px] uppercase tracking-widest text-serene-dark/40 font-bold">Secure</span>
        </div>
        <button className="p-1.5 text-serene-dark/30 hover:text-serene-dark transition-colors"><Search className="w-5 h-5" /></button>
        <button className="p-1.5 text-serene-dark/30 hover:text-serene-dark transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-serene-accent rounded-full ring-1 ring-white" />
        </button>
      </div>
    </nav>
  );
}

export const Sidebar = () => {
  const location = useLocation();
  const { user, profile, isAdmin } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: Home, path: '/explore' },
    { icon: Calendar, path: '/bookings' },
    { icon: WalletIcon, path: '/wallet' },
    { icon: MessageSquare, path: '/chat' },
    { icon: User, path: '/profile' }
  ];

  if (isAdmin) {
    navItems.push({ icon: ShieldCheck, path: '/admin' });
  }

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-20 flex flex-col items-center py-10 border-r border-black/5 bg-serene-white z-[60] hidden md:flex shadow-2xl">
      <div className="mb-14">
        <Link to="/" className="w-12 h-12 rounded-2xl bg-serene-dark flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all group">
          <Sparkles className="text-serene-accent w-6 h-6 transition-transform group-hover:rotate-12" />
        </Link>
      </div>
      
      <nav className="flex flex-col gap-10">
        {navItems.map(({ icon: Icon, path }) => (
          <Link 
            key={path}
            to={path}
            className={cn(
              "p-3.5 rounded-2xl transition-all duration-500 relative",
              isActive(path) 
                ? "text-serene-dark" 
                : "text-serene-dark/20 hover:text-serene-dark/60 hover:bg-black/5"
            )}
          >
            <Icon className={cn("w-6 h-6", isActive(path) && "scale-110")} />
            {isActive(path) && (
              <motion.div 
                layoutId="active-nav"
                className="absolute inset-0 bg-serene-accent/10 rounded-2xl -z-10"
              />
            )}
          </Link>
        ))}
      </nav>

      <div className="mt-auto flex flex-col items-center gap-6">
        {user && (
          <button 
            onClick={() => logout()}
            className="w-10 h-10 rounded-full bg-rose-500/5 border border-rose-500/10 flex items-center justify-center cursor-pointer hover:bg-rose-500 hover:text-white transition-all text-rose-500 shadow-sm"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
        <div className="w-10 h-10 rounded-full bg-serene-dark/5 border border-black/5 flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all text-serene-dark/30 hover:text-serene-dark shadow-sm">
          <ShieldCheck className="w-5 h-5" />
        </div>
      </div>
    </aside>
  );
};

export const BottomNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: Home, label: 'Explore', path: '/explore' },
    { icon: Calendar, label: 'Rituals', path: '/bookings' },
    { icon: WalletIcon, label: 'Wallet', path: '/wallet' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-[4.5rem] bg-serene-white/80 backdrop-blur-xl flex items-center justify-around md:hidden border-t border-black/5 px-4 pb-2 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      {navItems.map(({ icon: Icon, label, path }) => (
        <Link 
          key={path}
          to={path}
          className={cn(
            "flex flex-col items-center gap-1.5 transition-all duration-500 px-5 py-2 rounded-2xl relative",
            isActive(path) ? "text-serene-dark" : "text-serene-dark/20"
          )}
        >
          <Icon className={cn("w-5 h-5", isActive(path) && "scale-110")} />
          <span className="text-[8px] uppercase font-bold tracking-[0.2em]">{label}</span>
          {isActive(path) && (
            <motion.div 
              layoutId="mobile-nav-active"
              className="absolute inset-0 bg-serene-accent/10 rounded-2xl -z-10"
            />
          )}
        </Link>
      ))}
    </nav>
  );
};

import React from 'react';
import { Search, Bell, User, MessageSquare, Home, Calendar, Wallet as WalletIcon, ShieldCheck, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link, useLocation } from 'react-router-dom';

import { useSearch } from '../context/SearchContext';

export const Navbar = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <nav className="fixed top-0 left-20 right-0 z-50 h-16 glass hidden md:flex items-center justify-between px-8 border-b border-black/5">
      <div className="flex items-center gap-6 w-1/2">
        <div className="flex items-center gap-3 bg-white border border-black/10 rounded-full px-4 py-2 w-full max-w-md shadow-sm transition-all focus-within:ring-2 focus-within:ring-lumia-gold/20">
          <Search className="w-4 h-4 text-lumia-text/40" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ritual, specialist or center..." 
            className="bg-transparent border-none outline-none text-sm w-full text-lumia-text placeholder:text-lumia-text/20"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-[10px] uppercase font-bold text-lumia-text/30 hover:text-lumia-text transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 bg-white border border-black/10 rounded-full px-4 py-1.5 shadow-sm">
          <span className="text-[10px] uppercase tracking-widest text-lumia-text/40 font-bold">Wallet</span>
          <span className="font-mono text-sm font-medium text-lumia-emerald">KES 14,250.00</span>
        </div>
        <button className="relative p-2 text-lumia-text/40 hover:text-lumia-gold transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-lumia-gold rounded-full ring-2 ring-white"></span>
        </button>
        <div className="w-10 h-10 rounded-full bg-lumia-emerald/10 border border-lumia-emerald/20 p-[1px]">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elara" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export const MobileNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white flex md:hidden items-center justify-between px-6 border-b border-black/5 shadow-sm">
      <Link to="/" className="text-xl font-serif italic text-lumia-gold tracking-tight">Lumia.</Link>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-black/5 border border-black/10 rounded-full px-3 py-1 mr-2">
          <div className="w-1 h-1 bg-lumia-emerald rounded-full animate-pulse" />
          <span className="text-[8px] uppercase tracking-widest text-lumia-text/40 font-bold">Safe</span>
        </div>
        <button className="p-2 text-lumia-text/40 hover:text-lumia-gold transition-colors"><Search className="w-5 h-5" /></button>
        <button className="p-2 text-lumia-text/40 hover:text-lumia-gold transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-lumia-gold rounded-full ring-1 ring-white" />
        </button>
      </div>
    </nav>
  );
}

export const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: Home, path: '/explore' },
    { icon: Calendar, path: '/bookings' },
    { icon: WalletIcon, path: '/wallet' },
    { icon: MessageSquare, path: '/chat' },
    { icon: User, path: '/profile' }
  ];

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-20 flex flex-col items-center py-8 border-r border-black/5 bg-white z-50 hidden md:flex shadow-xl">
      <div className="mb-12">
        <Link to="/" className="w-12 h-12 rounded-2xl bg-lumia-emerald flex items-center justify-center shadow-[0_8px_20px_rgba(15,138,112,0.2)] hover:scale-105 transition-all">
          <Sparkles className="text-white w-6 h-6" />
        </Link>
      </div>
      
      <nav className="flex flex-col gap-10">
        {navItems.map(({ icon: Icon, path }) => (
          <Link 
            key={path}
            to={path}
            className={cn(
              "p-3 rounded-2xl transition-all duration-300",
              isActive(path) 
                ? "text-lumia-emerald bg-lumia-emerald/5 shadow-sm border border-lumia-emerald/10" 
                : "text-lumia-text/20 hover:text-lumia-emerald hover:bg-black/5"
            )}
          >
            <Icon className="w-6 h-6" />
          </Link>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="w-10 h-10 rounded-full bg-lumia-emerald/10 border border-lumia-emerald/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
          <ShieldCheck className="w-5 h-5 text-lumia-emerald" />
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
    { icon: MessageSquare, label: 'Concierge', path: '/chat' },
    { icon: WalletIcon, label: 'Wallet', path: '/wallet' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-white flex items-center justify-around md:hidden border-t border-black/5 px-2 pb-2 shadow-2xl">
      {navItems.map(({ icon: Icon, label, path }) => (
        <Link 
          key={path}
          to={path}
          className={cn(
            "flex flex-col items-center gap-1.5 transition-all duration-300 px-4 py-2 rounded-2xl",
            isActive(path) ? "text-lumia-emerald bg-lumia-emerald/5" : "text-lumia-text/20 hover:text-lumia-emerald"
          )}
        >
          <Icon className={cn("w-5 h-5", isActive(path) && "animate-pulse")} />
          <span className="text-[8px] uppercase font-bold tracking-[0.2em]">{label}</span>
        </Link>
      ))}
    </nav>
  );
};

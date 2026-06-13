import React from 'react';
import { cn } from '../lib/utils';
import { SERVICES } from '../data';
import { MapPin, Tag } from 'lucide-react';

interface FilterSidebarProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  sortByDistance: boolean;
  setSortByDistance: (sort: boolean) => void;
}

export const FilterSidebar = ({ activeCategory, setActiveCategory, sortByDistance, setSortByDistance }: FilterSidebarProps) => {
  return (
    <aside className="space-y-12">
      <section>
        <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-serene-dark/50 mb-6 flex items-center gap-2">
            <Tag className="w-3 h-3" />
            Category
        </h3>
        <div className="flex flex-col gap-3">
          {[{id: 'all', name: 'All Services'}, ...SERVICES].map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-300 text-left w-full",
                activeCategory === cat.id 
                  ? "bg-serene-dark text-serene-accent border-serene-dark shadow-md" 
                  : "bg-white border-black/5 hover:bg-serene-sage/5 hover:border-serene-sage/20 text-serene-dark/80"
              )}
            >
              <span className="text-sm font-bold tracking-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-serene-dark/50 mb-6 flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            Proximity
        </h3>
        <button 
            onClick={() => setSortByDistance(!sortByDistance)}
            className={cn(
                "w-full p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-300",
                sortByDistance
                    ? "bg-serene-dark text-serene-accent border-serene-dark shadow-md"
                    : "bg-white border-black/5 hover:bg-serene-sage/5 hover:border-serene-sage/20 text-serene-dark/80"
            )}
        >
            <span className="text-sm font-bold tracking-tight">Sort by Distance</span>
            <div className={cn("w-4 h-4 rounded-full border-2", sortByDistance ? "border-serene-accent bg-serene-accent" : "border-black/20")} />
        </button>
      </section>
    </aside>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { Quote } from 'lucide-react';
import { cn } from '../lib/utils';
import { TESTIMONIALS } from '../data'; // Use the shared testimonials if I had them, but I will stick to what's here but maybe update them

interface Testimonial {
  id: number;
  ritual: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

// Assuming the existing file structure. I'll keep the testimonials as they appear to be good.
const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 1,
    ritual: "Lumia Serenity Ritual™",
    name: "Amina K.",
    role: "Architect",
    quote: "The Serenity Ritual completely transformed my perspective on relaxation. I felt genuinely restored after just one session.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 2,
    ritual: "Lumia Deep Renewal™",
    name: "David N.",
    role: "Athlete",
    quote: "As an athlete, I've tried many therapies, but nothing compares to the deep renewal work here. Pure magic for muscle recovery.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 3,
    ritual: "Lumia Golden Harmony™",
    name: "Sarah M.",
    role: "Entrepreneur",
    quote: "The attention to detail and personalized care during the Golden Harmony ritual was exceptional. I cannot recommend it enough.",
    avatar: "https://images.unsplash.com/photo-1594744803329-a584af1eb518?auto=format&fit=crop&q=80&w=200"
  }
];

export const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const onDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = Math.abs(offset.x) > 50;
    if (swipe) {
      paginate(offset.x > 0 ? -1 : 1);
    }
  };

  const testimonial = TESTIMONIALS_DATA[index];

  return (
    <section className="py-24 md:py-32 bg-tranquil-cream/20 overflow-hidden">
      <div className="w-full max-w-5xl mx-auto px-6">
        <h3 className="text-center text-[10px] uppercase tracking-[0.5em] text-tranquil-teal font-bold mb-16">
          Voices of Tranquility
        </h3>
        
        <div className="relative h-[450px] sm:h-[400px] md:h-[300px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={testimonial.id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction < 0 ? 300 : -300 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={onDragEnd}
              className="absolute inset-0 flex flex-col md:flex-row items-center gap-10 md:gap-16 justify-center text-center md:text-left cursor-grab active:cursor-grabbing"
            >
              <div className="shrink-0 relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img src={testimonial.avatar} alt={testimonial.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-tranquil-teal text-white p-2 rounded-full shadow-lg">
                  <Quote className="w-4 h-4" />
                </div>
              </div>
              
              <div className="space-y-6 max-w-lg">
                <p className="text-xl md:text-2xl font-serif text-tranquil-text italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-tranquil-teal">{testimonial.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{testimonial.role} • <span className="text-tranquil-text/70">{testimonial.ritual}</span></p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {TESTIMONIALS_DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
              className={cn(
                "h-1 rounded-full transition-all duration-500",
                i === index ? "bg-tranquil-teal w-10" : "bg-tranquil-teal/20 w-4"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

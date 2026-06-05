import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote } from 'lucide-react';
import { cn } from '../lib/utils';

interface Testimonial {
  id: number;
  ritual: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
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

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const testimonial = TESTIMONIALS[index];

  return (
    <div className="w-full max-w-4xl mx-auto py-20 px-6">
      <h3 className="text-center text-[10px] uppercase tracking-[0.4em] text-tranquil-teal font-bold mb-12">Client Experiences</h3>
      
      <div className="relative h-[250px] md:h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col md:flex-row items-center gap-8 justify-center text-center md:text-left"
          >
            <div className="shrink-0">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
              </div>
            </div>
            
            <div className="space-y-4">
              <Quote className="w-8 h-8 text-tranquil-teal/20 mx-auto md:mx-0" />
              <p className="text-lg md:text-xl font-serif text-tranquil-text italic leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-tranquil-text">{testimonial.name}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{testimonial.role} • {testimonial.ritual}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              i === index ? "bg-tranquil-teal w-6" : "bg-tranquil-teal/20"
            )}
          />
        ))}
      </div>
    </div>
  );
};

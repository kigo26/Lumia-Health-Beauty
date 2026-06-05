import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import Markdown from 'react-markdown';

export const LumiaAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([
    { role: 'assistant', text: "Hello! I'm Lumia AI, your personal wellness concierge. How can I help you achieve your beauty and wellness goals today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/wellness-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: input,
          history: messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.text }]
          }))
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.text }]);
    } catch (error) {
      console.error('Lumia AI Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', text: "I'm sorry, I encountered an error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50 w-16 h-16 bg-lumia-gold rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.3)] flex items-center justify-center text-white border-4 border-white"
      >
        <Sparkles className="w-7 h-7" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed inset-0 md:inset-auto md:bottom-28 md:right-8 md:w-[450px] md:h-[650px] z-50 bg-white md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col border border-black/5"
          >
            <div className="bg-lumia-gold p-8 flex items-center justify-between text-white shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold tracking-tight text-lg">Lumia AI</h3>
                  <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-80">Personal Concierge</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-white/10 p-2 rounded-full transition-colors flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-lumia-bg scroll-smooth">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex gap-4", m.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-black/5 shadow-inner",
                    m.role === 'user' ? "bg-white text-lumia-gold" : "bg-lumia-gold text-white"
                  )}>
                    {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>
                  <div className={cn(
                    "p-5 rounded-3xl text-sm max-w-[85%] shadow-xl leading-relaxed transition-all",
                    m.role === 'user' ? "bg-white text-lumia-text rounded-tr-none border border-black/5" : "bg-white text-lumia-text rounded-tl-none border border-black/5"
                  )}>
                    <div className="prose prose-sm max-w-none prose-p:leading-relaxed text-lumia-text opacity-90">
                      <Markdown>{m.text}</Markdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-lumia-gold text-white flex items-center justify-center border border-black/5">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                  <div className="bg-white p-5 rounded-3xl rounded-tl-none border border-black/5 italic text-lumia-text/30 text-sm tracking-wide">
                    Lumia is ritualizing your request...
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-white border-t border-black/5 flex gap-3">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Seek a ritual or restore your peace..."
                className="flex-1 bg-lumia-bg border border-black/10 rounded-2xl px-6 py-4 outline-none text-sm focus:ring-1 focus:ring-lumia-gold/50 transition-all text-lumia-text placeholder:text-lumia-text/30"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-lumia-gold text-white p-4 rounded-2xl hover:brightness-110 transition-all disabled:opacity-30 shadow-xl shadow-lumia-gold/10"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

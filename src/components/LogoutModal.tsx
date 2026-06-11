import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, X } from 'lucide-react';

export const LogoutModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean, onClose: () => void, onConfirm: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center z-[101] p-4"
          >
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-black/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif text-serene-dark">Confirm Log Out</h3>
                <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full"><X className="w-4 h-4" /></button>
              </div>
              <p className="text-serene-dark/70 text-sm mb-8">Are you sure you want to sign out of Lumia?</p>
              <div className="flex gap-4">
                <button 
                  onClick={onClose}
                  className="flex-1 px-4 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-black/5 text-serene-dark hover:bg-black/10 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { onConfirm(); onClose(); }}
                  className="flex-1 px-4 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-rose-500 text-white hover:bg-rose-600 transition-all shadow-lg"
                >
                  Log Out
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

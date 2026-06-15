import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-8 left-8 z-50 flex items-center gap-2 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all text-serene-dark"
    >
      <ChevronLeft className="w-5 h-5" />
      <span className="text-xs font-bold uppercase tracking-widest mr-2">Back</span>
    </button>
  );
};

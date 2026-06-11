import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, Shield, User, Landmark, Briefcase } from 'lucide-react';
import { signInWithGoogle, getRedirectResult, auth, ensureUserProfile } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

export const Login = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  React.useEffect(() => {
    // Handle redirect result
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          ensureUserProfile(result.user)
            .then(() => toast.success('Successfully logged in!'))
            .catch(() => toast.error('Failed to create profile.'));
        }
      })
      .catch((error) => {
        console.error('Redirect error', error);
        toast.error('Login attempt failed or was cancelled. Please try again.');
      });
  }, []);

  React.useEffect(() => {
    if (user && profile) {
      navigate('/profile');
    }
  }, [user, profile, navigate]);

  const handleLogin = async (role: string) => {
    localStorage.setItem('login_role', role);
    try {
      await signInWithGoogle();
    } catch (error: any) {
      console.error('Login initiation failed', error);
      toast.error('Login attempt failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-tranquil-cream flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-black/5">
        
        {/* Left Side: Brand/Visual */}
        <div className="bg-tranquil-teal p-12 md:p-20 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Sparkles className="w-40 h-40" />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-8">
              Welcome to the <br />
              <span className="italic">Lumia Sanctuary</span>
            </h1>
            <p className="text-white/70 text-sm font-light leading-relaxed max-w-sm">
              Your gateway to refined restoration. Access your personalized wellness ritual center.
            </p>
          </div>

          <div className="relative z-10 flex gap-4 mt-8">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
              <Shield className="w-4 h-4 opacity-40" />
            </div>
            <p className="text-[10px] items-center flex font-bold uppercase tracking-[0.3em] opacity-40">Secure Biological Protocol</p>
          </div>
        </div>

        {/* Right Side: Action */}
        <div className="p-12 md:p-20 flex flex-col justify-center">
          <div className="mb-12">
            <h2 className="text-2xl font-serif text-tranquil-text italic mb-2">Access Portal</h2>
            <p className="text-xs text-gray-400 font-light tracking-wide uppercase">Institutional & Client Access</p>
          </div>

          <div className="space-y-6">
            <button 
              onClick={() => handleLogin('client')}
              className="w-full flex items-center justify-between p-6 bg-white border border-black/10 rounded-2xl hover:border-tranquil-teal hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-tranquil-teal/5 flex items-center justify-center text-tranquil-teal group-hover:bg-tranquil-teal group-hover:text-white transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-tranquil-text">Continue as Client</p>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Ritual Seeker</p>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-tranquil-teal opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                <span className="bg-white px-4 text-gray-300">Partner Access</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleLogin('provider')}
                className="p-6 border border-black/5 rounded-2xl flex flex-col items-center gap-3 hover:bg-tranquil-teal/5 hover:border-tranquil-teal transition-all group"
              >
                <Briefcase className="w-6 h-6 text-tranquil-teal opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-tranquil-text">Provider</span>
              </button>
              <button 
                onClick={() => handleLogin('owner')}
                className="p-6 border border-black/5 rounded-2xl flex flex-col items-center gap-3 hover:bg-tranquil-teal/5 hover:border-tranquil-teal transition-all group"
              >
                <Landmark className="w-6 h-6 text-tranquil-teal opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-tranquil-text">Owner</span>
              </button>
              <button 
                onClick={() => handleLogin('admin')}
                className="p-6 border border-black/5 rounded-2xl flex flex-col items-center gap-3 hover:bg-tranquil-teal/5 hover:border-tranquil-teal transition-all group"
              >
                <Shield className="w-6 h-6 text-tranquil-teal opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-tranquil-text">Admin</span>
              </button>
              <button 
                onClick={() => handleLogin('inspector')}
                className="p-6 border border-black/5 rounded-2xl flex flex-col items-center gap-3 hover:bg-tranquil-teal/5 hover:border-tranquil-teal transition-all group"
              >
                <User className="w-6 h-6 text-tranquil-teal opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-tranquil-text">Inspector</span>
              </button>
            </div>
          </div>
          
          <div className="mt-12 text-center text-[10px] text-gray-400 font-medium">
            <p>By entering the sanctuary, you agree to the <br /> <span className="text-tranquil-teal hover:underline cursor-pointer uppercase tracking-widest font-bold">Lumia Biological Terms of Service</span></p>
          </div>
        </div>

      </div>
    </div>
  );
};

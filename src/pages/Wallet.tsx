import React, { useState } from 'react';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Plus, History, Shield, CreditCard, Landmark, Loader2, X } from 'lucide-react';
import { motion } from 'motion/react';
import { formatCurrency } from '../lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_TRANS_HISTORY = [
  { date: '2024-05-01', amount: 5000 },
  { date: '2024-05-05', amount: 8000 },
  { date: '2024-05-10', amount: 4500 },
  { date: '2024-05-15', amount: 12000 },
  { date: '2024-05-20', amount: 9000 },
  { date: '2024-05-25', amount: 15000 },
  { date: '2024-05-30', amount: 13000 },
];

export const Wallet = () => {
  const [balance] = useState(25400);
  const [escrow] = useState(5000);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    setError(null);
    setIsConnecting(true);
    
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setAccount(accounts[0]);
      } catch (err: any) {
        console.error('MetaMask Connection Error:', err);
        setError(`Failed to connect to MetaMask: ${err.message || 'Unknown error'}`);
      } finally {
        setIsConnecting(false);
      }
    } else {
      setError('MetaMask is not installed. Please install it to use this feature.');
      setIsConnecting(false);
    }
  };

  return (
    <div className="pb-24 pt-24 px-8 max-w-7xl mx-auto">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-serif italic text-lumia-gold flex items-center gap-3">
            <WalletIcon className="w-10 h-10 text-lumia-emerald" />
            Financial Rituals
          </h1>
          <p className="text-lumia-text/60 mt-2 font-medium tracking-wide">Manage your earnings and restoration credits securely.</p>
        </div>
        
        {!account ? (
          <button 
            onClick={connectWallet}
            disabled={isConnecting}
            className="px-10 py-5 bg-lumia-gold text-white rounded-2xl font-bold text-[10px] tracking-widest uppercase hover:bg-lumia-gold-hover hover:scale-[1.02] transition-all shadow-[0_12px_40px_rgba(212,175,55,0.2)] flex items-center gap-3 disabled:opacity-50"
          >
            {isConnecting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Shield className="w-4 h-4" />
            )}
            Connect Secure Wallet
          </button>
        ) : (
          <div className="px-6 py-4 bg-lumia-emerald shadow-lg shadow-lumia-emerald/20 text-white rounded-2xl flex items-center gap-3">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            <span className="text-[10px] font-bold tracking-widest uppercase">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          </div>
        )}
      </header>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-red-50 border border-red-100 text-red-500 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center gap-3"
        >
          <X className="w-4 h-4" />
          {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Balance Card */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-lumia-champagne border border-black/5 rounded-[32px] p-10 text-lumia-text relative overflow-hidden shadow-2xl group">
            <div className="relative z-10">
              <p className="text-lumia-text/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-lumia-gold" /> Secured by Lumia Escrow™
              </p>
              <h2 className="text-6xl font-serif italic mb-10 tracking-tight text-lumia-text">{formatCurrency(balance)}</h2>
              <div className="flex flex-wrap gap-4">
                <button className="flex-1 bg-lumia-charcoal text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all uppercase text-[10px] tracking-widest shadow-xl hover:bg-black/80 hover:scale-[1.02]">
                  <Plus className="w-4 h-4" /> Top Up Wallet
                </button>
                <button className="flex-1 bg-white hover:bg-white/90 border border-black/5 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all uppercase text-[10px] tracking-widest text-lumia-charcoal shadow-sm hover:scale-[1.02]">
                  <ArrowUpRight className="w-4 h-4" /> Withdraw Funds
                </button>
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/20 blur-[100px] -mr-32 -mt-32 rounded-full transition-all group-hover:bg-white/30"></div>
          </div>

          {/* Earnings Chart */}
          <div className="premium-card p-10 h-[450px]">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-lumia-text/40 mb-8 flex items-center gap-2">
              <History className="w-4 h-4 text-lumia-gold" /> Revenue Rituals History
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_TRANS_HISTORY}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#5B667510" />
                  <XAxis dataKey="date" hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)' }}
                    itemStyle={{ color: '#5B6675', fontSize: '12px', fontWeight: 'bold' }}
                    formatter={(value) => formatCurrency(Number(value))}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#D4AF37" strokeWidth={4} fillOpacity={1} fill="url(#colorAmount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-8">
          <div className="bg-lumia-emerald/5 border border-lumia-emerald/20 rounded-[32px] p-8">
            <h3 className="font-bold text-lumia-emerald flex items-center gap-2 mb-4 uppercase text-[10px] tracking-widest">
              <Shield className="w-4 h-4" /> Active Escrow
            </h3>
            <p className="text-xs text-lumia-text/60 mb-6 leading-relaxed font-medium">Funds secured for pending services. Auto-released upon your confirmation.</p>
            <div className="text-3xl font-serif italic text-lumia-text mb-2">{formatCurrency(escrow)}</div>
            <div className="mt-6 pt-6 border-t border-lumia-emerald/10 text-[10px] text-lumia-emerald font-bold uppercase tracking-[0.2em] animate-pulse">
              Ready for release in 24h
            </div>
          </div>

          <div className="premium-card p-8">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-lumia-text/40 mb-6">Payment Methods</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/5 border border-black/5 hover:border-black/10 transition-all cursor-pointer">
                <div className="p-3 bg-black/5 rounded-xl text-lumia-text/40">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-lumia-text/90">Visa •••• 4242</p>
                  <p className="text-[10px] text-lumia-text/20 font-bold uppercase tracking-widest mt-1">Default Method</p>
                </div>
                <div className="w-2.5 h-2.5 bg-lumia-emerald rounded-full shadow-[0_0_10px_rgba(6,95,70,0.3)]"></div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/5 border border-black/5 hover:border-black/10 transition-all cursor-pointer">
                <div className="p-3 bg-black/5 rounded-xl text-lumia-text/40">
                  <Landmark className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-lumia-text/90">M-Pesa Express</p>
                  <p className="text-[10px] text-lumia-text/20 font-bold uppercase tracking-widest mt-1">Safaricom 0712***789</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-4 border-2 border-dashed border-black/5 rounded-2xl text-lumia-text/30 font-bold text-[10px] tracking-widest uppercase hover:text-lumia-gold hover:border-lumia-gold transition-all">
              + Register New Method
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

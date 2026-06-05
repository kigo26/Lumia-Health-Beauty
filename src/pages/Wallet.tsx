import React, { useState, useEffect } from 'react';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Plus, History, Shield, CreditCard, Landmark, Loader2, X, Gift } from 'lucide-react';
import { motion } from 'motion/react';
import { formatCurrency } from '../lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

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
  const { user } = useAuth();
  const [giftCards, setGiftCards] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetchGiftCards = async () => {
      const q = query(collection(db, 'gift_cards'), where('clientId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const cards = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGiftCards(cards);
    };
    fetchGiftCards();
  }, [user]);

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
    <div className="pb-32 pt-24 md:pt-32 px-4 md:px-8 max-w-[1600px] mx-auto">
      <header className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-black/5 pb-10">
        <div>
          <h1 className="text-4xl md:text-8xl font-serif tracking-tight text-serene-dark leading-[0.9] md:leading-[0.85]">
            Economic <br />
            <span className="italic text-serene-accent">Sanctuary</span>
          </h1>
          <p className="text-serene-dark/40 mt-6 md:mt-8 font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-xs">Manage Your Earnings • Escrow Protocol Active</p>
        </div>
        
        {!account ? (
          <button 
            onClick={connectWallet}
            disabled={isConnecting}
            className="w-full md:w-auto px-10 md:px-12 py-5 md:py-6 bg-serene-dark text-serene-white rounded-2xl md:rounded-[2rem] font-bold text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase hover:brightness-110 hover:scale-[1.02] transition-all shadow-2xl flex items-center justify-center gap-4 disabled:opacity-50"
          >
            {isConnecting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Shield className="w-5 h-5" />
            )}
            Authenticate Secure Wallet
          </button>
        ) : (
          <div className="px-8 py-5 bg-serene-dark shadow-2xl text-serene-white rounded-[2rem] flex items-center gap-4 border border-white/10">
            <div className="w-2.5 h-2.5 bg-serene-accent rounded-full animate-pulse shadow-[0_0_15px_rgba(226,194,164,0.8)]" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">
              {account.slice(0, 8)}...{account.slice(-6)}
            </span>
          </div>
        )}
      </header>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 p-6 bg-red-50 border border-red-100 text-red-500 rounded-[2rem] text-[10px] font-bold uppercase tracking-widest flex items-center gap-4"
        >
          <X className="w-5 h-5" />
          {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
        {/* Balance Card */}
        <div className="lg:col-span-2 space-y-8 md:space-y-12">
          <div className="bg-serene-cream border border-black/5 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 lg:p-20 text-serene-dark relative overflow-hidden shadow-2xl group">
            <div className="relative z-10">
              <p className="text-serene-dark/40 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] mb-6 md:mb-8 flex items-center gap-3">
                <Shield className="w-5 h-5 text-serene-sage" /> Secured by Serene Protocol™
              </p>
              <h2 className="text-5xl md:text-7xl lg:text-9xl font-serif italic mb-10 md:mb-16 tracking-tighter text-serene-dark">{formatCurrency(balance)}</h2>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <button className="flex-1 bg-serene-dark text-white py-5 md:py-6 rounded-2xl md:rounded-3xl font-bold flex items-center justify-center gap-4 transition-all uppercase text-[10px] tracking-[0.4em] md:tracking-[0.5em] shadow-2xl hover:scale-[1.02]">
                  <Plus className="w-5 h-5" /> Top Up Wallet
                </button>
                <button className="flex-1 bg-white border border-black/5 py-5 md:py-6 rounded-2xl md:rounded-3xl font-bold flex items-center justify-center gap-4 transition-all uppercase text-[10px] tracking-[0.4em] md:tracking-[0.5em] text-serene-dark shadow-sm hover:scale-[1.02]">
                  <ArrowUpRight className="w-5 h-5" /> Withdraw Funds
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/20 blur-[150px] -mr-48 -mt-48 rounded-full transition-all group-hover:bg-white/30"></div>
          </div>

          {/* Earnings Chart */}
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] border border-black/5 p-8 md:p-12 lg:p-16 h-[400px] md:h-[500px] shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-10 md:mb-12">
              <h3 className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-serene-dark/30 flex items-center gap-3">
                <History className="w-5 h-5 text-serene-sage" /> Economic Flow History
              </h3>
              <span className="hidden sm:block text-[9px] md:text-[10px] font-bold text-serene-sage tracking-widest uppercase">Live Updates Active</span>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_TRANS_HISTORY}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#b3b79a" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#b3b79a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB60" />
                  <XAxis dataKey="date" hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '24px', backgroundColor: '#FFFFFF', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: '#2d2d2d', fontSize: '14px', fontWeight: 'bold', fontFamily: 'serif', fontStyle: 'italic' }}
                    formatter={(value) => formatCurrency(Number(value))}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#b3b79a" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-12">
          <div className="bg-serene-dark rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-serene-accent/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-serene-accent/10 transition-all duration-700"></div>
            <h3 className="font-bold text-serene-accent flex items-center gap-3 mb-6 uppercase text-[10px] tracking-[0.4em] relative z-10">
              <Shield className="w-5 h-5" /> Active Escrow
            </h3>
            <p className="text-sm text-white/50 mb-10 leading-relaxed italic font-serif relative z-10">
              Funds currently secured for sanctuary rituals. Release authenticated upon your ritual confirmation.
            </p>
            <div className="text-5xl lg:text-6xl font-serif italic text-serene-accent mb-4 relative z-10">{formatCurrency(escrow)}</div>
            <div className="mt-10 pt-8 border-t border-white/5 text-[9px] text-serene-accent/40 font-bold uppercase tracking-[0.4em] animate-pulse relative z-10">
              Validated Release in 14:24:02
            </div>
          </div>

          <div className="bg-white rounded-[3rem] border border-black/5 p-10 shadow-sm">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-serene-dark/20 mb-8">Digital Gift Cards</h3>
            {giftCards.length > 0 ? (
              <div className="space-y-4">
                {giftCards.map((card) => (
                  <div key={card.id} className="p-6 rounded-[1.5rem] bg-serene-cream/5 border border-serene-sage/10 space-y-2">
                    <div className="flex items-center gap-3 text-serene-sage">
                       <Gift className="w-5 h-5" />
                       <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{card.service}</span>
                    </div>
                    <p className="font-mono text-serene-dark font-bold text-lg">{card.code}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[10px] text-serene-dark/30 font-bold uppercase tracking-widest text-center">No active gift cards</p>
            )}
          </div>

          <div className="bg-white rounded-[3rem] border border-black/5 p-10 shadow-sm">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-serene-dark/20 mb-8">Settlement Methods</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-5 p-6 rounded-[1.5rem] bg-serene-cream/5 border border-serene-sage/10 hover:border-serene-accent/30 transition-all duration-500 cursor-pointer group">
                <div className="p-4 bg-white rounded-xl text-serene-sage shadow-sm group-hover:scale-110 transition-transform">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-serene-dark tracking-tight">Visa Noir •••• 4242</p>
                  <p className="text-[9px] text-serene-sage font-bold uppercase tracking-[0.2em] mt-1 opacity-40">Primary Protocol</p>
                </div>
                <div className="w-3 h-3 bg-serene-accent rounded-full shadow-[0_0_15px_rgba(226,194,164,0.8)]"></div>
              </div>
              <div className="flex items-center gap-5 p-6 rounded-[1.5rem] bg-serene-cream/5 border border-serene-sage/10 hover:border-serene-accent/30 transition-all duration-500 cursor-pointer group opacity-60">
                <div className="p-4 bg-white rounded-xl text-serene-dark shadow-sm group-hover:scale-110 transition-transform">
                  <Landmark className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-serene-dark tracking-tight">Serene M-Pesa</p>
                  <p className="text-[9px] text-serene-dark/20 font-bold uppercase tracking-[0.2em] mt-1">Safaricom 0712***789</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-10 py-5 border-2 border-dashed border-serene-dark/5 rounded-[1.5rem] text-serene-dark/20 font-bold text-[9px] tracking-[0.3em] uppercase hover:text-serene-sage hover:border-serene-sage/30 transition-all">
              + Add Transaction Protocol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

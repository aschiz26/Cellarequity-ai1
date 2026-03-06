import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Wine, ShoppingBag, Bell, Camera, TrendingUp, ShieldCheck, Loader2, ArrowUpRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function CellarEquityApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isScanning, setIsScanning] = useState(false);
  const [portfolio, setPortfolio] = useState({ total_value: 0, roi: 0 });

  // 1. Live Data Fetching
  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data } = await supabase.from('portfolio_summary').select('*').single();
      if (data) setPortfolio({ total_value: data.total_value, roi: data.total_roi });
    };
    fetchPortfolio();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-wine-black text-white overflow-hidden">
      {/* High-End Header */}
      <header className="px-6 py-5 border-b border-wine-gold/10 flex justify-between items-center bg-black/60 backdrop-blur-lg z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-wine-burgundy border border-wine-gold/40 flex items-center justify-center rotate-45 shadow-[0_0_10px_#4A0404]">
            <span className="rotate-[-45deg] font-serif font-bold text-wine-gold text-xs">CE</span>
          </div>
          <h1 className="text-xl font-serif font-bold tracking-[0.15em] text-wine-gold uppercase">
            CellarEquity <span className="text-white/40 font-light italic">AI</span>
          </h1>
        </div>
        <div className="bg-wine-burgundy/10 border border-wine-burgundy/40 px-3 py-1 rounded-full">
          <span className="text-[9px] font-mono text-wine-gold uppercase tracking-widest">Estate Level</span>
        </div>
      </header>

      {/* Main App Content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar pb-32">
        {activeTab === 'dashboard' && <DashboardView data={portfolio} />}
        {activeTab === 'marketplace' && <MarketplaceView />}
        {activeTab === 'alerts' && <AlertsView />}
      </main>

      {/* Luxury Bottom Nav */}
      <nav className="fixed bottom-0 w-full bg-wine-slate/90 backdrop-blur-3xl border-t border-wine-gold/10 pb-10 pt-4 flex justify-around items-center z-50">
        <NavButton icon={<LayoutDashboard size={22}/>} label="Executive" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
        <NavButton icon={<ShoppingBag size={22}/>} label="Exchange" active={activeTab === 'marketplace'} onClick={() => setActiveTab('marketplace')} />
        <div className="mt-[-45px]">
          <button onClick={() => setIsScanning(true)} className="w-16 h-16 bg-wine-burgundy border-2 border-wine-gold rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(74,4,4,0.8)] active:scale-95 transition-all">
            <Camera size={28} className="text-wine-gold" />
          </button>
        </div>
        <NavButton icon={<Bell size={22}/>} label="Actions" active={activeTab === 'alerts'} onClick={() => setActiveTab('alerts')} badge="3" />
        <NavButton icon={<Wine size={22}/>} label="Vault" onClick={() => {}} />
      </nav>

      {isScanning && <ScannerOverlay onClose={() => setIsScanning(false)} />}
    </div>
  );
}

// --- VIEW COMPONENTS ---

function DashboardView({ data }) {
  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-1000">
      <div className="glass-card p-6 border-wine-gold/30">
        <p className="text-[10px] uppercase tracking-[0.4em] text-wine-gold/50 mb-3 font-mono">Consolidated Portfolio Value</p>
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-5xl font-serif font-medium">${data.total_value.toLocaleString()}</h2>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-green-500 font-mono text-sm flex items-center gap-1">
                <TrendingUp size={16} /> +{data.roi}%
              </span>
              <span className="text-white/20 text-[10px] font-mono uppercase tracking-tighter">Annualized ROI</span>
            </div>
          </div>
          <div className="h-12 w-24 flex items-end gap-1 pb-1">
             {[40, 70, 45, 90, 65, 80].map((h, i) => (
                <div key={i} className="bg-wine-gold/20 w-full rounded-t-sm" style={{ height: `${h}%` }}></div>
             ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4">
          <p className="text-[9px] text-white/40 uppercase font-mono">Liquidity</p>
          <p className="text-2xl font-serif text-wine-gold">88<span className="text-xs text-white/30">/100</span></p>
        </div>
        <div className="glass-card p-4">
          <p className="text-[9px] text-white/40 uppercase font-mono">Strategic Assets</p>
          <p className="text-2xl font-serif">14</p>
        </div>
      </div>
    </div>
  );
}

function MarketplaceView() {
  return (
    <div className="p-6 space-y-4 animate-in slide-in-from-right-8 duration-500">
      <h3 className="font-serif text-2xl text-wine-gold mb-6">Global Exchange</h3>
      {[1, 2].map((i) => (
        <div key={i} className="glass-card overflow-hidden group">
          <div className="p-5 flex justify-between items-start">
             <div>
               <p className="text-[9px] font-mono text-wine-gold uppercase">Bordeaux, France</p>
               <h4 className="font-serif text-xl mt-1">Château Mouton Rothschild</h4>
               <p className="text-white/40 text-[10px] font-mono mt-1">2010 • Liquidity: 94/100</p>
             </div>
             <div className="text-right">
               <p className="text-[9px] text-white/30 font-mono uppercase">Asking</p>
               <p className="text-xl font-serif font-bold">$1,250</p>
             </div>
          </div>
          <div className="bg-wine-burgundy/20 px-5 py-3 border-t border-white/5 flex justify-between items-center">
             <span className="text-[10px] font-mono text-green-400">+18.2% Potential ROI</span>
             <button className="text-[10px] font-bold font-mono text-wine-gold uppercase tracking-widest border border-wine-gold/40 px-3 py-1.5 rounded hover:bg-wine-gold hover:text-black transition-all">Acquire</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function AlertsView() {
  return (
    <div className="p-6 space-y-4">
      <div className="bg-wine-burgundy/10 border border-wine-burgundy/40 rounded-xl p-5 flex gap-4">
         <div className="p-3 bg-wine-burgundy rounded-full text-wine-gold shadow-lg"><TrendingUp size={20}/></div>
         <div>
            <h4 className="font-serif text-wine-gold uppercase text-xs tracking-[0.2em]">Strategic Exit Window</h4>
            <p className="text-xs text-white/70 mt-2 leading-relaxed font-light">
              Market data indicates a 12%+ value spike for your 2012 Dom Pérignon. Combined with high liquidity (91/100), current conditions may be optimal for a portfolio rebalance.
            </p>
            <button className="mt-4 text-[10px] font-mono text-wine-gold border-b border-wine-gold/30 pb-0.5">VIEW MARKET ANALYTICS →</button>
         </div>
      </div>
    </div>
  );
}

function ScannerOverlay({ onClose }) {
  return (
    <div className="fixed inset-0 bg-wine-black/98 z-[100] flex flex-col items-center justify-center p-8 backdrop-blur-3xl animate-in fade-in duration-300">
      <div className="relative w-full aspect-[3/4] max-w-sm border border-wine-gold/20 rounded-[2rem] overflow-hidden flex flex-col items-center justify-center bg-wine-slate/20">
        <div className="absolute top-0 left-0 w-full h-1 bg-wine-gold shadow-[0_0_25px_#D4AF37] animate-scan"></div>
        <Loader2 className="animate-spin text-wine-gold mb-4" size={40} strokeWidth={1} />
        <div className="text-center">
          <p className="font-mono text-wine-gold text-[10px] tracking-[0.5em] animate-pulse">DECRYPTING ASSET METADATA</p>
          <p className="text-white/20 text-[8px] font-mono mt-2 uppercase">Querying Global Auction Indices...</p>
        </div>
      </div>
      <button onClick={onClose} className="mt-16 text-white/30 font-mono text-xs uppercase tracking-widest border-b border-white/10 pb-1 hover:text-white transition-colors">Abort Mission</button>
    </div>
  );
}

function NavButton({ icon, label, active, onClick, badge }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-wine-gold' : 'text-white/30 hover:text-white/60'}`}>
      <div className="relative">
        {icon}
        {badge && <span className="absolute -top-1.5 -right-2 bg-wine-burgundy text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-wine-black">{badge}</span>}
      </div>
      <span className="text-[9px] font-mono uppercase tracking-tighter mt-1">{label}</span>
    </button>
  );
}

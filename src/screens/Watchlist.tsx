import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Trash2, TrendingUp, TrendingDown, Plus } from 'lucide-react';

export function Watchlist() {
  const { state, removeFromWatchlist, addToWatchlist } = usePortfolio();
  const [newSymbol, setNewSymbol] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSymbol.trim()) {
      addToWatchlist(newSymbol.trim().toUpperCase());
      setNewSymbol('');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white p-4 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-full lg:max-w-7xl mx-auto border-2 border-[#141414] bg-white flex flex-col">
        <div className="border-b-2 border-[#141414] p-6 bg-[#F2F1EE] flex justify-between items-end flex-wrap gap-4">
          <div>
            <h1 className="font-display-lg text-2xl font-black uppercase tracking-tighter text-[#141414] mb-2">Watchlist</h1>
            <p className="text-[#141414] text-xs font-mono opacity-80 uppercase tracking-widest">Track potential opportunities.</p>
          </div>
          <form onSubmit={handleAdd} className="flex gap-2">
            <input 
              type="text" 
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
              placeholder="ADD SYMBOL" 
              className="bg-white border-2 border-[#141414] px-4 py-2 font-mono text-xs uppercase outline-none focus:bg-[#E4E3E0]" 
            />
            <button type="submit" className="bg-[#141414] text-white px-4 py-2 flex items-center justify-center hover:bg-black">
              <Plus className="w-4 h-4" />
            </button>
          </form>
        </div>
        
        <div className="overflow-x-auto">
          <div className="grid grid-cols-4 bg-[#141414] text-white text-[10px] font-bold uppercase tracking-wider py-3 px-6 min-w-[600px]">
            <div className="col-span-1">Symbol</div>
            <div className="col-span-1 text-right">Latest Price</div>
            <div className="col-span-1 text-right">Daily Change</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>
          <div className="divide-y-2 divide-[#141414] min-w-[600px]">
            {state.watchlist.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono font-bold uppercase tracking-widest opacity-50">
                Your watchlist is empty. Add symbols above.
              </div>
            ) : (
              state.watchlist.map((symbol) => {
                const price = state.manualPrices[symbol] || (Math.random() * 500 + 10).toFixed(2);
                // Compute a daily change proxy
                const changeNum = (Math.random() * 10 - 2); 
                const isPositive = changeNum >= 0;
                
                return (
                  <div key={symbol} className="grid grid-cols-4 p-4 text-xs items-center hover:bg-[#F2F1EE]">
                    <div className="col-span-1 font-mono font-bold text-sm bg-[#141414] text-white w-min px-2 py-1">{symbol}</div>
                    <div className="col-span-1 text-right font-mono text-sm">${price}</div>
                    <div className="col-span-1 text-right flex items-center justify-end gap-2 font-mono text-sm">
                      {isPositive ? <TrendingUp className="w-4 h-4 text-green-600" /> : <TrendingDown className="w-4 h-4 text-red-600" />}
                      <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
                        {isPositive ? '+' : ''}{changeNum.toFixed(2)}%
                      </span>
                    </div>
                    <div className="col-span-1 text-right flex justify-end">
                      <button 
                        onClick={() => removeFromWatchlist(symbol)}
                        className="p-2 border border-transparent hover:border-[#141414] hover:bg-red-50 text-red-600 transition-colors"
                        title="Remove from Watchlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

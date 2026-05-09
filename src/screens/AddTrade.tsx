import { useState, useEffect } from 'react';
import { X, Search, ChevronUp, ChevronDown, Info, BarChart2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface AddTradeProps {
  onBack: () => void;
}

export function AddTrade({ onBack }: AddTradeProps) {
  const { addTrade, state, getCurrentPrice } = usePortfolio();
  
  const [symbol, setSymbol] = useState('AAPL');
  const [name, setName] = useState('Apple Inc.');
  const [quantity, setQuantity] = useState(10);
  
  const currentPrice = getCurrentPrice(symbol);
  const [price, setPrice] = useState(currentPrice);

  useEffect(() => {
    setPrice(getCurrentPrice(symbol));
  }, [symbol, state.manualPrices, state.livePrices]);

  const handleCommit = () => {
    if (symbol.trim() !== '') {
      addTrade(symbol.trim().toUpperCase(), name, quantity, price);
      onBack();
    }
  };

  const handleSelect = (s: string, n: string) => {
    setSymbol(s);
    setName(n);
  };

  const estimatedTotal = quantity * currentPrice;

  return (
    <div className="flex bg-[#E4E3E0] p-4 lg:p-8 h-screen w-full overflow-hidden">
      <div className="flex-1 border-[8px] border-[#141414] bg-white flex flex-col shadow-xl">
        <header className="flex justify-between items-center px-6 h-16 w-full sticky top-0 z-40 bg-[#F2F1EE] border-b-2 border-[#141414]">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="hover:bg-[#141414] hover:text-white border-2 border-transparent hover:border-[#141414] p-1 transition-colors flex items-center justify-center text-[#141414]"
            >
              <X className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-black uppercase tracking-tight text-[#141414]">Add Trade Entry</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleCommit} className="px-6 py-2 bg-[#141414] text-white text-xs font-bold uppercase tracking-widest border border-[#141414] hover:opacity-90 transition-opacity">
              Commit Trade
            </button>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto w-full p-0 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 flex-1">
            <div className="md:col-span-8 flex flex-col lg:border-r-2 border-[#141414]">
              <div className="p-6 border-b-2 border-[#141414]">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block">Select Instrument</label>
                    <div className="relative">
                      <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#141414] opacity-50" />
                      <input
                        type="text"
                        placeholder="SEARCH BY TICKER (e.g. MSFT)"
                        value={symbol}
                        onChange={(e) => {
                          setSymbol(e.target.value.toUpperCase());
                          setName(e.target.value.toUpperCase());
                        }}
                        className="w-full pl-12 pr-4 py-3 bg-transparent border-2 border-[#141414] outline-none text-xs font-mono font-bold uppercase transition-all placeholder-[#141414] placeholder-opacity-30"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {[{sym: 'AAPL', name: 'Apple Inc.'}, {sym: 'TSLA', name: 'Tesla, Inc.'}, {sym: 'GOOG', name: 'Alphabet Inc.'}].map(({sym, name}) => (
                        <button 
                          key={sym}
                          onClick={() => handleSelect(sym, name)}
                          className={`flex flex-col items-center p-3 border-2 border-[#141414] transition-colors ${symbol === sym ? 'bg-[#141414] text-white' : 'bg-white text-[#141414] hover:bg-[#F2F1EE]'}`}>
                          <span className="font-mono text-sm font-bold">{sym}</span>
                          <span className="text-[10px] uppercase font-bold tracking-widest opacity-80 mt-1">{name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block">Quantity</label>
                       <div className="relative">
                          <input 
                            type="number" 
                            step="0.01" 
                            value={quantity}
                            onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
                            className="w-full px-4 py-3 bg-white border-2 border-[#141414] outline-none font-mono text-lg transition-all text-[#141414]" 
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-0 text-[#141414]">
                            <button onClick={() => setQuantity(q => q + 1)} className="hover:bg-[#141414] hover:text-white"><ChevronUp className="w-4 h-4 cursor-pointer" /></button>
                            <button onClick={() => setQuantity(q => Math.max(0, q - 1))} className="hover:bg-[#141414] hover:text-white"><ChevronDown className="w-4 h-4 cursor-pointer" /></button>
                          </div>
                       </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block">Price per Share</label>
                      <div className="relative flex items-center">
                         <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-lg font-bold text-[#141414]">$</span>
                         <input 
                           type="number"
                           step="0.01"
                           value={price}
                           onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                           className="w-full pl-8 pr-4 py-3 bg-white border-2 border-[#141414] outline-none font-mono text-lg transition-all text-[#141414] focus:bg-[#F2F1EE]"
                         />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t-2 border-[#141414] space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-sm font-bold uppercase tracking-widest">Estimated Total</span>
                        <span className="font-mono text-2xl font-black tracking-tighter text-[#141414]">${(quantity * price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                     </div>
                     <div className="flex justify-between items-center opacity-50">
                        <span className="text-xs font-bold uppercase tracking-widest">Transaction Fee (0.05%)</span>
                        <span className="font-mono text-sm font-bold">${((quantity * price) * 0.0005).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 bg-[#141414] text-white flex flex-col justify-between p-6">
              <div>
                <div className="mb-8">
                  <div className="w-16 h-16 bg-white text-[#141414] flex items-center justify-center font-bold text-2xl font-mono mb-4">
                    {symbol.substring(0, 3)}
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight">{symbol || 'UNKNOWN'}</h3>
                </div>

                <div className="space-y-6">
                  <div className="relative h-40 w-full overflow-hidden border-2 border-white/20">
                     <div className="absolute inset-0 bg-white/5 disabled flex flex-col items-center justify-center gap-2">
                       <BarChart2 className="w-8 h-8 opacity-50" />
                       <span className="text-xs font-mono opacity-50 uppercase font-bold tracking-widest">Chart Data Loading...</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

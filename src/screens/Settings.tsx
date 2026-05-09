import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export function Settings() {
  const { state, factoryReset, clearAllData, updateManualPrice } = usePortfolio();

  return (
    <div className="flex-1 overflow-y-auto bg-white p-4 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-full lg:max-w-7xl mx-auto border-2 border-[#141414] bg-white flex flex-col">
        <div className="border-b-2 border-[#141414] p-6 bg-[#F2F1EE]">
          <h1 className="font-display-lg text-2xl font-black uppercase tracking-tighter text-[#141414] mb-2">Settings</h1>
          <p className="text-[#141414] text-xs font-mono opacity-80 uppercase tracking-widest">System configuration & market pricing.</p>
        </div>

        <div className="grid grid-cols-12 gap-0">
          <div className="col-span-12 lg:col-span-8 flex flex-col border-r-0 lg:border-r-2 border-b-2 lg:border-b-0 border-[#141414]">
            <div className="bg-white p-0">
              <div className="flex justify-between items-center p-4 border-b-2 border-[#141414] bg-[#F2F1EE]">
                <h2 className="text-xs font-bold uppercase tracking-widest opacity-50">Market Price Data Feed Config</h2>
              </div>
              <div className="p-6">
                <p className="text-xs font-mono mb-6">Modify these "market prices" to quickly simulate how changes affect your portfolio.</p>
                <div className="space-y-4">
                  {Object.entries(state.manualPrices).map(([symbol, price]) => (
                    <div key={symbol} className="flex items-center gap-4">
                      <div className="bg-[#141414] text-white px-3 py-2 font-bold font-mono text-sm w-20 text-center">{symbol}</div>
                      <div className="relative flex-1">
                         <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm font-bold opacity-50">$</span>
                         <input 
                           type="number"
                           value={price}
                           step="0.01"
                           onChange={(e) => updateManualPrice(symbol, parseFloat(e.target.value) || 0)}
                           className="w-full pl-8 pr-4 py-3 bg-white border-2 border-[#141414] font-mono outline-none text-sm transition-all focus:bg-[#F2F1EE]"
                         />
                      </div>
                    </div>
                  ))}
                  {Object.keys(state.manualPrices).length === 0 && (
                     <p className="font-mono text-xs opacity-50">No prices configured. Add holdings to start tracking.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col">
            <div className="bg-[#141414] text-white p-6 flex-1">
               <h3 className="font-black text-xl uppercase tracking-wider mb-2">System Reset</h3>
               <p className="text-xs font-mono opacity-80 mb-6 flex-1">Perform hard resets of local storage and cache.</p>
               
               <div className="space-y-4 mt-auto block">
                 <button 
                  onClick={factoryReset}
                  className="w-full bg-white text-[#141414] py-3 text-xs uppercase font-black tracking-widest hover:bg-[#E4E3E0] transition-colors">
                   Factory Reset Data
                 </button>
                 <button 
                  onClick={clearAllData}
                  className="w-full bg-transparent border-2 border-white text-white py-3 text-xs uppercase font-black tracking-widest hover:bg-white hover:text-[#141414] transition-colors">
                   Clear All Data
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export function TradeHistory() {
  const { state } = usePortfolio();
  return (
    <div className="flex-1 overflow-y-auto bg-white p-4 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-full lg:max-w-7xl mx-auto border-2 border-[#141414] bg-white flex flex-col">
        <div className="border-b-2 border-[#141414] p-6 bg-[#F2F1EE]">
          <h1 className="font-display-lg text-2xl font-black uppercase tracking-tighter text-[#141414] mb-2">Trade History</h1>
          <p className="text-[#141414] text-xs font-mono opacity-80 uppercase tracking-widest">A record of your executed transactions.</p>
        </div>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-5 bg-[#141414] text-white text-[10px] font-bold uppercase tracking-wider py-3 px-6">
            <div className="col-span-2">Date & Time</div>
            <div>Symbol</div>
            <div className="text-right">Quantity</div>
            <div className="text-right">Execution Price</div>
          </div>
          <div className="divide-y-2 divide-[#141414]">
            {state.trades.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono font-bold uppercase tracking-widest opacity-50">
                No trades executed yet.
              </div>
            ) : (
              state.trades.map((trade) => (
                <div key={trade.id} className="grid grid-cols-5 p-4 text-xs hover:bg-[#F2F1EE] cursor-default items-center">
                  <div className="col-span-2 font-mono">
                    {new Date(trade.date).toLocaleString()}
                  </div>
                  <div>
                    <span className="bg-[#141414] text-white px-2 py-0.5 font-bold font-mono">{trade.symbol}</span>
                  </div>
                  <div className="text-right font-mono">{trade.quantity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div className="text-right font-mono">${trade.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, PieChart, Shield, Download, Save, Edit2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export function PortfolioReview() {
  const { state, getCurrentPrice } = usePortfolio();
  const [filename, setFilename] = useState('portfolio_results.csv');
  
  const totalMarketValue = state.holdings.reduce((sum, h) => {
    const price = getCurrentPrice(h.symbol);
    return sum + (h.quantity * price);
  }, 0);

  const handleExport = () => {
    const headers = ['Symbol', 'Name', 'Quantity', 'Avg Price', 'Market Price', 'Market Value'];
    const rows = state.holdings.map(h => {
      const marketPrice = getCurrentPrice(h.symbol);
      const marketValue = h.quantity * marketPrice;
      return [
        h.symbol,
        `"${h.name}"`,
        h.quantity,
        h.avgPrice,
        marketPrice,
        marketValue
      ].join(',');
    });
    
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white p-4 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-full lg:max-w-7xl mx-auto border-2 border-[#141414] bg-white flex flex-col">
        {/* Header Section */}
        <div className="border-b-2 border-[#141414] p-6 bg-[#F2F1EE]">
          <h1 className="font-display-lg text-2xl font-black uppercase tracking-tighter text-[#141414] mb-2">PortfoliX Final Review</h1>
          <p className="text-[#141414] text-xs font-mono opacity-80 uppercase tracking-widest">Confirm your asset distribution and export your institutional report.</p>
        </div>

        <div className="grid grid-cols-12 gap-0">
          {/* Main Breakdown */}
          <div className="col-span-12 lg:col-span-8 flex flex-col border-r-0 lg:border-r-2 border-b-2 lg:border-b-0 border-[#141414]">
            {/* Detailed Breakdown Table */}
            <div className="bg-white p-0">
              <div className="flex justify-between items-center p-4 border-b-2 border-[#141414] bg-[#F2F1EE]">
                <h2 className="text-xs font-bold uppercase tracking-widest opacity-50">Asset Breakdown</h2>
                <span className="bg-[#141414] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                  Confirmed
                </span>
              </div>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-5 bg-[#141414] text-white text-[10px] font-bold uppercase tracking-wider py-3 px-6">
                  <div className="col-span-2">Name</div>
                  <div className="text-right">Quantity</div>
                  <div className="text-right">Market Price</div>
                  <div className="text-right">Value</div>
                </div>
                <div className="divide-y-2 divide-[#141414] border-b-2 border-[#141414]">
                  {state.holdings.length === 0 ? (
                    <div className="p-8 text-center text-xs font-mono font-bold uppercase tracking-widest opacity-50">
                      No holdings to review.
                    </div>
                  ) : (
                    state.holdings.map((h) => {
                      const marketPrice = getCurrentPrice(h.symbol) || h.avgPrice;
                      const marketValue = h.quantity * marketPrice;
                      return (
                        <div key={h.symbol} className="grid grid-cols-5 p-4 text-xs items-center hover:bg-[#F2F1EE]">
                          <div className="col-span-2 flex items-center gap-3">
                            <div className="bg-[#141414] text-white px-2 py-0.5 font-bold font-mono">{h.symbol}</div>
                            <div>
                              <p className="font-bold uppercase tracking-wide">{h.name}</p>
                            </div>
                          </div>
                          <div className="text-right font-mono">{h.quantity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                          <div className="text-right font-mono">${marketPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                          <div className="text-right font-mono font-bold">${marketValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="grid grid-cols-5 bg-[#E4E3E0] p-6 items-center">
                  <div className="col-span-3 text-[10px] font-bold uppercase tracking-widest opacity-50">Total Investment Value</div>
                  <div className="col-span-2 text-right font-mono text-3xl font-black tracking-tighter text-[#141414]">${totalMarketValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-0 border-t-2 border-[#141414]">
              <div className="bg-white p-6 border-r-2 border-[#141414] border-b-2 lg:border-b-0">
                <p className="text-[10px] font-bold uppercase opacity-50 mb-4">Diversification</p>
                <div className="flex items-center gap-4">
                  <PieChart className="w-8 h-8 text-[#141414]" />
                  <p className="font-mono text-xl font-bold uppercase tracking-tight">High Rel.</p>
                </div>
              </div>
              <div className="bg-[#F2F1EE] p-6 border-b-2 lg:border-b-0 border-[#141414]">
                <p className="text-[10px] font-bold uppercase opacity-50 mb-4">Risk Profile</p>
                <div className="flex items-center gap-4">
                  <Shield className="w-8 h-8 text-[#141414]" />
                  <p className="font-mono text-xl font-bold uppercase tracking-tight">Aggressive</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="col-span-12 lg:col-span-4 flex flex-col">
            {/* Export Card */}
            <div className="bg-[#141414] text-white p-6 relative overflow-hidden flex-1 border-b-2 border-[#141414] lg:border-b-0">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Download className="w-32 h-32" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-xl uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Save className="w-5 h-5 text-white" />
                    Save to File
                  </h3>
                  <p className="text-xs font-mono opacity-80 mb-6">Prepare your data for external analysis or record keeping.</p>

                  <div className="space-y-4">
                    <div className="group">
                      <label htmlFor="filename" className="block text-[10px] font-bold uppercase tracking-widest opacity-50 mb-2">Filename</label>
                      <div className="relative">
                        <input
                          type="text"
                          id="filename"
                          value={filename}
                          onChange={(e) => setFilename(e.target.value)}
                          className="w-full bg-transparent border-2 border-white focus:outline-none p-3 text-xs font-mono transition-all text-white placeholder-white/50 rounded-none"
                        />
                        <Edit2 className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-50" />
                      </div>
                    </div>

                    <div className="bg-transparent border border-white/30 p-4">
                      <p className="text-[10px] uppercase font-bold tracking-widest opacity-50 mb-3">Export Format</p>
                      <div className="flex gap-2">
                        <span className="bg-white text-[#141414] px-4 py-1.5 text-xs font-bold font-mono tracking-widest cursor-pointer border border-transparent">.CSV</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleExport}
                  className="w-full bg-white text-[#141414] py-4 text-xs uppercase font-black tracking-widest flex items-center justify-center gap-2 hover:bg-[#E4E3E0] transition-colors mt-8"
                >
                  <Download className="w-4 h-4" />
                  Export Results
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

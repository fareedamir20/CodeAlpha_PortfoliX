import React from 'react';
import { TrendingUp, TrendingDown, Activity, Globe, DollarSign } from 'lucide-react';

export function MarketAnalysis() {
  const indices = [
    { name: 'S&P 500', value: '5,088.80', change: '+0.03%', isPositive: true },
    { name: 'Dow Jones', value: '39,131.53', change: '+0.16%', isPositive: true },
    { name: 'Nasdaq Composite', value: '15,996.82', change: '-0.28%', isPositive: false },
    { name: 'Russell 2000', value: '2,016.69', change: '+0.14%', isPositive: true },
  ];

  const sectors = [
    { name: 'Technology', performance: '+1.2%', isPositive: true },
    { name: 'Healthcare', performance: '-0.5%', isPositive: false },
    { name: 'Financials', performance: '+0.8%', isPositive: true },
    { name: 'Consumer Discretionary', performance: '-1.1%', isPositive: false },
    { name: 'Energy', performance: '+2.4%', isPositive: true },
    { name: 'Industrials', performance: '+0.3%', isPositive: true },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-white p-4 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-full lg:max-w-7xl mx-auto border-2 border-[#141414] bg-white flex flex-col">
        <div className="border-b-2 border-[#141414] p-6 bg-[#F2F1EE]">
          <h1 className="font-display-lg text-2xl font-black uppercase tracking-tighter text-[#141414] mb-2">Market Analysis</h1>
          <p className="text-[#141414] text-xs font-mono opacity-80 uppercase tracking-widest">Global macro trends and technical indicators.</p>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {indices.map(index => (
            <div key={index.name} className="border-2 border-[#141414] p-4 flex flex-col justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-50 mb-2">{index.name}</span>
              <span className="font-mono text-2xl font-black tracking-tighter">{index.value}</span>
              <div className="flex items-center gap-2 mt-2">
                {index.isPositive ? <TrendingUp className="w-4 h-4 text-green-600" /> : <TrendingDown className="w-4 h-4 text-red-600" />}
                <span className={`font-mono text-xs font-bold ${index.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {index.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-[#141414] grid grid-cols-1 lg:grid-cols-2">
          <div className="border-b-2 lg:border-b-0 lg:border-r-2 border-[#141414] p-6 md:p-8">
            <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-6">
              <Globe className="w-4 h-4" /> Sector Performance
            </h2>
            <div className="space-y-4">
              {sectors.map(sector => (
                <div key={sector.name} className="flex justify-between items-center border-b border-[#141414]/20 pb-2">
                  <span className="font-mono text-xs font-bold uppercase">{sector.name}</span>
                  <span className={`font-mono text-xs font-bold ${sector.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {sector.performance}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-6 md:p-8 bg-[#141414] text-white">
            <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-6">
              <Activity className="w-4 h-4" /> Market Sentiment
            </h2>
            
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-50 block mb-2">Fear & Greed Index</span>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-white/20 h-3 flex">
                    <div className="bg-green-500 h-full w-[65%]"></div>
                  </div>
                  <span className="font-mono text-lg font-bold">65 <span className="text-xs font-normal opacity-50 ml-1">Greed</span></span>
                </div>
              </div>
              
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-50 block mb-2">VIX (Volatility)</span>
                <div className="flex justify-between items-end">
                  <span className="font-mono text-2xl font-black">13.75</span>
                  <span className="font-mono text-xs text-green-400">-0.21 (-1.5%)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/20">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-50 block mb-2">Analyst Commentary</span>
                <p className="font-mono text-[10px] leading-relaxed opacity-80">
                  &gt; Markets digesting recent earnings data. Tech sector remains resilient despite higher Treasury yields. Consumer sentiment improving slightly ahead of upcoming holiday season. Expected consolidation near all-time highs before next major catalyst.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { TrendingUp, Download, Filter, ChevronRight, Landmark } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export function Dashboard() {
  const { state, getCurrentPrice } = usePortfolio();

  const totalInvested = state.holdings.reduce((sum, h) => sum + (h.quantity * h.avgPrice), 0);
  const totalMarketValue = state.holdings.reduce((sum, h) => {
    const price = getCurrentPrice(h.symbol);
    return sum + (h.quantity * price);
  }, 0);
  const totalReturnPercent = totalInvested > 0 ? ((totalMarketValue - totalInvested) / totalInvested) * 100 : 0;
  const isPositive = totalReturnPercent >= 0;

  return (
    <section className="flex-1 overflow-y-auto p-margin-desktop space-y-gutter pb-8">
      <div className="grid grid-cols-12 gap-0 border-b-2 border-[#141414]">
        <div className="col-span-12 lg:col-span-8 p-stack-lg bg-[#141414] text-white relative overflow-hidden min-h-[240px] flex flex-col justify-between border-r-2 border-[#141414] lg:border-r-0 lg:border-b-0 border-b-2">
          <div className="z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E4E3E0] opacity-80">
                Core Metrics Console &gt; Total Value
              </span>
            </div>
            <h1 className="font-mono text-5xl tracking-tighter mt-2">
               ${totalMarketValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h1>
            <div className="flex items-center gap-2 mt-4 font-mono">
              <span className={`border px-2 py-0.5 text-xs font-bold flex items-center gap-1 ${isPositive ? 'text-green-400 border-white' : 'text-red-400 border-white'}`}>
                <TrendingUp className={`w-3 h-3 ${isPositive ? '' : 'rotate-180'}`} />
                {totalReturnPercent > 0 ? '+' : ''}{totalReturnPercent.toFixed(2)}%
              </span>
              <span className="text-[#E4E3E0] text-xs underline">
                Invested: ${totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
          <div className="z-10 flex gap-4 mt-8">
            <button onClick={() => alert("Deposit funds pipeline simulating...")} className="bg-white text-[#141414] px-6 py-2 border-2 border-white text-xs uppercase font-bold tracking-wider hover:bg-transparent hover:text-white transition-colors">
              Deposit Funds
            </button>
            <button onClick={() => alert("Withdraw funds pipeline simulating...")} className="bg-transparent border-2 border-white text-white px-6 py-2 text-xs uppercase font-bold tracking-wider hover:bg-white hover:text-[#141414] transition-colors">
              Withdraw
            </button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-[#F2F1EE] p-stack-lg flex flex-col items-start lg:border-l-2 border-[#141414]">
          <h3 className="font-bold uppercase tracking-widest text-xs opacity-50 mb-4 border-b border-[#141414] w-full pb-2">Risk Exposure</h3>
          <div className="space-y-4 w-full">
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-xs text-[#141414]">
                <span className="uppercase font-bold">Technology</span>
                <span>62%</span>
              </div>
              <div className="w-full h-2 bg-white border border-[#141414] relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-[#141414] w-[62%]"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-xs text-[#141414]">
                <span className="uppercase font-bold">Healthcare</span>
                <span>18%</span>
              </div>
              <div className="w-full h-2 bg-white border border-[#141414] relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-[#141414] w-[18%]"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-xs text-[#141414]">
                <span className="uppercase font-bold">Consumer Goods</span>
                <span>20%</span>
              </div>
              <div className="w-full h-2 bg-white border border-[#141414] relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-[#141414] w-[20%]"></div>
              </div>
            </div>
          </div>
          <a
            href="#"
            className="text-[#141414] text-xs font-bold uppercase tracking-wider flex items-center gap-1 mt-auto hover:bg-[#141414] hover:text-white px-3 py-1 border border-transparent hover:border-[#141414] transition-all"
          >
            Full allocation report <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white">
        <div className="p-4 border-b-2 border-[#141414] flex justify-between items-center bg-[#F2F1EE]">
          <h2 className="font-bold uppercase tracking-widest text-xs opacity-50">Current Holdings</h2>
          <div className="flex gap-2">
            <button onClick={() => alert("Filtering applied...")} className="border-2 border-[#141414] p-1.5 hover:bg-[#141414] hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
            </button>
            <button onClick={() => alert("Downloading holdings...")} className="border-2 border-[#141414] p-1.5 hover:bg-[#141414] hover:text-white transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-7 bg-[#141414] text-white text-[10px] font-bold uppercase tracking-wider py-3 px-6">
            <div className="col-span-2">Asset / Symbol</div>
            <div className="text-right">Quantity</div>
            <div className="text-right">Avg Price</div>
            <div className="text-right">Market Price</div>
            <div className="text-right">Market Value</div>
            <div className="text-right">Return</div>
          </div>
          <div className="divide-y-2 divide-[#141414] border-b-2 border-[#141414]">
            {state.holdings.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono font-bold uppercase tracking-widest opacity-50">
                No holdings currently available.
              </div>
            ) : (
              state.holdings.map((h) => {
                const marketPrice = getCurrentPrice(h.symbol) || h.avgPrice;
                const marketValue = h.quantity * marketPrice;
                const invested = h.quantity * h.avgPrice;
                const returnPct = invested > 0 ? ((marketValue - invested) / invested) * 100 : 0;
                const isPos = returnPct >= 0;
                
                return (
                  <div key={h.symbol} className="grid grid-cols-7 p-4 text-xs hover:bg-[#F2F1EE] cursor-default items-center">
                    <div className="col-span-2 flex items-center gap-3">
                      <span className="bg-[#141414] text-white px-2 py-0.5 font-bold font-mono">{h.symbol}</span>
                      <span className="font-bold">{h.name}</span>
                    </div>
                    <div className="text-right font-mono">{h.quantity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="text-right font-mono">${h.avgPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="text-right font-mono">${marketPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="text-right font-mono font-bold">${marketValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className={`text-right font-mono font-bold ${isPos ? 'text-green-600' : 'text-red-600'} underline decoration-2 underline-offset-4 tracking-tighter`}>
                      {isPos ? '+' : ''}{returnPct.toFixed(2)}%
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-0 border-b-2 border-[#141414]">
        <div className="col-span-12 lg:col-span-4 bg-[#F2F1EE] p-stack-md border-r-2 border-b-2 lg:border-b-0 border-[#141414] flex flex-col items-start min-h-[160px]">
          <div className="border-b border-[#141414] w-full flex justify-between items-end pb-2 mb-4">
            <h3 className="font-bold uppercase tracking-widest text-xs opacity-50">Performance Chart</h3>
            <span className="font-mono text-[10px] uppercase">Last 30 Days</span>
          </div>
          <div className="h-24 w-full flex items-end gap-[2px] mt-auto">
            {[60, 70, 55, 85, 90, 75, 95, 80, 100].map((height, i) => (
              <div
                key={i}
                className="bg-[#141414] flex-1 hover:bg-[#888888] transition-colors"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8 bg-white p-stack-md flex gap-gutter items-start">
          <div className="flex-1 space-y-2">
            <h3 className="font-bold uppercase tracking-widest text-xs opacity-50 border-b border-[#141414] pb-2">Market Narrative</h3>
            <p className="text-[#141414] text-xs font-mono leading-relaxed mt-4">
              &gt; PortfoliXai performance remains strong, driven by heavy exposure to semiconductor and cloud infrastructure growth.<br/>
              &gt; Earnings reports from MSFT and NVDA suggest a sustained long-term trend in enterprise AI integration.<br/>
              &gt; Current cash reserve is 4.2%, suggesting room for opportunistic accumulation in the energy sector should volatility increase.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

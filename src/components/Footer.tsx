export function Footer() {
  return (
    <footer className="h-24 border-t-2 border-[#141414] bg-[#F2F1EE] grid grid-cols-3 items-center px-6 shrink-0 z-40 relative">
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase opacity-50 italic">System Query Results</span>
        <span className="text-xs font-mono mt-1">Displaying 4/5 tracked assets</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-bold uppercase opacity-50">PortfoliXai Stability Index</span>
        <div className="w-48 h-2 bg-white border border-[#141414] mt-1 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-[#141414] w-[78%]"></div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-[10px] font-bold uppercase opacity-50">Cumulative Value (Hardcoded)</span>
        <span className="text-3xl font-mono font-black tracking-tighter mt-1">$1,482,904.52</span>
      </div>
    </footer>
  );
}

import {
  Bell,
  RefreshCw,
  HelpCircle,
  Search,
} from 'lucide-react';

interface HeaderProps {
  showSearch?: boolean;
}

export function Header({ showSearch = true }: HeaderProps) {
  return (
    <header className="flex justify-between items-center px-6 h-16 w-full sticky top-0 z-40 bg-white border-b-2 border-[#141414]">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-[#141414] flex items-center justify-center text-white font-bold">P</div>
        <div className="font-display-lg text-xl font-black text-on-surface uppercase tracking-tight">
          PortfoliX<span className="opacity-50 text-xs ml-2">v2.0.0</span>
        </div>
        {showSearch && (
          <div className="hidden md:flex items-center bg-[#F2F1EE] border-2 border-[#141414] px-3 py-1.5 w-64 ml-4">
            <Search className="w-4 h-4 text-outline mr-2" />
            <input
              type="text"
              placeholder="Search instruments..."
              className="bg-transparent border-none p-0 text-xs font-bold uppercase focus:ring-0 outline-none placeholder:opacity-50 w-full"
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-6">
        <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest hidden lg:flex">
          <span className="opacity-40">Status: <span className="text-green-600">Connected</span></span>
          <span className="opacity-40">Terminal: <span className="text-blue-600 uppercase underline">Local-Py</span></span>
        </div>
        <div className="h-6 w-[2px] bg-[#141414]"></div>
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-[#141414] cursor-pointer hover:opacity-70 transition-opacity" />
          <RefreshCw className="w-5 h-5 text-[#141414] cursor-pointer hover:opacity-70 transition-opacity" />
          <HelpCircle className="w-5 h-5 text-[#141414] cursor-pointer hover:opacity-70 transition-opacity" />
          <button className="px-4 py-1.5 border-2 border-[#141414] text-[#141414] font-bold text-xs uppercase tracking-wider hover:bg-[#141414] hover:text-white transition-colors">
            Save Session
          </button>
        </div>
      </div>
    </header>
  );
}

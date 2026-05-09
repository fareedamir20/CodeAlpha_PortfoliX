import {
  LayoutDashboard,
  Wallet,
  Eye,
  LineChart,
  History,
  Settings as SettingsIcon,
  PlusCircle,
} from 'lucide-react';

interface SidebarProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
}

export function Sidebar({ currentScreen, onScreenChange }: SidebarProps) {
  return (
    <aside className="flex flex-col h-full bg-surface-container-low border-r-2 border-outline w-64 shrink-0">
      <div className="p-4 border-b-2 border-outline">
        <div className="font-display-lg text-lg font-black uppercase tracking-tight text-primary">
          PortfoliX
        </div>
        <div className="font-label-md text-[10px] font-bold uppercase tracking-widest text-[#141414] opacity-50 mt-1">
          Institutional Tier
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onScreenChange('dashboard');
          }}
          className={`flex items-center px-4 py-3 transition-all text-xs font-bold uppercase border-2 border-outline ${
            currentScreen === 'dashboard'
              ? 'text-on-primary bg-primary'
              : 'text-secondary bg-transparent hover:bg-surface'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 mr-3" />
          <span className="tracking-wider">Dashboard</span>
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onScreenChange('review');
          }}
          className={`flex items-center px-4 py-3 transition-all text-xs font-bold uppercase border-2 border-outline ${
            currentScreen === 'review'
              ? 'text-on-primary bg-primary'
              : 'text-secondary bg-transparent hover:bg-surface'
          }`}
        >
          <Wallet className="w-4 h-4 mr-3" />
          <span className="tracking-wider">PortfoliX Final Review</span>
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onScreenChange('watchlist');
          }}
          className={`flex items-center px-4 py-3 transition-all text-xs font-bold uppercase border-2 border-outline ${
            currentScreen === 'watchlist'
              ? 'text-on-primary bg-primary'
              : 'text-secondary bg-transparent hover:bg-surface'
          }`}
        >
          <Eye className="w-4 h-4 mr-3" />
          <span className="tracking-wider">Watchlist</span>
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onScreenChange('market');
          }}
          className={`flex items-center px-4 py-3 transition-all text-xs font-bold uppercase border-2 border-outline ${
            currentScreen === 'market'
              ? 'text-on-primary bg-primary'
              : 'text-secondary bg-transparent hover:bg-surface'
          }`}
        >
          <LineChart className="w-4 h-4 mr-3" />
          <span className="tracking-wider">Market Analysis</span>
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onScreenChange('history');
          }}
          className={`flex items-center px-4 py-3 transition-all text-xs font-bold uppercase border-2 border-outline ${
            currentScreen === 'history'
              ? 'text-on-primary bg-primary'
              : 'text-secondary bg-transparent hover:bg-surface'
          }`}
        >
          <History className="w-4 h-4 mr-3" />
          <span className="tracking-wider">Trade History</span>
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onScreenChange('settings');
          }}
          className={`flex items-center px-4 py-3 transition-all text-xs font-bold uppercase border-2 border-outline ${
            currentScreen === 'settings'
              ? 'text-on-primary bg-primary'
              : 'text-secondary bg-transparent hover:bg-surface'
          }`}
        >
          <SettingsIcon className="w-4 h-4 mr-3" />
          <span className="tracking-wider">Settings</span>
        </a>
      </nav>
      <div className="mt-auto p-4 bg-[#141414] text-[#E4E3E0] border-t-2 border-outline">
        <button
          onClick={() => onScreenChange('addTrade')}
          className="w-full py-3 px-4 bg-surface text-on-surface border-2 border-outline text-xs font-bold uppercase tracking-widest flex items-center justify-between hover:bg-surface-container-low transition-colors"
        >
          <span>Quick Trade</span>
          <PlusCircle className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}

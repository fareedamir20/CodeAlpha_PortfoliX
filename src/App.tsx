import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Dashboard } from './screens/Dashboard';
import { PortfolioReview } from './screens/PortfolioReview';
import { AddTrade } from './screens/AddTrade';
import { Settings } from './screens/Settings';
import { Watchlist } from './screens/Watchlist';
import { MarketAnalysis } from './screens/MarketAnalysis';
import { TradeHistory } from './screens/TradeHistory';
import { PortfolioProvider } from './context/PortfolioContext';

type Screen = 'dashboard' | 'review' | 'addTrade' | 'settings' | 'watchlist' | 'market' | 'history';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  return (
    <PortfolioProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#E4E3E0] p-4 lg:p-8">
        <div className="flex w-full h-full border-[8px] border-[#141414] overflow-hidden bg-white shadow-xl">
          {currentScreen !== 'addTrade' && (
            <Sidebar currentScreen={currentScreen} onScreenChange={setCurrentScreen} />
          )}
          
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            {currentScreen !== 'addTrade' && <Header showSearch={currentScreen === 'dashboard'} />}
            
            {currentScreen === 'dashboard' && <Dashboard />}
            {currentScreen === 'review' && <PortfolioReview />}
            {currentScreen === 'watchlist' && <Watchlist />}
            {currentScreen === 'market' && <MarketAnalysis />}
            {currentScreen === 'history' && <TradeHistory />}
            {currentScreen === 'settings' && <Settings />}
            {currentScreen === 'addTrade' && <AddTrade onBack={() => setCurrentScreen('dashboard')} />}

            {currentScreen !== 'addTrade' && <Footer />}
          </div>
        </div>
      </div>
    </PortfolioProvider>
  );
}


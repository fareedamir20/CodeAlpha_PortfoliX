import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Holding = {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
};

export type Trade = {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  price: number;
  date: string;
};

export type PortfolioState = {
  holdings: Holding[];
  trades: Trade[];
  watchlist: string[];
  manualPrices: Record<string, number>;
};

const DEFAULT_STATE: PortfolioState = {
  holdings: [
    { symbol: 'AAPL', name: 'Apple Inc.', quantity: 1250, avgPrice: 162.40 },
    { symbol: 'TSLA', name: 'Tesla, Inc.', quantity: 840, avgPrice: 242.15 },
    { symbol: 'GOOG', name: 'Alphabet Inc.', quantity: 1100, avgPrice: 128.50 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', quantity: 400, avgPrice: 420.10 },
  ],
  trades: [
    { id: 't1', symbol: 'AAPL', name: 'Apple Inc.', quantity: 1250, price: 162.40, date: new Date(Date.now() - 30 * 86400000).toISOString() },
    { id: 't2', symbol: 'TSLA', name: 'Tesla, Inc.', quantity: 840, price: 242.15, date: new Date(Date.now() - 15 * 86400000).toISOString() },
    { id: 't3', symbol: 'GOOG', name: 'Alphabet Inc.', quantity: 1100, price: 128.50, date: new Date(Date.now() - 5 * 86400000).toISOString() },
    { id: 't4', symbol: 'NVDA', name: 'NVIDIA Corp.', quantity: 400, price: 420.10, date: new Date(Date.now() - 2 * 86400000).toISOString() },
  ],
  watchlist: ['META', 'AMZN', 'MSFT', 'AMD', 'COIN'],
  manualPrices: {
    'AAPL': 189.43,
    'TSLA': 210.50,
    'GOOG': 155.60,
    'NVDA': 850.25,
    'META': 480.12,
    'AMZN': 178.50,
    'MSFT': 420.55,
    'AMD': 165.20,
    'COIN': 240.15,
  }
};

const EMPTY_STATE: PortfolioState = {
  holdings: [],
  trades: [],
  watchlist: [],
  manualPrices: {}
}

type PortfolioContextType = {
  state: PortfolioState;
  livePrices: Record<string, number>;
  isLoadingPrices: boolean;
  addTrade: (symbol: string, name: string, quantity: number, price: number) => void;
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  updateManualPrice: (symbol: string, price: number) => void;
  factoryReset: () => void;
  clearAllData: () => void;
  refreshPrices: () => void;
  getCurrentPrice: (symbol: string) => number;
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PortfolioState>(() => {
    const saved = localStorage.getItem('portfolio_state_v2');
    if (saved) {
      try { 
        return JSON.parse(saved); 
      } catch (e) {}
    }
    return DEFAULT_STATE;
  });

  const [livePrices, setLivePrices] = useState<Record<string, number>>({});
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);

  const refreshPrices = async () => {
    setIsLoadingPrices(true);
    // Fetching external data - using internal simulation for dev mode
    setTimeout(() => {
       const newLivePrices = {
        'AAPL': 175.50 + Math.random() * 5,
        'TSLA': 240.20 + Math.random() * 10,
        'GOOG': 145.10 + Math.random() * 5,
        'MSFT': 410.00 + Math.random() * 15,
        'AMZN': 180.25 + Math.random() * 5,
        'NVDA': 900.00 + Math.random() * 20,
        'META': 490.50 + Math.random() * 10,
        'AMD': 160.00 + Math.random() * 10,
        'COIN': 230.15 + Math.random() * 10,
       };
       setLivePrices(newLivePrices);
       setIsLoadingPrices(false);
    }, 800);
  };

  useEffect(() => {
    refreshPrices();
    const interval = setInterval(refreshPrices, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio_state_v2', JSON.stringify(state));
  }, [state]);

  const getCurrentPrice = (symbol: string) => {
    return livePrices[symbol] || state.manualPrices[symbol] || 0;
  };

  const addTrade = (symbol: string, name: string, quantity: number, price: number) => {
    setState(prev => {
      const existing = prev.holdings.find(h => h.symbol === symbol);
      let newHoldings = [...prev.holdings];
      if (existing) {
        const totalCost = existing.quantity * existing.avgPrice + quantity * price;
        const totalQty = existing.quantity + quantity;
        const newAvg = totalCost / totalQty;
        newHoldings = newHoldings.map(h => h.symbol === symbol ? { ...h, quantity: totalQty, avgPrice: newAvg } : h);
      } else {
        newHoldings.push({ symbol, name, quantity, avgPrice: price });
      }
      
      const newTrade: Trade = {
        id: Math.random().toString(36).substr(2, 9),
        symbol,
        name,
        quantity,
        price,
        date: new Date().toISOString()
      };
      
      const newManualPrices = { ...prev.manualPrices };
      if (!(symbol in newManualPrices)) {
        newManualPrices[symbol] = price;
      }
      
      return { 
        ...prev, 
        holdings: newHoldings, 
        trades: [newTrade, ...prev.trades],
        manualPrices: newManualPrices
      };
    });
  };

  const addToWatchlist = (symbol: string) => {
    setState(prev => {
      if (prev.watchlist.includes(symbol)) return prev;
      return { ...prev, watchlist: [...prev.watchlist, symbol] };
    });
  };

  const removeFromWatchlist = (symbol: string) => {
    setState(prev => ({
      ...prev,
      watchlist: prev.watchlist.filter(s => s !== symbol)
    }));
  };

  const updateManualPrice = (symbol: string, price: number) => {
    setState(prev => ({
       ...prev,
       manualPrices: { ...prev.manualPrices, [symbol]: price }
    }));
  };

  const factoryReset = () => {
    setState(DEFAULT_STATE);
  };
  
  const clearAllData = () => {
    setState(EMPTY_STATE);
  }

  return (
    <PortfolioContext.Provider value={{ 
      state, 
      livePrices, 
      isLoadingPrices, 
      addTrade, 
      addToWatchlist, 
      removeFromWatchlist, 
      updateManualPrice, 
      factoryReset, 
      clearAllData,
      refreshPrices,
      getCurrentPrice
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider');
  return context;
}

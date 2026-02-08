
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import AddTransaction from './screens/AddTransaction';
import Statistics from './screens/Statistics';
import Assets from './screens/Assets';
import Settings from './screens/Settings';
import Onboarding from './screens/Onboarding';
import SearchFilter from './screens/SearchFilter';
import TransactionDetail from './screens/TransactionDetail';
import CategoryManagement from './screens/CategoryManagement';
import BudgetSettings from './screens/BudgetSettings';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const showBottomNav = !['/add', '/onboarding', '/search', '/categories', '/budget'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative bg-background-light dark:bg-background-dark shadow-2xl overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Dashboard onSettingsClick={() => navigate('/settings')} onSearchClick={() => navigate('/search')} />} />
        <Route path="/add" element={<AddTransaction />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/settings" element={<Settings toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/search" element={<SearchFilter />} />
        <Route path="/detail/:id" element={<TransactionDetail />} />
        <Route path="/categories" element={<CategoryManagement />} />
        <Route path="/budget" element={<BudgetSettings />} />
      </Routes>

      {showBottomNav && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 dark:bg-zinc-900/95 backdrop-blur-lg border-t border-gray-100 dark:border-zinc-800 px-6 py-3 flex justify-between items-center z-40">
          <TabItem 
            icon="dashboard" 
            label="看板" 
            active={location.pathname === '/'} 
            onClick={() => navigate('/')} 
          />
          <TabItem 
            icon="pie_chart" 
            label="统计" 
            active={location.pathname === '/statistics'} 
            onClick={() => navigate('/statistics')} 
          />
          <div className="-mt-8">
            <button 
              onClick={() => navigate('/add')}
              className="size-14 bg-primary text-black rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
            >
              <span className="material-symbols-outlined text-3xl font-bold">add</span>
            </button>
          </div>
          <TabItem 
            icon="account_balance_wallet" 
            label="资产" 
            active={location.pathname === '/assets'} 
            onClick={() => navigate('/assets')} 
          />
          <TabItem 
            icon="person" 
            label="我的" 
            active={location.pathname === '/settings'} 
            onClick={() => navigate('/settings')} 
          />
        </nav>
      )}
    </div>
  );
};

const TabItem: React.FC<{ icon: string; label: string; active: boolean; onClick: () => void }> = ({ 
  icon, label, active, onClick 
}) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-primary' : 'text-zinc-400 dark:text-zinc-500'}`}
  >
    <span className={`material-symbols-outlined ${active ? 'fill-1' : ''}`}>{icon}</span>
    <span className="text-[10px] font-bold">{label}</span>
  </button>
);

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

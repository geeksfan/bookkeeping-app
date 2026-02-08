
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_TRANSACTIONS } from '../constants';
import { TransactionType } from '../types';

const SearchFilter: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'EXPENSE' | 'INCOME'>('ALL');
  const [selectedMonth, setSelectedMonth] = useState(true);

  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter(t => {
      const matchSearch = t.note.includes(searchTerm) || t.categoryName.includes(searchTerm);
      const matchTab = activeTab === 'ALL' || t.type === activeTab;
      return matchSearch && matchTab;
    });
  }, [searchTerm, activeTab]);

  const totalAmount = useMemo(() => {
    return filteredTransactions.reduce((acc, t) => {
      return t.type === TransactionType.EXPENSE ? acc - t.amount : acc + t.amount;
    }, 0);
  }, [filteredTransactions]);

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md pt-4">
        <div className="flex items-center justify-between px-4 pb-2">
          <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <h1 className="text-lg font-bold tracking-tight">搜索与筛选</h1>
          <button onClick={() => { setSearchTerm(''); setActiveTab('ALL'); }} className="text-primary font-bold text-sm">重置</button>
        </div>

        <div className="px-4 py-3">
          <div className="relative flex items-center">
            <div className="absolute left-3 text-primary">
              <span className="material-symbols-outlined text-[22px]">search</span>
            </div>
            <input 
              className="w-full h-11 pl-10 pr-10 bg-primary/10 dark:bg-primary/5 border-none rounded-xl focus:ring-2 focus:ring-primary/40 placeholder:text-primary/60 text-base" 
              placeholder="搜索备注或商户..." 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <div onClick={() => setSearchTerm('')} className="absolute right-3 text-primary/60 cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">cancel</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 px-4 pb-4 overflow-x-auto no-scrollbar">
          <Chip label="全部" active={activeTab === 'ALL'} onClick={() => setActiveTab('ALL')} />
          <Chip label="支出" active={activeTab === 'EXPENSE'} onClick={() => setActiveTab('EXPENSE')} />
          <Chip label="收入" active={activeTab === 'INCOME'} onClick={() => setActiveTab('INCOME')} />
          <Chip label="本月" active={selectedMonth} onClick={() => setSelectedMonth(!selectedMonth)} />
        </div>
      </header>

      <div className="bg-slate-50 dark:bg-slate-900/50 px-4 py-3 flex justify-between items-center border-y border-slate-100 dark:border-slate-800">
        <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">筛选结果</span>
        <span className="text-xs text-slate-500">
          共 {filteredTransactions.length} 条 · 总计: 
          <span className={`ml-1 font-bold ${totalAmount >= 0 ? 'text-primary' : 'text-red-500'}`}>
            {totalAmount >= 0 ? '+' : ''}¥{totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </span>
      </div>

      <main className="flex-1 overflow-y-auto pb-24">
        {filteredTransactions.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredTransactions.map(t => (
              <SearchResultItem 
                key={t.id}
                icon={t.type === TransactionType.INCOME ? 'payments' : 'restaurant'} 
                title={t.note || t.categoryName} 
                subtitle={`${t.date} · ${t.account}`} 
                amount={`${t.type === TransactionType.INCOME ? '+' : '-'}¥${t.amount.toFixed(2)}`} 
                isIncome={t.type === TransactionType.INCOME} 
                onClick={() => navigate(`/detail/${t.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-20 text-slate-400">
            <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
            <p className="text-sm font-medium">没有找到相关记录</p>
          </div>
        )}
      </main>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30">
        <button className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-3 rounded-full flex items-center gap-2 shadow-xl shadow-black/20 font-bold text-sm tracking-wide active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-[18px]">tune</span>
          更多条件
        </button>
      </div>
    </div>
  );
};

const Chip: React.FC<{ label: string; active?: boolean; onClick?: () => void }> = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex h-9 shrink-0 items-center justify-center rounded-full px-5 text-xs font-bold leading-none transition-all ${active ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500'}`}
  >
    {label}
  </button>
);

const SearchResultItem: React.FC<{ icon: string; title: string; subtitle: string; amount: string; isIncome?: boolean; onClick: () => void }> = ({ 
  icon, title, subtitle, amount, isIncome, onClick 
}) => (
  <div onClick={onClick} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
    <div className="flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isIncome ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <h4 className="text-sm font-bold truncate max-w-[150px]">{title}</h4>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
    </div>
    <span className={`text-base font-bold ${isIncome ? 'text-primary' : 'text-slate-900 dark:text-slate-100'}`}>{amount}</span>
  </div>
);

export default SearchFilter;

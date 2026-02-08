
import React, { useState, useEffect } from 'react';
import { Storage } from '../storage';
import { TransactionType, Transaction } from '../types';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  onSettingsClick: () => void;
  onSearchClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSettingsClick, onSearchClick }) => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    const data = Storage.getTransactions();
    setTransactions(data);
    
    let inc = 0;
    let exp = 0;
    data.forEach(t => {
      if (t.type === TransactionType.INCOME) inc += t.amount;
      else exp += t.amount;
    });
    
    const accounts = Storage.getAccounts();
    const balance = accounts.reduce((acc, a) => acc + a.balance, 0);
    
    setIncome(inc);
    setExpense(exp);
    setTotalBalance(balance);
  }, []);

  const groupTransactions = () => {
    const groups: { [key: string]: Transaction[] } = {};
    transactions.forEach(t => {
      if (!groups[t.date]) groups[t.date] = [];
      groups[t.date].push(t);
    });
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
  };

  return (
    <div className="flex-1 w-full flex flex-col pb-24">
      <header className="flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 p-4 pb-2 justify-between">
        <div 
          onClick={onSettingsClick}
          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">settings</span>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">收支看板</h2>
        <div className="flex size-10 items-center justify-end">
          <button 
            onClick={onSearchClick}
            className="flex cursor-pointer items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 p-2"
          >
            <span className="material-symbols-outlined text-2xl">search</span>
          </button>
        </div>
      </header>

      <main className="flex-1 w-full px-4 pt-4">
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
          <div className="flex flex-col gap-1">
            <p className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-widest">总余额 (CNY)</p>
            <h1 className="text-4xl font-black tracking-tight py-2">¥{totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
          </div>
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-50 dark:border-zinc-800">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-sm font-bold">arrow_upward</span>
                <p className="text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-wider">本月收入</p>
              </div>
              <p className="text-lg font-bold text-primary">+{income.toLocaleString()}</p>
            </div>
            <div className="w-[1px] h-8 bg-gray-100 dark:bg-zinc-800"></div>
            <div className="flex flex-col gap-1 text-right">
              <div className="flex items-center justify-end gap-1.5">
                <span className="material-symbols-outlined text-red-500 text-sm font-bold">arrow_downward</span>
                <p className="text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-wider">本月支出</p>
              </div>
              <p className="text-lg font-bold">- {expense.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {groupTransactions().map(([date, items]) => (
            <div key={date}>
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-sm font-bold text-zinc-400">{date}</h3>
                <p className="text-xs text-zinc-400 font-medium">
                  收 ¥{items.filter(i => i.type === TransactionType.INCOME).reduce((s, i) => s + i.amount, 0).toFixed(2)} / 
                  支 ¥{items.filter(i => i.type === TransactionType.EXPENSE).reduce((s, i) => s + i.amount, 0).toFixed(2)}
                </p>
              </div>
              <div className="space-y-2">
                {items.map(item => (
                  <TransactionItem key={item.id} transaction={item} onClick={() => navigate(`/detail/${item.id}`)} />
                ))}
              </div>
            </div>
          ))}
          {transactions.length === 0 && (
            <div className="py-20 text-center text-zinc-400">
              <span className="material-symbols-outlined text-5xl mb-2">inbox</span>
              <p className="text-sm">还没有账单记录</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const TransactionItem: React.FC<{ transaction: Transaction; onClick: () => void }> = ({ transaction, onClick }) => {
  const isIncome = transaction.type === TransactionType.INCOME;
  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-4 bg-white dark:bg-zinc-900 px-4 py-4 rounded-2xl shadow-sm border border-transparent active:scale-[0.98] transition-all cursor-pointer"
    >
      <div className={`flex items-center justify-center rounded-xl shrink-0 size-12 ${isIncome ? 'bg-primary/10 text-primary' : 'bg-gray-100 dark:bg-zinc-800 text-zinc-600'}`}>
        <span className="material-symbols-outlined">
          {isIncome ? 'payments' : 'restaurant'}
        </span>
      </div>
      <div className="flex flex-col flex-1 truncate">
        <p className="text-base font-bold leading-none mb-1 truncate">{transaction.note || transaction.categoryName}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{transaction.time} · {transaction.account}</p>
      </div>
      <div className="text-right">
        <p className={`text-base font-black ${isIncome ? 'text-primary' : 'text-slate-900 dark:text-slate-100'}`}>
          {isIncome ? '+' : '-'}¥{transaction.amount.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

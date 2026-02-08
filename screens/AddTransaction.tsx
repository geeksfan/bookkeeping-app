
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Storage } from '../storage';
import { TransactionType, Category, Account } from '../types';

const AddTransaction: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('0.00');
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  
  const [note, setNote] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAccountPicker, setShowAccountPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const cats = type === TransactionType.EXPENSE ? Storage.getExpenseCategories() : Storage.getIncomeCategories();
    setCategories(cats);
    setSelectedCategory(cats[0]);
    
    const accs = Storage.getAccounts();
    setAccounts(accs);
    setSelectedAccount(accs[0]);
  }, [type]);

  const handleKeypadPress = (val: string) => {
    if (val === 'backspace') {
      if (amount.length <= 1) { setAmount('0.00'); return; }
      const cleaned = amount.replace('.', '');
      const newAmount = cleaned.slice(0, -1);
      if (!newAmount) { setAmount('0.00'); return; }
      const formatted = (parseInt(newAmount.padStart(3, '0')) / 100).toFixed(2);
      setAmount(formatted);
    } else {
      const cleaned = amount.replace('.', '');
      if (cleaned === '000' && val === '0') return;
      const newAmount = cleaned === '000' ? val : cleaned + val;
      if (newAmount.length > 9) return;
      const formatted = (parseInt(newAmount) / 100).toFixed(2);
      setAmount(formatted);
    }
  };

  const handleSave = () => {
    const numAmount = parseFloat(amount);
    if (numAmount === 0) return;

    const newTx = {
      id: Date.now().toString(),
      amount: numAmount,
      type: type,
      categoryId: selectedCategory?.id || '',
      categoryName: selectedCategory?.name || '',
      date: selectedDate,
      time: new Date().toLocaleTimeString('zh-CN', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      note: note,
      account: selectedAccount?.name || '现金'
    };

    Storage.addTransaction(newTx);
    
    // Update account balance
    const allAccs = Storage.getAccounts();
    const updatedAccs = allAccs.map(a => {
      if (a.id === selectedAccount?.id) {
        return { 
          ...a, 
          balance: type === TransactionType.INCOME ? a.balance + numAmount : a.balance - numAmount 
        };
      }
      return a;
    });
    Storage.saveAccounts(updatedAccs);
    
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-[#0d1b12] overflow-hidden relative">
      <header className="flex items-center justify-between px-6 py-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
        <div className="flex p-1 bg-slate-100 dark:bg-white/10 rounded-xl">
          <button 
            onClick={() => setType(TransactionType.EXPENSE)}
            className={`px-6 py-1.5 text-xs font-bold rounded-lg transition-all ${type === TransactionType.EXPENSE ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'}`}
          >支出</button>
          <button 
            onClick={() => setType(TransactionType.INCOME)}
            className={`px-6 py-1.5 text-xs font-bold rounded-lg transition-all ${type === TransactionType.INCOME ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'}`}
          >收入</button>
        </div>
        <button onClick={() => navigate('/search')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
          <span className="material-symbols-outlined text-2xl">history</span>
        </button>
      </header>

      <section className="flex flex-col items-center justify-center py-6 px-6">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{type === TransactionType.EXPENSE ? '支出' : '收入'}金额</span>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black">¥</span>
          <span className={`text-6xl font-black tracking-tighter ${type === TransactionType.INCOME ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>{amount}</span>
        </div>
      </section>

      <section className="flex-1 px-6 pt-4 pb-8 overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">选择分类</h2>
          <button onClick={() => navigate('/categories')} className="text-xs text-primary font-bold px-2 py-1 rounded-lg bg-primary/10">管理</button>
        </div>
        <div className="grid grid-cols-4 gap-y-6 gap-x-4">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => setSelectedCategory(cat)}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className={`size-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${selectedCategory?.id === cat.id ? 'bg-primary shadow-xl shadow-primary/20 scale-110' : 'bg-gray-100 dark:bg-white/5'}`}>
                <span className={`material-symbols-outlined text-2xl ${selectedCategory?.id === cat.id ? 'text-black font-bold' : 'text-gray-500'}`}>
                  {cat.icon}
                </span>
              </div>
              <span className={`text-[10px] uppercase tracking-wider ${selectedCategory?.id === cat.id ? 'font-black text-primary' : 'font-bold text-gray-500'}`}>
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 mb-4 space-y-3">
        <div className="flex gap-3">
          <button 
            onClick={() => setShowDatePicker(true)}
            className="flex-1 flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-transparent active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl text-primary font-bold">calendar_month</span>
              <span className="text-xs font-bold">{selectedDate}</span>
            </div>
          </button>
          <button 
            onClick={() => setShowAccountPicker(true)}
            className="flex-1 flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-transparent active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl text-primary font-bold">account_balance_wallet</span>
              <span className="text-xs font-bold">{selectedAccount?.name}</span>
            </div>
          </button>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-transparent">
          <span className="material-symbols-outlined text-xl text-gray-400">edit_note</span>
          <input 
            className="bg-transparent border-none focus:ring-0 text-sm p-0 flex-1 placeholder-gray-400 font-bold" 
            placeholder="写点什么..." 
            type="text" 
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-black/40 p-2 rounded-t-[2.5rem] shadow-2xl">
        <div className="grid grid-cols-4 gap-1">
          <div className="grid grid-cols-3 col-span-3 gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((num) => (
              <button 
                key={num}
                onClick={() => num !== '.' && handleKeypadPress(num.toString())}
                className="h-14 flex items-center justify-center text-xl font-bold hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors active:bg-primary/20"
              >
                {num}
              </button>
            ))}
            <button 
              onClick={() => handleKeypadPress('backspace')}
              className="h-14 flex items-center justify-center text-xl font-bold rounded-xl active:bg-red-500/10"
            >
              <span className="material-symbols-outlined">backspace</span>
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <button onClick={() => setAmount('0.00')} className="h-14 flex items-center justify-center text-xl bg-gray-200 dark:bg-white/10 rounded-xl font-bold">C</button>
            <button 
              onClick={handleSave}
              className="flex-1 bg-primary text-black font-black text-lg rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center active:scale-95 transition-all"
            >
              确认
            </button>
          </div>
        </div>
      </section>

      {/* Date Picker Modal (Calendar Style) */}
      {showDatePicker && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end">
          <div className="bg-white dark:bg-slate-900 rounded-t-[2.5rem] p-6 pb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black uppercase tracking-widest">选择日期</h3>
              <button onClick={() => setShowDatePicker(false)} className="size-10 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex flex-col items-center">
               {/* Native input styled to be clean or a simple custom picker */}
               <input 
                 type="date" 
                 value={selectedDate}
                 onChange={(e) => { setSelectedDate(e.target.value); setShowDatePicker(false); }}
                 className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl p-6 text-xl font-black text-center focus:ring-2 focus:ring-primary mb-4"
               />
               <div className="grid grid-cols-2 gap-4 w-full">
                  <button onClick={() => { setSelectedDate(new Date().toISOString().split('T')[0]); setShowDatePicker(false); }} className="p-4 rounded-xl bg-primary/10 text-primary font-bold">今天</button>
                  <button onClick={() => { 
                    const d = new Date(); d.setDate(d.getDate() - 1); 
                    setSelectedDate(d.toISOString().split('T')[0]); 
                    setShowDatePicker(false); 
                  }} className="p-4 rounded-xl bg-gray-100 dark:bg-white/5 font-bold">昨天</button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Account Picker Modal */}
      {showAccountPicker && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end">
          <div className="bg-white dark:bg-slate-900 rounded-t-[2.5rem] p-6 pb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black uppercase tracking-widest">支付方式</h3>
              <button onClick={() => setShowAccountPicker(false)} className="size-10 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-3">
              {accounts.map(acc => (
                <button 
                  key={acc.id}
                  onClick={() => { setSelectedAccount(acc); setShowAccountPicker(false); }}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${selectedAccount?.id === acc.id ? 'border-primary bg-primary/5' : 'border-transparent bg-gray-50 dark:bg-white/5'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary">{acc.icon}</span>
                    <span className="font-bold">{acc.name}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-400">¥{acc.balance.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTransaction;

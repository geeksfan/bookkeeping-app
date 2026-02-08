
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Storage } from '../storage';

const BudgetSettings: React.FC = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState('5000');

  useEffect(() => {
    setBudget(Storage.getBudget().toString());
  }, []);

  const handleSave = () => {
    Storage.saveBudget(parseFloat(budget));
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark">
      <header className="flex items-center justify-between p-4 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10 border-b border-slate-100 dark:border-slate-800">
        <button onClick={() => navigate(-1)} className="size-10 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800">
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
        <h1 className="text-lg font-black uppercase tracking-widest">预算设定</h1>
        <button onClick={handleSave} className="p-2 text-primary font-black">保存</button>
      </header>

      <main className="flex-1 p-6">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 ios-shadow mb-8 text-center border border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">每月总预算上限 (CNY)</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-black text-slate-300">¥</span>
            <input 
              type="number" 
              value={budget} 
              onChange={(e) => setBudget(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-6xl font-black w-56 text-center p-0 tracking-tighter"
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">分类预警额度</h3>
          
          <div className="space-y-4">
            <BudgetRow label="餐饮" icon="restaurant" color="bg-orange-500" value="1500" />
            <BudgetRow label="购物" icon="shopping_bag" color="bg-blue-500" value="1000" />
            <BudgetRow label="交通" icon="directions_car" color="bg-amber-500" value="500" />
          </div>
        </div>
      </main>

      <div className="p-8 bg-primary/5 border-t border-primary/10">
        <div className="flex items-center gap-4">
          <div className="size-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">notifications_active</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-normal font-bold">
            当您的消费达到设定预算的 85% 时，系统将通过桌面通知实时预警，助您养成自律的消费习惯。
          </p>
        </div>
      </div>
    </div>
  );
};

const BudgetRow: React.FC<{ label: string, icon: string, color: string, value: string }> = ({ label, icon, color, value }) => (
  <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-all cursor-pointer">
    <div className="flex items-center gap-4">
      <div className={`size-11 rounded-xl ${color} text-white flex items-center justify-center shadow-md`}>
        <span className="material-symbols-outlined text-xl">{icon}</span>
      </div>
      <span className="font-black text-sm">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-slate-300 font-black">¥</span>
      <input type="number" defaultValue={value} className="w-24 bg-transparent border-none focus:ring-0 text-right p-0 font-black text-base" />
    </div>
  </div>
);

export default BudgetSettings;

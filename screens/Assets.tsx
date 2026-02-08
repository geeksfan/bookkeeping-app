
import React from 'react';
import { MOCK_ACCOUNTS } from '../constants';

const Assets: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col pb-32 overflow-y-auto no-scrollbar">
      <header className="sticky top-0 z-10 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-4 justify-between border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl text-primary font-bold">account_balance_wallet</span>
          <h1 className="text-xl font-black leading-tight tracking-tight">我的资产</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-2xl">visibility</span>
          </button>
          <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-2xl">add_card</span>
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 space-y-6">
        <div className="bg-primary text-black p-8 rounded-[2.5rem] shadow-xl shadow-primary/20 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 size-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">净资产总额 (CNY)</p>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold">¥</span>
              <span className="text-4xl font-black tracking-tighter">66,300.70</span>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-bold opacity-60">
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span>最后更新于 10:24</span>
              </div>
              <button className="px-3 py-1 bg-black/10 rounded-full text-[10px] font-bold">统计详情</button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">我的账户</h2>
            <button className="text-xs text-primary font-bold">编辑</button>
          </div>
          <div className="space-y-3">
            {MOCK_ACCOUNTS.map((acc) => (
              <div key={acc.id} className={`flex items-center justify-between p-5 bg-white dark:bg-zinc-900 rounded-3xl ios-shadow border border-slate-100 dark:border-slate-800 hover:scale-[1.02] transition-transform cursor-pointer`}>
                <div className="flex items-center gap-4">
                  <div className={`size-12 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-l-4 ${acc.colorClass.split(' ')[0]}`}>
                    <span className="material-symbols-outlined text-2xl">{acc.icon}</span>
                  </div>
                  <div>
                    <p className="font-black text-sm">{acc.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{acc.type}</p>
                  </div>
                </div>
                <p className={`text-base font-black ${acc.balance > 0 ? 'text-primary' : 'text-orange-500'}`}>
                  ¥{acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl ios-shadow border border-slate-100 dark:border-slate-800 overflow-hidden">
          <p className="text-xs font-black text-slate-400 mb-6 uppercase tracking-widest">资产配比</p>
          <div className="flex h-5 w-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 p-1">
            <div className="bg-blue-500 h-full rounded-full mr-0.5" style={{ width: '65%' }}></div>
            <div className="bg-cyan-500 h-full rounded-full mr-0.5" style={{ width: '18%' }}></div>
            <div className="bg-primary h-full rounded-full mr-0.5" style={{ width: '12%' }}></div>
            <div className="bg-slate-400 h-full rounded-full" style={{ width: '5%' }}></div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 text-[10px] font-bold text-slate-500">
            <div className="flex items-center gap-2"><div className="size-2 rounded-full bg-blue-500"></div> 银行储蓄 (65%)</div>
            <div className="flex items-center gap-2"><div className="size-2 rounded-full bg-cyan-500"></div> 线上支付 (18%)</div>
            <div className="flex items-center gap-2"><div className="size-2 rounded-full bg-primary"></div> 电子现金 (12%)</div>
            <div className="flex items-center gap-2"><div className="size-2 rounded-full bg-slate-400"></div> 实物资产 (5%)</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Assets;

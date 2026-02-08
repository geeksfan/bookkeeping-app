
import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EXPENSE_DATA = [
  { name: '餐饮', value: 40, color: '#13ec5b' },
  { name: '购物', value: 25, color: '#60a5fa' },
  { name: '交通', value: 15, color: '#fbbf24' },
  { name: '娱乐', value: 10, color: '#c084fc' },
  { name: '其他', value: 10, color: '#94a3b8' },
];

const INCOME_DATA = [
  { name: '工资', value: 70, color: '#13ec5b' },
  { name: '兼职', value: 20, color: '#60a5fa' },
  { name: '奖金', value: 10, color: '#c084fc' },
];

const Statistics: React.FC = () => {
  const [activeType, setActiveType] = useState<'EXPENSE' | 'INCOME'>('EXPENSE');
  const [activeTimeframe, setActiveTimeframe] = useState<'WEEK' | 'MONTH' | 'YEAR'>('MONTH');

  const currentData = activeType === 'EXPENSE' ? EXPENSE_DATA : INCOME_DATA;
  const totalAmount = useMemo(() => activeType === 'EXPENSE' ? 12450.00 : 18500.00, [activeType]);

  return (
    <div className="flex-1 flex flex-col pb-32">
      <header className="flex items-center justify-between p-4 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10 border-b border-slate-100 dark:border-slate-800">
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-2xl">chevron_left</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight">统计报表</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-2xl">calendar_today</span>
        </button>
      </header>

      <div className="px-4 py-4 space-y-4">
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button 
            onClick={() => setActiveType('EXPENSE')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeType === 'EXPENSE' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'}`}
          >
            支出
          </button>
          <button 
            onClick={() => setActiveType('INCOME')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeType === 'INCOME' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'}`}
          >
            收入
          </button>
        </div>
        <div className="flex border-b border-slate-100 dark:border-slate-800">
          <button onClick={() => setActiveTimeframe('WEEK')} className={`flex-1 py-3 text-sm font-bold transition-all ${activeTimeframe === 'WEEK' ? 'text-slate-900 dark:text-white border-b-2 border-primary' : 'text-slate-400'}`}>周</button>
          <button onClick={() => setActiveTimeframe('MONTH')} className={`flex-1 py-3 text-sm font-bold transition-all ${activeTimeframe === 'MONTH' ? 'text-slate-900 dark:text-white border-b-2 border-primary' : 'text-slate-400'}`}>月</button>
          <button onClick={() => setActiveTimeframe('YEAR')} className={`flex-1 py-3 text-sm font-bold transition-all ${activeTimeframe === 'YEAR' ? 'text-slate-900 dark:text-white border-b-2 border-primary' : 'text-slate-400'}`}>年</button>
        </div>
      </div>

      <main className="flex-1 px-4 py-2 overflow-y-auto no-scrollbar">
        <div className="relative flex flex-col items-center justify-center bg-white dark:bg-slate-900/40 rounded-3xl p-6 ios-shadow border border-slate-100 dark:border-slate-800/50">
          <div className="w-64 h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                  strokeLinecap="round"
                >
                  {currentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">总{activeType === 'EXPENSE' ? '支出' : '收入'}</span>
              <span className={`text-2xl font-black mt-1 ${activeType === 'INCOME' ? 'text-primary' : ''}`}>¥{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-8 w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold">{activeType === 'EXPENSE' ? '支出' : '收入'}明细</h3>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">排序: 金额</span>
            </div>
            
            <div className="space-y-4">
              {currentData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/20 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-slate-100/50 dark:border-slate-800/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                      <span className="material-symbols-outlined text-2xl">
                        {item.name === '餐饮' || item.name === '工资' ? 'restaurant_menu' : 
                         item.name === '购物' || item.name === '兼职' ? 'shopping_bag' :
                         item.name === '交通' || item.name === '奖金' ? 'directions_car' : 'stars'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-black">{item.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.value}% 分布</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-black ${activeType === 'INCOME' ? 'text-primary' : ''}`}>¥{(totalAmount * item.value / 100).toLocaleString()}</p>
                    <div className="w-20 h-1 bg-slate-100 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Statistics;

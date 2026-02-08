
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SettingsProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Settings: React.FC<SettingsProps> = ({ toggleDarkMode, isDarkMode }) => {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col pb-32 overflow-y-auto no-scrollbar">
      <header className="flex items-center justify-between px-6 pt-14 pb-4 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10">
        <h1 className="text-2xl font-bold tracking-tight">个人中心</h1>
        <div className="flex gap-2">
           <button 
            onClick={toggleDarkMode}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">notifications</span>
          </button>
        </div>
      </header>

      <div className="flex flex-col items-center px-6 py-6">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white dark:ring-slate-800 shadow-md">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full border-4 border-background-light dark:border-background-dark flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[14px] text-background-dark font-bold">edit</span>
          </button>
        </div>
        <h2 className="text-xl font-bold">极简侠</h2>
        <div className="mt-1 px-3 py-1 bg-primary/10 rounded-full">
          <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">Premium Member</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 px-6 mb-8">
        <StatCard value="128" label="记账天数" />
        <StatCard value="1,024" label="累计笔数" />
        <StatCard value="98%" label="预算达成" />
      </div>

      <main className="px-6 space-y-4">
        <div className="bg-white dark:bg-slate-800/40 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700/50">
          <MenuItem icon="account_balance_wallet" label="预算设置" onClick={() => navigate('/budget')} />
          <MenuItem icon="category" label="类别定制" onClick={() => navigate('/categories')} />
          <MenuItem icon="ios_share" label="导出数据" />
          <MenuItem icon="lock" label="安全与锁定" />
          <MenuItem icon="info" label="关于我们" last />
        </div>
        
        <div className="bg-white dark:bg-slate-800/40 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700/50">
          <MenuItem icon="help" label="帮助与反馈" />
          <MenuItem icon="star" label="给个好评" last />
        </div>

        <button className="w-full py-4 rounded-2xl bg-white dark:bg-slate-800/40 text-red-500 font-bold text-[15px] border border-slate-100 dark:border-slate-700/50 active:scale-[0.98] transition-all">
          退出登录
        </button>
      </main>
    </div>
  );
};

const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="bg-white dark:bg-slate-800/40 p-4 rounded-2xl flex flex-col items-center border border-slate-100/50 dark:border-slate-700/50 shadow-sm">
    <span className="text-lg font-bold">{value}</span>
    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-1">{label}</span>
  </div>
);

const MenuItem: React.FC<{ icon: string; label: string; last?: boolean; onClick?: () => void }> = ({ icon, label, last, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors ${!last ? 'border-b border-slate-50 dark:border-slate-700/30' : ''}`}
  >
    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center text-slate-600 dark:text-slate-300">
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <span className="flex-1 text-left font-bold text-[15px]">{label}</span>
    <span className="material-symbols-outlined text-slate-300 dark:text-slate-600">chevron_right</span>
  </button>
);

export default Settings;

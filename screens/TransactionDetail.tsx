
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_TRANSACTIONS } from '../constants';

const TransactionDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const transaction = MOCK_TRANSACTIONS.find(t => t.id === id) || MOCK_TRANSACTIONS[0];

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
          </button>
          <h2 className="text-lg font-bold leading-tight tracking-tight">账单详情</h2>
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-2xl">share</span>
          </button>
        </div>
      </div>

      <main className="max-w-md mx-auto pb-32">
        <div className="flex flex-col items-center py-8 px-4">
          <div className="size-20 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-primary text-4xl">restaurant</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {transaction.type === 'INCOME' ? '+' : '-'}¥{transaction.amount.toFixed(2)}
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            支出 · {transaction.categoryName}
          </p>
        </div>

        <div className="px-4 space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 px-2">交易明细</h3>
          
          <DetailRow icon="schedule" label="交易时间" value={`${transaction.date} ${transaction.time}`} />
          <DetailRow icon="account_balance_wallet" label="支付账户" value={`${transaction.account} (尾号 8829)`} />
          <DetailRow icon="notes" label="备注" value={transaction.note || '暂无备注'} vertical />

          <div className="pt-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 px-2">附件照片</h3>
            <div className="flex gap-3 px-2">
              <img src="https://picsum.photos/200/300?random=10" alt="Receipt" className="w-24 h-32 rounded-lg object-cover border border-slate-200 dark:border-slate-700 bg-slate-200" />
              <img src="https://picsum.photos/200/300?random=11" alt="Food" className="w-24 h-32 rounded-lg object-cover border border-slate-200 dark:border-slate-700 bg-slate-200" />
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 inset-x-0 max-w-md mx-auto bg-background-light dark:bg-background-dark/95 border-t border-slate-200 dark:border-slate-800 p-4 pb-8 backdrop-blur-md">
        <div className="flex flex-col gap-3">
          <button className="w-full bg-primary text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
            <span className="material-symbols-outlined text-xl">edit</span>
            <span>编辑账单</span>
          </button>
          <button className="w-full bg-transparent text-red-500 dark:text-red-400 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-500/5 active:bg-red-500/10 transition-all">
            <span className="material-symbols-outlined text-xl">delete</span>
            <span>删除记录</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailRow: React.FC<{ icon: string; label: string; value: string; vertical?: boolean }> = ({ icon, label, value, vertical }) => (
  <div className={`flex ${vertical ? 'items-start' : 'items-center'} gap-4 bg-white dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800`}>
    <div className={`size-10 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 ${vertical ? 'mt-1' : ''}`}>
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div className="flex flex-col flex-1">
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      <p className={`text-base font-semibold ${vertical ? 'font-medium leading-relaxed' : ''}`}>{value}</p>
    </div>
  </div>
);

export default TransactionDetail;

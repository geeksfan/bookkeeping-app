
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <div className="flex items-center justify-end p-6 pt-12">
        <button 
          onClick={() => navigate('/')}
          className="text-[#4c9a66] dark:text-primary text-sm font-bold leading-normal tracking-wide transition-opacity hover:opacity-70"
        >
          跳过
        </button>
      </div>

      <div className="flex-grow flex flex-col items-center px-8">
        <div className="w-full mb-12">
          <div className="relative w-full aspect-square flex items-center justify-center bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-x-12 inset-y-4 border-4 border-[#0d1b12] dark:border-white/20 rounded-[2.5rem] bg-white dark:bg-[#1a2e21] shadow-xl flex flex-col p-4 overflow-hidden">
                  <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 mx-auto mb-4 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-3 w-3/4 bg-primary/20 rounded"></div>
                    <div className="h-3 w-1/2 bg-primary/10 rounded"></div>
                  </div>
                  <div className="mt-auto h-12 w-full bg-primary/5 border border-primary/20 rounded-lg flex items-center px-2">
                    <span className="material-symbols-outlined text-primary text-sm">receipt_long</span>
                    <div className="ml-2 h-2 w-12 bg-primary/20 rounded"></div>
                  </div>
                </div>
                <div className="absolute top-10 -right-2 bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-primary text-3xl">sms</span>
                </div>
                <div className="absolute bottom-20 -left-4 bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-primary text-3xl">document_scanner</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4 max-w-sm">
          <h1 className="text-[#0d1b12] dark:text-white text-3xl font-extrabold tracking-tight leading-tight">
            自动记账，告别繁琐
          </h1>
          <p className="text-[#4c6052] dark:text-gray-400 text-base font-normal leading-relaxed">
            无需手动输入。我们的应用会自动从您的短信和电子票据中导入交易，为您每月节省数小时的时间。
          </p>
        </div>
      </div>

      <div className="px-8 pb-12 pt-8 flex flex-col items-center gap-8">
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="h-2 w-6 rounded-full bg-primary"></div>
          <div className="h-2 w-2 rounded-full bg-primary/20"></div>
          <div className="h-2 w-2 rounded-full bg-primary/20"></div>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="w-full bg-primary hover:bg-primary/90 text-[#0d1b12] font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
        >
          立即开启
        </button>
        <p className="text-xs text-[#4c6052]/60 dark:text-gray-500 text-center">
          数据加密存储，我们始终保护您的隐私安全
        </p>
      </div>
    </div>
  );
};

export default Onboarding;

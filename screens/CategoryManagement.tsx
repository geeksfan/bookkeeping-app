
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Storage } from '../storage';
import { Category } from '../types';

const CategoryManagement: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'EXPENSE' | 'INCOME'>('EXPENSE');
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('grid_view');

  useEffect(() => {
    loadCategories();
  }, [activeTab]);

  const loadCategories = () => {
    const data = activeTab === 'EXPENSE' ? Storage.getExpenseCategories() : Storage.getIncomeCategories();
    setCategories(data);
  };

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    const newCat: Category = {
      id: Date.now().toString(),
      name: newCatName,
      icon: newCatIcon,
      colorClass: 'text-primary',
      bgClass: 'bg-primary/20'
    };

    const current = activeTab === 'EXPENSE' ? Storage.getExpenseCategories() : Storage.getIncomeCategories();
    const updated = [...current, newCat];
    
    if (activeTab === 'EXPENSE') Storage.saveExpenseCategories(updated);
    else Storage.saveIncomeCategories(updated);

    setNewCatName('');
    setShowAddModal(false);
    loadCategories();
  };

  const handleRemoveCategory = (id: string) => {
    const updated = categories.filter(c => c.id !== id);
    if (activeTab === 'EXPENSE') Storage.saveExpenseCategories(updated);
    else Storage.saveIncomeCategories(updated);
    loadCategories();
  };

  const ICONS = ['restaurant', 'shopping_bag', 'directions_car', 'sports_esports', 'medical_services', 'storefront', 'school', 'payments', 'work', 'trending_up', 'card_giftcard', 'grid_view'];

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark">
      <header className="flex items-center justify-between p-4 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10 border-b border-slate-100 dark:border-slate-800">
        <button onClick={() => navigate(-1)} className="size-10 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-lg font-black uppercase tracking-widest">类别定制</h1>
        <button className="text-primary font-black text-sm px-3 py-1">排序</button>
      </header>

      <div className="px-6 py-4 flex flex-col h-full">
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-8">
          <button 
            onClick={() => setActiveTab('EXPENSE')}
            className={`flex-1 py-3 text-xs font-black rounded-xl transition-all ${activeTab === 'EXPENSE' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'}`}
          >支出类别</button>
          <button 
            onClick={() => setActiveTab('INCOME')}
            className={`flex-1 py-3 text-xs font-black rounded-xl transition-all ${activeTab === 'INCOME' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'}`}
          >收入类别</button>
        </div>

        <div className="grid grid-cols-4 gap-y-10 gap-x-4">
          {categories.map((cat) => (
            <div key={cat.id} className="flex flex-col items-center gap-2 animate-in fade-in zoom-in duration-300">
              <div className="relative">
                <div className={`size-14 rounded-2xl flex items-center justify-center transition-all bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm`}>
                  <span className={`material-symbols-outlined text-2xl ${cat.colorClass}`}>
                    {cat.icon}
                  </span>
                </div>
                <button 
                  onClick={() => handleRemoveCategory(cat.id)}
                  className="absolute -top-1.5 -right-1.5 size-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg active:scale-90"
                >
                  <span className="material-symbols-outlined text-[14px] font-bold">remove</span>
                </button>
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                {cat.name}
              </span>
            </div>
          ))}
          <div onClick={() => setShowAddModal(true)} className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="size-14 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all">
              <span className="material-symbols-outlined text-2xl">add</span>
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">添加新类别</span>
          </div>
        </div>

        <div className="mt-auto p-6 bg-primary/5 rounded-[2rem] border border-primary/10 mb-8">
          <p className="text-[10px] font-black text-primary mb-2 uppercase tracking-widest">使用小贴士</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-bold">
            您可以根据自己的消费习惯定制分类。长按图标可进入排序模式，确保最常用的分类排在首位。
          </p>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end">
          <div className="bg-white dark:bg-slate-900 rounded-t-[3rem] p-8 pb-12 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black uppercase tracking-widest">新建分类</h3>
              <button onClick={() => setShowAddModal(false)} className="size-10 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">分类名称</label>
                <input 
                  autoFocus
                  type="text" 
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="例如: 零食、房租..."
                  className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block px-1">选择图标</label>
                <div className="grid grid-cols-6 gap-3">
                  {ICONS.map(icon => (
                    <button 
                      key={icon}
                      onClick={() => setNewCatIcon(icon)}
                      className={`size-12 rounded-xl flex items-center justify-center transition-all ${newCatIcon === icon ? 'bg-primary text-black font-bold shadow-lg shadow-primary/20 scale-110' : 'bg-slate-50 dark:bg-white/5 text-slate-400'}`}
                    >
                      <span className="material-symbols-outlined">{icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleAddCategory}
                disabled={!newCatName.trim()}
                className="w-full bg-primary text-black font-black py-5 rounded-[1.5rem] shadow-xl shadow-primary/20 disabled:opacity-50 transition-all active:scale-95 mt-4"
              >
                保存分类
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;

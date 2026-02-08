
import { Category, Transaction, TransactionType, Account } from './types';

export const EXPENSE_CATEGORIES: Category[] = [
  { id: '1', name: '餐饮', icon: 'restaurant', colorClass: 'text-orange-600', bgClass: 'bg-orange-100' },
  { id: '2', name: '购物', icon: 'shopping_bag', colorClass: 'text-blue-600', bgClass: 'bg-blue-100' },
  { id: '3', name: '交通', icon: 'directions_car', colorClass: 'text-amber-600', bgClass: 'bg-amber-100' },
  { id: '4', name: '娱乐', icon: 'sports_esports', colorClass: 'text-purple-600', bgClass: 'bg-purple-100' },
  { id: '5', name: '医疗', icon: 'medical_services', colorClass: 'text-red-500', bgClass: 'bg-red-50' },
  { id: '6', name: '超市', icon: 'storefront', colorClass: 'text-cyan-600', bgClass: 'bg-cyan-50' },
  { id: '7', name: '教育', icon: 'school', colorClass: 'text-indigo-500', bgClass: 'bg-indigo-50' },
  { id: '9', name: '其他', icon: 'grid_view', colorClass: 'text-gray-500', bgClass: 'bg-gray-100' },
];

export const INCOME_CATEGORIES: Category[] = [
  { id: 'i1', name: '工资', icon: 'payments', colorClass: 'text-primary', bgClass: 'bg-primary/20' },
  { id: 'i2', name: '兼职', icon: 'work', colorClass: 'text-blue-500', bgClass: 'bg-blue-50' },
  { id: 'i3', name: '理财', icon: 'trending_up', colorClass: 'text-emerald-500', bgClass: 'bg-emerald-50' },
  { id: 'i4', name: '礼金', icon: 'card_giftcard', colorClass: 'text-rose-500', bgClass: 'bg-rose-50' },
  { id: 'i5', name: '奖金', icon: 'military_tech', colorClass: 'text-amber-500', bgClass: 'bg-amber-50' },
  { id: 'i6', name: '报销', icon: 'description', colorClass: 'text-teal-500', bgClass: 'bg-teal-50' },
];

export const CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export const MOCK_ACCOUNTS: Account[] = [
  { id: 'a1', name: '现金', type: '流动资产', balance: 2500.00, icon: 'payments', colorClass: 'border-l-primary/60' },
  { id: 'a2', name: '招商银行', type: '**** 8821', balance: 45820.50, icon: 'credit_card', colorClass: 'border-l-blue-500/60' },
  { id: 'a3', name: '支付宝', type: '余额宝', balance: 12300.20, icon: 'account_balance', colorClass: 'border-l-cyan-500/60' },
  { id: 'a4', name: '微信支付', type: '零钱', balance: 5680.00, icon: 'chat_bubble', colorClass: 'border-l-primary' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', amount: 35.00, type: TransactionType.EXPENSE, categoryId: '1', categoryName: '餐饮', date: '2023-10-24', time: '12:30', note: '拿铁咖啡', account: '现金' },
  { id: 't2', amount: 42.50, type: TransactionType.EXPENSE, categoryId: '3', categoryName: '交通', date: '2023-10-24', time: '09:15', note: '网约车', account: '支付宝' },
  { id: 't3', amount: 1200.00, type: TransactionType.INCOME, categoryId: 'i2', categoryName: '兼职', date: '2023-10-24', time: '08:00', note: '设计稿费', account: '微信支付' },
  { id: 't4', amount: 199.00, type: TransactionType.EXPENSE, categoryId: '2', categoryName: '购物', date: '2023-10-23', time: '19:45', note: '优衣库', account: '招商银行' },
  { id: 't5', amount: 6500.00, type: TransactionType.INCOME, categoryId: 'i1', categoryName: '工资', date: '2023-10-10', time: '10:00', note: '10月基本工资', account: '招商银行' },
];

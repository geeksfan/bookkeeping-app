
import { Transaction, Category, Account, TransactionType } from './types';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, MOCK_ACCOUNTS, MOCK_TRANSACTIONS } from './constants';

const KEYS = {
  TRANSACTIONS: 'mm_transactions',
  EXPENSE_CATS: 'mm_expense_categories',
  INCOME_CATS: 'mm_income_categories',
  ACCOUNTS: 'mm_accounts',
  BUDGET: 'mm_budget'
};

export const Storage = {
  getTransactions: (): Transaction[] => {
    const data = localStorage.getItem(KEYS.TRANSACTIONS);
    return data ? JSON.parse(data) : MOCK_TRANSACTIONS;
  },
  saveTransactions: (data: Transaction[]) => {
    localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(data));
  },
  addTransaction: (t: Transaction) => {
    const all = Storage.getTransactions();
    Storage.saveTransactions([t, ...all]);
  },
  
  getExpenseCategories: (): Category[] => {
    const data = localStorage.getItem(KEYS.EXPENSE_CATS);
    return data ? JSON.parse(data) : EXPENSE_CATEGORIES;
  },
  saveExpenseCategories: (data: Category[]) => {
    localStorage.setItem(KEYS.EXPENSE_CATS, JSON.stringify(data));
  },
  
  getIncomeCategories: (): Category[] => {
    const data = localStorage.getItem(KEYS.INCOME_CATS);
    return data ? JSON.parse(data) : INCOME_CATEGORIES;
  },
  saveIncomeCategories: (data: Category[]) => {
    localStorage.setItem(KEYS.INCOME_CATS, JSON.stringify(data));
  },
  
  getAccounts: (): Account[] => {
    const data = localStorage.getItem(KEYS.ACCOUNTS);
    return data ? JSON.parse(data) : MOCK_ACCOUNTS;
  },
  saveAccounts: (data: Account[]) => {
    localStorage.setItem(KEYS.ACCOUNTS, JSON.stringify(data));
  },

  getBudget: (): number => {
    const data = localStorage.getItem(KEYS.BUDGET);
    return data ? parseFloat(data) : 5000;
  },
  saveBudget: (val: number) => {
    localStorage.setItem(KEYS.BUDGET, val.toString());
  }
};

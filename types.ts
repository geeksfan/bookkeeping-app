
export enum TransactionType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME'
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  colorClass: string;
  bgClass: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  categoryName: string;
  date: string;
  time: string;
  note: string;
  account: string;
}

export interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  icon: string;
  colorClass: string;
}

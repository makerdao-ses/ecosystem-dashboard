import { useContext, createContext } from 'react';
import type { Budget } from '../models/interfaces/budget';

export type BudgetContextValues = {
  allBudgets: Budget[];
  setCurrentBudget: (budget: Budget[]) => void;
};

export const BudgetContext = createContext<BudgetContextValues>({} as BudgetContextValues);

export const useBudgetContext = () => useContext(BudgetContext);

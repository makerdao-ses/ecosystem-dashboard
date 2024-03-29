export type TransitionStatusDataShown = 'PaymentsOnChain' | 'Budget';

export interface BudgetTransitionPlainData {
  [period: string]: {
    endgame: number;
    legacy: number;
  };
}

export interface SeriesData {
  value: number;
  itemStyle: {
    borderRadius: number[];
  };
}

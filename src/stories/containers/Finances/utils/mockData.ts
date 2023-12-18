/* eslint-disable max-lines */
// TODO:  Add builder for this mock data when Api is ready
export interface BudgetData {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  total: number;
}
export interface RowsItems {
  name: string;
  isMain?: boolean;
  budget: BudgetData;
  actual: BudgetData;
  'Net Expenses On-chain': BudgetData;
  'Net Expenses Off-chain': BudgetData;
  forecast: BudgetData;
}

export interface QuarterlyBudget {
  tableName: string;
  rows: RowsItems[];
  others?: boolean;
}

export const mockDataTableQuarterlyArray: QuarterlyBudget[] = [
  {
    tableName: 'Endgame Atlas Budgets1',
    rows: [
      {
        name: 'Atlas Immutable AA Budgets ',
        isMain: true,
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        actual: {
          q1: 1123,
          q2: 4546,
          q3: 12312,
          q4: 1223,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2341,
          q2: 23435,
          q3: 4653,
          q4: 676878,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
      {
        name: 'Aligned Delegates',
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
      {
        name: 'Aligned Delegates',
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
      {
        name: 'Aligned Delegates',
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
      {
        name: 'Aligned Delegates',
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
      {
        name: 'Aligned Delegates',
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
      {
        name: 'Aligned Delegates',
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
      {
        name: 'Aligned Delegates',
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
      {
        name: 'Aligned Delegates',
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
      {
        name: 'Aligned Delegates',
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
      {
        name: 'Aligned Voter Committees',
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 4546676,
          q2: 2208889,
          q3: 4546676,
          q4: 1223232,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
    ],
  },
  {
    tableName: 'Endgame Scope Budgets2',
    rows: [
      {
        name: 'Alignment Scope Budgets ',
        isMain: true,
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 999999999,
          q2: 2208889,
          q3: 999999999,
          q4: 2208889,
          total: 454545,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
      {
        name: 'Support Scope (SUP)',
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
      {
        name: 'Stability Scope (STA)',
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
    ],
  },
  {
    tableName: 'MakerDAO Legacy Budgets3',
    rows: [
      {
        name: 'MakerDAO Legacy Budgets',
        isMain: true,
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
      {
        name: 'Support Scope (SUP)',
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
      {
        name: 'Support Scope (SUP)',
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
      {
        name: 'Support Scope (SUP)',
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
      {
        name: 'Support Scope (SUP)',
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
      {
        name: 'Support Scope (SUP)',
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
      {
        name: 'Support Scope (SUP)',
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
      {
        name: 'Support Scope (SUP)',
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
      {
        name: 'Support Scope (SUP)',
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
      {
        name: 'Support Scope (SUP)',
        forecast: {
          q1: 1234567,
          q2: 123,
          q3: 3455,
          q4: 345436,
          total: 34354,
        },
        budget: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        actual: {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses On-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
        'Net Expenses Off-chain': {
          q1: 2208889,
          q2: 2208889,
          q3: 2208889,
          q4: 2208889,
          total: 34354,
        },
      },
    ],
  },
];

export const atlasBudget = [
  {
    value: 1450000,
  },
  {
    value: 1450000,
  },
  {
    value: 1450000,
  },
  {
    value: 1300000,
  },
  {
    value: 1400000,
  },
  {
    value: 1280000,
  },
  {
    value: 640000,
  },
  {
    value: 320000,
  },
  {
    value: 160000,
  },
  {
    value: 80000,
  },
  {
    value: 25000,
  },
  {
    value: 10000,
  },
];

export const scopeBudget = [
  {
    value: 123434,
  },
  {
    value: 123434,
  },
  {
    value: 123434,
  },
  {
    value: 123434,
  },
  {
    value: 100000,
  },
  {
    value: 250000,
  },
  {
    value: 900000,
  },
  {
    value: 1250000,
  },
  {
    value: 0,
  },
  {
    value: 1400000,
  },
  {
    value: 1400000,
  },
  {
    value: 1500000,
  },
];

export const legacyBudget = [
  {
    value: 0,
  },
  {
    value: 43434,
  },
  {
    value: 452342,
  },
  {
    value: 23543,
  },
  {
    value: 43434,
  },
  {
    value: 0,
  },
  {
    value: 54456,
  },
  {
    value: 235425,
  },
  {
    value: 175000,
  },
  {
    value: 180000,
  },
  {
    value: 220000,
  },
  {
    value: 200000,
  },
];

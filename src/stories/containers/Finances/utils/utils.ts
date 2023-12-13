import { siteRoutes } from '@ses/config/routes';
import { fetchAnalytics } from '@ses/containers/Finances/api/queries';
import { SortEnum } from '@ses/core/enums/sortEnum';
import { BudgetStatus, ResourceType } from '@ses/core/models/interfaces/types';
import { NUMBER_ROWS_FINANCES_TABLE } from '@ses/core/utils/const';
import lightTheme from '@ses/styles/theme/light';
import { DateTime } from 'luxon';

import type { QuarterlyBudget, RowsItems } from './mockData';
import type {
  DelegateExpenseTableHeader,
  Metric,
  MetricsWithAmount,
  MomentDataItem,
  PeriodicSelectionFilter,
} from './types';
import type { ValuesDataWithBorder } from '@ses/core/models/dto/chartDTO';
import type {
  ValueAndUnit,
  BudgetMetric,
  Analytic,
  BudgetAnalytic,
  BreakdownBudgetAnalytic,
  AnalyticGranularity,
} from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';

export const calculateValuesByBreakpoint = (
  isTable: boolean,
  isDesktop1024: boolean,
  isDesktop1280: boolean,
  isDesktop1440: boolean
) => {
  const radius = isTable || isDesktop1024 ? [32, 64] : isDesktop1280 ? [50, 96] : isDesktop1440 ? [48, 96] : [48, 96];
  const center = isTable
    ? [68, '50%']
    : isDesktop1024
    ? ['50%', '50%']
    : isDesktop1280
    ? ['50%', '50%']
    : ['50%', '50%'];
  const paddingLegend = isTable
    ? [20, 60, 0, 0]
    : isDesktop1024
    ? [18, 58, 0, 0]
    : isDesktop1280
    ? [22, 6, 0, 0]
    : isDesktop1440
    ? [22, 2, 0, 0]
    : [22, 2, 0, 0];

  const paddingRichTextName = isTable ? [20, 0, 14, 0] : isDesktop1024 ? [26, 0, 7, 0] : [26, 0, 13.7, 1];
  const paddingRichTextValue = isTable ? [-6, -2, 0, 0] : isDesktop1024 ? [-8, 0, 0, 0] : [0, 0, 0, 2];
  const paddingRichTextDai = isTable ? [-6, 4, 0, 8] : isDesktop1024 ? [-8, 4, 0, 4] : [0, 4, 0, 4];
  const paddingRichTextPercent = isTable ? [-6, 0, 0, 0] : isDesktop1024 ? [0, 0, 8, 0] : [0, 0, 0, 0];

  return {
    radius,
    center,
    paddingLegend,
    paddingRichTextName,
    paddingRichTextValue,
    paddingRichTextDai,
    paddingRichTextPercent,
  };
};
export const mockDataApiTeam: MomentDataItem[] = [
  {
    id: '34',
    code: 'SES-001',
    shortCode: 'SES',
    name: 'Sustainable Ecosystem Scaling',
    image: 'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png',
    category: [],
    sentenceDescription: '',
    paragraphDescription: '',
    paragraphImage: '',
    lastModified: DateTime.fromISO('2023-09-01T09:08:34.123'),
    reportMonth: DateTime.fromISO('2023-03-01T09:08:34.123'),
    totalActuals: 2048873,
    lastActivity: {
      id: '343',
      created_at: '2023-08-30T09:08:34.123',
      event: 'event',
      params: {},
      description: '',
    },
    legacyBudgetStatementUrl: '',
    budgetId: '',
    type: ResourceType.CoreUnit,
    auditors: [],
    socialMediaChannels: [],
    contributorCommitment: [],
    cuGithubContribution: [],
    updates: [],
    scopes: [],
    budgetStatements: [
      {
        id: '234',
        ownerId: '34',
        status: BudgetStatus.Draft,
        ownerType: '',
        month: 'some',
        ownerCode: 'ses',
        mkrProgramLength: 34,
        publicationUrl: '3432',
        activityFeed: [],
        auditReport: [],
        budgetStatementFTEs: [],
        budgetStatementMKRVest: [],
        budgetStatementWallet: [],
        comments: [],
      },
    ],
    cuMip: null,
  },
  {
    id: '45',
    code: 'RISK-01',
    shortCode: 'RISK',
    name: 'RISK-01',
    image: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/risk-001/RISK_logo.png',
    category: [],
    sentenceDescription: '',
    paragraphDescription: '',
    paragraphImage: '',
    lastModified: DateTime.fromISO('2023-09-01T09:08:34.123'),
    reportMonth: DateTime.fromISO('2023-09-01T09:08:34.123'),
    totalActuals: 2048873,
    lastActivity: {
      id: '343',
      created_at: '2023-09-01T09:08:34.123',
      event: 'event',
      params: {},
      description: '',
    },
    legacyBudgetStatementUrl: '',
    budgetId: '',
    type: ResourceType.CoreUnit,
    auditors: [],
    socialMediaChannels: [],
    contributorCommitment: [],
    cuGithubContribution: [],
    updates: [],
    scopes: [],
    budgetStatements: [
      {
        id: '234',
        ownerId: '34',
        status: BudgetStatus.Draft,
        ownerType: '',
        month: 'some',
        ownerCode: 'ses',
        mkrProgramLength: 34,
        publicationUrl: '3432',
        activityFeed: [],
        auditReport: [],
        budgetStatementFTEs: [],
        budgetStatementMKRVest: [],
        budgetStatementWallet: [],
        comments: [],
      },
    ],
    cuMip: null,
  },
  {
    id: '34',
    code: 'GOV-001',
    shortCode: 'GV',
    name: 'Governance Alpha',
    image: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/pe-001/pe_logo.png',
    category: [],
    sentenceDescription: '',
    paragraphDescription: '',
    paragraphImage: '',
    lastModified: DateTime.fromISO('2023-09-22T09:08:34.123'),
    reportMonth: DateTime.fromISO('2014-01-25T09:08:34.123'),
    totalActuals: 2048873,
    lastActivity: {
      id: '343',
      created_at: '2023-09-01T09:08:34.123',
      event: 'event',
      params: {},
      description: '',
    },
    legacyBudgetStatementUrl: '',
    budgetId: '',
    type: ResourceType.EcosystemActor,
    auditors: [],
    socialMediaChannels: [],
    contributorCommitment: [],
    cuGithubContribution: [],
    updates: [],
    scopes: [],
    budgetStatements: [
      {
        id: '234',
        ownerId: '34',
        status: BudgetStatus.Final,
        ownerType: '',
        month: 'some',
        ownerCode: 'ses',
        mkrProgramLength: 34,
        publicationUrl: '3432',
        activityFeed: [],
        auditReport: [],
        budgetStatementFTEs: [],
        budgetStatementMKRVest: [],
        budgetStatementWallet: [],
        comments: [],
      },
    ],
    cuMip: null,
  },
  {
    id: '34',
    code: 'RWF-001',
    shortCode: 'RWF',
    name: 'Real-World Finance',
    image: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/rwf-001/RWF_logo.png',
    category: [],
    sentenceDescription: '',
    paragraphDescription: '',
    paragraphImage: '',
    lastModified: DateTime.fromISO('2023-09-12T09:08:34.123'),
    reportMonth: DateTime.fromISO('2013-03-25T09:08:34.123'),
    totalActuals: 456347,
    lastActivity: {
      id: '343',
      created_at: '2023-09-01T09:08:34.123',
      event: 'event',
      params: {},
      description: '',
    },
    legacyBudgetStatementUrl: '',
    budgetId: '',
    type: ResourceType.CoreUnit,
    auditors: [],
    socialMediaChannels: [],
    contributorCommitment: [],
    cuGithubContribution: [],
    updates: [],
    scopes: [],
    budgetStatements: [],
    cuMip: null,
  },
  {
    id: '34',
    code: 'GRO-001',
    shortCode: 'GRO',
    name: 'Growth',
    image: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/gro-001/gro_logo.png',
    category: [],
    sentenceDescription: '',
    paragraphDescription: '',
    paragraphImage: '',
    lastModified: DateTime.fromISO('2023-09-02T09:08:34.123'),
    reportMonth: DateTime.fromISO('2012-04-25T09:08:34.123'),
    totalActuals: 244567,
    lastActivity: {
      id: '343',
      created_at: '2023-09-01T09:08:34.123',
      event: 'event',
      params: {},
      description: '',
    },
    legacyBudgetStatementUrl: '',
    budgetId: '',
    type: ResourceType.CoreUnit,
    auditors: [],
    socialMediaChannels: [],
    contributorCommitment: [],
    cuGithubContribution: [],
    updates: [],
    scopes: [],
    budgetStatements: [],
    cuMip: null,
  },
  {
    id: '34',
    code: 'GRO-001',
    shortCode: 'GRO',
    name: 'Growth',
    image: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/gro-001/gro_logo.png',
    category: [],
    sentenceDescription: '',
    paragraphDescription: '',
    paragraphImage: '',
    lastModified: DateTime.fromISO('2023-09-02T09:08:34.123'),
    reportMonth: DateTime.fromISO('2012-04-25T09:08:34.123'),
    totalActuals: 244567,
    lastActivity: {
      id: '343',
      created_at: '2023-09-01T09:08:34.123',
      event: 'event',
      params: {},
      description: '',
    },
    legacyBudgetStatementUrl: '',
    budgetId: '',
    type: ResourceType.CoreUnit,
    auditors: [],
    socialMediaChannels: [],
    contributorCommitment: [],
    cuGithubContribution: [],
    updates: [],
    scopes: [],
    budgetStatements: [],
    cuMip: null,
  },
];

// TODO: Update function when are data in the API
export const getStatus = (budget: BudgetStatement[]) => budget[0]?.status;
export const getShowCTA = () => false;
export const getQuarterlyForFilters = (year: number): string[] => {
  const period: string[] = [];
  for (let i = 2; i <= 5; i++) {
    const quarter = `Q${i} ${year}`;
    period.push(quarter);
  }
  return period;
};
export const getExpenseMonthWithData = (expense: MomentDataItem) => {
  if (expense?.lastActivity?.created_at) {
    return DateTime.fromISO(expense.lastActivity?.created_at);
  }

  return undefined;
};

export const isCoreUnit = (item: MomentDataItem) => item?.type === ResourceType.CoreUnit;
export const getHeadersExpenseReport = (
  headersSort: SortEnum[],
  selectedMetric: string,
  isSmallDesk: boolean
): DelegateExpenseTableHeader[] => [
  {
    header: 'Contributors',
    styles: {
      boxSizing: 'border-box',
      minWidth: 310,
      paddingLeft: 16,
    },
    sortReverse: true,
    sort: headersSort[0],
  },
  {
    header: isSmallDesk ? 'Rep Month' : 'Reporting Month',
    styles: {
      width: 130,
      marginLeft: -22,

      [lightTheme.breakpoints.up('desktop_1280')]: {
        width: 152,
        marginLeft: -22,
      },
      [lightTheme.breakpoints.up('desktop_1440')]: {
        marginLeft: -102,
      },
    },
    sortReverse: true,
    sort: headersSort[1],
  },
  {
    header: selectedMetric.replace('Expenses', ''),
    sort: headersSort[2],
    styles: {
      width: 130,
      marginLeft: -26,

      [lightTheme.breakpoints.up('desktop_1280')]: {
        marginLeft: -52,
      },
      [lightTheme.breakpoints.up('desktop_1440')]: {
        marginLeft: -102,
        justifyContent: 'center',
      },
    },
    sortReverse: true,
  },

  {
    header: 'Status',
    sort: headersSort[3],
    styles: {
      width: 100,
      marginLeft: -20,
      [lightTheme.breakpoints.up('desktop_1280')]: {
        marginLeft: -22,
      },
      [lightTheme.breakpoints.up('desktop_1440')]: {
        marginLeft: -80,
        justifyContent: 'center',
      },
    },
    sortReverse: true,
  },
  {
    header: 'Last Modified',
    sort: headersSort[4],
    styles: {
      width: 130,

      [lightTheme.breakpoints.up('desktop_1280')]: {
        marginLeft: 30,
      },
      [lightTheme.breakpoints.up('desktop_1440')]: {
        marginLeft: 0,
        marginRight: -80,
        justifyContent: 'center',
      },
    },
    sortReverse: true,
  },
  {
    header: '',
    sort: SortEnum.Disabled,
    styles: {
      width: 111,
      [lightTheme.breakpoints.up('desktop_1280')]: {
        marginLeft: 0,
        width: 110,
      },
      [lightTheme.breakpoints.up('desktop_1440')]: {
        marginLeft: 0,
        justifyContent: 'center',
      },
    },
    sortReverse: true,
  },
];

export const enumForStories: SortEnum[] = [
  SortEnum.Asc,
  SortEnum.Neutral,
  SortEnum.Neutral,
  SortEnum.Neutral,
  SortEnum.Neutral,
];

export const getLinkLastExpenseReport = (code: string, reportExpenseItems: MomentDataItem[]) => {
  const reportResult = reportExpenseItems.find((report) => report.shortCode === code);
  if (reportResult) {
    const typeReport = isCoreUnit(reportResult);
    if (typeReport) {
      return siteRoutes.coreUnitAbout(code);
    } else {
      return siteRoutes.ecosystemActorAbout(code);
    }
  }
};

export const getPeriodForFilters = (year: string) => {
  const quarterlies: string[] = [];

  for (let i = 1; i <= 4; ++i) {
    const quarterly = `Q${i} ${year}`;
    quarterlies.push(quarterly);
  }
  return quarterlies;
};

export const getPeriodForSemiAnnual = (year: string) => {
  const semiAnnual: string[] = [];
  for (let i = 1; i <= 2; ++i) {
    const quarterly = `H${i}’ ${year}`;
    semiAnnual.push(quarterly);
  }
  return semiAnnual;
};

export const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const returnShortNameForMetric = (metric: MetricsWithAmount) => {
  if (metric.name === 'Net Expenses On-chain') {
    return {
      ...metric,
      name: 'On-chain',
    };
  }
  if (metric.name === 'Net Expenses Off-chain') {
    return {
      ...metric,
      name: 'Off-chain',
    };
  }
  return metric;
};

export const searchMetric = (obj: RowsItems, metric: string) => {
  switch (metric.toLocaleLowerCase()) {
    case 'budget':
      return obj.budget;
    case 'actual':
      return obj.actual;
    case 'Net Expenses Off-chain':
      return obj['Net Expenses Off-chain'];
    case 'Net Expenses On-chain':
      return obj['Net Expenses On-chain'];
    case 'forecast':
      return obj.forecast;
    default:
      return undefined;
  }
};

export const getMetricByPeriod = (
  period: PeriodicSelectionFilter,
  isMobile: boolean,
  isTable: boolean,
  isDesk1024: boolean,
  isDesk1280: boolean,
  isDesk1440: boolean,
  isDesk1920: boolean
) => {
  let metricsCount = 0;

  // This is for metrics base on the resolution
  if (period === 'Semi-annual') {
    metricsCount = 1;
  } else if (period === 'Annually') {
    if (isMobile) {
      metricsCount = 3;
    } else {
      metricsCount = 5;
    }
  } else if (period === 'Monthly' && (isDesk1440 || isDesk1920)) {
    metricsCount = 1;
  } else if (period === 'Quarterly') {
    if (isTable) metricsCount = 1;
    if (isDesk1024 || isDesk1280 || isDesk1440) metricsCount = 2;
    if (isDesk1920) metricsCount = 3;
  }

  return metricsCount;
};

export const sortDataByElementCount = (data: QuarterlyBudget[]) => {
  if (!data) {
    return [];
  }
  return data.sort((a, b) => b.rows.length - a.rows.length);
};

// Get first element of each table that always have to appear
export const getFirstElementEachTable = (data: QuarterlyBudget[]): RowsItems[] => {
  const orderData = sortDataByElementCount(data);
  const getFirstElements = orderData.map((item: QuarterlyBudget) => item.rows[0]);
  return getFirstElements;
};

export const showOnlySixteenRowsWithOthers = (data: QuarterlyBudget[]) => {
  const maxRows = NUMBER_ROWS_FINANCES_TABLE;
  let totalRowsPerTable = 0;
  let itemArrayTableHasOthers: QuarterlyBudget = {
    rows: [],
    tableName: '',
    others: false,
  };

  const orderData = sortDataByElementCount(data);
  const firstElementOfArray = getFirstElementEachTable(orderData);

  const result = firstElementOfArray.map((row, index) => ({
    tableName: orderData[index].tableName,
    rows: [firstElementOfArray[index]],
    others: false,
  }));
  const totalRows = data.reduce((acc, element) => acc + element.rows.length, 0);

  if (totalRows <= maxRows) {
    return data;
  }
  for (const item of orderData) {
    if (item.rows.length + totalRowsPerTable > 16) {
      itemArrayTableHasOthers = {
        rows: item.rows,
        others: false,
        tableName: item.tableName,
      };
      break;
    }
    const indexItem = result.findIndex((element) => element.tableName === item.tableName);
    const takeAllElementLessOne = item.rows.slice(1, item.rows.length);

    result[indexItem].rows.push(...takeAllElementLessOne);
    totalRowsPerTable += item.rows.length;
  }

  if (itemArrayTableHasOthers.rows) {
    const indexItem = result.findIndex((element) => element.tableName === itemArrayTableHasOthers.tableName);

    itemArrayTableHasOthers.rows.forEach((item, index) => {
      // Les than 12 because 3 of head of each table and now new one is others dont get the firsts element
      if (totalRowsPerTable <= 12 && index !== 0) {
        result[indexItem].rows.push(item);
        totalRowsPerTable++;
      }
    });
    if (indexItem !== orderData.length - 1) {
      result[indexItem].others = true;
    } else {
      result[indexItem].others = false;
    }
  }

  return result;
};
export const generateColorPalette = (index: number, numColors: number, existingColors: string[] = []) => {
  const baseHue = (index * (360 / numColors)) % 360;
  const colors = [];

  for (let i = 0; i < numColors; i++) {
    const hue = (baseHue + i * (360 / numColors)) % 360;
    const color = `hsl(${hue}, 70%, 50%)`;
    colors.push(color);
  }

  return [...existingColors, ...colors];
};
// Remove prefix in the string
export const removePrefix = (inputString: string, prefix: string) => {
  if (!inputString) return 'No-Name';
  const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`^${escapedPrefix}\\s*`, 'i');
  const result = inputString.replace(regex, '');
  return result;
};
// Prefix to delete from Api text
export const prefixToRemove = 'End-game';

// Colors for the first level in Finances Charts OverView
export const existingColors: string[] = ['#F99374', '#447AFB', '#2DC1B1'];
export const existingColorsDark: string[] = ['#F77249', '#447AFB', '#1AAB9B'];

// Got all the level
export const getNumbersFromIdPath = (idPath: string) => {
  if (idPath.length === 0) {
    return idPath;
  }
  const numbers = idPath.split('/').map((item) => item);
  return numbers;
};

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

const fillArrayWhenNoData = (series: { value: number }[]) => {
  const filledArray = new Array<{ value: number }>(12).fill({ value: 0 });

  const monthWithData = series.map((item) => ({
    value: item.value,
  }));
  monthWithData.forEach((itemY, index) => {
    filledArray[index] = {
      value: itemY.value || 0,
    };
  });
  return filledArray;
};

export const processingData = (series: { value: number }[]) => {
  const fillingArray = fillArrayWhenNoData(series);
  return fillingArray;
};

export const getYearsRange = () => {
  const year = DateTime.utc().year;
  const yearsRange = Array(1 + year - 2021)
    .fill('')
    .map((_, i) => (year - i).toString());
  return yearsRange;
};

const setMetric = (value: number, unit: string) =>
  ({
    value: Math.abs(value),
    unit,
  } as ValueAndUnit);

export const newBudgetMetric = () =>
  ({
    actuals: setMetric(0, ''),
    budget: setMetric(0, ''),
    forecast: setMetric(0, ''),
    paymentsOnChain: setMetric(0, ''),
    paymentsOffChainIncluded: setMetric(0, ''),
  } as BudgetMetric);

export const getAnalyticsAnnual = (analytics: Analytic, budgets: Budget[]): BudgetAnalytic => {
  const budgetsAnalytics: BudgetAnalytic = {};
  const series = analytics.series[0];

  budgets.forEach((budget) => {
    const budgetMetric = newBudgetMetric();
    // Remove this when the Api are ready with the correct codePath
    const codePath = budget.codePath === '142' ? 'legacy' : budget.codePath;
    series?.rows?.forEach((row) => {
      if (row.dimensions.some((dimension) => dimension.name === 'budget' && dimension.path === codePath)) {
        switch (row.metric) {
          case 'Actuals':
            budgetMetric.actuals = setMetric(row.value, row.unit);
            break;
          case 'Forecast':
            budgetMetric.forecast = setMetric(row.value, row.unit);
            break;
          case 'Budget':
            budgetMetric.budget = setMetric(row.value, row.unit);
            break;
          case 'PaymentsOnChain':
            budgetMetric.paymentsOnChain = setMetric(row.value, row.unit);
            break;
          case 'PaymentsOffChainIncluded':
            budgetMetric.paymentsOffChainIncluded = setMetric(row.value, row.unit);
            break;
          default:
            break;
        }
      }
    });

    budgetsAnalytics[budget.codePath] = budgetMetric;
  });

  return budgetsAnalytics;
};

const getArrayAnalytic = (granularity: AnalyticGranularity): BudgetMetric[] => {
  const createBudgetMetric = () => ({
    actuals: {
      value: 0,
      unit: 'DAI',
    },
    budget: {
      value: 0,
      unit: 'DAI',
    },
    forecast: {
      value: 0,
      unit: 'DAI',
    },
    paymentsOnChain: {
      value: 0,
      unit: 'DAI',
    },
    paymentsOffChainIncluded: {
      value: 0,
      unit: 'DAI',
    },
  });

  let arrayLength;
  switch (granularity) {
    case 'monthly':
      arrayLength = 12;
      break;
    case 'quarterly':
      arrayLength = 4;
      break;
    case 'annual':
      arrayLength = 1;
      break;
    case 'semiAnnual':
      arrayLength = 2;
      break;
    default:
      arrayLength = 4;
  }

  return Array.from({ length: arrayLength }, createBudgetMetric);
};

const getBreakdownAnalytics = (
  analytics: Analytic,
  budgets: Budget[],
  granularity: AnalyticGranularity
): BreakdownBudgetAnalytic => {
  const budgetsAnalytics: BreakdownBudgetAnalytic = {};
  budgets.forEach((budget) => {
    const analyticsArray = getArrayAnalytic(granularity);

    budgetsAnalytics[`${budget.codePath}`] = analyticsArray;

    analytics.series.forEach((seriesItem, index) => {
      const budgetMetric = budgetsAnalytics[budget.codePath][index] || newBudgetMetric();

      seriesItem.rows.forEach((row) => {
        const budgetPath = row.dimensions.find((dimension) => dimension.name === 'budget')?.path;

        if (budget.codePath === budgetPath) {
          switch (row.metric) {
            case 'Actuals':
              budgetMetric.actuals = setMetric(row.value, row.unit);
              break;
            case 'Forecast':
              budgetMetric.forecast = setMetric(row.value, row.unit);
              break;
            case 'Budget':
              budgetMetric.budget = setMetric(row.value, row.unit);
              break;
            case 'PaymentsOnChain':
              budgetMetric.paymentsOnChain = setMetric(row.value, row.unit);
              break;
            case 'PaymentsOffChainIncluded':
              budgetMetric.paymentsOffChainIncluded = setMetric(row.value, row.unit);
              break;
            default:
              break;
          }
        }
        budgetsAnalytics[budget.codePath][index] = budgetMetric;
      });
    });
  });

  return budgetsAnalytics;
};

export const getBudgetsAnalytics = async (
  granularity: AnalyticGranularity,
  year: string,
  select: string,
  lod: number,
  budgets: Budget[]
) => {
  const analytics = await fetchAnalytics(granularity, year, select, lod);
  return granularity === 'annual'
    ? getAnalyticsAnnual(analytics, budgets)
    : getBreakdownAnalytics(analytics, budgets, granularity); // temporary
};

export const getLevelOfBudget = (levelPath: string) => {
  if (!levelPath) return 1;
  return levelPath.split('/').length + 1;
};
export const colors: string[] = ['#F99374', '#447AFB', '#2DC1B1'];
export const colorsDark: string[] = ['#F77249', '#447AFB', '#1AAB9B'];

// Legend for breakdown chart
export const breakdownChartMonthly = (isMobile: boolean) => [
  isMobile ? 'J' : 'JAN',
  isMobile ? 'F' : 'FEB',
  isMobile ? 'M' : 'MAR',
  isMobile ? 'A' : 'APR',
  isMobile ? 'M' : 'MAY',
  isMobile ? 'J' : 'JUN',
  isMobile ? 'J' : 'JUL',
  isMobile ? 'A' : 'AUG',
  isMobile ? 'S' : 'SEP',
  isMobile ? 'O' : 'OCT',
  isMobile ? 'N' : 'NOV',
  isMobile ? 'D' : 'DEC',
];

export const breakdownChartQuarterly = () => ['Q’1', 'Q’2', 'Q’3', 'Q’4'];
export const breakdownChartAnnually = () => ['Year'];
export const getGranularity = (granularity: AnalyticGranularity, isMobile: boolean) => {
  switch (granularity.toLocaleLowerCase()) {
    case 'monthly':
      return breakdownChartMonthly(isMobile);
    case 'quarterly':
      return breakdownChartQuarterly();
    case 'annually':
      return breakdownChartAnnually();
    default:
      breakdownChartQuarterly();
  }
};

export const formatterBreakDownChart = (
  granularity: AnalyticGranularity,
  isMobile: boolean,
  year: string,
  value: string
) => {
  switch (granularity.toLocaleLowerCase()) {
    case 'monthly':
      if (isMobile) return value;
      return `{month|${value}}\n{year|${year}}`;
    case 'quarterly':
      return `{month|${value}}  {year|${year}}`;
    case 'annually':
      return `{month|${year}}`;
    default:
      return `{month|${value}}\n{year|${year}}`;
  }
};

export const getCorrectMetric = (budgetMetric: BudgetMetric, selectedMetric: Metric): ValuesDataWithBorder => {
  let metricKey: keyof BudgetMetric;

  switch (selectedMetric) {
    case 'Actual':
      metricKey = 'actuals';
      break;
    case 'Forecast':
      metricKey = 'forecast';
      break;
    case 'Net Expenses On-chain':
      metricKey = 'paymentsOnChain';
      break;
    case 'Net Expenses Off-chain':
      metricKey = 'paymentsOffChainIncluded';
      break;
    default:
      metricKey = 'budget';
  }

  return {
    value: budgetMetric[metricKey]?.value || 0,
    itemStyle: {
      borderRadius: [0, 0, 0, 0],
    },
  };
};

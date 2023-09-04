import { BudgetStatus, ResourceType } from '@ses/core/models/interfaces/types';
import lightTheme from '@ses/styles/theme/light';
import { DateTime } from 'luxon';
import type { DelegateExpenseTableHeader, MomentDataItem } from './types';
import type { SortEnum } from '@ses/core/enums/sortEnum';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';

export const calculateValuesByBreakpoint = (isTable: boolean, isSmallDesk: boolean, normalSizeDesk: boolean) => {
  const radius = isTable ? ['40%', '75%'] : isSmallDesk ? ['45%', '95%'] : ['45%', '95%'];
  const center = isTable ? ['30%', '50%'] : isSmallDesk ? ['24%', '50%'] : ['24%', '50%'];

  const paddingLegend = isTable
    ? [18, 36, 0, 0]
    : isSmallDesk
    ? [22, 8, 0, 0]
    : normalSizeDesk
    ? [22, 12, 0, 0]
    : [22, 8, 0, 0];

  const paddingRichTextName = isTable ? [24, 0, 9, 1] : isSmallDesk ? [24, 0, 14, 1] : [24, 0, 13.7, 1];
  const paddingRichTextValue = isTable ? [-3, 2, 0, 2] : isSmallDesk ? [0, 2, 0, 2] : [0, 2, 0, 2];
  const paddingRichTextDai = isTable ? [-3, 4, 0, 6] : isSmallDesk ? [0, 4, 0, 6] : [0, 4, 0, 6];
  const paddingRichTextPercent = isTable ? [0, 0, 0, 0] : isSmallDesk ? [0, 0, 0, 0] : [0, 0, 0, 0];

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
    lastModified: DateTime.fromISO('2023-03-25T09:08:34.123'),
    reportMonth: DateTime.fromISO('2023-03-01T09:08:34.123'),
    totalActuals: 2048873,
    lastActivity: {
      id: '343',
      created_at: '2023-03-01T09:08:34.123',
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
    lastModified: DateTime.fromISO('22023-09-24T09:08:34.123'),
    reportMonth: DateTime.fromISO('2015-12-25T09:08:34.123'),
    totalActuals: 2048873,
    lastActivity: {
      id: '343',
      created_at: '2023-08-02T09:08:34.123',
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
      created_at: '2023-08-25T09:08:34.123',
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
      created_at: '2023-08-25T09:08:34.123',
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
    budgetStatements: [],
    cuMip: null,
  },
];

// TODO: Update function when are data in the API
export const getStatus = (budget: BudgetStatement[]) => budget[0]?.status;
export const getShowCTA = () => false;

export const getExpenseMonthWithData = (expense: MomentDataItem) => {
  if (expense?.lastActivity?.created_at) {
    return DateTime.fromISO(expense.lastActivity?.created_at);
  }

  return undefined;
};

export const isCoreUnit = (item: MomentDataItem) => item?.type === ResourceType.CoreUnit;
export const getHeadersExpenseReport = (
  headersSort: SortEnum[],
  isSmallDesk: boolean
): DelegateExpenseTableHeader[] => [
  {
    header: 'Contributors',
    styles: {
      boxSizing: 'border-box',
      minWidth: 228,
      paddingLeft: 16,
    },
    sortReverse: true,
    sort: headersSort[0],
  },
  {
    header: isSmallDesk ? 'Report Month' : 'Reporting Month',
    styles: {
      width: 170,
      marginLeft: 112,

      [lightTheme.breakpoints.up('desktop_1280')]: {
        marginLeft: 122,
      },
      [lightTheme.breakpoints.up('desktop_1440')]: {
        marginLeft: 126,
      },
    },
    sortReverse: true,
    sort: headersSort[1],
  },
  {
    header: 'Total Actuals',
    sort: headersSort[2],
    styles: {
      width: 170,
      marginLeft: -18,

      [lightTheme.breakpoints.up('desktop_1280')]: {
        marginLeft: -4,
      },
      [lightTheme.breakpoints.up('desktop_1440')]: {
        marginLeft: 12,
        justifyContent: 'center',
      },
    },
    sortReverse: true,
  },

  {
    header: 'Status',
    sort: headersSort[3],
    styles: {
      width: 173,
      marginLeft: -6,
      [lightTheme.breakpoints.up('desktop_1280')]: {
        marginLeft: 2,
      },
      [lightTheme.breakpoints.up('desktop_1440')]: {
        marginLeft: 12,
        justifyContent: 'center',
      },
    },
    sortReverse: true,
  },
  {
    header: 'Last Modified',
    sort: headersSort[4],
    styles: {
      width: 173,
      marginLeft: 10,

      [lightTheme.breakpoints.up('desktop_1280')]: {
        marginLeft: 22,
      },
      [lightTheme.breakpoints.up('desktop_1440')]: {
        marginLeft: 92,
        justifyContent: 'center',
      },
    },
    sortReverse: true,
  },
];

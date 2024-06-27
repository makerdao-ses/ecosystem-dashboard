import type { AllowedOwnerType } from '@/views/BudgetStatement/types';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://expenses.makerdao.network';

export const siteRoutes = {
  home: '/',
  ecosystemActors: '/contributors/ecosystem-actors',
  ecosystemActorAbout: (code: string) => `/contributors/ecosystem-actors/${code}`,
  ecosystemActorReports: (code: string) => `/contributors/ecosystem-actors/${code}/finances/reports`,
  ecosystemActorProjects: (code: string) => `/contributors/ecosystem-actors/${code}/projects`,
  coreUnitsOverview: '/contributors/core-units',
  financesOverview: '/',
  finances: (path?: string) => `/finances${path ? `/${path}` : ''}`,
  coreUnitAbout: (shortCode: string) => `/contributors/core-unit/${shortCode}`,
  coreUnitReports: (shortCode: string) => `/contributors/core-unit/${shortCode}/finances/reports`,
  coreUnitActivityFeed: (shortCode: string) => `/contributors/core-unit/${shortCode}/activity-feed`,
  globalActivityFeed: '/activity-feed',
  cookiesPolicy: '/cookies-policy',
  recognizedDelegateReport: '/contributors/recognized-delegates/finances/reports',
  recognizedDelegate: '/contributors/recognized-delegates',
  endgame: '/endgame',
  roadmapMilestones: (slug: string) => `/roadmaps/${slug}`,
  contributors: '/contributors',
  budgetStatements: (ownerType: AllowedOwnerType) => `/budget-statements/${ownerType}`,
  // auth
  login: '/login',
  manageAccounts: '/auth/manage/accounts',
  adminProfile: '/auth/manage/my-profile',
  userProfile: '/auth/user-profile',
  // TODO: add the accounts routes
};

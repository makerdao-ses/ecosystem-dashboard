export interface FeatureFlagsInterface {
  FEATURE_CARD_NAVIGATION: boolean;
  FEATURE_SITEMAP: boolean;
  FEATURE_GLOBAL_ACTIVITIES: boolean;
  FEATURE_AUTH: boolean;
  FEATURE_MKR_VESTING: boolean; // disable MKR Vesting tab in the expense reports tab
  FEATURE_AUDIT_REPORTS: boolean; // disable Audit Reports tab in the expense reports tab
  FEATURE_FINANCES_OVERVIEW: boolean; // disable Finances Overview page
  FEATURE_RECOGNIZED_DELEGATES_REPORT: boolean; // disable Finances Delegates Report page
  FEATURE_TRANSPARENCY_COMMENTS: boolean; // disable Comments Tab
  FEATURE_RECOGNIZED_DELEGATES: boolean; // disable  Recognized Delegates page
  FEATURE_ACCOUNTS_SNAPSHOT: boolean; // disable Accounts Snapshot tab in the expense reports tab
  FEATURE_ECOSYSTEM_ACTORS: boolean; // disable Actors List Page page
  FEATURE_TEMPORARY_ACCOUNTS_SNAPSHOT_PAGE: boolean; // disable Accounts Snapshot page
  FEATURE_ECOSYSTEM_ACTORS_ABOUT: boolean; // disable Actors About page
  FEATURE_ECOSYSTEM_ACTORS_TRANSPARENCY_REPORTING: boolean; // disable Transparency Reporting page for Actors
  FEATURE_CARD_NAVIGATION_ACTOR_ABOUT_PAGE: boolean; // disable Card Expense in Actors About Page
  FEATURE_ACCOUNT_SNAPSHOT_CURRENCY_PICKER: boolean; // disable Currency Picker in Accounts Snapshot Page/section
  FEATURE_BUDGET_SUMMARY_PAGE: boolean; // disable Feature: Budget Summary + Navigation
  // TODO: delete this feature flag after the second section is added
  FEATURE_ENDGAME_NAVIGATION_SECTION: boolean; // disable navigation section in the endgame page
  FEATURE_ENDGAME_BUDGET_STRUCTURE_SECTION: boolean; // disable the budget structure section in the endgame page
  FEATURE_ENDGAME_BUDGET_TRANSITION_SECTION: boolean; // disable the budget transition section in the endgame page
  FEATURE_FINANCES_ENDGAME_BANNER_SECTION: boolean; // disable Banner section in Finances page (Endgame section)
  FEATURE_FINANCES_BREAKDOWN_CHART_SECTION: boolean; // disable ChartBreakDow section in Finances
  FEATURE_FINANCES_MAKERDAO_EXPENSE_METRICS_SECTION: boolean; // disable MakerDAOExpenseMetrics section in Finances
  FEATURE_TEAM_PROJECTS: boolean; // disable Team Projects page and related features
  FEATURE_ECOSYSTEM_FINANCES_DASHBOARD_PAGE: boolean; // disable Accounts Finances Page
  FEATURE_ROADMAP_MILESTONES: boolean; // disable roadmap milestones page
  FEATURE_FINANCES_MAKERDAO_EXPENSE_RESERVE_SECTION: boolean; // disable Reserve Chart Sections in Finances Page
}

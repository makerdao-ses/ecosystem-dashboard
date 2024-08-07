import type { FormattedFinancesData } from './api/finances';

export const headerCardData = {
  title: 'MakerDAO Dashboard',
  description:
    "Welcome to the MakerDAO Dashboard, your hub for key insights into MakerDAO's finances, governance, teams, and roadmaps. Get up-to-date data and explore strategic developments to stay informed about MakerDAO’s progress and future plans.",
  buttonTexts: ['Finances', 'Governance', 'Contributors', 'Roadmap'],
  buttonLinks: ['#finances', '#governance', '#contributors', '#roadmap'],
  buttonShadows: [
    '1px 4px 15px 0px rgba(19, 83, 36, 1)',
    '1px 4px 15px 0px rgba(19, 83, 36, 1)',
    '1px 4px 15px 0px rgba(188, 153, 242, 0.2)',
    '1px 4px 15px 0px rgba(188, 153, 242, 0.5)',
    '1px 4px 15px 0px rgba(25, 144, 255, 0.2)',
    '1px 4px 15px 0px rgba(25, 144, 255, 0.5)',
    '1px 4px 15px 0px rgba(234, 67, 53, 0.2)',
    '1px 4px 15px 0px rgba(234, 67, 53, 0.5)',
  ],
};

export const sectionsData = {
  titles: ['Finances', 'Governance', 'Contributors', 'Roadmap'],
};

const FinancesPlaceholder = {
  legacyOthers: [],
  legacyCoreUnits: [],
  governanceScope: [],
  stability: [],
  support: [],
  protocol: [],
  accessibility: [],
  immutable: [],
};
export const financesDataMocked: FormattedFinancesData = {
  PaymentsOnChain: {
    legacyOthers: [260, 220, 190, 160, 120, 80, 50],
    legacyCoreUnits: [480, 400, 300, 200, 140, 100, 40],
    governanceScope: [0, 0, 0, 0, 0, 0, 10, 80, 160, 200, 200, 140, 100, 50, 50, 50],
    stability: [0, 0, 0, 0, 0, 0, 10, 80, 160, 200, 200, 140, 100, 50, 50, 50],
    support: [0, 0, 0, 0, 0, 0, 10, 80, 160, 150, 160, 140, 100, 50, 50, 50],
    protocol: [0, 0, 0, 0, 0, 0, 10, 80, 160, 140, 140, 140, 100, 50, 50, 50],
    accessibility: [0, 0, 0, 0, 0, 0, 10, 80, 160, 120, 120, 140, 100, 50, 50, 50],
    immutable: [0, 0, 0, 0, 0, 0, 10, 80, 160, 100, 100, 140, 100, 50, 50, 50],
  },
  Actuals: FinancesPlaceholder,
  Forecast: FinancesPlaceholder,
  OperationalReserves: FinancesPlaceholder,
};

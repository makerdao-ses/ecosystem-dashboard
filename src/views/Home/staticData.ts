import type { ContributorsInformation } from './utils/types';

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

export const financesBarChartCardData = {
  title: 'MakerDAO Finances',
  annualProfitLegendAsteriskText: '*All values are converted to DAI',
  annualProfitLegendTitle: 'Annual Profit',
  revenueLegendTitle: 'Revenue',
  revenueLegendButtonTexts: ['Fees', 'Liquidation Income', 'PSM'],
  spendingLegendTitle: 'Spending',
  spendingLegendButtonTexts: ['DAI Spent', 'MKR Vesting'],
  makerburnLinkText: 'makerburn.com',
  detailsLinkText: 'Details',
};

export const financesLineChartCardData = {
  tabButtonsTexts: ['Realized Expenses', 'Operational Reserves', 'Forecast'],
};

// Remove when api connected
export const mockDataDescription: ContributorsInformation[] = [
  {
    title: 'Ecosystem Actors',
    contributors: 21,
    description:
      'Ecosystem Actors are contributor teams that perform essential tasks to benefit the MakerDAO ecosystem. They are divided into two categories: Advisory Council Members and Active Ecosystem Actors. Here, we are referring to the Active Ecosystem Actors who carry out specific projects such as feature development, data collection, marketing, legal work, and other operational activities that benefit the Maker Ecosystem, following the specifications of Scope Alignment Artifacts',
    href: '#',
  },
  {
    title: 'Aligned Delegates ',
    contributors: 23,
    description:
      "Aligned Delegates (ADs) are anonymous Alignment Conserve who use the Protocol Delegation System to enable MKR holders to delegate their voting power. ADs hold significant power and responsibility to maintain the Universal Alignment of the Maker Ecosystem. They must adhere to strict requirements and provide governance information and research material to AVCs, focusing on safeguarding the protocol's alignment",
    href: '#',
  },
  {
    title: 'Keepers',
    contributors: 4,
    description:
      "Keepers are a specialized type of contributor entity that manage and operate certain decentralized financial operations within the Maker Ecosystem. They are responsible for performing functions such as maintaining the stability of the Dai stablecoin by participating in liquidation auctions and other mechanisms that ensure the system's resilience and efficiency. Keepers play a vital role in the decentralized operations of MakerDAO, helping to maintain the economic health and stability of the ecosystem.",
    href: '#',
  },
];

export const roadmapData = {
  title: 'Phase 1 MakerDAO roadmap.',
  cards: [
    { name: 'Card 1' },
    { name: 'Card 2' },
    { name: 'Card 3' },
    { name: 'Card 4' },
    { name: 'Card 5' },
    { name: 'Card 6' },
    { name: 'Card 7' },
    { name: 'Card 8' },
    { name: 'Card 9' },
    { name: 'Card 10' },
  ],
};

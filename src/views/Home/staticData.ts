import { TeamScopeEnum } from '@/core/enums/actorScopeEnum';
import type { Team } from '@/core/models/interfaces/team';
import { ResourceType, TeamStatus } from '@/core/models/interfaces/types';
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

// Remove when the data is ready
export const contributor: Team = {
  id: '1',
  code: 'SES-001',
  shortCode: 'SES',
  name: 'Sustainable Ecosystem Scaling',
  status: TeamStatus.Accepted,
  scopes: [
    {
      id: '2',
      code: 'ACC',
      name: TeamScopeEnum.ProtocolScope,
    },
  ],
  image: 'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png',
  budgetPath: 'atlas/legacy/core-units/SES-001/',
  category: ['ActiveEcosystemActor'],
  sentenceDescription:
    'SES aims to sustainably grow the Maker Protocol’s moats by removing barriers between decentralized workforce, capital, and work.',
  paragraphDescription:
    'The SES Core Unit supports a decentralized, effective, and scalable economy on top of the Maker Protocol that continues to push forward its growth in a sustainable manner...',
  paragraphImage: '',
  lastActivity: {
    created_at: '2024-06-25T08:37:03.648Z',
    description: 'CoreUnit SES has updated their expense report for May 2024',
    event: 'TEAM_BUDGET_STATEMENT_UPDATED',
    id: '2855',
    params: {
      owner: {
        id: 1,
        code: 'SES-001',
        shortCode: 'SES',
        type: ResourceType.CoreUnit,
      },
      budgetStatementId: 1051,
      month: '2024-05',
    },
  },
  legacyBudgetStatementUrl: '',
  budgetId: '',
  type: ResourceType.CoreUnit,
  auditors: [
    {
      id: '9',
      username: 'some',
    },
    {
      id: '34',
      username: 'Patrick_J',
    },
    {
      id: '48',
      username: 'some',
    },
  ],
  socialMediaChannels: [
    {
      forumTag: 'https://forum.makerdao.com/c/core-units/sustainable-ecosystem-scaling',
      github: 'https://github.com/makerdao-ses',
      discord: 'https://discord.gg/h7GKvqDyDP',
      website: 'https://ses.makerdao.network',
      twitter: 'https://twitter.com/MakerDAO_SES',
      linkedIn: 'https://www.linkedin.com/company/makerdao-ses/',
      youtube: 'https://www.youtube.com/channel/UC9c35O2H6fq8fB2CGzzP1bw',
    },
  ],
  contributorCommitment: [],
  cuGithubContribution: [],
  updates: [],
  budgetStatements: [],
  cuMip: null,
};
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

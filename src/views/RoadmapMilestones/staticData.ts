/* eslint-disable spellcheck/spell-checker */
// disabled spell-checker because of the use of abbreviations, technical terms and names

import type { Roadmap } from '@/core/models/interfaces/roadmaps';

const coordinators = [
  {
    ref: '',
    id: '',
    imageUrl: '',
    name: 'Prometheus',
    code: '',
  },
  {
    ref: '',
    id: '',
    imageUrl: '',
    name: 'meraki',
    code: '',
  },
  {
    ref: '',
    id: '',
    imageUrl: '',
    name: 'callme_T',
    code: '',
  },
];
const contributors = [
  {
    ref: 'team',
    id: 'powerhouse',
    imageUrl: 'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png',
    name: 'Powerhouse',
    code: 'PH',
  },
];

export const PowerhouseRoadmap2024: Roadmap = {
  id: 'ph-2024',
  slug: 'ph-2024',
  title: 'Powerhouse Roadmap 2024',
  description: 'Powerhouse Ecosystem Actor team roadmap for the year 2024.',
  milestones: [
    {
      id: 'PH01',
      code: 'POC',
      title: 'Decentralized Operations Platform - POC',
      abstract:
        'Decentralized Operations Platform - Proof of Concept, including: First technical integration of RWA Portfolio (Connect & Switchboard); Expense dashboard increments (on-chain data, budget breakdowns).',
      description:
        'Roadmap milestone: Decentralized Operations Platform - Proof of Concept.\nMilestone 1, set for March 1, marks the initial phase of Powerhouse Decentralized Operations Platform. Deliverables include: Technical integration demo showcasing for the first time the RWA Portfolio Editor in Connect and the data synchronization with Switchboard; Switchboard API endpoints for integration partners with document model update events and document state queries; and Switchboard API endpoints for integration partners with document model update events and document state queries.',
      targetDate: '2024-Q1',
      coordinators,
      contributors,
      scope: [],
    },
    {
      id: 'PH02',
      code: 'MVP',
      title: 'Decentralized Operations Platform - MVP',
      abstract:
        'Decentralized Operations Platform - Minimum Viable Product Release, including: MVP release of the MakerDAO transparency reporting information; Integrated Powerhouse Platform delivery.',
      description:
        'Roadmap milestone: Decentralized Operations Platform - Minimal Viable product.\nMilestone 2, set for July 3, marks the continuation phase of Powerhouse Decentralized Operations Platform.\nDeliverables include: MVP Release with MakerDAO transparency reporting information that can be shared publicly; Delivery of integrated platform consisting of Powerhouse core products: Fusion, Switchboard, Connect, and the first release of Renown.',
      targetDate: '2024-Q2',
      coordinators,
      contributors,
      scope: [],
    },
    {
      id: 'PH03',
      code: 'PROD',
      title: 'Decentralized Operations Platform - Production',
      abstract:
        'Decentralized Operations Platform - Production release, including: (scope not final) Production grade release of the MakerDAO transparency reporting information; integrated Powerhouse platform.',
      description:
        'Roadmap milestone: Decentralized Operations Platform - Production release.\nMilestone 3, set for Q3, marks the production grade development phase of Powerhouse Decentralized Operations Platform. Deliverables include: (scope not final) Production grade release of the MakerDAO transparency reporting information; integrated Powerhouse platform.',
      targetDate: '2024-Q3',
      coordinators,
      contributors,
      scope: [],
    },
    {
      id: 'PH04',
      code: 'ATLA',
      title: 'Atlas + I/A POC',
      abstract:
        'Decentralized Operations Platform - Atlas Editor + Integration / Automation PoC, including: (scope not final) v1 of Atlas Editor document model; Automation process POC.',
      description:
        'Roadmap milestone: Decentralized Operations Platform - Production release.\nMilestone 3, set for Q3, marks the production grade development phase of Powerhouse Decentralized Operations Platform. Deliverables include: (scope not final) Production grade release of the MakerDAO transparency reporting information; integrated Powerhouse platform.',
      targetDate: '2024-Q4',
      coordinators,
      contributors,
      scope: [],
    },
    {
      id: 'PH05',
      code: 'SPIN',
      title: 'Powerhouse Spin-off',
      abstract:
        'Powerhouse spin-off research, creation and structuring, including: legal entity; business model; token model; new customers; public comms.',
      description:
        'Roadmap milestone: Decentralized Operations Platform - Production release.\nMilestone 3, set for Q3, marks the production grade development phase of Powerhouse Decentralized Operations Platform. Deliverables include: (scope not final) Production grade release of the MakerDAO transparency reporting information; integrated Powerhouse platform.',
      targetDate: '2024-Q4',
      coordinators,
      contributors,
      scope: [],
    },
    {
      id: 'PH06',
      code: 'PMC',
      title: 'MakerDAO PM Consultancy',
      abstract:
        'MakerDAO project management consultancy, including: Endgame advisory & Operations coordination; Management & delivelt of Pointable AI SOW1; related OCF work & management.',
      description:
        'Roadmap milestone: Decentralized Operations Platform - Production release.\nMilestone 3, set for Q3, marks the production grade development phase of Powerhouse Decentralized Operations Platform. Deliverables include: (scope not final) Production grade release of the MakerDAO transparency reporting information; integrated Powerhouse platform.',
      targetDate: '2024-Q4',
      coordinators,
      contributors,
      scope: [],
    },
  ],
};

export const DefaultRoadmap: Roadmap = {
  id: 'default',
  slug: 'default',
  title: 'Phase 1 Progress',
  description: 'Unleashing Potential: MakerDAO’s result-driven road map for unlocking tangible results.',
  milestones: [],
};

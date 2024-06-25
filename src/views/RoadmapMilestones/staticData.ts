/* eslint-disable spellcheck/spell-checker */
// disabled spell-checker because of the use of abbreviations, technical terms and names

import { DeliverableStatus } from '@/core/models/interfaces/deliverables';
import type { Milestone, Roadmap } from '@/core/models/interfaces/roadmaps';
import { DeliverableSetStatus } from '@/core/models/interfaces/roadmaps';

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
    name: 'Powerhouse Inc.',
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
      scope: [
        {
          deliverables: [
            {
              id: '1',
              code: '1',
              title: 'First technical integration of RWA Portfolio (Connect & Switchboard)',
              description:
                'Technical integration demo showcasing for the first time the RWA Portfolio Editor in Connect and the data synchronization with Switchboard.',
              owner: contributors[0],
              status: DeliverableStatus.DELIVERED,
              workProgress: {
                __typename: 'Percentage',
                value: 100,
              },
              budgetAnchor: {
                project: 'Real World Asset Reporting',
                workUnitBudget: 1000,
                deliverableBudget: 1000,
              },
              keyResults: [
                {
                  id: '1',
                  title: 'RWA Portfolio conceptuual wireframes',
                  link: '#',
                },
                {
                  id: '1',
                  title: 'Technical demo of RWA Portfolio - Feb 21',
                  link: '#',
                },
                {
                  id: '1',
                  title: 'Technical demo of RWA Portfolio - Feb 21',
                  link: '#',
                },
              ],
            },
            {
              id: '1',
              code: '1',
              title: 'Integration (API endpoints and Queries)',
              description:
                'Switchboard API endpoints for integration partners with document model update events and document state queries.',
              owner: contributors[0],
              status: DeliverableStatus.DELIVERED,
              workProgress: {
                __typename: 'Percentage',
                value: 100,
              },
              budgetAnchor: {
                project: 'Powerhouse Product PoC',
                workUnitBudget: 1000,
                deliverableBudget: 1000,
              },
              keyResults: [
                {
                  id: '1',
                  title: 'Source code on Powerhouse Github repo',
                  link: '#',
                },
                {
                  id: '1',
                  title: 'Source code on SES Github repo',
                  link: '#',
                },
                {
                  id: '1',
                  title: 'TBD',
                  link: '#',
                },
              ],
            },
            {
              id: '1',
              code: '1',
              title: 'Expense dashboard increments (on-chain data, budget breakdowns)',
              description:
                'Separate incremental release of the MakerDAO expenses platform with on-chain transactional data and budget breakdown views.',
              owner: contributors[0],
              status: DeliverableStatus.DELIVERED,
              workProgress: {
                __typename: 'Percentage',
                value: 100,
              },
              budgetAnchor: {
                project: 'Protocol Expense Accounting',
                workUnitBudget: 1000,
                deliverableBudget: 1000,
              },
              keyResults: [
                {
                  id: '1',
                  title: 'Expense dashboard on-going work',
                  link: '#',
                },
                {
                  id: '1',
                  title: 'Expense Dashboard deployment v0.33.0',
                  link: '#',
                },
                {
                  id: '1',
                  title: 'TBD',
                  link: '#',
                },
              ],
            },
          ],
          status: DeliverableSetStatus.FINISHED,
          progress: {
            __typename: 'Percentage',
            value: 100,
          },
          deliverablesCompleted: {
            total: 3,
            completed: 3,
          },
        },
      ],
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
      scope: [
        {
          deliverables: [],
          status: DeliverableSetStatus.IN_PROGRESS,
          progress: {
            __typename: 'Percentage',
            value: 60,
          },
          deliverablesCompleted: {
            total: 62,
            completed: 0,
          },
        },
      ],
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
      scope: [
        {
          deliverables: [],
          status: DeliverableSetStatus.TODO,
          progress: {
            __typename: 'Percentage',
            value: 0,
          },
          deliverablesCompleted: {
            total: 2,
            completed: 0,
          },
        },
      ],
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
      scope: [
        {
          deliverables: [],
          status: DeliverableSetStatus.TODO,
          progress: {
            __typename: 'Percentage',
            value: 0,
          },
          deliverablesCompleted: {
            total: 2,
            completed: 0,
          },
        },
      ],
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
      scope: [
        {
          deliverables: [],
          status: DeliverableSetStatus.TODO,
          progress: {
            __typename: 'Percentage',
            value: 0,
          },
          deliverablesCompleted: {
            total: 2,
            completed: 0,
          },
        },
      ],
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
      scope: [
        {
          deliverables: [],
          status: DeliverableSetStatus.TODO,
          progress: {
            __typename: 'Percentage',
            value: 0,
          },
          deliverablesCompleted: {
            total: 2,
            completed: 0,
          },
        },
      ],
    },
  ],
};

const CommonDefaultMilestone = {
  id: 'M1',
  code: 'BASE',
  title: 'Exploration Base',
  abstract:
    'A first deployment that integrates the different deliverables. Focus is on exploration of open design questions (removing uncertainty).',
  description:
    'Feature exploration and open design questions, smart contracts project, chatbot, UI intergration, marcomms project.\nMilestone 1, set for August 1, marks the initial phase of Exploration Base. Projects include Smart Contracts, focused on establishing foundations and addressing design questions. The Chatbot Project aims to enhance the conversational UX with low hanging fruit execution, prioritizing clarity and correctness. Overall, this milestone lays the groundwork, explores design possibilities, and strives to improve the user experience in the MakerDAO ecosystem.',
  targetDate: '2023-Q4',
  coordinators,
  contributors,
  scope: [
    {
      deliverables: [
        {
          id: '1',
          code: '1',
          title: 'First technical integration of RWA Portfolio (Connect & Switchboard)',
          description:
            'Technical integration demo showcasing for the first time the RWA Portfolio Editor in Connect and the data synchronization with Switchboard.',
          owner: contributors[0],
          status: DeliverableStatus.DELIVERED,
          workProgress: {
            __typename: 'Percentage',
            value: 100,
          },
          budgetAnchor: {
            project: 'RWA Portfolio',
            workUnitBudget: 1000,
            deliverableBudget: 1000,
          },
          keyResults: [],
        },
      ],
      status: DeliverableSetStatus.FINISHED,
      progress: {
        __typename: 'Percentage',
        value: 100,
      },
      deliverablesCompleted: {
        total: 3,
        completed: 3,
      },
    },
  ],
} as Milestone;

export const DefaultRoadmap: Roadmap = {
  id: 'default',
  slug: 'default',
  title: 'Phase 1 Progress',
  description: 'Unleashing Potential: MakerDAO’s result-driven road map for unlocking tangible results.',
  milestones: [
    { ...CommonDefaultMilestone },
    { ...CommonDefaultMilestone },
    { ...CommonDefaultMilestone },
    { ...CommonDefaultMilestone },
    { ...CommonDefaultMilestone },
    { ...CommonDefaultMilestone },
    { ...CommonDefaultMilestone },
    { ...CommonDefaultMilestone },
  ],
};

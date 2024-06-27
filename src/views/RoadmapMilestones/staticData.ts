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

const CommonDefaultMilestone = {
  id: 'M1',
  sequenceCode: 'M1',
  code: 'BASE',
  title: 'Exploration Base',
  abstract:
    'A first deployment that integrates the different deliverables. Focus is on exploration of open design questions (removing uncertainty).',
  description:
    'Feature exploration and open design questions, smart contracts project, chatbot, UI intergration, marcomms project.\nMilestone 1, set for August 1, marks the initial phase of Exploration Base. Projects include Smart Contracts, focused on establishing foundations and addressing design questions. The Chatbot Project aims to enhance the conversational UX with low hanging fruit execution, prioritizing clarity and correctness. Overall, this milestone lays the groundwork, explores design possibilities, and strives to improve the user experience in the MakerDAO ecosystem.',
  targetDate: '2023-Q4',
  coordinators,
  contributors,
  scope: {
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
    totalDeliverables: 3,
    deliverablesCompleted: 3,
  },
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

import { siteRoutes } from '@/config/routes';
import type { TeamType } from './components/TeamsSections/TeamsSections';

export const currentTeams = [
  {
    type: 'team',
    name: 'Ecosystem Actors',
    description:
      "Ecosystem Actors undertake key projects like feature development and marketing under guidelines that promote the MakerDAO ecosystem's growth. They facilitate vital operational activities, ensuring alignment with ecosystem goals.",
    teams: 24,
    href: siteRoutes.ecosystemActors,
  },
  {
    type: 'contributor',
    name: 'Aligned Delegates',
    description:
      "Aligned Delegates use delegated voting to ensure protocol alignment, adhering to stringent requirements while providing crucial governance insights. They serve as key governance participants, maintaining the ecosystem's universal alignment.",
    teams: 16,
    href: siteRoutes.finances('immutable/aligned-delegates?year=2024'),
  },
  {
    type: 'contributor',
    name: 'Keepers',
    description:
      'Keepers manage crucial financial operations within MakerDAO, ensuring the stability and efficiency of the Dai stablecoin and overall ecosystem health. Their actions directly impact the economic resilience of the MakerDAO.',
    teams: 4,
    href: siteRoutes.finances('scopes/PRO/KPRS?year=2024'),
  },
] as TeamType[];

export const legacyTeams = [
  {
    type: 'team',
    name: 'Core Units',
    description:
      "Core Units execute essential operational and strategic tasks within MakerDAO, from engineering to growth, under specific mandates and budgets. They are pivotal in ensuring the protocol's continuous improvement and relevance.",
    teams: 21,
    href: siteRoutes.coreUnitsOverview,
  },
  {
    type: 'contributor',
    name: 'Recognized Delegates',
    description:
      'Recognized Delegates actively participate in MakerDAO governance, influencing decisions and maintaining transparency to ensure community trust. They are integral to the governance process, providing informed opinions and voting on key proposals.',
    teams: 24,
    href: siteRoutes.recognizedDelegate,
  },
  {
    type: 'contributor',
    name: 'SPFs',
    description:
      "Special Purpose Funds finance strategic projects that enhance MakerDAO's ecosystem, ensuring its competitiveness and innovation in DeFi. These funds support initiatives that drive the protocol's strategic expansion and community engagement.",
    teams: 19,
    href: siteRoutes.finances('legacy/spfs?year=2024'),
  },
] as TeamType[];

import { styled } from '@mui/material';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import { siteRoutes } from '@/config/routes';
import TeamsSections from './components/TeamsSections/TeamsSections';
import type { TeamType } from './components/TeamsSections/TeamsSections';

const currentTeams = [
  {
    name: 'Ecosystem Actors',
    description:
      // keeping the text as it was provided
      // eslint-disable-next-line spellcheck/spell-checker
      'Ecosystem Actors are contributor teams that perform essential tasks to benefit the MakerDAO ecosystem. They are divided into two categories: Advisory Council Members and Active Ecosystem Actors. Here, we are refering to the Active Ecosystem Actors who carry out specific projects such as feature development, data collection, marketing, legal work, and other operational activities that benefit the Maker Ecosystem, following the specifications of Scope Alignment Artifacts.',
    teams: 0,
    href: siteRoutes.ecosystemActors,
  },
  {
    name: 'Aligned Delegates',
    description:
      // keeping the text as it was provided
      // eslint-disable-next-line spellcheck/spell-checker
      "Aligned Delegates (ADs) are anonymous Alignment Conservers who use the Protocol Delegation System to enable MKR holders to delegate their voting power. ADs hold significant power and responsibility to maintain the Universal Alignment of the Maker Ecosystem. They must adhere to strict requirements and provide governance information and research material to AVCs, focusing on safeguarding the protocol's alignment.",
    teams: 0,
    href: siteRoutes.finances('immutable/aligned-delegates?year=2023'),
  },
  {
    name: 'Keepers',
    description:
      "Keepers are a specialized type of contributor entity that manage and operate certain decentralized financial operations within the Maker Ecosystem. They are responsible for performing functions such as maintaining the stability of the Dai stablecoin by participating in liquidation auctions and other mechanisms that ensure the system's resilience and efficiency. Keepers play a vital role in the decentralized operations of MakerDAO, helping to maintain the economic health and stability of the ecosystem.",
    teams: 0,
    href: siteRoutes.finances('scopes/PRO/KPRS?year=2023'),
  },
] as TeamType[];
const legacyTeams = [
  {
    name: 'Core Units',
    description:
      "Core Units were specialized teams within MakerDAO that handled specific operational, strategic, or technical functions necessary for the protocol's maintenance and growth. Each Core Unit had a defined mandate and budget, approved by Maker Governance, and was responsible for tasks such as engineering, risk management, growth, and more. For example, the Protocol Engineering Core Unit focused on developing and maintaining smart contracts, ensuring the security and correctness of the protocol, while the Growth Core Unit aimed to expand the distribution channels for DAI, increasing its adoption and usage globally.",
    teams: 0,
    href: siteRoutes.coreUnitsOverview,
  },
  {
    name: 'Recognized Delegates',
    description:
      "Recognized Delegates were individuals or entities that have been formally acknowledged by Maker Governance for their commitment to representing the interests of MKR holders. They participated actively in governance by voting on proposals and providing informed opinions. Recognized Delegates received compensation for their contributions and played a crucial role in ensuring that governance decisions aligned with the community's long-term goals. Their activities were transparent and subject to community oversight to maintain trust and accountability.",
    teams: 0,
    href: siteRoutes.recognizedDelegate,
  },
  {
    name: 'SPFs',
    description:
      "Special Purpose Funds were designated pools of capital allocated by Maker Governance for specific initiatives that supported the protocol's strategic objectives. These funds were used to finance projects that ranged from ecosystem development and marketing efforts to security audits and community grants. SPFs provided MakerDAO with the flexibility to invest in opportunities that enhanced the protocol's robustness, growth, and adoption, ensuring that it remained competitive and innovative within the DeFi space.",
    teams: 0,
    href: siteRoutes.finances('legacy/spfs?year=2023'),
  },
] as TeamType[];

const TeamsView: React.FC = () => (
  <TeamsPageContainer>
    <Container>
      <SectionsContainer>
        <TeamsSections sectionName="Current teams" teams={currentTeams} />

        <TeamsSections sectionName="Legacy" teams={legacyTeams} />
      </SectionsContainer>
    </Container>
  </TeamsPageContainer>
);

export default TeamsView;

const TeamsPageContainer = styled(PageContainer)(() => ({
  marginTop: 32,
}));

const SectionsContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
}));

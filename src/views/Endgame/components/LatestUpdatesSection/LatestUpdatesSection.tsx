import { styled } from '@mui/material';
import SectionHeader from '../SectionHeader/SectionHeader';
import PhaseCard, { EndgameUpdateStatus } from './PhaseCard';

const LatestUpdatesSection: React.FC = () => (
  <Content id="section-latest-updates">
    <SectionHeader
      title="Latest Updates"
      subtitle="MakerDAO’s Endgame is transforming to enhance growth, resilience, and accessibility, aiming to expand the Dai supply significantly. It introduces sustainable yield farming through SubDAO tokens, creating a dynamic and adaptable ecosystem. The plan includes launching new tokens, enhancing user experience with a new website and app, and initiating a Lockstake Engine for governance engagement."
    />

    <Timeline>
      <PhaseCard
        phase="Phase 1"
        title="Launch Season"
        status={EndgameUpdateStatus.INPROGRESS}
        description={{
          paragraph:
            'Introduction of new tokens (NewStable and NewGovToken) and a new brand focusing on user-friendly access and sustainable yield farming through the SubDAO ecosystem. This phase aims for rapid deployment of core features to drive Dai usage growth.',
          list: [
            {
              bold: 'New Beginnings',
              text: 'Unveiling a vibrant new brand and the revolutionary NewStable and NewFovToken.',
            },
            {
              bold: 'Access Simplified',
              text: 'Launch of a user-centric website and app, making navigation through our ecosystem seamless.',
            },
            {
              bold: 'Lock in Value',
              text: 'Introduction of the Lockstake Engine, fostering long-term participation and governance.',
            },
          ],
        }}
        importantLinks={[
          {
            href: 'https://forum.makerdao.com/t/makerdao-endgame-launch-season/23857',
            label: 'MakerDAO Endgame: Launch Season',
          },
          {
            href: 'https://forum.makerdao.com/t/governance-changes-to-prepare-for-launch-season/23878',
            label: 'Governance changes to prepare for Launch Season',
          },
          {
            href: 'https://forum.makerdao.com/t/preparing-to-decentralize-the-launch-project-after-launch-season/24193',
            label: 'Decentralization of Launch Project',
          },
        ]}
      />
      <PhaseCard
        phase="Phase 2"
        title="Scaling Up"
        status={EndgameUpdateStatus.TODO}
        description={{
          paragraph:
            'After the successful launch of key components, this phase focuses on vertical and horizontal expansion, including more SubDAOs catering to diverse interests and bridging to major L2s and L1s enhancing the ecosystem’s reach and capabilities.',
          list: [
            {
              bold: 'Diverse Ecosystem',
              text: 'Expansion with more SubDAOs, each addressing unique market need and interests.',
            },
            {
              bold: 'Enhance Connectivity',
              text: 'Implementation of bridges to popular L2s and L1s, widening our reach.',
            },
            {
              bold: 'Governance Evolution',
              text: 'SubDAOs gain autonomy, supported by innovative UI adn AI tools.',
            },
          ],
        }}
        importantLinks={[
          {
            href: 'https://forum.makerdao.com/t/makerdao-endgame-launch-season/23857',
            label: 'MakerDAO Endgame: Launch Season',
          },
        ]}
      />
      <PhaseCard
        phase="Phase 3"
        title="NewChain"
        status={EndgameUpdateStatus.TODO}
        description={{
          paragraph:
            'The transition to a standalone L1 blockchain, hosting core tokenomics and govenance, marks a pivotal point for scalability and integration of real-world assets, DeFi, and corss-blockchain operations.',
          list: [
            {
              bold: 'Introducing NewChain',
              text: 'Launch of a dedicated L1 blockchain to enhance the Maker ecosystem.',
            },
            {
              bold: 'Ethereum and Beyond',
              text: "NewChain's coexistence with Ethereum, supporting continuity and expansion.",
            },
            {
              bold: 'Foundation for the Future',
              text: 'Strategic development of NewChain to ensure scalability and innovation.',
            },
          ],
        }}
        importantLinks={[
          {
            href: 'https://forum.makerdao.com/t/makerdao-endgame-launch-season/23857',
            label: 'MakerDAO Endgame: Launch Season',
          },
        ]}
      />
      <PhaseCard
        phase="Phase 4"
        title="Final Endgame"
        status={EndgameUpdateStatus.TODO}
        description={{
          paragraph:
            'This phase signifies the completion of foundational governance mechanisms, leading to an immutable, dynamic, and ever-growing ecosystem, embodying the ultimate vision of MakerDAO’s Endgame.',
          list: [
            {
              bold: 'Completion of Governance Mechanisms',
              text: 'Finalization and immutability of foundational governance structures.',
            },
            {
              bold: 'Achievement of Ultimate Vision',
              text: 'Realization of dynamic, ever-expanding ecosystem with a stable financial foundation.',
            },
            {
              bold: 'Permanent Infrastructure',
              text: 'Establishment of a reliable, unchangeable infrastructure for future growth.',
            },
          ],
        }}
        importantLinks={[
          {
            href: 'https://forum.makerdao.com/t/makerdao-endgame-launch-season/23857',
            label: 'MakerDAO Endgame: Launch Season',
          },
        ]}
      />
    </Timeline>
  </Content>
);

export default LatestUpdatesSection;

const Content = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 24,
  gap: 24,
  scrollMarginTop: 130,

  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 32,
  },
}));

const Timeline = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 24,
  },
}));

import { styled } from '@mui/material';
import { ProjectStatus } from '@ses/core/models/interfaces/projects';
import SectionHeader from '../SectionHeader/SectionHeader';
import PhaseCard from './PhaseCard';

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
        status={ProjectStatus.INPROGRESS}
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
            href: 'https://powerhouse.gitbook.io/maker-alignment-artifacts',
            label: 'Maker Alignment Artifacts',
          },
          {
            href: 'https://forum.makerdao.com/t/preparing-to-decentralize-the-launch-project-after-launch-season/24193',
            label: 'Decentralization of Launch Projects',
          },
        ]}
      />
      <PhaseCard
        phase="Phase 2"
        title="Scaling Up"
        status={ProjectStatus.TODO}
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
      />
      <PhaseCard
        phase="Phase 3"
        title="NewChain"
        status={ProjectStatus.TODO}
        description={{
          paragraph:
            'The transition to a standalone L1 blockchain, hosting core tokenomics and govenance, marks a pivotal point for scalability and integration of real-world assets, DeFi, and corss-blockchain operations.',
          list: [
            {
              bold: 'Introducing NewChain',
              text: 'Laung of a dedicated L1 blockchain to inhance the Maker ecosystem.',
            },
            {
              bold: 'Ethereum and Beyond',
              text: "NewChain's coexistence with Ethereum, supporting continuity and expansion.",
            },
            {
              bold: 'Foundation for the Future',
              text: 'Strategic development of New Chain to ensure scalability and innovation.',
            },
          ],
        }}
      />
      <PhaseCard
        phase="Phase 4"
        title="Final Endgame"
        status={ProjectStatus.TODO}
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
      />
    </Timeline>
  </Content>
);

export default LatestUpdatesSection;

const Content = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 32,
  gap: 24,
  scrollMarginTop: 130,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 40,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 64,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    marginTop: 32,
  },
}));

const Timeline = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
}));

import { styled } from '@mui/system';
import ProjectOwnerChip from '@ses/containers/ActorProjects/components/ProjectOwnerChip/ProjectOwnerChip';
import SupportedTeamsAvatarGroup from '@ses/containers/ActorProjects/components/SupportedTeamsAvatarGroup/SupportedTeamsAvatarGroup';
import { OwnerType } from '@ses/core/models/interfaces/projects';
import MilestoneProgress from './MilestoneProgress';
import StatsData from './StatsData';

const MilestoneDetailsCard: React.FC = () => (
  <Card>
    <MobileHeader>
      <HeaderGroupBox>
        <NameBox>
          <Code>BASE</Code>
          <Name>Exploration Base</Name>
        </NameBox>

        <MilestoneNumber>Milestone 1</MilestoneNumber>
      </HeaderGroupBox>

      <HeaderGroupBox>
        <ProjectOwnerChip
          owner={{
            id: '1',
            ref: OwnerType.EcosystemActor,
            name: 'Phoenix Lab',
          }}
        />
        <SupportedTeamsAvatarGroup
          supporters={[
            {
              id: '1',
              name: 'Team 1',
              ref: OwnerType.EcosystemActor,
            },
            {
              id: '2',
              name: 'Team 2',
              ref: OwnerType.EcosystemActor,
            },
          ]}
        />
      </HeaderGroupBox>
    </MobileHeader>
    <Aside>
      <AsideContent>
        <MilestoneProgress />
        <StatsData />
      </AsideContent>
      <DescriptionContent>
        <Paragraph>
          Feature exploration and open design questions, smart contracts project, chatbot, UI intergration, marcomms
          project.
        </Paragraph>
        <Paragraph>
          Milestone 1, set for August 1, marks the initial phase of Exploration Base. Projects include Smart Contracts,
          focused on establishing foundations and addressing design questions. The Chatbot Project aims to enhance the
          conversational UX with low hanging fruit execution, prioritizing clarity and correctness. Overall, this
          milestone lays the groundwork, explores design possibilities, and strives to improve the user experience in
          the MakerDAO ecosystem.
        </Paragraph>
      </DescriptionContent>
    </Aside>
    <MilestoneContent>
      <DeliverablesSection>all deliverables here...</DeliverablesSection>
    </MilestoneContent>
  </Card>
);

export default MilestoneDetailsCard;

const Card = styled('article')(({ theme }) => ({
  background: theme.palette.mode === 'light' ? '#fff' : 'red',
  border: `1px solid ${theme.palette.mode === 'light' ? '#D1DEE6' : 'red'}`,
  borderRadius: 6,
  padding: '16px 16px 24px 16px',

  [theme.breakpoints.up('tablet_768')]: {
    padding: 24,
    border: `1px solid ${theme.palette.mode === 'light' ? '#F6F8F9' : 'red'}`,
    boxShadow:
      theme.palette.mode === 'light'
        ? '1px 1px 5px 0px rgba(190, 190, 190, 0.25), 0px 12px 16px 0px rgba(219, 227, 237, 0.40)'
        : '1px 1px 5px 0px red, 0px 12px 16px 0px red',
  },
}));

const MobileHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const HeaderGroupBox = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  [theme.breakpoints.up('tablet_768')]: {
    gap: 16,
  },
}));

const NameBox = styled('div')(() => ({
  display: 'flex',
  gap: 4,
}));

const Code = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#231536' : 'red',
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 'normal',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: 0.4,
  },
}));

const Name = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#25273D' : 'red',
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '18px',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const MilestoneNumber = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#708390' : 'red',
  fontSize: 11,
  lineHeight: 'normal',
  padding: '3px 7px',
  borderRadius: 3,
  border: `1px solid ${theme.palette.mode === 'light' ? '#D4D9E1' : 'red'}`,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    fontWeight: 700,
  },
}));

const Aside = styled('aside')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 16,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    gap: 32,
    marginTop: 32,
  },
}));

const AsideContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 32,
    width: 336,
    minWidth: 336,
  },
}));

const DescriptionContent = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
}));

const Paragraph = styled('p')(({ theme }) => ({
  margin: 0,
  fontSize: 16,
  lineHeight: '22px',
  color: theme.palette.mode === 'light' ? '#231536' : 'red',
}));

const MilestoneContent = styled('div')({});

const DeliverablesSection = styled('div')({});

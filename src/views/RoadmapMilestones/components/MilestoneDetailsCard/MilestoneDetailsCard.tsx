import { styled } from '@mui/system';
import ProjectOwnerChip from '@ses/containers/ActorProjects/components/ProjectOwnerChip/ProjectOwnerChip';
import SupportedTeamsAvatarGroup from '@ses/containers/ActorProjects/components/SupportedTeamsAvatarGroup/SupportedTeamsAvatarGroup';
import { OwnerType } from '@ses/core/models/interfaces/projects';
import type { Milestone } from '@/core/models/interfaces/roadmaps';
import Contributors from './Contributors';
import Coordinators from './Coordinators';
import DeliverablesSection from './DeliverablesSection';
import MilestoneProgress from './MilestoneProgress';
import StatsData from './StatsData';

interface MilestoneDetailsCardProps {
  minimal?: boolean;
  milestone: Milestone;
}

const MilestoneDetailsCard: React.FC<MilestoneDetailsCardProps> = ({ minimal, milestone }) => (
  <Card id={milestone.code}>
    <MobileHeader>
      <HeaderGroupBox>
        <NameBox>
          <Code>{milestone.code}</Code>
          <Name>{milestone.title}</Name>
        </NameBox>

        <MilestoneNumber>{milestone.id}</MilestoneNumber>
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
        <CodeBox>
          <Code>{milestone.code}</Code>
        </CodeBox>
        <MilestoneProgress minimal={minimal} data={milestone.scope?.[0]} />
        <Divider />
        <StatsData minimal={minimal} targetDate={milestone.targetDate} />
        <Divider />
        <Coordinators coordinators={milestone.coordinators} />
        <Divider />
        <Contributors contributors={milestone.contributors} />
      </AsideContent>
      <DescriptionContent>
        {milestone.description.split('\n').map((paragraph, index) => (
          <Paragraph key={index}>{paragraph}</Paragraph>
        ))}
      </DescriptionContent>
    </Aside>
    <MilestoneContent>
      <ShowOn1024Up>
        <HeaderGroupBox>
          <Name>{milestone.title}</Name>
          <MilestoneNumber>{milestone.id}</MilestoneNumber>
        </HeaderGroupBox>

        <DescriptionContentForDesktop>
          {milestone.description.split('\n').map((paragraph, index) => (
            <Paragraph key={index}>{paragraph}</Paragraph>
          ))}
        </DescriptionContentForDesktop>
      </ShowOn1024Up>

      <DeliverablesContainer>
        <DeliverablesSection minimal={minimal} />
      </DeliverablesContainer>
    </MilestoneContent>
  </Card>
);

export default MilestoneDetailsCard;

const Card = styled('article')(({ theme }) => ({
  position: 'relative',
  background:
    theme.palette.mode === 'light' ? '#fff' : 'linear-gradient(180deg, #1E2C37 0%, #1E2C37 24.48%, #101E26 100%)',
  border: `1px solid ${theme.palette.mode === 'light' ? '#D1DEE6' : '#31424E'}`,
  borderRadius: 6,
  padding: '16px 16px 24px 16px',

  [theme.breakpoints.up('tablet_768')]: {
    padding: 24,
    border: `1px solid ${theme.palette.mode === 'light' ? '#F6F8F9' : '#31424E'}`,
    boxShadow:
      theme.palette.mode === 'light'
        ? '1px 1px 5px 0px rgba(190, 190, 190, 0.25), 0px 12px 16px 0px rgba(219, 227, 237, 0.40)'
        : 'none',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: 0,
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    display: 'flex',
    gap: 24,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 48,
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
  gap: 16,

  [theme.breakpoints.up('desktop_1024')]: {
    marginBottom: 24,
  },
}));

const NameBox = styled('div')(() => ({
  display: 'flex',
  gap: 4,
}));

const Code = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#231536' : '#B6BCC2',
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
  color: theme.palette.mode === 'light' ? '#25273D' : '#D2D4EF',
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '18px',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'block',
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 'normal',
    letterSpacing: 0.4,
    color: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',
  },
}));

const MilestoneNumber = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#708390' : '#B6BCC2',
  fontSize: 11,
  lineHeight: 'normal',
  padding: '3px 7px',
  borderRadius: 3,
  border: '1px solid #D4D9E1',
  alignSelf: 'baseline',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    fontWeight: 700,
    alignSelf: 'center',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: 0.4,
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

  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'column',
    marginTop: 0,
    width: 306,
    minWidth: 306,
    height: 'fit-content',
    padding: '24px 16px',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    borderRadius: 6,
    border: `1px solid ${theme.palette.isLight ? '#D1DEE6' : '#31424E'}`,
    background: theme.palette.isLight ? '#F6F8F9' : '#1E2C37',
    position: 'sticky',
    top: 140,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 383,
    minWidth: 383,
    padding: '24px 32px 24px 24px',
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

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 40,
    width: '100%',
    minWidth: '100%',
  },
}));

const CodeBox = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
  },
}));

const Divider = styled('div')(({ theme }) => ({
  display: 'none',
  width: '100%',
  position: 'relative',
  height: 17,

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'block',

    '&::before': {
      content: '""',
      position: 'absolute',
      width: 'calc(100% - 32px)',
      height: 1,
      background: theme.palette.mode === 'light' ? '#D4D9E1' : '#31424E',
      top: 8,
      left: 16,
    },
  },
}));

const DescriptionContent = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const Paragraph = styled('p')(({ theme }) => ({
  margin: 0,
  fontSize: 16,
  lineHeight: '22px',
  color: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',
}));

const MilestoneContent = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('desktop_1024')]: {
    paddingTop: 20,
  },
}));

const ShowOn1024Up = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'block',
  },
}));

const DescriptionContentForDesktop = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}));

const DeliverablesContainer = styled('div')(({ theme }) => ({
  marginTop: 40,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 56,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 32,
  },
}));

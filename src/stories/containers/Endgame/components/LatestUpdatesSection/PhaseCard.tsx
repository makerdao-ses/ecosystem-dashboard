import { styled } from '@mui/material';
import ProjectStatusChip from '@ses/containers/ActorProjects/components/ProjectStatusChip/ProjectStatusChip';
import ImportantLinks from './ImportantLinks';
import type { ImportantLink } from './ImportantLinks';
import type { ProjectStatus } from '@ses/core/models/interfaces/projects';

export interface Description {
  paragraph: string;
  list: {
    bold: string;
    text: string;
  }[];
}

interface PhaseCardProps {
  phase: string;
  title: string;
  status: ProjectStatus;
  description: Description;
  importantLinks?: ImportantLink[];
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase, title, status, description, importantLinks = [] }) => (
  <Card>
    <Header>
      <TitleContainer>
        <Phase>{phase}</Phase>
        <Title>{title}</Title>
      </TitleContainer>

      <ProjectStatusChip status={status} />
    </Header>

    <Body>
      <DescriptionContainer>
        <Paragraph>{description.paragraph}</Paragraph>

        <List>
          {description.list.map(({ bold, text }, index) => (
            <ListItem key={index}>
              <Bold>{bold}:</Bold>
              <Text>{text}</Text>
            </ListItem>
          ))}
        </List>
      </DescriptionContainer>
      <ImportantLinks links={importantLinks} />
    </Body>
  </Card>
);

export default PhaseCard;

const Card = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  background: theme.palette.mode === 'light' ? 'white' : 'red',
  padding: 8,
  borderRadius: 6,
  boxShadow:
    theme.palette.mode === 'light'
      ? '20px 20px 20px rgba(219, 227, 237, 0.4), 1px 1px 5px rgba(190, 190, 190, 0.25)'
      : '20px 20px 20px red',

  [theme.breakpoints.up('tablet_768')]: {
    gap: 16,
  },
}));

const Header = styled('header')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  [theme.breakpoints.up('tablet_768')]: {
    justifyContent: 'flex-start',
    gap: 24,
  },
}));

const TitleContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}));

const Phase = styled('span')(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#708390' : 'red',
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '19px',
}));

const Title = styled('h3')(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#231536' : 'red',
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '19px',
}));

const Body = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 16,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'row',
  },
}));

const DescriptionContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 8,
  borderRadius: 6,
  background: theme.palette.mode === 'light' ? 'rgba(246, 248, 249, 0.5)' : 'red',
  boxShadow: '1px 3px 7px rgba(0, 0, 0, 0.05) inset',
  fontSize: 14,
  lineHeight: '17px',
  color: theme.palette.mode === 'light' ? '#231536' : 'red',

  [theme.breakpoints.up('tablet_768')]: {
    padding: 16,
    fontSize: 16,
    lineHeight: '22px',
  },
}));

const Paragraph = styled('p')(() => ({
  margin: 0,
}));

const List = styled('ul')(() => ({
  paddingLeft: 22,
  marginBottom: 0,
}));

const ListItem = styled('li')(() => ({}));

const Bold = styled('b')(() => ({
  fontWeight: 600,
  marginRight: 4,
}));

const Text = styled('span')(() => ({}));

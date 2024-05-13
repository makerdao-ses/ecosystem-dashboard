import { styled } from '@mui/material';
import Card from '@/components/Card/Card';
import ImportantLinks from './ImportantLinks';
import type { ImportantLink } from './ImportantLinks';

export interface Description {
  paragraph: string;
  list: {
    bold: string;
    text: string;
  }[];
}

export enum EndgameUpdateStatus {
  TODO = 'TODO',
  INPROGRESS = 'IN_PROGRESS',
}

interface PhaseCardProps {
  phase: string;
  title: string;
  status: EndgameUpdateStatus;
  description: Description;
  importantLinks?: ImportantLink[];
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase, title, status, description, importantLinks = [] }) => (
  <CustomCard>
    <Header status={status}>
      <TitleContainer>
        <Phase>{phase}</Phase>
        <Title>{title}</Title>
      </TitleContainer>
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
  </CustomCard>
);

export default PhaseCard;

const CustomCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 8,
  overflow: 'hidden',

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 16,
  },
}));

const Header = styled('header')<{ status: EndgameUpdateStatus }>(({ theme, status }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background:
    status === EndgameUpdateStatus.INPROGRESS
      ? theme.palette.isLight
        ? theme.palette.colors.blue[50]
        : theme.palette.colors.blue[300]
      : theme.palette.isLight
      ? theme.palette.colors.orange[100]
      : theme.palette.colors.orange[400],
  margin: '-8px -8px 0',
  padding: '5px 8px',

  [theme.breakpoints.up('tablet_768')]: {
    justifyContent: 'flex-start',
    gap: 24,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '8px 23px 8px',
  },
}));

const TitleContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}));

const Phase = styled('span')(({ theme }) => ({
  color: theme.palette.colors.slate[200],
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const Title = styled('h3')(({ theme }) => ({
  color: theme.palette.colors.slate[950],
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  margin: 0,

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const Body = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 16,
    flexDirection: 'row',
  },
}));

const DescriptionContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 7,
  borderRadius: 12,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  fontSize: 14,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    padding: 16,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
  },
}));

const Paragraph = styled('p')(() => ({
  margin: 0,
}));

const List = styled('ul')(({ theme }) => ({
  paddingLeft: 20,
  marginTop: 16,
  marginBottom: 0,

  [theme.breakpoints.up('desktop_1280')]: {
    paddingLeft: 24,
  },
}));

const ListItem = styled('li')(() => ({}));

const Bold = styled('b')(() => ({
  fontWeight: 600,
  marginRight: 4,
}));

const Text = styled('span')(() => ({}));

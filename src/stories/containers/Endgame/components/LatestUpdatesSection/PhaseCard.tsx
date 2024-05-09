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

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 16,
  },
}));

// TODO: implement the header color based on the status
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Header = styled('header')<{ status: EndgameUpdateStatus }>(({ theme, status }) => ({
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
  color: theme.palette.mode === 'light' ? '#708390' : '#546978',
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '19px',
}));

const Title = styled('h3')(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',
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
  background: theme.palette.mode === 'light' ? 'rgba(246, 248, 249, 0.5)' : 'rgba(16, 25, 31, 0.3)',
  boxShadow:
    theme.palette.mode === 'light' ? '1px 3px 7px rgba(0, 0, 0, 0.05) inset' : '1px 3px 7px rgba(0, 0, 0, 0.15) inset',
  fontSize: 14,
  lineHeight: '17px',
  color: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',

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

import { styled, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import Card from '@/components/Card/Card';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import type { Theme } from '@mui/material';

export type CardType = 'contributor' | 'team';

interface TeamTypeCardProps {
  name: string;
  teams: number;
  href: string;
  description: string;
  cardType: CardType;
}

const TeamTypeCard: React.FC<TeamTypeCardProps> = ({ name, teams, href, description, cardType }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));

  return (
    <LinkStyled href={href}>
      <TeamCard>
        <MobileHeader>
          <NameContainer>
            <Name>{name}</Name>
            <TeamsNumber>{teams}</TeamsNumber>
          </NameContainer>
          <InternalLinkButtonStyled href={href} showIcon label={isMobile ? undefined : 'View'} isLink={false} />
        </MobileHeader>

        <MainContentDesktop>
          <Name>{name}</Name>
          <Description>{description}</Description>
        </MainContentDesktop>

        <TeamsNumberDesktop>
          <span>{teams}</span> <span>{cardType === 'team' ? 'Teams' : 'Contributors'}</span>
        </TeamsNumberDesktop>
        <DesktopLinkContainer>
          <InternalLinkButtonStyled href={''} showIcon label="View" isLink={false} />
        </DesktopLinkContainer>
      </TeamCard>
    </LinkStyled>
  );
};

export default TeamTypeCard;

const TeamCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  cursor: 'pointer',
  padding: '8px 16px 16px',
  ':hover': {
    backgroundColor: theme.palette.isLight ? '#FCFCFC' : '#292E38',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'row',
  },
}));

const LinkStyled = styled(Link)({
  display: 'flex',
});

const MobileHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const NameContainer = styled('div')(() => ({
  display: 'flex',
  gap: 8,
}));

const Name = styled('h3')(({ theme }) => ({
  margin: 0,
  fontSize: 14,
  lineHeight: '22px',
  fontWeight: 600,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const TeamsNumber = styled('div')(({ theme }) => ({
  fontSize: 16,
  lineHeight: '24px',
  fontWeight: 600,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 18,
    lineHeight: '22px',
    fontWeight: 700,
  },
}));

const Description = styled('p')(({ theme }) => ({
  margin: 0,
  borderRadius: 8,
  padding: 7,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  fontSize: 14,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.slate[200],
}));

const InternalLinkButtonStyled = styled(InternalLinkButton)(({ theme }) => ({
  borderRadius: 8,
  padding: '2px 16px 2px 16px',

  '&:hover': {
    padding: '2px 16px 2px 16px',
    gap: 8,
  },

  [theme.breakpoints.up('tablet_768')]: {
    padding: '2px 16px 2px 24px',

    '&:hover': {
      padding: '2px 16px 2px 24px',
    },
  },
}));

const MainContentDesktop = styled('div')(({ theme }) => ({
  '& > h3:first-of-type': {
    display: 'none',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,

    '& > h3:first-of-type': {
      display: 'block',
    },
  },
}));

const TeamsNumberDesktop = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    fontSize: 18,
    lineHeight: '22px',
    fontWeight: 700,
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
    textWrap: 'nowrap',
    width: 146,
    minWidth: 146,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: 186,
    minWidth: 186,
  },
}));

const DesktopLinkContainer = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

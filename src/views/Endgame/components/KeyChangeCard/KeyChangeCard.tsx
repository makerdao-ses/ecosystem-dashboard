import { styled } from '@mui/material';
import React from 'react';
import ExternalLinkText from '@/components/ExternalLinkText/ExternalLinkText';
import TransitionHeader from '../TransitionHeader/TransitionHeader';

export interface ReadMoreItem {
  title: string;
  href: string;
}

interface KeyChangeCardProps extends React.PropsWithChildren {
  from: string | string[];
  to: string | string[];
  title: string;
  readMore: ReadMoreItem[];
}

const KeyChangeCard: React.FC<KeyChangeCardProps> = ({ from, to, title, children: description, readMore }) => (
  <Container>
    <TransitionHeader from={from} to={to} />
    <Card>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <ReadMoreSection>
        <Label>Read More</Label>
        <List>
          {readMore.map((item, index) => (
            <ExternalLinkText href={item.href} asLi key={index}>
              {item.title}
            </ExternalLinkText>
          ))}
        </List>
      </ReadMoreSection>
    </Card>
  </Container>
);

export default KeyChangeCard;

const Container = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 16,
  },
}));

const Card = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 16px',
  borderRadius: 12,
  border: `1px solid ${theme.palette.isLight ? '#F6F8F9' : theme.palette.colors.charcoal[900]}`,
  background: theme.palette.isLight ? 'white' : '#181B21',
  boxShadow: theme.palette.isLight ? theme.fusionShadows.shortShadow : theme.fusionShadows.darkMode,
  gap: 8,

  [theme.breakpoints.up('desktop_1280')]: {
    flexGrow: 1,
    padding: 16,
    gap: 16,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    padding: '24px 32px',
    gap: 24,
  },
}));

const Title = styled('h3')(({ theme }) => ({
  fontSize: 14,
  lineHeight: '24px',
  fontWeight: 700,
  margin: 0,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[300],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const Description = styled('p')(({ theme }) => ({
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[300],
  margin: 0,

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
  },
}));

const ReadMoreSection = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginTop: 'auto',
});

const Label = styled('div')(({ theme }) => ({
  fontSize: 14,
  lineHeight: '22px',
  fontWeight: 600,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[300],
}));

const List = styled('ul')({
  margin: 0,
  paddingLeft: 14,
  paddingRight: 6,
  listStyle: 'none',
  position: 'relative',
});

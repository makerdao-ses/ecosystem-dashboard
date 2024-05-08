import styled from '@emotion/styled';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import TransitionHeader from '../TransitionHeader/TransitionHeader';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

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

const KeyChangeCard: React.FC<KeyChangeCardProps> = ({ from, to, title, children: description, readMore }) => {
  const { isLight } = useThemeContext();

  return (
    <Container>
      <TransitionHeader from={from} to={to} />
      <Card isLight={isLight}>
        <Title isLight={isLight}>{title}</Title>
        <Description isLight={isLight}>{description}</Description>
        <ReadMoreSection>
          <Label isLight={isLight}>Read More</Label>
          <List>
            {readMore.map((item, index) => (
              <ListItem key={index}>
                <ExternalLink isLight={isLight} href={item.href}>
                  {item.title}
                </ExternalLink>
              </ListItem>
            ))}
          </List>
        </ReadMoreSection>
      </Card>
    </Container>
  );
};

export default KeyChangeCard;

const Container = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 16,
  },
});

const Card = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '23px 15px',
  borderRadius: 6,
  border: `1px solid ${isLight ? '#F6F8F9' : '#1E2C37'}`,
  background: isLight ? '#FFF' : '#10191F',
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 5px 10px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
  gap: 24,

  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '23px 31px',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    flexGrow: 1,
  },
}));

const Title = styled.h3<WithIsLight>(({ isLight }) => ({
  fontSize: 16,
  lineHeight: '19px',
  fontWeight: 700,
  margin: 0,
  color: isLight ? '#231536' : '#D2D4EF',
}));

const Description = styled.p<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  lineHeight: 'normal',
  color: isLight ? '#231536' : '#D2D4EF',
  margin: 0,

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    lineHeight: '22px',
  },
}));

const ReadMoreSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginTop: 'auto',
});

const Label = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  lineHeight: '18px',
  fontWeight: 500,
  color: isLight ? '#231536' : '#D2D4EF',
}));

const List = styled.ul({
  margin: 0,
  paddingLeft: 14,
  paddingRight: 6,
  listStyle: 'none',
  position: 'relative',
});

const ListItem = styled.li({
  color: '#447AFB',
  lineHeight: '18px',

  '&:not(:last-of-type)': {
    marginBottom: 8,
  },

  '&::before': {
    content: '""',
    display: 'block',
    width: 6,
    height: 6,
    borderRadius: 6,
    background: '#447AFB',
    position: 'absolute',
    left: 0,
    marginTop: 6,
  },
});

const ExternalLink = styled(CustomLink)<WithIsLight>(() => ({
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '17px',
  letterSpacing: 'normal',
  whiteSpace: 'normal',
  paddingRight: 0,
  marginLeft: 0,

  '& svg': {
    width: 10,
    height: 10,
    // override inline style
    marginLeft: '7px!important',
  },

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
  },
}));

import styled from '@emotion/styled';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
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
              <ListItem isLight={isLight} key={index}>
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

  [lightTheme.breakpoints.up('table_834')]: {
    gap: 16,
  },
});

const Card = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '23px 15px',
  borderRadius: 6,
  border: `1px solid ${isLight ? '#F6F8F9' : 'red'}`,
  background: isLight ? '#FFF' : 'red',
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 5px 10px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px red, 0px 5px 10px 0px red',
  gap: 24,
}));

const Title = styled.h3<WithIsLight>(({ isLight }) => ({
  fontSize: 16,
  lineHeight: '19px',
  fontWeight: 700,
  margin: 0,
  color: isLight ? '#231536' : 'red',
}));

const Description = styled.p<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  lineHeight: 'normal',
  color: isLight ? '#231536' : 'red',
  margin: 0,
}));

const ReadMoreSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const Label = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  lineHeight: '18px',
  fontWeight: 500,
  color: isLight ? '#231536' : 'red',
}));

const List = styled.ul({
  margin: 0,
  paddingLeft: 14,
});

const ListItem = styled.li<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#447AFB' : '',

  '&:not(:last-of-type)': {
    marginBottom: 8,
  },
}));

const ExternalLink = styled(CustomLink)<WithIsLight>(() => ({
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '18px',
  letterSpacing: 'normal',
  whiteSpace: 'normal',
  paddingRight: 0,
  marginLeft: 0,

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
  },
}));

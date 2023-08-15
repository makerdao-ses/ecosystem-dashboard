import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const IntroductoryHeadline: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <Section>
      <HeadlineTitle isLight={isLight}>The Maker Endgame</HeadlineTitle>
      <HeadlineSubtext isLight={isLight}>
        Lorem ipsum dolor sit amet consectetur. Odio ac erat facilisis non aenean vitae. Integer fames vitae tempus
        ultricies. Faucibus sit congue nunc laoreet morbi diam a. Augue in egestas commodo donec eu
      </HeadlineSubtext>
    </Section>
  );
};

export default IntroductoryHeadline;

const Section = styled.section({
  textAlign: 'center',
  marginBottom: 38,

  [lightTheme.breakpoints.up('table_834')]: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 672,
    marginBottom: 54,
  },
});

const HeadlineTitle = styled.h1<WithIsLight>(({ isLight }) => ({
  margin: 0,
  fontSize: 24,
  fontWeight: 600,
  letterSpacing: 0.4,
  color: isLight ? '#231536' : 'red',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 32,
  },
}));

const HeadlineSubtext = styled.p<WithIsLight>(({ isLight }) => ({
  marginBottom: 0,
  marginTop: 32,
  fontSize: 14,
  lineHeight: '16px',
  color: isLight ? '#231536' : 'red',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
    lineHeight: '22px',
    marginTop: 27,
  },
}));

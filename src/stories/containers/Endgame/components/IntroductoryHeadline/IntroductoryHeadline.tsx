import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const IntroductoryHeadline: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <Section>
      <HeadlineTitle isLight={isLight}>The Maker Endgame</HeadlineTitle>
      <HeadlineSubtext isLight={isLight}>
        Endgame is a holistic initiative fortifying MakerDAO's ecosystem through governance and tokenomics enhancements;
        from Aligned Artifacts, like Atlas and Scopes, for governance alignment, to new tokenomics updates, like
        adjusted MKR burn and minting, to boost sustainability.
      </HeadlineSubtext>
    </Section>
  );
};

export default IntroductoryHeadline;

const Section = styled.section({
  textAlign: 'center',
  marginBottom: 38,

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 675,
    marginBottom: 54,
  },
});

const HeadlineTitle = styled.h1<WithIsLight>(({ isLight }) => ({
  margin: 0,
  fontSize: 24,
  fontWeight: 600,
  letterSpacing: 0.4,
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 32,
  },
}));

const HeadlineSubtext = styled.p<WithIsLight>(({ isLight }) => ({
  marginBottom: 0,
  marginTop: 32,
  fontSize: 14,
  lineHeight: '16px',
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    lineHeight: '22px',
    marginTop: 27,
  },
}));

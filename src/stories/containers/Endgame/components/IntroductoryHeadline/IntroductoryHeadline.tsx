import { styled } from '@mui/material';
import React from 'react';

const IntroductoryHeadline: React.FC = () => (
  <Section>
    <HeadlineTitle>The Maker Endgame</HeadlineTitle>
    <HeadlineSubtext>
      Endgame is a holistic initiative fortifying MakerDAO's ecosystem through governance and tokenomics enhancements;
      from Aligned Artifacts, like Atlas and Scopes, for governance alignment, to new tokenomics updates, like adjusted
      MKR burn and minting, to boost sustainability.
    </HeadlineSubtext>
  </Section>
);

export default IntroductoryHeadline;

const Section = styled('section')(({ theme }) => ({
  textAlign: 'center',
  marginBottom: 32,

  [theme.breakpoints.up('tablet_768')]: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 672,
    marginBottom: 64,
  },
}));

const HeadlineTitle = styled('h1')(({ theme }) => ({
  margin: 0,
  fontSize: 20,
  lineHeight: '24px',
  fontWeight: 700,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 32,
    lineHeight: '38px',
  },
}));

const HeadlineSubtext = styled('p')(({ theme }) => ({
  marginBottom: 0,
  marginTop: 16,
  fontSize: 14,
  lineHeight: '22px',
  fontWeight: 600,
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    lineHeight: '24px',
    marginTop: 32,
  },
}));

import { styled } from '@mui/material';

import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import Card from '@/components/Card/Card';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';

const KeyChangesBudgetTransitionStatusSection: React.FC = () => (
  <CardContainer>
    <Title> Important Links</Title>

    <ContainerButton>
      <ExternalLinkButtonStyled href="https://endgame.makerdao.com">endgame.makerdao.com</ExternalLinkButtonStyled>
      <ExternalLinkButtonStyled href="https://forum.makerdao.com">forum.makerdao.com</ExternalLinkButtonStyled>
    </ContainerButton>
  </CardContainer>
);

export default KeyChangesBudgetTransitionStatusSection;

const CardContainer = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 16px 8px 16px',
  gap: 16,

  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    padding: '8px 16px 8px 16px',
    justifyContent: 'space-between',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'row',
    justifyContent: 'revert',
    gap: 32,
    padding: '16px 24px 16px 24px',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'row',
    padding: '16px 40px 16px 40px',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    flexDirection: 'row',
    padding: '16px 32px 16px 32px',
  },
});

const Title = styled('div')(({ theme }) => ({
  fontSize: 16,
  display: 'flex',
  lineHeight: '24px',
  fontWeight: 700,
  marginTop: 2,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 18,
    alignItems: 'center',
    lineHeight: '21.6px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 18,
    marginTop: 0,
    lineHeight: '21.6px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
}));

const ContainerButton = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginTop: -1,
  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 1,
    marginRight: -2,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'row',
    gap: 16,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    flexDirection: 'row',
    gap: 24,
  },
});

const ExternalLinkButtonStyled = styled(ExternalLinkButton)(() => ({
  padding: '2px 10px 2px 24px',
  fontSize: 16,
  lineHeight: '24px',
}));

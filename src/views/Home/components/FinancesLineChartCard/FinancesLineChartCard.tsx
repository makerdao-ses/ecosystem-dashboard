import { Button, styled } from '@mui/material';

import Card from '@/components/Card/Card';

import { financesLineChartCardData } from '@/views/Home/staticData';
import useFinancesLineChartCard from './useFinancesLineChartCard';

import type { ButtonProps } from '@mui/material';
import type { FC } from 'react';

interface TabButtonProps extends ButtonProps {
  isActive?: boolean;
}

const FinancesLineChartCard: FC = () => {
  const { activeTab, handleActiveTab } = useFinancesLineChartCard();

  return (
    <Container>
      <TabButtonsContainer>
        <TabButton
          isActive={activeTab === 0}
          disableRipple
          onClick={() => {
            handleActiveTab(0);
          }}
        >
          {financesLineChartCardData.tabButtonsTexts[0]}
        </TabButton>
        <TabButton
          isActive={activeTab === 1}
          disableRipple
          onClick={() => {
            handleActiveTab(1);
          }}
        >
          {financesLineChartCardData.tabButtonsTexts[1]}
        </TabButton>
        <TabButton
          isActive={activeTab === 2}
          disableRipple
          onClick={() => {
            handleActiveTab(2);
          }}
        >
          {financesLineChartCardData.tabButtonsTexts[2]}
        </TabButton>
      </TabButtonsContainer>
    </Container>
  );
};

export default FinancesLineChartCard;

const Container = styled(Card)(({ theme }) => ({
  width: '100%',
  minHeight: 400,
  padding: '0px 0px 16px',

  [theme.breakpoints.up('tablet_768')]: {
    padding: 16,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '16px 24px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '16px 16px 24px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    padding: '16px 24px 24px',
  },
}));

const TabButtonsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  borderRadius: '12px 12px 0px 0px',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[800],
  boxShadow: '1px 0px 15px 0px rgba(117, 117, 117, 0.15)',

  [theme.breakpoints.up('tablet_768')]: {
    width: 'fit-content',
    gap: 24,
    borderRadius: 0,
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: '100%',
    justifyContent: 'center',
    gap: 32,
  },
}));

const TabButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<TabButtonProps>(({ theme, isActive }) => ({
  width: '100%',
  height: 34,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: 8,
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  textTransform: 'none',
  border: 'none',
  borderRadius: 0,
  color: theme.palette.colors.gray[500],
  backgroundColor: 'transparent',
  boxShadow: 'none',

  ...(isActive && {
    fontWeight: 700,
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[700],
  }),

  '&:first-of-type': {
    width: '90%',
    borderTopLeftRadius: 12,
  },

  '&:last-of-type': {
    width: '40%',
    borderTopRightRadius: 12,
  },

  '&:hover': {
    backgroundColor: isActive
      ? theme.palette.isLight
        ? theme.palette.colors.slate[50]
        : theme.palette.colors.charcoal[700]
      : 'transparent',
  },

  '&:active, &:focus': {
    fontWeight: 700,
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[700],
  },

  [theme.breakpoints.up('tablet_768')]: {
    width: 'auto',
    height: 22,
    padding: 0,
    fontSize: 14,
    lineHeight: '22px',
    color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.slate[400],

    ...(isActive && {
      fontWeight: 500,
      color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],
      backgroundColor: 'transparent',
    }),

    '&:first-of-type': {
      width: 'auto',
      borderTopLeftRadius: 0,
    },

    '&:last-of-type': {
      width: 'auto',
      borderTopRightRadius: 0,
    },

    '&:hover': {
      ...(!isActive && {
        color: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
      }),
      backgroundColor: 'transparent',
    },

    '&:active, &:focus': {
      fontWeight: 500,
      color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],
      backgroundColor: 'transparent',
    },
  },

  [theme.breakpoints.up('desktop_1280')]: {
    height: 24,
    fontSize: 16,
    lineHeight: '24px',
  },
}));

import { styled } from '@mui/material';
import React from 'react';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';
import NumberWithSignCardSkeleton from '../NumberWithSignCard/NumberWithSignCardSkeleton';

const FundChangeCardSkeleton: React.FC = () => (
  <Card>
    <TitleContainer>
      <NetChangeContainer>
        <NetChangeValue />
        <NetChangeCurrency />
      </NetChangeContainer>
      <NetChangeCaption />
    </TitleContainer>

    <ValuesContainer>
      <NumberWithSignCardSkeleton sign="positive" />
      <NumberWithSignCardSkeleton sign="negative" />
    </ValuesContainer>
  </Card>
);

export default FundChangeCardSkeleton;

const Card = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row-reverse',
  width: '100%',
  background: theme.palette.isLight ? '#fff' : '#10191F',
  borderRadius: 6,
  boxShadow: theme.palette.isLight
    ? '0px 4px 6px 0px rgba(195, 195, 195, 0.25)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
  padding: '14px 16px 16px',
  gap: 37,

  [theme.breakpoints.up('table_834')]: {
    flexDirection: 'column',
    padding: 8,
    gap: 12.75,
    minWidth: 390,
    boxShadow: theme.palette.isLight
      ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
      : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
  },

  [theme.breakpoints.up('desktop_1194')]: {
    minWidth: 579,
    padding: 16,
    gap: 20.75,
  },
}));

const TitleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8.75,

  [theme.breakpoints.up('table_834')]: {
    gap: 5,
  },
}));

const NetChangeContainer = styled('div')({
  display: 'flex',
  gap: 4,
});

const NetChangeValue = styled(BaseSkeleton)(({ theme }) => ({
  width: 58,
  height: 12.25,

  [theme.breakpoints.up('table_834')]: {
    width: 66,
    height: 14,
  },
}));

const NetChangeCurrency = styled(BaseSkeleton)(({ theme }) => ({
  width: 25,
  height: 12.25,

  [theme.breakpoints.up('table_834')]: {
    width: 29,
    height: 14,
  },
}));

const NetChangeCaption = styled(BaseSkeleton)(({ theme }) => ({
  width: 68,
  height: 10.5,

  [theme.breakpoints.up('table_834')]: {
    width: 79,
    height: 12.25,
  },
}));

const ValuesContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 8,

  [theme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
  },

  [theme.breakpoints.up('desktop_1194')]: {
    gap: 24,
  },
}));

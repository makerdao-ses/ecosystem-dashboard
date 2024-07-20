import { styled } from '@mui/material';

import BlueLinesIcon from 'public/assets/svg/blue_lines.svg';

import Card from '@/components/Card/Card';

import { financesBarChartCardData } from '@/views/Home/staticData';
import useFinancesBarChartCard from './useFinancesBarChartCard';

import type { FC } from 'react';

const FinancesBarChartCard: FC = () => {
  useFinancesBarChartCard();

  return (
    <Container>
      <Title>{financesBarChartCardData.title}</Title>
      <FinancesBarChartContainer>
        <AnnualProfit>
          <Text>{financesBarChartCardData.annualProfitDivAsteriskText}</Text>
          <AnnualProfitLegend>
            <BlueLinesIcon />
            <Text>{financesBarChartCardData.annualProfitDivTitle}</Text>
          </AnnualProfitLegend>
        </AnnualProfit>
      </FinancesBarChartContainer>
    </Container>
  );
};

export default FinancesBarChartCard;

const Container = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: '8px 8px 16px',

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

const Title = styled('h3')(({ theme }) => ({
  margin: 0,
  fontWeight: 700,
  fontSize: 20,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('tablet_768')]: {
    fontWeight: 800,
    fontSize: 16,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontWeight: 700,
    fontSize: 20,
  },
}));

const FinancesBarChartContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginTop: 16,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 8,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 24,
  },
}));

const AnnualProfit = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',

  [theme.breakpoints.up('tablet_768')]: {
    paddingLeft: 49,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    paddingLeft: 18,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    paddingLeft: 49,
  },
}));

const Text = styled('span')(({ theme }) => ({
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.colors.slate[200],
}));

const AnnualProfitLegend = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}));

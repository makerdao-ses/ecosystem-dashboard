import { styled, useMediaQuery } from '@mui/material';
import { threeDigitsPrecisionHumanization, usLocalizedNumber } from '@ses/core/utils/humanization';
import { colorPalette } from '@ses/styles/theme/colorPalette';
import React from 'react';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import { siteRoutes } from '@/config/routes';
import type { Theme } from '@mui/material';

type BarVariant = 'blue' | 'gray';

export interface TotalBudgetContentProps {
  totalBudgetCap: number;
  averageCapUtilization: number;
  endgameBudgets: number;
  legacyBudgets: number;
}

const TotalBudgetContent: React.FC<TotalBudgetContentProps> = ({
  totalBudgetCap,
  averageCapUtilization,
  endgameBudgets,
  legacyBudgets,
}) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const endgameHumanized = threeDigitsPrecisionHumanization(endgameBudgets);
  const legacyHumanized = threeDigitsPrecisionHumanization(legacyBudgets);

  return (
    <Content>
      <BudgetCapNumber>
        {usLocalizedNumber(totalBudgetCap)}
        <Currency>DAI</Currency>
      </BudgetCapNumber>
      <AvgBudgetCapUtilization>
        Avg Budget Cap Utilization: <AvgPercentage>{usLocalizedNumber(averageCapUtilization, 1)}%</AvgPercentage>
      </AvgBudgetCapUtilization>

      <Divider />

      <Legend>
        <LegendItem variant="gray">Legacy Budget</LegendItem>
        <LegendItem variant="blue">Endgame Budget</LegendItem>
      </Legend>
      <Bar defaultVariant="blue">
        <BarContent variant="gray" width={`${(endgameBudgets * 100) / totalBudgetCap}%`} />
      </Bar>
      <Values>
        <Value>
          {legacyHumanized.value}
          {legacyHumanized.suffix} ({usLocalizedNumber((legacyBudgets * 100) / totalBudgetCap, 1)}%)
        </Value>
        <Value>
          {endgameHumanized.value}
          {endgameHumanized.suffix} ({usLocalizedNumber((endgameBudgets * 100) / totalBudgetCap, 1)}%)
        </Value>
      </Values>
      {!isMobile && (
        <ButtonContainer>
          <InternalLinkButton href={siteRoutes.home} buttonType="primary" label="Legacy Expenses" />
        </ButtonContainer>
      )}
    </Content>
  );
};

export default TotalBudgetContent;

const getColor = (variant: BarVariant, isLight: boolean): string => {
  if (variant === 'gray') {
    return isLight ? colorPalette.charcoal[200] : 'red';
  } else {
    return isLight ? colorPalette.blue[700] : 'red';
  }
};

const Content = styled('div')(({ theme }) => ({
  padding: 8,
  borderRadius: 12,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : 'red',
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : 'red'}`,

  [theme.breakpoints.up('tablet_768')]: {
    width: '100%',
    padding: '16px 15px 8px',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 440,
    width: 440,
    padding: '16px 23px',
  },
}));

const BudgetCapNumber = styled('div')(({ theme }) => ({
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 700,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : 'red',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 24,
    lineHeight: '29px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 32,
    lineHeight: '38.4px',
  },
}));

const Currency = styled('span')(({ theme }) => ({
  fontSize: 20,
  fontWeight: 700,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : 'red',
  marginLeft: 6,

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 24,
    lineHeight: '29px',
  },
}));

const AvgBudgetCapUtilization = styled('div')(({ theme }) => ({
  fontSize: 12,
  lineHeight: '18px',
  fontWeight: 500,
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : 'red',
  textAlign: 'center',
  marginTop: 4,

  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 8,
  },
}));

const AvgPercentage = styled('span')({
  marginLeft: 3,
});

const Divider = styled('div')(({ theme }) => ({
  height: 1,
  width: 'calc(100% - 17px)',
  background: theme.palette.isLight ? '#D4D9E1' : 'red',
  margin: '18px 8.5px',

  [theme.breakpoints.up('tablet_768')]: {
    margin: '6px 24px 8px',
    width: 215,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    margin: '23px auto 24px',
    width: 294,
  },
}));

const Legend = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

const LegendItem = styled('div')<{ variant: BarVariant }>(({ theme, variant }) => ({
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : 'red',
  position: 'relative',
  paddingLeft: 12,

  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    left: 0,
    top: 4,
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: getColor(variant, theme.palette.isLight),
  },
}));

const Bar = styled('div')<{ defaultVariant: BarVariant }>(({ theme, defaultVariant }) => ({
  width: '100%',
  height: 16,
  borderRadius: 6,
  position: 'relative',
  overflow: 'hidden',
  background: getColor(defaultVariant, theme.palette.isLight),
  margin: '4px 0',

  [theme.breakpoints.up('desktop_1024')]: {
    margin: '8px 0',
  },
}));

const BarContent = styled('div')<{ variant: BarVariant; width: string }>(({ theme, variant, width }) => ({
  width,
  height: '100%',
  position: 'absolute',
  left: 0,
  top: 0,
  background: getColor(variant, theme.palette.isLight),
}));

const Values = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

const Value = styled('div')(({ theme }) => ({
  fontSize: 14,
  lineHeight: '17px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : 'red',
}));

const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 21,

  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 32,
  },
}));

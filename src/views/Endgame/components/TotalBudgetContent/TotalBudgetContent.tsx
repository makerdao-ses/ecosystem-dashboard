import styled from '@emotion/styled';
import { LinkButton } from '@ses/components/LinkButton/LinkButton';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ButtonType } from '@ses/core/enums/buttonTypeEnum';
import { threeDigitsPrecisionHumanization, usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

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
  const { isLight } = useThemeContext();
  const endgameHumanized = threeDigitsPrecisionHumanization(endgameBudgets);
  const legacyHumanized = threeDigitsPrecisionHumanization(legacyBudgets);

  return (
    <Content>
      <BudgetCapNumber isLight={isLight}>
        {usLocalizedNumber(totalBudgetCap)}
        <Currency isLight={isLight}>DAI</Currency>
      </BudgetCapNumber>
      <AvgBudgetCapUtilization isLight={isLight}>
        Avg Budget Cap Utilization: <AvgPercentage>{usLocalizedNumber(averageCapUtilization, 1)}%</AvgPercentage>
      </AvgBudgetCapUtilization>

      <Divider isLight={isLight} />

      <Legend>
        <LegendItem isLight={isLight} variant="gray">
          Endgame Budget
        </LegendItem>
        <LegendItem isLight={isLight} variant="blue">
          Legacy Budget
        </LegendItem>
      </Legend>
      <Bar defaultVariant="blue" isLight={isLight}>
        <BarContent isLight={isLight} variant="gray" width={`${(endgameBudgets * 100) / totalBudgetCap}%`} />
      </Bar>
      <Values>
        <Value isLight={isLight}>
          {endgameHumanized.value}
          {endgameHumanized.suffix} ({usLocalizedNumber((endgameBudgets * 100) / totalBudgetCap, 1)}%)
        </Value>
        <Value isLight={isLight}>
          {legacyHumanized.value}
          {legacyHumanized.suffix} ({usLocalizedNumber((legacyBudgets * 100) / totalBudgetCap, 1)}%)
        </Value>
      </Values>

      <FinancesLink href={siteRoutes.home} buttonType={ButtonType.Primary} label="Legacy Expenses (Back to Finances)" />
    </Content>
  );
};

export default TotalBudgetContent;

const getColor = (variant: BarVariant, isLight: boolean): string => {
  if (variant === 'gray') {
    return isLight ? '#D2D4EF' : '#D2D4EF';
  } else {
    return isLight ? '#447AFB' : '#447AFB';
  }
};

const Content = styled.div({
  padding: '0px 15px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: 0,
    width: 272,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    minWidth: 350,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    minWidth: 387,
  },
});

const BudgetCapNumber = styled.div<WithIsLight>(({ isLight }) => ({
  textAlign: 'center',
  fontSize: 30,
  fontWeight: 500,
  lineHeight: 'normal',
  letterSpacing: 0.4,
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    fontSize: 20,
    fontWeight: 600,
  },
}));

const Currency = styled.span<WithIsLight>(({ isLight }) => ({
  fontSize: 24,
  fontWeight: 600,
  lineHeight: 'normal',
  color: isLight ? '#9FAFB9' : '#708390',
  marginLeft: 6,

  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    fontSize: 16,
  },
}));

const AvgBudgetCapUtilization = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  lineHeight: 'normal',
  color: isLight ? '#708390' : '#708390',
  textAlign: 'center',
  marginTop: 8,
}));

const AvgPercentage = styled.span({
  marginLeft: 3,
});

const Divider = styled.div<WithIsLight>(({ isLight }) => ({
  height: 1,
  width: 'calc(100% - 17px)',
  background: isLight ? '#D4D9E1' : '#31424E',
  margin: '24px 8.5px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 'calc(100% - 10px)',
    margin: '23px 5px 24px',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 'calc(100% - 94px)',
    margin: '23px 47px 24px',
  },
}));

const Legend = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
});

const LegendItem = styled.div<WithIsLight & { variant: BarVariant }>(({ isLight, variant }) => ({
  fontSize: 11,
  lineHeight: 'normal',
  color: isLight ? '#708390' : '#708390',
  position: 'relative',
  paddingLeft: 12,

  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    left: 0,
    top: 2,
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: getColor(variant, isLight),
  },
}));

const Bar = styled.div<WithIsLight & { defaultVariant: BarVariant }>(({ isLight, defaultVariant }) => ({
  width: '100%',
  height: 16,
  borderRadius: 6,
  position: 'relative',
  overflow: 'hidden',
  background: getColor(defaultVariant, isLight),
  margin: '14px 0 16px 0',

  [lightTheme.breakpoints.up('tablet_768')]: {
    margin: '14px 0 17px 0',
  },
}));

const BarContent = styled.div<WithIsLight & { variant: BarVariant; width: string }>(({ isLight, variant, width }) => ({
  width,
  height: '100%',
  position: 'absolute',
  left: 0,
  top: 0,
  background: getColor(variant, isLight),
}));

const Values = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
});

const Value = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  lineHeight: 'normal',
  color: isLight ? '#231536' : '#D2D4EF',
}));

const FinancesLink = styled(LinkButton)({
  display: 'flex',
  width: '100%',
  padding: '7px 23px',
  marginTop: 32,
});

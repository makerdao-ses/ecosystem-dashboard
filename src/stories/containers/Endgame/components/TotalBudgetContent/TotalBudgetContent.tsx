import styled from '@emotion/styled';
import { LinkButton } from '@ses/components/LinkButton/LinkButton';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ButtonType } from '@ses/core/enums/buttonTypeEnum';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

type BarVariant = 'blue' | 'gray';

const TotalBudgetContent: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <Content>
      <BudgetCapNumber isLight={isLight}>
        {usLocalizedNumber(51932625)}
        <Currency isLight={isLight}>DAI</Currency>
      </BudgetCapNumber>
      <AvgBudgetCapUtilization isLight={isLight}>
        Avg Budget Cap Utilization: <AvgPercentage>60.1%</AvgPercentage>
      </AvgBudgetCapUtilization>

      <Divider isLight={isLight} />

      <Legend>
        <LegendItem isLight={isLight} variant="gray">
          Endgame Budgets
        </LegendItem>
        <LegendItem isLight={isLight} variant="blue">
          Legacy Budgets
        </LegendItem>
      </Legend>
      <Bar defaultVariant="blue" isLight={isLight}>
        <BarContent isLight={isLight} variant="gray" width="70.2%" />
      </Bar>
      <Values>
        <Value isLight={isLight}>36.4M (70.2%)</Value>
        <Value isLight={isLight}>15.4M (29.8%)</Value>
      </Values>

      <FinancesLink
        href={siteRoutes.home}
        buttonType={ButtonType.Primary}
        label="Legacy Expenses (Return to Finances)"
      />
    </Content>
  );
};

export default TotalBudgetContent;

const getColor = (variant: BarVariant, isLight: boolean): string => {
  if (variant === 'gray') {
    return isLight ? '#D2D4EF' : 'red';
  } else {
    // it is blue
    return isLight ? '#447AFB' : 'red';
  }
};

const Content = styled.div({
  [lightTheme.breakpoints.up('desktop_1194')]: {
    minWidth: 388,
  },
});

const BudgetCapNumber = styled.div<WithIsLight>(({ isLight }) => ({
  textAlign: 'center',
  fontSize: 30,
  fontWeight: 500,
  lineHeight: 'normal',
  letterSpacing: 0.4,
  color: isLight ? '#231536' : 'red',

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    fontSize: 24,
    fontWeight: 600,
  },
}));

const Currency = styled.span<WithIsLight>(({ isLight }) => ({
  fontSize: 24,
  fontWeight: 600,
  lineHeight: 'normal',
  color: isLight ? '#9FAFB9' : 'red',
  marginLeft: 6,

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    fontSize: 20,
  },
}));

const AvgBudgetCapUtilization = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  lineHeight: 'normal',
  color: isLight ? '#708390' : 'red',
  textAlign: 'center',
  marginTop: 8,
}));

const AvgPercentage = styled.span({
  marginLeft: 3,
});

const Divider = styled.div<WithIsLight>(({ isLight }) => ({
  height: 1,
  width: 'calc(100% - 17px)',
  background: isLight ? '#D4D9E1' : 'red',
  margin: '24px 8.5px',

  [lightTheme.breakpoints.up('table_834')]: {
    width: 'calc(100% - 10px)',
    margin: '23px 5px 24px',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
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
  color: isLight ? '#708390' : 'red',
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
  margin: '16px 0',
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
  color: isLight ? '#231536' : 'red',
}));

const FinancesLink = styled(LinkButton)({
  display: 'flex',
  width: '100%',
  padding: '7px 23px',
  marginTop: 32,
});

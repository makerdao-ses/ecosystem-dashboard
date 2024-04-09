import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import HorizontalBudgetBar from '@ses/containers/FinancesOverview/components/HorizontalBudgetBar/HorizontalBudgetBar';

import { useThemeContext } from '@ses/core/context/ThemeContext';
import { threeDigitsPrecisionHumanization } from '@ses/core/utils/humanization';
import { percentageRespectTo } from '@ses/core/utils/math';
import React from 'react';
import lightTheme from 'styles/theme/light';
import type { Theme } from '@mui/material';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

export type QuarterCardProps = {
  paymentsOnChain: number;
  budgetCap: number;
  className?: string;
};

const InformationBudgetCapOverview: React.FC<QuarterCardProps> = ({ paymentsOnChain, budgetCap, className }) => {
  const { isLight } = useThemeContext();
  const isMobileOrTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));

  const humanizedActuals = threeDigitsPrecisionHumanization(paymentsOnChain);
  const humanizedBudgetCap = threeDigitsPrecisionHumanization(budgetCap);
  const percent = threeDigitsPrecisionHumanization(percentageRespectTo(paymentsOnChain, budgetCap)).value;

  return (
    <CardContainer className={className}>
      <Description isLight={isLight}>Budget Utilization</Description>
      <PredictionWrapper>
        <TotalActual isLight={isLight}>
          <PredictionNumber>{humanizedActuals.value}</PredictionNumber>
          <PredictionUnits>
            <PredictionSymbol isLight={isLight}>DAI</PredictionSymbol>
            <NumberSuffix>{humanizedActuals.suffix}</NumberSuffix>
          </PredictionUnits>
        </TotalActual>
        <DividerActualsBudgetCap isLight={isLight} />
        <TotalBudgeCap isLight={isLight}>
          <PredictionNumber>{humanizedBudgetCap.value}</PredictionNumber>
          <PredictionUnits>
            <PredictionSymbol isLight={isLight}>DAI</PredictionSymbol>
            <NumberSuffix>{humanizedBudgetCap.suffix}</NumberSuffix>
          </PredictionUnits>
        </TotalBudgeCap>
      </PredictionWrapper>
      <DividerCardChart isLight={isLight} />
      <Percent isLight={isLight}>{percent}%</Percent>
      <BarWrapper>
        <HorizontalBudgetBarStyled actuals={paymentsOnChain} prediction={0} budgetCap={budgetCap} />
      </BarWrapper>
      <Legend>
        <LegendItem isLight={isLight} dotColor={isLight ? '#2DC1B1' : '#1AAB9B'}>
          <LegendLabel>{isMobileOrTablet ? 'Net Exp On-Chain' : 'Net Expenses On-Chain'}</LegendLabel>
        </LegendItem>
        <LegendItem isLight={isLight} dotColor={'#F75524'}>
          <LegendLabel>Budget Cap</LegendLabel>
        </LegendItem>
      </Legend>
    </CardContainer>
  );
};

export default InformationBudgetCapOverview;

const CardContainer = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  [lightTheme.breakpoints.up('tablet_768')]: {
    paddingTop: 2,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    paddingTop: 0,
  },
});

const PredictionWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'center',
  marginTop: 0,
  marginLeft: -1,

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 0,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: -1,
  },
});

const TotalActual = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  marginLeft: 0,
  color: isLight ? '#231536' : '#EDEFFF',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginLeft: 8,
  },
}));
const TotalBudgeCap = styled(TotalActual)({
  marginLeft: 6,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginLeft: 8,
  },
});

const PredictionNumber = styled.div({
  fontWeight: 600,
  fontSize: 32,
  lineHeight: '39px',
  letterSpacing: '0.4px',
  marginRight: 8,
});

const PredictionUnits = styled.div({
  display: 'flex',
  flexDirection: 'column',
  fontSize: 12,
  fontWeight: 600,
  lineHeight: '15px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
});

const PredictionSymbol = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#9FAFB9' : '#708390',
}));

const NumberSuffix = styled.div({});

const BarWrapper = styled.div({
  marginTop: 8,
  marginBottom: 8,

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 8,
    marginBottom: 8,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginTop: 8,
    marginBottom: 8,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginTop: 16,
    marginBottom: 16,
  },
});

const Legend = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  paddingLeft: 1,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 1,
    marginTop: 1,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 0,
    paddingLeft: 1,
  },
});

const LegendItem = styled.div<WithIsLight & { dotColor: string }>(({ isLight, dotColor }) => ({
  position: 'relative',
  fontSize: 10,
  lineHeight: '12px',
  fontWeight: 500,
  color: isLight ? '#231536' : '#EDEFFF',
  paddingLeft: 8,
  display: 'flex',
  alignItems: 'flex-start ',
  height: 'fit-content',
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
    lineHeight: '17px',
    alignItems: 'center',
    paddingLeft: 10,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    paddingLeft: 8,
  },

  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 'calc(50% - 4px)',
    left: 0,
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: dotColor,

    [lightTheme.breakpoints.up('tablet_768')]: {
      width: 8,
      height: 8,
      top: 'calc(50% - 4px)',
    },
  },
}));

const LegendLabel = styled.div({
  marginLeft: 6,
  fontSize: 14,
  lineHeight: 'normal',
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
    lineHeight: 'normal',
    fontWeight: 400,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '17px',
  },
});

const Description = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  textAlign: 'center',
  marginBottom: 8,
  color: isLight ? '#708390' : '#708390',
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginLeft: 1,
    marginBottom: 6,
    marginTop: 'revert',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginBottom: 8,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginBottom: 6,
  },
}));

const Percent = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 20,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  textAlign: 'center',
  letterSpacing: '0.4px',
  color: isLight ? '#405361' : '#9FAFB9',
}));

const DividerActualsBudgetCap = styled.div<WithIsLight>(({ isLight }) => ({
  border: `2px  solid ${isLight ? '#231536' : '#D2D4EF'}`,
  height: 32,
  marginLeft: 9,
  marginRight: 8,
  lineHeight: 'normal',
  transform: 'rotate3d(1, 1, 1, 30deg)',
}));

const DividerCardChart = styled.div<WithIsLight>(({ isLight }) => ({
  marginTop: 16,
  marginBottom: 16,
  borderBottom: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginTop: 16,
    marginBottom: 16,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginTop: 24,
    marginBottom: 24,
  },
}));

const HorizontalBudgetBarStyled = styled(HorizontalBudgetBar)({
  height: 16,
});

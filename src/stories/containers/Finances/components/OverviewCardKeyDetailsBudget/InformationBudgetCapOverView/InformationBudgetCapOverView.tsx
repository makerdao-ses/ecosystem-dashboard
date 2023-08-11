import styled from '@emotion/styled';
import HorizontalBudgetBar from '@ses/containers/FinancesOverview/components/HorizontalBudgetBar/HorizontalBudgetBar';

import { useThemeContext } from '@ses/core/context/ThemeContext';
import { threeDigitsPrecisionHumanization } from '@ses/core/utils/humanization';
import { percentageRespectTo } from '@ses/core/utils/math';
import React from 'react';
import lightTheme from 'styles/theme/light';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

export type QuarterCardProps = {
  prediction: number;
  actuals: number;
  budgetCap: number;
};

const InformationBudgetCapOverView: React.FC<QuarterCardProps> = ({ prediction, actuals, budgetCap }) => {
  const { isLight } = useThemeContext();

  const humanizedActuals = threeDigitsPrecisionHumanization(actuals);
  const humanizedBudgetCap = threeDigitsPrecisionHumanization(budgetCap);
  const percent = threeDigitsPrecisionHumanization(percentageRespectTo(actuals, budgetCap)).value;

  return (
    <CardContainer>
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
      <Description isLight={isLight}>MakerDAO Total Budget</Description>
      <DividerCardChart isLight={isLight} />
      <Percent isLight={isLight}>{percent}%</Percent>
      <BarWrapper>
        <HorizontalBudgetBar actuals={actuals} prediction={prediction} budgetCap={budgetCap} />
      </BarWrapper>
      <Legend>
        <LegendItem isLight={isLight} dotColor={isLight ? '#2DC1B1' : '#1AAB9B'}>
          <LegendLabel>Actuals</LegendLabel>
        </LegendItem>
        <LegendItem isLight={isLight} dotColor={'#F75524'}>
          <LegendLabel>Budget Cap</LegendLabel>
        </LegendItem>
      </Legend>
    </CardContainer>
  );
};

export default InformationBudgetCapOverView;

const CardContainer = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const PredictionWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'center',
  marginTop: -1,
  marginLeft: -1,
});

const TotalActual = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  marginLeft: 8,
  color: isLight ? '#231536' : '#EDEFFF',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
}));
const TotalBudgeCap = styled(TotalActual)({});

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

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 16,
    marginBottom: 16,
  },
});

const Legend = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 1,
  paddingLeft: 1,
});

const LegendItem = styled.div<WithIsLight & { dotColor: string }>(({ isLight, dotColor }) => ({
  position: 'relative',
  fontSize: 10,
  lineHeight: '12px',
  fontWeight: 500,
  color: isLight ? '#231536' : '#EDEFFF',
  paddingLeft: 6,
  display: 'flex',
  alignItems: 'flex-start ',
  height: 'fit-content',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 14,
    lineHeight: '17px',
    alignItems: 'center',
    paddingLeft: 10,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    paddingLeft: 8,
  },

  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 'calc(50% - 0.5px)',
    left: 0,
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: dotColor,

    [lightTheme.breakpoints.up('table_834')]: {
      width: 8,
      height: 8,
      top: 'calc(50% - 4px)',
    },
  },
}));

const LegendLabel = styled.div({
  marginLeft: 3.1,

  [lightTheme.breakpoints.up('table_834')]: {
    marginLeft: 4,
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '15px',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginLeft: 6,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '17px',
  },
});

const Description = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  textAlign: 'center',
  marginTop: 6,
  color: isLight ? '#708390' : 'red',
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 6,
    textAlign: 'center',
    marginLeft: 1,
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
  color: isLight ? '#405361' : 'red',
}));

const DividerActualsBudgetCap = styled.div<WithIsLight>(({ isLight }) => ({
  border: isLight ? '2px  solid #231536' : 'red',
  height: 32,
  marginLeft: 9,
  marginRight: 8,
  lineHeight: 'normal',
  transform: 'rotate3d(1, 1, 1, 30deg)',
}));

const DividerCardChart = styled.div<WithIsLight>(({ isLight }) => ({
  borderBottom: isLight ? '1px solid #D4D9E1' : 'red',
  marginTop: 24,
  marginBottom: 24,
}));

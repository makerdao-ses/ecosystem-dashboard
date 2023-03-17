import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { threeDigitsPrecisionHumanization } from '@ses/core/utils/humanization';
import React, { useMemo } from 'react';
import lightTheme from 'styles/theme/light';
import { formatQuarter } from '../../utils/quarters';
import HorizontalBudgetBar from '../HorizontalBudgetBar/HorizontalBudgetBar';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

export type QuarterCardProps = {
  period: string;
  prediction: number;
  actuals: number;
  budgetCap: number;
};

const QuarterCard: React.FC<QuarterCardProps> = ({ period, prediction, actuals, budgetCap }) => {
  const { isLight } = useThemeContext();
  const formattedPeriod = useMemo(() => formatQuarter(period), [period]);

  const humanizedPrediction = threeDigitsPrecisionHumanization(prediction);
  const humanizedActuals = threeDigitsPrecisionHumanization(actuals);
  const humanizedBudgetCap = threeDigitsPrecisionHumanization(budgetCap);

  return (
    <CardContainer>
      <Period isLight={isLight}>{formattedPeriod}</Period>
      <Card isLight={isLight}>
        <PredictionWrapper>
          <Prediction isLight={isLight}>
            <PredictionNumber>{humanizedPrediction.value}</PredictionNumber>
            <PredictionUnits>
              <PredictionSymbol isLight={isLight}>DAI</PredictionSymbol>
              <NumberSuffix>{humanizedPrediction.suffix}</NumberSuffix>
            </PredictionUnits>
          </Prediction>
        </PredictionWrapper>
        <BarWrapper>
          <HorizontalBudgetBar actuals={actuals} prediction={prediction} budgetCap={budgetCap} />
        </BarWrapper>
        <Legend>
          <LegendItem isLight={isLight} dotColor={isLight ? '#2DC1B1' : '#1AAB9B'}>
            <LegendNumberWrapper>
              <LegendNumber>{humanizedActuals.value}</LegendNumber>
              <LegendNumberSuffix>{humanizedActuals.suffix}</LegendNumberSuffix>
            </LegendNumberWrapper>
            <LegendLabel>Actuals</LegendLabel>
          </LegendItem>
          <LegendItem isLight={isLight} dotColor={'#F75524'}>
            <LegendNumberWrapper>
              <LegendNumber>{humanizedBudgetCap.value}</LegendNumber>
              <LegendNumberSuffix>{humanizedBudgetCap.suffix}</LegendNumberSuffix>
            </LegendNumberWrapper>
            <LegendLabel>Cap</LegendLabel>
          </LegendItem>
        </Legend>
      </Card>
    </CardContainer>
  );
};

export default QuarterCard;

const CardContainer = styled.div({
  width: '100%',
});

const Period = styled.div<WithIsLight>(({ isLight }) => ({
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '15px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: isLight ? '#434358' : '#708390',
  marginBottom: 8,
}));

const Card = styled.div<WithIsLight>(({ isLight }) => ({
  padding: '16px 8px',
  background: isLight ? '#FFFFFF' : '#1E2C37',
  borderRadius: 6,
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
  overflow: 'hidden',

  [lightTheme.breakpoints.up('table_834')]: {
    padding: 16,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '16px 24px',
  },
}));

const PredictionWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const Prediction = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  marginLeft: 'auto',
  marginRight: 'auto',
  color: isLight ? '#231536' : '#EDEFFF',
}));

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
});

const LegendItem = styled.div<WithIsLight & { dotColor: string }>(({ isLight, dotColor }) => ({
  position: 'relative',
  fontSize: 10,
  lineHeight: '12px',
  fontWeight: 500,
  color: isLight ? '#231536' : '#EDEFFF',
  paddingRight: 6,
  display: 'flex',
  alignItems: 'flex-start ',
  height: 'fit-content',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 14,
    lineHeight: '17px',
    alignItems: 'center',
    paddingRight: 10,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    paddingRight: 12,
  },

  '&::after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 'calc(50% - 2px)',
    right: 0,
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

const LegendNumberWrapper = styled.div({
  display: 'flex',
  alignItems: 'baseline',
});

const LegendNumber = styled.div({
  fontWeight: 700,
  fontSize: 10,
  lineHeight: '12px',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 14,
    lineHeight: '17px',
    letterSpacing: '0.3px',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
    lineHeight: '19px',
    letterSpacing: '0.3px',
  },
});

const LegendNumberSuffix = styled.div({
  fontSize: 7,
  lineHeight: '8px',
  marginLeft: 1.1,

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 12,
    fontWeight: 600,
    lineHeight: '15px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
});

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

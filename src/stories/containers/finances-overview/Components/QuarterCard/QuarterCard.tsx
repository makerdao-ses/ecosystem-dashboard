import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { threeDigitsPrecisionHumanization } from '@ses/core/utils/humanization';
import React, { useMemo } from 'react';
import HorizontalBudgetBar from '../HorizontalBudgetBar/HorizontalBudgetBar';
import type { WithIsLight } from '@ses/core/utils/types-helpers';

export type QuarterCardProps = {
  period: string;
  prediction: number;
  actuals: number;
  budgetCap: number;
};

const QuarterCard: React.FC<QuarterCardProps> = ({ period, prediction, actuals, budgetCap }) => {
  const { isLight } = useThemeContext();
  const formattedPeriod = useMemo(() => {
    const [year, quarter] = period.split('-');
    return `${quarter} ${year}`;
  }, [period]);

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
              <NumberSize>{humanizedPrediction.suffix}</NumberSize>
            </PredictionUnits>
          </Prediction>
        </PredictionWrapper>
        <BarWrapper>
          <HorizontalBudgetBar actuals={actuals} prediction={prediction} budgetCap={budgetCap} />
        </BarWrapper>
        <Legend>
          <LegendItem isLight={isLight} dotColor={isLight ? '#2DC1B1' : '#1AAB9B'}>
            <LegendNumber>{humanizedActuals.value}</LegendNumber>
            <LegendNumberSize>{humanizedActuals.suffix}</LegendNumberSize>
            <LegendLabel>Actuals</LegendLabel>
          </LegendItem>
          <LegendItem isLight={isLight} dotColor={'#F75524'}>
            <LegendNumber>{humanizedBudgetCap.value}</LegendNumber>
            <LegendNumberSize>{humanizedBudgetCap.suffix}</LegendNumberSize>
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

const NumberSize = styled.div({});

const BarWrapper = styled.div({
  marginTop: 8,
  marginBottom: 8,
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
  alignItems: 'baseline',
  height: 'fit-content',

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
  },
}));

const LegendNumber = styled.div({
  fontWeight: 700,
});

const LegendNumberSize = styled.div({
  fontSize: 7,
  lineHeight: '8px',
  marginLeft: 1.1,
});

const LegendLabel = styled.div({
  marginLeft: 3.1,
});

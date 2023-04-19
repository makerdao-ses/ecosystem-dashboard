import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { threeDigitsPrecisionHumanization } from '@ses/core/utils/humanization';
import { percentageRespectTo } from '@ses/core/utils/math';
import React from 'react';
import GenericDelegateCard from './GenericDelegateCard';
import LegendItem from './LegendItem';
import { RelativeDelegateBar } from './RelativeDelegateBar';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  otherExpenses: number;
  delegatesExpenses: number;
  amountDelegates: number;
}

const VisualizationCard: React.FC<Props> = ({ delegatesExpenses, otherExpenses, amountDelegates }) => {
  const humanizedDelegates = threeDigitsPrecisionHumanization(delegatesExpenses);
  const humanizedTotalDelegates = threeDigitsPrecisionHumanization(delegatesExpenses + otherExpenses);
  const { isLight } = useThemeContext();

  const percent = percentageRespectTo(delegatesExpenses, delegatesExpenses + otherExpenses);

  return (
    <ExtendedKeyStatsCard>
      <Legend>
        <LegendItem color={isLight ? '#ECF1F3' : '#10191F'} description="Other Expenses" />
        <ExtendedLegendItem color="#447AFB" description={`Recognized Delegates (${amountDelegates})`} />
      </Legend>
      <ContainerBar>
        <BarPercent>
          <RelativeDelegateBar otherExpenses={otherExpenses} recognizedDelegates={delegatesExpenses} />
        </BarPercent>
      </ContainerBar>
      <BarDescription>
        <Annual isLight={isLight}>{`${percent.toFixed(2)} %`}</Annual>
        <ContainerDescription>
          <LegendNumberWrapper>
            <LegendNumber isLight={isLight}>{humanizedDelegates.value}</LegendNumber>
            <LegendNumberSuffix isLight={isLight}>{humanizedDelegates.suffix}</LegendNumberSuffix>
          </LegendNumberWrapper>
          <Divider>/</Divider>
          <LegendNumberWrapper>
            <LegendNumber isLight={isLight}>{humanizedTotalDelegates.value}</LegendNumber>
            <LegendNumberSuffix isLight={isLight}>{humanizedTotalDelegates.suffix}</LegendNumberSuffix>
          </LegendNumberWrapper>
          <Coin isLight={isLight}>DAI</Coin>
        </ContainerDescription>
        <Description>Percentage of Total DAO Expense Nov 2021 - Jun 2023 </Description>
      </BarDescription>
    </ExtendedKeyStatsCard>
  );
};

export default VisualizationCard;

const ExtendedKeyStatsCard = styled(GenericDelegateCard)({
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  flex: 1,
});

const Legend = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});
const ContainerBar = styled.div({
  display: 'flex',
  flexDirection: 'column',
});
const BarPercent = styled.div({
  width: 279,
  height: 24,
});
const BarDescription = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Annual = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.3px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#243465' : '#EDEFFF',
  marginBottom: 3,
  marginTop: 1,
  textTransform: 'uppercase',
}));

const LegendNumberWrapper = styled.div({
  display: 'flex',
  alignItems: 'baseline',
});

const LegendNumber = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '17px',
  letterSpacing: '0.3px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#231536' : '#D2D4EF',
}));

const LegendNumberSuffix = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '17px',
  letterSpacing: '0.3px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#231536' : '#D2D4EF',
}));

const Divider = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontsize: '14px',
  lineHeight: '17px',
  letterSpacing: '0.3px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: '#9FAFB9',
  marginLeft: 4,
  marginRight: 4,
});

const Coin = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '17px',
  letterSpacing: '0.3px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#9FAFB9' : '#708390',
  marginLeft: 6,
}));

const Description = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '13px',
  color: '#708390',
  height: 26,
  textAlign: 'center',
  width: 179,
  marginLeft: -2,
});

const ContainerDescription = styled.div({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '-1px',
  marginBottom: 4,
});

const ExtendedLegendItem = styled(LegendItem)({
  marginRight: 1,
});

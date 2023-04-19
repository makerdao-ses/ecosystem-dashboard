import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { threeDigitsPrecisionHumanization } from '@ses/core/utils/humanization';
import { percentageRespectTo } from '@ses/core/utils/math';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import DoughnutChart from './DoughnutChart';
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
      <ContainerChart>
        <Legend>
          <LegendItemOtherExpenses color={isLight ? '#D2D4EF' : '#48495F'} description="Other Expenses" />
          <ExtendedLegendItem color="#447AFB" description={`Recognized Delegates (${amountDelegates})`} />
        </Legend>
        <ContainerBar>
          <BarPercent>
            <RelativeDelegateBar otherExpenses={otherExpenses} recognizedDelegates={delegatesExpenses} />
          </BarPercent>
        </ContainerBar>
        <DoughnutChartContainer>
          <DoughnutChart delegatesExpenses={delegatesExpenses} otherExpenses={otherExpenses} />
        </DoughnutChartContainer>
      </ContainerChart>
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
  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row-reverse',
  },
});

const Legend = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 16,
  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 16,
    gap: 16,
    marginTop: 18,
  },
});
const ContainerBar = styled.div({
  display: 'flex',
  flexDirection: 'column',
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
});
const BarPercent = styled.div({
  width: 279,
  height: 24,
});
const BarDescription = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [lightTheme.breakpoints.up('table_834')]: {
    flex: 1,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    flex: 1,
  },
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
  [lightTheme.breakpoints.up('table_834')]: {
    fontWeight: 500,
    fontSize: '30px',
    lineHeight: '36px',
    marginBottom: 8,
    marginTop: 6.5,
    paddingLeft: 45,
  },
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
  [lightTheme.breakpoints.up('table_834')]: {
    fontWeight: 400,
    fontSize: '24px',
    lineHeight: '29px',
  },
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
  [lightTheme.breakpoints.up('table_834')]: {
    fontWeight: 400,
    fontSize: '24px',
    lineHeight: '29px',
  },
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
  [lightTheme.breakpoints.up('table_834')]: {
    fontsize: '24px',
    fontWeight: 400,
    lineHeight: '30px',
  },
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
  [lightTheme.breakpoints.up('table_834')]: {
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
  },
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
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: '14px',
    lineHeight: '17px',
    height: 34,
    width: 229,
    marginBottom: 6.5,
    marginLeft: 38,
  },
});

const ContainerDescription = styled.div({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '-1px',
  marginBottom: 4,
  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: 8,
    paddingLeft: 30,
  },
});

const ExtendedLegendItem = styled(LegendItem)({
  marginRight: 1,
});

const LegendItemOtherExpenses = styled(LegendItem)({
  '& :first-child': {
    marginTop: -2,
  },
});

const ContainerChart = styled.div({
  [lightTheme.breakpoints.up('table_834')]: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
});

const DoughnutChartContainer = styled.div({
  display: 'none',
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 128,
    height: 128,
    marginBottom: 1,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 128,
    height: 128,
  },
});

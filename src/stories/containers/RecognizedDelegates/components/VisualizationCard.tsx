import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { threeDigitsPrecisionHumanization } from '@ses/core/utils/humanization';
import { percentageRespectTo } from '@ses/core/utils/math';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import DoughnutChart from './DoughnutChart';
import GenericDelegateCard from './GenericDelegateCard';
import LegendItem from './LegendItem';
import { RelativeDelegateBar } from './RelativeDelegateBar';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  otherExpenses: number;
  delegatesExpenses: number;
  totalDelegates: number;
}

const VisualizationCard: React.FC<Props> = ({ delegatesExpenses, otherExpenses, totalDelegates }) => {
  const humanizedDelegates = threeDigitsPrecisionHumanization(delegatesExpenses);
  const humanizedTotalDelegates = threeDigitsPrecisionHumanization(delegatesExpenses + otherExpenses);
  const { isLight } = useThemeContext();

  const percent = percentageRespectTo(delegatesExpenses, delegatesExpenses + otherExpenses);

  return (
    <ExtendedKeyStatsCard>
      <ContainerChart>
        <Legend>
          <LegendItemOtherExpenses color={'#D2D4EF'} description="Other Expenses" />
          <ExtendedLegendItem color="#447AFB" description={`Recognized Delegates (${totalDelegates})`} />
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
        <Annual isLight={isLight}>{`${percent.toFixed(2)}`}%</Annual>
        <ContainerDescription>
          <LegendNumberWrapper>
            <LegendNumber isLight={isLight}>{humanizedDelegates.value}</LegendNumber>
            <LegendNumberSuffix isLight={isLight}>{humanizedDelegates.suffix}</LegendNumberSuffix>
          </LegendNumberWrapper>
          <Divider />
          <LegendNumberWrapper>
            <LegendNumber isLight={isLight}>{humanizedTotalDelegates.value}</LegendNumber>
            <LegendNumberSuffix isLight={isLight}>{humanizedTotalDelegates.suffix}</LegendNumberSuffix>
          </LegendNumberWrapper>
          <Coin isLight={isLight}>DAI</Coin>
        </ContainerDescription>
        <Description>Percentage of Total DAO Expense Nov 2021 - Mar 2023 </Description>
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
  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '16px 24px',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    gap: 24,
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
    flex: 'none',
    minWidth: 227,
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
    marginTop: 7,
    paddingLeft: 41,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    letterSpacing: '0.4px',
    marginBottom: 14.5,
    marginTop: 0,
    paddingLeft: 0,
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
    color: isLight ? '#231536' : '#EDEFFF',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    letterSpacing: '0px',
    fontFeatureSettings: 'revert',
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
    color: isLight ? '#231536' : '#EDEFFF',
  },
}));

const Divider = styled.div({
  display: 'flex',
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

  height: 13,
  alignItems: 'baseline',
  border: '0.5px solid',
  marginTop: 3,

  transform: 'rotate(15deg)',
  [lightTheme.breakpoints.up('table_834')]: {
    fontsize: '24px',
    marginTop: 4,
    height: 22,
    marginLeft: 9,
    marginRight: 6,
    fontWeight: 400,
    lineHeight: '30px',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    lineHeight: '29px',
    marginLeft: 9,
    marginRight: 9,
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
  marginLeft: 7,
  [lightTheme.breakpoints.up('table_834')]: {
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginLeft: 4,
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
  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 227,
    marginBottom: 0,
    marginLeft: -2,
  },
});

const ContainerDescription = styled.div({
  display: 'flex',
  flexDirection: 'row',
  marginTop: -1,
  marginBottom: 4,
  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: 8,
    paddingLeft: 30,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    paddingLeft: 0,
    marginTop: 0,
    marginLeft: 0,
    marginBottom: 14.5,
  },
});

const ExtendedLegendItem = styled(LegendItem)({
  marginRight: 1,
});

const LegendItemOtherExpenses = styled(LegendItem)({
  '& :first-of-type': {
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
  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 247,
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

import React from 'react';
import styled from '@emotion/styled';
import { CustomBarChart, CustomChartItem } from '../custom-bar-chart/custom-bar-chart';
import { CustomPopover } from '../custom-popover/custom-popover';

interface CutableColumnExpendituresProps {
  value: number,
  percent: number,
  items: Array<CustomChartItem>,
  budgetCap: number
}

export const CutableColumnExpenditures = (props: CutableColumnExpendituresProps) => {
  return <Container>
    <Data>
      <Title>Last 3 months</Title>
      <CustomPopover
        id={'mouse-over-popover-total'}
        title={'Actual Expenditure'}>
        <Value>
          {props.value.toLocaleString()}
        </Value>
    </CustomPopover>
    </Data>
    <CustomBarChart items={props.items} maxValue={props.budgetCap}/>
    <CustomPopover
      css={{ alignSelf: 'center' }}
      id={'mouse-over-popover-percent'}
      title={
        <PercentExplanation>
          <Fraction>
            <Actual>
              Actual
            </Actual>
            <BudgetCap>
              Budget Cap
            </BudgetCap>
          </Fraction>
          <div>
            over the last 3 months
          </div>
        </PercentExplanation>
      }>
      <Value>
        {props.percent.toString()}%
      </Value>
    </CustomPopover>
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  alignItems: 'stretch',
  fontFamily: 'Inter, sans-serif',
  cursor: 'pointer',
});

const Data = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
});

export const Title = styled.div({
  fontSize: '12px',
  fontWeight: 400,
});

export const Value = styled.div({
  display: 'flex',
  alignItems: 'flex-end',
  fontSize: '20px',
  fontWeight: 400,
  paddingBottom: '5px',
});

const PercentExplanation = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const Fraction = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginRight: '14px'
});

const Actual = styled.div({
  padding: '4px',
  borderBottom: '1px solid black',
  textAlign: 'center'
});

const BudgetCap = styled.div({
  padding: '4px',
  textAlign: 'center'
});

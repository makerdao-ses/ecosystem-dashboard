import React from 'react';
import styled from '@emotion/styled';
import { CustomBarChart } from '../custom-bar-chart/custom-bar-chart';
import { CustomPopover } from '../custom-popover/custom-popover';
import { Typography } from '@mui/material';
import { CustomChartItemModel } from '../../../core/models/custom-chart-item.model';

interface CuTableColumnExpendituresProps {
  value: number,
  percent?: number | null,
  items: Array<CustomChartItemModel>,
  budgetCaps: number[]
}

export const CuTableColumnExpenditures = (props: CuTableColumnExpendituresProps) => {
  return <Wrapper>
    <Container>
      <Data>
        <Title>Last 3 Months</Title>
        <CustomPopover
          id={'mouse-over-popover-total'}
          title={'Actual Expenditure'}>
          <Value>
            {props.value.toLocaleString()}
          </Value>
        </CustomPopover>
      </Data>
      <CustomBarChart items={props.items} maxValues={props.budgetCaps} />
      <ValueWrapper>
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
          <Percent>
            {props.percent?.toFixed(2)}%
          </Percent>
        </CustomPopover>
      </ValueWrapper>
    </Container>
  </Wrapper>;
};

const Container = styled.div({
  display: 'flex',
  alignItems: 'stretch',
  minWidth: '246px',
  cursor: 'pointer',
  paddingLeft: '27px',
  paddingRight: '24px',
});

const Wrapper = styled.div({
  display: 'flex',
  marginTop: '2px',
  justifyContent: 'center',
});

const Data = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end'
});

export const Title = styled(Typography)({
  fontSize: '12px',
  color: '#434358',
  fontWeight: 400,
  marginBottom: '8px',
});

const ValueWrapper = styled.div({
  alignSelf: 'flex-end'
});

export const Value = styled.div({
  fontFamily: 'SF Pro Display, sans-serif',
  fontWeight: 600,
  fontSize: '14px',
  color: '#231536',
  display: 'flex',
  alignItems: 'flex-end',
  paddingBottom: 0,
});

const Percent = styled.div({
  fontFamily: 'SF Pro Display, sans-serif',
  fontWeight: 400,
  fontSize: '16px',
  color: '#231536',
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

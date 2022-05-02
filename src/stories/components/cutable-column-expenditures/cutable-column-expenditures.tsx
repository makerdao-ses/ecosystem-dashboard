import React from 'react';
import styled from '@emotion/styled';
import { CustomBarChart, CustomChartItem } from '../custom-bar-chart/custom-bar-chart';

interface CutableColumnExpendituresProps {
  value: number,
  percent: number,
  items: Array<CustomChartItem>
}

export const CutableColumnExpenditures = (props: CutableColumnExpendituresProps) => {
  return <Container>
    <Data>
      <Title>Last 3 months</Title>
      <Value>{props.value.toLocaleString()}</Value>
    </Data>
    <CustomBarChart items={props.items}/>
    <Value>{props.percent.toString()}%</Value>
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  alignItems: 'stretch',
  fontFamily: 'Roboto, sans-serif'
});

const Data = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
});

const Title = styled.div({
  fontSize: '12px',
  fontWeight: 400,
});

const Value = styled.div({
  display: 'flex',
  alignItems: 'flex-end',
  fontSize: '20px',
  fontWeight: 400,
  paddingBottom: '5px',
});

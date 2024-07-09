import { styled } from '@mui/material';
import React from 'react';
import BarWithDottedLine from './BarWithDottedLine';
import type { DateTime } from 'luxon';

interface Props {
  forecast: number;
  budgetCap: number;
  isTotal?: boolean;
  month?: DateTime;
}

const ProgressiveIndicator: React.FC<Props> = ({ forecast, budgetCap, month }) => (
  <Container>
    <BarWithDottedLine value={forecast} relativeValue={budgetCap} month={month} />
  </Container>
);

export default ProgressiveIndicator;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

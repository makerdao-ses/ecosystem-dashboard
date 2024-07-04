import styled from '@emotion/styled';
import React from 'react';
import BarWithDottedLineMobile from './BarWithDottedLineMobile';

import type { DateTime } from 'luxon';

interface Props {
  forecast: number;
  budgetCap: number;
  isTotal?: boolean;
  month?: DateTime;
}

const ProgressiveIndicatorMobile: React.FC<Props> = ({ forecast, budgetCap, month }) => (
  <Container>
    <BarWithDottedLineMobile value={forecast} relativeValue={budgetCap} month={month} />
  </Container>
);

export default ProgressiveIndicatorMobile;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  letterSpacing: '0.3px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
});

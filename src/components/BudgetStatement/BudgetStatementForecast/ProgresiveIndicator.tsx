import { styled, useMediaQuery } from '@mui/material';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import BarWithDottedLine from './BarWithDottedLine';
import ProgressiveIndicatorMobile from './ProgresiveIndicatorMobile';

import type { DateTime } from 'luxon';

interface Props {
  forecast: number;
  budgetCap: number;
  isTotal?: boolean;
  month?: DateTime;
}

const ProgressiveIndicator: React.FC<Props> = ({ forecast, budgetCap, isTotal = false, month }) => {
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  return (
    <>
      {!isMobile ? (
        <Container>
          <BarWithDottedLine value={forecast} relativeValue={budgetCap} month={month} />
        </Container>
      ) : (
        <ProgressiveIndicatorMobile budgetCap={budgetCap} forecast={forecast} isTotal={isTotal} month={month} />
      )}
    </>
  );
};

export default ProgressiveIndicator;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  letterSpacing: '0.3px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
});

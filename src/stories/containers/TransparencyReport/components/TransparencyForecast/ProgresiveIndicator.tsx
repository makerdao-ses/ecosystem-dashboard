import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import React from 'react';
import BarWithDottedLine from './BarWithDottedLine';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { DateTime } from 'luxon';

interface Props {
  forecast: number;
  budgetCap: number;
  isTotal?: boolean;
  month?: DateTime;
}

const ProgressiveIndicator: React.FC<Props> = ({ forecast, budgetCap, isTotal = false, month }) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <Forecast isLight={isLight} isTotal={isTotal}>
        {usLocalizedNumber(forecast)}
      </Forecast>
      <BarWithDottedLine value={forecast} relativeValue={budgetCap} month={month} />
    </Container>
  );
};

export default ProgressiveIndicator;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  letterSpacing: '0.3px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
});

const Forecast = styled.div<WithIsLight & { isTotal: boolean }>(({ isLight, isTotal }) => ({
  fontSize: '16px',
  lineHeight: '19px',
  textAlign: 'right',
  fontWeight: isTotal ? 700 : 400,
  color: isLight ? '#231536' : '#D2D4EF',
}));

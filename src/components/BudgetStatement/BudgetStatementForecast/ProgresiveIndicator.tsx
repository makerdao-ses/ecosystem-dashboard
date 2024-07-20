import React from 'react';
import BarWithDottedLine from './BarWithDottedLine';
import type { DateTime } from 'luxon';

interface Props {
  forecast: number | string;
  budgetCap: number | string;
  isTotal?: boolean;
  month?: DateTime;
}

const ProgressiveIndicator: React.FC<Props> = ({ forecast, budgetCap, month }) => (
  <BarWithDottedLine value={forecast} relativeValue={budgetCap} month={month} />
);

export default ProgressiveIndicator;

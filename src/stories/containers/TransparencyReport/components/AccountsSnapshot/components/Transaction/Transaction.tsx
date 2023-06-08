import { useMediaQuery } from '@mui/material';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import MobileTransaction from './MobileTransaction';

const Transaction: React.FC = () => {
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));

  return isMobile ? <MobileTransaction /> : <div>Transaction</div>;
};

export default Transaction;

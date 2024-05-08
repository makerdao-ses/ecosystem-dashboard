import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const TransactionHistorySkeleton: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <Card isLight={isLight}>
      <Text isLight={isLight} />
    </Card>
  );
};

export default TransactionHistorySkeleton;

const Card = styled.div<WithIsLight>(({ isLight }) => ({
  background: isLight ? '#fff' : '#10191F',
  borderRadius: 6,
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
  padding: '11px 16px',

  [lightTheme.breakpoints.up('table_834')]: {
    padding: '11px 16px 10px 24px',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: '12px 16px 12px 24px',
  },
}));

const Text = styled(BaseSkeleton)({
  maxWidth: 190,
  height: 12,

  [lightTheme.breakpoints.up('table_834')]: {
    maxWidth: 250,
    height: 14,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    maxWidth: 310,
    height: 16,
  },
});

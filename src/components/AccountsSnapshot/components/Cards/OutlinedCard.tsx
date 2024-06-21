import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface OutlinedCardProps extends React.PropsWithChildren {
  className?: string;
}

const OutlinedCard: React.FC<OutlinedCardProps> = ({ children, className }) => {
  const { isLight } = useThemeContext();

  return (
    <Card className={className} isLight={isLight}>
      {children}
    </Card>
  );
};

export default OutlinedCard;

const Card = styled.div<WithIsLight>(({ isLight }) => ({
  width: '100%',
  background: isLight ? '#FFFFFF' : '#1E2C37',
  border: `1px solid ${isLight ? '#D1DEE6' : 'none'}`,
  borderRadius: 6,
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
}));

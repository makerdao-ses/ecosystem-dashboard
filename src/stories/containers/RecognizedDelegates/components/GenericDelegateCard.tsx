import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props extends React.PropsWithChildren {
  className?: string;
}

const GenericDelegateCard: React.FC<Props> = ({ children, className }) => {
  const { isLight } = useThemeContext();
  return (
    <Container className={className} isLight={isLight}>
      {children}
    </Container>
  );
};

export default GenericDelegateCard;

const Container = styled.div<WithIsLight>(({ isLight }) => ({
  background: isLight ? '#FFFFFF' : '#1E2C37',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25);',
  borderRadius: '6px',
}));

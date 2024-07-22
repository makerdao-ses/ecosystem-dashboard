import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  className?: string;
}

const CardNavigationGeneric: React.FC<Props> = ({ className, children }) => {
  const { isLight } = useThemeContext();
  return (
    <ContainerCard className={className} isLight={isLight}>
      {children}
    </ContainerCard>
  );
};

export default CardNavigationGeneric;

const ContainerCard = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  padding: '16px 64px 24px',
  backgroundColor: isLight ? 'white' : 'blue',
  fontFamily: 'Inter, sans-serif',
  borderRadius: 6,
  border: `1px solid ${isLight ? 'rgba(212, 217, 225, 0.15)' : '#31424E'}`,
  background: isLight ? '#FFF' : '#1E2C37',
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
}));

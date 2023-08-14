import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { PropsWithChildren } from 'react';

interface Props {
  className?: string;
}

const CardNavigationGeneric: React.FC<Props & PropsWithChildren> = ({ className, children }) => {
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
  backgroundColor: isLight ? 'white' : 'red',
  fontFamily: 'Inter, sans-serif',
  borderRadius: 6,
  border: `1px solid ${isLight ? 'rgba(212, 217, 225, 0.15)' : 'red'}`,
  background: isLight ? '#FFF' : 'red',
  boxShadow: isLight ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)' : 'red',
}));

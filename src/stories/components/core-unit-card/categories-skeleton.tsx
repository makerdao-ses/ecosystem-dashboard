import React from 'react';
import { Skeleton } from '@mui/material';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../core/context/ThemeContext';

export const CategoriesSkeleton = () => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <Container>
      <Skeleton
        variant="rectangular"
        width={260}
        height={28}
        style={{
          borderRadius: '8px',
          background: isLight ? '#ECF1F3' : '#1d393c',
        }}
      />
    </Container>
  );
};

const Container = styled.div({
  display: 'none',
  alignItems: 'center',
  '@media (min-width: 684px)': {
    display: 'flex',
  },
});

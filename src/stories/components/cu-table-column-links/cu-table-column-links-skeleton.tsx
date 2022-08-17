import React from 'react';
import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';
import { useThemeContext } from '../../../core/context/ThemeContext';

export const ColumnLinksSkeleton = () => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <Container>
      <Skeleton
        variant="rectangular"
        width={260}
        height={28}
        style={{
          borderRadius: '8px',
          background: isLight ? '#ECF1F3' : '#1d393c'
        }}
      />
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  margin: '40px 22px 30px',
});

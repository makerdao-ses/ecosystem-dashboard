import React from 'react';
import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';
import { useThemeContext } from '../../../core/context/ThemeContext';

export const CuTableHeaderSkeleton = () => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <Container>
      <Skeleton
        variant="rectangular"
        width={188}
        height={48}
        style={{
          borderRadius: '8px',
          background: isLight ? '#ECF1F3' : '#1d393c',
        }}
      />
      <Filters>
        <Skeleton
          variant="rectangular"
          width={119}
          height={48}
          style={{
            borderRadius: '8px',
            background: isLight ? '#ECF1F3' : '#1d393c',
            marginRight: '8px',
          }}
        />
        <Skeleton
          variant="rectangular"
          width={119}
          height={48}
          style={{
            borderRadius: '8px',
            background: isLight ? '#ECF1F3' : '#1d393c',
            marginRight: '16px',
          }}
        />
        <Skeleton
          variant="rectangular"
          width={145}
          height={48}
          style={{
            borderRadius: '8px',
            background: isLight ? '#ECF1F3' : '#1d393c',
            marginRight: '30px',
          }}
        />
        <Skeleton
          variant="rectangular"
          width={320}
          height={48}
          style={{
            borderRadius: '8px',
            background: isLight ? '#ECF1F3' : '#1d393c',
          }}
        />
      </Filters>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  marginBottom: 32,
  justifyContent: 'space-between',
});

const Filters = styled.div({
  display: 'flex',
});

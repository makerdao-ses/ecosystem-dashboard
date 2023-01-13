import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';

export const ColumnLinksSkeleton = () => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <CompactWrapper>
        <Skeleton
          variant="rectangular"
          width={140}
          height={20}
          style={{
            borderRadius: '8px',
            background: isLight ? '#ECF1F3' : '#1E2C37',
            marginBottom: '8px',
          }}
        />
        <Skeleton
          variant="rectangular"
          width={140}
          height={20}
          style={{
            borderRadius: '8px',
            background: isLight ? '#ECF1F3' : '#1E2C37',
          }}
        />
      </CompactWrapper>
      <NormalWrapper>
        <Skeleton
          variant="rectangular"
          width={260}
          height={28}
          style={{
            borderRadius: '8px',
            background: isLight ? '#ECF1F3' : '#1E2C37',
          }}
        />
      </NormalWrapper>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  margin: '40px 22px 30px',
});

const CompactWrapper = styled.div({
  flexDirection: 'column',
  display: 'none',
  '@media (min-width: 1194px) and (max-width: 1409px)': {
    display: 'flex',
  },
});

const NormalWrapper = styled.div({
  display: 'flex',
  '@media (min-width: 1194px) and (max-width: 1409px)': {
    display: 'none !important',
  },
});

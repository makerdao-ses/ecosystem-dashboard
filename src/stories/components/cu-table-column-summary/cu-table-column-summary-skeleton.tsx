import React from 'react';
import styled from '@emotion/styled';
import { Skeleton } from '@mui/material';
import { useThemeContext } from '../../../core/context/ThemeContext';

export const ColumnSummarySkeleton = () => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <ContainerSkeleton>
      <Skeleton
        variant="circular"
        width={56}
        height={56}
        style={{
          marginRight: '11px',
          background: isLight ? '#ECF1F3' : '#1d393c',
        }}
      />
      <div>
        <Skeleton
          variant="rectangular"
          width={244}
          height={28}
          style={{
            borderRadius: '8px',
            marginBottom: '8px',
            background: isLight ? '#ECF1F3' : '#1d393c',
          }}
        />
        <Row>
          <Skeleton
            variant="rectangular"
            width={66}
            height={18}
            style={{
              borderRadius: '4px',
              marginRight: '4px',
              background: isLight ? '#ECF1F3' : '#1d393c',
            }}
          />
          <Skeleton
            variant="rectangular"
            width={174}
            height={18}
            style={{
              borderRadius: '4px',
              background: isLight ? '#ECF1F3' : '#1d393c',
            }}
          />
        </Row>
      </div>
    </ContainerSkeleton>
  );
};

const ContainerSkeleton = styled.div({
  display: 'flex',
  padding: '21px 0',
  '@media (min-width: 834px)': {
    padding: '21px 22px 21px 13px',
  },
});

const Row = styled.div({
  display: 'flex',
});

import React from 'react';
import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';
import { useThemeContext } from '../../../core/context/ThemeContext';

export const ColumnTeamMemberSkeleton = () => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <Container>
      <div>
        <Skeleton
          variant="rectangular"
          width={33}
          height={18}
          style={{
            borderRadius: '4px',
            marginBottom: '5px',
            background: isLight ? '#ECF1F3' : '#1d393c',
          }}
        />
        <Skeleton
          variant="rectangular"
          width={33}
          height={20}
          style={{
            borderRadius: '4px',
            background: isLight ? '#ECF1F3' : '#1d393c',
          }}
        />
      </div>
      <Skeleton
        variant="circular"
        width={41}
        height={41}
        style={{
          marginBottom: '5px',
          border: isLight ? '2px solid white' : '2px solid #1d393c',
          background: isLight ? '#ECF1F3' : '#1d393c',
        }}
      />
      <Skeleton
        variant="circular"
        width={41}
        height={41}
        style={{
          marginBottom: '5px',
          alignSelf: 'flex-end',
          border: isLight ? '2px solid white' : '2px solid #1d393c',
          marginLeft: '-19px',
          background: isLight ? '#ECF1F3' : '#1d393c',
        }}
      />
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  gap: '5px',
  padding: '0px 0',
  '@media (min-width: 1180px)': {
    justifyContent: 'center',
    padding: '32px 0 29px 50px',
  },
});

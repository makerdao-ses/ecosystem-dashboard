import styled from '@emotion/styled';
import { useTheme } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';

export const ColumnTeamMemberSkeleton = () => {
  const theme = useTheme();
  const isLight = theme.palette.isLight;
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
            background: isLight ? '#ECF1F3' : '#1E2C37',
          }}
        />
        <Skeleton
          variant="rectangular"
          width={33}
          height={20}
          style={{
            borderRadius: '4px',
            background: isLight ? '#ECF1F3' : '#1E2C37',
          }}
        />
      </div>
      <Skeleton
        variant="circular"
        width={41}
        height={41}
        style={{
          marginBottom: '5px',
          border: isLight ? '2px solid white' : '2px solid #1E2C37',
          background: isLight ? '#ECF1F3' : '#1E2C37',
        }}
      />
      <Skeleton
        variant="circular"
        width={41}
        height={41}
        style={{
          marginBottom: '5px',
          alignSelf: 'flex-end',
          border: isLight ? '2px solid white' : '2px solid #1E2C37',
          marginLeft: '-19px',
          background: isLight ? '#ECF1F3' : '#1E2C37',
        }}
      />
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  gap: '5px',
  padding: '0px 0',
  '@media (min-width: 1194px)': {
    justifyContent: 'center',
    padding: '32px 0 29px 50px',
  },
});

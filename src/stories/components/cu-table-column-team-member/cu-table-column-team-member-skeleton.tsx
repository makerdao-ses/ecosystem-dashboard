import React from 'react';
import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';

export const ColumnTeamMemberSkeleton = () => {
  return (
    <Container>
      <div>
        <Skeleton
          variant="rectangular"
          width={33}
          height={18}
          style={{
            borderRadius: '4px',
            marginBottom: '5px'
          }}
        />
        <Skeleton
          variant="rectangular"
          width={33}
          height={20}
          style={{ borderRadius: '4px' }}
        />
      </div>
      <Skeleton
          variant="circular"
          width={41}
          height={41}
          style={{
            marginBottom: '5px',
            border: '2px solid white'
          }}
        />
      <Skeleton
          variant="circular"
          width={41}
          height={41}
          style={{
            marginBottom: '5px',
            alignSelf: 'flex-end',
            border: '2px solid white',
            marginLeft: '-19px'
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
  }
});

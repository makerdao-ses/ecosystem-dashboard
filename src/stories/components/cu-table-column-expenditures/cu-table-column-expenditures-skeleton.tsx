import React from 'react';
import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';

export const ColumnExpendituresSkeleton = () => {
  return (
    <Container>
      <div>
        <Skeleton
          variant="rectangular"
          width={73}
          height={18}
          style={{
            borderRadius: '4px',
            marginBottom: '5px'
          }}
        />
        <Skeleton
          variant="rectangular"
          width={58}
          height={18}
          style={{ borderRadius: '4px' }}
        />
      </div>
      <Skeleton
          variant="rectangular"
          width={60}
          height={41}
          style={{
            borderRadius: '8px',
            marginBottom: '5px'
          }}
        />
      <Skeleton
          variant="rectangular"
          width={33}
          height={18}
          style={{
            borderRadius: '4px',
            marginBottom: '5px',
            alignSelf: 'flex-end'
          }}
        />
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  gap: '8px',
  margin: '21px 0',
  '@media (min-width: 1180px)': {
    margin: '34px 0px 23px',
  }
});

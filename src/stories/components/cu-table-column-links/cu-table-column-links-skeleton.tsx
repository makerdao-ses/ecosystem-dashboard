import React from 'react';
import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';

export const ColumnLinksSkeleton = () => {
  return (
    <Container>
        <Skeleton
          variant="rectangular"
          width={260}
          height={28}
          style={{
            borderRadius: '8px',
          }}
        />
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  margin: '40px 22px 30px',
});

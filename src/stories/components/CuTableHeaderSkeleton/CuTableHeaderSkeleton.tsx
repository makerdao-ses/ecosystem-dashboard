import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import lightTheme from '../../../../styles/theme/themes';
import { useThemeContext } from '../../../core/context/ThemeContext';

export const CuTableHeaderSkeleton = () => {
  const { isLight } = useThemeContext();

  return (
    <Container>
      <Skeleton
        variant="rectangular"
        width={188}
        height={48}
        style={{
          borderRadius: '8px',
          background: isLight ? '#ECF1F3' : '#1E2C37',
        }}
      />
      <Filters>
        <Skeleton
          variant="rectangular"
          width={119}
          height={48}
          style={{
            borderRadius: '8px',
            background: isLight ? '#ECF1F3' : '#1E2C37',
          }}
        />
        <Skeleton
          variant="rectangular"
          width={119}
          height={48}
          style={{
            borderRadius: '8px',
            background: isLight ? '#ECF1F3' : '#1E2C37',
            marginLeft: '8px',
          }}
        />
        <Skeleton
          className="hiddenOnTablet"
          variant="rectangular"
          width={145}
          height={48}
          style={{
            borderRadius: '8px',
            background: isLight ? '#ECF1F3' : '#1E2C37',
            marginLeft: '16px',
          }}
        />
        <Skeleton
          className="hiddenOnTablet"
          variant="rectangular"
          width={320}
          height={48}
          style={{
            borderRadius: '8px',
            background: isLight ? '#ECF1F3' : '#1E2C37',
            marginLeft: '30px',
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

  [lightTheme.breakpoints.down('table_834')]: {
    '& span': {
      width: '120px!important',
    },
  },
  [lightTheme.breakpoints.between('table_834', 1181)]: {
    flexWrap: 'wrap',
  },
});

const Filters = styled.div({
  display: 'flex',

  [lightTheme.breakpoints.between('table_834', 1181)]: {
    width: '100%',
    justifyContent: 'end',
    marginTop: '24px',
  },

  '& span': {
    [lightTheme.breakpoints.down('table_834')]: {
      width: '90px!important',

      '&.hiddenOnTablet': {
        display: 'none',
      },
    },
  },
});

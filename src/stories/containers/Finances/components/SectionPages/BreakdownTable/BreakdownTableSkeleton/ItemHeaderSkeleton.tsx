import { Skeleton, styled, useMediaQuery } from '@mui/material';
import React from 'react';
import type { Theme } from '@mui/material';

interface Props {
  isLast?: boolean;
  className?: string;
}

const ItemHeaderSkeleton: React.FC<Props> = ({ isLast, className }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTable = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));

  return (
    <Container isLast={isLast} className={className}>
      {isMobile && (
        <>
          <ItemSkeleton variant="rectangular" height={10.5} width={38} />
          <Values>
            <ItemSkeleton variant="rectangular" height={10.5} width={50} />
            <ItemSkeleton variant="rectangular" height={10.5} width={50} />
          </Values>
        </>
      )}
      {isTable && (
        <>
          <ItemSkeleton variant="rectangular" height={14} width={isLast ? 40 : 69} />
          <Values>
            <ItemSkeleton variant="rectangular" height={9.62} width={38} />
            <ItemSkeleton variant="rectangular" height={10.5} width={66} />
          </Values>
        </>
      )}
    </Container>
  );
};

export default ItemHeaderSkeleton;

const Container = styled('div')<{ isLast?: boolean }>(({ theme, isLast = false }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12.5,
  minWidth: 78,

  flex: 1,
  ...(!isLast && {
    ':after': {
      content: '""',
      position: 'absolute',
      height: 48,
      right: -6,
      borderRight: `1px solid ${theme.palette.mode === 'light' ? '#D1DEE6' : '#546978'}`,
    },
  }),

  [theme.breakpoints.up('tablet_768')]: {
    gap: 14,
    minWidth: 103.5,
    ...(!isLast && {
      ':after': {
        content: '""',
        position: 'absolute',
        height: 60,
        right: -14,
        borderRight: `1px solid ${theme.palette.mode === 'light' ? '#D1DEE6' : '#546978'}`,
      },
    }),
  },
}));

const Values = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  alignItems: 'center',
});

const ItemSkeleton = styled(Skeleton)<{ width: number; height: number }>(({ theme, height, width }) => ({
  height,
  width,
  borderRadius: 15,
  backgroundColor: '#D1DEE6',
  [theme.breakpoints.up('tablet_768')]: {},
}));

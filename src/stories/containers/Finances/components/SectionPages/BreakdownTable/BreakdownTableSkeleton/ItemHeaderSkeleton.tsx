import { Skeleton, styled } from '@mui/material';
import React from 'react';

interface Props {
  isLast?: boolean;
  className?: string;
}

const ItemHeaderSkeleton: React.FC<Props> = ({ isLast, className }) => (
  <Container className={className}>
    <Mobile isLast={isLast}>
      <ItemSkeleton variant="rectangular" height={10.5} width={38} />
      <Values>
        <ItemSkeleton variant="rectangular" height={10.5} width={50} />
        <ItemSkeleton variant="rectangular" height={10.5} width={50} />
      </Values>
    </Mobile>

    <Table isLast={isLast}>
      <ItemSkeleton variant="rectangular" height={14} width={isLast ? 40 : 69} />
      <Values>
        <ItemSkeleton variant="rectangular" height={9.62} width={38} />
        <ItemSkeleton variant="rectangular" height={10.5} width={66} />
      </Values>
    </Table>
    <Desk1024 isLast={isLast}>
      <ItemSkeleton variant="rectangular" height={14} width={isLast ? 40 : 66} />
      <RowValues>
        <ItemValueCell>
          <ItemSkeleton variant="rectangular" height={9.62} width={40} />
          <ItemSkeleton variant="rectangular" height={10.5} width={66} />
        </ItemValueCell>
        <ItemValueCell>
          <ItemSkeleton variant="rectangular" height={9.62} width={40} />
          <ItemSkeleton variant="rectangular" height={10.5} width={66} />
        </ItemValueCell>
      </RowValues>
    </Desk1024>
    <Desk1028 isLast={isLast}>
      <ItemSkeleton variant="rectangular" height={17.5} width={isLast ? 51 : 85} />
      <RowValues>
        <ItemValueCell>
          <ItemSkeleton variant="rectangular" height={9.62} width={38} />
          <ItemSkeleton variant="rectangular" height={10.5} width={66} />
        </ItemValueCell>
        <ItemValueCell>
          <ItemSkeleton variant="rectangular" height={9.62} width={49} />
          <ItemSkeleton variant="rectangular" height={10.5} width={66} />
        </ItemValueCell>
      </RowValues>
    </Desk1028>
  </Container>
);
export default ItemHeaderSkeleton;

const Container = styled('div')({});

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
  backgroundColor: theme.palette.mode === 'light' ? '#D1DEE6' : '#31424E',
  [theme.breakpoints.up('tablet_768')]: {},
}));

const RowValues = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});

const ItemValueCell = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
  width: 70.5,
  [theme.breakpoints.up('desktop_1280')]: {
    width: 90,
  },
}));

const Mobile = styled('div')<{ isLast?: boolean }>(({ theme, isLast = false }) => ({
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
      borderRight: `1px solid ${theme.palette.mode === 'light' ? '#D1DEE6' : 'rgb(84, 105, 120, 0.30)'}`,
    },
  }),
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const Table = styled('div')<{ isLast?: boolean }>(({ theme, isLast = false }) => ({
  display: 'none',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    gap: 14,
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 103.5,
    ...(!isLast && {
      ':after': {
        content: '""',
        position: 'absolute',
        height: 60,
        right: -14,
        borderRight: `1px solid ${theme.palette.mode === 'light' ? '#D1DEE6' : 'rgb(84, 105, 120, 0.30)'}`,
      },
    }),
  },
}));

const Desk1024 = styled('div')<{ isLast?: boolean }>(({ theme, isLast = false }) => ({
  display: 'none',
  [theme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    minWidth: 130,
    gap: 14,
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    ...(!isLast && {
      ':after': {
        content: '""',
        position: 'absolute',
        height: 60,
        right: -8,
        borderRight: `1px solid ${theme.palette.mode === 'light' ? '#D1DEE6' : 'rgb(84, 105, 120, 0.30)'}`,
      },
    }),
  },
}));

const Desk1028 = styled('div')<{ isLast?: boolean }>(({ theme, isLast = false }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 130,
    gap: 14,
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    ...(!isLast && {
      ':after': {
        content: '""',
        position: 'absolute',
        height: 60,
        right: -8,
        borderRight: `1px solid ${theme.palette.mode === 'light' ? '#D1DEE6' : 'rgb(84, 105, 120, 0.30)'}`,
      },
    }),
  },
}));

import { Skeleton, styled } from '@mui/material';
import React from 'react';

interface Props {
  width: number;
}

const ItemLegendAxisValues: React.FC<Props> = ({ width }) => <ContainerSkeleton variant="rectangular" width={width} />;

export default ItemLegendAxisValues;

const ContainerSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: 12.5,
  height: 8.75,
  [theme.breakpoints.up('tablet_768')]: {
    borderRadius: 17.5,
    height: 12.5,
  },
}));

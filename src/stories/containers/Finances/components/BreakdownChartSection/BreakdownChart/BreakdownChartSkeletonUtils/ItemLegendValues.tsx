import { Skeleton, styled } from '@mui/material';
import React from 'react';

const ItemLegendValues: React.FC = () => (
  <ContainerItem>
    <ItemLegendCircle variant="circular" />
    <SkeletonItemRectangular variant="rectangular" />
  </ContainerItem>
);

export default ItemLegendValues;

const ContainerItem = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
});

const SkeletonItemRectangular = styled(Skeleton)(({ theme }) => ({
  height: 10.5,
  borderRadius: 15,
  width: 85,
  [theme.breakpoints.up('tablet_768')]: {
    height: 14,
    width: 109,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    height: 14,
    width: 106,
  },
}));

const ItemLegendCircle = styled(Skeleton)(({ theme }) => ({
  width: 12,
  height: 12,
  [theme.breakpoints.up('tablet_768')]: {
    width: 16,
    height: 16,
  },
}));

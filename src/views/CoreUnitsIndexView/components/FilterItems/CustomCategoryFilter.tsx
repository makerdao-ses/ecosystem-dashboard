import { Box, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import CategoryChip from '@/components/CategoryChip/CategoryChip';

import type { TeamCategory } from '@/core/models/interfaces/types';
import type { FC } from 'react';

interface Props {
  category: TeamCategory;
  isActive: boolean;
  count?: string;
}

const CustomCategoryFilter: FC<Props> = ({ category, isActive, count = '0' }) => (
  <BoxStyle>
    <Title isActive={isActive}>{count}</Title>
    <CategoryChip category={category} />
  </BoxStyle>
);
export default CustomCategoryFilter;

const Title = styled(Typography)<{ isActive: boolean }>(({ theme, isActive }) => ({
  color: theme.palette.isLight
    ? isActive
      ? theme.palette.colors.gray[900]
      : theme.palette.colors.gray[300]
    : isActive
    ? theme.palette.colors.gray[50]
    : theme.palette.colors.charcoal[800],
  width: 24,
}));

const BoxStyle = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
});

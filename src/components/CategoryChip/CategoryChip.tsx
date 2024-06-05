import { styled } from '@mui/material';
import React from 'react';
import { useCategoryColors } from './useCategoryColors';
import type { CustomColors } from './useCategoryColors';
import type { TeamCategory } from '@ses/core/models/interfaces/types';

interface StatusChipProps {
  category: TeamCategory;
  className?: string;
}

const CategoryChip: React.FC<StatusChipProps> = ({ category, className }) => {
  const colors = useCategoryColors();
  console.log('colors', colors);
  return (
    <Chip category={category} colors={colors} className={className}>
      {category}
    </Chip>
  );
};
export default CategoryChip;
const Chip = styled('div')<{ colors: CustomColors; category: TeamCategory }>(({ theme, colors, category }) => ({
  display: 'flex',
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  lineHeight: '22px',
  fontWeight: 600,
  width: 'fit-content',
  borderRadius: 6,
  padding: '1px 16px 1px 16px',
  color: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
  border: `1.5px solid ${theme.palette.isLight ? colors[`${category}`]?.border : colors[`${category}`]?.borderDark}`,
}));

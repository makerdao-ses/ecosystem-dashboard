import React from 'react';
import { Chip } from '@mui/material';
import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { getColorCategory } from '../../../core/utils/color.utils';

interface CategoryChipProps {
  category: CuCategoryEnum;
  size?: 'small' | 'medium' | undefined;
  style?: React.CSSProperties
}

export const CategoryChip = ({ category, style = {}, size = 'small' }: CategoryChipProps) => {
  const { color, background } = getColorCategory(category);
  return <Chip size={size} sx={{
    borderRadius: '12px',
    borderColor: color,
    color,
    backgroundColor: background,
    fontSize: '11px',
    height: '22px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '22px'
  }}
    style={style}
    label={category}
    variant={'outlined'} />;
};

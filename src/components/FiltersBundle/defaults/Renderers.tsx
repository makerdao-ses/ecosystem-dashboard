import { styled } from '@mui/material';
import FilterIcon from 'public/assets/svg/filter.svg';
import type { RenderTriggerFn } from '../types';

export const defaultTriggerRenderer: RenderTriggerFn = (onClick, ref) => (
  <FilterContainer onClick={onClick} ref={ref}>
    <FilterIcon width="24" height="24" />
  </FilterContainer>
);

const FilterContainer = styled('div')(({ theme }) => ({
  width: '24px',
  height: '24px',
  color: theme.palette.isLight ? theme.palette.colors.slate[300] : theme.palette.colors.slate[300],
  '&:hover': {
    color: theme.palette.isLight ? theme.palette.colors.slate[400] : theme.palette.colors.slate[200],
    cursor: 'pointer',
  },
}));

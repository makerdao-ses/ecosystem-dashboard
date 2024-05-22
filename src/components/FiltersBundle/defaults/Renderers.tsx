import { Box } from '@mui/material';
import BarsFilter from '@/components/icons/BarsFilter';
import type { RenderTriggerFn } from '../types';

export const defaultTriggerRenderer: RenderTriggerFn = (onClick) => (
  <Box onClick={onClick}>
    <BarsFilter />
  </Box>
);

import { useMediaQuery } from '@mui/material';
import { useMemo, useRef, useState } from 'react';

import type { Breakpoint, FiltersBundleOptions } from './types';
import type { Theme } from '@mui/material';

interface Props {
  filters: FiltersBundleOptions['filters'];
  order: FiltersBundleOptions['order'];
}

export const breakpointsOrder: Breakpoint[] = ['mobile', 'tablet', 'desktop'];

export default function useFiltersBundle({ filters, order }: Props) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const handleToggleOpenFilters = () => setAreFiltersOpen((prev) => !prev);

  const currentBreakpoint = useMemo(() => {
    if (isMobile) return 'mobile';
    if (isTablet) return 'tablet';
    return 'desktop';
  }, [isMobile, isTablet]);

  const orderedFilters = useMemo(() => {
    if (order && currentBreakpoint) {
      const bpIndex = breakpointsOrder.indexOf(currentBreakpoint);
      for (let i = bpIndex; i >= 0; i--) {
        const bp = breakpointsOrder[i];
        if (order[bp]) {
          return filters.slice().sort((a, b) => {
            const orderA = order[bp]?.indexOf(a.id) ?? filters.length;
            const orderB = order[bp]?.indexOf(b.id) ?? filters.length;
            return orderA - orderB;
          });
        }
      }
    }
    return filters;
  }, [filters, order, currentBreakpoint]);

  return {
    resolution: {
      isMobile,
      isTablet,
    },
    triggerRef,
    areFiltersOpen,
    handleToggleOpenFilters,
    orderedFilters,
  };
}

import { useMediaQuery } from '@mui/material';
import { useRef, useState } from 'react';

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
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1024'));

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const handleToggleOpenFilters = () => setAreFiltersOpen((prev) => !prev);

  const getCurrentBreakpoint = (): Breakpoint => {
    if (isMobile) return 'mobile';
    else if (isTablet) return 'tablet';
    else return 'desktop';
  };

  const getOrderedFilters = () => {
    const currentBreakpoint = getCurrentBreakpoint();
    if (order && currentBreakpoint) {
      for (const bp of breakpointsOrder) {
        if (order[bp] && breakpointsOrder.indexOf(bp) <= breakpointsOrder.indexOf(currentBreakpoint)) {
          return filters.slice().sort((a, b) => (order[bp]?.indexOf(a.id) ?? 0) - (order[bp]?.indexOf(b.id) ?? 0));
        }
      }
    }
    return filters;
  };

  getOrderedFilters().map((m) => console.log({ type: m.type }));

  return {
    resolution: {
      isMobile,
      isTablet,
      isDesktop,
    },
    triggerRef,
    areFiltersOpen,
    handleToggleOpenFilters,
    orderedFilters: getOrderedFilters(),
  };
}

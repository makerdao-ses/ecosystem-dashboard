import { Button, Divider, styled, useMediaQuery } from '@mui/material';
import { useRef, useState } from 'react';
import CustomSelect from '../CustomSelect/CustomSelect';
import Search from '../Search/Search';
import FilterMobile from './FilterMobile';
import FilterTablet from './FilterTablet';
import { defaultTriggerRenderer } from './defaults/Renderers';
import type { Breakpoint, FiltersBundleOptions } from './types';
import type { CustomSelectProps } from '../CustomSelect/type';
import type { Theme } from '@mui/material';
import type { FC } from 'react';

export const breakpointsOrder: Breakpoint[] = ['mobile', 'tablet', 'desktop'];

const FiltersBundle: FC<FiltersBundleOptions> = ({ renderTrigger, resetFilters, filters, order = {}, snap = 2 }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  // const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1024'));

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const handleToggleOpenFilters = () => setAreFiltersOpen((prev) => !prev);

  if (isMobile || isTablet) {
    // in mobile and tablet view, we have a trigger button only
    // in mobile the trigger opens a modal sheet, in tablet it opens a drawer
    return (
      <>
        {(renderTrigger ?? defaultTriggerRenderer)(handleToggleOpenFilters, triggerRef)}{' '}
        {/* TODO: move the sheet to a separate component */}
        {isMobile && (
          <FilterMobile
            isOpen={areFiltersOpen}
            handleClose={handleToggleOpenFilters}
            filters={filters}
            resetFilters={resetFilters}
            initialSnap={snap}
          />
        )}
        {isTablet && !isMobile && (
          <FilterTablet
            isOpen={areFiltersOpen}
            handleClose={handleToggleOpenFilters}
            filters={filters}
            resetFilters={resetFilters}
            anchorEl={triggerRef}
          />
        )}
      </>
    );
  }

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

  return (
    <FilterElement>
      {/* render reset if available */}
      {!!resetFilters && (
        <ResetButton variant="text" onClick={resetFilters.onReset} disabled={!resetFilters.canReset}>
          Reset Filter
        </ResetButton>
      )}

      {/* render all filters */}
      {getOrderedFilters().map((filter) => {
        switch (filter.type) {
          case 'search': {
            return (
              <SearchFilter>
                <Search placeholder="Search" /* value={filter.value} */ onChange={filter.onChange} />
              </SearchFilter>
            );
          }
          case 'select': {
            return (
              <CustomSelect
                label={filter.label}
                multiple={filter.multiple}
                selected={filter.selected as string | string[]}
                options={filter.options as CustomSelectProps['options']}
                onChange={filter.onChange as CustomSelectProps['onChange']}
                customOptionsRender={filter.customOptionsRender as CustomSelectProps['customOptionsRender']}
                style={filter.style}
              />
            );
          }
          case 'radio': {
            return (
              <div key={filter.id}>
                {filter.options.map((option) => (
                  <label key={option.value}>
                    <input
                      type="radio"
                      value={option.value}
                      checked={option.selected}
                      // onChange={() => filter.onChange(option.value)}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            );
          }
          case 'divider': {
            return <CustomDivider orientation="vertical" flexItem />;
          }
          default: {
            throw new Error('Unknown filter type');
          }
        }
      })}
    </FilterElement>
  );
};

export default FiltersBundle;

const ResetButton = styled(Button)(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[800],
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '24px',
  borderRadius: 6,
  background: 'transparent',
  padding: '4px 16px',
  textTransform: 'none',
  '&:hover': {
    background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.slate[900],
  },
}));

const SearchFilter = styled('div')({
  display: 'block',
  width: '280px',
});

const FilterElement = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 16,
});

const CustomDivider = styled(Divider)(({ theme }) => ({
  marginTop: 4,
  height: 24,
  background: theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.slate[300],
}));

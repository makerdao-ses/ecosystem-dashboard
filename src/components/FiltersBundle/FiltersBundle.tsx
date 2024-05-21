import { useMediaQuery } from '@mui/material';
import { useState } from 'react';
import FilterSheet from './FilterSheet';
import { defaultTriggerRenderer } from './defaults/Renderers';
import type { FiltersBundleOptions } from './types';
import type { Theme } from '@mui/material';

const FiltersBundle: React.FC<FiltersBundleOptions> = ({ renderTrigger, resetFilters, filters }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));

  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const handleToggleOpenFilters = () => setAreFiltersOpen((prev) => !prev);

  if (isMobile || isTablet) {
    // in mobile and tablet view, we have a trigger button only
    // in mobile the trigger opens a modal sheet, in tablet it opens a drawer
    return (
      <>
        {(renderTrigger ?? defaultTriggerRenderer)(handleToggleOpenFilters)}{' '}
        {/* TODO: move the sheet to a separate component */}
        {isMobile && <FilterSheet isOpen={areFiltersOpen} handleClose={handleToggleOpenFilters} filters={filters} />}
        {isTablet && !isMobile && (
          // TODO: implement drawer
          <div>...</div>
        )}
      </>
    );
  }

  return (
    <div>
      {/* render reset if available */}
      {!!resetFilters && (
        <button onClick={resetFilters.onReset} disabled={!resetFilters.canReset}>
          Reset
        </button>
      )}

      {/* render all filters */}
      {filters.map((filter) => {
        switch (filter.type) {
          case 'search': {
            return (
              <input
                key={filter.id}
                type="search"
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
              />
            );
          }
          case 'select': {
            return (
              <select key={filter.id} value={filter.options.find((o) => o.selected)?.value}>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            );
          }
          default: {
            throw new Error('Unknown filter type');
          }
        }
      })}
    </div>
  );
};

export default FiltersBundle;

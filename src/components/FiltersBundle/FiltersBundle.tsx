import { TextField, useMediaQuery } from '@mui/material';
import SingleItemSelect from '@ses/components/SingleItemSelect/SingleItemSelect';
import { useState } from 'react';
import FilterSheet from './FilterSheet';
import { defaultTriggerRenderer } from './defaults/Renderers';
import type { FiltersBundleOptions } from './types';
import type { Theme } from '@mui/material';
import type { SelectItem } from '@ses/components/SingleItemSelect/SingleItemSelect';
import type { FC } from 'react';

const FiltersBundle: FC<FiltersBundleOptions> = ({ renderTrigger, resetFilters, filters }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  // const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));

  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const handleToggleOpenFilters = () => setAreFiltersOpen((prev) => !prev);

  if (isMobile) {
    // in mobile and tablet view, we have a trigger button only
    // in mobile the trigger opens a modal sheet, in tablet it opens a drawer
    return (
      <>
        {(renderTrigger ?? defaultTriggerRenderer)(handleToggleOpenFilters)}{' '}
        {/* TODO: move the sheet to a separate component */}
        {isMobile && (
          <FilterSheet
            isOpen={areFiltersOpen}
            handleClose={handleToggleOpenFilters}
            filters={filters}
            resetFilters={resetFilters}
          />
        )}
        {/* {isTablet && !isMobile && (
          // TODO: implement drawer
          <div>...</div>
        )} */}
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
              <TextField
                key={filter.id}
                variant="outlined"
                placeholder="search"
                type="text"
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
              />
            );
          }
          case 'select': {
            return (
              <SingleItemSelect
                items={filter.options as SelectItem[]}
                useSelectedAsLabel
                onChange={filter.onChange}
                selected={filter.selected as string}
                PopperProps={{
                  placement: 'bottom-end',
                }}
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
          default: {
            throw new Error('Unknown filter type');
          }
        }
      })}
    </div>
  );
};

export default FiltersBundle;

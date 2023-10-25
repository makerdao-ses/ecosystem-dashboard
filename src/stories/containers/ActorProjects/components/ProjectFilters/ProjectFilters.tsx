import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { CustomMultiSelect } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import ResetButton from '@ses/components/ResetButton/ResetButton';
import { SearchInput } from '@ses/components/SearchInput/SearchInput';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

export interface ProjectFiltersProps {
  handleResetFilters: () => void;
  statuses: MultiSelectItem[];
  activeStatuses: string[];
  handleStatusChange: (items: string[]) => void;
  searchQuery: string;
  handleSearchChange: (query: string) => void;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  handleResetFilters,
  statuses,
  activeStatuses,
  handleStatusChange,
  searchQuery,
  handleSearchChange,
}) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));

  return (
    <FilterContainer>
      <ResetButton
        onClick={handleResetFilters}
        disabled={activeStatuses.length === 0 && searchQuery.length === 0}
        hasIcon={isMobile}
        label="Reset filters"
        legacyBreakpoints={false}
      />
      <FieldsContainer>
        <CustomMultiSelect
          legacyBreakpoints={false}
          popupContainerHeight={180}
          positionRight={true}
          label="Status"
          activeItems={activeStatuses}
          width={118}
          popupContainerWidth={250}
          listItemWidth={218}
          items={statuses}
          onChange={handleStatusChange}
        />
        <SearchContainer isLight={isLight}>
          <SearchInput
            legacyBreakpoints={false}
            handleClearSearch={() => handleSearchChange('')}
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </SearchContainer>
      </FieldsContainer>
    </FilterContainer>
  );
};

export default ProjectFilters;

const FilterContainer = styled.div({
  display: 'flex',
  gap: 8,
  marginLeft: 'auto',

  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 0,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    gap: 16,
  },
});

const FieldsContainer = styled.div({
  display: 'flex',
});

const SearchContainer = styled.div<WithIsLight>(({ isLight }) => ({
  paddingLeft: 16,
  position: 'relative',

  [lightTheme.breakpoints.up('desktop_1024')]: {
    paddingLeft: 32,
  },

  '&:before': {
    content: '""',
    position: 'absolute',
    top: 5,
    left: 8,
    height: 24,
    width: 1,
    backgroundColor: isLight ? '#D4D9E1' : 'red',

    [lightTheme.breakpoints.up('tablet_768')]: {
      top: 9,
      height: 32,
    },

    [lightTheme.breakpoints.up('desktop_1024')]: {
      left: 16,
    },
  },
}));

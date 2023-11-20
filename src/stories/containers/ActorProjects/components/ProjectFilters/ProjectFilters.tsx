import styled from '@emotion/styled';
import { CustomMultiSelect } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import ResetButton from '@ses/components/ResetButton/ResetButton';
import { SearchInput } from '@ses/components/SearchInput/SearchInput';
import Filter from '@ses/components/svg/filter';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ProjectStatus } from '@ses/core/models/interfaces/projects';
import lightTheme from '@ses/styles/theme/light';
import React, { useMemo } from 'react';
import ProjectStatusChip from '../ProjectStatusChip/ProjectStatusChip';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';

export interface ProjectFiltersProps {
  isMobile: boolean;
  handleResetFilters: () => void;
  statuses: MultiSelectItem[];
  activeStatuses: string[];
  handleStatusChange: (items: string[]) => void;
  searchQuery: string;
  handleSearchChange: (query: string) => void;
  isFilterCollapsedOnMobile: boolean;
  handleToggleFilterOnMobile: () => void;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  isMobile,
  handleResetFilters,
  statuses,
  activeStatuses,
  handleStatusChange,
  searchQuery,
  handleSearchChange,
  isFilterCollapsedOnMobile,
  handleToggleFilterOnMobile,
}) => {
  const { isLight } = useThemeContext();
  const isActive = activeStatuses.length > 0 || searchQuery.length > 0;
  const allCount = useMemo(() => statuses.reduce((previous, current) => previous + current.count, 0), [statuses]);

  return isMobile ? (
    <MobileFilterContainer isCollapsed={isFilterCollapsedOnMobile}>
      <SearchMobileContainer isCollapsed={isFilterCollapsedOnMobile}>
        {!isFilterCollapsedOnMobile && (
          <SearchContainer>
            <SearchInput
              legacyBreakpoints={false}
              handleClearSearch={() => handleSearchChange('')}
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </SearchContainer>
        )}
        <ButtonFilter
          isLight={isLight}
          isOpen={!isFilterCollapsedOnMobile}
          isActive={isActive}
          onClick={handleToggleFilterOnMobile}
        >
          <Filter
            fill={
              !isFilterCollapsedOnMobile || isActive ? (isLight ? '#1AAB9B' : '#098C7D') : isLight ? '#231536' : 'white'
            }
          />
        </ButtonFilter>
      </SearchMobileContainer>
      {!isFilterCollapsedOnMobile && (
        <StatusMobileContainer>
          <CustomMultiSelect
            legacyBreakpoints={false}
            popupContainerHeight={182}
            positionRight={true}
            label="Status"
            customAll={{
              id: 'All',
              content: <ProjectStatusChip status={ProjectStatus.INPROGRESS} customLabel="All" isSmall />,
              count: allCount,
            }}
            activeItems={activeStatuses}
            width={118}
            popupContainerWidth={250}
            listItemWidth={218}
            items={statuses}
            onChange={handleStatusChange}
          />
          <ResetButton
            onClick={handleResetFilters}
            disabled={activeStatuses.length === 0 && searchQuery.length === 0}
            hasIcon={true}
            label="Reset filters"
            legacyBreakpoints={false}
          />
        </StatusMobileContainer>
      )}
    </MobileFilterContainer>
  ) : (
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
          popupContainerHeight={186}
          positionRight={true}
          label="Status"
          customAll={{
            id: 'All',
            content: <ProjectStatusChip status={ProjectStatus.INPROGRESS} customLabel="All" isSmall />,
            count: allCount,
          }}
          activeItems={activeStatuses}
          width={118}
          popupContainerWidth={250}
          listItemWidth={218}
          items={statuses}
          onChange={handleStatusChange}
        />
        <SearchContainer>
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

const SearchContainer = styled.div({
  position: 'relative',
  width: '100%',

  [lightTheme.breakpoints.up('tablet_768')]: {
    paddingLeft: 16,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    paddingLeft: 32,
  },

  '&:before': {
    content: '""',
    position: 'absolute',
    [lightTheme.breakpoints.up('tablet_768')]: {
      top: 9,
      left: 8,
      height: 32,
      width: 1,
      backgroundColor: '#D4D9E1',
    },

    [lightTheme.breakpoints.up('desktop_1024')]: {
      left: 16,
    },
  },
});

const MobileFilterContainer = styled.div<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  ...(isCollapsed
    ? {
        marginLeft: 'auto',
      }
    : {
        width: '100%',
        justifyContent: 'space-between',
      }),
}));

const SearchMobileContainer = styled.div<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  display: 'flex',
  ...(isCollapsed
    ? {
        marginLeft: 'auto',
      }
    : {
        width: '100%',
        justifyContent: 'space-between',
        gap: 16,
      }),
}));

const StatusMobileContainer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 16,
});

const ButtonFilter = styled.div<{ isActive: boolean; isLight: boolean; isOpen: boolean }>(
  ({ isActive, isLight, isOpen }) => ({
    display: 'flex',
    gridArea: 'buttonFilter',
    justifySelf: 'flex-end',
    width: 34,
    minWidth: 34,
    height: 34,
    border: isLight
      ? isOpen || isActive
        ? '1px solid #6EDBD0'
        : '1px solid #D4D9E1'
      : isOpen || isActive
      ? '1px solid #098C7D'
      : '1px solid #343442',
    borderRadius: '50%',
    alignItems: 'center',
    background: isOpen ? (isLight ? '#B6EDE7' : '#003C40') : isLight ? 'white' : 'transparent',
    justifyContent: 'center',
    boxSizing: 'border-box',
    cursor: 'pointer',
  })
);

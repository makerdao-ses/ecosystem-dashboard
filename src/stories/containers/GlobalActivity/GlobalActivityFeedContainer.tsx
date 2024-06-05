import styled from '@emotion/styled';
import { Divider } from '@mui/material';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { siteRoutes } from '@ses/config/routes';
import React from 'react';
import lightTheme from '../../../../styles/theme/themes';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { toAbsoluteURL } from '../../../core/utils/urls';
import ActivityTable from '../../components/CUActivityTable/ActivityTable';
import CoreUnitSelectItem from '../../components/CoreUnitSelectItem/CoreUnitSelectItem';
import { CustomMultiSelect } from '../../components/CustomMultiSelect/CustomMultiSelect';
import ResetButton from '../../components/ResetButton/ResetButton';
import { SEOHead } from '../../components/SEOHead/SEOHead';
import { SearchInput } from '../../components/SearchInput/SearchInput';
import Filter from '../../components/svg/filter';
import { Paragraph, Title } from '../CUActivity/CUActivityFeedContainer';
import { useGlobalActivity } from './useGlobalActivity';
import type { SelectItemProps } from '../../components/CustomMultiSelect/CustomMultiSelect';
import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';
import type { Team } from '@ses/core/models/interfaces/team';

interface Props {
  teams: Team[];
  activityFeed: ChangeTrackingEvent[];
}

const GlobalActivityFeedContainer: React.FC<Props> = ({ teams, activityFeed }) => {
  const { isLight } = useThemeContext();

  const {
    columns,
    extendedActivityFeed,
    clearFilters,
    filtersActive,
    inputRef,
    handleClearSearch,
    searchText,
    setSearchText,
    selectElements,
    activeElements,
    handleSelectChange,
    filtersVisible,
    toggleFiltersVisible,
  } = useGlobalActivity(teams, activityFeed);

  return (
    <Wrapper>
      <SEOHead
        title="MakerDAO Core Units | Activity Feed"
        description="Learn about the activity of MakerDAO Core Units: updates to Core Unit Expense Reports, FTEs, and more."
        image={{
          src: toAbsoluteURL('/assets/img/social-385x200.png'),
          width: 385,
          height: 200,
        }}
        twitterImage={toAbsoluteURL('/assets/img/social-1200x630.png')}
        canonicalURL={siteRoutes.globalActivityFeed}
      />
      <PageWrapper hasImageBackground={true}>
        <Container>
          <FiltersContainer>
            <Reset filtersVisible={filtersVisible}>
              <ResetButton onClick={clearFilters} disabled={!filtersActive} hasIcon={false} labelMobile="Reset" />
            </Reset>
            <CoreUnitsSelect filtersVisible={filtersVisible}>
              <CustomMultiSelect
                label="Team"
                activeItems={activeElements}
                items={selectElements}
                width={138}
                onChange={(value: string[]) => {
                  handleSelectChange(value);
                }}
                withAll
                popupContainerWidth={360}
                listItemWidth={330}
                customAll={{
                  content: 'All Teams',
                  id: 'all',
                  params: { isAll: true },
                  count: 0,
                }}
                customItemRender={(props: SelectItemProps) => <CoreUnitSelectItem {...props} />}
              />
            </CoreUnitsSelect>
            <SmallSeparator isLight={isLight} />
            <Search>
              <SearchInput
                inputRef={inputRef}
                handleClearSearch={handleClearSearch}
                placeholder="Search"
                value={searchText}
                onChange={(value: string) => {
                  setSearchText(value);
                }}
              />
            </Search>
            <ButtonFilter
              isOpen={filtersVisible}
              isActive={filtersActive}
              onClick={toggleFiltersVisible}
              isLight={isLight}
            >
              <Filter
                fill={
                  filtersActive || filtersVisible ? (isLight ? '#1AAB9B' : '#098C7D') : isLight ? '#231536' : 'white'
                }
              />
            </ButtonFilter>
          </FiltersContainer>
          <TableWrapper>
            <ActivityTable
              columns={columns}
              shortCode={'global'}
              activityFeed={extendedActivityFeed}
              hasFilter={filtersActive}
              clearAction={clearFilters}
              isGlobal
            />
          </TableWrapper>
          <Title isLight={isLight}>Additional Notes</Title>
          <Paragraph isLight={isLight}>
            Change tracking displays all changes that have occurred regarding all Team activity. Here you will be able
            to see all previous modifications the Team made to its Expense Reports, FTEs, and more
          </Paragraph>
        </Container>
      </PageWrapper>
    </Wrapper>
  );
};

export default GlobalActivityFeedContainer;

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const PageWrapper = styled(PageContainer)({
  paddingTop: 88,

  [lightTheme.breakpoints.up('table_834')]: {
    paddingTop: 96,
  },
});

const TableWrapper = styled.div({
  maxWidth: '1312px',
  width: '100%',
  margin: '0 auto',
});

const FiltersContainer = styled.div({
  display: 'grid',
  gap: '16px',
  marginBottom: '32px',
  gridTemplateColumns: 'auto 34px',
  gridTemplateRows: 'auto auto',
  placeItems: 'space-between',
  width: '100%',
  gridTemplateAreas: `
  "search buttonFilter"
  "coreUnits reset"
  `,
  '@media (min-width: 834px)': {
    gridTemplateRows: 'auto',
    gridTemplateColumns: 'auto auto auto auto',
    justifyContent: 'flex-end',
    gridTemplateAreas: '"reset coreUnits separator search"',
  },
});

const Reset = styled.div<{ filtersVisible: boolean }>(({ filtersVisible }) => ({
  display: filtersVisible ? 'flex' : 'none',
  gridArea: 'reset',
  justifyContent: 'flex-end',
  '@media (min-width: 834px)': {
    display: 'flex',
  },
}));

const Search = styled.div({
  gridArea: 'search',
});

const CoreUnitsSelect = styled.div<{ filtersVisible: boolean }>(({ filtersVisible }) => ({
  display: filtersVisible ? 'flex' : 'none',
  gridArea: 'coreUnits',
  '@media (min-width: 834px)': {
    display: 'flex',
  },
}));
const SmallSeparator = styled(Divider, { shouldForwardProp: (prop) => prop !== 'isLight' })<{
  isLight: boolean;
}>(({ isLight }) => ({
  height: '32px',
  width: '1px',
  backgroundColor: isLight ? '#D4D9E1' : '#48495F',
  alignSelf: 'center',
  gridArea: 'separator',
  display: 'none',
  '@media (min-width: 834px)': {
    display: 'block',
  },
}));

export const ButtonFilter = styled('div')<{ isActive: boolean; isOpen: boolean; isLight: boolean }>(
  ({ isActive, isOpen, isLight }) => ({
    display: 'flex',
    gridArea: 'buttonFilter',
    justifySelf: 'flex-end',
    width: '34px',
    height: '34px',
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
    '@media (min-width: 834px)': {
      display: 'none',
    },
  })
);

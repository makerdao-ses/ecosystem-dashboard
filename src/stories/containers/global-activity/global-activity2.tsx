import styled from '@emotion/styled';
import CoreUnitSelectItem from '@ses/components/core-unit-select-item/core-unit-select-item';
import ActivityTable2 from '@ses/components/cu-activity-table/cu-activity-table2';
import { CustomMultiSelect } from '@ses/components/custom-multi-select/custom-multi-select';
import ResetButton from '@ses/components/reset-button/reset-button';
import { SearchInput } from '@ses/components/search-input/search-input';
import { SEOHead } from '@ses/components/seo-head/seo-head';
import Filter from '@ses/components/svg/filter';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { toAbsoluteURL } from '@ses/core/utils/url.utils';
import React from 'react';
import lightTheme from '../../../../styles/theme/light';
import { Paragraph, Title } from '../cu-activity/cu-activity';
import { ButtonFilter, SmallSeparator } from '../cu-table/cu-table-filters';
import { useGlobalActivityMvvm2 } from './global-activity.mvvm2';
import type { SelectItemProps } from '@ses/components/custom-multi-select/custom-multi-select';
import type { CoreUnitDto } from '@ses/core/models/dto/core-unit.dto';

interface Props {
  coreUnits: CoreUnitDto[];
}

const GlobalActivityFeed = ({ coreUnits }: Props) => {
  const { isLight } = useThemeContext();
  const {
    columns,
    clearFilters,
    filtersActive,
    handleClearSearch,
    searchText,
    setSearchText,
    selectElements,
    activeElements,
    handleSelectChange,
    filtersVisible,
    toggleFiltersVisible,

    activities,
    loadMore,
    isLoadingMore,
    hasMoreElements,
  } = useGlobalActivityMvvm2(coreUnits);

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
      />
      <Container isLight={isLight}>
        <InnerPage>
          <FiltersContainer>
            <Reset filtersVisible={filtersVisible}>
              <ResetButton onClick={clearFilters} disabled={!filtersActive} hasIcon={false} labelMobile="Reset" />
            </Reset>
            <CoreUnitsSelect filtersVisible={filtersVisible}>
              <CustomMultiSelect
                label="Core Unit"
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
                  content: 'All Core Units',
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
                handleClearSearch={handleClearSearch}
                placeholder="Search"
                value={searchText}
                onChange={(value: string) => {
                  setSearchText(value);
                }}
              />
            </Search>
            <ButtonFilter
              isLight={isLight}
              isOpen={filtersVisible}
              isActive={filtersActive}
              onClick={toggleFiltersVisible}
            >
              <Filter
                fill={
                  filtersActive || filtersVisible ? (isLight ? '#1AAB9B' : '#098C7D') : isLight ? '#231536' : 'white'
                }
              />
            </ButtonFilter>
          </FiltersContainer>
          <TableWrapper>
            <ActivityTable2
              columns={columns}
              shortCode={'global'}
              hasFilter={filtersActive}
              clearAction={clearFilters}
              isGlobal
              activities={activities}
              loadMore={loadMore}
              isLoadingMore={isLoadingMore}
              hasMoreElements={hasMoreElements}
            />
          </TableWrapper>
          <Title isLight={isLight}>Additional Notes</Title>
          <Paragraph isLight={isLight}>
            Change tracking displays all changes that have occurred regarding all Core Unit activity. Here you will be
            able to see all previous modifications the Core Units made to its Expense Reports, FTEs, and more
          </Paragraph>
        </InnerPage>
      </Container>
    </Wrapper>
  );
};

export default GlobalActivityFeed;

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '64px',
  flex: 1,
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/bg-page-dark.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  padding: '0 16px 128px',

  [lightTheme.breakpoints.up('table_834')]: {
    padding: '0 32px 128px',
  },
}));

const InnerPage = styled.div({
  display: 'block',
  margin: '24px auto 0',
  width: '100%',
  maxWidth: '1312px',
  textAlign: 'left',

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: '32px',
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

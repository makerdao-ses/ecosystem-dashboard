import styled from '@emotion/styled';
import React from 'react';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import CoreUnitSelectItem from '../../components/core-unit-select-item/core-unit-select-item';
import ActivityTable from '../../components/cu-activity-table/cu-activity-table';
import { CustomMultiSelect, SelectItemProps } from '../../components/custom-multi-select/custom-multi-select';
import ResetButton from '../../components/reset-button/reset-button';
import { SearchInput } from '../../components/search-input/search-input';
import { Paragraph, Title } from '../cu-activity/cu-activity';
import { SmallSeparator } from '../cu-table/cu-table-filters';
import { useGlobalActivityMvvm } from './global-activity.mvvm';

interface Props {
  coreUnits: CoreUnitDto[];
}

export default ({ coreUnits }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';

  const {
    columns,
    activityFeed,
    clearFilters,
    filtersActive,
    inputRef,
    handleCleanSearch,
    searchText,
    setSearchText,
    selectElements,
    activeElements,
    handleSelectChange,
  } = useGlobalActivityMvvm(coreUnits);

  return (
    <Wrapper>
      <Container isLight={isLight}>
        <InnerPage>
          <Title isLight={isLight} fontSize={'20px'}>
            Activity Feed
          </Title>
          <Paragraph isLight={isLight}>
            Change tracking displays all changes that have occurred regarding all Core unit activity. Here you will be
            able to see all previous modifications the Core units made to their Expense Reports, FTEs, and more.
          </Paragraph>
          <FiltersContainer>
            <ResetButton onClick={clearFilters} disabled={!filtersActive} />
            <CustomMultiSelect
              label="Core Unit"
              activeItems={activeElements}
              items={selectElements}
              width={138}
              onChange={(value: string[]) => {
                handleSelectChange(value);
              }}
              withAll={false}
              popupContainerWidth={360}
              listItemWidth={330}
              customItemRender={(props: SelectItemProps) => <CoreUnitSelectItem {...props} />}
            />
            <SmallSeparator isLight={isLight} />
            <SearchInput
              inputRef={inputRef}
              handleCleanSearch={handleCleanSearch}
              placeholder="Search"
              value={searchText}
              onChange={(value: string) => {
                setSearchText(value);
              }}
            />
          </FiltersContainer>
          <TableWrapper>
            <ActivityTable columns={columns} shortCode={'global'} activityFeed={activityFeed} />
          </TableWrapper>
        </InnerPage>
      </Container>
    </Wrapper>
  );
};

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
  display: 'flex',
  gap: '16px',
  justifyContent: 'flex-end',
  marginBottom: '32px',
});

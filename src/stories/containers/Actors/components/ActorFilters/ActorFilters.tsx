import styled from '@emotion/styled';
import { CategoryChip } from '@ses/components/CategoryChip/CategoryChip';
import { CustomMultiSelect } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import ResetButton from '@ses/components/ResetButton/ResetButton';
import { ActorCategory } from '@ses/core/models/interfaces/types';
import React from 'react';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
interface Props {
  selectElements: MultiSelectItem[];
  activeElements: string[];
  handleSelectChange: (value: string[]) => void;
  handleResetFilter: () => void;
  readMore: boolean;
  filteredCategories: string[];
  categoriesCount: { [id: string]: number };
  onChange?: (items: string[]) => void;
}
const categories = Object.values(ActorCategory) as string[];
const ActorFilters: React.FC<Props> = ({
  handleResetFilter,
  readMore,
  filteredCategories,
  categoriesCount,
  onChange,
}) => (
  <FiltersContainer>
    <Reset>
      <ResetButton
        onClick={handleResetFilter}
        disabled={filteredCategories.length <= 0}
        hasIcon={false}
        label="Reset filters"
      />
    </Reset>
    <FilterActorsContainer readMore={readMore}>
      <CustomMultiSelectStyled
        popupContainerHeight={180}
        positionRight={true}
        label="Actor Role"
        activeItems={filteredCategories}
        customAll={{
          id: 'All',
          content: <CategoryChip category={'All'} />,
          count: categoriesCount.All,
        }}
        width={144}
        popupContainerWidth={250}
        listItemWidth={218}
        items={categories.map((cat) => ({
          id: cat,
          content: <CategoryChip category={cat} hasPascalCaseToNormalString />,
          count: categoriesCount[cat],
        }))}
        onChange={onChange}
      />
    </FilterActorsContainer>
  </FiltersContainer>
);

export default ActorFilters;

const FiltersContainer = styled.div({
  display: 'grid',
  gap: '32px',

  gridTemplateColumns: 'auto auto',
  gridTemplateRows: 'auto',
  placeItems: 'space-between',
  justifyContent: 'end',

  gridTemplateAreas: `
  "reset filterDelegates"
  `,
  '@media (min-width: 834px)': {
    gap: '16px',
    width: '100%',
    gridTemplateRows: 'auto',
    margin: '0px',
    justifyContent: 'flex-end',
    gridTemplateAreas: '"reset filterDelegates"',
  },
});

const Reset = styled.div({
  gridArea: 'reset',
  justifyContent: 'flex-end',
  '@media (min-width: 834px)': {
    display: 'flex',
    marginLeft: -20,
  },
});

const FilterActorsContainer = styled.div<{ readMore?: boolean }>(({ readMore }) => ({
  display: 'flex',
  marginRight: readMore ? 11 : 'unset',
  gridArea: 'filterDelegates',
  '@media (min-width: 834px)': {
    display: 'flex',
    marginRight: 0,
  },
}));

const CustomMultiSelectStyled = styled(CustomMultiSelect)({
  right: 0,
});

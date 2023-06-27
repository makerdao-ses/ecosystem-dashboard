import styled from '@emotion/styled';
import { CustomMultiSelect } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import ResetButton from '@ses/components/ResetButton/ResetButton';
import React from 'react';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
interface Props {
  selectElements: MultiSelectItem[];
  activeElements: string[];
  handleSelectChange: (value: string[]) => void;
  handleResetFilter: () => void;
  readMore: boolean;
}
const ActorFilters: React.FC<Props> = ({
  selectElements,
  activeElements,
  handleSelectChange,
  handleResetFilter,
  readMore,
}) => (
  <FiltersContainer>
    <Reset>
      <ResetButton
        onClick={handleResetFilter}
        disabled={activeElements.length <= 0}
        hasIcon={false}
        label="Reset filters"
      />
    </Reset>
    <FilterActorsContainer readMore={readMore}>
      <CustomMultiSelect
        positionRight={true}
        label="Actor Role"
        activeItems={activeElements}
        items={selectElements}
        width={144}
        onChange={(value: string[]) => {
          handleSelectChange(value);
        }}
        withAll
        popupContainerWidth={343}
        listItemWidth={311}
        customAll={{
          content: 'All Actors',
          id: 'all',
          params: { isAll: true },
          count: 0,
        }}
      />
    </FilterActorsContainer>
  </FiltersContainer>
);

export default ActorFilters;

const FiltersContainer = styled.div({
  display: 'grid',
  gap: '32px',
  marginBottom: '32px',
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

import styled from '@emotion/styled';

import { CustomMultiSelect } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import ResetButton from '@ses/components/ResetButton/ResetButton';
import { Close } from '@ses/components/svg/close';

import { useThemeContext } from '@ses/core/context/ThemeContext';

import React from 'react';
import DelegateSelectItem from './DelegateSelectItem';
import type { SelectItemProps } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const FilterDelegate = () => {
  const { isLight } = useThemeContext();
  const handleSelectChange = (value: string[]) => {
    console.log(value);
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleResetFilter = () => {};
  return (
    <FiltersContainer>
      <Reset>
        <ResetButton onClick={handleResetFilter} disabled={true} hasIcon={false} />
      </Reset>
      <FilterDelegates>
        <CustomMultiSelect
          label="Recognized Delegates"
          activeItems={[]}
          items={[]}
          width={224}
          onChange={(value: string[]) => {
            handleSelectChange(value);
          }}
          withAll
          popupContainerWidth={360}
          listItemWidth={330}
          customAll={{
            content: 'All Recognized Delegates',
            id: 'all',
            params: { isAll: true },
            count: 0,
          }}
          customItemRender={(props: SelectItemProps) => <DelegateSelectItem {...props} />}
        />
      </FilterDelegates>

      <ResponsiveButton onClick={handleResetFilter} isLight={isLight}>
        <Close width={10} height={10} fill={'#D1DEE6'} />
      </ResponsiveButton>
    </FiltersContainer>
  );
};

export default FilterDelegate;

const FiltersContainer = styled.div({
  display: 'grid',
  gap: '16px',
  marginBottom: '32px',
  gridTemplateColumns: 'auto 34px',
  gridTemplateRows: 'auto auto',
  placeItems: 'space-between',
  justifyContent: 'end',
  width: '100%',
  gridTemplateAreas: `
  "filterDelegates buttonFilter"
  `,
  '@media (min-width: 834px)': {
    gridTemplateRows: 'auto',
    gridTemplateColumns: 'auto auto',
    justifyContent: 'flex-end',
    gridTemplateAreas: '"reset filterDelegates"',
  },
});

const Reset = styled.div({
  gridArea: 'reset',
  display: 'none',
  justifyContent: 'flex-end',
  '@media (min-width: 834px)': {
    display: 'flex',
  },
});

const FilterDelegates = styled.div({
  display: 'flex',
  gridArea: 'filterDelegates',
  '@media (min-width: 834px)': {
    display: 'flex',
  },
});

const ResponsiveButton = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  gridArea: 'buttonFilter',
  justifySelf: 'flex-end',
  height: '34px',
  width: '34px',
  border: isLight ? '1px solid #D4D9E1' : '1px solid #10191F',
  borderRadius: '22px',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (min-width: 834px)': {
    display: 'none',
  },
}));

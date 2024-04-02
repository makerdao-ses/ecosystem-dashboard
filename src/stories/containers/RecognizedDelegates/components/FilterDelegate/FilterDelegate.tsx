import styled from '@emotion/styled';

import { useMediaQuery } from '@mui/material';
import { CustomMultiSelect } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import ResetButton from '@ses/components/ResetButton/ResetButton';
import { Close } from '@ses/components/svg/close';

import { useThemeContext } from '@ses/core/context/ThemeContext';

import { getLabelMultiselectFilters } from '@ses/core/utils/filters';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import DelegateSelectItem from './DelegateSelectItem';
import type { SelectItemProps, MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  items: MultiSelectItem[];
  activeItems: string[];
  handleSelectChange: (value: string[]) => void;
  handleResetFilter: () => void;
}

const FilterDelegate: React.FC<Props> = ({ items, activeItems, handleSelectChange, handleResetFilter }) => {
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const { isLight } = useThemeContext();
  const isEnable = isLight
    ? activeItems.length > 0
      ? '#231536'
      : '#d1dee6'
    : activeItems.length > 0
    ? '#D2D4EF'
    : '#48495F';

  const label = getLabelMultiselectFilters(items, activeItems, isMobile, 'Recognized Delegates');
  return (
    <FiltersContainer>
      <Reset>
        <ResetButton
          onClick={handleResetFilter}
          disabled={activeItems.length <= 0}
          hasIcon={false}
          label="Reset filters"
        />
      </Reset>
      <FilterDelegatesContainer>
        <CustomMultiSelect
          positionRight={true}
          label={label as string}
          activeItems={activeItems}
          items={items}
          onChange={(value: string[]) => {
            handleSelectChange(value);
          }}
          withAll
          popupContainerWidth={343}
          showMetricOneItemSelect
          listItemWidth={311}
          customAll={{
            content: 'All Recognized Delegates',
            id: 'all',
            params: { isAll: true },
            count: 0,
          }}
          customItemRender={(props: SelectItemProps) => <DelegateSelectItem {...props} />}
        />
      </FilterDelegatesContainer>

      <ResponsiveButton onClick={handleResetFilter} isLight={isLight}>
        <Close width={10} height={10} fill={isEnable} fillDark={isEnable} />
      </ResponsiveButton>
    </FiltersContainer>
  );
};

export default FilterDelegate;

const FiltersContainer = styled.div({
  display: 'grid',
  gap: '16px',
  marginBottom: '32px',
  gridTemplateColumns: 'auto auto',
  gridTemplateRows: 'auto',
  placeItems: 'space-between',
  justifyContent: 'end',
  width: 343,
  margin: '0 auto',
  gridTemplateAreas: `
  "filterDelegates buttonFilter"
  `,
  '@media (min-width: 834px)': {
    width: 690,
    gridTemplateRows: 'auto',
    margin: 'none',
    gap: '14px',
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

const FilterDelegatesContainer = styled.div({
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

import styled from '@emotion/styled';
import { CustomButton } from '@ses/components/CustomButton/CustomButton';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { CostBreakdownFilterValue } from '../../financesOverviewTypes';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface CostBreakdownFilterProps {
  selectedFilter: CostBreakdownFilterValue;
  onFilterChange: (filter: CostBreakdownFilterValue) => void;
}

const CostBreakdownFilter: React.FC<CostBreakdownFilterProps> = ({ selectedFilter, onFilterChange }) => {
  const { isLight } = useThemeContext();
  const handleFilterClick = (value: CostBreakdownFilterValue) => {
    if (value !== selectedFilter) {
      // there was an actual change, then fire the event
      onFilterChange(value);
    }
  };

  return (
    <FiltersContainer>
      <FilterButton
        isLight={isLight}
        onClick={() => handleFilterClick('By budget')}
        selected={selectedFilter === 'By budget'}
        label={'By Budget'}
        allowsHover={false}
      />
      <FilterButton
        isLight={isLight}
        onClick={() => handleFilterClick('By Category')}
        selected={selectedFilter === 'By Category'}
        label={'By Expense Category'}
        allowsHover={false}
        padding={'8px 23px!important'}
      />
    </FiltersContainer>
  );
};

export default CostBreakdownFilter;

const FiltersContainer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 16,
});

const FilterButton = styled(CustomButton)<WithIsLight & { selected?: boolean }>(({ isLight, selected = false }) => ({
  background: selected ? '#1AAB9B' : 'transparent',
  border: `1px solid ${selected ? 'transparent' : isLight ? '#D4D9E1' : '#708390'}`,
  padding: '6px 24px',

  '& > div': {
    color: selected ? '#FFFFFF' : isLight ? '#9FAFB9' : '#ADAFD4',
    lineHeight: '16px',
  },

  ...(!selected
    ? {
        '&:hover': {
          background: isLight ? '#F6F8F9' : '#10191F',
          border: `1px solid ${isLight ? '#ECF1F3' : '#1E2C37'}}`,

          '&:hover > div': {
            color: `${isLight ? '#787A9B' : '#D2D4EF'}!important`,
          },
        },
      }
    : {}),
}));

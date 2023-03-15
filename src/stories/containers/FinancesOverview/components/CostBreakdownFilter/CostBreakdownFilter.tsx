import styled from '@emotion/styled';
import { CustomButton } from '@ses/components/CustomButton/CustomButton';
import React from 'react';
import type { CostBreakdownFilterValue } from '../../financesOverviewTypes';

interface CostBreakdownFilterProps {
  selectedFilter: CostBreakdownFilterValue;
  onFilterChange: (filter: CostBreakdownFilterValue) => void;
}

const CostBreakdownFilter: React.FC<CostBreakdownFilterProps> = ({ selectedFilter, onFilterChange }) => {
  const handleFilterClick = (value: CostBreakdownFilterValue) => {
    if (value !== selectedFilter) {
      // there was an actual change, then fire the event
      onFilterChange(value);
    }
  };

  return (
    <FiltersContainer>
      <FilterButton
        onClick={() => handleFilterClick('By budget')}
        selected={selectedFilter === 'By budget'}
        label={'By Budget'}
        allowsHover={false}
      />
      <FilterButton
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

const FilterButton = styled(CustomButton)<{ selected?: boolean }>(({ selected = false }) => ({
  background: selected ? '#1AAB9B' : '#FFFFFF',
  border: `1px solid ${selected ? 'transparent' : '#D4D9E1'}`,
  padding: '6px 24px',

  '& > div': {
    color: selected ? '#FFFFFF' : '#9FAFB9',
    lineHeight: '16px',
  },
}));

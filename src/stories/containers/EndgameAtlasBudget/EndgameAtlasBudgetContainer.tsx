import PageContainer from '@ses/components/Container/PageContainer';
import { YEARS_FINANCES_SELECTED } from '@ses/core/utils/const';
import React from 'react';
import BreadcrumbYearNavigation from '../Finances/components/SectionPages/BreadcrumbYearNavigation';
import { useEndgameAtlasBudget } from './useEndgameAtlasBudget';

const EndgameAtlasBudgetContainer = () => {
  const { trailingAddress, handleChangeYearsEndgameAtlasBudget, year } = useEndgameAtlasBudget();
  return (
    <PageContainer>
      <BreadcrumbYearNavigation
        trailingAddress={trailingAddress}
        years={YEARS_FINANCES_SELECTED}
        handleChange={handleChangeYearsEndgameAtlasBudget}
        selectedValue={year}
      />
    </PageContainer>
  );
};
export default EndgameAtlasBudgetContainer;

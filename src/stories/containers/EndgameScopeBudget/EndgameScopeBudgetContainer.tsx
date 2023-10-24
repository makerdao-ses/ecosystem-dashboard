import PageContainer from '@ses/components/Container/PageContainer';
import { YEARS_FINANCES_SELECTED } from '@ses/core/utils/const';
import React from 'react';
import BreadcrumbYearNavigation from '../Finances/components/SectionPages/BreadcrumbYearNavigation';
import { useEndgameScopeBudget } from './useEndgameScopeBudget';

const EndgameScopeBudgetContainer = () => {
  const { trailingAddress, handleChangeYearsEndgameScopeBudget, year } = useEndgameScopeBudget();
  return (
    <PageContainer>
      <BreadcrumbYearNavigation
        trailingAddress={trailingAddress}
        years={YEARS_FINANCES_SELECTED}
        handleChange={handleChangeYearsEndgameScopeBudget}
        selectedValue={year}
      />
    </PageContainer>
  );
};
export default EndgameScopeBudgetContainer;

import PageContainer from '@ses/components/Container/PageContainer';
import { YEARS_FINANCES_SELECTED } from '@ses/core/utils/const';
import React from 'react';
import BreadcrumbYearNavigation from '../Finances/components/SectionPages/BreadcrumbYearNavigation';
import { useMakerDAOLegacyBudget } from './useMakerDAOLegacyBudget';

const MakerDAOLegacyBudget = () => {
  const { handleChangeYearsEMakerDAOLegacyBudget, trailingAddress, year } = useMakerDAOLegacyBudget();
  return (
    <PageContainer>
      <BreadcrumbYearNavigation
        trailingAddress={trailingAddress}
        years={YEARS_FINANCES_SELECTED}
        handleChange={handleChangeYearsEMakerDAOLegacyBudget}
        selectedValue={year}
      />
    </PageContainer>
  );
};

export default MakerDAOLegacyBudget;

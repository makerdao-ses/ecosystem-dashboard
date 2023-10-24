import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import IconTitle from '@ses/components/IconTitle/IconTitle';
import { YEARS_FINANCES_SELECTED } from '@ses/core/utils/const';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BreadcrumbYearNavigation from '../Finances/components/SectionPages/BreadcrumbYearNavigation';
import LegacyIcon from './components/LegacyIcon';
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
      <Container>
        <ContainerTitle>
          <IconTitle icon={<LegacyIcon />} title="MakerDAO Legacy Budget" />
        </ContainerTitle>
      </Container>
    </PageContainer>
  );
};

export default MakerDAOLegacyBudget;

const ContainerTitle = styled.div({
  marginTop: 24,
  marginBottom: 24,
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 32,
    marginTop: 32,
    marginBottom: 64,
  },
});

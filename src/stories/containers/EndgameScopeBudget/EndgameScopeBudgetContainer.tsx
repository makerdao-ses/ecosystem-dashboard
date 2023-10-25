import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import IconTitle from '@ses/components/IconTitle/IconTitle';
import { YEARS_FINANCES_SELECTED } from '@ses/core/utils/const';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BreadcrumbYearNavigation from '../Finances/components/SectionPages/BreadcrumbYearNavigation';
import ScopeIcon from './components/ScopeIcon';
import { useEndgameScopeBudget } from './useEndgameScopeBudget';

const EndgameScopeBudgetContainer = () => {
  const { trailingAddress, handleChangeYearsEndgameScopeBudget, year, isMobile } = useEndgameScopeBudget();
  return (
    <PageContainer>
      <BreadcrumbYearNavigation
        trailingAddress={trailingAddress}
        years={YEARS_FINANCES_SELECTED}
        handleChange={handleChangeYearsEndgameScopeBudget}
        selectedValue={year}
        trailingAddressDesk={trailingAddress}
        title="Endgame Scope Budget"
      />
      <Container>
        <ContainerTitle>
          <IconTitle
            icon={<ScopeIcon width={isMobile ? 32 : 62} height={isMobile ? 32 : 62} />}
            title="Endgame Scope Budget"
          />
        </ContainerTitle>
      </Container>
    </PageContainer>
  );
};
export default EndgameScopeBudgetContainer;

const ContainerTitle = styled.div({
  marginTop: 24,
  marginBottom: 24,
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 32,
    marginTop: 32,
    marginBottom: 64,
  },
});

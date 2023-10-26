import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import IconTitle from '@ses/components/IconTitle/IconTitle';
import { YEARS_FINANCES_SELECTED } from '@ses/core/utils/const';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BreadcrumbYearNavigation from '../Finances/components/SectionPages/BreadcrumbYearNavigation';

import { useEndgameBudgetContainerSecondLevel } from './useEndgameBudgetContainerSecondLevel';
import type { BudgetsFinances } from '../Finances/utils/types';

interface Props {
  budgets: BudgetsFinances[];
}

const EndgameBudgetContainerSecondLevel: React.FC<Props> = ({ budgets }) => {
  const { trailingAddressDesk, trailingAddress, handleChangeYearsEndgameAtlasBudget, year, title, icon } =
    useEndgameBudgetContainerSecondLevel(budgets);
  return (
    <PageContainer>
      <BreadcrumbYearNavigation
        trailingAddress={trailingAddress}
        years={YEARS_FINANCES_SELECTED}
        handleChange={handleChangeYearsEndgameAtlasBudget}
        selectedValue={year}
        trailingAddressDesk={trailingAddressDesk}
        title={title || ''}
      />
      <Container>
        <ContainerTitle>
          <IconTitle icon={icon} title={title || ''} />
        </ContainerTitle>
      </Container>
    </PageContainer>
  );
};
export default EndgameBudgetContainerSecondLevel;

const ContainerTitle = styled.div({
  marginTop: 24,
  marginBottom: 24,
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 32,
    marginTop: 32,
    marginBottom: 64,
  },
});

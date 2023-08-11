import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import BreadcrumbYearNavigation from './SeccionPages/BreadcrumbYearNavigation';
import BreakdownChart from './SeccionPages/BreakdownChart';
import BreakdownTable from './SeccionPages/BreakdownTable';
import CardChartOverview from './SeccionPages/CardChartOverview/CardChartOverview';
import LatestExpenseReports from './SeccionPages/LatestExpenseReports';
import MakerDAOExpenseMetrics from './SeccionPages/MakerDAOExpenseMetrics';
import { useFinances } from './useFinances';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const FinancesContainer = () => {
  const { isLight } = useThemeContext();
  const {
    years,
    handleChange,
    handleClose,
    handleOpen,
    isOpen,
    value,
    trailingAddress,
    filters,
    filterSelected,
    handleSelectFilter,
    actuals,
    budgetCap,
    prediction,
  } = useFinances();
  return (
    <PageContainer>
      <Container>
        <BreadcrumbYearNavigation
          trailingAddress={trailingAddress}
          years={years}
          isOpen={isOpen}
          handleChange={handleChange}
          onClose={handleClose}
          onOpen={handleOpen}
          selectedValue={value}
        />
        <ContainerTitle isLight={isLight}>MakerDAO Finances</ContainerTitle>
        <ContainerSections>
          <CardChartOverview
            filters={filters}
            filterSelected={filterSelected}
            handleSelectFilter={handleSelectFilter}
            actuals={actuals}
            budgetCap={budgetCap}
            prediction={prediction}
          />

          <BreakdownChart />
          <BreakdownTable />
          <MakerDAOExpenseMetrics />
          <LatestExpenseReports />
        </ContainerSections>
      </Container>
    </PageContainer>
  );
};

export default FinancesContainer;

const ContainerTitle = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 32,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : 'red',
  marginTop: 32,
  marginBottom: 64,
}));

const ContainerSections = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 64,
});

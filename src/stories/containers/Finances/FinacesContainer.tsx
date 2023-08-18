import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import OverviewCardMobile from './components/OverviewCardMobile/OverviewCardMobile';
import BreadcrumbYearNavigation from './components/SeccionPages/BreadcrumbYearNavigation';
import BreakdownChart from './components/SeccionPages/BreakdownChart';
import BreakdownTable from './components/SeccionPages/BreakdownTable';
import CardChartOverview from './components/SeccionPages/CardChartOverview/CardChartOverview';
import CardsNavigation from './components/SeccionPages/CardsNavigation/CardsNavigation';
import LatestExpenseReports from './components/SeccionPages/LatestExpenseReports';
import MakerDAOExpenseMetrics from './components/SeccionPages/MakerDAOExpenseMetrics';
import { useFinances } from './useFinances';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const FinancesContainer = () => {
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
    isLight,
    actuals,
    budgetCap,
    prediction,
    doughnutSeriesData,
    cardsNavigationInformation,
  } = useFinances();
  return (
    <PageContainer>
      <BreadcrumbYearNavigation
        trailingAddress={trailingAddress}
        years={years}
        isOpen={isOpen}
        handleChange={handleChange}
        onClose={handleClose}
        onOpen={handleOpen}
        selectedValue={value}
      />

      <Container>
        <ContainerTitle isLight={isLight}>MakerDAO Finances</ContainerTitle>
        <ContainerSections>
          <WrapperDesk>
            <CardChartOverview
              filters={filters}
              filterSelected={filterSelected}
              handleSelectFilter={handleSelectFilter}
              actuals={actuals}
              budgetCap={budgetCap}
              prediction={prediction}
              doughnutSeriesData={doughnutSeriesData}
            />
          </WrapperDesk>
          <WrapperMobile>
            <OverviewCardMobile actuals={actuals} budgetCap={budgetCap} prediction={prediction} />
          </WrapperMobile>
          <CardsNavigation cardsNavigationInformation={cardsNavigationInformation} />
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
  fontSize: 20,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : 'red',
  marginTop: 24,
  marginBottom: 24,
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 32,
    marginTop: 32,
    marginBottom: 64,
  },
}));

const ContainerSections = styled.div({
  gap: 16,
  display: 'flex',
  flexDirection: 'column',
  [lightTheme.breakpoints.up('desktop_1440')]: {
    gap: 64,
  },
});

const WrapperDesk = styled.div({
  display: 'none',
  [lightTheme.breakpoints.up('desktop_1440')]: {
    display: 'flex',
    flexDirection: 'column',
    gap: 64,
  },
});

const WrapperMobile = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
});

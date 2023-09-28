import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import OverviewCardMobile from './components/OverviewCardMobile/OverviewCardMobile';
import BreadcrumbYearNavigation from './components/SeccionPages/BreadcrumbYearNavigation';
import BreakdownChart from './components/SeccionPages/BreakdownChart';
import BreakdownTable from './components/SeccionPages/BreakdownTable';
import CardChartOverview from './components/SeccionPages/CardChartOverview/CardChartOverview';
import CardsNavigation from './components/SeccionPages/CardsNavigation/CardsNavigation';
import DelegateExpenseTrendFinances from './components/SeccionPages/DelegateExpenseTrendFinances/DelegateExpenseTrendFinances';
import MakerDAOExpenseMetrics from './components/SeccionPages/MakerDAOExpenseMetrics';
import { useFinances } from './useFinances';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const FinancesContainer = () => {
  const [isEnabled] = useFlagsActive();
  const {
    years,
    trailingAddress,
    filters,
    filterSelected,
    handleSelectFilter,
    isLight,
    actuals,
    budgetCap,
    prediction,
    doughnutSeriesData,
    periodicSelectionFilter,
    handleChangeYears,
    handleClosePeriod,
    handleCloseYear,
    handleOpenPeriod,
    handleOpenYear,
    handlePeriodChange,
    isOpenPeriod,
    isOpenYear,
    periodFilter,
    year,
    cardsNavigationInformation,
    activeMetrics,
    handleSelectChangeMetrics,
    selectMetrics,
    handleResetMetrics,
    headersExpenseReport,
    reportExpenseItems,
    onSortClick,

    handleLoadMore,
    showSome,
    getAllMetricsValuesTotal,
  } = useFinances();
  const ConditionalWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    const Wrapper =
      periodFilter === 'Quarterly' ? <ContainerTable>{children}</ContainerTable> : <Container>{children}</Container>;
    return Wrapper;
  };

  return (
    <PageContainer>
      <BreadcrumbYearNavigation
        trailingAddress={trailingAddress}
        years={years}
        isOpen={isOpenYear}
        handleChange={handleChangeYears}
        onClose={handleCloseYear}
        onOpen={handleOpenYear}
        selectedValue={year}
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
        </ContainerSections>
      </Container>

      {isEnabled('FEATURE_FINANCES_BREAK_DOWN_CHART_SECTION') && <BreakdownChart />}
      <ConditionalWrapper>
        <BreakdownTable
          activeItems={activeMetrics}
          handleChange={handlePeriodChange}
          handleResetFilter={handleResetMetrics}
          handleSelectChange={handleSelectChangeMetrics}
          isOpen={isOpenPeriod}
          metrics={selectMetrics}
          periodicSelectionFilter={periodicSelectionFilter}
          selectedValue={periodFilter}
          onClose={handleClosePeriod}
          onOpen={handleOpenPeriod}
          year={year}
          headerTableMetrics={getAllMetricsValuesTotal()}
          metricTotal={getAllMetricsValuesTotal()}
        />
      </ConditionalWrapper>
      <Container>
        {isEnabled('FEATURE_FINANCES_MAKERDAO_EXPENSE_METRICS_SECTION') && <MakerDAOExpenseMetrics />}
        <ContainerLastReport>
          <DelegateExpenseTrendFinances
            columns={headersExpenseReport}
            expenseReport={reportExpenseItems}
            sortClick={onSortClick}
            handleLoadMore={handleLoadMore}
            showSome={showSome}
          />
        </ContainerLastReport>
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
  color: isLight ? '#231536' : '#D2D4EF',
  marginTop: 24,
  marginBottom: 24,
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 32,
    marginTop: 32,
    marginBottom: 64,
  },
}));

const ContainerSections = styled.div({
  gap: 16,
  display: 'flex',
  flexDirection: 'column',
  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 64,
  },
});

const WrapperDesk = styled.div({
  display: 'none',
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    gap: 64,
  },
});

const WrapperMobile = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
});

const ContainerTable = styled.div({
  paddingLeft: 16,
  paddingRight: 16,
  [lightTheme.breakpoints.up('tablet_768')]: {
    paddingLeft: 32,
    paddingRight: 32,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: 1184,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    maxWidth: 1312,
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    maxWidth: 'revert',
    marginLeft: 64,
    marginRight: 64,
    justifyContent: 'center',
  },
});

const ContainerLastReport = styled.div({
  marginTop: 40,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 64,
  },
});

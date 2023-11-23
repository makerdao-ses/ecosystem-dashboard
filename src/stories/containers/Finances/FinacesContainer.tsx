import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BreakdownChartSection from './components/BreakdownChartSection/BreakdownChartSection';
import ConditionalWrapper from './components/ConditionalWrapper/ConditionalWrapper';
import OverviewCardMobile from './components/OverviewCardMobile/OverviewCardMobile';
import BreadcrumbYearNavigation from './components/SectionPages/BreadcrumbYearNavigation';
import BreakdownTable from './components/SectionPages/BreakdownTable';
import CardChartOverview from './components/SectionPages/CardChartOverview/CardChartOverview';
import CardsNavigation from './components/SectionPages/CardsNavigation/CardsNavigation';
import DelegateExpenseTrendFinances from './components/SectionPages/DelegateExpenseTrendFinances/DelegateExpenseTrendFinances';
import MakerDAOExpenseMetricsFinances from './components/SectionPages/MakerDAOExpenseMetrics/MakerDAOExpenseMetrics';
import { useFinances } from './useFinances';
import { mockDataTableQuarterlyArray } from './utils/mockData';
import type { BudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  budgets: Budget[];
  yearsRange: string[];
  initialYear: string;
  budgetsAnalytics: BudgetAnalytic[];
}

const FinancesContainer: React.FC<Props> = ({ budgets, yearsRange, initialYear, budgetsAnalytics }) => {
  const [isEnabled] = useFlagsActive();
  const {
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
    handlePeriodChange,
    periodFilter,
    year,
    cardsToShow,
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
    defaultMetricsWithAllSelected,
    maxItems,
    minItems,
    allowSelectAll,
    popupContainerHeight,
    selectedBreakdownMetric,
    selectedBreakdownGranularity,
    handleBreakdownMetricChange,
    handleBreakdownGranularityChange,
    loadMoreCards,
    handleLoadMoreCards,
    periodFilterMetrics,
    handlePeriodChangeMetrics,
    newActuals,
    newBudget,
    newForecast,
    newNetExpensesOffChain,
    newNetExpensesOnChain,
    isDisabled,
    handleResetFilterBreakDownChart,
  } = useFinances(budgets, initialYear, budgetsAnalytics);

  return (
    <PageContainer>
      <SEOHead
        title="MakerDAO | Finances"
        description="MakerDAO Finances page provides a structured overview of MakerDAO's budgets, from high-level finances to detailed legacy and endgame allocations "
        image={{
          src: toAbsoluteURL('/assets/img/social-385x200.png'),
          width: 385,
          height: 200,
        }}
        twitterImage={toAbsoluteURL('/assets/img/social-1200x630.png')}
      />
      <BreadcrumbYearNavigation
        trailingAddress={trailingAddress}
        years={yearsRange}
        handleChange={handleChangeYears}
        selectedValue={year}
        trailingAddressDesk={trailingAddress}
        title="Finances"
        hasIcon={false}
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
          <CardsNavigation
            cardsNavigationInformation={cardsToShow}
            handleLoadMoreCards={handleLoadMoreCards}
            loadMoreCards={loadMoreCards}
          />
        </ContainerSections>

        {isEnabled('FEATURE_FINANCES_BREAKDOWN_CHART_SECTION') && (
          <BreakdownChartSection
            year={year}
            selectedMetric={selectedBreakdownMetric}
            selectedGranularity={selectedBreakdownGranularity}
            onMetricChange={handleBreakdownMetricChange}
            onGranularityChange={handleBreakdownGranularityChange}
            isDisabled={isDisabled}
            handleResetFilter={handleResetFilterBreakDownChart}
          />
        )}
      </Container>

      <ConditionalWrapper period={periodFilter}>
        <BreakdownTable
          handleResetMetrics={defaultMetricsWithAllSelected}
          activeItems={activeMetrics}
          handleChange={handlePeriodChange}
          handleResetFilter={handleResetMetrics}
          handleSelectChange={handleSelectChangeMetrics}
          metrics={selectMetrics}
          periodicSelectionFilter={periodicSelectionFilter}
          selectedValue={periodFilter}
          year={year}
          headerTableMetrics={getAllMetricsValuesTotal()}
          metricTotal={getAllMetricsValuesTotal()}
          maxItems={maxItems}
          minItems={minItems}
          allowSelectAll={allowSelectAll}
          popupContainerHeight={popupContainerHeight}
          breakdownTable={mockDataTableQuarterlyArray}
        />
      </ConditionalWrapper>
      <Container>
        {isEnabled('FEATURE_FINANCES_MAKERDAO_EXPENSE_METRICS_SECTION') && (
          <MakerDAOExpenseMetricsFinances
            handleChange={handlePeriodChangeMetrics}
            periodicSelectionFilter={periodicSelectionFilter}
            selectedValue={periodFilterMetrics}
            newActuals={newActuals}
            newBudget={newBudget}
            newForecast={newForecast}
            newNetExpensesOffChain={newNetExpensesOffChain}
            newNetExpensesOnChain={newNetExpensesOnChain}
            year={year}
          />
        )}
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

const ContainerLastReport = styled.div({
  marginTop: 40,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 64,
  },
});

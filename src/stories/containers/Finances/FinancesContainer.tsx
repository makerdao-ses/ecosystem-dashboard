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
import BreakdownTable from './components/SectionPages/BreakdownTable/BreakdownTable';
import { getDataTableFromPeriod } from './components/SectionPages/BreakdownTable/utils';
import CardChartOverview from './components/SectionPages/CardChartOverview/CardChartOverview';
import CardsNavigation from './components/SectionPages/CardsNavigation/CardsNavigation';
import DelegateExpenseTrendFinances from './components/SectionPages/DelegateExpenseTrendFinances/DelegateExpenseTrendFinances';
import MakerDAOExpenseMetricsFinances from './components/SectionPages/MakerDAOExpenseMetrics/MakerDAOExpenseMetrics';
import { useFinances } from './useFinances';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  budgets: Budget[];
  yearsRange: string[];
  initialYear: string;
}

const FinancesContainer: React.FC<Props> = ({ budgets, yearsRange, initialYear }) => {
  const [isEnabled] = useFlagsActive();
  const {
    filters,
    filterSelected,
    handleSelectFilter,
    isLight,
    actuals,
    budgetCap,
    prediction,
    doughnutSeriesData,
    handleChangeYears,
    year,
    cardsToShow,
    selectedBreakdownMetric,
    breakdownTable,
    selectedBreakdownGranularity,
    handleBreakdownMetricChange,
    handleBreakdownGranularityChange,
    loadMoreCards,
    handleLoadMoreCards,
    isDisabled,
    handleResetFilterBreakDownChart,
    budgetsAnalyticsMonthly,
    budgetsAnalyticsQuarterly,
    series,
    refBreakDownChart,
    cutTextForBigNumberLegend,
    makerDAOExpensesMetrics,
    expenseReportSection,
  } = useFinances(budgets, initialYear);

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
        trailingAddress={breakdownTable.trailingAddress}
        years={yearsRange}
        handleChange={handleChangeYears}
        selectedValue={year}
        trailingAddressDesk={breakdownTable.trailingAddress}
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
              isCoreThirdLevel={false}
              cutTextForBigNumberLegend={cutTextForBigNumberLegend}
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
            budgets={budgets}
            budgetsAnalyticsMonthly={budgetsAnalyticsMonthly}
            budgetsAnalyticsQuarterly={budgetsAnalyticsQuarterly}
            series={series}
            refBreakDownChart={refBreakDownChart}
          />
        )}
      </Container>

      <ConditionalWrapper period={breakdownTable.periodFilter}>
        <BreakdownTable
          handleResetMetrics={breakdownTable.defaultMetricsWithAllSelected}
          activeItems={breakdownTable.activeMetrics}
          handleChange={breakdownTable.handlePeriodChange}
          handleResetFilter={breakdownTable.handleResetMetrics}
          handleSelectChange={breakdownTable.handleSelectChangeMetrics}
          metrics={breakdownTable.selectMetrics}
          periodicSelectionFilter={breakdownTable.periodicSelectionFilter}
          selectedValue={breakdownTable.periodFilter}
          year={year}
          headerTableMetrics={breakdownTable.headerValuesTable}
          metricTotal={breakdownTable.summaryTotalTable}
          maxItems={breakdownTable.maxItems}
          minItems={breakdownTable.minItems}
          allowSelectAll={breakdownTable.allowSelectAll}
          popupContainerHeight={breakdownTable.popupContainerHeight}
          breakdownTable={getDataTableFromPeriod(breakdownTable.periodFilter)}
          isLoading={breakdownTable.isLoading}
        />
      </ConditionalWrapper>
      <Container>
        {isEnabled('FEATURE_FINANCES_MAKERDAO_EXPENSE_METRICS_SECTION') && (
          <MakerDAOExpenseMetricsFinances
            handleGranularityChange={makerDAOExpensesMetrics.handleGranularityChange}
            selectedGranularity={makerDAOExpensesMetrics.selectedGranularity}
            series={makerDAOExpensesMetrics.series}
            handleToggleSeries={makerDAOExpensesMetrics.handleToggleSeries}
            isLoading={makerDAOExpensesMetrics.isLoading}
            year={year}
          />
        )}
        <ContainerLastReport>
          <DelegateExpenseTrendFinances
            selectedMetric={expenseReportSection.selectedMetric}
            onMetricChange={expenseReportSection.onMetricChange}
            selectedStatuses={expenseReportSection.selectedStatuses}
            onStatusSelectChange={expenseReportSection.onStatusSelectChange}
            handleResetFilter={expenseReportSection.handleResetFilter}
            statusesItems={expenseReportSection.statusesItems}
            columns={expenseReportSection.headersExpenseReport}
            expenseReport={expenseReportSection.reportExpenseItems}
            sortClick={expenseReportSection.onSortClick}
            handleLoadMore={expenseReportSection.handleLoadMore}
            showAllItems={expenseReportSection.showAllItems}
            allItemsCount={expenseReportSection.expenseItemsCount}
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

const ContainerLastReport = styled.div({
  marginTop: 40,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 64,
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

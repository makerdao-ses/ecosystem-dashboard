import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import IconTitle from '@ses/components/IconTitle/IconTitle';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BreakdownChartSection from '../Finances/components/BreakdownChartSection/BreakdownChartSection';
import ConditionalWrapper from '../Finances/components/ConditionalWrapper/ConditionalWrapper';
import OverviewCardMobile from '../Finances/components/OverviewCardMobile/OverviewCardMobile';
import BreadcrumbYearNavigation from '../Finances/components/SectionPages/BreadcrumbYearNavigation';
import BreakdownTable from '../Finances/components/SectionPages/BreakdownTable/BreakdownTable';
import { getDataTableFromPeriod } from '../Finances/components/SectionPages/BreakdownTable/utils';
import CardChartOverview from '../Finances/components/SectionPages/CardChartOverview/CardChartOverview';
import CardsNavigation from '../Finances/components/SectionPages/CardsNavigation/CardsNavigation';
import DelegateExpenseTrendFinances from '../Finances/components/SectionPages/DelegateExpenseTrendFinances/DelegateExpenseTrendFinances';
import { useEndgameBudgetContainerSecondLevel } from './useEndgameBudgetContainerSecondLevel';
import type { Budget } from '@ses/core/models/interfaces/budget';
interface Props {
  budgets: Budget[];
  yearsRange: string[];
  initialYear: string;
  allBudgets: Budget[];
}

const EndgameBudgetContainerSecondLevel: React.FC<Props> = ({ budgets, yearsRange, initialYear, allBudgets }) => {
  const {
    trailingAddressDesk,
    trailingAddress,
    handleChangeYearsEndgameAtlasBudget,
    year,
    title,
    icon,
    filters,
    filterSelected,
    doughnutSeriesData,
    handleSelectFilter,
    actuals,
    budgetCap,
    prediction,
    handleLoadMoreCards,
    loadMoreCards,
    cardsToShow,
    selectedBreakdownMetric,
    selectedBreakdownGranularity,
    handleBreakdownMetricChange,
    handleBreakdownGranularityChange,
    isDisabled,
    handleResetFilterBreakDownChart,
    budgetsAnalyticsMonthly,
    budgetsAnalyticsQuarterly,
    series,
    refBreakDownChart,
    cutTextForBigNumberLegend,
    breakdownTableSecondLevel,
    expenseReportSection,
  } = useEndgameBudgetContainerSecondLevel(budgets, initialYear, allBudgets);

  return (
    <PageContainer>
      <BreadcrumbYearNavigation
        trailingAddress={trailingAddress}
        years={yearsRange}
        handleChange={handleChangeYearsEndgameAtlasBudget}
        selectedValue={year}
        trailingAddressDesk={trailingAddressDesk}
        title={title}
      />
      <Container>
        <ContainerTitle>
          <IconTitle icon={icon} title={title} />
        </ContainerTitle>

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
            loadMoreCards={loadMoreCards}
            handleLoadMoreCards={handleLoadMoreCards}
          />
        </ContainerSections>
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
      </Container>
      <ConditionalWrapper period={breakdownTableSecondLevel.periodFilter}>
        <BreakdownTable
          handleResetMetrics={breakdownTableSecondLevel.defaultMetricsWithAllSelected}
          activeItems={breakdownTableSecondLevel.activeMetrics}
          handleResetFilter={breakdownTableSecondLevel.handleResetMetrics}
          handleChange={breakdownTableSecondLevel.handlePeriodChange}
          metrics={breakdownTableSecondLevel.selectMetrics}
          periodicSelectionFilter={breakdownTableSecondLevel.periodicSelectionFilter}
          selectedValue={breakdownTableSecondLevel.periodFilter}
          year={year}
          headerTableMetrics={breakdownTableSecondLevel.headerValuesTable}
          metricTotal={breakdownTableSecondLevel.summaryTotalTable}
          maxItems={breakdownTableSecondLevel.maxItems}
          minItems={breakdownTableSecondLevel.minItems}
          allowSelectAll={breakdownTableSecondLevel.allowSelectAll}
          popupContainerHeight={breakdownTableSecondLevel.popupContainerHeight}
          handleSelectChange={breakdownTableSecondLevel.handleSelectChangeMetrics}
          breakdownTable={getDataTableFromPeriod(breakdownTableSecondLevel.periodFilter)}
          isLoading={breakdownTableSecondLevel.isLoading}
        />
      </ConditionalWrapper>
      <Container>
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

import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import IconTitle from '@ses/components/IconTitle/IconTitle';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BreakdownChartSection from '../Finances/components/BreakdownChartSection/BreakdownChartSection';
import ConditionalWrapper from '../Finances/components/ConditionalWrapper/ConditionalWrapper';
import OverviewCardMobile from '../Finances/components/OverviewCardMobile/OverviewCardMobile';
import BreadcrumbYearNavigation from '../Finances/components/SectionPages/BreadcrumbYearNavigation';
import BreakdownTable from '../Finances/components/SectionPages/BreakdownTable/BreakdownTable';
import CardChartOverview from '../Finances/components/SectionPages/CardChartOverview/CardChartOverview';
import CardsNavigation from '../Finances/components/SectionPages/CardsNavigation/CardsNavigation';
import DelegateExpenseTrendFinances from '../Finances/components/SectionPages/DelegateExpenseTrendFinances/DelegateExpenseTrendFinances';
import MakerDAOExpenseMetricsFinances from '../Finances/components/SectionPages/MakerDAOExpenseMetrics/MakerDAOExpenseMetrics';
import ReservesWaterFallChart from '../Finances/components/SectionPages/ReservesWaterFallChartSection/ReservesWaterFallChartSection';
import { useEndgameBudgetContainerSecondLevel } from './useEndgameBudgetContainerSecondLevel';
import type { Budget } from '@ses/core/models/interfaces/budget';
interface Props {
  budgets: Budget[];
  yearsRange: string[];
  initialYear: string;
  allBudgets: Budget[];
}

const EndgameBudgetContainerSecondLevel: React.FC<Props> = ({ budgets, yearsRange, initialYear, allBudgets }) => {
  const [isEnabled] = useFlagsActive();
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
    breakdownChartSectionData,
    changeAlignment,
    breakdownTableSecondLevel,
    makerDAOExpensesMetrics,
    expenseReportSection,
    showSwiper,
    reserveChartSecondLevel,
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
          <IconTitle icon={icon || '/assets/img/default-icon-cards-budget.svg'} title={title} />
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
              changeAlignment={changeAlignment}
              showSwiper={showSwiper}
              numberSliderPerLevel={3}
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
          selectedMetric={breakdownChartSectionData.selectedBreakdownMetric}
          selectedGranularity={breakdownChartSectionData.selectedBreakdownGranularity}
          onMetricChange={breakdownChartSectionData.handleBreakdownMetricChange}
          onGranularityChange={breakdownChartSectionData.handleBreakdownGranularityChange}
          isDisabled={breakdownChartSectionData.isDisabled}
          handleResetFilter={breakdownChartSectionData.handleResetFilterBreakDownChart}
          budgets={budgets}
          budgetsAnalyticsMonthly={breakdownChartSectionData.budgetsAnalyticsMonthly}
          budgetsAnalyticsQuarterly={breakdownChartSectionData.budgetsAnalyticsQuarterly}
          series={breakdownChartSectionData.series}
          handleToggleSeries={breakdownChartSectionData.handleToggleSeries}
          refBreakDownChart={breakdownChartSectionData.refBreakDownChart}
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
          maxItems={breakdownTableSecondLevel.maxItems}
          minItems={breakdownTableSecondLevel.minItems}
          allowSelectAll={breakdownTableSecondLevel.allowSelectAll}
          popupContainerHeight={breakdownTableSecondLevel.popupContainerHeight}
          handleSelectChange={breakdownTableSecondLevel.handleSelectChangeMetrics}
          breakdownTable={breakdownTableSecondLevel.tableBody ?? []}
          isLoading={breakdownTableSecondLevel.isLoading}
          headerTable={breakdownTableSecondLevel.tableHeader ?? []}
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
        {isEnabled('FEATURE_FINANCES_MAKERDAO_EXPENSE_RESERVE_SECTION') && (
          <ContainerReservesWaterFallChart>
            <ReservesWaterFallChart
              title={title}
              series={reserveChartSecondLevel.series}
              legends={reserveChartSecondLevel.legendItems}
              selectedGranularity={reserveChartSecondLevel.selectedGranularity}
              year={year}
            />
          </ContainerReservesWaterFallChart>
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
            sortClick={expenseReportSection.onSortClick}
            expenseReportResponse={expenseReportSection.expenseReportResponse}
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

const ContainerReservesWaterFallChart = styled.div({
  marginTop: 40,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 64,
  },
});

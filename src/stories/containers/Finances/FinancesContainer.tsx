import { styled } from '@mui/material';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import IconTitleWithCode from '@ses/components/IconTitleWithCode/IconTitleWithCode';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import React from 'react';
import BreakdownChartSection from './components/BreakdownChartSection/BreakdownChartSection';
import ConditionalWrapper from './components/ConditionalWrapper/ConditionalWrapper';
import OverviewCardMobile from './components/OverviewCardMobile/OverviewCardMobile';
import BreadcrumbYearNavigation from './components/SectionPages/BreadcrumbYearNavigation';
import BreakdownTable from './components/SectionPages/BreakdownTable/BreakdownTable';
import CardChartOverview from './components/SectionPages/CardChartOverview/CardChartOverview';
import CardsNavigation from './components/SectionPages/CardsNavigation/CardsNavigation';
import DelegateExpenseTrendFinances from './components/SectionPages/ExpenseReports/ExpenseReports';
import MakerDAOExpenseMetricsFinances from './components/SectionPages/MakerDAOExpenseMetrics/MakerDAOExpenseMetrics';
import ReservesWaterfallChartSection from './components/SectionPages/ReservesWaterfallChartSection/ReservesWaterfallChartSection';
import { useFinances } from './useFinances';
import type { Budget } from '@ses/core/models/interfaces/budget';

interface Props {
  budgets: Budget[];
  allBudgets: Budget[];
  yearsRange: string[];
  initialYear: string;
}

const FinancesContainer: React.FC<Props> = ({ budgets, allBudgets, yearsRange, initialYear }) => {
  const {
    year,
    levelNumber,
    icon,
    title,
    description,
    trailingAddressMobile,
    trailingAddressDesktop,
    cardOverViewSectionData,
    handleChangeYears,
    cardsToShow,
    breakdownTable,
    canLoadMoreCards,
    showMoreCards,
    toggleShowMoreCards,
    makerDAOExpensesMetrics,
    breakdownChartSectionData,
    expenseReportSection,
    reserveChart,
    code,
  } = useFinances(budgets, allBudgets, initialYear);

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
        trailingAddress={trailingAddressMobile}
        years={yearsRange}
        handleChange={handleChangeYears}
        selectedValue={year}
        trailingAddressDesk={trailingAddressDesktop}
        title={levelNumber === 1 ? 'Finances' : title}
        hasIcon={levelNumber !== 1}
      />

      <Container>
        <TitleContainer>
          {/* Page title */}
          {levelNumber === 1 ? (
            <FirstLevelTitle>MakerDAO Finances</FirstLevelTitle>
          ) : (
            <NthTitleBox>
              <IconTitleWithCode icon={icon || '/assets/img/default-icon-cards-budget.svg'} title={title} code={code} />
            </NthTitleBox>
          )}
          <TitleDescription levelNumber={levelNumber}>
            {levelNumber === 1
              ? "The MakerDAO Finances page offers a clear snapshot of the organization's budgeting, actuals, and forecasts, complete with interactive visualizations for a comprehensive understanding of its fiscal health and activities."
              : description}
          </TitleDescription>
        </TitleContainer>

        <ContainerSections>
          <WrapperDesk>
            <CardChartOverview
              selectedMetric={cardOverViewSectionData.selectedMetric}
              handleSelectedMetric={cardOverViewSectionData.handleSelectedMetric}
              paymentsOnChain={cardOverViewSectionData.paymentsOnChain}
              budgetCap={cardOverViewSectionData.budgetCap}
              doughnutSeriesData={cardOverViewSectionData.doughnutSeriesData}
              isCoreThirdLevel={levelNumber >= 3}
              changeAlignment={cardOverViewSectionData.changeAlignment}
              showSwiper={cardOverViewSectionData.showSwiper}
              numberSliderPerLevel={cardOverViewSectionData.numberSliderPerLevel}
            />
          </WrapperDesk>
          <WrapperMobile>
            <OverviewCardMobile
              paymentsOnChain={cardOverViewSectionData.paymentsOnChain}
              budgetCap={cardOverViewSectionData.budgetCap}
            />
          </WrapperMobile>
          <CardsNavigation
            budgetCap={cardOverViewSectionData.budgetCap}
            cardsNavigationInformation={cardsToShow}
            canLoadMoreCards={canLoadMoreCards}
            showMoreCards={showMoreCards}
            toggleShowMoreCards={toggleShowMoreCards}
          />
        </ContainerSections>

        <BreakdownChartSection
          isLoading={breakdownChartSectionData.isLoading}
          year={year}
          selectedMetric={breakdownChartSectionData.selectedMetric}
          selectedGranularity={breakdownChartSectionData.selectedGranularity}
          onMetricChange={breakdownChartSectionData.handleMetricChange}
          onGranularityChange={breakdownChartSectionData.handleGranularityChange}
          isDisabled={breakdownChartSectionData.isDisabled}
          handleResetFilter={breakdownChartSectionData.handleResetFilterBreakDownChart}
          series={breakdownChartSectionData.series}
          handleToggleSeries={breakdownChartSectionData.handleToggleSeries}
          refBreakDownChart={breakdownChartSectionData.refBreakDownChart}
        />
      </Container>

      <ConditionalWrapper period={breakdownTable.periodFilter}>
        <BreakdownTable
          handleResetMetrics={breakdownTable.defaultMetricsWithAllSelected}
          activeItems={breakdownTable.activeMetrics}
          handleChange={breakdownTable.handlePeriodChange}
          handleResetFilter={breakdownTable.handleResetMetrics}
          handleSelectChange={breakdownTable.handleSelectChangeMetrics}
          metrics={breakdownTable.selectMetrics}
          periodSelectOptions={breakdownTable.periodSelectOptions}
          selectedValue={breakdownTable.periodFilter}
          year={year}
          maxItems={breakdownTable.maxItems}
          minItems={breakdownTable.minItems}
          allowSelectAll={breakdownTable.allowSelectAll}
          popupContainerHeight={breakdownTable.popupContainerHeight}
          breakdownTable={breakdownTable.tableBody ?? []}
          isLoading={breakdownTable.isLoading}
          headerTable={breakdownTable.tableHeader ?? []}
          title={levelNumber === 1 ? 'MakerDAO Budget' : title}
          isDisabled={breakdownTable.isDisabled}
        />
      </ConditionalWrapper>
      <Container>
        <MakerDAOExpenseMetricsFinances
          title={`${levelNumber === 1 ? 'MakerDAO' : title} Expense Metrics`}
          handleGranularityChange={makerDAOExpensesMetrics.handleGranularityChange}
          selectedGranularity={makerDAOExpensesMetrics.selectedGranularity}
          series={makerDAOExpensesMetrics.series}
          handleToggleSeries={makerDAOExpensesMetrics.handleToggleSeries}
          isLoading={makerDAOExpensesMetrics.isLoading}
          year={year}
        />
        <ContainerReservesWaterfallChart>
          <ReservesWaterfallChartSection
            title={`${levelNumber === 1 ? 'MakerDAO Finances' : title} Reserves`}
            legends={reserveChart.legendItems}
            series={reserveChart.series}
            selectedGranularity={reserveChart.selectedGranularity}
            year={year}
            activeItems={reserveChart.activeElements}
            handleSelectChangeItem={reserveChart.handleSelectChange}
            items={reserveChart.items}
            popupContainerHeight={reserveChart.popupContainerHeight}
            handleGranularityChange={reserveChart.handleGranularityChange}
            handleResetFilter={reserveChart.handleResetFilter}
            isLoading={reserveChart.isLoading}
            isDisabled={reserveChart.isDisabled}
          />
        </ContainerReservesWaterfallChart>
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
            isDisabled={expenseReportSection.isDisabled}
            hasExpenseReport={expenseReportSection.hasExpenseReports}
          />
        </ContainerLastReport>
      </Container>
    </PageContainer>
  );
};

export default FinancesContainer;

const TitleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginTop: 28,
  marginBottom: 24,

  [theme.breakpoints.up('tablet_768')]: {
    marginBottom: 32,
  },
}));

const TitleDescription = styled('p')<{ levelNumber: number }>(({ theme, levelNumber }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  letterSpacing: '0.4px',
  color: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',
  margin: 0,
  marginLeft: levelNumber === 1 ? 0 : 40,
  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    marginLeft: levelNumber === 1 ? 0 : 56,
  },
}));

const FirstLevelTitle = styled('h1')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 20,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: '0.4px',
  color: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',
  margin: 0,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 28,
  },
}));

const NthTitleBox = styled('h1')(({ theme }) => ({
  margin: 0,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 28,
  },
}));

const ContainerSections = styled('div')(({ theme }) => ({
  gap: 16,
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.up('tablet_768')]: {
    gap: 24,
  },
}));

const WrapperDesk = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    gap: 64,
  },
}));

const ContainerLastReport = styled('div')(({ theme }) => ({
  marginTop: 40,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 64,
  },
}));

const WrapperMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const ContainerReservesWaterfallChart = styled('div')(({ theme }) => ({
  marginTop: 40,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 64,
  },
}));

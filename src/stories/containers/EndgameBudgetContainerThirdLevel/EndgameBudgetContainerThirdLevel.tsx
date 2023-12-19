import styled from '@emotion/styled';
import BigButton from '@ses/components/Button/BigButton/BigButton';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import IconTitle from '@ses/components/IconTitle/IconTitle';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import lightTheme from '@ses/styles/theme/light';
import React, { useRef } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import BreakdownChartSection from '../Finances/components/BreakdownChartSection/BreakdownChartSection';
import CardCoreUnitThirdLevelBudget from '../Finances/components/CardCoreUnitThirdLevelBudget/CardCoreUnitThirdLevelBudget';
import CardNavigationMobile from '../Finances/components/CardNavigationMobile/CardNavigationMobile';
import ConditionalWrapper from '../Finances/components/ConditionalWrapper/ConditionalWrapper';
import OverviewCardMobile from '../Finances/components/OverviewCardMobile/OverviewCardMobile';
import BreadcrumbYearNavigation from '../Finances/components/SectionPages/BreadcrumbYearNavigation';
import BreakdownTable from '../Finances/components/SectionPages/BreakdownTable';
import CardChartOverview from '../Finances/components/SectionPages/CardChartOverview/CardChartOverview';
import DelegateExpenseTrendFinances from '../Finances/components/SectionPages/DelegateExpenseTrendFinances/DelegateExpenseTrendFinances';
import MakerDAOExpenseMetricsFinances from '../Finances/components/SectionPages/MakerDAOExpenseMetrics/MakerDAOExpenseMetrics';
import { mockDataTableQuarterlyArray } from '../Finances/utils/mockData';
import { useEndgameBudgetContainerThirdLevel } from './useEndgameBudgetContainerThirdLevel';
import type { NavigationCard } from '../Finances/utils/types';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { SwiperProps, SwiperRef } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';

interface Props {
  budgets: Budget[];
  yearsRange: string[];
  initialYear: string;
  allBudgets: Budget[];
}

const EndgameBudgetContainerThirdLevel: React.FC<Props> = ({ budgets, yearsRange, initialYear, allBudgets }) => {
  const [isEnabled] = useFlagsActive();
  const {
    trailingAddress,
    trailingAddressDesk,
    handleChangeYearsEndgameAtlasBudget,
    year,
    title,
    icon,
    actuals,
    budgetCap,
    prediction,
    selectedThirdLevel,
    filtersThirdLevel,
    handleSelectFilterThirdLevel,
    doughnutSeriesData,
    loadMoreCards,
    handleLoadMoreCards,
    isLight,
    cardsToShow,
    periodFilter,
    defaultMetricsWithAllSelected,
    activeMetrics,
    handlePeriodChange,
    handleResetMetrics,
    handleSelectChangeMetrics,
    selectMetrics,
    periodicSelectionFilter,
    allowSelectAll,
    maxItems,
    minItems,
    popupContainerHeight,
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
    headerValuesTable,
    summaryTotalTable,
    makerDAOExpensesMetrics,
    expenseReportSection,
  } = useEndgameBudgetContainerThirdLevel(budgets, initialYear, allBudgets);
  const ref = useRef<SwiperRef>(null);

  // Options of Swiper
  const swiperOptions = {
    pagination: {
      type: 'bullets',
      enabled: true,
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 4,
        spaceBetween: 16,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 2,
      },
      1280: {
        slidesPerView: 5,
        spaceBetween: 2,
      },
      1440: {
        slidesPerView: 6,
        spaceBetween: 2,
      },
      1920: {
        slidesPerView: 8,
        spaceBetween: 2,
      },
    },
  } as SwiperProps;
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
              filters={filtersThirdLevel}
              filterSelected={selectedThirdLevel}
              handleSelectFilter={handleSelectFilterThirdLevel}
              actuals={actuals}
              budgetCap={budgetCap}
              prediction={prediction}
              doughnutSeriesData={doughnutSeriesData}
              isCoreThirdLevel={true}
              cutTextForBigNumberLegend={cutTextForBigNumberLegend}
            />
          </WrapperDesk>
          <WrapperMobile>
            <OverviewCardMobile actuals={actuals} budgetCap={budgetCap} prediction={prediction} />
          </WrapperMobile>
          <WrapperMobile>
            {cardsToShow.map((card: NavigationCard, index: number) => (
              <CardNavigationMobile
                valueDai={card?.valueDai || 0}
                totalDai={card?.totalDai || 0}
                href={card.href || '#'}
                image={card.image || ''}
                title={card.title}
                barColor={card.color}
                key={index}
                code={card.code}
              />
            ))}
            {loadMoreCards && (
              <ContainerButton>
                <DividerStyle isLight={isLight} />
                <BigButtonStyled title={'Load More'} onClick={handleLoadMoreCards} />
                <DividerStyle isLight={isLight} />
              </ContainerButton>
            )}
          </WrapperMobile>
          <SwiperWrapper>
            <Swiper
              direction="horizontal"
              ref={ref}
              modules={[Pagination, Navigation]}
              centerInsufficientSlides
              pagination={true}
              {...swiperOptions}
            >
              {cardsToShow.map((coreUnit, index) => (
                <SwiperSlide key={index}>
                  <CardWrapper>
                    <CardCoreUnitThirdLevelBudget
                      code={coreUnit.code}
                      href="#"
                      image={coreUnit.image}
                      name={coreUnit.title}
                    />
                  </CardWrapper>
                </SwiperSlide>
              ))}
            </Swiper>
          </SwiperWrapper>
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
          headerTableMetrics={headerValuesTable}
          metricTotal={summaryTotalTable}
          maxItems={maxItems}
          minItems={minItems}
          allowSelectAll={allowSelectAll}
          popupContainerHeight={popupContainerHeight}
          breakdownTable={[mockDataTableQuarterlyArray[0]]}
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
export default EndgameBudgetContainerThirdLevel;

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

const ContainerLastReport = styled.div({
  marginTop: 40,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 64,
  },
});

const CardWrapper = styled.div({
  marginLeft: 8,
  marginRight: 8,
  marginBottom: 4,
  marginTop: 4,
  display: 'flex',
  flex: '1',
});

const SwiperWrapper = styled.div({
  display: 'none',
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginBottom: 32,
    display: 'block',
  },

  '& .swiper-slide': {
    maxWidth: 100,

    [lightTheme.breakpoints.up('tablet_768')]: {
      maxWidth: 150,
    },
  },
  '& .swiper-wrapper': {
    height: 230,
  },

  '& .swiper-pagination-horizontal': {
    marginTop: 59,
  },
  '& .swiper-pagination-bullet': {
    width: 16,
    height: 16,
  },
  '& .swiper-pagination-bullet-active': {
    backgroundColor: '#2DC1B1 !important',
  },
  '& .swiper-slide-active': {
    marginLeft: -8,
    [lightTheme.breakpoints.up('tablet_768')]: {
      marginLeft: -16,
    },
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

const ContainerButton = styled.div({
  width: '100%',
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  marginTop: 24,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 40,
  },
});
const DividerStyle = styled.div<WithIsLight>(({ isLight }) => ({
  background: isLight ? '#D4D9E1' : '#405361',
  height: 1,
  display: 'flex',
  flex: 1,
}));

const BigButtonStyled = styled(BigButton)({
  minWidth: 127,
  height: 31,
  padding: '8px 24px',
  letterSpacing: 1,
  [lightTheme.breakpoints.up('tablet_768')]: {
    minWidth: 207,
  },
});

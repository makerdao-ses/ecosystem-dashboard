import styled from '@emotion/styled';
import BasicModal from '@ses/components/BasicModal/BasicModal';
import ContainerModal from '@ses/components/BasicModal/ContainerModal';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import React from 'react';
import lightTheme from 'styles/theme/light';
import CostBreakdownTable from './components/CostBreakdownTable/CostBreakdownTable';
import ExpensesChart from './components/ExpensesChart/ExpensesChart';
import NavigationButtons from './components/NavigationButtons/NavigationButtons';
import QuarterCarousel from './components/QuarterCarousel/QuarterCarousel';
import YearPicker from './components/YearPicker/YearPicker';
import useFinancesOverview from './useFinancesOverview';
import type { ExtendedExpense } from './financesOverviewTypes';
import type { ExpenseCategory } from '@ses/core/models/dto/expenseCategoriesDTO';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface FinancesOverviewContainerProps {
  monthlyExpenses: Partial<ExpenseDto>[];
  quarterExpenses: ExpenseDto[];
  byBudgetBreakdownExpenses: ExtendedExpense[];
  byCategoryBreakdownExpenses: ExpenseDto[];
  expenseCategories: ExpenseCategory[];
}

const FinancesOverviewContainer: React.FC<FinancesOverviewContainerProps> = ({
  monthlyExpenses,
  quarterExpenses,
  byBudgetBreakdownExpenses,
  byCategoryBreakdownExpenses,
  expenseCategories,
}) => {
  const {
    isLight,
    selectedYear,
    handleChangeSelectYear,
    years,
    newActual,
    newDiscontinued,
    newPrediction,
    totalExpenses,
    sortedQuarters,
    isDownTable,
    selectedFilter,
    setSelectedFilter,
    byBudgetExpenses,
    remainingBudgetCU,
    remainingBudgetDelegates,
    maxValueByBudget,
    byCategoryExpenses,
    remainingCategories,
    maxValueByCategory,
    costBreakdownTotal,
    openModal,
    handleCloseModal,
    handleOpenModal,
    headCountCategory,
    notHeadCountCategory,
    handleCheckedExpandedAll,
    checkOut,
  } = useFinancesOverview(
    quarterExpenses,
    monthlyExpenses,
    byBudgetBreakdownExpenses,
    byCategoryBreakdownExpenses,
    expenseCategories
  );

  return (
    <PageWrapper isLight={isLight}>
      <SEOHead
        title="MakerDAO Ecosystem Performance Dashboard | Maker Expenses"
        description="MakerDAO Ecosystem Performance Dashboard provides a transparent analysis of Core Unit teams' finances, projects, and their position in the DAO."
        image={{
          src: toAbsoluteURL('/assets/img/social-385x200.png'),
          width: 385,
          height: 200,
        }}
        twitterImage={toAbsoluteURL('/assets/img/social-1200x630.png')}
      />
      <Container>
        <PageTitle isLight={isLight}>Total Reported Expenses</PageTitle>

        <QuarterCarousel quarters={sortedQuarters} />

        <ContainerYearPicker>
          <YearPicker selectedYear={selectedYear} handleOnclick={handleChangeSelectYear} years={years} />
        </ContainerYearPicker>
        <TotalReported>
          <div>
            <Label isLight={isLight}>{`${totalExpenses()?.toLocaleString('es-US') || '0'} dai`}</Label>
            <Line isLight={isLight} />
          </div>
          <TotalDescription isLight={isLight}>Total Reported Expenses</TotalDescription>
        </TotalReported>

        <BreakdownSectionContainer>
          <ExpensesChartColumn>
            <ExpensesChart newActual={newActual} newDiscontinued={newDiscontinued} newPrediction={newPrediction} />
            {!isDownTable && <NavigationButtons />}
          </ExpensesChartColumn>

          <BreakdownTableColumn>
            <CostBreakdownTable
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              byBudgetExpenses={byBudgetExpenses}
              remainingBudgetCU={remainingBudgetCU}
              remainingBudgetDelegates={remainingBudgetDelegates}
              maxValueByBudget={maxValueByBudget}
              byCategoryExpenses={byCategoryExpenses}
              remainingCategories={remainingCategories}
              maxValueByCategory={maxValueByCategory}
              total={costBreakdownTotal}
              handleOnClick={handleOpenModal}
            />
          </BreakdownTableColumn>
          {isDownTable && <NavigationButtons />}
        </BreakdownSectionContainer>
      </Container>
      <BasicModalExtended
        handleClose={handleCloseModal}
        open={openModal}
        backdropProps={{
          style: {
            background: isLight ? 'rgba(52, 52, 66, 0.1)' : 'rgba(0, 22, 78, 0.1)',
            backdropFilter: isLight ? 'blur(2px);' : 'blur(4px)',
          },
        }}
      >
        <ContainerModal
          headCountCategories={headCountCategory}
          noHeadCountCategories={notHeadCountCategory}
          isCheckedExpandedAll={checkOut}
          handleCloseModal={handleCloseModal}
          setIsCheckedExpandedAll={handleCheckedExpandedAll}
        />
      </BasicModalExtended>
    </PageWrapper>
  );
};

export default FinancesOverviewContainer;

const PageWrapper = styled(PageContainer)<WithIsLight>(({ isLight }) => ({
  backgroundImage: isLight ? '#FFFFFF' : 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 16, 32, 0.4) 100%)',
}));

const PageTitle = styled.h1<{ isLight: boolean }>(({ isLight }) => ({
  fontSize: 20,
  fontWeight: 600,
  lineHeight: '24px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#FFFFFF',
  marginTop: 32,
  marginBottom: 32,

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: '29px',
    letterSpacing: '0.4px',
    marginBottom: 40,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginBottom: 32,
  },
}));

const ContainerYearPicker = styled.div({
  marginBottom: 24,
  marginTop: 8,

  [lightTheme.breakpoints.between('desktop_1194', 'desktop_1440')]: {
    marginBottom: 16,
  },
});

const TotalReported = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: 16,

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginBottom: 0,
  },
});

const Label = styled.label<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 24,
  lineHeight: '29px',
  letterSpacing: ' 0.4px',
  textTransform: 'uppercase',
  color: isLight ? '#231536' : '#EDEFFF',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: '32px',
    lineHeight: '39px',
    letterSpacing: '0.4px',
  },
}));

const Line = styled.div<WithIsLight>(({ isLight }) => ({
  width: 'fix-content',
  border: isLight ? '1px solid #B6EDE7' : '1px solid #06554C',
  marginTop: 4,
}));

const TotalDescription = styled.label<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '22px',
  color: isLight ? '#231536' : '#EDEFFF',
  marginTop: 2,

  [lightTheme.breakpoints.up('table_834')]: {
    fontWeight: 500,
    fontSize: 20,
    lineHeight: ' 24px',
    letterSpacing: '0.4px',
  },
}));

const BreakdownSectionContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 39,

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    gap: 18,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    flexDirection: 'row',
    gap: 40,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    gap: 64,
  },
});

const ExpensesChartColumn = styled.div({
  width: 343,
  margin: '16px auto 0',

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    margin: '32px auto 0',
    width: 666,
    paddingRight: 59,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    margin: '52px auto 0',
    width: 479,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 504,
  },
});

const BreakdownTableColumn = styled.div({
  width: '100%',
});

const BasicModalExtended = styled(BasicModal)({
  position: 'absolute',
  top: '64px',
  left: '50%',
  transform: 'translateX(-50%)',
  [lightTheme.breakpoints.up('desktop_1194')]: {
    top: '175px',
    width: 1114,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 1184,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 1184,
  },
});

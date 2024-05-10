import styled from '@emotion/styled';
import BasicModal from '@ses/components/BasicModal/BasicModal';
import CategoryModalComponent from '@ses/components/BasicModal/CategoryModalComponent';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { useCategoriesModalContext } from '@ses/core/context/CategoryModalContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import CostBreakdownTable from './components/CostBreakdownTable/CostBreakdownTable';
import EndgameIntroductionBanner from './components/EndgameIntroductionBanner/EndgameIntroductionBanner';
import ExpensesChart from './components/ExpensesChart/ExpensesChart';
import NavigationButtons from './components/NavigationButtons/NavigationButtons';
import QuarterCarousel from './components/QuarterCarousel/QuarterCarousel';
import YearPicker from './components/YearPicker/YearPicker';
import useFinancesOverview from './useFinancesOverview';
import type { ExtendedExpense } from './financesOverviewTypes';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface FinancesOverviewContainerProps {
  monthlyExpenses: Partial<ExpenseDto>[];
  quarterExpenses: ExpenseDto[];
  byBudgetBreakdownExpenses: ExtendedExpense[];
  byCategoryBreakdownExpenses: ExpenseDto[];
}

const FinancesOverviewContainer: React.FC<FinancesOverviewContainerProps> = ({
  monthlyExpenses,
  quarterExpenses,
  byBudgetBreakdownExpenses,
  byCategoryBreakdownExpenses,
}) => {
  const { handleOpenModal } = useCategoriesModalContext();
  const {
    isLight,
    selectedYear,
    handleChangeSelectYear,
    years,
    newActual,
    newDiscontinued,
    newPrediction,
    sortedQuarters,
    isDownDesktop1280,
    selectedFilter,
    setSelectedFilter,
    byBudgetExpenses,
    remainingBudgetCU,
    remainingBudgetDelegates,
    maxValueByBudget,
    byCategoryExpenses,
    remainingCategories,
    maxValueByCategory,
    totalExpenses,
    remainingEcosystemActors,
  } = useFinancesOverview(quarterExpenses, monthlyExpenses, byBudgetBreakdownExpenses, byCategoryBreakdownExpenses);

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
      <EndgameIntroContainer>
        <EndgameIntroductionBanner />
      </EndgameIntroContainer>

      <Container>
        <PageTitle isLight={isLight}>Total Reported Expenses</PageTitle>

        <QuarterCarousel quarters={sortedQuarters} />

        <ContainerYearPicker>
          <YearPicker selectedYear={selectedYear} handleOnclick={handleChangeSelectYear} years={years} />
        </ContainerYearPicker>
        <TotalReported>
          <div>
            <Label isLight={isLight}>{`${usLocalizedNumber(totalExpenses, 0)} dai`}</Label>
            <Line isLight={isLight} />
          </div>
          <TotalDescription isLight={isLight}>Total Reported Expenses</TotalDescription>
        </TotalReported>

        <BreakdownSectionContainer>
          <ExpensesChartColumn>
            <ExpensesChart newActual={newActual} newDiscontinued={newDiscontinued} newPrediction={newPrediction} />
            {!isDownDesktop1280 && <NavigationButtons />}
          </ExpensesChartColumn>

          <BreakdownTableColumn>
            <CostBreakdownTable
              remainingEcosystemActors={remainingEcosystemActors}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              byBudgetExpenses={byBudgetExpenses}
              remainingBudgetCU={remainingBudgetCU}
              remainingBudgetDelegates={remainingBudgetDelegates}
              maxValueByBudget={maxValueByBudget}
              byCategoryExpenses={byCategoryExpenses}
              remainingCategories={remainingCategories}
              maxValueByCategory={maxValueByCategory}
              total={totalExpenses}
              handleOnClick={handleOpenModal}
            />
          </BreakdownTableColumn>
          {isDownDesktop1280 && <NavigationButtons />}
        </BreakdownSectionContainer>
      </Container>
      <CategoryModalComponent />
    </PageWrapper>
  );
};

export default FinancesOverviewContainer;

const PageWrapper = styled(PageContainer)<WithIsLight>(({ isLight }) => ({
  backgroundImage: isLight ? '#FFFFFF' : 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 16, 32, 0.4) 100%)',
}));

const EndgameIntroContainer = styled.div({
  marginBottom: 40,

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginBottom: 64,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginTop: 32,
  },
});

const PageTitle = styled.h1<{ isLight: boolean }>(({ isLight }) => ({
  fontSize: 20,
  fontWeight: 600,
  lineHeight: '24px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#FFFFFF',
  marginTop: 32,
  marginBottom: 32,

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: '29px',
    letterSpacing: '0.4px',
    marginBottom: 40,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginBottom: 32,
  },
}));

const ContainerYearPicker = styled.div({
  marginBottom: 24,
  marginTop: 8,

  [lightTheme.breakpoints.between('desktop_1024', 'desktop_1440')]: {
    marginBottom: 16,
  },
});

const TotalReported = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: 16,

  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
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

  [lightTheme.breakpoints.up('tablet_768')]: {
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

  [lightTheme.breakpoints.up('tablet_768')]: {
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

  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    gap: 18,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
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

  [lightTheme.breakpoints.between('tablet_768', 'desktop_1280')]: {
    margin: '32px auto 0',
    width: 666,
    paddingRight: 59,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 504,
  },
});

const BreakdownTableColumn = styled.div({
  width: '100%',
});

export const BasicModalExtended = styled(BasicModal)({
  position: 'absolute',
  left: '50%',
  height: 'calc(100% - 64px)',
  maxHeight: 748,
  marginTop: 64,
  marginBottom: 0,
  // This to hidden border in safari
  outline: 'none',
  transform: 'translateX(-50%)',
  width: 'max(100%, 375px)',

  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 'max(90%, 770px)',
    height: 'calc(100% - 128px)',
    marginBottom: 64,
    maxHeight: 813,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 1114,
    maxHeight: 847,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 1184,
  },
});

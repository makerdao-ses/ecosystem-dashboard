import styled from '@emotion/styled';
import BigButton from '@ses/components/Button/BigButton/BigButton';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import { TablePlaceholder } from '@/views/CoreUnits/CustomTable/TablePlaceholder';
import DelegateExpenseTrendItem from '../../DelegateExpenseTrend/DelegateExpenseTrendItem';
import HeaderDelegateExpense from '../../DelegateExpenseTrend/HeaderDelegateExpense';
import SectionTitle from '../../SectionTitle/SectionTitle';
import ExpenseReportsFilters from './ExpenseReportsFilters';
import ExpenseReportsItemsSkeleton from './ExpenseReportsItemsSkeleton';
import type { ExpenseReportsFiltersProps } from './ExpenseReportsFilters';
import type { DelegateExpenseTableHeader } from '@ses/containers/Finances/utils/types';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { SWRInfiniteResponse } from 'swr/infinite';

interface Props extends ExpenseReportsFiltersProps {
  columns: DelegateExpenseTableHeader[];
  sortClick: (index: number) => void;
  expenseReportResponse: SWRInfiniteResponse<BudgetStatement[], unknown>;
  hasExpenseReport: boolean;
}

const ExpenseReports: React.FC<Props> = ({
  columns,
  sortClick,
  expenseReportResponse,
  hasExpenseReport,
  ...filterProps // props from ExpenseReportsFiltersProps
}) => {
  const { isLight } = useThemeContext();
  const isLoading =
    expenseReportResponse.isLoading ||
    (expenseReportResponse.size > 0 &&
      expenseReportResponse.data &&
      typeof expenseReportResponse.data[expenseReportResponse.size - 1] === 'undefined');

  return (
    <Container>
      <HeaderContainer>
        <SectionTitle
          title="Budget Statements"
          tooltip={
            <TooltipContent>
              <p>
                Access detailed insights into budget reporting activities, including contributors, reporting month,
                actual expenditures, status, and recent modifications.{' '}
              </p>
              <p>
                Click "View" to dive into specific financial data by department, enabling effective monitoring and
                management of fiscal operations.
              </p>
            </TooltipContent>
          }
        />
        <ExpenseReportsFilters {...filterProps} />
      </HeaderContainer>

      {hasExpenseReport && (
        <Header>
          <HeaderDelegateExpense columns={columns} sortClick={sortClick} />
        </Header>
      )}
      <ItemSection>
        {expenseReportResponse.data?.map((page, index) => (
          <React.Fragment key={`page-${index}`}>
            {page.map((budget) => (
              <DelegateExpenseTrendItem key={index} budget={budget} selectedMetric={filterProps.selectedMetric} />
            ))}
          </React.Fragment>
        ))}
        {isLoading && <ExpenseReportsItemsSkeleton />}
        {!hasExpenseReport && (
          <TablePlaceholder description="There are no contributors available with this combination of filters" />
        )}
      </ItemSection>

      {!isLoading &&
        !((expenseReportResponse.data?.[(expenseReportResponse.data?.length ?? 0) - 1]?.length ?? 0) < 10) && (
          <ContainerButton>
            <DividerStyle isLight={isLight} />
            <BigButtonStyled
              title={'Load More'}
              onClick={() => expenseReportResponse.setSize(expenseReportResponse.size + 1)}
            />
            <DividerStyle isLight={isLight} />
          </ContainerButton>
        )}
    </Container>
  );
};

export default ExpenseReports;

const Container = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
});

const HeaderContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  gap: 24,
  marginBottom: 24,

  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
});

const ItemSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 16,
  },
});

const Header = styled.div({
  display: 'none',
  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flex: 1,
    width: '100%',
    marginBottom: 16,
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

const TooltipContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  p: {
    margin: 0,
  },
});

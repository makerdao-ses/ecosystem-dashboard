import styled from '@emotion/styled';
import BigButton from '@ses/components/Button/BigButton/BigButton';
import { getLinkLastExpenseReport } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import SectionTitle from '../../BreakdownChartSection/SectionTitle/SectionTitle';
import DelegateExpenseTrendItem from '../../DelegateExpenseTrend/DelegateExpenseTrendItem';
import HeaderDelegateExpense from '../../DelegateExpenseTrend/HeaderDelegateExpense';
import ExpenseReportsFilters from './ExpenseReportsFilters';
import type { ExpenseReportsFiltersProps } from './ExpenseReportsFilters';
import type { DelegateExpenseTableHeader, MomentDataItem } from '@ses/containers/Finances/utils/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props extends ExpenseReportsFiltersProps {
  columns: DelegateExpenseTableHeader[];
  expenseReport: MomentDataItem[];
  sortClick: (index: number) => void;
  showAllItems: boolean;
  handleLoadMore?: () => void;
}
const DelegateExpenseTrendFinances: React.FC<Props> = ({
  columns,
  expenseReport,
  sortClick,
  handleLoadMore,
  showAllItems,
  ...filterProps // props from ExpenseReportsFiltersProps
}) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <HeaderContainer>
        <SectionTitle title="Expense Reports" tooltip="No data" />
        <ExpenseReportsFilters {...filterProps} />
      </HeaderContainer>

      <Header>
        <HeaderDelegateExpense columns={columns} sortClick={sortClick} />
      </Header>
      <ItemSection>
        {expenseReport.map((expense, index) => (
          <DelegateExpenseTrendItem
            key={index}
            expenseReport={expense}
            link={getLinkLastExpenseReport(expense.shortCode, expenseReport)}
          />
        ))}
      </ItemSection>
      {!showAllItems && (
        <ContainerButton>
          <DividerStyle isLight={isLight} />
          <BigButtonStyled title={'Load More'} onClick={handleLoadMore} />
          <DividerStyle isLight={isLight} />
        </ContainerButton>
      )}
    </Container>
  );
};

export default DelegateExpenseTrendFinances;

const Container = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
});

const HeaderContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
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

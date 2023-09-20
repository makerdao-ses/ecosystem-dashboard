import styled from '@emotion/styled';
import BigButton from '@ses/components/Button/BigButton/BigButton';
import { getLinkLastExpenseReport } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import DelegateExpenseTrendItem from '../../DelegateExpenseTrend/DelegateExpenseTrendItem';
import HeaderDelegateExpense from '../../DelegateExpenseTrend/HeaderDelegateExpense';
import type { DelegateExpenseTableHeader, MomentDataItem } from '@ses/containers/Finances/utils/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  columns: DelegateExpenseTableHeader[];
  expenseReport: MomentDataItem[];
  sortClick: (index: number) => void;
  showSome: boolean;
  handleLoadMore?: () => void;
}
const DelegateExpenseTrendFinances: React.FC<Props> = ({
  columns,
  expenseReport,
  sortClick,
  handleLoadMore,
  showSome,
}) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <InformationSection>
        <Title isLight={isLight}>Expense Reports</Title>
        <Description isLight={isLight}>Delegate Compensation / Month</Description>
      </InformationSection>
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
      {showSome && (
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

const InformationSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  marginBottom: 24,
  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 16,
    marginBottom: 40,
  },
});

const Title = styled.h2<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: 18,
  margin: 0,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: '0.75px',
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 24,
    letterSpacing: '0.4px',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontSize: 32,
  },
}));

const Description = styled.p<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 400,
  margin: 0,
  lineHeight: 'normal',
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    lineHeight: '22px',
  },
}));

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

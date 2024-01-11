import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import RelativeBudgetBar from '../RelativeBudgetBar/RelativeBudgetBar';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ByExpenseCategoryTableRowProps {
  name: string;
  expense: ExpenseDto;
  relativePercentage?: number;
  total: number;
}

const ByExpenseCategoryTableRow: React.FC<ByExpenseCategoryTableRowProps> = ({
  name,
  expense,
  relativePercentage = 100,
  total,
}) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));

  return (
    <Row isLight={isLight}>
      <MobileColumn>
        <NameColumnComponent name={name} isLight={isLight} />
        {isMobile && <TotalSpendColumnComponent isLight={isLight} total={expense.actuals} />}
      </MobileColumn>

      <TotalPercentageColumnComponent
        isLight={isLight}
        total={total}
        expense={expense}
        maxPercentage={relativePercentage}
      />

      {!isMobile && <TotalSpendColumnComponent isLight={isLight} total={expense.actuals} />}
    </Row>
  );
};

export default ByExpenseCategoryTableRow;

const Row = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 8,
  background: isLight ? '#FFFFFF' : '#1E2C37',
  marginBottom: 8,
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25))',
  borderRadius: 6,

  '&:hover': {
    background: isLight ? '#ECF1F3' : '#31424E',
  },

  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '15px 0',
    boxShadow: 'none',
    background: 'transparent',
    justifyContent: 'normal',
    marginBottom: 0,
    borderRadius: 0,
  },
}));

const MobileColumn = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    width: '100%',
  },
});

const NameColumnComponent: React.FC<WithIsLight & { name: string }> = ({ isLight, name }) => (
  <NameColumn>
    <Name isLight={isLight}>{name}</Name>
  </NameColumn>
);

const TotalPercentageColumnComponent: React.FC<
  WithIsLight & { total: number; expense: ExpenseDto; maxPercentage: number }
> = ({ isLight, total, expense, maxPercentage }) => (
  <TotalPercentageColumn>
    <TotalBarContainer>
      <RelativeBudgetBar
        discontinued={expense.discontinued || 0}
        actuals={expense.actuals}
        prediction={expense.prediction || 0}
        maxPercentage={maxPercentage}
      />
      <TotalPercentage isLight={isLight}>{Math.floor((expense.actuals * 100) / total) || 0}%</TotalPercentage>
    </TotalBarContainer>
  </TotalPercentageColumn>
);

const TotalSpendColumnComponent: React.FC<WithIsLight & { total: number }> = ({ isLight, total }) => (
  <TotalSpendColumn>
    <TotalNumber isLight={isLight}>
      {usLocalizedNumber(Math.round(total))} <DAISpan>DAI</DAISpan>
    </TotalNumber>
  </TotalSpendColumn>
);

const NameColumn = styled.div({
  width: '100%',
  minWidth: 145,
  marginBottom: 10,
  lineHeight: '15px',
  fontSize: 12,

  [lightTheme.breakpoints.up('tablet_768')]: {
    width: '100%',
    minWidth: '100%',
    paddingLeft: 16,
    paddingRight: 4,
    marginBottom: 0,
  },
});

const TotalPercentageColumn = styled.div({
  width: 145,
  minWidth: 145,
  flex: 1,

  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 240,
    minWidth: 240,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 180,
    minWidth: 180,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 240,
    minWidth: 240,
    maxWidth: 240,
  },
});

const TotalSpendColumn = styled.div({
  width: 153,
  minWidth: 153,
  lineHeight: '17px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    textAlign: 'right',
    width: 216,
    minWidth: 216,
    paddingRight: 16,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 170,
    minWidth: 170,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 216,
    minWidth: 216,
  },
});

const Name = styled.span<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '15px',
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '22px',
  },
}));

const TotalBarContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const TotalPercentage = styled.span<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  fontWeight: 400,
  lineHeight: '15px',
  textAlign: 'right',
  color: isLight ? '#231536' : '#D2D4EF',
  width: 34,
  minWidth: 34,
  marginLeft: 4,
}));

const TotalNumber = styled.span<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '17px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '19px',
    letterSpacing: '0.3px',
  },
}));

const DAISpan = styled.span({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '17px',
  textTransform: 'uppercase',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: '#9FAFB9',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    color: 'inherit',
  },
});

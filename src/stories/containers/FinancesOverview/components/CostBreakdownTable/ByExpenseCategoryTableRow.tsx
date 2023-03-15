import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import RelativeBudgetBar from '../RelativeBudgetBar/RelativeBudgetBar';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ByExpenseCategoryTableRowProps {
  name: string;
  total: number;
}

const ByExpenseCategoryTableRow: React.FC<ByExpenseCategoryTableRowProps> = ({ name, total }) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));

  return (
    <Row isLight={isLight}>
      <MobileColumn>
        <NameColumnComponent name={name} isLight={isLight} />
        {isMobile && <TotalSpendColumnComponent isLight={isLight} total={total} />}
      </MobileColumn>

      <TotalPercentageColumnComponent isLight={isLight} />

      {!isMobile && <TotalSpendColumnComponent isLight={isLight} total={total} />}
    </Row>
  );
};

export default ByExpenseCategoryTableRow;

const Row = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 8,
  background: '#FFFFFF',
  marginBottom: 8,
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px rgba(219, 0, 0, 0.8)',
  borderRadius: 6,

  [lightTheme.breakpoints.up('table_834')]: {
    padding: '15px 0',
    boxShadow: 'none',
    background: 'transparent',
    justifyContent: 'normal',
    marginBottom: 0,
  },
}));

const MobileColumn = styled.div({
  display: 'flex',
  flexDirection: 'column',

  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
    width: '100%',
  },
});

const NameColumnComponent: React.FC<WithIsLight & { name: string }> = ({ isLight, name }) => (
  <NameColumn>
    <Name isLight={isLight}>{name}</Name>
  </NameColumn>
);

const TotalPercentageColumnComponent: React.FC<WithIsLight> = ({ isLight }) => (
  <TotalPercentageColumn>
    <TotalBarContainer>
      <RelativeBudgetBar budgetCap={20} actuals={14} prediction={16} />
      <TotalPercentage isLight={isLight}>32%</TotalPercentage>
    </TotalBarContainer>
  </TotalPercentageColumn>
);

const TotalSpendColumnComponent: React.FC<WithIsLight & { total: number }> = ({ isLight, total }) => (
  <TotalSpendColumn>
    <TotalNumber isLight={isLight}>
      {usLocalizedNumber(total)} <DAISpan isLight={isLight}>DAI</DAISpan>
    </TotalNumber>
  </TotalSpendColumn>
);

const NameColumn = styled.div({
  width: 145,
  minWidth: 145,
  marginBottom: 10,
  lineHeight: '15px',
  fontSize: 12,

  [lightTheme.breakpoints.up('table_834')]: {
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

  [lightTheme.breakpoints.up('table_834')]: {
    width: 240,
    minWidth: 240,
  },

  // [lightTheme.breakpoints.up('desktop_1440')]: {
  //   width: 180,
  //   minWidth: 180,
  // },
});

const TotalSpendColumn = styled.div({
  width: 153,
  minWidth: 153,
  lineHeight: '17px',

  [lightTheme.breakpoints.up('table_834')]: {
    textAlign: 'right',
  },

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    width: 256,
    minWidth: 256,
    paddingRight: 16,
  },

  // [lightTheme.breakpoints.up('desktop_1280')]: {
  //   width: 157,
  //   minWidth: 157,
  // },
});

const Name = styled.span<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '15px',
  color: isLight ? '#231536' : 'red',

  [lightTheme.breakpoints.up('table_834')]: {
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
  color: isLight ? '#231536' : 'red',
  width: 34,
  minWidth: 34,
  marginLeft: 4,
}));

const TotalNumber = styled.span<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '17px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#231536' : 'red',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '19px',
    letterSpacing: '0.3px',
  },
}));

const DAISpan = styled.span<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '17px',
  textTransform: 'uppercase',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#9FAFB9' : 'red',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    color: 'inherit',
  },
}));

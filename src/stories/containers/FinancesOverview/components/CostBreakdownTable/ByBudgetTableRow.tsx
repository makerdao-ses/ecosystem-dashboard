import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/light';
import Link from 'next/link';
import React from 'react';
import RelativeBudgetBar from '../RelativeBudgetBar/RelativeBudgetBar';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ByBudgetTableRowProps {
  shortCode: string;
  name: string;
  total: number;
}

const ByBudgetTableRow: React.FC<ByBudgetTableRowProps> = ({ shortCode, name, total }) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));

  return (
    <Row isLight={isLight}>
      <MobileColumn>
        <NameColumnComponent isLight={isLight} shortCode={shortCode} name={name} />
        {isMobile && <TotalSpendColumnComponent isLight={isLight} total={total} />}
      </MobileColumn>

      <TotalPercentageColumnComponent isLight={isLight} />
      {!isMobile && <TotalSpendColumnComponent isLight={isLight} total={total} />}

      <ViewColumn>
        <Link href={siteRoutes.coreUnitReports(shortCode)}>
          <ViewLink>View</ViewLink>
        </Link>
      </ViewColumn>
    </Row>
  );
};

export default ByBudgetTableRow;

const NameColumnComponent: React.FC<WithIsLight & { shortCode: string; name: string }> = ({
  isLight,
  shortCode,
  name,
}) => (
  <NameColumn>
    <ShortCode isLight={isLight}>{shortCode}</ShortCode>
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
      {usLocalizedNumber(total)} <DAISpan>DAI</DAISpan>
    </TotalNumber>
  </TotalSpendColumn>
);

const Row = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 8,
  background: isLight ? '#FFFFFF' : '#1E2C37',
  marginBottom: 8,
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
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

const NameColumn = styled.div({
  width: '100%',
  marginBottom: 9.2,
  lineHeight: '15px',
  fontSize: 14,

  [lightTheme.breakpoints.up('table_834')]: {
    paddingLeft: 16,
    paddingRight: 4,
    marginBottom: 0,
  },
});

const TotalPercentageColumn = styled.div({
  width: 145,
  minWidth: 145,

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    width: 183.5,
    minWidth: 183.5,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 170,
    minWidth: 170,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 180,
    minWidth: 180,
  },
});

const TotalSpendColumn = styled.div({
  width: 153,
  minWidth: 153,

  [lightTheme.breakpoints.up('table_834')]: {
    textAlign: 'right',
  },

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    width: 183.5,
    minWidth: 183.5,
    paddingRight: 4,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 157,
    minWidth: 157,
  },
});

const ViewColumn = styled.div({
  width: 70,
  minWidth: 70,
  textAlign: 'center',
  display: 'none',

  [lightTheme.breakpoints.up('table_834')]: {
    display: 'block',
  },

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    width: 93,
    minWidth: 93,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 80,
    minWidth: 80,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 97,
    minWidth: 97,
  },
});

const ShortCode = styled.span<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  fontWeight: 800,
  lineHeight: '15px',
  letterSpacing: 0.3,
  textTransform: 'uppercase',
  color: isLight ? '#9FAFB9' : '#546978',
  marginRight: 4,

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '22px',
  },
}));

const Name = styled.span<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  fontWeight: 400,
  lineHeight: '15px',
  color: isLight ? '#231536' : '#D2D4EF ',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
    lineHeight: '22px',
  },
}));

const TotalBarContainer = styled.div({
  display: 'flex',
  alignItems: 'center',

  [lightTheme.breakpoints.up('table_834')]: {
    padding: '0 8px',
  },
});

const TotalPercentage = styled.span<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  fontWeight: 400,
  lineHeight: '15px',
  textAlign: 'right',
  color: isLight ? '#231536' : '#D2D4EF ',
  width: 34,
  minWidth: 34,
  marginLeft: 4,
}));

const TotalNumber = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '17px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#231536' : '#D2D4EF',
  paddingRight: 4,

  [lightTheme.breakpoints.up('table_834')]: {
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

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    color: 'inherit',
  },
});

const ViewLink = styled.a({
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '18px',
  color: '#1AAB9B',
});

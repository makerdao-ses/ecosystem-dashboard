import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/light';
import Link from 'next/link';
import React from 'react';
import MobileArrowSvg from '../MobileArrowSvg/MobileArrowSvg';
import RelativeBudgetBar from '../RelativeBudgetBar/RelativeBudgetBar';
import type { ExtendedExpense } from '../../financesOverviewTypes';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ByBudgetTableRowProps {
  expense: ExtendedExpense;
  total: number;
  relativePercentage?: number;
  rowType: 'coreUnit' | 'delegate' | 'remaining' | 'ecosystemActor';
}

const ByBudgetTableRow: React.FC<ByBudgetTableRowProps> = ({
  expense,
  total,
  relativePercentage = 100,
  rowType = 'coreUnit',
}) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));

  const link =
    rowType === 'coreUnit'
      ? siteRoutes.coreUnitReports(expense.shortCode ?? '')
      : rowType === 'delegate' || expense.shortCode === 'DEL'
      ? siteRoutes.recognizedDelegateReport
      : rowType === 'ecosystemActor'
      ? siteRoutes.ecosystemActorReports(expense.shortCode ?? '')
      : rowType === 'remaining' && expense.shortCode === 'EA'
      ? siteRoutes.ecosystemActors
      : siteRoutes.coreUnitsOverview;

  return (
    <NavigableOnMobileRow isLight={isLight} isMobile={isMobile} href={link}>
      <MobileColumn>
        <NameColumnComponent isLight={isLight} shortCode={expense.shortCode ?? ''} name={expense.name} />
        {isMobile && <TotalSpendColumnComponent isLight={isLight} total={expense.actuals} />}
      </MobileColumn>

      <TotalPercentageColumnComponent
        isLight={isLight}
        total={total}
        expense={expense}
        maxPercentage={relativePercentage}
      />
      {!isMobile && <TotalSpendColumnComponent isLight={isLight} total={expense.actuals} />}

      <ViewColumn isLight={isLight}>
        {isMobile ? (
          <MobileArrow isLight={isLight}>
            <MobileArrowSvg />
          </MobileArrow>
        ) : (
          <Link href={link} passHref legacyBehavior>
            <ViewLink isLight={isLight}>View</ViewLink>
          </Link>
        )}
      </ViewColumn>
    </NavigableOnMobileRow>
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

const TotalPercentageColumnComponent: React.FC<
  WithIsLight & { total: number; expense: ExtendedExpense; maxPercentage: number }
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

const NavigableOnMobileRow: React.FC<WithIsLight & React.PropsWithChildren & { isMobile: boolean; href: string }> = ({
  isLight,
  isMobile,
  href,
  children,
}) => {
  if (isMobile) {
    return (
      <Link href={href} passHref legacyBehavior>
        <Row isLight={isLight} as={'a'}>
          {children}
        </Row>
      </Link>
    );
  }

  return <Row isLight={isLight}>{children}</Row>;
};

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
  gap: 16,

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

  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 0,
  },
}));

const MobileColumn = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '37%',
  flex: 1,

  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    width: '30%',
    flex: 1.55,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    flex: 1.35,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    flex: 'auto',
  },
});

const NameColumn = styled.div({
  width: '100%',
  marginBottom: 9.2,
  lineHeight: '14px',
  fontSize: 14,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  [lightTheme.breakpoints.up('tablet_768')]: {
    paddingLeft: 16,
    paddingRight: 4,
    marginBottom: 0,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    lineHeight: '23px',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    whiteSpace: 'normal',
    paddingRight: 0,
  },
});

const TotalPercentageColumn = styled.div({
  flex: 1.1,
  marginLeft: 'auto',

  [lightTheme.breakpoints.up('tablet_768')]: {
    flex: 1,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 166,
    minWidth: 166,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 184,
    minWidth: 184,
  },
});

const TotalSpendColumn = styled.div({
  width: 153,
  minWidth: 153,

  [lightTheme.breakpoints.up('tablet_768')]: {
    textAlign: 'right',
    flex: 0.85,
    minWidth: 'auto',
    width: 'auto',
  },

  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    paddingRight: 4,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    flex: 0.95,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 140,
    minWidth: 140,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 150,
    minWidth: 150,
  },
});

const ViewColumn = styled.div<WithIsLight>(({ isLight }) => ({
  textAlign: 'center',
  display: 'block',
  borderLeft: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
  padding: '5px 4px 5px 7px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'block',
    borderLeft: 'none',
    padding: '0 14px 0 0',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    padding: '0 23px 0 11px',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '0 14px 0 16px',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '0 19px',
  },
}));

const ShortCode = styled.span<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  fontWeight: 800,
  lineHeight: '14px',
  letterSpacing: 0.3,
  textTransform: 'uppercase',
  color: isLight ? '#9FAFB9' : '#546978',
  marginRight: 4,

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '22px',
  },
}));

const Name = styled.span<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  fontWeight: 400,
  lineHeight: '14px',
  color: isLight ? '#231536' : '#D2D4EF ',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    lineHeight: '22px',
  },
}));

const TotalBarContainer = styled.div({
  display: 'flex',
  alignItems: 'center',

  [lightTheme.breakpoints.up('tablet_768')]: {
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

  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 44,
    minWidth: 44,
  },
}));

const TotalNumber = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '17px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#231536' : '#D2D4EF',
  paddingRight: 4,

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

const MobileArrow = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 32,
  height: 32,
  borderRadius: 6,
  background: isLight ? '#F9FAFF' : 'rgba(60, 62, 100, 0.50)',
  boxShadow: isLight ? '0px 2px 3px 0px #DEE1F4' : '0px 2px 3px 0px #040C27',
}));

const ViewLink = styled.a<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '18px',
  color: isLight ? '#31424E' : '#E2D8EE',
  padding: '7px 23px',
  borderRadius: 22,
  border: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
}));

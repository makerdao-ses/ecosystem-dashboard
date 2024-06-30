import { styled } from '@mui/material';
import { BASE_URL } from '@ses/config/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { BudgetStatus } from '@/core/models/interfaces/types';
import ExpenseReportStatus from '../ExpenseReportStatus/ExpenseReportStatus';

export type ExpenseReportStatusIndicatorProps = {
  budgetStatus?: BudgetStatus;
  showCTA: boolean;
  className?: string;
};

const ExpenseReportStatusIndicator: React.FC<ExpenseReportStatusIndicatorProps> = ({
  budgetStatus,
  showCTA,
  className,
}) => {
  const router = useRouter();
  const url = useMemo(() => {
    const currentUrl = new URL(router.asPath, BASE_URL);
    const currentQueryParams = new URLSearchParams(currentUrl.search);
    currentQueryParams.set('section', 'comments');

    return `${currentUrl.pathname}?${currentQueryParams.toString()}${currentUrl.hash}`;
  }, [router.asPath]);

  return (
    <IndicatorContainer className={className}>
      {budgetStatus && <ExpenseReportStatus status={budgetStatus} />}
      {showCTA && budgetStatus !== BudgetStatus.Final && (
        <Link href={url} shallow={true} legacyBehavior>
          <StyledLink>Go to {budgetStatus}</StyledLink>
        </Link>
      )}
    </IndicatorContainer>
  );
};

export default ExpenseReportStatusIndicator;

const IndicatorContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 8,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 0,
    marginLeft: 16,
  },
}));

const StyledLink = styled('a')(({ theme }) => ({
  marginLeft: 8,
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '18px',
  color: '#447AFB',
  cursor: 'pointer',
  minWidth: 'fit-content',

  [theme.breakpoints.up('table_834')]: {
    fontSize: 16,
  },
}));

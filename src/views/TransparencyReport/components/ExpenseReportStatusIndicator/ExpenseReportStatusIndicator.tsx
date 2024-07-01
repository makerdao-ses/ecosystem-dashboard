import styled from '@emotion/styled';
import { BASE_URL } from '@ses/config/routes';
import lightTheme from '@ses/styles/theme/themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { BudgetStatus } from '@/core/models/dto/coreUnitDTO';
import ExpenseReportStatus from '@/views/CoreUnitBudgetStatement/components/ExpenseReportStatus/ExpenseReportStatus';

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

const IndicatorContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginTop: 8,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 0,
    marginLeft: 16,
  },
});

const StyledLink = styled.a({
  marginLeft: 8,
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '18px',
  color: '#447AFB',
  cursor: 'pointer',
  minWidth: 'fit-content',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
  },
});

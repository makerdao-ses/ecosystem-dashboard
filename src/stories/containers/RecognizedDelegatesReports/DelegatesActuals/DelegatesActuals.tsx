import styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AdvancedInnerTable } from '@ses/components/AdvancedInnerTable/AdvancedInnerTable';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import { TransparencyEmptyTable } from '@ses/containers/TransparencyReport/components/Placeholders/TransparencyEmptyTable';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ResourceType } from '@ses/core/models/interfaces/types';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import { useDelegatesActuals } from './useDelegatesActuals';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { DateTime } from 'luxon';

interface Props {
  currentMonth: DateTime;
  budgetStatement: BudgetStatement[];
}

const DelegatesActuals: React.FC<Props> = ({ currentMonth, budgetStatement }) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.between('mobile_375', 'table_834'));

  const {
    breakdownColumnsActuals,
    breakdownItemsActuals,
    currentBudgetStatement,
    mainTableColumnsActuals,
    mainTableItemsActuals,
  } = useDelegatesActuals(currentMonth, budgetStatement);
  return (
    <Container>
      {currentBudgetStatement && (
        <TransactionLink isLight={isLight}>
          View the
          <CustomLink
            children="onchain transactions for recognized delegates"
            href="https://makerburn.com/#/expenses/core-units/DELEGATES"
            fontSize={isMobile ? 14 : 16}
            lineHeight="18px"
            iconWidth={10}
            iconHeight={10}
          />
        </TransactionLink>
      )}
      <TotalsMonth isLight={isLight}>{currentMonth.toFormat('MMM yyyy')} Totals</TotalsMonth>
      <AdvancedInnerTable
        columns={mainTableColumnsActuals}
        items={mainTableItemsActuals}
        style={{ marginBottom: '64px' }}
        cardsTotalPosition="top"
        longCode="DEL"
        tablePlaceholder={
          <TransparencyEmptyTable breakdown longCode="DEL" shortCode="DEL" resource={ResourceType.Delegates} />
        }
      />
      {mainTableItemsActuals.length > 0 && (
        <TitleBreakdown isLight={isLight}>{currentMonth.toFormat('MMM yyyy')} Breakdown</TitleBreakdown>
      )}
      {mainTableItemsActuals.length > 0 && (
        <AdvancedInnerTable
          columns={breakdownColumnsActuals}
          items={breakdownItemsActuals}
          longCode="DEL"
          style={{ marginBottom: '64px' }}
          tablePlaceholder={
            <TransparencyEmptyTable breakdown longCode="DEL" shortCode="DEL" resource={ResourceType.Delegates} />
          }
        />
      )}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const TransactionLink = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'inline',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  marginBottom: 32,
  '> a ': {
    whiteSpace: 'unset',
  },
  color: isLight ? '#231536' : '#D2D4EF',
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'block',
    fontSize: 16,
    lineHeight: '22px',
    '> a ': {
      fontSize: 16,
      lineHeight: '18px',
    },
  },
}));

const TotalsMonth = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  color: isLight ? '#231536' : '#9FAFB9',
  marginBottom: 16,
  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: 24,
    fontSize: '20px',
    lineHeight: '24px',
  },
}));

const TitleBreakdown = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.4px',
  marginTop: 40,
  marginBottom: 32,
  color: isLight ? '#231536' : '#9FAFB9',

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 0,
    fontSize: '20px',
    lineHeight: '24px',
  },
}));
export default DelegatesActuals;

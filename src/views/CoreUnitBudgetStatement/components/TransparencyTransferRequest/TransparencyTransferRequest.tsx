import styled from '@emotion/styled';
import { AdvancedInnerTable } from '@ses/components/AdvancedInnerTable/AdvancedInnerTable';
import React from 'react';
import { Title } from '../../CoreUnitBudgetStatementView';
import { TransparencyEmptyTable } from '../Placeholders/TransparencyEmptyTable';
import { useTransparencyTransferRequest } from './useTransparencyTransferRequest';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { ResourceType } from '@ses/core/models/interfaces/types';
import type { DateTime } from 'luxon';

interface TransparencyTransferRequestProps {
  currentMonth: DateTime;
  budgetStatements: BudgetStatement[];
  longCode: string;
  shortCode: string;
  headline: React.ReactNode;
  resource: ResourceType;
}

export const TransparencyTransferRequest: React.FC<TransparencyTransferRequestProps> = ({
  currentMonth,
  budgetStatements,
  longCode,
  shortCode,
  headline,
  resource,
}) => {
  const { mainTableColumns, mainTableItems } = useTransparencyTransferRequest(currentMonth, budgetStatements);

  return (
    <Container>
      {headline}

      <Title>{currentMonth.toFormat('MMM yyyy')} Totals</Title>
      <div style={{ marginTop: 32 }}>
        <AdvancedInnerTable
          columns={mainTableColumns}
          items={mainTableItems}
          style={{ marginBottom: '64px' }}
          cardsTotalPosition={'top'}
          longCode={longCode}
          tablePlaceholder={<TransparencyEmptyTable longCode={longCode} shortCode={shortCode} resource={resource} />}
        />
      </div>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

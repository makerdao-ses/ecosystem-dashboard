import React from 'react';
import styled from '@emotion/styled';
import { DateTime } from 'luxon';
import { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import { useTransparencyTransferRequestMvvm2 } from './transparency-transfer-request-2.mvvm';
import { AdvancedInnerTable } from '../../../components/advanced-inner-table/advanced-inner-table';

interface Props {
  currentMonth: DateTime;
  budgetStatements: BudgetStatementDto[];
}

export const TransparencyTransferRequest2 = (
  props: Props
) => {
  const {
    mainTableColumns,
    mainTableItems
  } = useTransparencyTransferRequestMvvm2(
    props.currentMonth,
    props.budgetStatements
  );

  return (
    <Container>
      <AdvancedInnerTable
        columns={mainTableColumns}
        items={mainTableItems}
        style={{ marginBottom: '64px' }}
        cardsTotalPosition={'top'}
      />
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

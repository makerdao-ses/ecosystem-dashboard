import styled from '@emotion/styled';
import React from 'react';
import { AdvancedInnerTable } from '@/components/AdvancedInnerTable/AdvancedInnerTable';
import { Title } from '../../CoreUnitBudgetStatementView';
import { TransparencyEmptyTable } from '../Placeholders/TransparencyEmptyTable';
import MkrVestingInfo from './MkrVestingInfo';
import MkrVestingTotalFTE from './MkrVestingTotalFTE';
import { useTransparencyMkrVesting } from './useTransparencyMkrVesting';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { ResourceType } from '@ses/core/models/interfaces/types';
import type { DateTime } from 'luxon';

interface TransparencyMkrVestingProps {
  currentMonth: DateTime;
  budgetStatements: BudgetStatement[];
  longCode: string;
  shortCode: string;
  headline: React.ReactNode;
  resource: ResourceType;
}

export const TransparencyMkrVesting: React.FC<TransparencyMkrVestingProps> = ({
  currentMonth,
  budgetStatements,
  longCode,
  shortCode,
  headline,
  resource,
}) => {
  const { mainTableItems, mainTableColumns, FTEs } = useTransparencyMkrVesting(currentMonth, budgetStatements);

  return (
    <Container>
      {headline}

      <Title marginBottom={24}>MKR Vesting Overview</Title>
      <MkrVestingTotalFTE totalFTE={FTEs} />

      <AdvancedInnerTable
        columns={mainTableColumns}
        items={mainTableItems}
        longCode={longCode}
        tablePlaceholder={<TransparencyEmptyTable longCode={longCode} shortCode={shortCode} resource={resource} />}
      />
      {mainTableItems.length > 0 && (
        <MkrInfoContainer>
          <MkrVestingInfo />
        </MkrInfoContainer>
      )}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const MkrInfoContainer = styled.div({
  marginTop: 32,
  marginBottom: 90,
});

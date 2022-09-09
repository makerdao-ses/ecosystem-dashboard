import React from 'react';
import styled from '@emotion/styled';
import { Tabs } from '../../../components/tabs/tabs';
import { DateTime } from 'luxon';
import { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import _ from 'lodash';
import { useTransparencyActualsMvvm2 } from './transparency-actuals-2.mvvm';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { TransparencyEmptyTable } from '../placeholders/transparency-empty-table';
import { AdvancedInnerTable } from '../../../components/advanced-inner-table/advanced-inner-table';
import { Title } from '../transparency-report';

interface Props {
  currentMonth: DateTime;
  budgetStatements?: BudgetStatementDto[];
  code: string;
}

export const TransparencyActuals2 = (props: Props) => {
  const isLight = useThemeContext().themeMode === 'light';

  const {
    headerIds,
    thirdIndex,
    breakdownTitleRef,
    breakdownColumns,
    breakdownItems,
    mainTableColumns,
    mainTableItems,
    breakdownTabs,
  } = useTransparencyActualsMvvm2(
    props.currentMonth,
    props.budgetStatements,
    props.code
  );

  return (
    <Container>
      <Title isLight={isLight} responsiveMarginBottom={16}>
        {props.currentMonth.toFormat('MMM yyyy')} Totals
      </Title>

      <AdvancedInnerTable
        columns={mainTableColumns}
        items={mainTableItems}
        style={{ marginBottom: '64px' }}
        cardsTotalPosition="top"
      />

      <Title isLight={isLight} ref={breakdownTitleRef}>
        {props.currentMonth.toFormat('MMM yyyy')} Breakdown
      </Title>

      {mainTableItems.length > 0 && (
        <Tabs
          items={breakdownTabs.map((header, i) => {
            return {
              item: header,
              id: headerIds[i],
            };
          })}
          currentIndex={thirdIndex}
          style={{
            marginBottom: '32px',
          }}
        />
      )}

      <AdvancedInnerTable
        columns={breakdownColumns}
        items={breakdownItems}
        style={{ marginBottom: '64px' }}
        tablePlaceholder={<TransparencyEmptyTable breakdown />}
      />
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

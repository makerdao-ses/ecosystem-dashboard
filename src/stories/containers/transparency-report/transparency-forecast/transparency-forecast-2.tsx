import React from 'react';
import { DateTime } from 'luxon';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { useTransparencyForecastMvvm2 } from './transparency-forecast-2.mvvm';
import { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import { Title } from '../transparency-report';
import { AdvancedInnerTable } from '../../../components/advanced-inner-table/advanced-inner-table';
import { TransparencyEmptyTable } from '../placeholders/transparency-empty-table';
import { Tabs } from '../../../components/tabs/tabs';

interface Props {
  currentMonth: DateTime;
  budgetStatements: BudgetStatementDto[];
}

export const TransparencyForecast2 = (props: Props) => {
  const isLight = useThemeContext().themeMode === 'light';

  const {
    thirdIndex,
    headerIds,
    mainTableColumns,
    mainTableItems,
    breakdownHeaders,
    breakdownItems,
    breakdownTitleRef,
    breakdownTabs,
  } = useTransparencyForecastMvvm2(props.currentMonth, props.budgetStatements);

  return (
    <Container>
      <Title isLight={isLight} marginBottom={16}>
        {props.currentMonth.toFormat('MMM yyyy')} Totals
      </Title>

      <AdvancedInnerTable
        columns={mainTableColumns}
        items={mainTableItems}
        style={{ marginBottom: '64px' }}
        cardsTotalPosition={'top'}
      />

      <Title isLight={isLight} marginBottom={24} ref={breakdownTitleRef}>
        {props.currentMonth.toFormat('MMM yyyy')} Breakdown
      </Title>

      {!!breakdownItems.length && <Tabs
        items={breakdownTabs.map((header, i) => {
          return {
            item: header,
            id: headerIds[i],
          };
        })}
        style={{ marginBottom: '64px' }}
        currentIndex={thirdIndex}
      />}

      <AdvancedInnerTable
        columns={breakdownHeaders}
        items={breakdownItems}
        tablePlaceholder={<TransparencyEmptyTable breakdown />}
      />
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

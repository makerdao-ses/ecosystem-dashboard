import styled from '@emotion/styled';
import React from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { MAKER_BURN_LINK } from '../../../../core/utils/const';
import { getShortCode } from '../../../../core/utils/string.utils';
import { AdvancedInnerTable } from '../../../components/AdvancedInnerTable/AdvancedInnerTable';
import { CustomLink } from '../../../components/custom-link/custom-link';
import { Tabs } from '../../../components/tabs/tabs';
import { TransparencyEmptyTable } from '../placeholders/transparency-empty-table';
import { LinkDescription } from '../transparency-actuals/transparency-actuals-2';
import { Title } from '../transparency-report';
import { useTransparencyForecastMvvm2 } from './transparency-forecast-2.mvvm';
import type { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import type { DateTime } from 'luxon';

interface Props {
  currentMonth: DateTime;
  budgetStatements: BudgetStatementDto[];
  code: string;
  longCode: string;
}

export const TransparencyForecast2 = (props: Props) => {
  const { isLight } = useThemeContext();

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
      <LinkDescription isLight={isLight}>
        <span> Visit makerburn.com to</span>
        <CustomLink
          href={`${MAKER_BURN_LINK}/${props.longCode}`}
          style={{
            flexWrap: 'wrap',
            color: '#447AFB',
            letterSpacing: '0.3px',
            lineHeight: '18px',
            marginBottom: '16px',
            whiteSpace: 'break-spaces',
            display: 'inline-block',
            marginLeft: 0,
          }}
          fontSize={16}
          fontWeight={500}
          iconWidth={10}
          iconHeight={10}
          marginLeft="7px"
        >
          {`view the ${getShortCode(props.code)} Core Unit on-chain transaction history`}
        </CustomLink>
      </LinkDescription>
      <Title isLight={isLight} marginBottom={16}>
        {props.currentMonth.toFormat('MMM yyyy')} Totals
      </Title>
      <AdvancedInnerTable
        longCode={props.longCode}
        columns={mainTableColumns}
        items={mainTableItems}
        style={{ marginBottom: '64px' }}
        cardsTotalPosition={'top'}
      />
      {!!breakdownItems.length && (
        <Title isLight={isLight} marginBottom={24} ref={breakdownTitleRef}>
          {props.currentMonth.toFormat('MMM yyyy')} Breakdown
        </Title>
      )}

      {!!breakdownItems.length && (
        <Tabs
          items={breakdownTabs.map((header, i) => ({
            item: header,
            id: headerIds[i],
          }))}
          style={{ marginBottom: '64px' }}
          currentIndex={thirdIndex}
        />
      )}

      {!!breakdownItems.length && (
        <AdvancedInnerTable
          longCode={props.longCode}
          columns={breakdownHeaders}
          items={breakdownItems}
          tablePlaceholder={<TransparencyEmptyTable breakdown longCode={props.longCode} />}
        />
      )}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 64,
});

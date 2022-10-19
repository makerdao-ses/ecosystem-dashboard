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
import { LinkDescription } from '../transparency-actuals/transparency-actuals-2';
import { CustomLink } from '../../../components/custom-link/custom-link';
import { getShortCode } from '../../../../core/utils/string.utils';
import { MAKER_BURN_LINK } from '../../../../core/utils/const';

interface Props {
  currentMonth: DateTime;
  budgetStatements: BudgetStatementDto[];
  code: string;
  longCode: string;
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
      <LinkDescription isLight={isLight}>
        <span>To see the onchain transactions from the Maker Protocol to the {getShortCode(props.code)} Core Unit</span>
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
          }}
          fontSize={16}
          fontWeight={500}
          iconWidth={10}
          iconHeight={10}
          marginLeft="7px"
        >
          visit makerburn.com
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
          items={breakdownTabs.map((header, i) => {
            return {
              item: header,
              id: headerIds[i],
            };
          })}
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
});

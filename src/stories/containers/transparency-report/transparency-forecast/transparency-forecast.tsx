import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { MAKER_BURN_LINK } from '../../../../core/utils/const';
import { getShortCode } from '../../../../core/utils/string';
import { AdvancedInnerTable } from '../../../components/AdvancedInnerTable/AdvancedInnerTable';
import { CustomLink } from '../../../components/CustomLink/CustomLink';
import { Tabs } from '../../../components/Tabs/Tabs';
import { TransparencyEmptyTable } from '../placeholders/transparency-empty-table';
import { LinkDescription } from '../transparency-actuals/transparency-actuals';
import { Title } from '../transparency-report';
import { useTransparencyForecast } from './useTransparencyForecast';
import type { BudgetStatementDto } from '../../../../core/models/dto/coreUnitDTO';
import type { DateTime } from 'luxon';

interface Props {
  currentMonth: DateTime;
  budgetStatements: BudgetStatementDto[];
  code: string;
  longCode: string;
}

export const TransparencyForecast = (props: Props) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));

  const {
    thirdIndex,
    headerIds,
    mainTableColumns,
    mainTableItems,
    breakdownHeaders,
    breakdownItems,
    breakdownTitleRef,
    breakdownTabs,
  } = useTransparencyForecast(props.currentMonth, props.budgetStatements);

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
            marginBottom: isMobile ? '0px' : '32px',
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
      <Title isLight={isLight}>{props.currentMonth.toFormat('MMM yyyy')} Totals</Title>
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

import styled from '@emotion/styled';
import React from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { MAKER_BURN_LINK } from '../../../../core/utils/const';
import { getShortCode } from '../../../../core/utils/string.utils';
import { AdvancedInnerTable } from '../../../components/AdvancedInnerTable/AdvancedInnerTable';
import { CustomLink } from '../../../components/custom-link/custom-link';
import { Tabs } from '../../../components/tabs/tabs';
import { TransparencyEmptyTable } from '../placeholders/transparency-empty-table';
import { Title } from '../transparency-report';
import { useTransparencyActualsMvvm2 } from './transparency-actuals-2.mvvm';
import type { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import type { DateTime } from 'luxon';

interface Props {
  currentMonth: DateTime;
  budgetStatements?: BudgetStatementDto[];
  code: string;
  longCode: string;
}

export const TransparencyActuals2 = (props: Props) => {
  const { isLight } = useThemeContext();

  const {
    headerIds,
    thirdIndex,
    breakdownTitleRef,
    breakdownColumns,
    breakdownItems,
    mainTableColumns,
    mainTableItems,
    breakdownTabs,
  } = useTransparencyActualsMvvm2(props.currentMonth, props.budgetStatements);

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
            marginLeft: 0,
            whiteSpace: 'break-spaces',
            display: 'inline-block',
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
      <Title isLight={isLight} responsiveMarginBottom={16}>
        {props.currentMonth.toFormat('MMM yyyy')} Totals
      </Title>
      <AdvancedInnerTable
        columns={mainTableColumns}
        items={mainTableItems}
        style={{ marginBottom: '64px' }}
        cardsTotalPosition="top"
        longCode={props.longCode}
      />
      {mainTableItems.length > 0 && (
        <Title isLight={isLight} ref={breakdownTitleRef}>
          {props.currentMonth.toFormat('MMM yyyy')} Breakdown
        </Title>
      )}

      {mainTableItems.length > 0 && (
        <Tabs
          items={breakdownTabs.map((header, i) => ({
            item: header,
            id: headerIds[i],
          }))}
          currentIndex={thirdIndex}
          style={{
            marginBottom: '32px',
          }}
        />
      )}

      {mainTableItems.length > 0 && (
        <AdvancedInnerTable
          columns={breakdownColumns}
          items={breakdownItems}
          longCode={props.longCode}
          style={{ marginBottom: '64px' }}
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

export const LinkDescription = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '22px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom: '32px',
  span: {
    marginRight: 4,
  },
}));

import styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AdvancedInnerTable } from '@ses/components/AdvancedInnerTable/AdvancedInnerTable';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import Tabs from '@ses/components/Tabs/Tabs';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { MAKER_BURN_LINK } from '@ses/core/utils/const';
import { getShortCode } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { Title } from '../../TransparencyReport';
import { TransparencyEmptyTable } from '../Placeholders/TransparencyEmptyTable';
import { useTransparencyActuals } from './useTransparencyActuals';
import type { BudgetStatementDto } from '@ses/core/models/dto/coreUnitDTO';
import type { DateTime } from 'luxon';

interface Props {
  currentMonth: DateTime;
  budgetStatements?: BudgetStatementDto[];
  code: string;
  longCode: string;
}

export const TransparencyActuals = (props: Props) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));

  const {
    headerIds,
    breakdownTitleRef,
    breakdownColumnsForActiveTab,
    breakdownItemsForActiveTab,
    mainTableColumns,
    mainTableItems,
    breakdownTabs,
  } = useTransparencyActuals(props.currentMonth, props.budgetStatements);

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
      <Title isLight={isLight}>{props.currentMonth.toFormat('MMM yyyy')} Totals</Title>
      <AdvancedInnerTable
        columns={mainTableColumns}
        items={mainTableItems}
        style={{ marginBottom: '64px' }}
        cardsTotalPosition="top"
        longCode={props.longCode}
        tablePlaceholder={
          <div style={{ marginBottom: 64 }}>
            <TransparencyEmptyTable longCode={props.longCode} />
          </div>
        }
      />
      {mainTableItems.length > 0 && (
        <Title isLight={isLight} ref={breakdownTitleRef}>
          {props.currentMonth.toFormat('MMM yyyy')} Breakdown
        </Title>
      )}

      {mainTableItems.length > 0 && (
        <Tabs
          tabs={breakdownTabs.map((header, i) => ({
            item: header,
            id: headerIds[i],
          }))}
        />
      )}

      {mainTableItems.length > 0 && (
        <AdvancedInnerTable
          columns={breakdownColumnsForActiveTab}
          items={breakdownItemsForActiveTab}
          longCode={props.longCode}
          style={{ marginBottom: '64px' }}
          tablePlaceholder={
            <div style={{ marginBottom: 64 }}>
              <TransparencyEmptyTable breakdown longCode={props.longCode} />
            </div>
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

export const LinkDescription = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '22px',
  color: isLight ? '#231536' : '#D2D4EF',
  span: {
    marginRight: 4,
  },
}));

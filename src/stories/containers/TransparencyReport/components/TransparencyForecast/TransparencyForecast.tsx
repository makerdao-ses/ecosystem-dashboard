import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { AdvancedInnerTable } from '@ses/components/AdvancedInnerTable/AdvancedInnerTable';
import ContainerModal from '@ses/components/BasicModal/ContainerModal';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import Tabs from '@ses/components/Tabs/Tabs';
import { BasicModalExtended } from '@ses/containers/FinancesOverview/FinancesOverviewContainer';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { MAKER_BURN_LINK } from '@ses/core/utils/const';
import { getShortCode } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { Title } from '../../TransparencyReport';
import { FORECAST_BREAKDOWN_QUERY_PARAM } from '../../utils/constants';
import { TransparencyEmptyTable } from '../Placeholders/TransparencyEmptyTable';
import { BreakdownTableWrapper, LinkDescription } from '../TransparencyActuals/TransparencyActuals';
import { useTransparencyForecast } from './useTransparencyForecast';
import type { BudgetStatementDto } from '@ses/core/models/dto/coreUnitDTO';
import type { ExpenseCategory } from '@ses/core/models/dto/expenseCategoriesDTO';
import type { DateTime } from 'luxon';

interface Props {
  currentMonth: DateTime;
  budgetStatements: BudgetStatementDto[];
  code: string;
  longCode: string;
  expenseCategories: ExpenseCategory[];
}

export const TransparencyForecast = (props: Props) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));

  const {
    headerIds,
    mainTableColumns,
    mainTableItems,
    breakdownColumnsForActiveTab,
    breakdownItems,
    breakdownTitleRef,
    breakdownTabs,
    handleCloseModal,
    openModal,
    headCountCategory,
    notHeadCountCategory,
    handleChangeItemAccordion,
    checkOut,
    handleCheckedExpandedAll,
  } = useTransparencyForecast(props.currentMonth, props.budgetStatements, props.expenseCategories);

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
      {!!mainTableItems?.length && (
        <Title isLight={isLight} marginBottom={24} ref={breakdownTitleRef}>
          {props.currentMonth.toFormat('MMM yyyy')} Breakdown
        </Title>
      )}

      {!!mainTableItems?.length && (
        <Tabs
          tabs={breakdownTabs.map((header, i) => ({
            item: header,
            id: headerIds[i],
          }))}
          tabQuery={FORECAST_BREAKDOWN_QUERY_PARAM}
        />
      )}

      {!!mainTableItems?.length && (
        <BreakdownTableWrapper>
          <AdvancedInnerTable
            longCode={props.longCode}
            columns={breakdownColumnsForActiveTab}
            items={breakdownItems}
            cardSpacingSize="small"
            tablePlaceholder={<TransparencyEmptyTable breakdown longCode={props.longCode} />}
          />
        </BreakdownTableWrapper>
      )}
      <BasicModalExtended
        handleClose={handleCloseModal}
        open={openModal}
        backdropProps={{
          style: {
            background: isLight ? 'rgba(52, 52, 66, 0.1)' : 'rgba(0, 22, 78, 0.1)',
            backdropFilter: isLight ? 'blur(2px);' : 'blur(4px)',
          },
        }}
      >
        <ContainerModal
          headCountCategories={headCountCategory}
          noHeadCountCategories={notHeadCountCategory}
          isCheckedExpandedAll={checkOut}
          handleCloseModal={handleCloseModal}
          setIsCheckedExpandedAll={handleCheckedExpandedAll}
          handleChangeItemAccordion={handleChangeItemAccordion}
        />
      </BasicModalExtended>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 64,
});

import { styled } from '@mui/material';

import React from 'react';
import { AdvancedInnerTable } from '@/components/AdvancedInnerTable/AdvancedInnerTable';
import CategoryModalComponent from '@/components/AdvancedInnerTable/BasicModal/CategoryModalComponent';
import Container from '@/components/Container/Container';
import CuHeadlineText from '@/components/CuHeadlineText/CuHeadlineText';
import BudgetStatementsPlaceholder from '@/components/PlaceHolders/BudgetStatementsPlaceholder';

import Tabs from '@/components/Tabs/Tabs';
import {
  ACTUALS_BREAKDOWN_QUERY_PARAM,
  BREAKDOWN_VIEW_QUERY_KEY,
  FORECAST_BREAKDOWN_QUERY_PARAM,
} from '@/views/CoreUnitBudgetStatement/utils/constants';
import MkrVestingTotalFTE from '../BudgetStatementMkrVesting/MkrVestingTotalFTE';
import ExpenseSection from './components/ExpenseSection/ExpenseSection';
import SectionTitle from './components/SectionTitle/SectionTitle';
import useExpenseReport from './useExpenseReport';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { ResourceType } from '@ses/core/models/interfaces/types';
import type { DateTime } from 'luxon';

interface ExpenseReportProps {
  currentMonth: DateTime;
  budgetStatements?: BudgetStatement[];
  code: string;
  longCode: string;
  resource: ResourceType;
}

const ExpenseReport: React.FC<ExpenseReportProps> = ({ currentMonth, budgetStatements, code, longCode, resource }) => {
  const {
    L2SectionInner,
    L2SectionOuter,
    actualsData,
    forecastData,
    mkrVestingData,
    transferRequestsData,
    isBreakdownExpanded,

    onActualsBreakdownTabsInit,
    onForecastBreakdownTabsInit,
    onActualsBreakdownExpand,
    onForecastBreakdownExpand,
  } = useExpenseReport(currentMonth, budgetStatements);

  return (
    <ExpenseReportWrapper>
      <Container>
        <CuHeadlineTextStyled cuLongCode={longCode} shortCode={code} />
      </Container>

      <ExpenseSection title={'Actuals - Totals'}>
        <BudgetTable
          columns={actualsData.mainTableColumns}
          items={actualsData.mainTableItems}
          cardSpacingSize="small"
          cardsTotalPosition="top"
          longCode={longCode}
          tablePlaceholder={<BudgetStatementsPlaceholder longCode={longCode} shortCode={code} resource={resource} />}
        />

        {actualsData.mainTableItems?.length > 0 && (
          <>
            <TitleSpacer hasBreakDownItems={forecastData.mainTableItems?.length > 0}>
              <SectionTitle level={2}>Actuals - Breakdown</SectionTitle>
            </TitleSpacer>

            <Tabs
              tabs={actualsData.breakdownTabs.map((header, i) => ({
                item: header,
                id: actualsData.headerIds[i],
              }))}
              expandable
              expandedDefault={false}
              tabQuery={ACTUALS_BREAKDOWN_QUERY_PARAM}
              viewKey={BREAKDOWN_VIEW_QUERY_KEY}
              onInit={onActualsBreakdownTabsInit}
              onExpand={onActualsBreakdownExpand}
            />

            {isBreakdownExpanded ? (
              <BreakdownTableWrapper>
                <BudgetTable
                  spaceEachCards={24}
                  columns={actualsData.breakdownColumnsForActiveTab}
                  items={actualsData.breakdownItemsForActiveTab}
                  longCode={longCode}
                  cardSpacingSize="small"
                  tablePlaceholder={
                    <BudgetStatementsPlaceholder longCode={longCode} shortCode={code} resource={resource} />
                  }
                />
              </BreakdownTableWrapper>
            ) : (
              <L2SectionOuter>
                {actualsData.breakdownTabs.map((header, index) => (
                  <L2SectionInner key={header}>
                    <BudgetSubsectionContainer isFirst={index === 0}>
                      <StyledSectionTitle level={2} hasIcon={false} hasExternalIcon={false} idPrefix={'actuals'}>
                        {header}
                      </StyledSectionTitle>
                      <BudgetTable
                        columns={actualsData.allBreakdownColumns[header]}
                        items={actualsData.allBreakdownItems[header]}
                        longCode={longCode}
                        style={{ marginTop: 8 }}
                        cardSpacingSize="small"
                        tablePlaceholder={
                          <div style={{ marginTop: 8 }}>
                            <BudgetStatementsPlaceholder longCode={longCode} shortCode={code} resource={resource} />
                          </div>
                        }
                      />
                    </BudgetSubsectionContainer>
                  </L2SectionInner>
                ))}
              </L2SectionOuter>
            )}
          </>
        )}
        <CategoryModalComponent />
      </ExpenseSection>

      <ExpenseSection title={'Forecast - Totals'}>
        <BudgetTable
          cardSpacingSize="small"
          longCode={longCode}
          columns={forecastData.mainTableColumns}
          items={forecastData.mainTableItems}
          style={{ marginBottom: 8 }}
          cardsTotalPosition={'top'}
          tablePlaceholder={
            <div style={{ marginTop: 8 }}>
              <BudgetStatementsPlaceholder longCode={longCode} shortCode={code} resource={resource} />
            </div>
          }
        />

        {forecastData.mainTableItems?.length > 0 && (
          <>
            <TitleSpacer hasBreakDownItems={forecastData.mainTableItems?.length > 0}>
              <SectionTitle level={2}>Forecast - Breakdown</SectionTitle>
            </TitleSpacer>

            <Tabs
              tabs={forecastData.breakdownTabs.map((header, i) => ({
                item: header,
                id: forecastData.headerIds[i],
              }))}
              expandable
              expandedDefault={false}
              tabQuery={FORECAST_BREAKDOWN_QUERY_PARAM}
              viewKey={BREAKDOWN_VIEW_QUERY_KEY}
              onInit={onForecastBreakdownTabsInit}
              onExpand={onForecastBreakdownExpand}
            />

            {isBreakdownExpanded ? (
              <BreakdownTableWrapper>
                <BudgetTable
                  spaceEachCards={24}
                  longCode={longCode}
                  columns={forecastData.breakdownColumnsForActiveTab}
                  items={forecastData.breakdownItems}
                  cardSpacingSize="small"
                  tablePlaceholder={
                    <BudgetStatementsPlaceholder longCode={longCode} shortCode={code} resource={resource} />
                  }
                />
              </BreakdownTableWrapper>
            ) : (
              <L2SectionOuter>
                {forecastData.breakdownTabs.map((header, index) => (
                  <L2SectionInner key={header}>
                    <BudgetSubsectionContainer isFirst={index === 0}>
                      <StyledSectionTitle level={2} hasIcon={false} hasExternalIcon={false} idPrefix={'forecast'}>
                        {header}
                      </StyledSectionTitle>
                      <BudgetTable
                        columns={forecastData.allBreakdownColumns[header]}
                        items={forecastData.allBreakdownItems[header]}
                        longCode={longCode}
                        style={{ marginTop: 8 }}
                        cardSpacingSize="small"
                        tablePlaceholder={
                          <div style={{ marginTop: 8 }}>
                            <BudgetStatementsPlaceholder longCode={longCode} shortCode={code} resource={resource} />
                          </div>
                        }
                      />
                    </BudgetSubsectionContainer>
                  </L2SectionInner>
                ))}
              </L2SectionOuter>
            )}
          </>
        )}
      </ExpenseSection>

      <MkExpenseSection title={'MKR Vesting Overview'} hasIcon>
        <MkrVestingTotalFTEStyled totalFTE={mkrVestingData.fTEs} />

        <BudgetTable
          cardSpacingSize="small"
          columns={mkrVestingData.mainTableColumns}
          items={mkrVestingData.mainTableItems}
          longCode={longCode}
          tablePlaceholder={<BudgetStatementsPlaceholder longCode={longCode} shortCode={code} resource={resource} />}
        />
      </MkExpenseSection>

      <ExpenseSection title={'Transfer Request'}>
        <BudgetTable
          cardSpacingSize="small"
          columns={transferRequestsData.mainTableColumns}
          items={transferRequestsData.mainTableItems}
          cardsTotalPosition={'top'}
          longCode={longCode}
          tablePlaceholder={<BudgetStatementsPlaceholder longCode={longCode} shortCode={code} resource={resource} />}
        />
      </ExpenseSection>
    </ExpenseReportWrapper>
  );
};

export default ExpenseReport;

const ExpenseReportWrapper = styled('div')({
  marginBottom: 32,
});

const BudgetTable = styled((props: React.ComponentProps<typeof AdvancedInnerTable>) => (
  <AdvancedInnerTable {...props} />
))(() => ({}));

const TitleSpacer = styled('div')<{ hasBreakDownItems: boolean }>(({ theme, hasBreakDownItems }) => ({
  marginTop: 32,
  marginBottom: hasBreakDownItems ? 16 : 24,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 32,
    marginBottom: 16,
  },
}));

const BudgetSubsectionContainer = styled('div')<{ isFirst: boolean }>(({ isFirst, theme }) => ({
  marginTop: 0,

  [theme.breakpoints.up('tablet_768')]: {
    ...(isFirst ? {} : { marginTop: 16 }),
    borderRadius: 12,
    padding: '8px 16px 16px',
    background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.background.dm,

    border: `1px solid ${
      theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
    }`,
  },
}));

const BreakdownTableWrapper = styled('div')({
  marginTop: 16,
});

const CuHeadlineTextStyled = styled(CuHeadlineText)({
  marginTop: 24,
  marginBottom: 25,
});

const MkrVestingTotalFTEStyled = styled(MkrVestingTotalFTE)({
  '& span': {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 600,
  },
  '& u': {
    fontSize: 18,
    lineHeight: '21.6px',
    fontWeight: 700,
  },
});

const StyledSectionTitle = styled(SectionTitle)(({ theme }) => ({
  marginBottom: 16,
  [theme.breakpoints.up('tablet_768')]: {
    marginBottom: 0,
  },
}));

const MkExpenseSection = styled(ExpenseSection)({
  '& h2': {
    fontWeight: 700,
    fontSize: 18,
    lineHeight: '21.6px',
  },
});

import styled from '@emotion/styled';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { MAKER_BURN_LINK } from '@ses/core/utils/const';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import { AdvancedInnerTable } from '@/components/AdvancedInnerTable/AdvancedInnerTable';
import CategoryModalComponent from '@/components/AdvancedInnerTable/BasicModal/CategoryModalComponent';
import Container from '@/components/Container/Container';
import Tabs from '@/components/Tabs/Tabs';
import {
  ACTUALS_BREAKDOWN_QUERY_PARAM,
  BREAKDOWN_VIEW_QUERY_KEY,
  FORECAST_BREAKDOWN_QUERY_PARAM,
} from '../../utils/constants';
import { TransparencyEmptyTable } from '../Placeholders/TransparencyEmptyTable';
import { LinkDescription } from '../TransparencyActuals/TransparencyActuals';
import MkrVestingInfo from '../TransparencyMkrVesting/MkrVestingInfo';
import MkrVestingTotalFTE from '../TransparencyMkrVesting/MkrVestingTotalFTE';
import ExpenseSection from './components/ExpenseSection/ExpenseSection';
import SectionTitle from './components/SectionTitle/SectionTitle';
import useExpenseReport from './useExpenseReport';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
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
    isLight,
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
        <LinkDescription>
          <span> Visit makerburn.com to view the</span>
          <ActualViewOnChainLink
            href={`${MAKER_BURN_LINK}/${longCode}`}
            fontSize={16}
            fontWeight={500}
            iconWidth={10}
            iconHeight={10}
            marginLeft="7px"
          >
            {`${code} ${
              resource === ResourceType.CoreUnit ? 'Core Unit' : 'Ecosystem Actor'
            } On-Chain transaction history`}
          </ActualViewOnChainLink>

          <BudgetDateTitle isLight={isLight}>{currentMonth.toFormat('MMMM yyyy')} Expense Report</BudgetDateTitle>
        </LinkDescription>
      </Container>

      <ExpenseSection title={'Actuals - Totals'}>
        <BudgetTable
          isLight={isLight}
          columns={actualsData.mainTableColumns}
          items={actualsData.mainTableItems}
          cardsTotalPosition="top"
          longCode={longCode}
          tablePlaceholder={<TransparencyEmptyTable longCode={longCode} shortCode={code} resource={resource} />}
        />

        {actualsData.mainTableItems?.length > 0 && (
          <>
            <TitleSpacer>
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
                  isLight={isLight}
                  columns={actualsData.breakdownColumnsForActiveTab}
                  items={actualsData.breakdownItemsForActiveTab}
                  longCode={longCode}
                  cardSpacingSize="small"
                  tablePlaceholder={
                    <TransparencyEmptyTable breakdown longCode={longCode} shortCode={code} resource={resource} />
                  }
                />
              </BreakdownTableWrapper>
            ) : (
              <L2SectionOuter>
                {actualsData.breakdownTabs.map((header, index) => (
                  <L2SectionInner key={header}>
                    <BudgetSubsectionContainer isFirst={index === 0}>
                      <SectionTitle level={2} hasIcon={true} hasExternalIcon={true} idPrefix={'actuals'}>
                        {header}
                      </SectionTitle>
                      <BudgetTable
                        isLight={isLight}
                        columns={actualsData.allBreakdownColumns[header]}
                        items={actualsData.allBreakdownItems[header]}
                        longCode={longCode}
                        style={{ marginTop: 16 }}
                        cardSpacingSize="small"
                        tablePlaceholder={
                          <div style={{ marginTop: 16 }}>
                            <TransparencyEmptyTable
                              breakdown
                              longCode={longCode}
                              shortCode={code}
                              resource={resource}
                            />
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
          isLight={isLight}
          longCode={longCode}
          columns={forecastData.mainTableColumns}
          items={forecastData.mainTableItems}
          style={{ marginBottom: 32 }}
          cardsTotalPosition={'top'}
          tablePlaceholder={<TransparencyEmptyTable longCode={longCode} shortCode={code} resource={resource} />}
        />

        {forecastData.mainTableItems?.length > 0 && (
          <>
            <TitleSpacer>
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
                  isLight={isLight}
                  longCode={longCode}
                  columns={forecastData.breakdownColumnsForActiveTab}
                  items={forecastData.breakdownItems}
                  cardSpacingSize="small"
                  tablePlaceholder={
                    <TransparencyEmptyTable breakdown longCode={longCode} shortCode={code} resource={resource} />
                  }
                />
              </BreakdownTableWrapper>
            ) : (
              <L2SectionOuter>
                {forecastData.breakdownTabs.map((header, index) => (
                  <L2SectionInner key={header}>
                    <BudgetSubsectionContainer isFirst={index === 0}>
                      <SectionTitle level={2} hasIcon={true} hasExternalIcon={true} idPrefix={'forecast'}>
                        {header}
                      </SectionTitle>
                      <BudgetTable
                        isLight={isLight}
                        columns={forecastData.allBreakdownColumns[header]}
                        items={forecastData.allBreakdownItems[header]}
                        longCode={longCode}
                        style={{ marginTop: 16 }}
                        cardSpacingSize="small"
                        tablePlaceholder={
                          <div style={{ marginTop: 16 }}>
                            <TransparencyEmptyTable
                              breakdown
                              longCode={longCode}
                              shortCode={code}
                              resource={resource}
                            />
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

      <ExpenseSection title={'MKR Vesting Overview'}>
        <MkrVestingTotalFTE totalFTE={mkrVestingData.FTEs} />

        <BudgetTable
          isLight={isLight}
          columns={mkrVestingData.mainTableColumns}
          items={mkrVestingData.mainTableItems}
          longCode={longCode}
          tablePlaceholder={<TransparencyEmptyTable longCode={longCode} shortCode={code} resource={resource} />}
        />

        {mkrVestingData.mainTableItems?.length > 0 && (
          <MkrVestingInfoContainer>
            <MkrVestingInfo />
          </MkrVestingInfoContainer>
        )}
      </ExpenseSection>

      <ExpenseSection title={'Transfer Request'}>
        <BudgetTable
          isLight={isLight}
          columns={transferRequestsData.mainTableColumns}
          items={transferRequestsData.mainTableItems}
          cardsTotalPosition={'top'}
          longCode={longCode}
          tablePlaceholder={<TransparencyEmptyTable longCode={longCode} shortCode={code} resource={resource} />}
        />
      </ExpenseSection>
    </ExpenseReportWrapper>
  );
};

export default ExpenseReport;

const ExpenseReportWrapper = styled.div({
  marginBottom: 32,
});

const ActualViewOnChainLink = styled(CustomLink)({
  color: '#447AFB',
  letterSpacing: '0.3px',
  fontSize: 14,
  lineHeight: '22px',
  marginLeft: 0,
  whiteSpace: 'break-spaces',
  display: 'inline',

  [lightTheme.breakpoints.up('table_834')]: {
    lineHeight: '18px',
  },
});

const BudgetTable = styled((props: React.ComponentProps<typeof AdvancedInnerTable>) => (
  <AdvancedInnerTable {...props} />
))<WithIsLight>(({ isLight }) => ({
  boxShadow: isLight
    ? '0px 20px 40px -40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
}));

const BudgetDateTitle = styled.h1<WithIsLight>(({ isLight }) => ({
  fontSize: 20,
  fontWeight: 600,
  lineHeight: '24px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginTop: 24,
  marginBottom: 24,

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 24,
    lineHeight: '29px',
    marginBottom: 32,
  },
}));

const TitleSpacer = styled.div({
  marginTop: 16,
  marginBottom: 16,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 32,
  },
});

const BudgetSubsectionContainer = styled.div<{ isFirst: boolean }>(({ isFirst }) => ({
  marginTop: 0,

  [lightTheme.breakpoints.up('table_834')]: {
    ...(isFirst ? {} : { marginTop: 24 }),
  },
}));

const MkrVestingInfoContainer = styled.div({
  marginTop: 32,
});

const BreakdownTableWrapper = styled.div({
  marginTop: 16,
});

import styled from '@emotion/styled';
import { AdvancedInnerTable } from '@ses/components/AdvancedInnerTable/AdvancedInnerTable';
import Container from '@ses/components/Container/Container';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import Tabs from '@ses/components/Tabs/Tabs';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { MAKER_BURN_LINK } from '@ses/core/utils/const';
import lightTheme from '@ses/styles/theme/light';
import React, { useState } from 'react';
import { TransparencyEmptyTable } from '../Placeholders/TransparencyEmptyTable';
import { LinkDescription } from '../TransparencyActuals/TransparencyActuals';
import { useTransparencyActuals } from '../TransparencyActuals/useTransparencyActuals';
import BudgetSection from './components/BudgetSection/BudgetSection';
import SectionTitle from './components/SectionTitle/SectionTitle';
import type { BudgetStatementDto } from '@ses/core/models/dto/coreUnitDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { DateTime } from 'luxon';

interface BudgetReportProps {
  currentMonth: DateTime;
  budgetStatements?: BudgetStatementDto[];
  code: string;
  longCode: string;
}

const BudgetReport: React.FC<BudgetReportProps> = ({ currentMonth, budgetStatements, code, longCode }) => {
  const { isLight } = useThemeContext();

  const actualsData = useTransparencyActuals(currentMonth, budgetStatements);
  const [actualsBreakdownSelected, setActualsBreakdownSelected] = useState<string | undefined>();

  const handleActualsBreakdownChange = (current?: string) => {
    setActualsBreakdownSelected(current);
  };

  return (
    <BudgetReportWrapper>
      <ActualsSection>
        <Container>
          <LinkDescription isLight={isLight}>
            <span> Visit makerburn.com to</span>
            <ActualViewOnChainLink
              href={`${MAKER_BURN_LINK}/${longCode}`}
              fontSize={16}
              fontWeight={500}
              iconWidth={10}
              iconHeight={10}
              marginLeft="7px"
            >
              {`view the ${code} Core Unit on-chain transaction history`}
            </ActualViewOnChainLink>

            <BudgetDateTitle isLight={isLight}>{currentMonth.toFormat('MMMM yyyy')} Budget Report</BudgetDateTitle>
          </LinkDescription>
        </Container>

        <BudgetSection title={'Actuals - Totals'}>
          <AdvancedInnerTable
            columns={actualsData.mainTableColumns}
            items={actualsData.mainTableItems}
            cardsTotalPosition="top"
            longCode={longCode}
          />

          {actualsData.mainTableItems.length > 0 && (
            <>
              <TitleSpacer>
                <SectionTitle>Actuals Breakdown</SectionTitle>
              </TitleSpacer>

              <Tabs
                tabs={actualsData.breakdownTabs.map((header, i) => ({
                  item: header,
                  id: actualsData.headerIds[i],
                }))}
                expandable
                expandedDefault={false}
                viewKey={'breakdownView'}
                onChange={handleActualsBreakdownChange}
              />

              {actualsBreakdownSelected ? (
                <AdvancedInnerTable
                  columns={actualsData.breakdownColumnsForActiveTab}
                  items={actualsData.breakdownItemsForActiveTab}
                  longCode={longCode}
                  style={{ marginTop: 16 }}
                  tablePlaceholder={<TransparencyEmptyTable breakdown longCode={longCode} />}
                />
              ) : (
                <BudgetSection level={2}>
                  {actualsData.breakdownTabs.map((header, index) => (
                    <BudgetSubsectionContainer isFirst={index === 0} key={header}>
                      <SectionTitle level={2} hasIcon={true}>
                        {header}
                      </SectionTitle>
                      <div>
                        <AdvancedInnerTable
                          columns={actualsData.allBreakdownColumns[header]}
                          items={actualsData.allBreakdownItems[header]}
                          longCode={longCode}
                          style={{ marginTop: 16 }}
                          tablePlaceholder={
                            <div style={{ marginTop: 16 }}>
                              <TransparencyEmptyTable breakdown longCode={longCode} />
                            </div>
                          }
                        />
                      </div>
                    </BudgetSubsectionContainer>
                  ))}
                </BudgetSection>
              )}
            </>
          )}
        </BudgetSection>
      </ActualsSection>
    </BudgetReportWrapper>
  );
};

export default BudgetReport;

const BudgetReportWrapper = styled.div({
  marginBottom: 32,
});

const ActualsSection = styled.div({});

const ActualViewOnChainLink = styled(CustomLink)({
  flexWrap: 'wrap',
  color: '#447AFB',
  letterSpacing: '0.3px',
  lineHeight: '18px',
  marginLeft: 0,
  whiteSpace: 'break-spaces',
  display: 'inline-block',
  marginBottom: 0,

  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: 32,
  },
});

const BudgetDateTitle = styled.h1<WithIsLight>(({ isLight }) => ({
  fontSize: 24,
  fontWeight: 600,
  lineHeight: '29px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#F00',
  marginTop: 0,
  marginBottom: 32,
}));

const TitleSpacer = styled.div({
  marginTop: 32,
  marginBottom: 16,
});

const BudgetSubsectionContainer = styled.div<{ isFirst: boolean }>(({ isFirst }) => (isFirst ? {} : { marginTop: 24 }));

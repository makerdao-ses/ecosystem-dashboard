import styled from '@emotion/styled';
import { LinkButton } from '@ses/components/LinkButton/LinkButton';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import { ButtonType } from '@ses/core/enums/buttonTypeEnum';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import React from 'react';
import lightTheme from 'styles/theme/light';
import ExpensesChartSection from './components/ExpensesChartSection/ExpensesChartSection';
import QuarterCarousel from './components/QuarterCarousel/QuarterCarousel';
import YearPicker from './components/YearPicker/YearPicker';
import useFinancesOverview from './useFinancesOverview';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';

type FinancesOverviewContainerProps = {
  monthlyExpenses: Partial<ExpenseDto>[];
  quarterExpenses: ExpenseDto[];
};

const FinancesOverviewContainer: React.FC<FinancesOverviewContainerProps> = ({ monthlyExpenses, quarterExpenses }) => {
  const {
    isLight,
    selectedYear,
    handleChangeSelectYear,
    years,
    newActual,
    newDiscontinued,
    newPrediction,
    totalExpenses,
    sortedQuarters,
    isMobile,
  } = useFinancesOverview(quarterExpenses, monthlyExpenses);

  return (
    <Container isLight={isLight}>
      <SEOHead
        title="MakerDAO Ecosystem Performance Dashboard | Maker Expenses"
        description="MakerDAO Ecosystem Performance Dashboard provides a transparent analysis of Core Unit teams' finances, projects, and their position in the DAO."
        image={{
          src: toAbsoluteURL('/assets/img/social-385x200.png'),
          width: 385,
          height: 200,
        }}
        twitterImage={toAbsoluteURL('/assets/img/social-1200x630.png')}
      />
      <InnerPage>
        <PageTitle isLight={isLight}>Total Reported Expenses</PageTitle>

        <QuarterCarousel quarters={sortedQuarters} />
        <ContainerYearPicker>
          <YearPicker selectedYear={selectedYear} handleOnclick={handleChangeSelectYear} years={years} />
        </ContainerYearPicker>
        <ChartContainer>
          <ExpensesChartSection
            totalExpenses={totalExpenses()?.toLocaleString('es-US') || '0'}
            newActual={newActual}
            newDiscontinued={newDiscontinued}
            newPrediction={newPrediction}
          />
        </ChartContainer>
      </InnerPage>
      <FooterButtonContainer>
        <LinkButton
          href={siteRoutes.coreUnitsOverview}
          label="Core Units"
          buttonType={ButtonType.Primary}
          styleText={{
            fontSize: isMobile ? 14 : 16,
            fontWeight: 500,
            lineHeight: isMobile ? '18px' : '19px',
          }}
          style={{
            padding: isMobile ? '8px 24px' : '14.5px 85.5px',
          }}
        />

        <LinkButton
          href={siteRoutes.recognizedDelegate}
          label="Recognized Delegates"
          buttonType={ButtonType.Primary}
          styleText={{
            fontSize: isMobile ? 14 : 16,
            fontWeight: 500,
            lineHeight: isMobile ? '18px' : '19px',
          }}
          style={{
            padding: isMobile ? '8px 24px' : '14.5px 40px',
          }}
        />
      </FooterButtonContainer>
    </Container>
  );
};

export default FinancesOverviewContainer;

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '64px',
  flex: 1,
  background: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? '#FFFFFF' : 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 16, 32, 0.4) 100%)',
  maxWidth: '100vw',
  overflow: 'hidden',
}));

const InnerPage = styled.div({
  display: 'block',
  textAlign: 'left',
  width: '100%',
  maxWidth: '1440px',
  margin: '0 auto',
  paddingRight: '64px',
  paddingLeft: '64px',

  [lightTheme.breakpoints.up('desktop_1920')]: {
    maxWidth: '1312px',
    paddingRight: '0px',
    paddingLeft: '0px',
  },
  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    paddingRight: '48px',
    paddingLeft: '48px',
  },
  [lightTheme.breakpoints.between('table_834', 'desktop_1280')]: {
    paddingRight: '32px',
    paddingLeft: '32px',
  },
  [lightTheme.breakpoints.down('table_834')]: {
    paddingRight: '16px',
    paddingLeft: '16px',
  },
});

const PageTitle = styled.h1<{ isLight: boolean }>(({ isLight }) => ({
  fontSize: 20,
  fontWeight: 600,
  lineHeight: '24px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#FFFFFF',
  marginTop: 32,
  marginBottom: 24,

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: '29px',
    letterSpacing: '0.4px',
    marginBottom: 40,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginBottom: 32,
  },
}));

const FooterButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 24,
  textAlign: 'center',
  marginBottom: 78,

  [lightTheme.breakpoints.up('table_834')]: {
    maxWidth: '528px',
    margin: '0px auto',
    marginBottom: 64,
  },
});

const ContainerYearPicker = styled.div({
  marginBottom: 24,
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginBottom: 16,
  },
});

const ChartContainer = styled.div({
  marginBottom: 19,
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginBottom: 47,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginBottom: 8,
  },
});

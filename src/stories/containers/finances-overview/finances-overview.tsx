import styled from '@emotion/styled';
import React from 'react';
import lightTheme from 'styles/theme/light';
import ExpensesChartSection from './Components/ExpensesChartSection/ExpensesChartSection';
import QuarterCarousel from './Components/QuarterCarousel/QuarterCarousel';
import YearPicker from './Components/YearPicker/YearPicker';
import useFinancesOverview from './useFinancesOverview';

const FinancesOverviewContainer: React.FC = () => {
  const { isLight, selectedYear, handleChangeSelectYear, years } = useFinancesOverview();

  return (
    <Container isLight={isLight}>
      <InnerPage>
        <PageTitle isLight={isLight}>Total Core Unit Expenses</PageTitle>

        <QuarterCarousel />
        <YearPicker selectedYear={selectedYear} handleOnclick={handleChangeSelectYear} years={years} />
        <ExpensesChartSection />
        <div>Core Unit Button</div>
      </InnerPage>
    </Container>
  );
};

export default FinancesOverviewContainer;

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '64px',
  flex: 1,
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/bg-page-dark.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
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
    fontSize: 32,
    fontWeight: 500,
    lineHeight: '38px',
    marginBottom: 32,
  },
}));

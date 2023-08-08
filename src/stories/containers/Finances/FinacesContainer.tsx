import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';

import React from 'react';

import BreakdownChart from './SeccionPages/BreakdownChart';
import BreakdownTable from './SeccionPages/BreakdownTable';
import CardChartOverview from './SeccionPages/CardChartOverview';
import CardsNavigation from './SeccionPages/CardsNavigation';
import LatestExpenseReports from './SeccionPages/LatestExpenseReports';
import MakerDAOExpenseMetrics from './SeccionPages/MakerDAOExpenseMetrics';

const FinancesContainer = () => (
  <PageContainer>
    <Container>
      <div>MakerDAO Finances </div>

      <CardChartOverview />
      <CardsNavigation />
      <BreakdownChart />
      <BreakdownTable />
      <MakerDAOExpenseMetrics />
      <LatestExpenseReports />
    </Container>
  </PageContainer>
);

export default FinancesContainer;

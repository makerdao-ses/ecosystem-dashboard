import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import React from 'react';
import BreakdownChart from './SeccionPages/BreakdownChart';
import BreakdownTable from './SeccionPages/BreakdownTable';
import CardChartOverview from './SeccionPages/CardChartOverview';
import CardsNavigation from './SeccionPages/CardsNavigation';
import LatestExpenseReports from './SeccionPages/LatestExpenseReports';
import MakerDAOExpenseMetrics from './SeccionPages/MakerDAOExpenseMetrics';

const FinancesContainer = () => (
  <ContainerStyled>
    <div>MakerDAO Finances </div>
    <CardChartOverview />
    <CardsNavigation />
    <BreakdownChart />
    <BreakdownTable />
    <MakerDAOExpenseMetrics />
    <LatestExpenseReports />
  </ContainerStyled>
);
export default FinancesContainer;

const ContainerStyled = styled(Container)({
  marginTop: 64,
});

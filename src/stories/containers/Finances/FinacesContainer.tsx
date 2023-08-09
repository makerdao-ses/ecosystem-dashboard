import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import BreadcrumbYearNavigation from './SeccionPages/BreadcrumbYearNavigation';
import BreakdownChart from './SeccionPages/BreakdownChart';
import BreakdownTable from './SeccionPages/BreakdownTable';
import CardsNavigation from './SeccionPages/CardsNavigation';
import LatestExpenseReports from './SeccionPages/LatestExpenseReports';
import MakerDAOExpenseMetrics from './SeccionPages/MakerDAOExpenseMetrics';
import { useFinances } from './useFinances';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const FinancesContainer = () => {
  const { isLight } = useThemeContext();
  const { years, handleChange, handleClose, handleOpen, isOpen, value, trailingAddress } = useFinances();
  return (
    <PageContainer>
      <Container>
        <BreadcrumbYearNavigation
          trailingAddress={trailingAddress}
          years={years}
          isOpen={isOpen}
          handleChange={handleChange}
          onClose={handleClose}
          onOpen={handleOpen}
          selectedValue={value}
        />
        <ContainerTitle isLight={isLight}>MakerDAO Finances</ContainerTitle>

        <CardsNavigation />
        <BreakdownChart />
        <BreakdownTable />
        <MakerDAOExpenseMetrics />
        <LatestExpenseReports />
      </Container>
    </PageContainer>
  );
};

export default FinancesContainer;

const ContainerTitle = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 32,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : 'red',
  marginTop: 32,
  marginBottom: 64,
}));

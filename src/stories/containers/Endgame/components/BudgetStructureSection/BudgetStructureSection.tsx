import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BudgetDoughnutChart from '../BudgetDoughnutChart';
import SectionHeader from '../SectionHeader/SectionHeader';
import TotalBudgetContent from '../TotalBudgetContent/TotalBudgetContent';
import type { DoughnutSeries } from '@ses/core/models/interfaces/doughnutSeries';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const BudgetStructureSection: React.FC = () => {
  const { isLight } = useThemeContext();

  const doughnutSeriesData: DoughnutSeries[] = [
    {
      name: 'End-game Alignment Scope Budgets',
      value: 50000000,
      percent: 50,
      actuals: 0,
      budgetCap: 0,
      color: '#D2D4EF',
    },
    {
      name: 'End-game Atlas Immutable AA Budgets',
      value: 30000000,
      percent: 30,
      actuals: 0,
      budgetCap: 0,
      color: '#447AFB',
    },
    {
      name: 'MakerDAO Legacy Budgets',
      value: 20000000,
      percent: 20,
      actuals: 0,
      budgetCap: 0,
      color: '#1AAB9B',
    },
  ];

  return (
    <Content id="endgame-budget-structure">
      <SectionHeader
        title="Endgame Budget Structure"
        subtitle="Some simple but poignant text about what endgame budgets are about"
      />

      <Card isLight={isLight}>
        <TotalBudgetContent />
        <BudgetComposition isLight={isLight}>
          <BudgetCompositionTitle isLight={isLight}>Composition of Budget</BudgetCompositionTitle>
          <BudgetDoughnutChart doughnutSeriesData={doughnutSeriesData} />
        </BudgetComposition>
      </Card>
    </Content>
  );
};

export default BudgetStructureSection;

const Content = styled.section({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
  scrollMarginTop: 130, // here
});

const Card = styled.div<WithIsLight>(({ isLight }) => ({
  padding: '31px 0px 0px',
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  borderRadius: 6,
  border: `1px solid ${isLight ? 'rgba(212, 217, 225, 0.25)' : 'red'}`,
  background: isLight ? '#FFF' : 'red',
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px red, 0px 20px 40px 0px red',

  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
    padding: '31px 15px',
    gap: 24,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: '31px 63px',
    gap: 64,
  },
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BudgetComposition = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: 353,
  padding: '24px 16px 0px',
  backgroundColor: 'rgba(236, 239, 249, 0.25)',

  [lightTheme.breakpoints.up('table_834')]: {
    alignSelf: 'center',
    height: 201,
    padding: 0,
    backgroundColor: '#fff',
    borderLeft: '1px solid #D4D9E1',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    height: 241,
  },
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BudgetCompositionTitle = styled.h3<WithIsLight>(({ isLight }) => ({
  fontSize: 16,
  fontWeight: 700,
  fontStyle: 'normal',
  lineHeight: '19.36px',
  margin: 0,

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: '0.4px',
    marginTop: 2,
    paddingLeft: '3.667%',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    paddingLeft: '9.091%',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    paddingLeft: 0,
    paddingRight: 30,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    paddingRight: 94,
  },
}));

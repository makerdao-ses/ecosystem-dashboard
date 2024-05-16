import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React, { useEffect, useState } from 'react';
import BudgetDoughnutChart from '../BudgetDoughnutChart/BudgetDoughnutChart';
import SectionHeader from '../SectionHeader/SectionHeader';
import TotalBudgetContent from '../TotalBudgetContent/TotalBudgetContent';
import BudgetStructureSectionSkeleton from './BudgetStructureSectionSkeleton';
import type { TotalBudgetContentProps } from '../TotalBudgetContent/TotalBudgetContent';
import type { DoughnutSeries } from '@ses/containers/Finances/utils/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface BudgetCompositionProps extends TotalBudgetContentProps {
  scopes: number;
  immutable: number;
  legacy: number;
  isLoading: boolean;
  yearsRange: string[];
  selectedYear: string;
  handleYearChange: (year: string) => void;
}

const BudgetStructureSection: React.FC<BudgetCompositionProps> = ({
  scopes,
  immutable,
  legacy,
  totalBudgetCap,
  isLoading,
  yearsRange,
  selectedYear,
  handleYearChange,
  ...totalBudgetProps
}) => {
  const { isLight } = useThemeContext();

  // avoid chart mounting flicker
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const doughnutSeriesData = [
    {
      name: 'Scope Frameworks Budget',
      value: scopes,
      percent: (scopes * 100) / totalBudgetCap,
      actuals: 0,
      budgetCap: 0,
      color: '#D2D4EF',
    },
    {
      name: 'Atlas Immutable Budget',
      value: immutable,
      percent: (immutable * 100) / totalBudgetCap,
      actuals: 0,
      budgetCap: 0,
      color: '#1AAB9B',
    },
    {
      name: 'MakerDAO Legacy Budget',
      value: legacy,
      percent: (legacy * 100) / totalBudgetCap,
      actuals: 0,
      budgetCap: 0,
      color: '#447AFB',
    },
  ] as unknown as DoughnutSeries[];

  return (
    <Content id="section-endgame-budget-structure">
      <SectionHeader
        title="Endgame Budget Structure"
        subtitle="Optimizing MakerDAO's financial strategy through structured budgets, to ensure efficiency and effectiveness in achieving Endgame objectives."
        yearsRange={yearsRange}
        selectedYear={selectedYear}
        handleYearChange={handleYearChange}
      />

      {isLoading ? (
        <BudgetStructureSectionSkeleton />
      ) : (
        <Card isLight={isLight}>
          <TotalBudgetContent totalBudgetCap={totalBudgetCap} {...totalBudgetProps} />
          <BudgetComposition isLight={isLight}>
            <BudgetCompositionTitle isLight={isLight}>Composition of Budget</BudgetCompositionTitle>
            {mounted && <BudgetDoughnutChart doughnutSeriesData={doughnutSeriesData} />}
          </BudgetComposition>
        </Card>
      )}
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
  overflow: 'hidden',
  gap: 32,
  borderRadius: 6,
  border: `1px solid ${isLight ? 'rgba(212, 217, 225, 0.25)' : '#31424E'}`,
  background: isLight ? '#FFF' : '#1E2C37',
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px 0px rgba(7, 22, 40, 0.40)',

  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    padding: '23px 15px',
    gap: 16,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    padding: 31,
    gap: 32,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '31px 0 31px 63px',
    gap: 64,
  },
}));

const BudgetComposition = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
  height: 353,
  padding: '24px 16px 0px',
  backgroundColor: isLight ? 'rgba(236, 239, 249, 0.25)' : '#1E2C37',

  [lightTheme.breakpoints.up('tablet_768')]: {
    alignSelf: 'center',
    height: 189,
    padding: 0,
    backgroundColor: isLight ? '#fff' : '#1E2C37',
    borderLeft: `1px solid ${isLight ? '#D4D9E1' : '#31424E'}`,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    height: 241,
  },
}));

const BudgetCompositionTitle = styled.h3<WithIsLight>(({ isLight }) => ({
  fontSize: 16,
  fontWeight: 700,
  fontStyle: 'normal',
  lineHeight: '19.36px',
  margin: 0,
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: '0.4px',
    marginTop: 2,
    marginLeft: '4.2%',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginLeft: '3%',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginLeft: '-4.8%',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginLeft: '-8%',
  },
}));

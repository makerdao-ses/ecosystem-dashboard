import { styled, useMediaQuery, useTheme } from '@mui/material';
import { colorPalette } from '@ses/styles/theme/colorPalette';
import React, { useEffect, useState } from 'react';
import Card from '@/components/Card/Card';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import TitleWithIconInformation from '@/components/TitleWithIconInformation/TitleWithIconInformation';
import BarsFilter from '@/components/icons/BarsFilter';
import { siteRoutes } from '@/config/routes';
import BudgetDoughnutChart from '../BudgetDoughnutChart/BudgetDoughnutChart';
import TotalBudgetContent from '../TotalBudgetContent/TotalBudgetContent';
import BudgetStructureSectionSkeleton from './BudgetStructureSectionSkeleton';
import type { TotalBudgetContentProps } from '../TotalBudgetContent/TotalBudgetContent';
import type { Theme } from '@mui/material';
import type { DoughnutSeries } from '@ses/containers/Finances/utils/types';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  yearsRange,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectedYear,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleYearChange,
  ...totalBudgetProps
}) => {
  const isLight = useTheme().palette.isLight;
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
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
      color: isLight ? colorPalette.blue[500] : colorPalette.blue[700],
    },
    {
      name: 'Atlas Immutable Budget',
      value: immutable,
      percent: (immutable * 100) / totalBudgetCap,
      actuals: 0,
      budgetCap: 0,
      color: isLight ? colorPalette.blue[300] : colorPalette.blue[500],
    },
    {
      name: 'MakerDAO Legacy Budget',
      value: legacy,
      percent: (legacy * 100) / totalBudgetCap,
      actuals: 0,
      budgetCap: 0,
      color: isLight ? colorPalette.charcoal[200] : colorPalette.charcoal[600],
    },
  ] as unknown as DoughnutSeries[];

  return (
    <Content id="section-endgame-budget-structure">
      <SectionCard>
        <Header>
          <TitleWithIconInformation
            title="Endgame Budget Structure"
            tooltip={
              "Optimizing MakerDAO's financial strategy through structured budgets, to ensure efficiency and effectiveness in achieving Endgame objectives."
            }
          />

          <BarsFilter />
        </Header>

        {isLoading ? (
          <BudgetStructureSectionSkeleton />
        ) : (
          <ChartsContainer>
            <TotalBudgetContent totalBudgetCap={totalBudgetCap} {...totalBudgetProps} />
            <BudgetComposition>
              <BudgetCompositionTitle>Composition of Budget</BudgetCompositionTitle>
              {mounted && <BudgetDoughnutChart doughnutSeriesData={doughnutSeriesData} />}
            </BudgetComposition>
            {isMobile && (
              <ButtonContainer>
                <InternalLinkButton href={siteRoutes.home} buttonType="primary" label="Legacy Expenses" />
              </ButtonContainer>
            )}
          </ChartsContainer>
        )}
      </SectionCard>
    </Content>
  );
};

export default BudgetStructureSection;

const Content = styled('section')({
  scrollMarginTop: 130,
});

const SectionCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: 8,
  border: `1px solid ${theme.palette.isLight ? 'rgba(212, 217, 225, 0.25)' : 'rgba(55, 62, 77, 0.5)'}`,

  [theme.breakpoints.up('tablet_768')]: {
    padding: '8px 16px',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '16px 24px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '16px 32px',
  },
}));

const Header = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const ChartsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    gap: 24,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 32,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    gap: 16,
  },
}));

const BudgetComposition = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
  padding: 8,
  borderRadius: 12,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,

  [theme.breakpoints.up('tablet_768')]: {
    minWidth: 353,
    padding: '14px 16px 16px',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: '100%',
    padding: '18px 19px 8px',
  },
}));

const BudgetCompositionTitle = styled('h3')(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '24px',
  margin: 0,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 18,
    lineHeight: '22px',
  },
}));

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

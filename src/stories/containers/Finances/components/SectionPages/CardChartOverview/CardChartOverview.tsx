import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import IconOpenModal from '@ses/components/svg/IconOpenModal';
import { useBudgetMetricsModalContext } from '@ses/core/context/BudgetMetricsModalContext';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import DoughnutChartFinances from '../../OverviewCardKeyDetailsBudget/DoughnutChartFinances/DoughnutChartFinances';
import InformationBudgetCapOverview from '../../OverviewCardKeyDetailsBudget/InformationBudgetCapOverView/InformationBudgetCapOverView';
import type { Theme } from '@mui/material';
import type { DoughnutSeries } from '@ses/containers/Finances/utils/types';
import type { AnalyticMetric } from '@ses/core/models/interfaces/analytic';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  selectedMetric: AnalyticMetric;
  handleSelectedMetric: (selectedMetric: AnalyticMetric) => void;
  paymentsOnChain: number;
  budgetCap: number;
  doughnutSeriesData: DoughnutSeries[];
  isCoreThirdLevel: boolean;
  changeAlignment: boolean;
  showSwiper: boolean;
  numberSliderPerLevel?: number;
}

const FILTERS: {
  label: string;
  value: AnalyticMetric;
}[] = [
  {
    label: 'Actuals',
    value: 'Actuals',
  },
  {
    label: 'Forecast',
    value: 'Forecast',
  },
  {
    label: 'Net Expenses On-Chain',
    value: 'PaymentsOnChain',
  },
  {
    label: 'Net Protocol Outflow',
    value: 'ProtocolNetOutflow',
  },
  {
    label: 'Budget',
    value: 'Budget',
  },
];

const CardChartOverview: React.FC<Props> = ({
  selectedMetric,
  handleSelectedMetric,
  paymentsOnChain,
  budgetCap,
  doughnutSeriesData,
  isCoreThirdLevel,
  changeAlignment,
  showSwiper,
  numberSliderPerLevel,
}) => {
  const { isLight } = useThemeContext();
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));
  const { handleOpenModal } = useBudgetMetricsModalContext();

  return (
    <Container isLight={isLight}>
      <>
        <ContainerFilters>
          {FILTERS.map((filterItem, index) => (
            <Item
              key={index}
              isLight={isLight}
              isSelected={selectedMetric === filterItem.value}
              onClick={() => handleSelectedMetric(filterItem.value)}
            >
              {filterItem.label}
            </Item>
          ))}
          <IconOpenModal width={isTablet ? 10.5 : 16} height={isTablet ? 10.5 : 16} onClick={handleOpenModal} />
        </ContainerFilters>

        <ContainerCardChart>
          <ContainerCardAndLine>
            <ContainerCardInformation>
              <InformationBudgetCapOverview paymentsOnChain={paymentsOnChain} budgetCap={budgetCap} />
            </ContainerCardInformation>
            <Divider isLight={isLight} />
          </ContainerCardAndLine>
          <ContainerChat isCoreThirdLevel={isCoreThirdLevel}>
            <DoughnutChartFinances
              doughnutSeriesData={doughnutSeriesData}
              isCoreThirdLevel={isCoreThirdLevel}
              changeAlignment={changeAlignment}
              showSwiper={showSwiper}
              numberSliderPerLevel={numberSliderPerLevel}
              selectedMetric={selectedMetric}
            />
          </ContainerChat>
        </ContainerCardChart>
      </>
    </Container>
  );
};

export default CardChartOverview;

const Container = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 16px 24px 32px',
    borderRadius: 6,
    border: isLight ? '1px solid rgba(212, 217, 225, 0.25)' : '#31424E',
    background: isLight ? '#FFF' : '#1E2C37',
    boxShadow: isLight
      ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
      : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',

    height: 223,
    minWidth: 704,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    padding: '16px 24px 24px 32px',
    height: 223,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '16px 16px  48px 64px',
    height: 311,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '16px 16px  48px 64px',
    height: 311,
  },
}));

const ContainerFilters = styled.div({
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    gap: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',

    marginTop: -2,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 24,
    marginBottom: 32,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginRight: 8,
  },
});

const Item = styled.div<WithIsLight & { isSelected: boolean }>(({ isLight, isSelected }) => ({
  [lightTheme.breakpoints.up('tablet_768')]: {
    color: isLight ? (isSelected ? '#2DC1B1' : '#D1DEE6') : isSelected ? '#139D8D' : '#546978',
    fontSize: 10,
    fontWeight: 500,
    lineHeight: 'normal',
    cursor: 'pointer',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
  },
}));

const ContainerCardChart = styled.div({
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'row',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
    flexDirection: 'row',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const ContainerCardInformation = styled.div({
  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 241,
    paddingTop: 4,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 300,

    paddingTop: 'revert',
    paddingLeft: 'revert',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 300,

    paddingTop: 'revert',
    paddingLeft: 'revert',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 300,
  },
});

const Divider = styled.div<WithIsLight>(({ isLight }) => ({
  borderLeft: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    marginLeft: 32,
    height: 134,
    marginTop: 20,
    borderLeft: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginTop: 20,
    height: 134,
    marginLeft: 32,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginTop: 0,
    height: 192,
    marginLeft: 64,
  },
}));

const ContainerChat = styled.div<{ isCoreThirdLevel: boolean }>(({ isCoreThirdLevel }) => ({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginLeft: 32,
    marginTop: 4,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    justifyContent: 'center',
    marginTop: 'revert',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginRight: isCoreThirdLevel ? 0 : 75,
    marginTop: -4,
  },
}));

const ContainerCardAndLine = styled.div({
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
  },
});

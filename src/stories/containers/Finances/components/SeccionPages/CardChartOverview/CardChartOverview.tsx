import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import DoughnutChartFinances from '../../OverviewCardKeyDetailsBudget/DoughnutChartFinances/DoughnutChartFinances';
import InformationBudgetCapOverview from '../../OverviewCardKeyDetailsBudget/InformationBudgetCapOverView/InformationBudgetCapOverView';
import type { FilterDoughnut } from '@ses/containers/Finances/utils/types';
import type { DoughnutSeries } from '@ses/core/models/interfaces/doughnutSeries';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  filters: FilterDoughnut[];
  filterSelected: string;
  handleSelectFilter: (filterSelected: FilterDoughnut) => void;
  actuals: number;
  budgetCap: number;
  prediction: number;
  doughnutSeriesData: DoughnutSeries[];
}
const CardChartOverview: React.FC<Props> = ({
  filterSelected,
  filters,
  handleSelectFilter,
  actuals,
  budgetCap,
  prediction,
  doughnutSeriesData,
}) => {
  const { isLight } = useThemeContext();
  const handleOnclick = (item: FilterDoughnut) => () => {
    handleSelectFilter(item);
  };

  return (
    <Container isLight={isLight}>
      <ContainerFilters>
        {filters.map((item, index) => (
          <Item key={index} isLight={isLight} isSelected={filterSelected === item} onClick={handleOnclick(item)}>
            {item}
          </Item>
        ))}
      </ContainerFilters>
      <ContainerCardChart>
        <ContainerCardInformation>
          <InformationBudgetCapOverview actuals={actuals} budgetCap={budgetCap} prediction={prediction} />
        </ContainerCardInformation>
        <Divider isLight={isLight} />
        <ContainerChat>
          <DoughnutChartFinances doughnutSeriesData={doughnutSeriesData} />
        </ContainerChat>
      </ContainerCardChart>
    </Container>
  );
};

export default CardChartOverview;

const Container = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 24px 24px 32px',
    borderRadius: 6,
    border: isLight ? '1px solid rgba(212, 217, 225, 0.25)' : '#31424E',
    background: isLight ? '#FFF' : '#1E2C37',
    boxShadow: isLight
      ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
      : ' 0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',

    height: 223,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: '16px 24px 48px 64px',
    height: 311,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '16px 16px 48px 64px',

    height: 311,
  },
}));

const ContainerFilters = styled.div({
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    gap: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 32,
    marginTop: -2,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginRight: 8,
  },
});
const Item = styled.div<WithIsLight & { isSelected: boolean }>(({ isLight, isSelected }) => ({
  [lightTheme.breakpoints.up('table_834')]: {
    color: isLight ? (isSelected ? '#2DC1B1' : '#D1DEE6') : isSelected ? '#139D8D' : '#546978',
    fontSize: 11,
    fontWeight: 500,
    lineHeight: 'normal',
    cursor: 'pointer',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
  },
}));

const ContainerCardChart = styled.div({
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
    flexDirection: 'row',
    gap: 0,
    flex: 1,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'flex',
    flexDirection: 'row',
    gap: 64,
    marginLeft: 0,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    display: 'flex',
    flexDirection: 'row',
    gap: 64,
    marginLeft: 0,
  },
});

const ContainerCardInformation = styled.div({
  [lightTheme.breakpoints.up('table_834')]: {
    width: 241,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 300,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 300,
  },
});

const Divider = styled.div<WithIsLight>(({ isLight }) => ({
  borderLeft: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginLeft: 32,
    height: 134,
    marginTop: 20,
    borderLeft: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginLeft: '0',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginLeft: '0',
  },
}));

const ContainerChat = styled.div({
  display: 'flex',
  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 440,
    marginLeft: 60,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 430,
    marginLeft: 130,
  },
});

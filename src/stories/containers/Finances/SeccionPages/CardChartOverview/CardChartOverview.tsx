import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import InformationBudgetCapOverview from '../../components/OverviewCardKeyDetailsBudget/InformationBudgetCapOverView/InformationBudgetCapOverView';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  filters: string[];
  filterSelected: string;
  handleSelectFilter: (filterSelected: string) => void;
  actuals: number;
  budgetCap: number;
  prediction: number;
}
const CardChartOverview: React.FC<Props> = ({
  filterSelected,
  filters,
  handleSelectFilter,
  actuals,
  budgetCap,
  prediction,
}) => {
  const { isLight } = useThemeContext();
  const handleOnclick = (item: string) => () => {
    handleSelectFilter(item);
  };
  return (
    <Container isLight={isLight}>
      <ContainerFilters>
        {filters.map((item) => (
          <Item isLight={isLight} isSelected={filterSelected === item} onClick={handleOnclick(item)}>
            {item}
          </Item>
        ))}
      </ContainerFilters>
      <ContainerCardChart>
        <ContainerCardInformation>
          <InformationBudgetCapOverview actuals={actuals} budgetCap={budgetCap} prediction={prediction} />
        </ContainerCardInformation>
        <Divider isLight={isLight} />
      </ContainerCardChart>
    </Container>
  );
};

export default CardChartOverview;

const Container = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px 16px 48px 64px',
  borderRadius: 6,
  border: isLight ? '1px solid rgba(212, 217, 225, 0.25)' : 'red',
  background: isLight ? '#FFF' : 'red',
  boxShadow: isLight ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)' : 'red',
  height: 311,
}));

const ContainerFilters = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: 24,
  marginBottom: 32,
  marginRight: 8,
  marginTop: -2,
});
const Item = styled.div<WithIsLight & { isSelected: boolean }>(({ isLight, isSelected }) => ({
  color: isLight ? (isSelected ? '#2DC1B1' : '#D1DEE6') : isSelected ? 'red' : 'blue',
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 'normal',
  cursor: 'pointer',
}));

const ContainerCardChart = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: 64,
  flex: 1,
});

const ContainerCardInformation = styled.div({
  width: 300,
});

const Divider = styled.div<WithIsLight>(({ isLight }) => ({
  borderLeft: isLight ? '1px solid #D4D9E1' : 'red',
}));

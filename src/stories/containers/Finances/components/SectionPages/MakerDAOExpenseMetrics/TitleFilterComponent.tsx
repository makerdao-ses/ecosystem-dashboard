import styled from '@emotion/styled';
import SingleItemSelect from '@ses/components/SingleItemSelect/SingleItemSelect';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import SectionTitle from '../../SectionTitle/SectionTitle';
import CumulativeFilter from './CumulativeFilter/CumulativeFilter';
import type { CumulativeType } from './useMakerDAOExpenseMetrics';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';

interface Props {
  title: string;
  handleChange: (value: AnalyticGranularity) => void;
  selectedValue: AnalyticGranularity;
  isCumulative: boolean;
  handleToggleCumulative: () => void;
  cumulativeType: CumulativeType;
  handleChangeCumulativeType: (value: CumulativeType) => void;
}

const TitleFilterComponent: React.FC<Props> = ({
  title,
  handleChange,
  selectedValue,
  isCumulative,
  handleToggleCumulative,
  cumulativeType,
  handleChangeCumulativeType,
}) => (
  <Container>
    <SectionTitle
      title={title}
      tooltip="View expense metrics for the selected year on this line chart, with a fixed legend of Budget, Forecast, Actuals, Net Expenses Off-Chain, and Net Expenses On-Chain, all toggleable for customized visualization."
    />

    <FilterContainer>
      <CumulativeFilter
        isCumulative={isCumulative}
        handleToggleCumulative={handleToggleCumulative}
        cumulativeType={cumulativeType}
        handleChangeCumulativeType={handleChangeCumulativeType}
      />
      <PeriodicSelectionFilter>
        <PeriodSelect
          items={[
            {
              label: 'Monthly',
              value: 'monthly',
            },
            {
              label: 'Quarterly',
              value: 'quarterly',
            },
            {
              label: 'Annually',
              value: 'annual',
            },
          ]}
          useSelectedAsLabel
          onChange={(value) => handleChange(value as AnalyticGranularity)}
          selected={selectedValue}
          PopperProps={{
            style: {
              zIndex: 2,
            },
            placement: 'bottom-end',
          }}
        />
      </PeriodicSelectionFilter>
    </FilterContainer>
  </Container>
);

export default TitleFilterComponent;
const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  flex: 1,
  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

const FilterContainer = styled.div({
  display: 'flex',
  alignSelf: 'flex-end',
  gap: 16,

  [lightTheme.breakpoints.up('tablet_768')]: {},
});

const PeriodicSelectionFilter = styled.div({
  gridArea: 'periodicSelection',
  justifyContent: 'flex-end',
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
  },
});

const PeriodSelect = styled(SingleItemSelect)({
  padding: '7px 15px 7px 16px',
});

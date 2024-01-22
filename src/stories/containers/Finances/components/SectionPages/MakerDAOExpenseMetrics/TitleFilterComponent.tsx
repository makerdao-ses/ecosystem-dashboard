import styled from '@emotion/styled';
import SingleItemSelect from '@ses/components/SingleItemSelect/SingleItemSelect';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import SectionTitle from '../../SectionTitle/SectionTitle';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';

interface Props {
  handleChange: (value: AnalyticGranularity) => void;
  selectedValue: AnalyticGranularity;
}

const TitleFilterComponent: React.FC<Props> = ({ handleChange, selectedValue }) => (
  <Container>
    <SectionTitle
      title="MakerDAO Expense Metrics"
      tooltip="View monthly expense metrics for the current year on this line chart, with a fixed legend of Budget, Forecast, Actuals, Net Expenses Off-Chain, and Net Expenses On-Chain, all toggleable for customized visualization."
    />

    <FilterContainer>
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
  alignSelf: 'flex-end',
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

  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '14px 15px 14px 16px',
  },
});

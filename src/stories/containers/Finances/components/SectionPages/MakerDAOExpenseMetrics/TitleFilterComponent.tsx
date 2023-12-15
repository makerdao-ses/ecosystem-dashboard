import styled from '@emotion/styled';
import SESTooltip from '@ses/components/SESTooltip/SESTooltip';
import SingleItemSelect from '@ses/components/SingleItemSelect/SingleItemSelect';
import Information from '@ses/components/svg/information';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  handleChange: (value: AnalyticGranularity) => void;
  selectedValue: AnalyticGranularity;
}

const TitleFilterComponent: React.FC<Props> = ({ handleChange, selectedValue }) => {
  const { isLight } = useThemeContext();

  return (
    <Container>
      <TitleTooltip>
        <Title isLight={isLight}>MakerDAO Expense Metrics</Title>
        <Tooltip>
          <SESTooltip
            content={'Description is missing'}
            placement="bottom-start"
            enterTouchDelay={0}
            leaveTouchDelay={15000}
          >
            <IconWrapper>
              <Information />
            </IconWrapper>
          </SESTooltip>
        </Tooltip>
      </TitleTooltip>

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
};

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

const TitleTooltip = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: 12,
  height: 24,

  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 12,
  },
});

const Title = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontFamily: 'Inter, sans-serif',
  fontSize: 18,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: '0.75px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    letterSpacing: '0.4px',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    fontSize: 24,
  },
}));
const Tooltip = styled.div({});

const IconWrapper = styled.div({
  display: 'flex',

  paddingTop: 2,
  [lightTheme.breakpoints.up('tablet_768')]: {
    paddingTop: 4,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    paddingTop: 8,
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

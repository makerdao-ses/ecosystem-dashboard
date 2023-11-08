import styled from '@emotion/styled';
import SESTooltip from '@ses/components/SESTooltip/SESTooltip';
import SingleItemSelect from '@ses/components/SingleItemSelect/SingleItemSelect';
import Information from '@ses/components/svg/information';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  periodicSelectionFilter: string[];
  handleChange: (value: string) => void;
  selectedValue: string;
}

const TitleFilterComponent: React.FC<Props> = ({ handleChange, selectedValue, periodicSelectionFilter }) => {
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
            items={periodicSelectionFilter}
            useSelectedAsLabel
            onChange={handleChange}
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
    gap: 10,
  },
});

const Title = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontFamily: 'Inter, sans-serif',
  fontSize: 20,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: '0.5px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 24,
    letterSpacing: '0.4px',
  },
}));
const Tooltip = styled.div({});

const IconWrapper = styled.div({
  display: 'flex',

  paddingTop: 2,
  [lightTheme.breakpoints.up('tablet_768')]: {
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

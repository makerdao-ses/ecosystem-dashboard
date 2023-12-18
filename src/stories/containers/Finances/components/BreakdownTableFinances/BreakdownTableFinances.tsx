import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import SESTooltip from '@ses/components/SESTooltip/SESTooltip';
import Information from '@ses/components/svg/information';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import FilterTable from '../FiltersTable/FilterTable';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  metrics: MultiSelectItem[];
  activeItems: string[];
  handleSelectChange: (value: string[]) => void;
  handleResetFilter: () => void;
  periodicSelectionFilter: string[];
  handleChange: (value: string) => void;

  selectedValue: string;

  maxItems?: number;
  minItems?: number;
  defaultMetricsWithAllSelected?: string[];
  allowSelectAll?: boolean;
  popupContainerHeight?: number;
}

const BreakdownTableFinances = ({
  activeItems,
  handleChange,
  handleResetFilter,
  handleSelectChange,

  periodicSelectionFilter,
  metrics,
  selectedValue,

  defaultMetricsWithAllSelected,
  maxItems,
  minItems,
  allowSelectAll,
  popupContainerHeight,
}: Props) => {
  const { isLight } = useThemeContext();
  const phoneLess = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));

  return (
    <Container>
      <TitleTooltip>
        <Title isLight={isLight}>{`${phoneLess ? 'MakerDAO Budget' : 'Breakdown Table'}`}</Title>

        <Tooltip>
          <SESTooltip
            content={
              'Adjust the table to display financial data by selecting the time period and types, with a variable column limit based on screen size, all neatly organized by budget/scope with corresponding subtotals.'
            }
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
        <FilterTable
          maxItems={maxItems}
          minItems={minItems}
          defaultMetricsWithAllSelected={defaultMetricsWithAllSelected}
          activeItems={activeItems}
          metrics={metrics}
          handleSelectChange={handleSelectChange}
          handleResetFilter={handleResetFilter}
          handleChange={handleChange}
          selectedValue={selectedValue}
          periodicSelectionFilter={periodicSelectionFilter}
          allowSelectAll={allowSelectAll}
          popupContainerHeight={popupContainerHeight}
        />
      </FilterContainer>
    </Container>
  );
};

export default BreakdownTableFinances;
const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 26,
  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

const TitleTooltip = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
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
  height: 34,

  [lightTheme.breakpoints.up('tablet_768')]: {
    height: 48,
  },
});

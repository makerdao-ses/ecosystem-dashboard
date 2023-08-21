import styled from '@emotion/styled';
import SESTooltip from '@ses/components/SESTooltip/SESTooltip';
import Information from '@ses/components/svg/information';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import FilterTable from '../FiltersTable/FilterTable';
import type { SelectChangeEvent } from '@mui/material/Select/Select';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  metrics: MultiSelectItem[];
  activeItems: string[];
  handleSelectChange: (value: string[]) => void;
  handleResetFilter: () => void;
  periodicSelectionFilter: string[];
  handleChange: (event: SelectChangeEvent<unknown>) => void;
  onOpen?: () => void;
  onClose?: () => void;
  selectedValue: string;
  isOpen: boolean;
}

const BreakdownTableFinances = ({
  activeItems,
  handleChange,
  handleResetFilter,
  handleSelectChange,
  isOpen,
  periodicSelectionFilter,
  metrics,
  selectedValue,
  onClose,
  onOpen,
}: Props) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <TitleTooltip>
        <Title isLight={isLight}>Breakdown Table</Title>
        <Tooltip>
          <TooltipWrapper>
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
          </TooltipWrapper>
        </Tooltip>
      </TitleTooltip>

      <FilterContainer>
        <FilterTable
          activeItems={activeItems}
          metrics={metrics}
          handleSelectChange={handleSelectChange}
          handleResetFilter={handleResetFilter}
          handleChange={handleChange}
          isOpen={isOpen}
          selectedValue={selectedValue}
          periodicSelectionFilter={periodicSelectionFilter}
          onClose={onClose}
          onOpen={onOpen}
        />
      </FilterContainer>
    </Container>
  );
};

export default BreakdownTableFinances;
const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

const TitleTooltip = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  gap: 6,
});

const Title = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : 'red',
  fontFamily: 'Inter, sans-serif',
  fontSize: 24,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: '0.4px',
}));
const Tooltip = styled.div({
  height: 24,
  width: 24,
});

const TooltipWrapper = styled.div({
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const IconWrapper = styled.div({
  width: 'fit-content',
  height: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const FilterContainer = styled.div({
  height: 34,

  [lightTheme.breakpoints.up('table_834')]: {
    height: 48,
  },
});

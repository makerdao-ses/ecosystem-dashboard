import styled from '@emotion/styled';
import SESTooltip from '@ses/components/SESTooltip/SESTooltip';
import Information from '@ses/components/svg/information';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const BreakdownTable = () => {
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
      <div>Filtros</div>
    </Container>
  );
};

export default BreakdownTable;
const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
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

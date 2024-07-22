import styled from '@emotion/styled';
import { Container } from '@ses/components/SelectItem/SelectItem';
import Check from '@ses/components/svg/check';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { SelectItemProps } from '@ses/components/CustomMultiSelect/CustomMultiSelect';

const MetricItem: React.FC<SelectItemProps> = ({ checked = false, ...props }) => {
  const { isLight } = useThemeContext();

  return (
    <StyledContainer
      className="no-select"
      style={{
        flex: 1,
        minHeight: 40,
        maxHeight: 40,
        padding: 4,
      }}
      checked={checked}
      isLight={isLight}
      onClick={props.onClick}
    >
      <DelegateName isLight={isLight} checked={checked}>
        {props.label}
      </DelegateName>
      <CheckWrapper>
        <Check fill={checked ? (isLight ? '#231536' : 'white') : isLight ? '#D1DEE6' : '#231536'} />
      </CheckWrapper>
    </StyledContainer>
  );
};

export default MetricItem;

const DelegateName = styled.span<{ isLight: boolean; checked: boolean }>(({ isLight, checked = false }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '17px',
  color: isLight ? (checked ? '#231536' : '#231536') : '#D2D4EF',
  marginLeft: '16px',
}));

const CheckWrapper = styled.span({
  alignSelf: 'center',
  position: 'absolute',
  right: 8,
  top: 8,
});

const StyledContainer = styled(Container)<{ isLight: boolean; checked: boolean }>(({ isLight, checked }) => ({
  '&:hover': {
    background: isLight ? (checked ? '#EDEFFF' : '#F6F8F9') : checked ? '#231536' : '#25273D',
  },
}));

import styled from '@emotion/styled';
import { CircleAvatar } from '@ses/components/CircleAvatar/CircleAvatar';
import { Container } from '@ses/components/SelectItem/SelectItem';
import Check from '@ses/components/svg/check';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { SelectItemProps } from '@ses/components/CustomMultiSelect/CustomMultiSelect';

const DelegateSelectItem: React.FC<SelectItemProps> = ({ checked = false, isDisable = false, ...props }) => {
  const { isLight } = useThemeContext();

  return (
    <StyledContainer
      isDisable={isDisable}
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
      {!props.params?.isAll && (
        <>
          <StyledCircleAvatar
            checked={checked}
            isLight={isLight}
            isDisable={isDisable}
            name={props.label.toString()}
            image={props.params?.url}
            width={'32px'}
            height={'32px'}
          />
        </>
      )}
      <DelegateName isLight={isLight} isDisable={isDisable} checked={checked}>
        {props.label}
      </DelegateName>
      <CheckWrapper>
        <Check fill={checked ? (isLight ? '#231536' : 'white') : isLight ? '#D1DEE6' : '#231536'} />
      </CheckWrapper>
    </StyledContainer>
  );
};

export default DelegateSelectItem;

const DelegateName = styled.span<{ isLight: boolean; isDisable: boolean; checked: boolean }>(
  ({ isLight, isDisable = false, checked = false }) => ({
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '17px',
    color: isLight
      ? isDisable
        ? checked
          ? '#231536'
          : '#D1DEE6'
        : '#231536'
      : isDisable
      ? checked
        ? '#FFFFFF'
        : '#1E2C37'
      : '#FFFFFF',
    marginLeft: '16px',
  })
);

const CheckWrapper = styled.span({
  alignSelf: 'center',
  position: 'absolute',
  right: 8,
  top: 8,
});

const StyledContainer = styled(Container)<{ isLight: boolean; checked: boolean; isDisable: boolean }>(
  ({ isDisable, checked, isLight }) => ({
    '&:hover': {
      background: isDisable ? 'none' : isLight ? (checked ? '#EDEFFF' : '#F6F8F9') : isDisable ? 'none' : '#25273D',
      backgroundColor:
        isLight && checked ? '#EDEFFF' : isLight && !checked ? 'none' : !isLight && !checked ? '#000A13' : '#231536',
    },
  })
);

const StyledCircleAvatar = styled(CircleAvatar)<{ isLight: boolean; isDisable: boolean; checked: boolean }>(
  ({ isLight, isDisable, checked }) => ({
    opacity: isLight ? (isDisable ? (checked ? 'none' : 0.3) : 'none') : isDisable ? (checked ? 'none' : 0.2) : 'none',
    filter: 'filter: drop-shadow(2px 4px 7px rgba(26, 171, 155, 0.25))',
  })
);

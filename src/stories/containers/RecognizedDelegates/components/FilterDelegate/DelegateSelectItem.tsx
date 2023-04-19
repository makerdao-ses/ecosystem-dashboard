import styled from '@emotion/styled';
import { CircleAvatar } from '@ses/components/CircleAvatar/CircleAvatar';
import { Container } from '@ses/components/SelectItem/SelectItem';
import Check from '@ses/components/svg/check';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { SelectItemProps } from '@ses/components/CustomMultiSelect/CustomMultiSelect';

const DelegateSelectItem: React.FC<SelectItemProps> = ({ checked = false, ...props }) => {
  const { isLight } = useThemeContext();

  return (
    <Container
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
          <CircleAvatar name={props.label.toString()} image={props.params?.url} width={'32px'} height={'32px'} />
        </>
      )}
      <CoreUnitName isLight={isLight}>{props.label}</CoreUnitName>
      <CheckWrapper>
        <Check fill={checked ? (isLight ? '#231536' : 'white') : isLight ? '#D1DEE6' : 'rgb(159, 175, 185)'} />
      </CheckWrapper>
    </Container>
  );
};

export default DelegateSelectItem;

const CoreUnitName = styled.span<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '17px',
  color: isLight ? '#231536' : '#FFFFFF',
  marginLeft: '4px',
}));

const CheckWrapper = styled.span({
  alignSelf: 'center',
  position: 'absolute',
  right: 8,
  top: 8,
});

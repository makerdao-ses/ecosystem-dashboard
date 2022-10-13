import styled from '@emotion/styled';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { CircleAvatar } from '../circle-avatar/circle-avatar';
import { SelectItemProps } from '../custom-multi-select/custom-multi-select';
import { Container } from '../select-item/select-item';
import Check from '../svg/check';

export default ({ checked = false, ...props }: SelectItemProps) => {
  const isLight = useThemeContext().themeMode === 'light';

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
          <CoreUnitCode isLight={isLight}>{props.params?.code}</CoreUnitCode>
        </>
      )}
      <CoreUnitName isLight={isLight}>{props.label}</CoreUnitName>
      <CheckWrapper>
        <Check fill={checked ? (isLight ? '#231536' : 'white') : isLight ? '#D1DEE6' : 'rgb(159, 175, 185)'} />
      </CheckWrapper>
    </Container>
  );
};

const CoreUnitCode = styled.span<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 800,
  fontSize: '14px',
  lineHeight: '17px',
  letterSpacing: '0.3px',
  textTransform: 'uppercase',
  color: isLight ? '#9FAFB9' : '#546978',
  marginLeft: '16px',
}));

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

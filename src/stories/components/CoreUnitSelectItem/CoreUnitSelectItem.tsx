import styled from '@emotion/styled';
import React from 'react';
import CircleAvatar from '@/components/CircleAvatar/CircleAvatar';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { Container } from '../SelectItem/SelectItem';
import Check from '../svg/check';
import type { SelectItemProps } from '../CustomMultiSelect/CustomMultiSelect';

const CoreUnitSelectItem: React.FC<SelectItemProps> = ({ checked = false, ...props }) => {
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
          <CircleAvatarStyled name={props.label.toString()} image={props.params?.url} />
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

export default CoreUnitSelectItem;

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

const CircleAvatarStyled = styled(CircleAvatar)({
  width: 32,
  height: 32,
  minWidth: 32,
  minHeight: 32,
});

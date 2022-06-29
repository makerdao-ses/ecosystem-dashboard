import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';

interface CustomButtonProps {
  label: string,
  disabled?: boolean,
  style?: CSSProperties,
  onClick?: () => void,
}

export const CustomButton = (props: CustomButtonProps) => {
  return <Container type="button" disabled={props.disabled} onClick={props.onClick} style={props.style}>
    <Text className={props.disabled ? 'disabled' : ''}>{props.label}</Text>
  </Container>;
};

const Container = styled.button({
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  height: '48px',
  border: '1px solid #D4D9E1',
  borderRadius: '22px',
  background: 'white',
  transition: 'all .3s ease',
  padding: '15px 16px',
  boxSizing: 'border-box',
  cursor: 'pointer',
  color: '#231536',
  '&:hover:not(:disabled)': {
    borderColor: '#231536'
  },
  '.disabled': {
    color: '#9FAFB9'
  }
});

const Text = styled.div({
  fontSize: '14px',
  fontFamily: 'SF Pro Text, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  color: '#231536',
  whiteSpace: 'nowrap',
});

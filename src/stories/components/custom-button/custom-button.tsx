import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

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
  background: 'transparent',
  transition: 'all .3s ease',
  padding: '15px 16px',
  boxSizing: 'border-box',
  cursor: 'pointer',
  '&:hover:not(:disabled)': {
    borderColor: '#25273D'
  },
  '.disabled': {
    color: '#D4D9E1'
  }
});

const Text = styled.div({
  fontSize: '14px',
  fontFamily: 'SF Pro Text, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  color: '#231536'
});

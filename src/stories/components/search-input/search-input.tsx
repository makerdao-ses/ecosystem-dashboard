import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import Magnifier from '../svg/magnifier';

interface SearchInputProps {
  value?: string,
  defaultValue?: string,
  placeholder: string,
  onChange?: (text: string) => void
  style?: CSSProperties,
}

export const SearchInput = (props: SearchInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange && props.onChange(event.target.value);
  };

  return <Container style={props.style}>
    <InputWrapper>
      <Input onChange={handleChange} placeholder={props.placeholder} value={props.value} defaultValue={props.defaultValue} />
      <IconWrapper><Magnifier /></IconWrapper>
    </InputWrapper>
  </Container>;
};

const Container = styled.div({
  display: 'flex',
});

const InputWrapper = styled.div({
  position: 'relative',
  display: 'flex',
  alignItems: 'center'
});

const Input = styled.input({
  fontFamily: 'SF Pro Text, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  flex: 1,
  outline: 'none',
  width: '320px',
  height: '48px',
  border: '1px solid #D4D9E1',
  borderRadius: '22px',
  padding: '15px 45px 15px 16px',
  boxSizing: 'border-box',
  transition: 'all .3s ease',
  '&::placeholder': {
    color: '#B0BCC0'
  }
});

const IconWrapper = styled.div({
  position: 'absolute',
  right: '22px'
});

import React, { CSSProperties, useState } from 'react';
import styled from '@emotion/styled';
import Magnifier from '../svg/magnifier';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface SearchInputProps {
  value?: string;
  defaultValue?: string;
  placeholder: string;
  onChange?: (text: string) => void;
  style?: CSSProperties;
}

export const SearchInput = (props: SearchInputProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange && props.onChange(event.target.value);
  };

  const [focus, setFocus] = useState(false);

  return <Container style={props.style}>
    <InputWrapper>
      <IconWrapper><Magnifier fill={isLight ? '#25273D' : '#ADAFD4'} /></IconWrapper>
      <Input
        isLight={isLight}
        id="search-input"
        onChange={handleChange}
        placeholder={props.placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        focus={focus || !!props.value}
        value={props.value}
        defaultValue={props.defaultValue}
      />
      <IconWrapper>
        <Magnifier fill={isLight ? '#25273D' : '#ADAFD4'} />
      </IconWrapper>
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

const Input = styled.input<{ focus: boolean, isLight: boolean }>(({ focus, isLight }) => ({
  fontFamily: 'SF Pro Text, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  flex: 1,
  color: isLight ? '#25273D' : '#FFFFFF',
  outline: 'none',
  width: '320px',
  height: '48px',
  border: isLight && focus ? '1px solid #231536' : isLight && !focus ? '1px solid #D4D9E1' : !isLight && focus ? '1px solid #787A9B' : '1px solid #343442',
  borderRadius: '22px',
  padding: '15px 45px 15px 16px',
  boxSizing: 'border-box',
  transition: 'all .3s ease',
  backgroundColor: isLight ? '#FFFFFF' : '#10191F',
  '&::placeholder': {
    color: isLight ? '#B0BCC0' : '#D2D4EF',
  }
}));

const IconWrapper = styled.div({
  position: 'absolute',
  right: '22px',
  display: 'flex',
});

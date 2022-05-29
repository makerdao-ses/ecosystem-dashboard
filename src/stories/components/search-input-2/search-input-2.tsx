import React, { useState } from 'react';
import styled from '@emotion/styled';
import Magnifier from '../svg/magnifier';

interface SearchInputProps {
  value?: string,
  placeholder: string,
  onChange?: (text: string) => void
}

export const SearchInput2 = (props: SearchInputProps) => {
  const [value, setValue] = useState(props.value || '');
  const [oldTimeout, setOldTimeout] = useState<NodeJS.Timeout>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    oldTimeout && clearTimeout(oldTimeout);
    setOldTimeout(setTimeout(() => {
      props.onChange && props.onChange(event.target.value);
    }, 600));
  };

  return <Container>
    <InputWrapper>
      <Input onChange={handleChange} placeholder={props.placeholder} value={value}/>
      <IconWrapper><Magnifier/></IconWrapper>
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
  '&:focus': {
    borderColor: '#25273D'
  }
});

const IconWrapper = styled.div({
  position: 'absolute',
  right: '22px'
});

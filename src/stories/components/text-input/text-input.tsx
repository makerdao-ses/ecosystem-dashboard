import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import Eye from '../svg/eye';

interface Props {
  placeholder: string;
  style?: React.CSSProperties;
  type?: 'text' | 'password';
  value?: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | boolean;
  name: string;
  onBlur?: (value: React.FocusEvent<HTMLInputElement>) => void;
}

export default ({ placeholder, style, type = 'text', value = '', onChange, error, name, onBlur }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisible = () => setPasswordVisible(!passwordVisible);

  return (
    <Wrapper style={style}>
      <Input
        ref={ref}
        type={passwordVisible ? 'text' : type}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        value={value}
        active={!!value}
        error={!!error}
        id={name}
        name={name}
      />
      {type === 'password' && (
        <IconWrapper onClick={togglePasswordVisible}>
          <Eye fill={error ? (passwordVisible ? '#F75524' : '#FBE1D9') : passwordVisible ? '#231536' : '#D4D9E1'} />
        </IconWrapper>
      )}
      {error && typeof error === 'string' && <Error>{error}</Error>}
    </Wrapper>
  );
};

const Wrapper = styled.div({
  position: 'relative',
  width: '100%',
});

const IconWrapper = styled.span({
  position: 'absolute',
  right: 10,
  top: 8,
  cursor: 'pointer',
});

const Input = styled.input<{ active: boolean; error: boolean }>(({ active, error }) => ({
  boxSizing: 'border-box',
  alignItems: 'center',
  width: '100%',
  height: 48,
  border: '1px solid #D4D9E1',
  borderRadius: 6,
  padding: '14px 16px',
  fontSize: 16,
  lineHeight: '19px',
  color: '#231536',
  outline: 'none',
  ...(active && {
    borderColor: '#708390',
  }),
  '&:focus': {
    borderColor: '#447AFB',
  },
  ...(error && {
    borderColor: '#F75524 !important',
    color: '#F75524',
  }),
  '::placeholder': {
    color: '#D4D9E1',
  },
}));

const Error = styled.div({
  display: 'flex',
  color: '#F75524',
  width: 356,
  fontSize: 14,
  lineHeight: '17px',
  paddingLeft: 16,
  marginTop: 8,
  '::before': {
    content: '"*"',
    position: 'absolute',
    left: 2,
    marginTop: 1,
  },
});

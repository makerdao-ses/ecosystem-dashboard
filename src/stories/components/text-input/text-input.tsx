import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
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
  const { isLight } = useThemeContext();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisible = () => setPasswordVisible(!passwordVisible);

  return (
    <Wrapper style={style}>
      <Input
        isLight={isLight}
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
          <Eye
            fill={
              isLight
                ? error
                  ? passwordVisible
                    ? '#F75524'
                    : '#FBE1D9'
                  : passwordVisible
                  ? '#231536'
                  : '#D4D9E1'
                : error
                ? passwordVisible
                  ? '#F75524'
                  : '#3D2525'
                : passwordVisible
                ? '#D2D4EF'
                : '#25273D'
            }
          />
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

const Input = styled.input<{ active: boolean; error: boolean; isLight: boolean }>(({ active, error, isLight }) => ({
  boxSizing: 'border-box',
  alignItems: 'center',
  width: '100%',
  height: 48,
  border: isLight ? '1px solid #D4D9E1' : '1px solid #343442;',
  borderRadius: 6,
  padding: '14px 16px',
  fontSize: 16,
  lineHeight: '19px',
  backgroundColor: isLight ? 'white' : '#10191F',
  color: isLight ? '#231536' : '#D2D4EF',
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
    color: isLight ? '#D4D9E1' : '#48495F',
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

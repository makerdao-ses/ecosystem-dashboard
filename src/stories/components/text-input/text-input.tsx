import styled from '@emotion/styled';
import React, { useRef } from 'react';
import Eye from '../svg/eye';

interface Props {
  placeholder: string;
  style?: React.CSSProperties;
  type?: 'text' | 'password';
  value?: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

export default ({ placeholder, style, type = 'text', value = '', onChange }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Wrapper>
      <Input
        ref={ref}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        style={style}
        value={value}
        active={!!value}
      />
      {type === 'password' && (
        <IconWrapper>
          <Eye />
        </IconWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div({
  position: 'relative',
});

const IconWrapper = styled.span({
  position: 'absolute',
  right: 10,
  top: 8,
});

const Input = styled.input<{ active: boolean }>(({ active }) => ({
  boxSizing: 'border-box',
  alignItems: 'center',
  width: 356,
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
    borderColor: 'blue',
  },
  '::placeholder': {
    color: '#D4D9E1',
  },
}));

import styled from '@emotion/styled';
import React from 'react';
import Check from '../svg/check';

interface Props {
  label: string | JSX.Element;
  isActive: boolean;
  onClick?: () => void;
}

export const SortItem = (props: Props) => {
  return (
    <Container isActive={props.isActive} onClick={props.onClick}>
      <span>{props.label}</span>
      <Check fill={props.isActive ? '#231536' : '#D1DEE6'} />
    </Container>
  );
};

const Container = styled.div<{ isActive: boolean }>(({ isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '30px',
  borderRadius: '6px',
  padding: '4px',
  transition: 'all .3s ease',
  cursor: 'pointer',
  width: '100%',
  backgroundColor: isActive ? '#EDEFFF' : 'unset',
  span: {
    fontSize: '16px',
    lineHeight: '22px',
    color: '#231536',
    fontWeight: 600,
  },
}));

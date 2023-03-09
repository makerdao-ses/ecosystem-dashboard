import styled from '@emotion/styled';
import React from 'react';

import type { PropsWithChildren } from 'react';
export type AlignArrowTooTip = 'left' | 'center' | 'right';
interface Props extends PropsWithChildren {
  align: AlignArrowTooTip;
}

const ArrowPopover: React.FC<Props> = ({ children, align }) => {
  const positionArrow = align === 'center' ? 135 : align === 'right' ? 257 : 32;
  return (
    <Container>
      <ContainerTriangle positionArrow={positionArrow} />
      {children}
    </Container>
  );
};

export default ArrowPopover;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: 6,
  position: 'relative',
});

const ContainerTriangle = styled.div<{ positionArrow: number }>(({ positionArrow }) => ({
  width: 16,
  height: 16,
  position: 'absolute',
  top: -20,
  left: positionArrow,
  transform: 'translateX(-50%)',
  overflow: 'hidden',
  border: 'none',
  ':after': {
    content: '""',
    position: 'absolute',
    width: 20,
    height: 20,
    background: 'white',
    transform: 'translateX(-50%) translateY(26%) rotate(312deg)',
    top: 0,
    left: '50%',
    borderRight: '1px solid #D9D9D9',
    borderTop: '1px solid #D9D9D9',
  },
}));

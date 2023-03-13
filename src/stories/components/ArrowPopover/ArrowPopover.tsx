import styled from '@emotion/styled';
import React from 'react';

import type { PropsWithChildren } from 'react';

const ArrowPopover: React.FC<PropsWithChildren> = ({ children }) => <Container>{children}</Container>;
export default ArrowPopover;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: 6,
  position: 'relative',
});

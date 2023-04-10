import styled from '@emotion/styled';
import React from 'react';

interface Props extends React.PropsWithChildren {
  className?: string;
}

const KeyStatsCard: React.FC<Props> = ({ children, className }) => (
  <Container className={className}>{children}</Container>
);

export default KeyStatsCard;

const Container = styled.div({
  background: '#FFFFFF',
  boxShadow: '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
  borderRadius: '6px',
});

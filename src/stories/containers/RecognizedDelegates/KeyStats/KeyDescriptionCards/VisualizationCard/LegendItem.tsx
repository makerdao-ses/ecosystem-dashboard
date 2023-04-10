import styled from '@emotion/styled';
import React from 'react';

interface Props {
  color: string;
  description: string;
}

const LegendItem: React.FC<Props> = ({ color, description }) => (
  <Container>
    <Circle color={color} />
    <Description>{description} </Description>
  </Container>
);

export default LegendItem;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const Circle = styled.div<{ color: string }>(({ color }) => ({
  width: 8,
  height: 8,
  backgroundColor: color,
  marginRight: 4,
  borderRadius: '50%',
}));

const Description = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '13px',
  color: '#708390',
});

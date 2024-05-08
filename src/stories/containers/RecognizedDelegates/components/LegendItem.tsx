import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';

interface Props {
  color: string;
  description: string;
  className?: string;
}

const LegendItem: React.FC<Props> = ({ color, description, className }) => (
  <Container className={className}>
    <Circle color={color} />
    <Description>{description} </Description>
  </Container>
);

export default LegendItem;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: -1,
  },
});

const Circle = styled.div<{ color: string }>(({ color }) => ({
  width: 8,
  height: 8,
  minWidth: 8,
  maxHeight: 8,
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
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: '12px',
    lineHeight: '15px',
  },
});

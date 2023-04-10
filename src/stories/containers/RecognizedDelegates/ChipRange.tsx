import styled from '@emotion/styled';
import React from 'react';

interface Props {
  text: string;
}

const ChipRange: React.FC<Props> = ({ text }) => <Container>{text}</Container>;

export default ChipRange;

const Container = styled.div({
  padding: '4px',
  background: '#B6EDE7',
  borderRadius: '6px',
  fontFamily: 'Inter,san-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
});

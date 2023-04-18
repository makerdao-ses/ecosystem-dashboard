import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';

interface Props {
  text: string;
}

const ChipRange: React.FC<Props> = ({ text }) => <Container>{text}</Container>;

export default ChipRange;

const Container = styled.div({
  fontFamily: 'Inter,san-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',

  [lightTheme.breakpoints.up('table_834')]: {
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
});

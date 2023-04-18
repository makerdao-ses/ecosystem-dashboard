import styled from '@emotion/styled';

import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import ChipRange from './ChipRange';

interface Props {
  start: string;
  end: string;
}

const Range: React.FC<Props> = ({ start, end }) => (
  <Container>
    <ChipRange text={start} />
    <ContainerDash>
      <Dash />
    </ContainerDash>
    <ChipRange text={end} />
  </Container>
);

export default Range;

const Container = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  color: '#139D8D',
  width: 248,
  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 240,
  },
});

const Dash = styled.div({
  margin: 'auto',
  width: '25%',
  borderStyle: 'dashed none none none',
  transform: 'scaleX(4)',
  color: '#6EDBD0',
  borderWidth: 0.5,
});

const ContainerDash = styled.div({
  display: 'flex',
  marginLeft: 5,
  marginRight: 5,
  flex: 1,
  alignItems: 'center',
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginLeft: 6,
    marginRight: 6,
  },
});

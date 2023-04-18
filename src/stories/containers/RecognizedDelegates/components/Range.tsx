import styled from '@emotion/styled';

import React from 'react';
import ChipRange from './ChipRange';

interface Props {
  start: string;
  end: string;
}

const Range: React.FC<Props> = ({ start, end }) => (
  <Container>
    <ChipRange text={start} />
    <div
      style={{
        display: 'flex',
        marginLeft: 5,
        marginRight: 5,
        flex: 1,
        alignItems: 'center',
      }}
    >
      <Dash />
    </div>
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
});

const Dash = styled.div({
  margin: 'auto',
  width: '25%',
  borderStyle: 'dashed none none none',
  transform: 'scaleX(4)',
  color: '#6EDBD0',
  borderWidth: 0.5,
});

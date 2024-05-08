import styled from '@emotion/styled';

import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import ChipRange from './ChipRange';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { DateTime } from 'luxon';

interface Props {
  start: DateTime;
  end: DateTime;
}

const Range: React.FC<Props> = ({ start, end }) => {
  const { isLight } = useThemeContext();
  return (
    <Container isLight={isLight}>
      <ChipRange text={start} />
      <ContainerDash>
        <Dash isLight={isLight} />
      </ContainerDash>
      <ChipRange text={end} />
    </Container>
  );
};

export default Range;

const Container = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  color: isLight ? '#139D8D' : '#2DC1B1',
  width: 248,
  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 240,
  },
}));

const Dash = styled.div<WithIsLight>(({ isLight }) => ({
  margin: 'auto',
  width: '25%',
  borderStyle: 'dashed none none none',
  transform: 'scaleX(4)',
  color: isLight ? '#6EDBD0' : '#027265',
  borderWidth: 0.5,
}));

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

import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { DateTime } from 'luxon';

interface Props {
  text: DateTime;
}

const ChipRange: React.FC<Props> = ({ text }) => <Container>{text.toFormat('LLL yyyy')}</Container>;

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

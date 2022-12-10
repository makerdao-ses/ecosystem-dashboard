import React from 'react';
import styled from '@emotion/styled';
import NoteChecked from '../../../components/svg/note-checked';
import lightTheme from '../../../../../styles/theme/light';
import { useThemeContext } from '../../../../core/context/ThemeContext';

const CUNewExpenseReport: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <Container>
      <Left isLight={isLight}>
        <NoteChecked
          {...(!isLight && {
            fill: '#098C7D',
            background: '#013C35',
          })}
        />
      </Left>
      <Text isLight={isLight}>
        Core Unit SES has published a new expense report for September 2022 on 29-SEP-2022 14:33 UTC
      </Text>
      <Right isLight={isLight}>
        <Circle isLight={isLight} />
      </Right>
    </Container>
  );
};

export default CUNewExpenseReport;

const Container = styled.div({
  position: 'relative',
  marginBottom: 40,
  display: 'flex',
  width: '100%',
});

const Text = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  padding: '0 8px',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  fontSize: 14,
  lineHeight: '22px',
  fontWeight: 400,
  color: isLight ? '#231536' : '#D2D4EF',
  maxWidth: 400,
  minWidth: '74%',
  textAlign: 'center',

  [lightTheme.breakpoints.up('table_834')]: {
    textAlign: 'left',
    fontSize: 16,
    minWidth: '70%',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    minWidth: 'fit-content',
  },
}));

const Left = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  minWidth: 40,
  width: '100%',
  display: 'flex',
  justifyItems: 'center',
  alignItems: 'center',
  position: 'relative',

  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '50%',
    width: '100%',
    height: 1,
    background: isLight ? '#B6EDE7' : '#027265',
  },

  '& svg': {
    width: 32,
    height: 32,
    zIndex: 1,

    [lightTheme.breakpoints.up('table_834')]: {
      width: 48,
      height: 48,
    },
  },
}));

const Right = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  minWidth: 32,
  width: '100%',
  position: 'relative',

  '&::after': {
    content: '""',
    position: 'absolute',
    right: 0,
    top: '50%',
    width: '100%',
    height: 1,
    background: isLight ? '#B6EDE7' : '#027265',
  },
}));

const Circle = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  width: 16,
  height: 16,
  background: isLight ? '#B6EDE7' : '#027265',
  borderRadius: '50%',
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
}));

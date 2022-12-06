import React from 'react';
import styled from '@emotion/styled';
import NoteChecked from '../../../components/svg/note-checked';

const CUNewExpenseReport: React.FC = () => {
  return (
    <Container>
      <Left>
        <NoteChecked />
      </Left>
      <Text>Core Unit SES has published a new expense report for September 2022 on 29-SEP-2022 14:33 UTC</Text>
      <Right>
        <Circle />
      </Right>
    </Container>
  );
};

export default CUNewExpenseReport;

const Container = styled.div({
  position: 'relative',
  marginBottom: 32,
  display: 'flex',
  width: '100%',
});

const Text = styled.div({
  width: 'fit-content',
  minWidth: 'fit-content',
  padding: '0 16px',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
});

const Left = styled.div({
  minWidth: 48,
  width: '100%',
  display: 'flex',
  justifyItems: 'center',
  position: 'relative',

  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '50%',
    width: '100%',
    height: 1,
    background: '#B6EDE7',
  },

  '& svg': {
    width: 48,
    height: 48,
    zIndex: 1,
  },
});

const Right = styled.div({
  minWidth: 48,
  width: '100%',
  position: 'relative',

  '&::after': {
    content: '""',
    position: 'absolute',
    right: 0,
    top: '50%',
    width: '100%',
    height: 1,
    background: '#B6EDE7',
  },
});

const Circle = styled.div({
  width: 16,
  height: 16,
  background: '#B6EDE7',
  borderRadius: '50%',
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
});

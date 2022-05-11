import * as React from 'react';
import Typography from '@mui/material/Typography';
import ArrowRight from '../svg/ArrowRight';
import ArrowLeft from '../svg/ArrowLeft';
import styled from '@emotion/styled';

interface Props {
  count: number;
  page: number;
  onClickRight?: () => void;
  onClickLeft?: () => void;

}

const InsidePagination = ({ page, count, onClickLeft, onClickRight }: Props) => {
  return (
    <Container>
      <PaginationLabel>
        <Typography color='#000000' fontSize={12}>{`${page}`}</Typography>
        <Typography color='#C4C4B' fontSize={12}>{` of ${count} Core Units`} </Typography>
      </PaginationLabel>
      <Arrows>
        <ArrowLeft onClick={onClickLeft} /><ArrowRight onClick={onClickRight} />
      </Arrows>
    </Container>
  );
};

const Container = styled.div({
  height: '23px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

const PaginationLabel = styled.div({
  height: '23px',
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  backgroundColor: '#C4C4C4',
  borderRadius: '8px',
  padding: '4px 8px',
  alignItems: 'center',
  whiteSpace: 'break-spaces',
});
const Arrows = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
  marginLeft: '8px',
});

export default InsidePagination;

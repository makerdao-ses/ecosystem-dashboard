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
        <StyleActualCoreUnit >{`${page}`}</StyleActualCoreUnit>
        <StyleTextCoreUnit>{` of ${count} Core Units`} </StyleTextCoreUnit>
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

const StyleActualCoreUnit = styled(Typography)({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.4px',
  color: '#231536',
});

const StyleTextCoreUnit = styled(Typography)({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.4px',
  color: '#626472',
});

export default InsidePagination;

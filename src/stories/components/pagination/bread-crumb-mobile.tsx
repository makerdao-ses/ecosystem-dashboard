import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';
import ArrowLeft from '../svg/ArrowLeft';
import ArrowRight from '../svg/ArrowRight';
import { BreadcrumbSeparator } from '../svg/breadcrumb-separator';
import ThereDots from '../svg/there-dots';

interface Props {
  title: string;
  count?: number;
  page?: number;
  onClickRight?: () => void;
  onClickLeft?: () => void;
}

const BreadCrumbMobile = ({ title, count = 0, page = 0, onClickLeft, onClickRight }: Props) => {
  return (
    <Container>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <ThereDots style={{ marginRight: '8px' }} />
        <BreadcrumbSeparator style={{ marginRight: '4px' }} width={5} height={10} fill='#D1DEE6'/>
        <Typography>{title}</Typography>
      </div>
      <Arrows>
      <PaginationLabel>
        <StyleActualCoreUnit >{`${page}`}</StyleActualCoreUnit>
        <StyleTextCoreUnit>{` of ${count}`} </StyleTextCoreUnit>
      </PaginationLabel>
        <ArrowLeft onClick={onClickLeft} /><ArrowRight onClick={onClickRight} />
      </Arrows>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '32px',
  padding: '8px',
  background: '#ECF1F3',
  borderRadius: '6px',
});
const Arrows = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
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
export default BreadCrumbMobile;

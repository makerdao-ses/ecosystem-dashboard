import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';
import ArrowMobileLeft from '../svg/ArrowMobileLeft';
import ArrowMobileRight from '../svg/ArrowMobileRight';
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
        <BreadcrumbSeparator style={{ marginRight: '4px' }} width={5} height={10} fill='#D1DEE6' />
        <StyleTitle>{title}</StyleTitle>
      </div>
      <RightPart>
        <PaginationLabel>
          <StyleActualCoreUnit >{`${page}`}</StyleActualCoreUnit>
          <StyleTextCoreUnit>{` of ${count}`} </StyleTextCoreUnit>
        </PaginationLabel>
        <Arrows>
          <ArrowMobileLeft onClick={onClickLeft} width={6} height={10} style={{
            marginRight: '15px'
          }}/>
          <ArrowMobileRight onClick={onClickRight} width={5} height={10} /></Arrows>
      </RightPart>
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
const RightPart = styled.div({
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
  marginRight: '7px',
  alignItems: 'center',
  whiteSpace: 'break-spaces',
});

const Arrows = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const StyleActualCoreUnit = styled(Typography)({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '12px',
  lineHeight: '24px',
  letterSpacing: 'none',
  color: '#231536',
});

const StyleTextCoreUnit = styled(Typography)({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '24px',
  color: '#626472',
});

const StyleTitle = styled(Typography)({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '14px',
  textAlign: 'center',
  color: '#231536'
});
export default BreadCrumbMobile;

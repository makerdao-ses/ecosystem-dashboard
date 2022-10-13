import * as React from 'react';
import Typography from '@mui/material/Typography';
import ArrowRight from '../svg/ArrowRight';
import ArrowLeft from '../svg/ArrowLeft';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface Props {
  count: number;
  page: number;
  onClickRight?: () => void;
  onClickLeft?: () => void;
}

const InsidePagination = ({ page, count, onClickLeft, onClickRight }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <Container>
      <PaginationLabel>
        <StyleActualCoreUnit isLight={isLight}>{`${page}`}</StyleActualCoreUnit>
        <StyleTextCoreUnit isLight={isLight}>{` of ${count} Core Units`} </StyleTextCoreUnit>
      </PaginationLabel>
      <Arrows>
        <ArrowLeft onClick={onClickLeft} fill={page !== 1 ? undefined : '#d1dee6'} disabled={page === 1} />
        <ArrowRight onClick={onClickRight} fill={page !== count ? undefined : '#d1dee6'} disabled={page === count} />
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
  gap: '16px',
});

const StyleActualCoreUnit = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{
  isLight: boolean;
}>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#D2D4EF',
}));

const StyleTextCoreUnit = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: '0.4px',
    color: isLight ? '#626472' : '#ADAFD4',
  })
);

export default InsidePagination;

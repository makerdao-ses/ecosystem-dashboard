import { Typography, styled } from '@mui/material';
import React from 'react';
import ArrowMobileLeft from '../svg/ArrowMobileLeft';
import ArrowMobileRight from '../svg/ArrowMobileRight';
import BreadCrumbWithIcons from './BreadCrumbWithIcons';

interface Props {
  title: string;
  count?: number;
  page?: number;
  onClickRight?: () => void;
  onClickLeft?: () => void;
  items: {
    label: string | JSX.Element;
    url: string;
    style?: React.CSSProperties;
  }[];
  className?: string;
  marginRightSeparator?: string;
  arrowWidth?: number;
  arrowHeight?: number;
}

const BreadcrumbMobile = ({
  title,
  count = 0,
  page = 0,
  onClickLeft,
  onClickRight,
  items = [],
  className,
  arrowHeight,
  arrowWidth,
}: Props) => (
  <Container className={className}>
    <BreadCrumbWithIcons items={items} title={title} />

    <RightPart>
      <PaginationLabel>
        <StyleActualCoreUnit>{`${page}`}</StyleActualCoreUnit>
        <StyleTextCoreUnit>{`of ${count}`} </StyleTextCoreUnit>
      </PaginationLabel>
      <Arrows>
        <ContainerArrowClick onClick={onClickLeft} width={arrowWidth} height={arrowHeight}>
          <ArrowMobileLeft width={6} height={10} fill={page !== 1 ? undefined : '#d1dee6'} disabled={page === 1} />
        </ContainerArrowClick>
        <ContainerArrowClick onClick={onClickRight} width={arrowWidth} height={arrowHeight}>
          <ArrowMobileRight
            width={5}
            height={10}
            fill={page !== count ? undefined : '#d1dee6'}
            disabled={page === count}
          />
        </ContainerArrowClick>
      </Arrows>
    </RightPart>
  </Container>
);

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '32px',
  padding: '8px',
  background: theme.palette.isLight ? '#ECF1F3' : '#000A13',
  borderRadius: '6px',
}));
const RightPart = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
  alignItems: 'center',
});

const PaginationLabel = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  borderRadius: '8px',
  marginRight: '7px',
  alignItems: 'center',
  width: 40,
});

const Arrows = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: '11px',
  alignItems: 'center',
});

const StyleActualCoreUnit = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '10px',
  lineHeight: '20px',
  letterSpacing: 'none',
  marginRight: 2,
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
}));

const StyleTextCoreUnit = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '10px',
  lineHeight: '20px',
  color: theme.palette.isLight ? '#626472' : '#546978',
}));

const ContainerArrowClick = styled('div')<{ width?: number; height?: number }>(({ height = 20, width = 20 }) => ({
  width,
  height,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default BreadcrumbMobile;

import { styled } from '@mui/material';
import CircleLegendChart from '@ses/components/svg/CircleLegendChart';
import React from 'react';

interface Props {
  className?: string;
  title: string;
  color: string;
  isSvg?: boolean;
}

const LegendItemChart: React.FC<Props> = ({ className, isSvg = true, title, color }) => (
  <Container className={className}>
    <ContainerIcon isSvg={isSvg} color={color}>
      {isSvg ? <CircleLegendChart fill={color} /> : <Circle color={color} />}
    </ContainerIcon>
    <Title>{title}</Title>
  </Container>
);

export default LegendItemChart;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
  [theme.breakpoints.up('tablet_768')]: {
    gap: 8,
  },
}));
const ContainerIcon = styled('div')<{ isSvg: boolean }>(({ isSvg, theme }) => ({
  display: 'flex',
  width: isSvg ? 12 : 8,
  height: isSvg ? 12 : 8,

  [theme.breakpoints.up('tablet_768')]: {
    width: 12,
    height: 12,
  },
}));

const Circle = styled('div')<{ color: string }>(({ color, theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: color,
  [theme.breakpoints.up('tablet_768')]: {
    width: 12,
    height: 12,
  },
}));

const Title = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '22px',
  },
}));

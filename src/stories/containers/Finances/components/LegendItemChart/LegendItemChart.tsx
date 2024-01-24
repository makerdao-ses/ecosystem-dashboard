import styled from '@emotion/styled';
import CircleLegendChart from '@ses/components/svg/CircleLegendChart';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  className?: string;
  title: string;
  color: string;
  isSvg?: boolean;
}

const LegendItemChart: React.FC<Props> = ({ className, isSvg = true, title, color }) => {
  const { isLight } = useThemeContext();
  return (
    <Container className={className}>
      <ContainerIcon isSvg={isSvg} color={color}>
        {isSvg ? <CircleLegendChart fill={color} /> : <Circle color={color} />}
      </ContainerIcon>

      <Title isLight={isLight}>{title}</Title>
    </Container>
  );
};

export default LegendItemChart;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 8,
  },
});
const ContainerIcon = styled('div')<{ isSvg?: boolean }>(({ isSvg }) => ({
  display: 'flex',
  width: isSvg ? 12 : 8,
  height: isSvg ? 12 : 8,

  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 12,
    height: 12,
  },
}));

const Circle = styled('div')<{ color: string }>(({ color }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: color,
  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 12,
    height: 12,
  },
}));

const Title = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  color: isLight ? '#231536' : '#D2D4EF',
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '22px',
  },
}));

import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React from 'react';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface Props {
  title: string;
  children: (string | JSX.Element)[];
  height: string;
  width?: string;
  fontSize?: string;
  lineHeight?: string;
  fontWeight?: number;
  letterSpacing?: string;
  color?: string;
}

const InformationCard = ({
  title,
  children,
  height,
  fontSize = '20px',
  lineHeight = '24px',
  fontWeight = 500,
  letterSpacing = '0.4px',
  color = '#231536',
  width = '405px',
}: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <>
      <Typography
        sx={{
          marginBottom: '16px',
          fontFamily: 'Inter,sans-serif',
          fontStyle: 'normal',
          fontWeight,
          fontSize,
          lineHeight,
          letterSpacing,
          color,
        }}
      >
        {title}
      </Typography>
      <Container height={height} width={width} isLight={isLight}>
        {children}
      </Container>
    </>
  );
};
export default InformationCard;

const Container = styled(Box, { shouldForwardProp: (prop) => prop !== 'isLight' })<{
  width?: string;
  isLight: boolean;
}>(({ width, isLight }) => ({
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderRadius: '6px',
  padding: '16px 16px 24px 16px',
  width: width || '405px',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    width: '100%',
  },
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    width: '100%',
  },
}));

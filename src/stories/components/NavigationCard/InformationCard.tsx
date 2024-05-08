import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React from 'react';
import lightTheme from '../../../../styles/theme/themes';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface Props {
  title: string;
  children: (string | JSX.Element)[];
  width?: string;
  fontSize?: string;
  lineHeight?: string;
  fontWeight?: number;
  letterSpacing?: string;
  color?: string;
  padding?: string;
  isTitlePresent?: boolean;
  style?: React.CSSProperties;
  styleContainer?: React.CSSProperties;
  className?: string;
}

const InformationCard = ({
  title,
  children,
  fontSize = '20px',
  lineHeight = '24px',
  fontWeight = 500,
  letterSpacing = '0.4px',
  color = '#231536',
  padding,
  isTitlePresent = true,
  style = {},
  styleContainer,
  className,
}: Props) => {
  const { isLight } = useThemeContext();
  return (
    <div style={style} className={className}>
      {isTitlePresent && (
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
      )}
      <Container padding={padding} isLight={isLight} style={styleContainer}>
        {children}
      </Container>
    </div>
  );
};
export default InformationCard;

const Container = styled(Box, { shouldForwardProp: (prop) => prop !== 'isLight' })<{
  width?: string;
  isLight: boolean;
}>(({ isLight }) => ({
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderRadius: '6px',
  background: isLight ? '#FFFFFF' : '#10191F',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    width: '100%',
  },
  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
    width: '100%',
  },
}));

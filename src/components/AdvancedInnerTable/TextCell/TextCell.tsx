import { styled } from '@mui/material';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import type { CSSProperties, FC } from 'react';

export interface TableCellProps {
  negative?: boolean;
  children?: string | JSX.Element | JSX.Element[];
  style?: CSSProperties;
  responsivePadding?: string;
  bold?: boolean;
  isHeader?: boolean;
  className?: string;
  isSection?: boolean;
}

export const TextCell: FC<TableCellProps> = ({
  responsivePadding = '10px 16px',
  bold,
  className,
  isHeader,
  isSection,
  negative,
  style,
  children,
}) => {
  const { isLight } = useThemeContext();
  return (
    <Container
      isSection={isSection}
      className={className}
      bold={!!bold}
      isLight={isLight}
      style={style}
      negative={negative}
      responsivePadding={responsivePadding}
      isHeader={isHeader}
    >
      {children}
    </Container>
  );
};

const Container = styled('div')<{
  bold: boolean;
  negative?: boolean;
  fontFamily?: string;
  responsivePadding?: string;
  isLight: boolean;
  isHeader?: boolean;
  isSection?: boolean;
}>(({ bold, isHeader, theme, isSection = false }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  lineHeight: isHeader ? (bold ? '19px' : '18px') : '15px',
  display: 'flex',
  alignItems: 'center',
  padding: isHeader ? 16 : '0px 0',
  textAlign: isHeader ? 'left' : 'right',
  fontSize: isHeader ? '16px' : '14px',
  paddingLeft: 24,
  color: theme.palette.isLight
    ? isSection
      ? '#9da0a1'
      : theme.palette.colors.gray[900]
    : isSection
    ? '#5b646d'
    : theme.palette.colors.gray[50],

  '> b': {
    fontWeight: 700,
  },

  [theme.breakpoints.up('tablet_768')]: {
    lineHeight: '19px',
    fontSize: '16px',
    textAlign: 'left',
    paddingLeft: 16,
    padding: isHeader ? 16 : '8px 0',
    fontWeight: isHeader ? (bold ? 600 : 400) : 400,
  },
}));

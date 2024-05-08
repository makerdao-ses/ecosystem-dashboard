import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import BasicCell from './BasicCell';
import type { GenericCell } from '../../types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface TextCellProps {
  cell: GenericCell;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const TextCell: React.FC<TextCellProps> = ({ cell, className, as }) => {
  const { isLight } = useThemeContext();

  return <Cell className={className} as={as ?? (cell.isHeader ? 'th' : 'td')} isLight={isLight} cell={cell} />;
};

export default TextCell;

const Cell = styled(BasicCell)<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  lineHeight: '17px',
  color: isLight ? '#231536' : '#FFFFFF',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
    lineHeight: '22px',
  },
}));

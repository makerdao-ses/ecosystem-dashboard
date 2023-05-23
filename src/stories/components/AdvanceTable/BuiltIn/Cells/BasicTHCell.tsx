import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import BasicCell from './BasicCell';
import type { GenericCell } from '../../types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface BasicTHCellProps {
  cell: GenericCell;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const BasicTHCell: React.FC<BasicTHCellProps> = ({ cell, className, as = 'th' }) => {
  const { isLight } = useThemeContext();

  return <TH className={className} as={as} isLight={isLight} cell={cell} />;
};

export default BasicTHCell;

const TH = styled(BasicCell)<WithIsLight>(({ isLight }) => ({
  textTransform: 'uppercase',
  letterSpacing: 1,
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '15px',
  color: isLight ? '#708390' : '#FFFFFF',
}));

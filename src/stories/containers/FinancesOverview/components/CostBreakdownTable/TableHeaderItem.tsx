import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface TableHeaderItemProps extends React.PropsWithChildren {
  className?: string;
}

const TableHeaderItem: React.FC<TableHeaderItemProps> = ({ children, className }) => {
  const { isLight } = useThemeContext();

  return (
    <Content isLight={isLight} className={className}>
      {children}
    </Content>
  );
};

export default TableHeaderItem;

const Content = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#708390' : 'blue',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  fontSize: 12,
  fontWeight: 600,
  lineHeight: '15px',
}));

import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface TableHeaderItemProps extends React.PropsWithChildren {
  width?: number | string;
  align?: 'left' | 'right';
}

const TableHeaderItem: React.FC<TableHeaderItemProps> = ({ children, width, align }) => {
  const { isLight } = useThemeContext();

  return (
    <Content isLight={isLight} width={width} align={align}>
      {children}
    </Content>
  );
};

export default TableHeaderItem;

const Content = styled.div<WithIsLight & { width?: number | string; align?: 'left' | 'right' }>(
  ({ isLight, width = 'auto', align = 'left' }) => ({
    color: isLight ? '#708390' : 'blue',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    lineHeight: '15px',
    textAlign: align,
    ...(typeof width === 'number'
      ? {
          width,
          minWidth: width,
        }
      : { width }),
  })
);

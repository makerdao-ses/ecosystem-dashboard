import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import DefaultCell from './BuiltIn/Cells/DefaultCell';
import DefaultTBody from './BuiltIn/DefaultTBody';
import DefaultTHead from './BuiltIn/DefaultTHead';
import DefaultTR from './BuiltIn/DefaultTR';
import type { TableProps } from './types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const AdvanceTable: React.FC<TableProps> = ({
  className,
  header,
  body,
  headerRender = DefaultTHead,
  bodyRender = DefaultTBody,
}) => {
  const { isLight } = useThemeContext();
  const THead = headerRender;
  const TBody = bodyRender;

  return (
    <Table isLight={isLight} className={className}>
      {header && (
        <THead header={header}>
          {header.map((row, rowIndex) => (
            <DefaultTR {...row} key={`head-${rowIndex}`}>
              {row.cells.map((cell, colIndex) => (
                <DefaultCell
                  key={`head-${rowIndex}-${colIndex}`}
                  cell={{
                    ...cell,
                    isHeader: cell.isHeader ?? true,
                    cellPadding: cell.cellPadding ?? row.cellPadding,
                    defaultRenderer: cell.defaultRenderer ?? row.cellDefaultRenderer ?? 'basicHeader',
                    rowIndex,
                    colIndex,
                  }}
                />
              ))}
            </DefaultTR>
          ))}
        </THead>
      )}

      {body && (
        <TBody body={body}>
          {body.map((row, rowIndex) => (
            <DefaultTR {...row} key={`body-${rowIndex}`}>
              {row.cells.map((cell, colIndex) => (
                <DefaultCell
                  key={`body-${rowIndex}-${colIndex}`}
                  cell={{
                    ...cell,
                    cellPadding: cell.cellPadding ?? row.cellPadding,
                    defaultRenderer: cell.defaultRenderer ?? row.cellDefaultRenderer ?? 'text',
                    rowIndex,
                    colIndex,
                  }}
                />
              ))}
            </DefaultTR>
          ))}
        </TBody>
      )}
    </Table>
  );
};

export default AdvanceTable;

const Table = styled.table<WithIsLight>(({ isLight }) => ({
  borderCollapse: 'collapse',
  flex: '1',
  width: '100%',
  background: isLight ? '#FFFFFF' : '#1E1E1E',
  boxShadow: isLight
    ? '0px 20px 40px -40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
  borderRadius: 6,
}));

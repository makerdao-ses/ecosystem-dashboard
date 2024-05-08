import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import DefaultCard from './BuiltIn/Cards/DefaultCard';
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
  toCardsOnMobile = true,
}) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const showCards = isMobile && toCardsOnMobile;
  const THead = headerRender;
  const TBody = bodyRender;

  return showCards ? (
    <div>
      {body?.map((row, rowIndex) => {
        let extendedRow = row;
        if (
          row?.rowToCardConfig?.type === 'groupTitle' &&
          rowIndex + 1 < body?.length &&
          body[rowIndex + 1].rowToCardConfig?.type === 'title'
        ) {
          extendedRow = {
            ...body[rowIndex + 1],
            extraProps: {
              ...((body[rowIndex + 1]?.extraProps as object) ?? {}),
              groupTitle: row.cells[0].value as string,
            },
          };
        } else if (
          row.rowToCardConfig?.type === 'title' &&
          rowIndex > 0 &&
          body[rowIndex - 1].rowToCardConfig?.type === 'groupTitle'
        ) {
          // the title was included in the previous group title
          return null;
        }

        // add the colIndex and rowIndex
        extendedRow = {
          ...extendedRow,
          cells: [
            ...extendedRow.cells.map((cell, colIndex) => ({
              ...cell,
              rowIndex,
              colIndex,
            })),
          ],
        };

        return <DefaultCard cardProps={extendedRow.rowToCardConfig} row={extendedRow} key={`card-${rowIndex}`} />;
      })}
    </div>
  ) : (
    <TableWrapper isLight={isLight}>
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
                      extraProps: {
                        ...((row.extraProps as object) ?? {}),
                        ...((cell.extraProps as object) ?? {}),
                      },
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
                      extraProps: {
                        ...((row.extraProps as object) ?? {}),
                        ...((cell.extraProps as object) ?? {}),
                      },
                    }}
                  />
                ))}
              </DefaultTR>
            ))}
          </TBody>
        )}
      </Table>
    </TableWrapper>
  );
};

export default AdvanceTable;

const TableWrapper = styled.div<WithIsLight>(({ isLight }) => ({
  overflowX: 'auto',
  boxShadow: isLight
    ? '0px 20px 40px -40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
  borderRadius: 6,
}));

const Table = styled.table<WithIsLight>(({ isLight }) => ({
  borderCollapse: 'collapse',
  flex: '1',
  width: '100%',
  background: isLight ? '#FFFFFF' : '#10191F',
  borderRadius: 6,
}));

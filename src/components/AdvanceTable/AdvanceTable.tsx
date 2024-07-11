import { styled, useMediaQuery } from '@mui/material';
import DefaultCard from './BuiltIn/Cards/DefaultCard';
import DefaultCell from './BuiltIn/Cells/DefaultCell';
import DefaultTBody from './BuiltIn/DefaultTBody';
import DefaultTHead from './BuiltIn/DefaultTHead';
import DefaultTR from './BuiltIn/DefaultTR';
import type { TableProps } from './types';
import type { Theme } from '@mui/material';

const AdvanceTable: React.FC<TableProps> = ({
  className,
  header,
  body,
  headerRender = DefaultTHead,
  bodyRender = DefaultTBody,
  toCardsOnMobile = true,
}) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
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
    <TableWrapper>
      <Table className={className}>
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

const TableWrapper = styled('div')(({ theme }) => ({
  overflowX: 'auto',
  boxShadow: theme.palette.isLight ? theme.fusionShadows.modules : theme.fusionShadows.darkMode,
  borderRadius: 12,
}));

const Table = styled('table')(({ theme }) => ({
  borderCollapse: 'collapse',
  flex: '1',
  width: '100%',
  background: theme.palette.isLight ? '#FFFFFF' : theme.palette.colors.charcoal[900],
  borderRadius: 6,
}));

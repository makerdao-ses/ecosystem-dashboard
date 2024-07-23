import React from 'react';
import ItemCoreUnit from '../ItemCoreUnit/ItemCoreUnit';
import type { CustomTableColumn, CustomTableRow } from '../CustomTable2';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';

interface Props {
  rows?: CustomTableRow[];
  columns: CustomTableColumn[];
  queryStrings?: string;
}

const ListCoreUnit = ({ rows, columns, queryStrings }: Props) => (
  <>
    {rows?.map((row, i) => (
      <ItemCoreUnit
        key={`row-${row?.key ?? i}`}
        columns={columns}
        queryStrings={queryStrings}
        cu={row?.value as CoreUnit}
      />
    ))}
  </>
);

export default ListCoreUnit;

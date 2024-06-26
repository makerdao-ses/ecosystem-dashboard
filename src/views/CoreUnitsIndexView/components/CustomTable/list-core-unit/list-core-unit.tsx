import React from 'react';
import ItemCoreUnit from '../ItemCoreUnit/ItemCoreUnit';
import type { CustomTableColumn, CustomTableRow } from '../CustomTable2';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';

interface Props {
  rows?: CustomTableRow[];
  isLoading?: boolean;
  columns: CustomTableColumn[];
  queryStrings?: string;
}

const ListCoreUnit = ({ rows, isLoading, columns, queryStrings }: Props) => (
  <>
    {rows?.map((row, i) => (
      <ItemCoreUnit
        key={`row-${row?.key ?? i}`}
        isLoading={isLoading}
        columns={columns}
        queryStrings={queryStrings}
        cu={row?.value as CoreUnit}
      />
    ))}
  </>
);

export default ListCoreUnit;

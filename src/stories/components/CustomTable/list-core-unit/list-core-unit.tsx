import React from 'react';
import ItemCoreUnit from '../ItemCoreUnit/ItemCoreUnit';
import type { CustomTableColumn, CustomTableRow } from '../CustomTable2';
import type { CoreUnitDto } from '@ses/core/models/dto/coreUnitDTO';

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
        cu={row?.value as CoreUnitDto}
      />
    ))}
  </>
);

export default ListCoreUnit;

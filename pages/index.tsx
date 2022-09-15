import { NextPage } from 'next';
import React from 'react';
import { useFlagsActive } from '../src/core/hooks/useFlagsActive';
import { CuTable } from '../src/stories/containers/cu-table/cu-table';
import { CuTable2 } from '../src/stories/containers/cu-table/cu-table-2';

const CuTablePage: NextPage = () => {
  const [isEnabled] = useFlagsActive();

  return isEnabled('FEATURE_CU_INDEX_NEW_TABLE') ? <CuTable2 /> : <CuTable />;
};

export default CuTablePage;

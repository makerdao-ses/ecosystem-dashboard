import { CuTable } from '@ses/containers/cu-table/cu-table';
import { CuTable2 } from '@ses/containers/cu-table/cu-table-2';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import React from 'react';
import type { NextPage } from 'next';

const CuTablePage: NextPage = () => {
  const [isEnabled] = useFlagsActive();

  return isEnabled('FEATURE_CU_INDEX_NEW_TABLE') ? <CuTable2 /> : <CuTable />;
};
export async function getServerSideProps() {
  return { props: {} };
}

export default CuTablePage;

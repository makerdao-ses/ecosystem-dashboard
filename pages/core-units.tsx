import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { CuTable } from '@ses/containers/cu-table/cu-table';
import { CuTable2 } from '@ses/containers/cu-table/cu-table-2';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import React from 'react';
import { featureFlags } from '../feature-flags/feature-flags';
import type { NextPage } from 'next';

const CuTablePage: NextPage = () => {
  const [isEnabled] = useFlagsActive();

  return isEnabled('FEATURE_CU_INDEX_NEW_TABLE') ? <CuTable2 /> : <CuTable />;
};
export async function getServerSideProps() {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_FINANCES_OVERVIEW) {
    // this would be the home page instead of the finance overview
    return { notFound: true };
  }

  return { props: {} };
}

export default CuTablePage;

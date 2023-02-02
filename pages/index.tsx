import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { CuTable2 } from '@ses/containers/cu-table/cu-table-2';
import React from 'react';
import { featureFlags } from '../feature-flags/feature-flags';
import type { NextPage } from 'next';

const FinanceOverviewPage: NextPage = () => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_FINANCES_OVERVIEW) {
    // core unit overview would be the home page if the finances overview is disabled
    return <CuTable2 />;
  }

  return <div style={{ marginTop: 70 }}>Finance Overview Page</div>;
};

export default FinanceOverviewPage;

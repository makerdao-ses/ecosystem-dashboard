import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';

import { CuTable } from '@ses/containers/CUTable/CuTable';

import React from 'react';
import { featureFlags } from '../feature-flags/feature-flags';

import type { NextPage } from 'next';

const CuTablePage: NextPage = () => <CuTable />;

export async function getServerSideProps() {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_FINANCES_OVERVIEW) {
    // this would be the home page instead of the finance overview
    return { notFound: true };
  }

  return { props: {} };
}

export default CuTablePage;

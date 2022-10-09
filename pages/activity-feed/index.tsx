/* eslint-disable spellcheck/spell-checker */
import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { CoreUnitDto } from '../../src/core/models/dto/core-unit.dto';
import GlobalActivity from '../../src/stories/containers/global-activity/global-activity';
import { fetchCoreUnitsWithActivities } from '../../src/stories/containers/global-activity/global-activity.api';

const GlobalActivityPage: NextPage<{ coreUnits: CoreUnitDto[] }> = ({ coreUnits }) => {
  return <GlobalActivity coreUnits={coreUnits} />;
};

export default GlobalActivityPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const coreUnits = await fetchCoreUnitsWithActivities();

  return {
    props: {
      coreUnits,
    },
  };
};

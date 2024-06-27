import React from 'react';
import CUActivityFeedContainer from '@/stories/containers/CUActivity/CUActivityFeedContainer';
import { fetchCoreUnitActivityFeedData } from '@/stories/containers/CUActivity/cuActivityAPI';
import { fetchCoreUnits } from '@/views/CoreUnitsIndex/cuTableAPI';
import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';
import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';

interface CUActivityProps {
  coreUnits: CoreUnit[];
  coreUnit: CoreUnit;
  activities: ChangeTrackingEvent[];
}

const CoreUnitActivityPage: NextPage<CUActivityProps> = ({ coreUnit, coreUnits, activities }) => (
  <CUActivityFeedContainer coreUnit={coreUnit} coreUnits={coreUnits} activities={activities} />
);

export default CoreUnitActivityPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const code = query.code as string;

  const coreUnits = await fetchCoreUnits();
  const coreUnitFiltered = coreUnits.filter((cu) => cu.shortCode === code);
  if (coreUnitFiltered.length === 0 || code === 'DEL') {
    return {
      notFound: true,
    };
  }

  const coreUnitId = coreUnitFiltered[0].id;
  const activities = await fetchCoreUnitActivityFeedData(coreUnitId);

  return {
    props: {
      coreUnits,
      coreUnit: coreUnitFiltered[0],
      activities,
    },
  };
};

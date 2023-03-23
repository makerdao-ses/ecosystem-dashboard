import React from 'react';
import { fetchCoreUnits } from '../../../src/stories/components/CoreUnitSummary/CoreUnitSummaryApi';
import CUActivityContainer from '../../../src/stories/containers/CUActivity/CUActivityFeedContainer';
import { fetchCoreUnitActivityFeedData } from '../../../src/stories/containers/CUActivity/cuActivityAPI';
import type { ActivityFeedDto, CoreUnitDto } from '../../../src/core/models/dto/coreUnitDTO';
import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';

interface CUActivityProps {
  coreUnits: CoreUnitDto[];
  coreUnit: CoreUnitDto;
  activities: ActivityFeedDto[];
}

const CoreUnitActivityPage: NextPage<CUActivityProps> = ({ coreUnit, coreUnits, activities }) => (
  <CUActivityContainer coreUnit={coreUnit} coreUnits={coreUnits} activities={activities} />
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

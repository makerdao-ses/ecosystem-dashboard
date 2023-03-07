import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { fetchCoreUnits } from '../../../src/stories/components/CoreUnitSummary/CoreUnitSummaryApi';
import CUActivityContainer from '../../../src/stories/containers/cu-activity/cu-activity';
import { fetchCoreUnitWithActivitiesByCode } from '../../../src/stories/containers/cu-activity/cu-activity.api';
import type { ActivityFeedDto, CoreUnitDto } from '../../../src/core/models/dto/core-unit.dto';
import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';

interface CUActivityProps {
  coreUnits: CoreUnitDto[];
  coreUnit: CoreUnitDto;
  activity: ActivityFeedDto[];
}

const CoreUnitActivityPage: NextPage<CUActivityProps> = ({ coreUnit, coreUnits }) => (
  <CUActivityContainer coreUnit={coreUnit} coreUnits={coreUnits} />
);

export default CoreUnitActivityPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const code = query.code as string;

  const [coreUnit, coreUnits] = await Promise.all([fetchCoreUnitWithActivitiesByCode(code), fetchCoreUnits()]);

  if (isEmpty(coreUnit)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      coreUnits,
      coreUnit,
    },
  };
};

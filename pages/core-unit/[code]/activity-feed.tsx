/* eslint-disable spellcheck/spell-checker */
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import CUActivityContainer from '../../../src/stories/containers/cu-activity/cu-activity';
import { fetchCoreUnits } from '../../../src/stories/components/core-unit-summary/core-unit-summary.mvvm';
import { ActivityFeedDto, CoreUnitDto } from '../../../src/core/models/dto/core-unit.dto';
import { fetchCoreUnitWithActivitiesByCode } from '../../../src/stories/containers/cu-activity/cu-activity.api';

interface CUActivityProps {
  coreUnits: CoreUnitDto[];
  coreUnit: CoreUnitDto;
  activity: ActivityFeedDto[];
}

const CoreUnitActivityPage: NextPage<CUActivityProps> = ({ coreUnit, coreUnits }) => {
  return <CUActivityContainer coreUnit={coreUnit} coreUnits={coreUnits} />;
};

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

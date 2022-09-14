import { NextPage, GetServerSideProps, InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import React from 'react';
import _ from 'lodash';

import CuAboutContainer from '../../../src/stories/containers/cu-about/cu-about-container';
import { fetchCoreUnitByCode } from '../../../src/stories/containers/cu-about/cu-about.api';
import { fetchCoreUnits } from '../../../src/stories/components/core-unit-summary/core-unit-summary.mvvm';
import { CoreUnitDto } from '../../../src/core/models/dto/core-unit.dto';

const CoreUnitAboutPage: NextPage = ({ code, coreUnits, cuAbout, contributors }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <CuAboutContainer code={code} coreUnits={coreUnits} cuAbout={cuAbout as CoreUnitDto} contributors={contributors} />
  );
};
export default CoreUnitAboutPage;
export const getServerSideProps: GetServerSideProps = async(context: GetServerSidePropsContext) => {
  const { query } = context;
  const code = query.code as string;

  const [cuAbout, coreUnits] = await Promise.all([
    fetchCoreUnitByCode(code),
    fetchCoreUnits()
  ]);
  const contributorCommitment = cuAbout?.contributorCommitment;

  if (_.isEmpty(cuAbout)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      code,
      coreUnits,
      cuAbout: cuAbout || {},
      contributors: contributorCommitment || [],
    }
  };
};

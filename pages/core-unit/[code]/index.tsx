import { NextPage, GetServerSideProps, InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import React from 'react';
import _ from 'lodash';

import CuAboutContainer from '../../../src/stories/containers/cu-about/cu-about-container';
import { CuAbout, fetchCoreUnitByCode } from '../../../src/stories/containers/cu-about/cu-about.api';

const CoreUnitAboutPage: NextPage = ({ code, cuAbout, contributors }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <CuAboutContainer code={code} cuAbout={cuAbout as CuAbout} contributors={contributors} />
  );
};
export default CoreUnitAboutPage;
export const getServerSideProps: GetServerSideProps = async(context: GetServerSidePropsContext) => {
  const { query } = context;
  const code = query.code as string;
  const cuAbout = await fetchCoreUnitByCode(code);
  const contributorCommitment = cuAbout.contributorCommitment;

  console.log('cuAbout', cuAbout);
  if (_.isEmpty(cuAbout) && contributorCommitment.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      code,
      cuAbout: cuAbout || {},
      contributors: contributorCommitment || [],
    }
  };
};

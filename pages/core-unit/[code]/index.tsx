import { TeamContext } from '@ses/core/context/TeamContext';
import isEmpty from 'lodash/isEmpty';
import React, { useState, useEffect } from 'react';
import { fetchCoreUnits } from '../../../src/stories/components/CoreUnitSummary/CoreUnitSummaryApi';
import CuAboutContainer from '../../../src/stories/containers/CUAbout/CuAboutContainer';
import { fetchCoreUnitByCode } from '../../../src/stories/containers/CUAbout/cuAboutAPI';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';
import type { Team } from '@ses/core/models/interfaces/team';
import type { NextPage, GetServerSideProps, InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

const CoreUnitAboutPage: NextPage = ({
  code,
  coreUnits,
  cuAbout,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [currentCoreUnit, setCurrentCoreUnit] = useState<CoreUnit>(cuAbout);
  useEffect(() => {
    setCurrentCoreUnit(cuAbout);
  }, [cuAbout]);

  return (
    <TeamContext.Provider
      value={{
        teams: coreUnits as unknown as Team[],
        currentTeam: currentCoreUnit as unknown as Team,
        setCurrentTeam: setCurrentCoreUnit as unknown as (cu: Team) => void,
      }}
    >
      <CuAboutContainer code={code} coreUnits={coreUnits} cuAbout={cuAbout as CoreUnit} />
    </TeamContext.Provider>
  );
};

export default CoreUnitAboutPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const code = query.code as string;

  const [cuAbout, coreUnits] = await Promise.all([fetchCoreUnitByCode(code), fetchCoreUnits()]);

  if (isEmpty(cuAbout) || code === 'DEL') {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      code,
      coreUnits,
      cuAbout,
    },
  };
};

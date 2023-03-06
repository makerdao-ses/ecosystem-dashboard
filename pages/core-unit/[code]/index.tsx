import isEmpty from 'lodash/isEmpty';
import React, { useState, useEffect } from 'react';
import { CoreUnitContext } from '../../../src/core/context/CoreUnitContext';
import { fetchCoreUnits } from '../../../src/stories/components/core-unit-summary/core-unit-summary.api';
import CuAboutContainer from '../../../src/stories/containers/cu-about/cu-about-container';
import { fetchCoreUnitByCode } from '../../../src/stories/containers/cu-about/cu-about.api';
import type { CoreUnitDto } from '../../../src/core/models/dto/core-unit.dto';
import type { NextPage, GetServerSideProps, InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

const CoreUnitAboutPage: NextPage = ({
  code,
  coreUnits,
  cuAbout,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [currentCoreUnit, setCurrentCoreUnit] = useState<CoreUnitDto>(cuAbout);
  useEffect(() => {
    setCurrentCoreUnit(cuAbout);
  }, [cuAbout]);

  return (
    <CoreUnitContext.Provider
      value={{
        currentCoreUnit,
        setCurrentCoreUnit,
        coreUnits,
      }}
    >
      <CuAboutContainer code={code} coreUnits={coreUnits} cuAbout={cuAbout as CoreUnitDto} />
    </CoreUnitContext.Provider>
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

import { NextPage, GetServerSideProps, InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { fetchCoreUnitByCode } from '../../../src/stories/containers/cu-about/cu-about.api';
import { fetchCoreUnits } from '../../../src/stories/components/core-unit-summary/core-unit-summary.mvvm';
import { CoreUnitDto } from '../../../src/core/models/dto/core-unit.dto';
import { useFlagsActive } from '../../../src/core/hooks/useFlagsActive';
import CuAboutContainer2 from '../../../src/stories/containers/cu-about-2/cu-about-container-2';
import CuAboutContainer from '../../../src/stories/containers/cu-about/cu-about-container';
import { CoreUnitContext } from '../../../src/core/context/CoreUnitContext';

const CoreUnitAboutPage: NextPage = ({
  code,
  coreUnits,
  cuAbout,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isEnabled] = useFlagsActive();
  const [currentCoreUnit, setCurrentCoreUnit] = useState<CoreUnitDto>(cuAbout);

  return isEnabled('FEATURE_CU_ABOUT_NEW_CONTAINER') ? (
    <CoreUnitContext.Provider
      value={{
        currentCoreUnit,
        setCurrentCoreUnit,
        coreUnits,
      }}
    >
      <CuAboutContainer2 code={code} coreUnits={coreUnits} cuAbout={cuAbout as CoreUnitDto} />
    </CoreUnitContext.Provider>
  ) : (
    <CuAboutContainer code={code} coreUnits={coreUnits} cuAbout={cuAbout as CoreUnitDto} />
  );
};

export default CoreUnitAboutPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const code = query.code as string;

  const [cuAbout, coreUnits] = await Promise.all([fetchCoreUnitByCode(code), fetchCoreUnits()]);

  if (isEmpty(cuAbout)) {
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

import request from 'graphql-request';
import React, { useState, useEffect } from 'react';
import { GRAPHQL_ENDPOINT } from '../../../../../src/config/endpoints';
import { CoreUnitContext } from '../../../../../src/core/context/CoreUnitContext';
import { fetchCoreUnits } from '../../../../../src/stories/components/CoreUnitSummary/CoreUnitSummaryApi';
import { TransparencyReport } from '../../../../../src/stories/containers/transparency-report/transparency-report';
import { CORE_UNIT_REQUEST } from '../../../../../src/stories/containers/transparency-report/transparency-report.api';
import type { CoreUnitDto } from '../../../../../src/core/models/dto/core-unit.dto';
import type { GetServerSidePropsContext } from 'next';

interface TransparencyProps {
  coreUnits: CoreUnitDto[];
  cu: CoreUnitDto;
}

const Transparency = ({ coreUnits, cu }: TransparencyProps) => {
  const [currentCoreUnit, setCurrentCoreUnit] = useState<CoreUnitDto>(cu);
  useEffect(() => {
    setCurrentCoreUnit(cu);
  }, [cu]);

  return (
    <CoreUnitContext.Provider
      value={{
        currentCoreUnit,
        setCurrentCoreUnit,
        coreUnits,
      }}
    >
      <TransparencyReport coreUnits={coreUnits} coreUnit={currentCoreUnit} />
    </CoreUnitContext.Provider>
  );
};

export default Transparency;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const code = query.code as string;
  const { query: gqlQuery, filter } = CORE_UNIT_REQUEST(code);

  const [data, coreUnits] = await Promise.all([request(GRAPHQL_ENDPOINT, gqlQuery, filter), fetchCoreUnits()]);

  if (data?.coreUnits?.length === 0 || code === 'DEL') {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      coreUnits,
      cu: data.coreUnits[0],
    },
  };
};

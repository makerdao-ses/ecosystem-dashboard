import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { CoreUnitDto } from '../../../../../src/core/models/dto/core-unit.dto';
import { fetchCoreUnits, SummarizedCoreUnit } from '../../../../../src/stories/components/core-unit-summary/core-unit-summary.mvvm';
import { TransparencyReport } from '../../../../../src/stories/containers/transparency-report/transparency-report';
import { useTransparencyReportViewModel } from '../../../../../src/stories/containers/transparency-report/transparency-report.mvvm';

export const getServerSideProps = async(context: GetServerSidePropsContext) => {
  const { query } = context;
  const code = query.code as string;
  const [{ data }, coreUnits] = await Promise.all([
    useTransparencyReportViewModel(code),
    fetchCoreUnits()
  ]);

  if (data?.coreUnit?.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      coreUnits,
      cu: data.coreUnit[0],
    },
  };
};

interface TransparencyProps {
  coreUnits: SummarizedCoreUnit[],
  cu: CoreUnitDto
}

const Transparency = ({ coreUnits, cu }: TransparencyProps) => {
  return <TransparencyReport coreUnits={coreUnits} coreUnit={cu} />;
};

export default Transparency;

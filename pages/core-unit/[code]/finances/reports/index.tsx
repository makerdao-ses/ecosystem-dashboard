import React from 'react';
import { CoreUnitDto } from '../../../../../src/core/models/dto/core-unit.dto';
import { TransparencyReport } from '../../../../../src/stories/containers/transparency-report/transparency-report';
import { useTransparencyReportViewModel } from '../../../../../src/stories/containers/transparency-report/transparency-report.mvvm';

export const getServerSideProps = async() => {
  const { data }: { data: any } = await useTransparencyReportViewModel('SES');

  return {
    props: {
      cu: data && data.coreUnit[0],
    },
  };
};

const Transparency = ({ cu }: { cu: CoreUnitDto }) => {
  return <TransparencyReport cu={cu} />;
};

export default Transparency;

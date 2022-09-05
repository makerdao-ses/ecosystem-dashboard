import React from 'react';
import { SummarizedCoreUnit } from '../../../components/core-unit-summary/core-unit-summary.mvvm';
import CuAboutContainer from '../../../containers/cu-about/cu-about-container';
import { CuAbout } from '../../../containers/cu-about/cu-about.api';
const CuAboutPageTesting = () => {
  return (
    <CuAboutContainer coreUnits={[] as SummarizedCoreUnit[]} cuAbout={{} as CuAbout} code='SES-001' contributors={[]}/>
  );
};

export default CuAboutPageTesting;

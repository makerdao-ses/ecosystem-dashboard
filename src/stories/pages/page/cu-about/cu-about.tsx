import React from 'react';
import CuAboutContainer from '../../../containers/cu-about/cu-about-container';
import { CuAbout } from '../../../containers/cu-about/cu-about.api';
const CuAbout = () => {
  return (
    <CuAboutContainer cuAbout={{} as CuAbout} code='SES-001' contributors={[]}/>);
};

export default CuAbout;

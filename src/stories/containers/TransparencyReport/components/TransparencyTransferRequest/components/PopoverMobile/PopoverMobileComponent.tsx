import PopoverMobile from '@ses/components/PopoverMobile/PopoverMobile';
import Information from '@ses/components/svg/information';
import { ContainerInfoIcon } from '@ses/containers/TransparencyReport/transparencyReportUtils';
import React from 'react';
import PopoverMobileTargetValueContent from './PopoverMobileTargetValueContent';

interface Props {
  description?: string;
  mipNumber?: string;
  link?: string;
  name: string;
  longCode: string;
}

export const PopoverMobileComponent: React.FC<Props> = ({ longCode, name, description, link, mipNumber }) => (
  <PopoverMobile
    elementShowToolTip={
      <PopoverMobileTargetValueContent
        longCode={longCode}
        name={name}
        description={description}
        link={link}
        mipNumber={mipNumber}
      />
    }
    children={
      <ContainerInfoIcon>
        <Information />
      </ContainerInfoIcon>
    }
  />
);

export default PopoverMobileComponent;

import PopoverMobile from '@ses/components/PopoverMobile/PopoverMobile';
import React from 'react';
import PopoverMobileTargetValueContent from './PopoverMobileTargetValueContent';
import type { SxProps } from '@mui/material';
import type { TargetBalanceTooltipInformation } from '@ses/core/utils/typesHelpers';

interface Props {
  toolTipData: Pick<TargetBalanceTooltipInformation, 'description' | 'mipNumber' | 'link'>;
  name: string;
  longCode: string;
  children: JSX.Element | JSX.Element[];
  handleIsOpen?: (isOpen: boolean) => void;
  sxProps: SxProps;
}

export const PopoverMobileComponent: React.FC<Props> = ({
  longCode,
  name,
  toolTipData,
  children,
  handleIsOpen,
  sxProps,
}) => (
  <PopoverMobile
    sxProps={sxProps}
    handleIsOpen={handleIsOpen}
    elementShowToolTip={
      <PopoverMobileTargetValueContent
        toolTipData={{
          description: toolTipData.description,
          link: toolTipData.link,
          mipNumber: toolTipData.mipNumber,
        }}
        longCode={longCode}
        name={name}
      />
    }
    children={children}
  />
);

export default PopoverMobileComponent;

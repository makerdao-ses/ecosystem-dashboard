import React from 'react';
import ArrowPopoverTargetValueContent from './ArrowPopoverTargetValueContent';
import type { TargetBalanceTooltipInformation } from '@ses/core/utils/typesHelpers';
import type { CSSProperties } from 'react';

interface Props {
  name: string;
  longCode: string;
  style?: CSSProperties;
  toolTipData: Pick<TargetBalanceTooltipInformation, 'description' | 'mipNumber' | 'link'>;
}

const ArrowPopoverTargetValueComponent: React.FC<Props> = ({ toolTipData, longCode, name }) => (
  <ArrowPopoverTargetValueContent longCode={longCode} name={name} toolTipData={toolTipData} />
);
export default ArrowPopoverTargetValueComponent;

import React from 'react';
import ArrowPopoverTargetValueContent from './ArrowPopoverTargetValueContent';
import type { TargetBalanceTooltipInformation } from '@ses/core/utils/typesHelpers';
import type { CSSProperties } from 'react';

interface Props {
  name: string;
  style?: CSSProperties;
  toolTipData: Pick<TargetBalanceTooltipInformation, 'description' | 'mipNumber' | 'link'>;
}

const ArrowPopoverTargetValueComponent: React.FC<Props> = ({ toolTipData, name, style }) => (
  <ArrowPopoverTargetValueContent name={name} toolTipData={toolTipData} style={style} />
);
export default ArrowPopoverTargetValueComponent;

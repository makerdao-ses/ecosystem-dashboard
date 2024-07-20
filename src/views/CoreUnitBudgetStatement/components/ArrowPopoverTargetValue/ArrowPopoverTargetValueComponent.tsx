import React from 'react';
import TargetBalanceToolTipContent from './TargetBalanceToolTipContent';
import type { TargetBalanceTooltipInformation } from '@ses/core/utils/typesHelpers';
import type { CSSProperties } from 'react';

interface Props {
  name: string;
  style?: CSSProperties;
  toolTipData: Pick<TargetBalanceTooltipInformation, 'description' | 'mipNumber' | 'link'>;
}

const ArrowPopoverTargetValueComponent: React.FC<Props> = ({ toolTipData, name, style }) => (
  <TargetBalanceToolTipContent name={name} toolTipData={toolTipData} style={style} />
);
export default ArrowPopoverTargetValueComponent;

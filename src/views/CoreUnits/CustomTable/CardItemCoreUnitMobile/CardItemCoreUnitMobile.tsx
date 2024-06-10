import CoreUnitCard from '@ses/components/CoreUnitCard/CoreUnitCard';
import React from 'react';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';

interface Props {
  coreUnit: CoreUnit;
}

const CardItemCoreUnitMobile = ({ coreUnit }: Props) => <CoreUnitCard coreUnit={coreUnit as CoreUnit} />;

export default CardItemCoreUnitMobile;

import CoreUnitCard from '@ses/components/core-unit-card/core-unit-card';
import React from 'react';
import type { CoreUnitDto } from '@ses/core/models/dto/core-unit.dto';

interface Props {
  coreUnit: CoreUnitDto;
  keyForSkeleton?: number;
}

const CardItemCoreUnitMobile = ({ coreUnit, keyForSkeleton }: Props) => {
  if (!coreUnit) {
    return <CoreUnitCard coreUnit={{} as CoreUnitDto} key={`card-placeholder-${keyForSkeleton}`} isLoading />;
  }
  return <CoreUnitCard coreUnit={coreUnit as CoreUnitDto} key={`card-${coreUnit?.code}`} />;
};

export default CardItemCoreUnitMobile;

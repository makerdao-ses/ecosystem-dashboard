import { ResourceType } from '@/core/models/interfaces/types';
import { AllowedOwnerType } from '../types';

export const allowedOwnerTypeToResourceType = (ownerTypeQuery: AllowedOwnerType) => {
  switch (ownerTypeQuery) {
    case AllowedOwnerType.KEEPERS:
      return ResourceType.Keepers;
    case AllowedOwnerType.SPFS:
      return ResourceType.SpecialPurposeFund;
    case AllowedOwnerType.RECOGNIZED_DELEGATES:
      return ResourceType.Delegates;
  }
};

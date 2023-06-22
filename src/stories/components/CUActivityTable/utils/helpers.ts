import type { ActivityFeedDto } from '@ses/core/models/dto/coreUnitDTO';

export const getCorrectCodeFromActivity = (activityParams: ActivityFeedDto) => {
  if ('owner' in activityParams.params) {
    return {
      ...activityParams,
      code: activityParams.params.owner.code,
      shortCode: activityParams.params.owner.shortCode,
      type: activityParams.params.owner.type,
    };
  } else {
    return {
      ...activityParams,
      code: activityParams.params.coreUnit.code,
      shortCode: activityParams.params.coreUnit.shortCode,
    };
  }
};

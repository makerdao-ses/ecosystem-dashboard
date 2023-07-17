import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';

export const getCorrectCodeFromActivity = (activityParams: ChangeTrackingEvent) => {
  if ('owner' in activityParams.params) {
    return {
      ...activityParams,
      code: activityParams.params.owner?.code,
      shortCode: activityParams.params.owner?.shortCode,
      type: activityParams.params.owner?.type,
    };
  } else {
    return {
      ...activityParams,
      code: activityParams.params.coreUnit?.code,
      shortCode: activityParams.params.coreUnit?.shortCode,
    };
  }
};

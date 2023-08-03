import { ResourceType } from '@ses/core/models/interfaces/types';
import isEmpty from 'lodash/isEmpty';
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

export const getResourceType = (changeTracking: ChangeTrackingEvent): ResourceType => {
  if (changeTracking.params?.coreUnit) {
    return changeTracking.params?.coreUnit?.shortCode === 'DEL' ? ResourceType.Delegates : ResourceType.CoreUnit;
  }

  if (isEmpty(changeTracking.params.owner)) {
    return ResourceType.Delegates;
  }
  if (changeTracking.params?.owner) {
    return changeTracking.params?.owner?.type ?? ResourceType.EcosystemActor;
  }

  return ResourceType.CoreUnit;
};

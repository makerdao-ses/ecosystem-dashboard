import { useMemo } from 'react';

import type { Maybe } from '@/core/models/interfaces/generics';
import { DeliverableSetStatus } from '@/core/models/interfaces/roadmaps';

const useMilestoneCard = (status: Maybe<DeliverableSetStatus>) => {
  const statusLabel = useMemo(() => {
    switch (status) {
      case DeliverableSetStatus.FINISHED:
        return 'Delivered';
      case DeliverableSetStatus.IN_PROGRESS:
        return 'In Progress';
      case DeliverableSetStatus.DRAFT:
        return 'Draft';
      case DeliverableSetStatus.TODO:
        return 'To do';
      default:
        return '';
    }
  }, [status]);

  return {
    statusLabel,
  };
};

export default useMilestoneCard;

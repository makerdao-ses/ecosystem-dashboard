import { ProjectStatus } from '@ses/core/models/interfaces/projects';
import { DeliverableStatus } from '@/core/models/interfaces/deliverables';

export const getChipColors = (status: ProjectStatus | DeliverableStatus, isLight: boolean) => {
  switch (status) {
    case ProjectStatus.INPROGRESS:
    case DeliverableStatus.IN_PROGRESS:
      return {
        color: '#575CFE',
        background: isLight ? '#EEF2FC' : 'rgba(87, 92, 254, 0.15)',
      };
    case ProjectStatus.FINISHED:
    case DeliverableStatus.DELIVERED:
      return {
        color: '#1AAB9B',
        background: isLight ? 'rgba(245, 255, 246, 0.50)' : 'rgba(26, 171, 155, 0.15)',
      };
    case ProjectStatus.TODO:
    case DeliverableStatus.TODO:
      return {
        color: '#F08B04',
        background: isLight ? 'rgba(255, 249, 237, 1)' : 'rgba(83, 57, 5, 1)',
      };
    default:
      // to do
      return {
        color: '#F08B04',
        background: isLight ? 'rgba(255, 251, 245, 0.50)' : 'rgba(83, 57, 5, 1)',
      };
  }
};

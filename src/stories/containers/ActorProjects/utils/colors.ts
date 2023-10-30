import { DeliverableStatus, ProjectStatus } from '@ses/core/models/interfaces/projects';

export const getChipColors = (status: ProjectStatus | DeliverableStatus) => {
  switch (status) {
    case ProjectStatus.INPROGRESS:
    case DeliverableStatus.INPROGRESS:
      return {
        color: '#575CFE',
        background: '#EEF2FC',
      };
    case ProjectStatus.FINISHED:
    case DeliverableStatus.DELIVERED:
      return {
        color: '#1AAB9B',
        background: 'rgba(245, 255, 246, 0.50)',
      };
    default:
      // to do
      return {
        color: '#F08B04',
        background: 'rgba(255, 251, 245, 0.50)',
      };
  }
};

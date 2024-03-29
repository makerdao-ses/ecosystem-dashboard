import { DeliverableStatus, ProjectStatus } from '@ses/core/models/interfaces/projects';

export const getChipColors = (status: ProjectStatus | DeliverableStatus, isLight: boolean) => {
  switch (status) {
    case ProjectStatus.INPROGRESS:
    case DeliverableStatus.INPROGRESS:
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
    default:
      // to do
      return {
        color: '#F08B04',
        background: isLight ? 'rgba(255, 251, 245, 0.50)' : 'rgba(240, 139, 4, 0.15)',
      };
  }
};

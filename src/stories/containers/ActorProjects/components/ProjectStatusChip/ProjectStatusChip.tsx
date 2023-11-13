import styled from '@emotion/styled';
import Chip from '@mui/material/Chip';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ProjectStatus } from '@ses/core/models/interfaces/projects';
import React, { useMemo } from 'react';
import { getChipColors } from '../../utils/colors';

interface ProjectStatusChipProps {
  status: ProjectStatus;
}

const ProjectStatusChip: React.FC<ProjectStatusChipProps> = ({ status }) => {
  const { isLight } = useThemeContext();
  const label = useMemo(() => {
    switch (status) {
      case ProjectStatus.INPROGRESS:
        return 'In Progress';
      case ProjectStatus.FINISHED:
        return 'Finished';
      default:
        return 'To Do';
    }
  }, [status]);

  const { color, background } = useMemo(() => getChipColors(status, isLight), [isLight, status]);

  return <StatusChip label={label} textColor={color} background={background} />;
};

export default ProjectStatusChip;

const StatusChip = styled(Chip)<{ textColor: string; background: string }>(({ textColor, background }) => ({
  padding: '6.5px 15px',
  borderRadius: 24,
  border: `1px solid ${textColor}`,
  background,
  height: 'auto',

  '.MuiChip-label': {
    fontSize: 14,
    lineHeight: 'normal',
    color: textColor,
    padding: 0,
  },
}));

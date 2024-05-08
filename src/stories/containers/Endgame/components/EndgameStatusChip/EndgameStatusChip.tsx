import styled from '@emotion/styled';
import Chip from '@mui/material/Chip';
import { getChipColors } from '@ses/containers/ActorProjects/utils/colors';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ProjectStatus } from '@ses/core/models/interfaces/projects';
import React, { useMemo } from 'react';

interface ProjectStatusChipProps {
  status: ProjectStatus;
  customLabel?: string;
  isSmall?: boolean;
}

const EndgameStatusChip: React.FC<ProjectStatusChipProps> = ({ status, customLabel }) => {
  const { isLight } = useThemeContext();
  const label = useMemo(() => {
    if (customLabel) {
      return customLabel;
    }
    switch (status) {
      case ProjectStatus.INPROGRESS:
        return 'In Progress';
      case ProjectStatus.FINISHED:
        return 'Finished';
      default:
        return 'To do';
    }
  }, [customLabel, status]);

  const { color, background } = useMemo(() => getChipColors(status, isLight), [isLight, status]);

  return <StatusChip label={label} textColor={color} background={background} />;
};

export default EndgameStatusChip;

const StatusChip = styled(Chip)<{ textColor: string; background: string }>(({ textColor, background }) => ({
  padding: '4px 16px',
  borderRadius: 12,
  height: 26,

  fontFamily: 'Inter, sans-serif',
  border: `1px solid ${textColor}`,
  background,
  fontWeight: 500,
  lineHeight: '18px',
  '.MuiChip-label': {
    verticalAlign: 'center',
    fontSize: 14,
    color: textColor,
    padding: 0,
  },
}));

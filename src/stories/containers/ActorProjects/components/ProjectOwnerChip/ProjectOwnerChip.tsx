import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import SESTooltip from '@/stories/components/SESTooltipLegacy/SESTooltipLegacy';
import type { Owner } from '@ses/core/models/interfaces/projects';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ProjectOwnerChipProps {
  owner: Owner;
}

const ProjectOwnerChip: React.FC<ProjectOwnerChipProps> = ({ owner }) => {
  const { isLight } = useThemeContext();

  return (
    <SESTooltip content={<TooltipText>Owner</TooltipText>} placement="bottom-start">
      <OwnerChip
        isLight={isLight}
        label={owner.name}
        avatar={
          <Avatar src="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/PHOENIX/PHOENIX_logo.png" />
        }
      />
    </SESTooltip>
  );
};

export default ProjectOwnerChip;

const OwnerChip = styled(Chip)<WithIsLight>(({ isLight }) => ({
  background: isLight ? '#fff' : '#10191F',
  border: `1px solid ${isLight ? '#D4D9E1' : '#343442'}`,
  borderRadius: 20,
  padding: '3px 7px 3px 3px',
  color: '#708390',
  fontSize: 11,
  lineHeight: 'normal',
  cursor: 'pointer',

  '.MuiAvatar-root': {
    margin: 0,
    boxShadow: '1px 2px 3px 0px rgba(26, 171, 155, 0.25)',
  },

  '.MuiChip-label': {
    paddingRight: 0,
    paddingLeft: 4,
  },
}));

const TooltipText = styled.div({
  fontWeight: 700,
  fontSize: 16,
  lineHeight: 'normal',
  letterSpacing: 0.3,
});

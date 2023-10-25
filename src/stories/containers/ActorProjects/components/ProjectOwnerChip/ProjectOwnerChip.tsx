import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { Owner } from '@ses/core/models/interfaces/projects';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ProjectOwnerChipProps {
  owner: Owner;
}

const ProjectOwnerChip: React.FC<ProjectOwnerChipProps> = ({ owner }) => {
  const { isLight } = useThemeContext();

  return (
    <div>
      <OwnerChip
        isLight={isLight}
        label={owner.name}
        avatar={
          <Avatar src="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/PHOENIX/PHOENIX_logo.png" />
        }
      />
    </div>
  );
};

export default ProjectOwnerChip;

const OwnerChip = styled(Chip)<WithIsLight>(({ isLight }) => ({
  background: isLight ? '#fff' : 'red',
  border: `1px solid ${isLight ? '#D4D9E1' : 'red'}`,
  borderRadius: 20,
  padding: '3px 7px 3px 3px',
  color: isLight ? '#708390' : 'red',
  fontSize: 11,
  lineHeight: 'normal',

  '.MuiAvatar-root': {
    margin: 0,
    boxShadow: isLight ? '1px 2px 3px 0px rgba(26, 171, 155, 0.25)' : '1px 2px 3px 0px red',
  },

  '.MuiChip-label': {
    paddingRight: 0,
    paddingLeft: 4,
  },
}));

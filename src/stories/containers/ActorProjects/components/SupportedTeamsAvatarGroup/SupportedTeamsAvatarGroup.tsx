import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const SupportedTeamsAvatarGroup: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <StyledAvatarGroup total={3} isLight={isLight}>
      <StyledAvatar
        isLight={isLight}
        alt="Powerhouse"
        src="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png"
      />
      <StyledAvatar
        isLight={isLight}
        alt="Dewiz"
        src="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/DEWIZ/DEWIZ_logo.png"
      />
      <StyledAvatar
        isLight={isLight}
        alt="BALabs"
        src="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/BA-LABS/BA_LABS_logo.png"
      />
    </StyledAvatarGroup>
  );
};

export default SupportedTeamsAvatarGroup;

const StyledAvatarGroup = styled(AvatarGroup)<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  border: `1px solid ${isLight ? '#D4D9E1' : 'red'}`,
  background: isLight ? '#fff' : 'red',
  padding: 3,
  borderRadius: 20,

  '& .MuiAvatar-root': {
    border: `1px solid ${isLight ? '#D4D9E1' : 'red'}`,
  },
}));

const StyledAvatar = styled(Avatar)<WithIsLight>(({ isLight }) => ({
  width: 23,
  height: 23,
  boxShadow: isLight ? '1px 2px 3px 0px rgba(26, 171, 155, 0.25)' : '1px 2px 3px 0px red',

  '&:not(:last-of-type)': {
    marginLeft: -8,
  },
}));

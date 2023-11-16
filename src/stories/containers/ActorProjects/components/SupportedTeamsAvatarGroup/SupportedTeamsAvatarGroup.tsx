import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import SESTooltip from '@ses/components/SESTooltip/SESTooltip';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import OwnerTooltipContent from '../OwnerTooltipContent/OwnerTooltipContent';
import type { Owner } from '@ses/core/models/interfaces/projects';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface SupportedTeamsAvatarGroupProps {
  supporters: Owner[];
}

const SupportedTeamsAvatarGroup: React.FC<SupportedTeamsAvatarGroupProps> = ({ supporters }) => {
  const { isLight } = useThemeContext();

  return (
    <SESTooltip content={<OwnerTooltipContent title="Supporters" items={supporters} />}>
      <StyledAvatarGroup total={supporters.length} isLight={isLight}>
        {supporters.map((supporter) => (
          <StyledAvatar key={supporter.id} alt={supporter.name} src={supporter.imgUrl} />
        ))}
      </StyledAvatarGroup>
    </SESTooltip>
  );
};

export default SupportedTeamsAvatarGroup;

const StyledAvatarGroup = styled(AvatarGroup)<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  border: `1px solid ${isLight ? '#D4D9E1' : '#343442'}`,
  background: isLight ? '#fff' : '#10191F',
  padding: 3,
  borderRadius: 20,
  cursor: 'pointer',

  '& .MuiAvatar-root': {
    border: 'none',
  },

  '& .MuiAvatarGroup-avatar': {
    width: 24,
    height: 24,
    fontSize: 12,
    boxShadow: '1px 2px 3px 0px rgba(26, 171, 155, 0.25)',
  },
}));

const StyledAvatar = styled(Avatar)({
  width: 24,
  height: 24,
  boxShadow: '1px 2px 3px 0px rgba(26, 171, 155, 0.25)',

  '&:not(:last-of-type)': {
    marginLeft: -8,
  },
});

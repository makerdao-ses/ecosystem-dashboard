import { styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import React from 'react';
import { siteRoutes } from '@/config/routes';
import type { OwnerRef } from '@/core/models/interfaces/roadmaps';
import SESTooltip from '@/stories/components/SESTooltipLegacy/SESTooltipLegacy';
import type { Owner } from '@ses/core/models/interfaces/projects';

interface ProjectOwnerChipProps {
  tooltipText?: string;
  owner: Owner | OwnerRef;
}

const ProjectOwnerChip: React.FC<ProjectOwnerChipProps> = ({ owner, tooltipText = 'Owner' }) => (
  <SESTooltip content={<TooltipText>{tooltipText}</TooltipText>} placement="bottom-start">
    <Link href={siteRoutes.ecosystemActorAbout(owner.code ?? '')}>
      <OwnerChip label={owner.name} avatar={<Avatar src={(owner as OwnerRef).imageUrl} />} />
    </Link>
  </SESTooltip>
);

export default ProjectOwnerChip;

const OwnerChip = styled(Chip)(({ theme }) => ({
  background: theme.palette.isLight ? '#fff' : '#10191F',
  border: `1px solid ${theme.palette.isLight ? '#D4D9E1' : '#343442'}`,
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

const TooltipText = styled('div')({
  fontWeight: 700,
  fontSize: 16,
  lineHeight: 'normal',
  letterSpacing: 0.3,
});

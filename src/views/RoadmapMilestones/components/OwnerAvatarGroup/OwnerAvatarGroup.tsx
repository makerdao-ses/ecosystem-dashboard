import { styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import type { OwnerRef } from '@/core/models/interfaces/roadmaps';
import SESTooltipLegacy from '@/stories/components/SESTooltipLegacy/SESTooltipLegacy';
import OwnerTooltipContent from './OwnerTooltipContent';

interface OwnerAvatarGroupProps {
  tooltipTitle: string;
  owners: OwnerRef[];
}

const OwnerAvatarGroup: React.FC<OwnerAvatarGroupProps> = ({ owners, tooltipTitle }) => (
  <SESTooltipLegacy content={<OwnerTooltipContent title={tooltipTitle} items={owners} />}>
    <StyledAvatarGroup total={owners.length}>
      {owners.map((owners) => (
        <StyledAvatar key={owners.id} alt={owners.name} src={owners.imageUrl} />
      ))}
    </StyledAvatarGroup>
  </SESTooltipLegacy>
);

export default OwnerAvatarGroup;

const StyledAvatarGroup = styled(AvatarGroup)(({ theme }) => ({
  display: 'flex',
  border: `1px solid ${theme.palette.isLight ? '#D4D9E1' : '#343442'}`,
  background: theme.palette.isLight ? '#fff' : '#10191F',
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

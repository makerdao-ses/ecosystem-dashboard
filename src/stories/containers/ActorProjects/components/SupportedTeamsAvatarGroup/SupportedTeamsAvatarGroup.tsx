import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import SESTooltip from '@ses/components/SESTooltip/SESTooltip';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const SupportedTeamsAvatarGroup: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <SESTooltip
      content={
        <TooltipContainer>
          <TooltipTitle>Supporters</TooltipTitle>
          <Supporter>
            <SupporterAvatar src="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png" />
            <SupporterName>Powerhouse</SupporterName>
          </Supporter>
          <Supporter>
            <SupporterAvatar src="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/DEWIZ/DEWIZ_logo.png" />
            <SupporterName>Dewiz</SupporterName>
          </Supporter>
          <Supporter>
            <SupporterAvatar src="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/BA-LABS/BA_LABS_logo.png" />
            <SupporterName>BALabs</SupporterName>
          </Supporter>
        </TooltipContainer>
      }
    >
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
    </SESTooltip>
  );
};

export default SupportedTeamsAvatarGroup;

const StyledAvatarGroup = styled(AvatarGroup)<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  border: `1px solid ${isLight ? '#D4D9E1' : 'red'}`,
  background: isLight ? '#fff' : 'red',
  padding: 3,
  borderRadius: 20,
  cursor: 'pointer',

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

const TooltipContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

const TooltipTitle = styled.div({
  fontWeight: 700,
  fontSize: 16,
  lineHeight: 'normal',
  letterSpacing: 0.3,
});

const Supporter = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

const SupporterAvatar = styled(Avatar)({
  width: 32,
  height: 32,
  border: `2px solid ${'#fff'}`,
  boxShadow: '2px 4px 7px 0px rgba(26, 171, 155, 0.25)',
});

const SupporterName = styled.div({
  fontSize: 16,
  lineHeight: '22px',
  letterSpacing: 0.3,
});

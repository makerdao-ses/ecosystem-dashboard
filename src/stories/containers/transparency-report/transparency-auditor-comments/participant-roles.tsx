import React from 'react';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import AvatarPlaceholder from '../../../components/svg/avatar-placeholder';
import lightTheme from '../../../../../styles/theme/light';
import { UserDTO } from '../../../../core/models/dto/auth.dto';

export type ParticipantRolesProps = {
  cu: UserDTO[];
  auditors: UserDTO[];
};

const ParticipantRoles: React.FC<ParticipantRolesProps> = ({ cu, auditors }) => {
  const { isLight } = useThemeContext();

  return (
    <ParticipantContainer>
      <Title isLight={isLight}>Participant Roles</Title>
      <Card isLight={isLight}>
        {cu.length > 0 && (
          <RoleSection>
            <RoleName isLight={isLight}>SES Core Unit</RoleName>
            {cu.map((author) => (
              <Username key={author.id}>
                <AvatarPlaceholder width={24} height={24} />
                <Text isLight={isLight}>{author.username}</Text>
              </Username>
            ))}
          </RoleSection>
        )}

        {auditors.length > 0 && (
          <RoleSection>
            <RoleName isLight={isLight}>Auditor</RoleName>
            {auditors.map((author) => (
              <Username key={author.id}>
                <AvatarPlaceholder width={24} height={24} />
                <Text isLight={isLight}>{author.username}</Text>
              </Username>
            ))}
          </RoleSection>
        )}
      </Card>
    </ParticipantContainer>
  );
};

export default ParticipantRoles;

const ParticipantContainer = styled.div({});

type StyledThemeProps = {
  isLight: boolean;
};

const Title = styled.div<StyledThemeProps>(({ isLight }) => ({
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '19px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom: 32,
}));

const Card = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderRadius: 6,
  padding: '16px 16px 24px',

  [lightTheme.breakpoints.up('table_834')]: {
    padding: 16,
  },
}));

const RoleSection = styled.div({
  '&:not(:last-child)': {
    marginBottom: 32,
  },
});

const RoleName = styled.div<StyledThemeProps>(({ isLight }) => ({
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '22px',
  color: isLight ? '#9FAFB9' : '#546978',
  marginBottom: 16,
}));

const Username = styled.div({
  display: 'flex',
  alignItems: 'center',
  '&:not(:last-child)': {
    marginBottom: 16,
  },
});

const Text = styled.div<StyledThemeProps>(({ isLight }) => ({
  marginLeft: 8,
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '19px',
  color: isLight ? '#231536' : '#D2D4EF',
}));

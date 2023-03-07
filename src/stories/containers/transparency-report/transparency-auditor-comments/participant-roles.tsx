import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import InlineUser from '../common/inline-user/inline-user';
import type { CommentMode } from './comment-container/auditor-comments-container';
import type { UserDTO } from '@ses/core/models/dto/authDTO';

export type ParticipantRolesProps = {
  coreUnitCode: string;
  cu: UserDTO[];
  auditors: UserDTO[];
  mode?: CommentMode;
};

const ParticipantRoles: React.FC<ParticipantRolesProps> = ({ coreUnitCode, cu, auditors, mode = 'CoreUnits' }) => {
  const { isLight } = useThemeContext();

  return (
    <ParticipantContainer>
      <Title isLight={isLight}>Participant Roles</Title>
      <Card isLight={isLight}>
        {cu.length > 0 && (
          <RoleSection>
            <RoleName isLight={isLight}>
              {mode === 'CoreUnits' ? `${coreUnitCode} Core Unit` : 'Delegates Administrators'}
            </RoleName>
            {cu.map((author) => (
              <UserWrapper key={author.id}>
                <InlineUser username={author.username} />
              </UserWrapper>
            ))}
          </RoleSection>
        )}

        {auditors.length > 0 ? (
          <RoleSection>
            <RoleName isLight={isLight}>Auditor</RoleName>
            {auditors.map((author) => (
              <UserWrapper key={author.id}>
                <InlineUser username={author.username} />
              </UserWrapper>
            ))}
          </RoleSection>
        ) : (
          <EmptyState isLight={isLight}>
            The {mode === 'CoreUnits' ? `${coreUnitCode} Core Unit` : 'Recognized Delegate'} is currently working
            without auditor
          </EmptyState>
        )}
      </Card>
    </ParticipantContainer>
  );
};

export default ParticipantRoles;

const ParticipantContainer = styled.div({
  width: '100%',
});

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

const EmptyState = styled.div<StyledThemeProps>(({ isLight }) => ({
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '22px',
  color: isLight ? '#9FAFB9' : '#546978',
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

const UserWrapper = styled.div({
  '&:not(:last-child)': {
    marginBottom: 16,
  },
});

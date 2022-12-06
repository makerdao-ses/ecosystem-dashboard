import React from 'react';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import AvatarPlaceholder from '../../../components/svg/avatar-placeholder';
import lightTheme from '../../../../../styles/theme/light';

const ParticipantRoles: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <ParticipantContainer>
      <Title>Participant Roles</Title>
      <Card isLight={isLight}>
        <RoleSection>
          <RoleName>SES Core Unit</RoleName>
          <Username>
            <AvatarPlaceholder width={24} height={24} />
            <Text>Wkampmann</Text>
          </Username>
        </RoleSection>
        <RoleSection>
          <RoleName>Auditor</RoleName>
          <Username>
            <AvatarPlaceholder width={24} height={24} />
            <Text>P_Rose</Text>
          </Username>
          <Username>
            <AvatarPlaceholder width={24} height={24} />
            <Text>C-27</Text>
          </Username>
        </RoleSection>
      </Card>
    </ParticipantContainer>
  );
};

export default ParticipantRoles;

const ParticipantContainer = styled.div({});

const Title = styled.div({
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '19px',
  color: '#231536',
  marginBottom: 32,
});

const Card = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  background: '#FFFFFF',
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

const RoleName = styled.div({
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '22px',
  color: '#9FAFB9',
  marginBottom: 16,
});

const Username = styled.div({
  display: 'flex',
  alignItems: 'center',
  '&:not(:last-child)': {
    marginBottom: 16,
  },
});

const Text = styled.div({
  marginLeft: 8,
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '19px',
  color: '#231536',
});

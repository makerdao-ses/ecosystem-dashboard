import { styled } from '@mui/material';
import { ResourceType } from '@ses/core/models/interfaces/types';
import Card from '@/components/Card/Card';
import InlineUser from '@/views/EcosystemActorAbout/components/InlineUser/InlineUser';
import type { BaseUser } from '@ses/core/models/interfaces/users';

export type ParticipantRolesProps = {
  teamShortCode: string;
  cu: BaseUser[];
  auditors: BaseUser[];
  resource: ResourceType;
};

const ParticipantRoles: React.FC<ParticipantRolesProps> = ({ teamShortCode, cu, auditors, resource }) => {
  const roleName =
    resource === ResourceType.CoreUnit
      ? `${teamShortCode} Core Unit`
      : resource === ResourceType.Delegates
      ? 'Delegates Administrators'
      : `${teamShortCode} Ecosystem Actor`;

  return (
    <ParticipantContainer>
      <Title>Participant Roles</Title>
      <ParticipantsCard>
        {cu.length > 0 && (
          <RoleSection>
            <RoleName>{roleName}</RoleName>
            {cu.map((author) => (
              <UserWrapper key={author.id}>
                <InlineUser username={author.username} />
              </UserWrapper>
            ))}
          </RoleSection>
        )}

        {auditors.length > 0 ? (
          <RoleSection>
            <RoleName>Auditor{auditors.length === 1 ? '' : 's'}</RoleName>
            {auditors.map((author) => (
              <UserWrapper key={author.id}>
                <InlineUser username={author.username} />
              </UserWrapper>
            ))}
          </RoleSection>
        ) : (
          <EmptyState>
            {resource === ResourceType.Delegates
              ? 'Recognized Delegate'
              : ` The ${teamShortCode} ${resource === ResourceType.CoreUnit ? 'Core Unit' : 'Ecosystem Actor'}`}{' '}
            is currently working without an auditor
          </EmptyState>
        )}
      </ParticipantsCard>
    </ParticipantContainer>
  );
};

export default ParticipantRoles;

const ParticipantContainer = styled('div')({
  width: '100%',
});

const Title = styled('div')(({ theme }) => ({
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  marginBottom: 8,
}));

const ParticipantsCard = styled(Card)(({ theme }) => ({
  padding: '16px 8px 8px',

  [theme.breakpoints.up('desktop_1024')]: {
    padding: 16,
  },
}));

const EmptyState = styled('div')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '22px',
  color: theme.palette.colors.slate[100],
}));

const RoleSection = styled('div')(({ theme }) => ({
  position: 'relative',
  padding: '16px 15px 15px',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 16,
  borderRadius: 8,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
  '&:not(:last-child)': {
    marginBottom: 32,
  },
}));

const RoleName = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: -9,
  left: 8,
  padding: '0 8px',
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  color: theme.palette.colors.slate[100],
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
}));

const UserWrapper = styled('div')({});

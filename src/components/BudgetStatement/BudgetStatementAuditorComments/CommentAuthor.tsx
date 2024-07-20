import { styled } from '@mui/material';
import AvatarPlaceholder from 'public/assets/svg/avatar_placeholder.svg';
import { useMemo } from 'react';
import { useTeamContext } from '@/core/context/TeamContext';
import type { BudgetStatementComment } from '@/core/models/interfaces/budgetStatementComment';
import { ResourceType } from '@/core/models/interfaces/types';

interface CommentAuthorProps {
  comment?: BudgetStatementComment;
  resource: ResourceType;
  role?: string;
  username?: string;
}

const CommentAuthor: React.FC<CommentAuthorProps> = ({ comment, resource, role, username }) => {
  const { currentTeam } = useTeamContext();

  const roleString = useMemo(() => {
    if (role) {
      return role;
    }

    if (resource === ResourceType.Delegates) {
      return 'Delegates Administrator';
    } else if (currentTeam?.auditors?.some((auditor) => auditor.id === comment?.author?.id)) {
      return 'Auditor';
    }

    if (resource === ResourceType.CoreUnit) {
      return `${currentTeam?.shortCode} Core Unit`;
    }

    // Ecosystem actor are the defaults
    return `${currentTeam?.shortCode} Ecosystem Actor`;
  }, [comment, currentTeam?.auditors, currentTeam?.shortCode, resource, role]);

  return (
    <AuthorContainer>
      <UserAvatar />
      <Username>{username || comment?.author?.username}</Username>
      <UserRole>{roleString}</UserRole>
    </AuthorContainer>
  );
};

export default CommentAuthor;

const AuthorContainer = styled('div')(() => ({
  display: 'flex',
}));

const UserAvatar = styled(AvatarPlaceholder)(({ theme }) => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
  boxShadow: theme.palette.isLight
    ? '1.5px 3px 5.25px 0px rgba(25, 144, 255, 0.20)'
    : '1.167px 4.667px 17.85px 0px #141921',

  '& path': {
    fill: theme.palette.isLight ? '#6C7275' : theme.palette.colors.charcoal[500],
  },
  '& rect': {
    fill: theme.palette.isLight ? '#CED3DC' : theme.palette.colors.charcoal[700],
  },
}));

const Username = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '22px',
  marginLeft: 4,
  marginRight: 8,

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '24px',
  },
}));

const UserRole = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '22px',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '24px',
  },
}));

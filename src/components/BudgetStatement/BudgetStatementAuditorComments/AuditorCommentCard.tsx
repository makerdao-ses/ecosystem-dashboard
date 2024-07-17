import { styled, useMediaQuery } from '@mui/material';
import { useTeamContext } from '@ses/core/context/TeamContext';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { DateTime } from 'luxon';
import Markdown from 'marked-react';
import AvatarPlaceholder from 'public/assets/svg/avatar_placeholder.svg';
import React, { useMemo } from 'react';
import { useThemeContext } from '@/core/context/ThemeContext';
import { customRenderer, customRendererDark } from '@/views/CoreUnitAbout/components/Markdown/renderUtils';
import ExpenseReportStatus from '@/views/CoreUnitBudgetStatement/components/ExpenseReportStatus/ExpenseReportStatus';
import GenericCommentCard from './GenericCommentCard';
import type { Theme } from '@mui/material';
import type { BudgetStatementComment } from '@ses/core/models/interfaces/budgetStatementComment';

export type AuditorCommentCardProps = {
  comment: BudgetStatementComment;
  hasStatusChange: boolean;
  verb: string;
  resource: ResourceType;
};

const AuditorCommentCard: React.FC<AuditorCommentCardProps> = ({
  comment,
  hasStatusChange,
  verb = 'wrote',
  resource,
}) => {
  const { isLight } = useThemeContext();
  const { currentTeam } = useTeamContext();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));

  const formattedTimestamp = useMemo(
    () => DateTime.fromISO(comment.timestamp).toUTC().toFormat('dd-LLL-yyyy HH:mm ZZZZ'),
    [comment.timestamp]
  );

  const roleString = useMemo(() => {
    if (resource === ResourceType.Delegates) {
      return 'Delegates Administrator';
    } else if (currentTeam?.auditors?.some((auditor) => auditor.id === comment.author.id)) {
      return 'Auditor';
    }

    if (resource === ResourceType.CoreUnit) {
      return `${currentTeam?.shortCode} Core Unit`;
    }

    // Ecosystem actor are the defaults
    return `${currentTeam?.shortCode} Ecosystem Actor`;
  }, [comment, currentTeam, resource]);

  const author = (
    <AuthorContainer>
      <UserAvatar />
      <Username>{comment.author.username}</Username>
      <UserRole>{roleString}</UserRole>
    </AuthorContainer>
  );

  const actionDate = (
    <ActionAndDate>
      <Action>{verb}</Action>
      <Date>{formattedTimestamp}</Date>
    </ActionAndDate>
  );

  return (
    <GenericCommentCard variant={comment.status}>
      <CommentHeader hasComment={!!comment.comment?.trim()}>
        {hasStatusChange ? (
          <MetaForStatusChange>
            <ExpenseReportStatus status={comment.status} />
            {actionDate}
            {author}
          </MetaForStatusChange>
        ) : (
          <MetaForComment>
            {author} {!isMobile && actionDate}
          </MetaForComment>
        )}
      </CommentHeader>
      {comment.comment?.trim() && (
        <CommentMessage>
          <MarkdownWrapper>
            <Markdown value={comment.comment} renderer={isLight ? customRenderer : customRendererDark} />
          </MarkdownWrapper>

          {isMobile && (
            <MobileCommentDate>
              <Verb>{verb}</Verb>
              <CommentDateString>{formattedTimestamp}</CommentDateString>
            </MobileCommentDate>
          )}
        </CommentMessage>
      )}
    </GenericCommentCard>
  );
};

export default AuditorCommentCard;

const ActionAndDate = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,
  borderRadius: 8,
  overflow: 'hidden',
}));

const Action = styled('div')(({ theme }) => ({
  padding: '2px 4px 2px 3px',
  background: theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800],
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
  textTransform: 'capitalize',
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  height: '100%',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '24px',
    padding: '0 8px 0 7px',
  },
}));

const Date = styled('div')(({ theme }) => ({
  padding: '2px 3px 2px 4px',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '24px',
    padding: '0 7px 0 8px',
  },
}));

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

const CommentHeader = styled('div')<{ hasComment: boolean }>(({ theme, hasComment = false }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: 8,
  width: '100%',

  [theme.breakpoints.up('desktop_1024')]: {
    padding: hasComment ? '8px 16px 6px 16px' : '8px 16px',
  },
}));

const MetaForStatusChange = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',

  '& > *:nth-of-type(1)': {
    // status
    // nothing for now here...
  },
  '& > *:nth-of-type(2)': {
    // action and date
    marginLeft: 'auto',
  },
  '& > *:nth-of-type(3)': {
    // author
    width: '100%',
    marginTop: 8,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    '& > *:nth-of-type(1)': {
      order: 1,
    },
    '& > *:nth-of-type(2)': {
      // action and date
      order: 3,
    },
    '& > *:nth-of-type(3)': {
      // author
      order: 2,
      marginTop: 0,
      marginLeft: 16,
      width: 'fit-content',
    },
  },

  [theme.breakpoints.up('desktop_1280')]: {
    '& > *:nth-of-type(3)': {
      // author
      marginLeft: 24,
    },
  },
}));

const MetaForComment = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',

  [theme.breakpoints.up('tablet_768')]: {
    width: '100%',
    justifyContent: 'space-between',
  },
}));

const CommentMessage = styled('div')(({ theme }) => ({
  width: '100%',
  borderTop: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,
  padding: '7px 8px 4px',

  [theme.breakpoints.up('tablet_768')]: {
    paddingBottom: 16,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '7px 16px 16px',
  },
}));

const MarkdownWrapper = styled('div')(({ theme }) => ({
  '& p, & div, & li': {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '18px',
    color: `${theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600]}!important`,

    [theme.breakpoints.up('desktop_1024')]: {
      fontSize: 14,
      fontWeight: 600,
      lineHeight: '22px',
    },
  },

  '& h1, & h2, & h3, & h4, & h5, & h6': {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
    color: `${theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50]}!important`,

    [theme.breakpoints.up('desktop_1024')]: {
      fontSize: 16,
      lineHeight: '24px',
    },
  },

  '& b, & strong': {
    color: `${theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50]}!important`,
    fontWeight: 600,
  },

  '& > *:not(:nth-child(1))': {
    marginTop: 8,
  },

  '& > *:nth-child(1)': {
    marginTop: '0',
  },

  '& ul': {
    paddingLeft: 14,
  },

  '& li': {
    marginTop: '0!important',
  },
}));

const MobileCommentDate = styled('div')(({ theme }) => ({
  display: 'flex',
  borderTop: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,
  padding: '4px 8px 0',
  margin: '14px -8px 0',
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[50],
}));

const Verb = styled('span')(() => ({
  textTransform: 'capitalize',
}));

const CommentDateString = styled('span')(() => ({
  marginLeft: 'auto',
}));

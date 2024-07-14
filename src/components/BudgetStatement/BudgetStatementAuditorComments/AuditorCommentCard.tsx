import { styled, useMediaQuery } from '@mui/material';
import { useTeamContext } from '@ses/core/context/TeamContext';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { DateTime } from 'luxon';
import Markdown from 'marked-react';
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
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));

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

  return (
    <GenericCommentCard variant={comment.status}>
      <CommentHeader hasComment={!!comment.comment?.trim()}>
        <CommentInfo>
          {hasStatusChange && (
            <StatusLabelWrapper>
              <ExpenseReportStatus status={comment.status} />
            </StatusLabelWrapper>
          )}
          {isTablet && hasStatusChange ? (
            <>
              <MobileColumn>
                <Username>{comment.author.username}</Username>
                <UserRole>{roleString}</UserRole>
              </MobileColumn>
              <ActionAndDate>
                {verb} on {formattedTimestamp}
              </ActionAndDate>
            </>
          ) : (
            <Text>
              {comment.author.username} <span>({roleString})</span> {verb} on {formattedTimestamp}
            </Text>
          )}
        </CommentInfo>
      </CommentHeader>
      {comment.comment?.trim() && (
        <CommentMessage>
          <Markdown value={comment.comment} renderer={isLight ? customRenderer : customRendererDark} />
        </CommentMessage>
      )}
    </GenericCommentCard>
  );
};

export default AuditorCommentCard;

const CommentHeader = styled('div')<{ hasComment: boolean }>(({ theme, hasComment = false }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: `16px 16px ${hasComment ? '0' : '16px'} 16px`,
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    padding: `24px 16px ${hasComment ? '0' : '24px'} 16px`,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: `24px 32px ${hasComment ? '0' : '24px'} 32px`,
  },
}));

const StatusLabelWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    marginRight: 40,
  },
}));

const Text = styled('span')(({ theme }) => ({
  letterSpacing: '1px',
  color: theme.palette.isLight ? '#708390' : '#546978',

  '& span': {
    color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  },
}));

const MobileColumn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  letterSpacing: '1px',
});

const CommentInfo = styled('div')(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: '15px',
  color: theme.palette.isLight ? '#708390' : '#546978',
  textTransform: 'uppercase',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  [theme.breakpoints.up('tablet_768')]: {
    width: 'auto',
  },

  [theme.breakpoints.down('tablet_768')]: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
}));

const Username = styled('div')({
  // this is being used just for readability purposes
});

const UserRole = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',

  [theme.breakpoints.up('tablet_768')]: {
    margin: '0 3px',
  },
}));

const ActionAndDate = styled('div')(({ theme }) => ({
  marginTop: 16,
  width: '100%',
  letterSpacing: '1px',

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 0,
  },
}));

const CommentMessage = styled('div')(({ theme }) => ({
  width: '100%',
  marginTop: 16,
  borderTop: `1px solid ${theme.palette.isLight ? '#D4D9E1' : '#405361'}`,
  padding: '16px 16px 24px',

  '& > *:first-of-type': {
    marginTop: '0',
  },

  '& ul': {
    paddingLeft: 14,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 24,
    padding: '16px 32px 24px',
  },
}));

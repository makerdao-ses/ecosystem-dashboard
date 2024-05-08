import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { customRenderer, customRendererDark } from '@ses/components/Markdown/renderUtils';
import { useTeamContext } from '@ses/core/context/TeamContext';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ResourceType } from '@ses/core/models/interfaces/types';
import lightTheme from '@ses/styles/theme/themes';
import { DateTime } from 'luxon';
import Markdown from 'marked-react';
import React, { useMemo } from 'react';
import ExpenseReportStatus from '../ExpenseReportStatus/ExpenseReportStatus';
import GenericCommentCard from './GenericCommentCard';
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
  const isTablet = useMediaQuery(lightTheme.breakpoints.down('table_834'));

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
        <CommentInfo isLight={isLight}>
          {hasStatusChange && (
            <StatusLabelWrapper>
              <ExpenseReportStatus status={comment.status} />
            </StatusLabelWrapper>
          )}
          {isTablet && hasStatusChange ? (
            <>
              <MobileColumn>
                <Username>{comment.author.username}</Username>
                <UserRole isLight={isLight}>{roleString}</UserRole>
              </MobileColumn>
              <ActionAndDate>
                {verb} on {formattedTimestamp}
              </ActionAndDate>
            </>
          ) : (
            <Text isLight={isLight}>
              {comment.author.username} <span>({roleString})</span> {verb} on {formattedTimestamp}
            </Text>
          )}
        </CommentInfo>
      </CommentHeader>
      {comment.comment?.trim() && (
        <CommentMessage isLight={isLight}>
          <Markdown value={comment.comment} renderer={isLight ? customRenderer : customRendererDark} />
        </CommentMessage>
      )}
    </GenericCommentCard>
  );
};

export default AuditorCommentCard;

const CommentHeader = styled.div<{ hasComment: boolean }>(({ hasComment = false }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: `16px 16px ${hasComment ? '0' : '16px'} 16px`,
  width: '100%',

  [lightTheme.breakpoints.up('table_834')]: {
    padding: `24px 16px ${hasComment ? '0' : '24px'} 16px`,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: `24px 32px ${hasComment ? '0' : '24px'} 32px`,
  },
}));

const StatusLabelWrapper = styled.div({
  [lightTheme.breakpoints.up('table_834')]: {
    marginRight: 40,
  },
});

const Text = styled.span<{ isLight: boolean }>(({ isLight }) => ({
  letterSpacing: '1px',
  color: isLight ? '#708390' : '#546978',

  '& span': {
    color: isLight ? '#231536' : '#D2D4EF',
  },
}));

const MobileColumn = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  letterSpacing: '1px',
});

const CommentInfo = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: '15px',
  color: isLight ? '#708390' : '#546978',
  textTransform: 'uppercase',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  [lightTheme.breakpoints.up('table_834')]: {
    width: 'auto',
  },

  [lightTheme.breakpoints.down('table_834')]: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
}));

const Username = styled.div({
  // this is being used just for readability purposes
});

const UserRole = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('table_834')]: {
    margin: '0 3px',
  },
}));

const ActionAndDate = styled.div({
  marginTop: 16,
  width: '100%',
  letterSpacing: '1px',

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 0,
  },
});

const CommentMessage = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  width: '100%',
  marginTop: 16,
  borderTop: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
  padding: '16px 16px 24px',

  '& > *:first-of-type': {
    marginTop: '0',
  },

  '& ul': {
    paddingLeft: 14,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 24,
    padding: '16px 32px 24px',
  },
}));

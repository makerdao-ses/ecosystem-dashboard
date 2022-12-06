import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { ExpenseReportStatus } from '../../../../core/enums/expense-reports-status.enum';
import ExpenseReportStatusBtn from './expense-report-status-label';
import { getExpenseReportStatusColor } from '../../../../core/utils/color.utils';
import Markdown from 'marked-react';
import { customRenderer, customRendererDark } from '../../../components/markdown/renderUtils';
import lightTheme from '../../../../../styles/theme/light';

export type AuditorCommentCardProps = {
  variant: ExpenseReportStatus;
  hasStatusLabel: boolean;
  commentDescription?: string;
};

const AuditorCommentCard: React.FC<AuditorCommentCardProps> = ({
  variant = ExpenseReportStatus.Draft,
  hasStatusLabel,
  commentDescription,
}) => {
  const { isLight } = useThemeContext();
  const variantColor = useMemo(() => {
    return getExpenseReportStatusColor(variant);
  }, [variant]);

  return (
    <CommentCard isLight={isLight} variantColorSet={variantColor}>
      <CommentHeader hasComment={!!commentDescription}>
        <CommentInfo isLight={isLight} isInline={!hasStatusLabel}>
          {hasStatusLabel && (
            <StatusLabelWrapper>
              <ExpenseReportStatusBtn variant={variant} />
            </StatusLabelWrapper>
          )}
          <MobileColumn>
            <Username>Wkampamn</Username>
            <UserRole isInline={!hasStatusLabel}>SES Core Unit</UserRole>
          </MobileColumn>
          <ActionAndDate>submitted on 17-oct-2022 12:32 UTC</ActionAndDate>
        </CommentInfo>
      </CommentHeader>
      {commentDescription && (
        <CommentMessage>
          <Markdown value={commentDescription} renderer={isLight ? customRenderer : customRendererDark} />
        </CommentMessage>
      )}
    </CommentCard>
  );
};

export default AuditorCommentCard;

const CommentCard = styled.div<{ isLight: boolean; variantColorSet: { [key: string]: string } }>(
  ({ isLight, variantColorSet }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
    marginBottom: 32,
    background: isLight ? '#FFFFFF' : '#10191F',
    borderRadius: 6,
    boxShadow: isLight
      ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
      : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',

    '&::before': {
      content: '""',
      position: 'absolute',
      borderRadius: 6,
      top: 0,
      left: 0,
      width: 2,
      height: '100%',
      background: isLight ? variantColorSet.color : variantColorSet.darkColor,

      [lightTheme.breakpoints.up('table_834')]: {
        width: 8,
      },
    },
  })
);

const CommentHeader = styled.div<{ hasComment: boolean }>(({ hasComment = false }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: `16px 16px ${hasComment ? '0' : '16px'} 18px`,
  width: '100%',

  [lightTheme.breakpoints.up('table_834')]: {
    padding: `24px 16px ${hasComment ? '0' : '24px'} 32px`,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: `24px 32px ${hasComment ? '0' : '24px'} 40px`,
  },
}));

const StatusLabelWrapper = styled.div({
  [lightTheme.breakpoints.up('table_834')]: {
    marginRight: 40,
  },
});

const MobileColumn = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',

  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
    alignItems: 'normal',
  },
});

const CommentInfo = styled.div<{ isLight: boolean; isInline: boolean }>(({ isLight, isInline }) => ({
  ...(isInline
    ? {
        display: 'inline',
        '& div': {
          display: 'inline',
        },
      }
    : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center',
      }),
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: '15px',
  color: isLight ? '#708390' : '#546978',
  textTransform: 'uppercase',
  width: '100%',

  [lightTheme.breakpoints.up('table_834')]: {
    width: 'auto',
  },
}));

const Username = styled.div({
  // this is just being used for readability purposes
});

const UserRole = styled.div<{ isInline: boolean }>(({ isInline = false }) => ({
  color: '#231536',
  ...(isInline && { margin: '0 3px' }),

  [lightTheme.breakpoints.up('table_834')]: {
    margin: '0 3px',
  },
}));

const ActionAndDate = styled.div({
  marginTop: 16,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 0,
  },
});

const CommentMessage = styled.div({
  width: '100%',
  marginTop: 16,
  borderTop: '1px solid #D4D9E1',
  padding: '16px 16px 24px 18px',

  '& > *:first-child': {
    marginTop: '0',
  },

  '& ul': {
    paddingLeft: 14,
  },

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 24,
    padding: '16px 32px 24px 40px',
  },
});

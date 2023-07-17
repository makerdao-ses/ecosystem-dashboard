import { BudgetStatus } from '@ses/core/models/interfaces/types';
import { getCommentVerb } from '@ses/core/utils/string';
import { isActivity } from '@ses/core/utils/typesHelpers';
import React, { useMemo } from 'react';
import AuditorCommentCard from './AuditorCommentCard';
import CUNewExpenseReport from './CUNewExpenseReport';
import type { CommentMode } from './AuditorCommentsContainer/AuditorCommentsContainer';
import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';
import type { BudgetStatementComment } from '@ses/core/models/interfaces/budgetStatementComment';

export type AuditorCommentListProps = {
  comments: (BudgetStatementComment | ChangeTrackingEvent)[];
  mode?: CommentMode;
};

const AuditorCommentList: React.FC<AuditorCommentListProps> = ({ comments, mode = 'CoreUnits' }) => {
  const memorizedComments = useMemo(
    () =>
      comments.map((comment, index) => {
        if (isActivity(comment)) {
          return <CUNewExpenseReport key={comment.id} description={comment.description} date={comment.created_at} />;
        } else {
          let hasStatusChange = (comments.length === 1 || index === 0) && comment.status !== BudgetStatus.Draft;
          let previousComment: BudgetStatementComment | undefined;
          let jIndex = index - 1;
          while (jIndex >= 0) {
            if (!isActivity(comments[jIndex])) {
              previousComment = comments[jIndex] as BudgetStatementComment;
              break;
            }
            jIndex--;
          }
          if (previousComment) {
            hasStatusChange = previousComment.status !== comment.status;
          } else if (comment.status !== BudgetStatus.Draft) {
            hasStatusChange = true;
          }

          return (
            <AuditorCommentCard
              key={comment.id}
              comment={comment}
              hasStatusChange={hasStatusChange}
              verb={getCommentVerb(comment, previousComment)}
              mode={mode}
            />
          );
        }
      }),
    [comments, mode]
  );

  return <div>{memorizedComments}</div>;
};

export default AuditorCommentList;

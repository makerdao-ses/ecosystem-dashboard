import { BudgetStatus } from '@ses/core/models/interfaces/types';
import { getCommentVerb } from '@ses/core/utils/string';
import { isActivity } from '@ses/core/utils/typesHelpers';
import React, { useMemo } from 'react';
import AuditorCommentCard from './AuditorCommentCard';
import NewExpenseReport from './NewExpenseReport';
import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';
import type { BudgetStatementComment } from '@ses/core/models/interfaces/budgetStatementComment';
import type { ResourceType } from '@ses/core/models/interfaces/types';

export type AuditorCommentListProps = {
  comments: (BudgetStatementComment | ChangeTrackingEvent)[];
  resource: ResourceType;
};

const AuditorCommentList: React.FC<AuditorCommentListProps> = ({ comments, resource }) => {
  const memorizedComments = useMemo(
    () =>
      comments.map((comment, index) => {
        if (isActivity(comment)) {
          return <NewExpenseReport key={comment.id} description={comment.description} date={comment.created_at} />;
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
              resource={resource}
            />
          );
        }
      }),
    [comments, resource]
  );

  return <div>{memorizedComments}</div>;
};

export default AuditorCommentList;

import React, { useMemo } from 'react';
import AuditorCommentCard from './auditor-comment-card';
import { ActivityFeedDto, BudgetStatus, CommentsBudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import { isActivity } from '../../../../core/utils/types-helpers';
import CUNewExpenseReport from './cu-new-expense-report';
import { getCommentVerb } from '../../../../core/utils/string.utils';

export type AuditorCommentListProps = {
  comments: (CommentsBudgetStatementDto | ActivityFeedDto)[];
};

const AuditorCommentList: React.FC<AuditorCommentListProps> = ({ comments }) => {
  const memorizedComments = useMemo(() => {
    return comments.map((comment, index) => {
      if (isActivity(comment)) {
        return <CUNewExpenseReport key={comment.id} description={comment.description} date={comment.created_at} />;
      } else {
        let hasStatusChange = (comments.length === 1 || index === 0) && comment.status !== BudgetStatus.Draft;
        let previousComment: CommentsBudgetStatementDto | undefined;
        let jIndex = index - 1;
        while (jIndex >= 0) {
          if (!isActivity(comments[jIndex])) {
            previousComment = comments[jIndex] as CommentsBudgetStatementDto;
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
          />
        );
      }
    });
  }, [comments]);

  return <div>{memorizedComments}</div>;
};

export default AuditorCommentList;

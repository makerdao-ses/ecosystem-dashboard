import React, { useMemo } from 'react';
import AuditorCommentCard from './auditor-comment-card';
import CommentForm from './comment-form';
import { BudgetStatus, CommentsBudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { useCoreUnitContext } from '../../../../core/context/CoreUnitContext';

export type AuditorCommentListProps = {
  comments: CommentsBudgetStatementDto[];
};

const AuditorCommentList: React.FC<AuditorCommentListProps> = ({ comments }) => {
  const { permissionManager } = useAuthContext();
  const { currentCoreUnit } = useCoreUnitContext();

  const memorizedComments = useMemo(() => {
    return comments.map((comment, index) => {
      let isStatusChange = (comments.length === 1 || index === 0) && comment.status !== BudgetStatus.Draft;
      if (comments.length >= 1 && index !== 0) {
        const previousComment = comments[index - 1];
        // if it has the same status it means that this is just a regular comment
        isStatusChange = previousComment.status !== comment.status;
      }

      return <AuditorCommentCard key={comment.id} comment={comment} isStatusChange={isStatusChange} />;
    });
  }, [comments]);

  return (
    <div>
      <>
        {memorizedComments}
        {permissionManager.isAuthenticated() && permissionManager.coreUnit.canComment(currentCoreUnit || '-1') && (
          <CommentForm />
        )}
      </>
    </div>
  );
};

export default AuditorCommentList;

import { useAuthContext } from '@ses/core/context/AuthContext';
import { useCoreUnitContext } from '@ses/core/context/CoreUnitContext';
import { BudgetStatus } from '@ses/core/models/interfaces/types';
import { isActivity } from '@ses/core/utils/typesHelpers';
import { useState, useEffect, useMemo } from 'react';
import type { CommentMode } from './AuditorCommentsContainer';
import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { BudgetStatementComment } from '@ses/core/models/interfaces/budgetStatementComment';
import type { BaseUser } from '@ses/core/models/interfaces/users';

const useCommentsContainer = (
  comments: (BudgetStatementComment | ChangeTrackingEvent)[],
  budgetStatement?: BudgetStatement,
  mode: CommentMode = 'CoreUnits'
) => {
  const { permissionManager } = useAuthContext();
  const { currentCoreUnit } = useCoreUnitContext();
  const [cuParticipants, setCuParticipants] = useState<BaseUser[]>([]);
  const [auditors, setAuditors] = useState<BaseUser[]>([]);

  useEffect(() => {
    const cu = new Map<string, BaseUser>();

    for (const comment of comments) {
      if (!isActivity(comment)) {
        if (
          !currentCoreUnit?.auditors?.length ||
          currentCoreUnit?.auditors?.findIndex((a) => a.id === comment.author.id) === -1
        ) {
          cu.set(comment.author.id, comment.author);
        }
      }
    }
    setCuParticipants(Array.from(cu.values()));
    setAuditors((currentCoreUnit?.auditors || []) as BaseUser[]);
  }, [comments, currentCoreUnit]);

  const canComment = useMemo(() => {
    if (mode === 'CoreUnits') {
      return permissionManager.coreUnit.canComment(currentCoreUnit || '-1');
    } else {
      return permissionManager.delegates.canComment();
    }
  }, [permissionManager, currentCoreUnit, mode]);

  const currentBudgetStatus = useMemo(() => budgetStatement?.status || BudgetStatus.Draft, [budgetStatement]);
  return {
    cuParticipants,
    auditors,
    canComment,
    currentBudgetStatus,
    coreUnitCode: currentCoreUnit?.shortCode || '',
  };
};

export default useCommentsContainer;

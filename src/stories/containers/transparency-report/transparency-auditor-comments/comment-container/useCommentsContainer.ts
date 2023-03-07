import { useState, useEffect, useMemo } from 'react';
import { useAuthContext } from '../../../../../core/context/AuthContext';
import { useCoreUnitContext } from '../../../../../core/context/CoreUnitContext';
import { BudgetStatus } from '../../../../../core/models/dto/coreUnitDTO';
import { isActivity } from '../../../../../core/utils/typesHelpers';
import type { UserDTO } from '../../../../../core/models/dto/authDTO';
import type {
  ActivityFeedDto,
  BudgetStatementDto,
  CommentsBudgetStatementDto,
} from '../../../../../core/models/dto/coreUnitDTO';
import type { CommentMode } from './auditor-comments-container';

const useCommentsContainer = (
  comments: (CommentsBudgetStatementDto | ActivityFeedDto)[],
  budgetStatement?: BudgetStatementDto,
  mode: CommentMode = 'CoreUnits'
) => {
  const { permissionManager } = useAuthContext();
  const { currentCoreUnit } = useCoreUnitContext();
  const [cuParticipants, setCuParticipants] = useState<UserDTO[]>([]);
  const [auditors, setAuditors] = useState<UserDTO[]>([]);

  useEffect(() => {
    const cu = new Map<string, UserDTO>();

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
    setAuditors((currentCoreUnit?.auditors || []) as UserDTO[]);
  }, [comments, currentCoreUnit]);

  const canComment = useMemo(() => {
    if (mode === 'CoreUnits') {
      return permissionManager.coreUnit.canComment(currentCoreUnit || '-1');
    } else {
      return permissionManager.delegates.canComment(currentCoreUnit?.id || '-1');
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

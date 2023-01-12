import { useState, useEffect, useMemo } from 'react';
import { useAuthContext } from '../../../../../core/context/AuthContext';
import { useCoreUnitContext } from '../../../../../core/context/CoreUnitContext';
import { BudgetStatus } from '../../../../../core/models/dto/core-unit.dto';
import { isActivity } from '../../../../../core/utils/types-helpers';
import type { UserDTO } from '../../../../../core/models/dto/auth.dto';
import type {
  ActivityFeedDto,
  BudgetStatementDto,
  CommentsBudgetStatementDto,
} from '../../../../../core/models/dto/core-unit.dto';

const useCommentsContainer = (
  comments: (CommentsBudgetStatementDto | ActivityFeedDto)[],
  budgetStatement?: BudgetStatementDto
) => {
  const { permissionManager } = useAuthContext();
  const { currentCoreUnit } = useCoreUnitContext();
  const [cuParticipants, setCuParticipants] = useState<UserDTO[]>([]);
  const [auditors, setAuditors] = useState<UserDTO[]>([]);

  useEffect(() => {
    const cu = new Map<string, UserDTO>();

    for (const comment of comments) {
      if (!isActivity(comment)) {
        if (currentCoreUnit?.auditors?.findIndex((a) => a.id === comment.author.id) === -1) {
          cu.set(comment.author.id, comment.author);
        }
      }
    }
    setCuParticipants(Array.from(cu.values()));
    setAuditors((currentCoreUnit?.auditors || []) as UserDTO[]);
  }, [comments, currentCoreUnit]);

  const canComment = useMemo(
    () => permissionManager.coreUnit.canComment(currentCoreUnit || '-1'),
    [permissionManager, currentCoreUnit]
  );

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

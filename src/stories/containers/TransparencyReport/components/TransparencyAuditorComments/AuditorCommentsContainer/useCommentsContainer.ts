import { useAuthContext } from '@ses/core/context/AuthContext';
import { useTeamContext } from '@ses/core/context/TeamContext';
import { BudgetStatus } from '@ses/core/models/interfaces/types';
import { isActivity } from '@ses/core/utils/typesHelpers';
import { useState, useEffect, useMemo } from 'react';
import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { BudgetStatementComment } from '@ses/core/models/interfaces/budgetStatementComment';
import type { ResourceType } from '@ses/core/models/interfaces/types';
import type { BaseUser } from '@ses/core/models/interfaces/users';

const useCommentsContainer = (
  comments: (BudgetStatementComment | ChangeTrackingEvent)[],
  resource: ResourceType,
  budgetStatement?: BudgetStatement
) => {
  const { permissionManager } = useAuthContext();
  const { currentTeam } = useTeamContext();
  const [cuParticipants, setCuParticipants] = useState<BaseUser[]>([]);
  const [auditors, setAuditors] = useState<BaseUser[]>([]);

  useEffect(() => {
    const cu = new Map<string, BaseUser>();

    for (const comment of comments) {
      if (!isActivity(comment)) {
        if (
          !currentTeam?.auditors?.length ||
          currentTeam?.auditors?.findIndex((a) => a.id === comment.author.id) === -1
        ) {
          cu.set(comment.author.id, comment.author);
        }
      }
    }
    setCuParticipants(Array.from(cu.values()));
    setAuditors((currentTeam?.auditors || []) as BaseUser[]);
  }, [comments, currentTeam]);

  const canComment = useMemo(
    () => permissionManager.team.canComment(resource, currentTeam?.id ?? '-1'),
    [permissionManager.team, resource, currentTeam?.id]
  );

  const currentBudgetStatus = useMemo(() => budgetStatement?.status || BudgetStatus.Draft, [budgetStatement]);
  return {
    cuParticipants,
    auditors,
    canComment,
    currentBudgetStatus,
    coreUnitCode: currentTeam?.shortCode || '',
  };
};

export default useCommentsContainer;

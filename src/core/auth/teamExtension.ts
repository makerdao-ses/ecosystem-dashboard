import { RoleEnum } from '../enums/roleEnum';
import { ResourceType } from '../models/interfaces/types';
import type PermissionManager from './permissionManager';
import type { Team } from '../models/interfaces/team';
import type { User } from '../models/interfaces/users';

class TeamExtension {
  permissionManager;

  constructor(permissionManager: PermissionManager) {
    this.permissionManager = permissionManager;
  }

  canComment(resource: ResourceType, teamId: string, user?: User): boolean {
    if (!user) {
      user = this.permissionManager.loggedUser as User;
    }

    if (!user) {
      // there is not authenticated user
      return false;
    }

    return this.permissionManager.hasAnyPermission([
      `${resource}/Update`,
      `${resource}/Audit`,
      `${resource}/Update/${teamId}`,
      `${resource}/Audit/${teamId}`,
    ]);
  }

  isAuditor(team?: Team, user?: User): boolean {
    if (!user) {
      user = this.permissionManager.loggedUser as User;
    }

    if (!user) {
      // there is not authenticated user
      return false;
    }

    if (team?.type === ResourceType.Delegates) {
      return (
        this.permissionManager.hasRole(RoleEnum.DelegatesAuditor) ||
        this.permissionManager.hasPermission('Delegates/Audit')
      );
    }

    return !!team?.auditors?.some((auditor) => auditor.id === user?.id);
  }

  isTeamAdmin(resource: ResourceType, teamId: string, user?: User): boolean {
    if (!user) {
      user = this.permissionManager.loggedUser as User;
    }

    if (!user || !teamId) {
      return false;
    }

    return this.permissionManager.hasAnyPermission([`${resource}/Update`, `${resource}/Update/${teamId}`]);
  }
}

export default TeamExtension;

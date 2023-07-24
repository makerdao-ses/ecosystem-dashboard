import type { Team } from '../models/interfaces/team';
import type { ResourceType } from '../models/interfaces/types';
import type { User } from '../models/interfaces/users';
import type PermissionManager from './permissionManager';

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

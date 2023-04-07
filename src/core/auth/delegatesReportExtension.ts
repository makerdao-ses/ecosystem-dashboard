import { RoleEnum } from '../enums/roleEnum';
import type { UserDTO } from '../models/dto/authDTO';
import type { DelegatesReportDto } from '../models/dto/delegatesDTO';
import type PermissionManager from './permissionManager';

class DelegatesReportExtension {
  static UPDATE_PERMISSION = 'Delegates/Update';
  permissionManager;

  constructor(permissionManager: PermissionManager) {
    this.permissionManager = permissionManager;
  }

  private getDelegatesId(delegates: DelegatesReportDto | string): string {
    if (typeof delegates === 'string') {
      return delegates;
    }

    return delegates.id;
  }

  canComment(delegates: DelegatesReportDto | string, user?: UserDTO): boolean {
    if (!user) {
      user = this.permissionManager.loggedUser;
    }

    if (!user) {
      // there is not authenticated user
      return false;
    }

    const id = this.getDelegatesId(delegates);
    return this.permissionManager.hasAnyPermission([
      DelegatesReportExtension.UPDATE_PERMISSION,
      `${DelegatesReportExtension.UPDATE_PERMISSION}/${id}`,
    ]);
  }

  isDelegatesAdmin(user?: UserDTO): boolean {
    if (!user) {
      user = this.permissionManager.loggedUser;
    }

    if (!user) {
      return false;
    }

    return this.permissionManager.hasRole(RoleEnum.DelegatesAdmin);
  }
}

export default DelegatesReportExtension;

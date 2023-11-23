import { RoleEnum } from '../enums/roleEnum';
import type PermissionManager from './permissionManager';
import type { UserDTO } from '../models/dto/authDTO';
import type { User } from '../models/interfaces/users';

class DelegatesExtension {
  static UPDATE_PERMISSION = 'Delegates/Update';
  static AUDIT_PERMISSION = 'Delegates/Audit';
  permissionManager;

  constructor(permissionManager: PermissionManager) {
    this.permissionManager = permissionManager;
  }

  canComment(user?: UserDTO | User): boolean {
    if (!user) {
      user = this.permissionManager.loggedUser;
    }

    if (!user) {
      // there is not authenticated user
      return false;
    }

    return this.permissionManager.hasAnyPermission([
      DelegatesExtension.UPDATE_PERMISSION,
      DelegatesExtension.AUDIT_PERMISSION,
    ]);
  }

  isDelegatesAdmin(user?: UserDTO | User): boolean {
    if (!user) {
      user = this.permissionManager.loggedUser;
    }

    if (!user) {
      return false;
    }

    return this.permissionManager.hasRole(RoleEnum.DelegatesAdmin);
  }

  isDelegatesAuditor(user?: UserDTO | User): boolean {
    if (!user) {
      user = this.permissionManager.loggedUser;
    }

    if (!user) {
      // there is not authenticated user
      return false;
    }

    return this.permissionManager.hasPermission(DelegatesExtension.AUDIT_PERMISSION);
  }
}

export default DelegatesExtension;

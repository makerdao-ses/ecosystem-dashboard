import type PermissionManager from './permissionManager';
import type { UserDTO } from '../models/dto/authDTO';
import type { CoreUnit } from '../models/interfaces/coreUnit';
import type { User } from '../models/interfaces/users';

class CoreUnitExtension {
  static UPDATE_PERMISSION = 'CoreUnit/Update';
  static AUDIT_PERMISSION = 'CoreUnit/Audit';
  permissionManager;

  constructor(permissionManager: PermissionManager) {
    this.permissionManager = permissionManager;
  }

  private getCoreUnitId(coreUnit: CoreUnit | string): string {
    if (typeof coreUnit === 'string') {
      return coreUnit;
    }

    return coreUnit.id;
  }

  canComment(coreUnit: CoreUnit | string, user?: UserDTO | User): boolean {
    if (!user) {
      user = this.permissionManager.loggedUser;
    }

    if (!user) {
      // there is not authenticated user
      return false;
    }

    const id = this.getCoreUnitId(coreUnit);
    return this.permissionManager.hasAnyPermission([
      CoreUnitExtension.UPDATE_PERMISSION,
      CoreUnitExtension.AUDIT_PERMISSION,
      `${CoreUnitExtension.UPDATE_PERMISSION}/${id}`,
      `${CoreUnitExtension.AUDIT_PERMISSION}/${id}`,
    ]);
  }

  isAuditor(coreUnit?: CoreUnit, user?: UserDTO | User): boolean {
    if (!user) {
      user = this.permissionManager.loggedUser;
    }

    if (!user) {
      // there is not authenticated user
      return false;
    }

    return !!coreUnit?.auditors?.some((auditor) => auditor.id === user?.id);
  }

  isCoreUnitAdmin(coreUnit?: CoreUnit | string, user?: UserDTO | User): boolean {
    if (!user) {
      user = this.permissionManager.loggedUser;
    }

    if (!user || !coreUnit) {
      return false;
    }

    const id = this.getCoreUnitId(coreUnit);
    return this.permissionManager.hasAnyPermission([
      CoreUnitExtension.UPDATE_PERMISSION,
      `${CoreUnitExtension.UPDATE_PERMISSION}/${id}`,
    ]);
  }
}

export default CoreUnitExtension;

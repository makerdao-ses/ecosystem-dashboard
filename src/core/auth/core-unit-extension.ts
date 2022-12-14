import { UserDTO } from '../models/dto/auth.dto';
import { CoreUnitDto } from '../models/dto/core-unit.dto';
import PermissionManager from './permission-manager';

class CoreUnitExtension {
  static UPDATE_PERMISSION = 'CoreUnit/Update';
  static AUDIT_PERMISSION = 'CoreUnit/Audit';
  permissionManager;

  constructor(permissionManager: PermissionManager) {
    this.permissionManager = permissionManager;
  }

  private getCoreUnitId(coreUnit: CoreUnitDto | string): string {
    if (typeof coreUnit === 'string') {
      return coreUnit;
    }

    return coreUnit.id;
  }

  canComment(coreUnit: CoreUnitDto | string, user?: UserDTO) {
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
}

export default CoreUnitExtension;

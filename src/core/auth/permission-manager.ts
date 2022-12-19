import { RoleEnum } from '../enums/role.enum';
import { UserDTO, UserRole } from '../models/dto/auth.dto';
import CoreUnitExtension from './core-unit-extension';

class PermissionManager {
  loggedUser?: UserDTO;

  coreUnit: CoreUnitExtension;

  constructor(loggedUser?: UserDTO) {
    this.loggedUser = loggedUser;
    this.coreUnit = new CoreUnitExtension(this);
  }

  setLoggedUser(loggedUser?: UserDTO) {
    this.loggedUser = loggedUser;
  }

  removeLoggedUser() {
    this.loggedUser = undefined;
  }

  isAuthenticated() {
    return !!this.loggedUser;
  }

  hasPermission(permission: string): boolean {
    return this.loggedUser?.roles?.some((role: UserRole) => role.permissions.includes(permission)) || false;
  }

  hasAnyPermission(permissions: string[]): boolean {
    return permissions.some((permission: string) => this.hasPermission(permission));
  }

  hasAllPermissions(permissions: string[]): boolean {
    return permissions.every((permission: string) => this.hasPermission(permission));
  }

  hasRole(role: RoleEnum): boolean {
    return this.loggedUser?.roles?.some((userRole: UserRole) => userRole.name === role) || false;
  }

  isCoreUnitAuditor(): boolean {
    return this.hasRole(RoleEnum.CoreUnitAuditor);
  }

  isCoreUnitFacilitator(): boolean {
    return this.hasRole(RoleEnum.CoreUnitFacilitator);
  }
}

export default PermissionManager;

import { PermissionsEnum } from '../enums/permissions.enum';
import { RoleEnum } from '../enums/role.enum';
import CoreUnitExtension from './core-unit-extension';
import type { UserDTO, UserRole } from '../models/dto/auth.dto';

class PermissionManager {
  loggedUser?: UserDTO;
  token?: string;

  coreUnit: CoreUnitExtension;

  constructor(loggedUser?: UserDTO, token?: string) {
    this.loggedUser = loggedUser;
    this.token = token;
    this.coreUnit = new CoreUnitExtension(this);
  }

  setLoggedUser(loggedUser?: UserDTO): void {
    this.loggedUser = loggedUser;
  }

  setToken(token?: string) {
    this.token = token;
  }

  isAuthenticated(): boolean {
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

  isAdmin(): boolean {
    return this.hasPermission(PermissionsEnum.SystemManage);
  }
}

export default PermissionManager;

import { PermissionsEnum } from '../enums/permissionsEnum';
import { RoleEnum } from '../enums/roleEnum';
import CoreUnitExtension from './coreUnitExtension';
import DelegatesExtension from './delegatesExtension';
import type { UserDTO, UserRole as DeprecatedUserRole } from '../models/dto/authDTO';
import type { UserRole } from '../models/interfaces/roles';
import type { User } from '../models/interfaces/users';

class PermissionManager {
  loggedUser?: UserDTO | User;
  token?: string;

  coreUnit: CoreUnitExtension;
  delegates: DelegatesExtension;

  constructor(loggedUser?: UserDTO | User, token?: string) {
    this.loggedUser = loggedUser;
    this.token = token;
    this.coreUnit = new CoreUnitExtension(this);
    this.delegates = new DelegatesExtension(this);
  }

  setLoggedUser(loggedUser?: UserDTO | User): void {
    this.loggedUser = loggedUser;
  }

  setToken(token?: string) {
    this.token = token;
  }

  isAuthenticated(): boolean {
    return !!this.loggedUser;
  }

  hasPermission(permission: string): boolean {
    return (
      this.loggedUser?.roles?.some((role: UserRole | DeprecatedUserRole) => role.permissions.includes(permission)) ||
      false
    );
  }

  hasAnyPermission(permissions: string[]): boolean {
    return permissions.some((permission: string) => this.hasPermission(permission));
  }

  hasAllPermissions(permissions: string[]): boolean {
    return permissions.every((permission: string) => this.hasPermission(permission));
  }

  hasRole(role: RoleEnum): boolean {
    return this.loggedUser?.roles?.some((userRole: UserRole | DeprecatedUserRole) => userRole.name === role) || false;
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

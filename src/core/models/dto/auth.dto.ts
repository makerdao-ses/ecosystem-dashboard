import { PermissionsEnum } from '../../enums/permissions.enum';
import { RoleEnum } from '../../enums/role.enum';

export interface UserRole {
  id: string;
  name: RoleEnum;
  permissions: PermissionsEnum[];
}

export interface UserDTO {
  id: number;
  username: string;
  active: boolean;
  name: string;
  roles: UserRole[];
}

export interface LoginDTO {
  authToken: string;
  user: UserDTO;
}

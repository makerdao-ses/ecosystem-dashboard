import { PermissionsEnum } from '../../enums/permissions.enum';

export interface UserRole {
  id: string;
  name: string;
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

import { RoleEnum } from '../../enums/role.enum';

export interface UserRole {
  id: string;
  name: RoleEnum;
  permissions: string[];
}

export interface UserDTO {
  id: string;
  username: string;
  active: boolean;
  name: string;
  roles?: UserRole[];
}

export interface LoginDTO {
  authToken: string;
  user: UserDTO;
}

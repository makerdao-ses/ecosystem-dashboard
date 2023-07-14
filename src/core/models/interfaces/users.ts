import type { Role } from './roles';

export interface BaseUser {
  id: string;
  username: string;
}

export interface User extends BaseUser {
  active: boolean;
  roles: Role[];
}

export type Auditor = Pick<User, 'id' | 'username'>;

import type { UserRole } from './roles';

export interface BaseUser {
  id: string;
  username: string;
}

export interface User extends BaseUser {
  active: boolean;
  roles: UserRole[];
}

export type Auditor = Pick<User, 'id' | 'username'>;

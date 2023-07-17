import type { RoleEnum } from '@ses/core/enums/roleEnum';

export interface UserRole {
  id: string;
  name: RoleEnum;
  permissions: string[];
}

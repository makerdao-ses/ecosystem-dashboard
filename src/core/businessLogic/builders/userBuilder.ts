import { RoleEnum } from '../../enums/roleEnum';
import type { UserRole } from '@ses/core/models/interfaces/roles';
import type { User } from '@ses/core/models/interfaces/users';

export class UserBuilder {
  private readonly _user: User;
  private static idCounter = 0;

  constructor() {
    this._user = {
      id: UserBuilder.nextId(),
      active: true,
      name: 'jhon',
      username: 'jhon',
      roles: [],
    } as User;
  }

  private static nextId(): string {
    return (UserBuilder.idCounter++).toString();
  }

  withId(id: string): UserBuilder {
    this._user.id = id;
    return this;
  }

  isActive(active: boolean): UserBuilder {
    this._user.active = active;
    return this;
  }

  withName(name: string): UserBuilder {
    (this._user as unknown as { name: string }).name = name;
    return this;
  }

  withUsername(username: string): UserBuilder {
    this._user.username = username;
    return this;
  }

  addRole(role: UserRole): UserBuilder {
    this._user.roles?.push(role);
    return this;
  }

  addCoreUnitAuditorRole(): UserBuilder {
    const role: UserRole = {
      id: UserBuilder.nextId(),
      name: RoleEnum.CoreUnitAuditor,
      permissions: ['CoreUnit/Audit'],
    };

    return this.addRole(role);
  }

  addCoreUnitFacilitatorRole(): UserBuilder {
    const role: UserRole = {
      id: UserBuilder.nextId(),
      name: RoleEnum.CoreUnitFacilitator,
      permissions: ['CoreUnit/Update'],
    };

    return this.addRole(role);
  }

  build(): User {
    return this._user;
  }
}

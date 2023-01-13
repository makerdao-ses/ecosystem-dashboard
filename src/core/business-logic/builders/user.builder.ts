import { RoleEnum } from '../../enums/role.enum';
import type { UserDTO, UserRole } from '../../models/dto/auth.dto';

export class UserBuilder {
  private readonly _user: UserDTO;
  private static idCounter = 0;

  constructor() {
    this._user = {
      id: UserBuilder.nextId(),
      active: true,
      name: 'jhon',
      username: 'jhon',
      roles: [],
    } as UserDTO;
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
    this._user.name = name;
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

  build(): UserDTO {
    return this._user;
  }
}

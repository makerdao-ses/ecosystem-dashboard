import type { TeamScopeEnum } from '@/core/enums/actorScopeEnum';

export interface Scope {
  id: string;
  code: string;
  name: TeamScopeEnum;
}

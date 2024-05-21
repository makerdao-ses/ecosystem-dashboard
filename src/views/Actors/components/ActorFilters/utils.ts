import { TeamScopeEnum } from '@/core/enums/actorScopeEnum';
import type { Scope } from '@ses/core/models/interfaces/scopes';

export const FILTER_SCOPE_ACTOR: Scope[] = [
  {
    id: 'SupportScope',
    code: 'SUP',
    name: TeamScopeEnum.SupportScope,
  },
  {
    id: 'StabilityScope',
    code: 'STA',
    name: TeamScopeEnum.StabilityScope,
  },
  {
    id: 'AccessibilityScope',
    code: 'ACC',
    name: TeamScopeEnum.AccessibilityScope,
  },
  {
    id: 'ProtocolScope',
    code: 'PRO',
    name: TeamScopeEnum.ProtocolScope,
  },
  {
    id: 'GovernanceScope',
    code: 'GOV',
    name: TeamScopeEnum.GovernanceScope,
  },
];

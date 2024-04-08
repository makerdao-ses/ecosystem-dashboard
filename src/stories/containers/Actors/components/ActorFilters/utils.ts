import type { Scope } from '@ses/core/models/interfaces/scopes';

export const FILTER_SCOPE_ACTOR: Scope[] = [
  {
    id: 'SupportScope',
    code: 'SUP',
    name: 'Support Scope',
  },
  {
    id: 'StabilityScope',
    code: 'STA',
    name: 'Stability Scope',
  },
  {
    id: 'AccessibilityScope',
    code: 'ACC',
    name: 'Accessibility Scope',
  },
  {
    id: 'ProtocolScope',
    code: 'PRO',
    name: 'Protocol Scope',
  },
  {
    id: 'GovernanceScope',
    code: 'GOV',
    name: 'Governance Scope',
  },
];

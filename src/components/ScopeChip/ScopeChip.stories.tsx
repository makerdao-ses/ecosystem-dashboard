import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';

import { TeamScopeEnum } from '@/core/enums/actorScopeEnum';
import ScopeChip from './ScopeChip';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ScopeChip> = {
  title: 'Fusion/Components/ScopeChip',
  component: ScopeChip,

  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;
const variantsArgs = [
  {
    scope: {
      id: '1',
      code: 'SUP',
      name: TeamScopeEnum.SupportScope,
    },
  },
  {
    scope: {
      id: '2',
      code: 'STA',
      name: TeamScopeEnum.StabilityScope,
    },
  },
  {
    scope: {
      id: '3',
      code: 'ACC',
      name: TeamScopeEnum.AccessibilityScope,
    },
  },
  {
    scope: {
      id: '4',
      code: 'PTO',
      name: TeamScopeEnum.ProtocolScope,
    },
  },
  {
    scope: {
      id: '5',
      code: 'GOV',
      name: TeamScopeEnum.GovernanceScope,
      codeOnly: true,
    },
  },
];

const [
  [LightMode, DarkMode],
  [StabilityScope, StabilityScopeDark],
  [AccessibilityScope, AccessibilityScopeDark],
  [ProtocolScope, ProtocolScopeDark],
  [GovernanceScope, GovernanceScopeDark],
] = createThemeModeVariants(ScopeChip, variantsArgs);
export {
  LightMode,
  DarkMode,
  StabilityScope,
  StabilityScopeDark,
  AccessibilityScope,
  AccessibilityScopeDark,
  ProtocolScope,
  ProtocolScopeDark,
  GovernanceScope,
  GovernanceScopeDark,
};

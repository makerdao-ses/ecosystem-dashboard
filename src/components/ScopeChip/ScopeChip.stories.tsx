import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';

import { TeamScopeEnum } from '@/core/enums/actorScopeEnum';
import ScopeChip from './ScopeChip';
import type { ScopeSizeVariant } from './ScopeChip';
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
      size: 'small' as ScopeSizeVariant,
    },
  },
  {
    scope: {
      id: '2',
      code: 'STA',
      name: TeamScopeEnum.StabilityScope,
      size: 'medium' as ScopeSizeVariant,
    },
  },
  {
    scope: {
      id: '3',
      code: 'ACC',
      name: TeamScopeEnum.AccessibilityScope,
      size: 'large' as ScopeSizeVariant,
    },
  },
  {
    scope: {
      id: '4',
      code: 'PTO',
      name: TeamScopeEnum.ProtocolScope,
      size: 'extraLarge' as ScopeSizeVariant,
    },
  },
  {
    scope: {
      id: '5',
      code: 'GOV',
      name: TeamScopeEnum.GovernanceScope,
      size: 'small' as ScopeSizeVariant,
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

import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import KeyChangeSection from '../../KeyChangeSection/KeyChangeSection';
import { SectionContainer } from '../KeyChangesSections';
import TokenUpgradesSection from './TokenUpgradesSection';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Endgame/Token Upgrades Section',
  component: TokenUpgradesSection,
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof TokenUpgradesSection>;

const variantsArgs = [{}];

export const [[LightMode, DarkMode]] = createThemeModeVariants(
  () => (
    <KeyChangeSection title="Token upgrades" expanded={true} onExpand={() => null}>
      <SectionContainer>
        <TokenUpgradesSection />
      </SectionContainer>
    </KeyChangeSection>
  ),
  variantsArgs,
  false
);

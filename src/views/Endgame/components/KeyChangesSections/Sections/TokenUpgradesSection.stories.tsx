import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import KeyChangeSection from '../../KeyChangeSection/KeyChangeSection';
import { SectionContainer } from '../KeyChangesSections';
import TokenUpgradesSection from './TokenUpgradesSection';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof TokenUpgradesSection> = {
  title: 'Fusion/Endgame/Token Upgrades Section',
  component: TokenUpgradesSection,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [{}];

const [[LightMode, DarkMode]] = createThemeModeVariants(
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
export { LightMode, DarkMode };

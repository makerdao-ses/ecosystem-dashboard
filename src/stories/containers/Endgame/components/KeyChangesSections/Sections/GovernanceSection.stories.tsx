import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import KeyChangeSection from '../../KeyChangeSection/KeyChangeSection';
import { SectionContainer } from '../KeyChangesSections';
import GovernanceSection from './GovernanceSection';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof GovernanceSection> = {
  title: 'Components/Endgame/Governance Section',
  component: GovernanceSection,
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [{}];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  () => (
    <KeyChangeSection title="Governance" expanded={true} onExpand={() => null}>
      <SectionContainer>
        <GovernanceSection />
      </SectionContainer>
    </KeyChangeSection>
  ),
  variantsArgs,
  false
);
export { LightMode, DarkMode };

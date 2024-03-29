import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import KeyChangeSection from '../../KeyChangeSection/KeyChangeSection';
import { SectionContainer } from '../KeyChangesSections';
import OperationsSection from './OperationsSection';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof OperationsSection> = {
  title: 'Components/Endgame/Operations Section',
  component: OperationsSection,
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
    <KeyChangeSection title="Operations" expanded={true} onExpand={() => null}>
      <SectionContainer>
        <OperationsSection />
      </SectionContainer>
    </KeyChangeSection>
  ),
  variantsArgs,
  false
);
export { LightMode, DarkMode };

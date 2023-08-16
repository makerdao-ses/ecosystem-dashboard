import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import KeyChangeSection from '../../KeyChangeSection/KeyChangeSection';
import { SectionContainer } from '../KeyChangesSections';
import OperationsSection from './OperationsSection';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Endgame/Operations Section',
  component: OperationsSection,
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof OperationsSection>;

const variantsArgs = [{}];

export const [[LightMode, DarkMode]] = createThemeModeVariants(
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

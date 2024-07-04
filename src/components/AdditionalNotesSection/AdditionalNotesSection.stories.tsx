import { createThemeModeVariants } from '@/core/utils/storybook/factories';
import { SESCoreUnitMocked } from '@/core/utils/storybook/mocks/coreUnitsMocks';
import AdditionalNotesSection from './AdditionalNotesSection';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof AdditionalNotesSection> = {
  title: 'Fusion/Components/Budget Statements//AdditionalNotesSection',
  component: AdditionalNotesSection,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};

export default meta;

const variantsArgs = [
  {
    coreUnit: SESCoreUnitMocked,
  },
];

const [[Notes, NotesDarkMode]] = createThemeModeVariants(AdditionalNotesSection, variantsArgs);
export { Notes, NotesDarkMode };

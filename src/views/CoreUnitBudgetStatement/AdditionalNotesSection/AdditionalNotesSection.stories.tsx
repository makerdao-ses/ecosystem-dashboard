import { createThemeModeVariants } from '@/core/utils/storybook/factories';
import { SESCoreUnitMocked } from '@/core/utils/storybook/mocks/coreUnitsMocks';
import AdditionalNotesSection from './AdditionalNotesSection';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof AdditionalNotesSection> = {
  title: 'Fusion/Views/Transparency Report/AdditionalNotesSection',
  component: AdditionalNotesSection,
  parameters: {
    chromatic: {
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

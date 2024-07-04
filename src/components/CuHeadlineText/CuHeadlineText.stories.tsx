import { createThemeModeVariants } from '@/core/utils/storybook/factories';

import CuHeadlineText from './CuHeadlineText';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CuHeadlineText> = {
  title: 'Fusion/Components/Budget Statements/CuHeadlineText',
  component: CuHeadlineText,
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
    cuLongCode: 'SES-001',
    shortCode: 'SES',

    isCoreUnit: true,
  },
];

const [[Notes, NotesDarkMode]] = createThemeModeVariants(CuHeadlineText, variantsArgs);
export { Notes, NotesDarkMode };

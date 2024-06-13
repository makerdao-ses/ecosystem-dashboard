import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { withoutSBPadding } from '@/core/utils/storybook/decorators';
import TeamHeader from './TeamHeader';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof TeamHeader> = {
  title: 'Fusion/Components/TeamHeader',
  component: TeamHeader,
  decorators: [withoutSBPadding],
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
    code: 'PH',
    name: 'Powerhouse',
    description:
      "The aim of SES is to sustainably grow the Maker Protocol's moats by systematically removing barriers between the decentralized workforce, capital, and work.",
  },
];

const [[LightModeDefault, DarkModeDefault]] = createThemeModeVariants(TeamHeader, variantsArgs, false);

export { LightModeDefault, DarkModeDefault };

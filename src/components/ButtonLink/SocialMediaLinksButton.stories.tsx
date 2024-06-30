import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import SocialMediaLinksButton from './SocialMediaLinksButton';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof SocialMediaLinksButton> = {
  title: 'Fusion/Components/SocialMediaLinksButton',
  component: SocialMediaLinksButton,

  parameters: {
    chromatic: {
      viewports: [375, 768, 1024],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;
const variantsArgs = [
  {
    socialMedia: {
      website: 'https://www.example.com',
      forumTag: 'https://www.example.com',
      discord: 'https://www.example.com',
      twitter: 'https://www.example.com',
      github: 'https://www.example.com',
      linkedIn: 'https://www.example.com',
      youtube: 'https://www.example.com',
    },
  },
];

const [[LightModeDefault, DarkModeDefault]] = createThemeModeVariants(SocialMediaLinksButton, variantsArgs);
export { LightModeDefault, DarkModeDefault };

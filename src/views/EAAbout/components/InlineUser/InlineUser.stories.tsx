import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import InlineUser from './InlineUser';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof InlineUser> = {
  title: 'Fusion/ActorAbout/InlineUser',
  component: InlineUser,
  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
    },
  },
  argTypes: {
    username: {
      defaultValue: 'Username',
      control: { type: 'text' },
    },
  },
};
export default meta;

const [[Light, Dark]] = createThemeModeVariants(InlineUser);
export { Light, Dark };

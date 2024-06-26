import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import InlineUser from './InlineUser';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof InlineUser> = {
  title: 'Fusion/Views/Ecosystem Actor About/InlineUser',
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

import { ComponentMeta } from '@storybook/react';
import InlineUser from './inline-user';
import { createThemeModeVariants } from '../../../../../core/utils/storybook';

export default {
  title: 'Components/CUTransparencyReport/InlineUser',
  component: InlineUser,
  argTypes: {
    username: {
      defaultValue: 'Username',
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof InlineUser>;

export const [[Light, Dark]] = createThemeModeVariants(InlineUser);

import SmallButton from './SmallButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SmallButton> = {
  title: 'Fusion/Views/Core Unit About/SmallButton',
  component: SmallButton,
};
export default meta;

type Story = StoryObj<typeof SmallButton>;

export const Default: Story = {
  args: {
    title: 'Back',
  },
};

export const BigText: Story = {
  args: {
    title: 'Back to some place',
  },
};

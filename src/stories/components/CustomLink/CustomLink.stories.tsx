import React from 'react';
import { CustomLink } from './CustomLink';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/General/CustomLink',
  component: CustomLink,
} as ComponentMeta<typeof CustomLink>;

const Template: ComponentStory<typeof CustomLink> = (args) => <CustomLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Custom link',
};

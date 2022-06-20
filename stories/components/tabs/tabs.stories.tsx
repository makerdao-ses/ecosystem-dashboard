import React from 'react';
import { Tabs } from './tabs';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/General/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args}/>;

export const Default = Template.bind({});
Default.args = {
  items: ['One', 'Two', 'Three'],
  currentIndex: 0
};

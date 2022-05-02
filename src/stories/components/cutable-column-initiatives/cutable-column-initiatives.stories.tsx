import React from 'react';
import { CutableColumnInitiatives } from './cutable-column-initiatives';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/CUTable/ColumnInitiatives',
  component: CutableColumnInitiatives
} as ComponentMeta<typeof CutableColumnInitiatives>;

const Template: ComponentStory<typeof CutableColumnInitiatives> = (args) => <CutableColumnInitiatives {...args} />;

export const Main = Template.bind({});
Main.args = {
  initiatives: '1'
};

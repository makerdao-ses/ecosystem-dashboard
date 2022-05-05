import React from 'react';
import { CutableColumnInitiatives } from './cutable-column-initiatives';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/CUTable/ColumnInitiatives',
  component: CutableColumnInitiatives
} as ComponentMeta<typeof CutableColumnInitiatives>;

const Template: ComponentStory<typeof CutableColumnInitiatives> = (args) => <CutableColumnInitiatives {...args} />;

export const Default = Template.bind({});
Default.args = {
  initiatives: '1'
};

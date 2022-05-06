import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CUTable } from './cutable';

export default {
  title: 'Containers/CUTable',
  components: CUTable
} as ComponentMeta<typeof CUTable>;

const Template: ComponentStory<typeof CUTable> = () => <CUTable />;

export const Default = Template.bind({});
Default.args = {};

import React from 'react';
import { CuStatusEnum, CutableColumnOne } from './cutable-column-one';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/CUTable/ColumnOne',
  component: CutableColumnOne
} as ComponentMeta<typeof CutableColumnOne>;

const Template: ComponentStory<typeof CutableColumnOne> = (args) => <CutableColumnOne {...args} />;

export const Main = Template.bind({});
Main.args = {
  title: 'SES Sustainable Ecosystem Scaling',
  status: CuStatusEnum.Accepted,
  statusModified: new Date()
};

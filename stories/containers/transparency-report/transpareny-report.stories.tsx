import React from 'react';
import { TransparencyReport } from './transparency-report';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Containers/TransparencyReport',
  component: TransparencyReport,
} as ComponentMeta<typeof TransparencyReport>;

const Template: ComponentStory<typeof TransparencyReport> = () => <TransparencyReport/>;

export const Default = Template.bind({});
Default.args = {
};

import React from 'react';
import { Breadcrumbs } from './breadcrumbs';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/General/Breadcrumbs',
  component: Breadcrumbs
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = (args) => <Breadcrumbs {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [<>Core Units <b>(3)</b></>, 'SES - Sustainable Ecosystem Scaling ', 'Finances']
};

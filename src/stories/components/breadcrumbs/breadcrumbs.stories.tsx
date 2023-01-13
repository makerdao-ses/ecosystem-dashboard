import React from 'react';
import { Breadcrumbs } from './breadcrumbs';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/General/Breadcrumbs',
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = (args) => <Breadcrumbs {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      label: (
        <>
          Core Units <b>(3)</b>
        </>
      ),
      url: '#',
    },
    {
      label: 'SES - Sustainable Ecosystem Scaling ',
      url: '#',
    },
    {
      label: 'Finances',
      url: '',
    },
  ],
};

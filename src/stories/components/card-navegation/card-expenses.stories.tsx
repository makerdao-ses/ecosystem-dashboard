import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import CardExpenses from './card-expenses';

export default {
  title: 'Components/CuAbout/CardExpenses',
  components: CardExpenses,
} as ComponentMeta<typeof CardExpenses>;

const Template: ComponentStory<typeof CardExpenses> = (args) => <CardExpenses {...args} />;

export const Default = Template.bind({});
Default.args = {
  code: 'SES',
};

export const WithAuditors = Template.bind({});
WithAuditors.args = {
  code: 'SES',
  auditors: [
    {
      id: '1',
      username: 'jhon',
    },
    {
      id: '2',
      username: 'janne',
    },
  ],
};

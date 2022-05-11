import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import CardInfoMember from './card-info-member';

export default {
  title: 'Components/CUAbout/CardInfoMember',
  component: CardInfoMember
} as ComponentMeta<typeof CardInfoMember>;

const Template: ComponentStory<typeof CardInfoMember> = (args) => <CardInfoMember {...args} />;

export const Default = Template.bind({});
Default.args = {
  info: {
    name: 'Joe Dow',
    username: 'forum @username',
    commitment: 'Full Time',
    jobTitle: 'Software Engineer',
  }
};

export const AllData = Template.bind({});
AllData.args = {
  info: {
    name: 'Joe Dow',
    username: 'forum @username',
    commitment: 'Full Time',
    jobTitle: 'Software Engineer',
    avatar: 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/53/92/77/53927729-28a4-b94a-40d9-9abbc9583078/source/512x512bb.jpg'
  }
};

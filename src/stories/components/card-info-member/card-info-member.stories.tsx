import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import CardInfoMember from './card-info-member';
import { Commitment, ContributorCommitment } from '../../containers/cu-about/cu-about-contributor';

export default {
  title: 'Components/CUAbout/CardInfoMember',
  component: CardInfoMember
} as ComponentMeta<typeof CardInfoMember>;

const Template: ComponentStory<typeof CardInfoMember> = (args) => <CardInfoMember {...args} />;

export const AllData = Template.bind({});
AllData.args = {
  contributorCommitment: {
    id: '1',
    jobTitle: 'Software Engineer',
    commitment: Commitment.FullTime,
    contributor: [{
      id: '1',
      name: 'Nathan',
      forumHandle: 'nathan',
      discordHandle: 'https://discord.gg/h7GKvqDyDP',
      twitterHandle: 'https://twitter.com/MakerDAO_SES',
      email: 'Jack@ses.makerdao.network',
      facilitatorImage: ''
    }]
  } as ContributorCommitment,
};

export const Default = Template.bind({});
Default.args = {
  contributorCommitment: {
    id: '1',
    jobTitle: 'Software Engineer',
    commitment: Commitment.FullTime,
    contributor: [{
      discordHandle: '',
      forumHandle: '',
    }] as ContributorCommitment['contributor']
  } as ContributorCommitment
};

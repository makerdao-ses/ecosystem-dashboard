import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import CardInfoMember from './card-info-member';
import { CuJobEnum } from '../../../core/enums/cu-job.enum';
import { Commitment, ContributorCommitment } from '../../containers/cu-about/cu-about.api';

export default {
  title: 'Components/CUAbout/CardInfoMember',
  component: CardInfoMember,
} as ComponentMeta<typeof CardInfoMember>;

const Template: ComponentStory<typeof CardInfoMember> = (args) => <CardInfoMember {...args} />;

export const AllData = Template.bind({});
AllData.args = {
  contributorCommitment: {
    id: '1',
    jobTitle: 'Team Lead' as CuJobEnum,
    startDate: '2019-01-01',
    commitment: Commitment.FullTime,
    contributor: [
      {
        id: '1',
        name: 'Wouter Kampmann',
        forumHandle: 'wouter@ses.makerdao.network',
        discordHandle: 'https://discord.gg/h7GKvqDyDP',
        twitterHandle: 'https://twitter.com/MakerDAO_SES',
        email: 'Jack@ses.makerdao.network',
        facilitatorImage: '',
      },
    ],
  } as ContributorCommitment,
};

export const Default = Template.bind({});
Default.args = {
  contributorCommitment: {
    id: '1',
    startDate: '2019-01-01',
    jobTitle: 'Facilitator' as CuJobEnum,
    commitment: Commitment.FullTime,
    contributor: [
      {
        name: 'Juan Julien',
        forumHandle: 'juan@ses.makerdao.network',
        discordHandle: '',
        email: 'juan@ses.makerdao.network',
      },
    ],
  } as ContributorCommitment,
};

import React from 'react';
import { CommitmentJob } from '../../../core/enums/commitmentJobEnum';
import CardInfoMember from './CardInfoMember';
import type { CuJobEnum } from '../../../core/enums/cuJobEnum';
import type { ContributorCommitmentDto } from '../../../core/models/dto/coreUnitDTO';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

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
    commitment: CommitmentJob.Fulltime,
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
  } as ContributorCommitmentDto,
};

export const Default = Template.bind({});
Default.args = {
  contributorCommitment: {
    id: '1',
    startDate: '2019-01-01',
    jobTitle: 'Facilitator' as CuJobEnum,
    commitment: CommitmentJob.Fulltime,
    contributor: [
      {
        name: 'Juan Julien',
        forumHandle: 'juan@ses.makerdao.network',
        discordHandle: '',
        email: 'juan@ses.makerdao.network',
      },
    ],
  } as ContributorCommitmentDto,
};

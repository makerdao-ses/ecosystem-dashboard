import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TitleNavigationCuAbout from './title-navigation-cu-about';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { CuAbout, CuMip, SocialMediaChannels } from '../../containers/cu-about/cu-about.api';

export default {
  title: 'Components/CUAbout/TitleNavigationCuAbout',
  component: TitleNavigationCuAbout
} as ComponentMeta<typeof TitleNavigationCuAbout>;

const Template: ComponentStory<typeof TitleNavigationCuAbout> = (args) => <TitleNavigationCuAbout {...args} />;
export const Default = Template.bind({});
Default.args = {
  coreUnitAbout: {
    id: '1',
    code: 'SES-001',
    category: [],
    name: 'Sustainable Ecosystem Scaling',
    sentenceDescription: '',
    paragraphDescription: '',
    paragraphImage: '',
    socialMediaChannels: [{
      discord: 'https://discord.gg/h7GKvqDyDP',
      forumTag: 'ses-001',
      linkedIn: 'https://www.linkedin.com/company/makerdao-ses/',
      twitter: '',
      youtube: 'https://www.youtube.com/channel/UC9c35O2H6fq8fB2CGzzP1bw/about',
    }] as SocialMediaChannels[],
    cuMip: [
      {
        mipCode: 'MIP-1',
        accepted: new Date(),
        rejected: new Date(),
        formalSubmission: new Date(),
        rfc: new Date(),
        obsolete: new Date(),
        mipUrl: 'https://makerdao.com/',
        mipStatus: CuStatusEnum.Accepted,
      }
    ] as CuMip[],
    budgetStatements: [],
    contributorCommitment: [],
  } as CuAbout
};

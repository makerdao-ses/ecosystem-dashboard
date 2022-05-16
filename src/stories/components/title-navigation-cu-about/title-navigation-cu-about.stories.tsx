import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TitleNavigationCuAbout from './title-navigation-cu-about';

export enum CuMipStatus {
  RFC = 'RFC',
  FORMAL = 'Formal',
  SUBMISSION = 'Submission',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Obsolete = 'Obsolete',
}

export interface CuMip {
  mipCode: string;
  cuId: string;
  rfc?: string;
  formalSubmission: string;
  accepted?: string;
  rejected?: string;
  mipStatus: CuMipStatus;
  url: string;
}
interface BudgetStatementFTEs {
  month: string
  ftes: number
}

interface BudgetStatement {
  budgetStatementFTEs:BudgetStatementFTEs []
}
export interface SocialMediaChannels {
  cuCode: string;
  forumTag: string;
  twitter: string;
  youtube: string;
  discord: string;
  linkedIn: string;
  website: string;
}

export interface CoreUnit {
  code: string;
  name: string;
  image: string;
  category: [];
  cuMip: CuMip[];
  budgetStatements: BudgetStatement[];
  socialMediaChannels: SocialMediaChannels[];
  contributorCommitment: [];
  cuGithubContribution: [];
  roadMap: [];
}

export default {
  title: 'Components/CUAbout/TitleNavigationCuAbout',
  component: TitleNavigationCuAbout
} as ComponentMeta<typeof TitleNavigationCuAbout>;

const Template: ComponentStory<typeof TitleNavigationCuAbout> = (args) => <TitleNavigationCuAbout {...args} />;
export const Default = Template.bind({});
Default.args = {
  coreUnit: {
    name: 'Sustainable Ecosystem Scaling',
    cuMip: [{
      formalSubmission: '2020-01-01',
      mipStatus: CuMipStatus.Accepted,
      accepted: '2020-01-01',
      rejected: '2020-01-01',
      rfc: '2020-01-01',
    }] as CoreUnit['cuMip'],
    socialMediaChannels: [{
      cuCode: 'CU-1',
      discord: 'https://discord.gg/h7GKvqDyDP',
      forumTag: 'ses-001',
      linkedIn: 'https://www.linkedin.com/company/makerdao-ses/',
      twitter: 'https://twitter.com/MakerDAO_SES',
      website: 'https://www.makerdao.com/',
      youtube: 'https://www.youtube.com/channel/UC9c35O2H6fq8fB2CGzzP1bw/about'
    }] as CoreUnit['socialMediaChannels'],
  } as CoreUnit,
};

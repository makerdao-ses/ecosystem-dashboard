import React from 'react';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import TitleNavigationCuAbout from './TitleNavigationCuAbout';
import type { CoreUnitDto, CuMipDto, SocialMediaChannelDto } from '../../../core/models/dto/core-unit.dto';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/CUAbout/TitleNavigationCuAbout',
  component: TitleNavigationCuAbout,
} as ComponentMeta<typeof TitleNavigationCuAbout>;

const Template: ComponentStory<typeof TitleNavigationCuAbout> = (args) => <TitleNavigationCuAbout {...args} />;
export const Default = Template.bind({});
export const DataWith = Template.bind({});
Default.args = {
  coreUnitAbout: {
    id: '1',
    shortCode: 'SES',
    code: 'SES-001',
    image: 'https://api.gateway.ethswarm.org/bzz/efb3bbb702ecec395c08db27647158dc42928edc52e7a4f43dd0f444a24aa01d/',
    category: [] as string[],
    name: 'Sustainable Ecosystem Scaling',
    sentenceDescription: '',
    paragraphDescription: '',
    paragraphImage: '',
    socialMediaChannels: [
      {
        discord: 'https://discord.gg/h7GKvqDyDP',
        forumTag: 'ses-001',
        linkedIn: 'https://www.linkedin.com/company/makerdao-ses/',
        twitter: '',
        youtube: 'https://www.youtube.com/channel/UC9c35O2H6fq8fB2CGzzP1bw/about',
      },
    ] as SocialMediaChannelDto[],
    cuMip: [
      {
        mipCode: 'MIP-1',
        accepted: '2019-06-11',
        rejected: '2019-06-11',
        formalSubmission: '2019-06-11',
        rfc: '2019-06-11',
        obsolete: '2019-06-11',
        mipUrl: 'https://makerdao.com/',
        mipStatus: CuStatusEnum.Accepted,
      },
    ] as CuMipDto[],
  } as CoreUnitDto,
};

DataWith.args = {
  coreUnitAbout: {
    id: '1',
    shortCode: 'SES',
    code: 'SES-001',
    category: ['Technical', 'Support', 'Operational'],
    name: 'Sustainable Ecosystem Scaling',
    image: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/logo.png',
    sentenceDescription: '',
    paragraphDescription: '',
    paragraphImage: '',
    socialMediaChannels: [
      {
        discord: 'https://discord.gg/h7GKvqDyDP',
        forumTag: 'ses-001',
        linkedIn: 'https://www.linkedin.com/company/makerdao-ses/',
        twitter: '',
        youtube: 'https://www.youtube.com/channel/UC9c35O2H6fq8fB2CGzzP1bw/about',
      },
    ] as SocialMediaChannelDto[],
    cuMip: [
      {
        mipCode: 'MIP-1',
        accepted: '2021-06-11',
        rejected: '2021-06-11',
        formalSubmission: '2019-06-11',
        rfc: '2021-06-11',
        obsolete: '2022-06-11',
        mipUrl: 'https://makerdao.com/',
        mipStatus: CuStatusEnum.Obsolete,
      },
    ] as CuMipDto[],
  } as CoreUnitDto,
};

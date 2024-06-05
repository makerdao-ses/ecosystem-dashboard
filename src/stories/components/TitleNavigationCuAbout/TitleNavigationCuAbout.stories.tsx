import { TeamCategory, TeamStatus } from '@/core/models/interfaces/types';
import { createThemeModeVariants } from '@/core/utils/storybook/factories';
import TitleNavigationCuAbout from './TitleNavigationCuAbout';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';
import type { CuMip } from '@ses/core/models/interfaces/cuMip';
import type { SocialMediaChannels } from '@ses/core/models/interfaces/socialMedia';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof TitleNavigationCuAbout> = {
  title: 'Components/CUAbout/TitleNavigationCuAbout',
  component: TitleNavigationCuAbout,

  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;
const variantsArgs = [
  {
    coreUnitAbout: {
      id: '1',
      shortCode: 'SES',
      code: 'SES-001',
      status: TeamStatus.Accepted,
      image: 'https://api.gateway.ethswarm.org/bzz/efb3bbb702ecec395c08db27647158dc42928edc52e7a4f43dd0f444a24aa01d/',
      category: [TeamCategory.Business, TeamCategory.Finance],
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
      ] as SocialMediaChannels[],
      cuMip: [
        {
          mipCode: 'MIP-1',
          accepted: '2019-06-11',
          rejected: '2019-06-11',
          formalSubmission: '2019-06-11',
          rfc: '2019-06-11',
          obsolete: '2019-06-11',
          mipUrl: 'https://makerdao.com/',
          mipStatus: TeamStatus.Accepted,
        },
      ] as CuMip[],
    } as CoreUnit,
  },
  {
    coreUnitAbout: {
      id: '1',
      shortCode: 'SES',
      code: 'SES-001',
      category: [TeamCategory.Business] as TeamCategory[],
      name: 'Sustainable Ecosystem Scaling',
      status: TeamStatus.Accepted,
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
      ] as SocialMediaChannels[],
      cuMip: [
        {
          mipCode: 'MIP-1',
          accepted: '2021-06-11',
          rejected: '2021-06-11',
          formalSubmission: '2019-06-11',
          rfc: '2021-06-11',
          obsolete: '2022-06-11',
          mipUrl: 'https://makerdao.com/',
          mipStatus: TeamStatus.Obsolete,
        },
      ] as CuMip[],
    } as CoreUnit,
  },
];

const [[LightMode, DarkMode], [LightModeData, DarkModeData]] = createThemeModeVariants(
  TitleNavigationCuAbout,
  variantsArgs
);
export { LightMode, DarkMode, LightModeData, DarkModeData };

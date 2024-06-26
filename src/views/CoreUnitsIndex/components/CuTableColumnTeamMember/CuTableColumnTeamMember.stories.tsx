import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { CuJobEnum } from '@/core/enums/cuJobEnum';
import type { ContributorCommitmentDto } from '@/core/models/dto/coreUnitDTO';
import CuTableColumnTeamMember from './CuTableColumnTeamMember';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CuTableColumnTeamMember> = {
  title: 'Fusion/Views/Core Units Index/ColumnTeamMember',
  component: CuTableColumnTeamMember,
  parameters: {
    chromatic: {
      viewports: [768, 1024, 1280],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    fte: 7.5,
    isLoading: false,
    members: [
      {
        jobTitle: CuJobEnum.Facilitator,
        startDate: '2011-10-10',
        contributor: [
          {
            email: 'some@gmail.com',
            forumHandle: '',
            discordHandle: '',
            facilitatorImage: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/users/juan.gif',
            name: 'Some facilitator',
            twitterHandle: '',
            id: '',
          },
        ],
      } as ContributorCommitmentDto,
      {
        jobTitle: CuJobEnum.Facilitator,
        startDate: '2011-10-10',
        contributor: [
          {
            email: 'some@gmail.com',
            forumHandle: '',
            discordHandle: '',
            facilitatorImage: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/users/wouter.jpg',
            name: 'Some facilitator',
            twitterHandle: '',
            id: '',
          },
        ],
      } as ContributorCommitmentDto,
    ],
  },
  {
    fte: 7.9,
    isLoading: false,
    members: [],
  },
];

const [[LightMode, DarkMode], [TeamMemberEmpty, TeamMemberDarkEmpty]] = createThemeModeVariants(
  CuTableColumnTeamMember,
  variantsArgs
);
export { LightMode, DarkMode, TeamMemberEmpty, TeamMemberDarkEmpty };

LightMode.parameters = {
  figma: {
    component: {
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=342:66235&t=rN4A0uUHLz7w0WRz-4',
        options: {
          style: {
            top: -8,
            left: 0,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=331:45354&t=rN4A0uUHLz7w0WRz-4',
        options: {
          style: {
            top: -8,

            left: 0,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=331:43707&t=rN4A0uUHLz7w0WRz-4',
        options: {
          style: {
            top: -8,

            left: 0,
          },
        },
      },
    },
  },
};

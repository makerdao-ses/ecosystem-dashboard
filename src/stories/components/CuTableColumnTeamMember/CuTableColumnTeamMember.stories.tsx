import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { CuJobEnum } from '../../../core/enums/cuJobEnum';
import { CuTableColumnTeamMember } from './CuTableColumnTeamMember';
import type { ContributorCommitmentDto } from '../../../core/models/dto/coreUnitDTO';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CuTableColumnTeamMember> = {
  title: 'Components/CUTable/ColumnTeamMember',
  component: CuTableColumnTeamMember,
};
export default meta;

const variantsArgs = [
  {
    fte: 7.5,
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
];

const [[TeamMember, TeamMemberDark]] = createThemeModeVariants(CuTableColumnTeamMember, variantsArgs);
export { TeamMember, TeamMemberDark };

TeamMember.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8853%3A101708&t=Kn4jCXITHbiZO4YA-4',
    options: {
      style: {
        top: 0,
        left: 9,
      },
    },
  },
};

TeamMemberDark.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8853%3A101708&t=Kn4jCXITHbiZO4YA-4',
    options: {
      style: {
        top: 0,
        left: 9,
      },
    },
  },
};

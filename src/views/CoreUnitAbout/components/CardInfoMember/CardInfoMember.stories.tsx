import { TeamRole } from '@/core/enums/teamRole';
import { createThemeModeVariants } from '@/core/utils/storybook/factories';
import { CommitmentJob } from '../../../../core/enums/commitmentJobEnum';
import CardInfoMember from './CardInfoMember';
import type { CuJobEnum } from '../../../../core/enums/cuJobEnum';
import type { ContributorCommitment } from '@ses/core/models/interfaces/contributor';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CardInfoMember> = {
  title: 'Fusion/Views/CUAbout/CardInfoMember',
  component: CardInfoMember,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;
const variantsArgs = [
  {
    roles: [TeamRole.Facilitator, TeamRole.ProjectLead],
    contributorCommitment: {
      id: '1',
      jobTitle: 'Team Lead' as CuJobEnum,
      startDate: '2019-01-01',
      commitment: CommitmentJob.Fulltime,
      contributor: [
        {
          id: '12',
          name: 'Juan Julien',

          twitterHandle: 'https://twitter.com/MakerDAO_SES',
          forumHandle: 'juan@ses.makerdao.network',
          discordHandle: 'https://discord.gg/h7GKvqDyDP',
          email: 'juan@ses.makerdao.network',
          facilitatorImage: '',
        },
      ],
    } as ContributorCommitment,
  },
];

const [[CardInfoMemberTeamLeader, CardInfoMemberTeamLeaderDark]] = createThemeModeVariants(
  CardInfoMember,
  variantsArgs
);

export { CardInfoMemberTeamLeader, CardInfoMemberTeamLeaderDark };

CardInfoMemberTeamLeader.parameters = {
  chromatic: {
    viewports: [375, 768, 1024],
    pauseAnimationAtEnd: true,
  },
  date: new Date('2023-03-02T09:56:16Z'),

  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1237:23603&t=d9BdTD6UiP5vztVI-4',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -10,
            left: -12,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1267:41887&t=d9BdTD6UiP5vztVI-4',
        options: {
          componentStyle: {
            width: 340,
          },
          style: {
            top: -10,
            left: -12,
          },
        },
      },

      1024: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1237:20696&t=d9BdTD6UiP5vztVI-4',
        options: {
          componentStyle: {
            width: 378.5,
          },
          style: {
            top: -10,
            left: -12,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1020:18702&t=d9BdTD6UiP5vztVI-4',
        options: {
          componentStyle: {
            width: 416,
          },
          style: {
            top: -10,
            left: -12,
          },
        },
      },
    },
  },
};
